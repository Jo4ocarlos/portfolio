// src/components/Bento/TechArsenal.tsx
import styles from './bento.module.css';

interface TechArsenalProps {
  stack: string[];
  className?: string;
}

export function TechArsenal({ stack, className = '' }: TechArsenalProps) {
  return (
    <article className={`${styles.bentoCard} ${styles.stackCard} ${className}`}>
      {/* O número agora se adapta se você aprender mais coisas no futuro */}
      <div className={styles.stackNumber}>{stack.length}+</div>
      <div className={styles.stackLabel}>Stack Principal</div>
      <div className={styles.stackGrid}>
        {stack.map((tech) => (
          <span key={tech} className={styles.projectTag}>{tech}</span>
        ))}
      </div>
    </article>
  );
}