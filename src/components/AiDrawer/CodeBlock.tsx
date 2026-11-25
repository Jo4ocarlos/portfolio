'use client';

import { useEffect, useState } from 'react';
import styles from './CodeBlock.module.css';

const FEEDBACK_MS = 2000;

interface CodeBlockProps {
  language?: string;
  value: string;
}

export function CodeBlock({ language = 'plaintext', value }: CodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) return;

    const timeoutId = setTimeout(() => setIsCopied(false), FEEDBACK_MS);
    return () => clearTimeout(timeoutId);
  }, [isCopied]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setIsCopied(true);
    } catch (error) {
      console.error('Falha ao copiar código:', error);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.language}>{language}</span>
        <button
          type="button"
          onClick={handleCopy}
          className={`${styles.copyButton} ${isCopied ? styles.copied : ''}`}
          aria-label={isCopied ? 'Código copiado' : 'Copiar código'}
        >
          {isCopied ? 'Copiado!' : 'Copiar'}
        </button>
      </div>
      <pre className={styles.pre}>
        <code>{value}</code>
      </pre>
    </div>
  );
}
