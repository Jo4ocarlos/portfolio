// src/components/bento/BentoCard.tsx
import { Project } from '@/types/portfolio';
import { Suspense } from 'react';
import { AiTriggerButton } from '@/components/AiTriggerButton/AiTriggerButton';
import styles from './bento.module.css';

interface BentoCardProps {
  project: Project;
  className?: string;
}

export function BentoCard({ project, className = '' }: BentoCardProps) {
  return (
    <article className={`${styles.bentoCard} ${className}`}>
      <div className={styles.projectHeader}>
        <span className={styles.projectCategory}>{project.category}</span>
        {/* Passamos uma classe global para o CSS do hover funcionar */}
        <Suspense fallback={<span className="ai-trigger-btn">A carregar IA...</span>}>
          <AiTriggerButton className="ai-trigger-btn" projectId={project.id} />
        </Suspense>
      </div>
      
      <h3 className={styles.bioTitle}>{project.title}</h3>
      <p className={styles.bioText}>{project.shortDescription}</p>

      {project.modules && project.modules.length > 0 ? (
        <div className={styles.pluginList}>
          {project.modules.map((mod, index) => (
            <div key={index} className={styles.pluginItemRow}>
              <span className={styles.pluginItemName}>{mod.name}</span>
              <span className={styles.pluginItemBadge}>{mod.badge}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.projectTags}>
          {project.techStack.map((tech) => (
            <span key={tech} className={styles.projectTag}>{tech}</span>
          ))}
        </div>
      )}
    </article>
  );
}