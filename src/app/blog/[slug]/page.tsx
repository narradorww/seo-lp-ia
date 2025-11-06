/**
 * Individual Blog Post Page
 *
 * Displays a single blog post with Markdown rendering, metadata, and related posts.
 * Generates dynamic SEO metadata and Article structured data.
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, incrementViews, getRelatedPosts } from '@/lib/mongodb/posts';
import MarkdownRenderer from '@/components/Blog/MarkdownRenderer';
import styles from './post.module.css';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || post.status !== 'published') {
    return {
      title: 'Post Not Found',
    };
  }

  const url = `https://seolandingpages.online/blog/${post.slug}`;
  const imageUrl = post.coverImage?.url || 'https://seolandingpages.online/og-image.jpg';

  return {
    title: post.seo.metaTitle || post.title,
    description: post.seo.metaDescription || post.excerpt,
    keywords: post.tags.join(', '),
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.seo.ogTitle || post.title,
      description: post.seo.ogDescription || post.excerpt,
      type: 'article',
      url,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.coverImage?.alt || post.title,
        },
      ],
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seo.ogTitle || post.title,
      description: post.seo.ogDescription || post.excerpt,
      images: [imageUrl],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  // 404 if post doesn't exist or is not published
  if (!post || post.status !== 'published') {
    notFound();
  }

  // Increment view count (fire and forget)
  incrementViews(post._id!.toString()).catch(console.error);

  // Get related posts
  const relatedPosts = await getRelatedPosts(post._id!.toString(), 3);

  // Generate Article structured data
  const articleStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage?.url,
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: {
      '@type': 'Person',
      name: post.author.name,
      url: post.author.url,
    },
    publisher: {
      '@type': 'Person',
      name: 'Rodrigo Alexandre',
      url: 'https://seolandingpages.online',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://seolandingpages.online/blog/${post.slug}`,
    },
    keywords: post.tags.join(', '),
    articleSection: post.category,
    wordCount: Math.ceil(post.content.split(/\s+/).length),
  };

  // Generate BreadcrumbList structured data
  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://seolandingpages.online',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://seolandingpages.online/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://seolandingpages.online/blog/${post.slug}`,
      },
    ],
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />

      <article className={styles.container}>
        {/* Breadcrumb Navigation */}
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span className={styles.separator}>→</span>
          <Link href="/blog">Blog</Link>
          <span className={styles.separator}>→</span>
          <span className={styles.current}>{post.title}</span>
        </nav>

        {/* Post Header */}
        <header className={styles.header}>
          {post.category && (
            <span className={styles.category}>{post.category}</span>
          )}
          <h1 className={styles.title}>{post.title}</h1>
          <p className={styles.excerpt}>{post.excerpt}</p>

          <div className={styles.meta}>
            <div className={styles.author}>
              <span className={styles.authorName}>{post.author.name}</span>
            </div>
            <span className={styles.separator}>•</span>
            <time dateTime={post.publishedAt?.toISOString()}>
              {new Date(post.publishedAt!).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span className={styles.separator}>•</span>
            <span>{post.readingTime} min read</span>
            {post.analytics.views > 0 && (
              <>
                <span className={styles.separator}>•</span>
                <span>{post.analytics.views} views</span>
              </>
            )}
          </div>

          {post.tags.length > 0 && (
            <div className={styles.tags}>
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className={styles.tag}
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}
        </header>

        {/* Cover Image */}
        {post.coverImage && (
          <div className={styles.coverImage}>
            <img src={post.coverImage.url} alt={post.coverImage.alt} />
          </div>
        )}

        {/* Post Content */}
        <div className={styles.content}>
          <MarkdownRenderer content={post.content} />
        </div>

        {/* Post Footer */}
        <footer className={styles.footer}>
          <Link href="/blog" className={styles.backLink}>
            ← Back to all posts
          </Link>
        </footer>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className={styles.relatedSection}>
          <div className={styles.relatedContainer}>
            <h2 className={styles.relatedTitle}>Related Posts</h2>
            <div className={styles.relatedGrid}>
              {relatedPosts.map((related) => (
                <article key={related._id?.toString()} className={styles.relatedCard}>
                  {related.coverImage && (
                    <div className={styles.relatedImage}>
                      <img src={related.coverImage.url} alt={related.coverImage.alt} />
                    </div>
                  )}
                  <div className={styles.relatedContent}>
                    {related.category && (
                      <span className={styles.relatedCategory}>{related.category}</span>
                    )}
                    <h3 className={styles.relatedCardTitle}>
                      <Link href={`/blog/${related.slug}`}>
                        {related.title}
                      </Link>
                    </h3>
                    <p className={styles.relatedExcerpt}>{related.excerpt}</p>
                    <div className={styles.relatedMeta}>
                      <time dateTime={related.publishedAt?.toISOString()}>
                        {new Date(related.publishedAt!).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </time>
                      <span>•</span>
                      <span>{related.readingTime} min read</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
