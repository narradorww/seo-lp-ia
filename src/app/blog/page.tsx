/**
 * Public Blog Listing Page
 *
 * Displays all published blog posts for public viewing.
 * Supports pagination and filtering.
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { getPosts } from '@/lib/mongodb/posts';
import styles from './blog.module.css';

export const metadata: Metadata = {
  title: 'Blog | Rodrigo Alexandre',
  description: 'Articles about React Native, TypeScript, AI, and mobile development by Rodrigo Alexandre.',
  openGraph: {
    title: 'Blog | Rodrigo Alexandre',
    description: 'Articles about React Native, TypeScript, AI, and mobile development.',
    type: 'website',
  },
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const tag = params.tag as string | undefined;

  // Get only published posts
  const result = await getPosts(
    { status: 'published', tag },
    page,
    9 // 9 posts per page (3x3 grid)
  );

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Blog</h1>
          <p className={styles.subtitle}>
            Thoughts on mobile development, AI, and technology
          </p>
        </div>
        <Link href="/" className={styles.backLink}>
          ← Back to Home
        </Link>
      </header>

      {/* Filter by tag */}
      {tag && (
        <div className={styles.filterBanner}>
          <span>Filtering by tag: <strong>{tag}</strong></span>
          <Link href="/blog" className={styles.clearFilter}>
            ✕ Clear filter
          </Link>
        </div>
      )}

      {/* Posts Grid */}
      {result.posts.length === 0 ? (
        <div className={styles.empty}>
          <p>No posts published yet. Check back soon!</p>
        </div>
      ) : (
        <>
          <div className={styles.grid}>
            {result.posts.map((post) => (
              <article key={post._id?.toString()} className={styles.card}>
                {post.coverImage && (
                  <div className={styles.cardImage}>
                    <img src={post.coverImage.url} alt={post.coverImage.alt} />
                  </div>
                )}

                <div className={styles.cardContent}>
                  {post.category && (
                    <span className={styles.category}>{post.category}</span>
                  )}

                  <h2 className={styles.cardTitle}>
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>

                  <p className={styles.excerpt}>{post.excerpt}</p>

                  <div className={styles.cardMeta}>
                    <time dateTime={post.publishedAt?.toISOString()}>
                      {new Date(post.publishedAt!).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                    <span>•</span>
                    <span>{post.readingTime} min read</span>
                  </div>

                  <div className={styles.tags}>
                    {post.tags.slice(0, 3).map(tag => (
                      <Link
                        key={tag}
                        href={`/blog?tag=${encodeURIComponent(tag)}`}
                        className={styles.tag}
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>

                  <Link href={`/blog/${post.slug}`} className={styles.readMore}>
                    Read more →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          {result.totalPages > 1 && (
            <nav className={styles.pagination} aria-label="Blog pagination">
              {page > 1 && (
                <Link
                  href={`/blog?page=${page - 1}${tag ? `&tag=${tag}` : ''}`}
                  className={styles.paginationButton}
                >
                  ← Previous
                </Link>
              )}

              <span className={styles.paginationInfo}>
                Page {page} of {result.totalPages}
              </span>

              {page < result.totalPages && (
                <Link
                  href={`/blog?page=${page + 1}${tag ? `&tag=${tag}` : ''}`}
                  className={styles.paginationButton}
                >
                  Next →
                </Link>
              )}
            </nav>
          )}
        </>
      )}
    </div>
  );
}
