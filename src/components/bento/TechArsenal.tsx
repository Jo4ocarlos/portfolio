// src/components/bento/TechArsenal.tsx
import styles from './bento.module.css';

interface TechArsenalProps {
  className?: string;
}

export function TechArsenal({ className = '' }: TechArsenalProps) {
  return (
    <article className={`${styles.bentoCard} ${styles.stackCard} ${className}`}>
      <div className={styles.stackNumber}>6+</div>
      <div className={styles.stackLabel}>Tecnologias Core</div>
      <div className={styles.stackGrid}>
        <span className={styles.projectTag}>Next.js</span>
        <span className={styles.projectTag}>React</span>
        <span className={styles.projectTag}>TypeScript</span>
        <span className={styles.projectTag}>Node.js</span>
        <span className={styles.projectTag}>PHP</span>
        <span className={styles.projectTag}>n8n</span>
      </div>
    </article>
  );
}