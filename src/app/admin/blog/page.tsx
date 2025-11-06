/**
 * Admin Blog Dashboard
 *
 * Lists all blog posts with filters, search, and actions.
 * Main entry point for blog management.
 */

import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getPosts } from '@/lib/mongodb/posts';
import PostsTable from '@/components/Blog/PostsTable';
import styles from './blog.module.css';

export default async function AdminBlogPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await auth();

  if (!session) {
    redirect('/admin/login');
  }

  const params = await searchParams;
  const page = Number(params.page) || 1;
  const status = params.status as 'draft' | 'published' | undefined;
  const search = params.search as string | undefined;

  // Get posts from database
  const result = await getPosts(
    { status, search },
    page,
    10
  );

  const stats = {
    total: result.total,
    drafts: await getPosts({ status: 'draft' }, 1, 1).then(r => r.total),
    published: await getPosts({ status: 'published' }, 1, 1).then(r => r.total),
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Blog Posts</h1>
          <p className={styles.subtitle}>
            Manage your blog content
          </p>
        </div>

        <div className={styles.headerActions}>
          <Link href="/" className={styles.linkButton}>
            ← Back to Site
          </Link>
          <Link href="/admin/blog/new" className={styles.primaryButton}>
            + New Post
          </Link>
        </div>
      </header>

      {/* Stats */}
      <div className={styles.stats}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Total Posts</span>
          <span className={styles.statValue}>{stats.total}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Published</span>
          <span className={styles.statValue} style={{ color: '#10b981' }}>
            {stats.published}
          </span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Drafts</span>
          <span className={styles.statValue} style={{ color: '#f59e0b' }}>
            {stats.drafts}
          </span>
        </div>
      </div>

      {/* Posts Table */}
      <PostsTable
        posts={result.posts}
        pagination={{
          page: result.page,
          pageSize: result.pageSize,
          total: result.total,
          totalPages: result.totalPages
        }}
        currentStatus={status}
        currentSearch={search}
      />
    </div>
  );
}
