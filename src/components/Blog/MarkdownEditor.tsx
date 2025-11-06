/**
 * Markdown Editor Component
 *
 * Professional Markdown editor with live preview, toolbar, and keyboard shortcuts.
 * Supports GitHub Flavored Markdown (tables, strikethrough, task lists, etc).
 */

'use client';

import React, { useState, useRef, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import styles from './MarkdownEditor.module.css';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export default function MarkdownEditor({
  value,
  onChange,
  placeholder = 'Write your post content in Markdown...',
  minHeight = '400px'
}: MarkdownEditorProps) {
  const [showPreview, setShowPreview] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Insert markdown syntax at cursor position
  const insertMarkdown = useCallback((before: string, after: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);

    onChange(newText);

    // Set cursor position after insertion
    setTimeout(() => {
      textarea.focus();
      const newPosition = start + before.length + selectedText.length;
      textarea.setSelectionRange(newPosition, newPosition);
    }, 0);
  }, [value, onChange]);

  // Toolbar actions
  const actions = {
    bold: () => insertMarkdown('**', '**'),
    italic: () => insertMarkdown('*', '*'),
    heading: () => insertMarkdown('\n## ', ''),
    quote: () => insertMarkdown('\n> ', ''),
    code: () => insertMarkdown('`', '`'),
    codeBlock: () => insertMarkdown('\n```\n', '\n```\n'),
    link: () => insertMarkdown('[', '](url)'),
    image: () => insertMarkdown('![alt](', ')'),
    list: () => insertMarkdown('\n- ', ''),
    orderedList: () => insertMarkdown('\n1. ', ''),
    table: () => insertMarkdown('\n| Header 1 | Header 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |\n', ''),
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'b':
          e.preventDefault();
          actions.bold();
          break;
        case 'i':
          e.preventDefault();
          actions.italic();
          break;
        case 'k':
          e.preventDefault();
          actions.link();
          break;
      }
    }

    // Tab key for indentation
    if (e.key === 'Tab') {
      e.preventDefault();
      insertMarkdown('  ', '');
    }
  };

  return (
    <div className={styles.container}>
      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.toolbarGroup}>
          <button
            type="button"
            onClick={actions.bold}
            className={styles.toolButton}
            title="Bold (Ctrl+B)"
          >
            <strong>B</strong>
          </button>
          <button
            type="button"
            onClick={actions.italic}
            className={styles.toolButton}
            title="Italic (Ctrl+I)"
          >
            <em>I</em>
          </button>
          <button
            type="button"
            onClick={actions.heading}
            className={styles.toolButton}
            title="Heading"
          >
            H
          </button>
        </div>

        <div className={styles.toolbarGroup}>
          <button
            type="button"
            onClick={actions.quote}
            className={styles.toolButton}
            title="Quote"
          >
            "
          </button>
          <button
            type="button"
            onClick={actions.code}
            className={styles.toolButton}
            title="Inline Code"
          >
            {'</>'}
          </button>
          <button
            type="button"
            onClick={actions.codeBlock}
            className={styles.toolButton}
            title="Code Block"
          >
            {'{ }'}
          </button>
        </div>

        <div className={styles.toolbarGroup}>
          <button
            type="button"
            onClick={actions.link}
            className={styles.toolButton}
            title="Link (Ctrl+K)"
          >
            🔗
          </button>
          <button
            type="button"
            onClick={actions.image}
            className={styles.toolButton}
            title="Image"
          >
            🖼️
          </button>
        </div>

        <div className={styles.toolbarGroup}>
          <button
            type="button"
            onClick={actions.list}
            className={styles.toolButton}
            title="Bullet List"
          >
            •
          </button>
          <button
            type="button"
            onClick={actions.orderedList}
            className={styles.toolButton}
            title="Numbered List"
          >
            1.
          </button>
          <button
            type="button"
            onClick={actions.table}
            className={styles.toolButton}
            title="Table"
          >
            ⊞
          </button>
        </div>

        <div className={styles.toolbarGroup} style={{ marginLeft: 'auto' }}>
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className={`${styles.toolButton} ${showPreview ? styles.active : ''}`}
            title="Toggle Preview"
          >
            {showPreview ? '✏️ Edit' : '👁️ Preview'}
          </button>
        </div>
      </div>

      {/* Editor and Preview */}
      <div className={styles.editorContainer}>
        {!showPreview ? (
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={styles.textarea}
            style={{ minHeight }}
          />
        ) : (
          <div className={styles.preview} style={{ minHeight }}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeSanitize]}
            >
              {value || '*No content to preview*'}
            </ReactMarkdown>
          </div>
        )}
      </div>

      {/* Help Text */}
      <div className={styles.help}>
        <span>Supports GitHub Flavored Markdown</span>
        <span>•</span>
        <span>Ctrl+B: Bold</span>
        <span>•</span>
        <span>Ctrl+I: Italic</span>
        <span>•</span>
        <span>Ctrl+K: Link</span>
      </div>
    </div>
  );
}
