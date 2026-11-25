import Link from 'next/link';
import { SparkleIcon } from '@/components/icons';
import { getDrawerHref } from '@/lib/drawer-url';
import styles from './AiTriggerButton.module.css';

interface AiTriggerButtonProps {
  projectId?: string;
  projectTitle?: string;
}

/** Sem projeto, abre o assistente na visão geral. */
export function AiTriggerButton({ projectId, projectTitle }: AiTriggerButtonProps) {
  return (
    <Link href={getDrawerHref(projectId)} scroll={false} className={styles.button}>
      <SparkleIcon className={styles.icon} />
      {projectId ? 'Detalhes + IA' : 'Pergunte à IA'}
      {projectTitle && <span className="visually-hidden">: {projectTitle}</span>}
    </Link>
  );
}
