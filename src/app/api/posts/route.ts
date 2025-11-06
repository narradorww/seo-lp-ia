/**
 * Blog Posts API - List & Create
 *
 * GET  /api/posts - List posts with filters and pagination
 * POST /api/posts - Create a new post (requires authentication)
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { createPost, getPosts } from '@/lib/mongodb/posts';
import { createPostSchema, postFiltersSchema } from '@/lib/validations/blog';
import { ZodError } from 'zod';

/**
 * GET /api/posts
 * List posts with optional filters and pagination
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse query parameters
    const filters = {
      status: searchParams.get('status') || undefined,
      tag: searchParams.get('tag') || undefined,
      category: searchParams.get('category') || undefined,
      featured: searchParams.get('featured') === 'true' ? true : undefined,
      search: searchParams.get('search') || undefined,
      page: parseInt(searchParams.get('page') || '1'),
      pageSize: parseInt(searchParams.get('pageSize') || '10')
    };

    // Validate filters
    const validatedFilters = postFiltersSchema.parse(filters);

    // Get posts from database
    const result = await getPosts(
      validatedFilters,
      validatedFilters.page,
      validatedFilters.pageSize
    );

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Invalid query parameters', details: error.issues },
        { status: 400 }
      );
    }

    console.error('GET /api/posts error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/posts
 * Create a new blog post (requires authentication)
 */
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();

    // Validate input
    const validatedData = createPostSchema.parse(body);

    // Create post
    const post = await createPost(validatedData, {
      id: session.user.id,
      name: session.user.name || 'Admin',
      email: session.user.email || ''
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }

    console.error('POST /api/posts error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
