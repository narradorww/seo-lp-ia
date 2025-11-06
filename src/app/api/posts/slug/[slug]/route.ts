/**
 * Blog Posts API - Get Post by Slug
 *
 * GET /api/posts/slug/[slug] - Get a post by its URL slug
 *
 * This is useful for the public-facing blog pages.
 */

import { NextRequest, NextResponse } from 'next/server';
import { getPostBySlug, incrementViews } from '@/lib/mongodb/posts';

/**
 * GET /api/posts/slug/[slug]
 * Get a post by its slug and increment view count
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const post = await getPostBySlug(slug);

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // Only show published posts to non-authenticated users
    const session = await import('@/lib/auth').then(m => m.auth());
    if (post.status !== 'published' && !session?.user) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // Increment view count (fire and forget, don't wait)
    if (post._id) {
      incrementViews(post._id.toString()).catch(console.error);
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error('GET /api/posts/slug/[slug] error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
