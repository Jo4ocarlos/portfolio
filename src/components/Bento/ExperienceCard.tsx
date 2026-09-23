// src/components/bento/ExperienceCard.tsx
import { Experience } from '@/types/portfolio';
import styles from './bento.module.css';

interface ExperienceCardProps {
  experience: Experience;
  className?: string;
}

export function ExperienceCard({ experience, className = '' }: ExperienceCardProps) {
  return (
    <article className={`${styles.bentoCard} ${className}`}>
      <div className={styles.expHeader}>
        <span className={styles.expCompany}>{experience.company}</span>
        <span className={styles.expDate}>{experience.period}</span>
      </div>
      <div className={styles.expRole}>{experience.role}</div>
      <p className={styles.bioTextSmall}>{experience.description}</p>
    </article>
  );
}