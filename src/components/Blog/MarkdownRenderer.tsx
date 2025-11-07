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
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            // If there's a language class, it's a code block; otherwise it's inline code
            const isCodeBlock = !!match;

            return isCodeBlock ? (
              <div className={styles.codeBlock}>
                <span className={styles.language}>{match[1]}</span>
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
