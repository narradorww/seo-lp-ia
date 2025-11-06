/**
 * MarkdownRenderer Component
 *
 * Safely renders Markdown content with GitHub Flavored Markdown support.
 * Used for displaying blog post content on the public-facing site.
 */

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import styles from './MarkdownRenderer.module.css';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export default function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return (
    <div className={`${styles.markdown} ${className || ''}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        components={{
          // Custom rendering for code blocks with language support
          code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            return !inline ? (
              <div className={styles.codeBlock}>
                {match && <span className={styles.language}>{match[1]}</span>}
                <pre className={className}>
                  <code {...props}>{children}</code>
                </pre>
              </div>
            ) : (
              <code className={styles.inlineCode} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
