// src/components/AiDrawer/MarkdownRenderer.tsx
'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CodeBlock } from './CodeBlock';
import styles from './MarkdownRenderer.module.css';

export interface MarkdownRendererProps {
  content: string;
}

interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  inline?: boolean;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className={styles.markdownBody}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ inline, className, children, ...props }: CodeProps) {
            const match = /language-(\w+)/.exec(className || '');
            const codeString = String(children).replace(/\n$/, '');

            if (!inline && (match || codeString.includes('\n'))) {
              return (
                <CodeBlock
                  language={match ? match[1] : 'plaintext'}
                  value={codeString}
                />
              );
            }

            return (
              <code className={styles.inlineCode} {...props}>
                {children}
              </code>
            );
          },
          table({ children, ...props }) {
            return (
              <div className={styles.tableWrapper}>
                <table className={styles.table} {...props}>
                  {children}
                </table>
              </div>
            );
          },
          a({ href, children, ...props }) {
            return (
              <a
                href={href}
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
                {...props}
              >
                {children}
              </a>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}