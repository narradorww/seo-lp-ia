'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MarkdownEditor from '@/components/Blog/MarkdownEditor';
import styles from '../form.module.css';

export default function NewPostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    tags: '',
    category: '',
    status: 'draft' as 'draft' | 'published',
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    ogTitle: '',
    ogDescription: '',
    featured: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
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
            metaTitle: formData.metaTitle || undefined,
            metaDescription: formData.metaDescription,
            metaKeywords: formData.metaKeywords.split(',').map(k => k.trim()).filter(Boolean),
            ogTitle: formData.ogTitle || undefined,
            ogDescription: formData.ogDescription || undefined,
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
      alert('Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Create New Post</h1>
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

        <h2 className={styles.sectionTitle}>SEO Settings</h2>

        <div className={styles.field}>
          <label>Meta Title (Optional)</label>
          <input
            type="text"
            value={formData.metaTitle}
            onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
            maxLength={60}
            placeholder="Leave empty to use post title"
          />
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

        <div className={styles.field}>
          <label>OpenGraph Title (Optional)</label>
          <input
            type="text"
            value={formData.ogTitle}
            onChange={(e) => setFormData({ ...formData, ogTitle: e.target.value })}
            maxLength={60}
            placeholder="Leave empty to use meta title or post title"
          />
        </div>

        <div className={styles.field}>
          <label>OpenGraph Description (Optional)</label>
          <textarea
            value={formData.ogDescription}
            onChange={(e) => setFormData({ ...formData, ogDescription: e.target.value })}
            maxLength={160}
            rows={2}
            placeholder="Leave empty to use meta description"
          />
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

        <div className={styles.actions}>
          <button type="submit" disabled={loading} className={styles.primaryButton}>
            {loading ? 'Creating...' : 'Create Post'}
          </button>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, status: 'draft' })}
            disabled={loading}
            className={styles.secondaryButton}
          >
            Save as Draft
          </button>
        </div>
      </form>
    </div>
  );
}
