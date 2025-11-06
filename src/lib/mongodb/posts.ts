/**
 * MongoDB Posts Operations
 *
 * CRUD operations for blog posts following clean code principles.
 * All functions are pure and follow single responsibility principle.
 */

import { ObjectId } from 'mongodb';
import clientPromise from '../mongodb';
import type { BlogPost, CreatePostDTO, UpdatePostDTO, PostFilters, PaginatedPosts } from '@/types/blog';
import slugify from 'slugify';
import readingTime from 'reading-time';

const DB_NAME = 'seo-lp-ia';
const COLLECTION_NAME = 'blog_posts';

/**
 * Get MongoDB collection for blog posts
 */
async function getCollection() {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  return db.collection<BlogPost>(COLLECTION_NAME);
}

/**
 * Generate URL-friendly slug from title
 */
export function generateSlug(title: string): string {
  return slugify(title, {
    lower: true,
    strict: true,
    remove: /[*+~.()'"!:@]/g
  });
}

/**
 * Calculate reading time from HTML content
 */
export function calculateReadingTime(content: string): number {
  const stats = readingTime(content);
  return Math.ceil(stats.minutes);
}

/**
 * Ensure slug is unique by appending number if needed
 */
async function ensureUniqueSlug(slug: string, excludeId?: ObjectId): Promise<string> {
  const collection = await getCollection();
  let uniqueSlug = slug;
  let counter = 1;

  while (true) {
    const query: any = { slug: uniqueSlug };
    if (excludeId) {
      query._id = { $ne: excludeId };
    }

    const existing = await collection.findOne(query);
    if (!existing) {
      return uniqueSlug;
    }

    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }
}

/**
 * Create a new blog post
 */
export async function createPost(data: CreatePostDTO, author: { id: string; name: string; email: string }): Promise<BlogPost> {
  const collection = await getCollection();

  const slug = await ensureUniqueSlug(generateSlug(data.title));
  const now = new Date();

  const post: BlogPost = {
    title: data.title,
    slug,
    excerpt: data.excerpt,
    content: data.content,
    author: {
      id: author.id,
      name: author.name,
      email: author.email
    },
    coverImage: data.coverImage,
    tags: data.tags,
    category: data.category,
    publishedAt: data.status === 'published' ? now : undefined,
    createdAt: now,
    updatedAt: now,
    status: data.status,
    seo: data.seo,
    analytics: {
      views: 0,
      likes: 0
    },
    readingTime: calculateReadingTime(data.content),
    featured: data.featured || false
  };

  const result = await collection.insertOne(post);
  return { ...post, _id: result.insertedId };
}

/**
 * Get post by ID
 */
export async function getPostById(id: string): Promise<BlogPost | null> {
  const collection = await getCollection();
  return await collection.findOne({ _id: new ObjectId(id) });
}

/**
 * Get post by slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const collection = await getCollection();
  return await collection.findOne({ slug });
}

/**
 * Update a blog post
 */
export async function updatePost(data: UpdatePostDTO): Promise<BlogPost | null> {
  const collection = await getCollection();
  const { id, ...updateData } = data;

  const post = await getPostById(id);
  if (!post) {
    return null;
  }

  const updates: any = {
    ...updateData,
    updatedAt: new Date()
  };

  // Update slug if title changed
  if (updateData.title && updateData.title !== post.title) {
    const newSlug = await ensureUniqueSlug(generateSlug(updateData.title), post._id);
    updates.slug = newSlug;
  }

  // Update reading time if content changed
  if (updateData.content) {
    updates.readingTime = calculateReadingTime(updateData.content);
  }

  // Set publishedAt if changing from draft to published
  if (updateData.status === 'published' && post.status === 'draft') {
    updates.publishedAt = new Date();
  }

  // Clear publishedAt if changing from published to draft
  if (updateData.status === 'draft' && post.status === 'published') {
    updates.publishedAt = null;
  }

  const result = await collection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: updates },
    { returnDocument: 'after' }
  );

  return result;
}

/**
 * Delete a blog post
 */
export async function deletePost(id: string): Promise<boolean> {
  const collection = await getCollection();
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
}

/**
 * Get paginated posts with filters
 */
export async function getPosts(
  filters: PostFilters = {},
  page: number = 1,
  pageSize: number = 10
): Promise<PaginatedPosts> {
  const collection = await getCollection();

  const query: any = {};

  if (filters.status) {
    query.status = filters.status;
  }

  if (filters.tag) {
    query.tags = filters.tag;
  }

  if (filters.category) {
    query.category = filters.category;
  }

  if (filters.featured !== undefined) {
    query.featured = filters.featured;
  }

  if (filters.search) {
    query.$or = [
      { title: { $regex: filters.search, $options: 'i' } },
      { excerpt: { $regex: filters.search, $options: 'i' } },
      { tags: { $regex: filters.search, $options: 'i' } }
    ];
  }

  const skip = (page - 1) * pageSize;

  const [posts, total] = await Promise.all([
    collection
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize)
      .toArray(),
    collection.countDocuments(query)
  ]);

  return {
    posts,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize)
  };
}

/**
 * Get all unique tags
 */
export async function getAllTags(): Promise<string[]> {
  const collection = await getCollection();
  const posts = await collection.find({}).toArray();
  const tagsSet = new Set<string>();

  posts.forEach((post: BlogPost) => {
    post.tags.forEach((tag: string) => tagsSet.add(tag));
  });

  return Array.from(tagsSet).sort();
}

/**
 * Get all unique categories
 */
export async function getAllCategories(): Promise<string[]> {
  const collection = await getCollection();
  const categories = await collection.distinct('category', { category: { $exists: true } });
  return categories.filter((cat): cat is string => Boolean(cat)).sort();
}

/**
 * Increment post view count
 */
export async function incrementViews(id: string): Promise<void> {
  const collection = await getCollection();
  await collection.updateOne(
    { _id: new ObjectId(id) },
    { $inc: { 'analytics.views': 1 } }
  );
}

/**
 * Get related posts based on tags
 */
export async function getRelatedPosts(postId: string, limit: number = 3): Promise<BlogPost[]> {
  const collection = await getCollection();
  const post = await getPostById(postId);

  if (!post || post.tags.length === 0) {
    return [];
  }

  return await collection
    .find({
      _id: { $ne: new ObjectId(postId) },
      status: 'published',
      tags: { $in: post.tags }
    })
    .limit(limit)
    .toArray();
}
