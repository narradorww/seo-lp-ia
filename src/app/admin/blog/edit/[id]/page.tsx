'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { use } from 'react';
import MarkdownEditor from '@/components/Blog/MarkdownEditor';
import styles from '../../form.module.css';

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    tags: '',
    category: '',
    status: 'draft' as 'draft' | 'published',
    metaDescription: '',
    metaKeywords: '',
    featured: false,
  });

  useEffect(() => {
    async function loadPost() {
      try {
        const res = await fetch(`/api/posts/${id}`);
        if (res.ok) {
          const post = await res.json();
          setFormData({
            title: post.title,
            excerpt: post.excerpt,
            content: post.content,
            tags: post.tags.join(', '),
            category: post.category || '',
            status: post.status,
            metaDescription: post.seo.metaDescription,
            metaKeywords: post.seo.metaKeywords.join(', '),
            featured: post.featured,
          });
        } else {
          alert('Post not found');
          router.push('/admin/blog');
        }
      } catch (error) {
        alert('Failed to load post');
        router.push('/admin/blog');
      } finally {
        setFetching(false);
      }
    }

    loadPost();
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          excerpt: formData.excerpt,
          content: formData.content,
          tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
          category: formData.category || undefined,
          status: formData.status,
          featured: formData.featured,
          seo: {
            metaDescription: formData.metaDescription,
            metaKeywords: formData.metaKeywords.split(',').map(k => k.trim()).filter(Boolean),
          },
        }),
      });

      if (res.ok) {
        router.push('/admin/blog');
      } else {
        const error = await res.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      alert('Failed to update post');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className={styles.container}>
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <p>Loading post...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Edit Post</h1>
        <button onClick={() => router.back()} className={styles.backButton}>← Back</button>
      </header>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label>Title *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            maxLength={200}
          />
        </div>

        <div className={styles.field}>
          <label>Excerpt *</label>
          <textarea
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            required
            maxLength={300}
            rows={3}
          />
        </div>

        <div className={styles.field}>
          <label>Content * (Markdown)</label>
          <MarkdownEditor
            value={formData.content}
            onChange={(value) => setFormData({ ...formData, content: value })}
          />
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label>Tags * (comma-separated)</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="react, nextjs, tutorial"
              required
            />
          </div>

          <div className={styles.field}>
            <label>Category</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              placeholder="Technology"
            />
          </div>
        </div>

        <div className={styles.field}>
          <label>Meta Description * (SEO)</label>
          <textarea
            value={formData.metaDescription}
            onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
            required
            minLength={50}
            maxLength={160}
            rows={2}
            placeholder="50-160 characters"
          />
        </div>

        <div className={styles.field}>
          <label>Meta Keywords * (comma-separated)</label>
          <input
            type="text"
            value={formData.metaKeywords}
            onChange={(e) => setFormData({ ...formData, metaKeywords: e.target.value })}
            placeholder="keyword1, keyword2, keyword3"
            required
          />
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label>Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as 'draft' | 'published' })}
              className={styles.select}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <div className={styles.checkboxField}>
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            />
            <label htmlFor="featured">Feature this post</label>
          </div>
        </div>

        <div className={styles.actions}>
          <button type="submit" disabled={loading} className={styles.primaryButton}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/blog')}
            disabled={loading}
            className={styles.secondaryButton}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
