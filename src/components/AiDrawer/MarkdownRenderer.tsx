import { isValidElement, type ReactNode } from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ExternalLink } from '@/components/ExternalLink/ExternalLink';
import { CodeBlock } from './CodeBlock';
import styles from './MarkdownRenderer.module.css';

interface MarkdownRendererProps {
  content: string;
}

interface CodeElementProps {
  className?: string;
  children?: ReactNode;
}

function renderCodeBlock(children: ReactNode) {
  if (!isValidElement<CodeElementProps>(children)) return <pre>{children}</pre>;

  const { className = '', children: code } = children.props;
  const language = /language-(\w+)/.exec(className)?.[1];

  return <CodeBlock language={language} value={String(code ?? '').replace(/\n$/, '')} />;
}

const markdownComponents: Components = {
  a: ({ href, children }) => <ExternalLink href={href} className={styles.link}>{children}</ExternalLink>,
  code: ({ children }) => <code className={styles.inlineCode}>{children}</code>,
  pre: ({ children }) => renderCodeBlock(children),
  table: ({ children }) => (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>{children}</table>
    </div>
  ),
};

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className={styles.markdown}>
      {/* Imagem fica de fora: a resposta vem de um modelo e não deve disparar download de outro site */}
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents} disallowedElements={['img']}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
