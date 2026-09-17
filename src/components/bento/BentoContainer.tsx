import { ReactNode } from 'react';
import styles from './bento.module.css';

interface BentoContainerProps {
  children: ReactNode;
}

export function BentoContainer({ children }: BentoContainerProps) {
  return (
    <section className={styles.bentoGrid}>
      {children}
    </section>
  );
}