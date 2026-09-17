// src/components/AiDrawer/CodeBlock.tsx
'use client';

import { useState, useCallback, useEffect } from 'react';
import styles from './CodeBlock.module.css';

export interface CodeBlockProps {
  language?: string;
  value: string;
}

export function CodeBlock({ language = 'plaintext', value }: CodeBlockProps) {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleCopy = useCallback(async () => {
    if (!value || isCopied) return;

    try {
      await navigator.clipboard.writeText(value);
      setIsCopied(true);
    } catch (err) {
      console.error('Falha ao copiar código para a área de transferência:', err);
    }
  }, [value, isCopied]);

  useEffect(() => {
    if (!isCopied) return;

    const timeoutId = window.setTimeout(() => {
      setIsCopied(false);
    }, 2000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isCopied]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.languageBadge}>{language}</span>
        <button
          type="button"
          onClick={handleCopy}
          className={`${styles.copyButton} ${isCopied ? styles.copyButtonSuccess : ''}`}
          aria-label={isCopied ? 'Código copiado' : 'Copiar código para a área de transferência'}
        >
          {isCopied ? 'Copiado!' : 'Copiar'}
        </button>
      </div>
      <pre className={styles.pre}>
        <code className={styles.code}>{value}</code>
      </pre>
    </div>
  );
}