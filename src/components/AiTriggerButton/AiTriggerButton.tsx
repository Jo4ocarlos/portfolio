// src/components/AiTriggerButton/AiTriggerButton.tsx
'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import styles from './AiTriggerButton.module.css';

export interface AiTriggerButtonProps {
  projectId?: string;
  className?: string;
}

export function AiTriggerButton({ projectId, className }: AiTriggerButtonProps) {
  const searchParams = useSearchParams();
  
  // Clona os parâmetros atuais para não destruir o que já está na URL
  const currentParams = new URLSearchParams(searchParams.toString());
  
  currentParams.set('ai', 'open');
  if (projectId) {
    currentParams.set('project', projectId);
  } else {
    currentParams.delete('project');
  }

  const href = `/?${currentParams.toString()}`;

  return (
    <Link
      href={href}
      scroll={false}
      className={`${styles.aiTriggerBtn} ${className ?? ''}`}
      aria-label="Analisar projeto com IA"
    >
      <svg
        className={styles.sparkleIcon}
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z" />
      </svg>
      <span>Analisar com IA</span>
    </Link>
  );
}