import { ExternalLink } from '@/components/ExternalLink/ExternalLink';
import type { ProjectModule } from '@/types/portfolio';
import styles from './moduleList.module.css';

interface ModuleListProps {
  modules: readonly ProjectModule[];
}

export function ModuleList({ modules }: ModuleListProps) {
  return (
    <ul className={styles.list}>
      {modules.map(({ name, badge, repositoryUrl }) => (
        <li key={name}>
          {repositoryUrl ? (
            <ExternalLink href={repositoryUrl} className={`${styles.row} ${styles.rowLink}`}>
              <span className={styles.name}>
                {name} <span aria-hidden="true">↗</span>
              </span>
              <span className={styles.badge}>{badge}</span>
            </ExternalLink>
          ) : (
            <div className={styles.row}>
              <span className={styles.name}>{name}</span>
              <span className={styles.badge}>{badge}</span>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
