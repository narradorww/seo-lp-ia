/**
 * Blog Posts API - Tags
 *
 * GET /api/posts/tags - Get all unique tags
 */

import { NextResponse } from 'next/server';
import { getAllTags } from '@/lib/mongodb/posts';

/**
 * GET /api/posts/tags
 * Get all unique tags used in posts
 */
export async function GET() {
  try {
    const tags = await getAllTags();

    return NextResponse.json({ tags }, { status: 200 });
  } catch (error) {
    console.error('GET /api/posts/tags error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
