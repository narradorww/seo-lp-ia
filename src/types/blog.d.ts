/**
 * Blog Post Types and Interfaces
 *
 * Defines the structure for blog posts stored in MongoDB.
 * Follows clean code principles with clear type definitions.
 */

import { ObjectId } from 'mongodb';

/**
 * Blog post status
 */
export type PostStatus = 'draft' | 'published';

/**
 * Author information embedded in posts
 */
export interface PostAuthor {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  url?: string;
}

/**
 * Cover image metadata
 */
export interface CoverImage {
  url: string;
  alt: string;
  width: number;
  height: number;
}

/**
 * SEO metadata for individual posts
 */
export interface PostSEO {
  metaTitle?: string;
  metaDescription: string;
  metaKeywords: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
}

/**
 * Analytics data for posts
 */
export interface PostAnalytics {
  views: number;
  likes: number;
}

/**
 * Complete blog post document (MongoDB)
 */
export interface BlogPost {
  _id?: ObjectId;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // HTML from Tiptap editor
  author: PostAuthor;
  coverImage?: CoverImage;
  tags: string[];
  category?: string;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  status: PostStatus;
  seo: PostSEO;
  analytics: PostAnalytics;
  readingTime: number; // in minutes
  featured: boolean;
}

/**
 * Blog post creation DTO (Data Transfer Object)
 */
export interface CreatePostDTO {
  title: string;
  excerpt: string;
  content: string;
  coverImage?: CoverImage;
  tags: string[];
  category?: string;
  status: PostStatus;
  seo: PostSEO;
  featured?: boolean;
}

/**
 * Blog post update DTO
 */
export interface UpdatePostDTO extends Partial<CreatePostDTO> {
  id: string;
}

/**
 * Blog post query filters
 */
export interface PostFilters {
  status?: PostStatus;
  tag?: string;
  category?: string;
  featured?: boolean;
  search?: string;
}

/**
 * Paginated blog posts response
 */
export interface PaginatedPosts {
  posts: BlogPost[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
