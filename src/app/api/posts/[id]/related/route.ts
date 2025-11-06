/**
 * Blog Posts API - Related Posts
 *
 * GET /api/posts/[id]/related - Get related posts based on tags
 */

import { NextRequest, NextResponse } from 'next/server';
import { getRelatedPosts } from '@/lib/mongodb/posts';

/**
 * GET /api/posts/[id]/related
 * Get related posts for a given post ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '3');

    const posts = await getRelatedPosts(id, limit);

    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    console.error('GET /api/posts/[id]/related error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
