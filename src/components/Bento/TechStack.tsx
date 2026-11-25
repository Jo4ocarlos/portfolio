import type { CSSProperties } from 'react';
import { Card, CardTitle } from '@/components/Card/Card';
import type { Technology } from '@/types/portfolio';
import { getTechIcon } from './techIcons';
import styles from './techStack.module.css';

interface TechStackProps {
  stack: readonly Technology[];
}

export function TechStack({ stack }: TechStackProps) {
  return (
    <Card as="section" className={styles.card} aria-labelledby="tech-stack-title">
      <CardTitle as="h2" id="tech-stack-title" className={styles.title}>Tecnologias que uso</CardTitle>

      <ul className={styles.list}>
        {stack.map((technology) => {
          const { color, path, viewBox = '0 0 24 24' } = getTechIcon(technology);

          return (
            <li key={technology} className={styles.item} style={{ '--tech-color': color } as CSSProperties}>
              <svg className={styles.icon} viewBox={viewBox} aria-hidden="true">
                <path d={path} />
              </svg>
              <span className={styles.label}>{technology}</span>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
