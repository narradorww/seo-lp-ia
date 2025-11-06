/**
 * Blog Posts API - Categories
 *
 * GET /api/posts/categories - Get all unique categories
 */

import { NextResponse } from 'next/server';
import { getAllCategories } from '@/lib/mongodb/posts';

/**
 * GET /api/posts/categories
 * Get all unique categories used in posts
 */
export async function GET() {
  try {
    const categories = await getAllCategories();

    return NextResponse.json({ categories }, { status: 200 });
  } catch (error) {
    console.error('GET /api/posts/categories error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
