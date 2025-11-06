'use client';

import { BlogPost } from '@/types/blog';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './PostsTable.module.css';

interface PostsTableProps {
  posts: BlogPost[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  currentStatus?: string;
  currentSearch?: string;
}

export default function PostsTable({ posts, pagination, currentStatus, currentSearch }: PostsTableProps) {
  const router = useRouter();
  const [search, setSearch] = useState(currentSearch || '');
  const [status, setStatus] = useState(currentStatus || 'all');

  const handleFilter = () => {
    const params = new URLSearchParams();
    if (status !== 'all') params.set('status', status);
    if (search) params.set('search', search);
    router.push(`/admin/blog?${params.toString()}`);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return;

    try {
      const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
      if (res.ok) {
        router.refresh();
      }
    } catch (error) {
      alert('Failed to delete post');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleFilter()}
          className={styles.searchInput}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)} className={styles.select}>
          <option value="all">All Status</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
        <button onClick={handleFilter} className={styles.filterButton}>Filter</button>
      </div>

      {posts.length === 0 ? (
        <div className={styles.empty}>
          <p>No posts found. <Link href="/admin/blog/new">Create your first post</Link></p>
        </div>
      ) : (
        <div className={styles.table}>
          {posts.map((post) => (
            <div key={post._id?.toString()} className={styles.row}>
              <div className={styles.main}>
                <h3 className={styles.title}>{post.title}</h3>
                <p className={styles.excerpt}>{post.excerpt}</p>
                <div className={styles.meta}>
                  <span className={`${styles.badge} ${styles[post.status]}`}>{post.status}</span>
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  <span>{post.analytics.views} views</span>
                </div>
              </div>
              <div className={styles.actions}>
                <Link href={`/admin/blog/edit/${post._id}`} className={styles.editButton}>Edit</Link>
                <button onClick={() => handleDelete(post._id!.toString(), post.title)} className={styles.deleteButton}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {pagination.totalPages > 1 && (
        <div className={styles.pagination}>
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
            <Link
              key={page}
              href={`/admin/blog?page=${page}${status !== 'all' ? `&status=${status}` : ''}${search ? `&search=${search}` : ''}`}
              className={`${styles.pageButton} ${page === pagination.page ? styles.active : ''}`}
            >
              {page}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
