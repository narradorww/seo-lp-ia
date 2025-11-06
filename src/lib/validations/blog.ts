/**
 * Zod Validation Schemas for Blog Posts
 *
 * Provides type-safe validation for all blog post operations.
 * Follows clean code principles with clear, reusable schemas.
 */

import { z } from 'zod';

/**
 * Author schema
 */
export const authorSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Author name is required'),
  email: z.string().email('Invalid email address'),
  avatar: z.string().url().optional()
});

/**
 * Cover image schema
 */
export const coverImageSchema = z.object({
  url: z.string().url('Invalid image URL'),
  alt: z.string().min(1, 'Image alt text is required'),
  width: z.number().positive('Width must be positive'),
  height: z.number().positive('Height must be positive')
});

/**
 * SEO metadata schema
 */
export const seoSchema = z.object({
  metaDescription: z.string().min(50, 'Meta description must be at least 50 characters').max(160, 'Meta description must be at most 160 characters'),
  metaKeywords: z.array(z.string()).min(1, 'At least one keyword is required').max(10, 'Maximum 10 keywords allowed'),
  ogImage: z.string().url().optional(),
  canonicalUrl: z.string().url().optional()
});

/**
 * Post status enum
 */
export const postStatusSchema = z.enum(['draft', 'published']);

/**
 * Create post schema (for new posts)
 */
export const createPostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be at most 200 characters'),
  excerpt: z.string().min(1, 'Excerpt is required').max(300, 'Excerpt must be at most 300 characters'),
  content: z.string().min(100, 'Content must be at least 100 characters'),
  coverImage: coverImageSchema.optional(),
  tags: z.array(z.string()).min(1, 'At least one tag is required').max(10, 'Maximum 10 tags allowed'),
  category: z.string().optional(),
  status: postStatusSchema,
  seo: seoSchema,
  featured: z.boolean().optional().default(false)
});

/**
 * Update post schema (all fields optional except id)
 */
export const updatePostSchema = z.object({
  id: z.string().min(1, 'Post ID is required'),
  title: z.string().min(1).max(200).optional(),
  excerpt: z.string().min(1).max(300).optional(),
  content: z.string().min(100).optional(),
  coverImage: coverImageSchema.optional(),
  tags: z.array(z.string()).min(1).max(10).optional(),
  category: z.string().optional(),
  status: postStatusSchema.optional(),
  seo: seoSchema.optional(),
  featured: z.boolean().optional()
});

/**
 * Query filters schema
 */
export const postFiltersSchema = z.object({
  status: postStatusSchema.optional(),
  tag: z.string().optional(),
  category: z.string().optional(),
  featured: z.boolean().optional(),
  search: z.string().optional(),
  page: z.number().positive().optional().default(1),
  pageSize: z.number().positive().max(100).optional().default(10)
});

/**
 * Delete post schema
 */
export const deletePostSchema = z.object({
  id: z.string().min(1, 'Post ID is required')
});

/**
 * TypeScript types inferred from Zod schemas
 */
export type CreatePostInput = z.infer<typeof createPostSchema>;
export type UpdatePostInput = z.infer<typeof updatePostSchema>;
export type PostFiltersInput = z.infer<typeof postFiltersSchema>;
export type DeletePostInput = z.infer<typeof deletePostSchema>;
