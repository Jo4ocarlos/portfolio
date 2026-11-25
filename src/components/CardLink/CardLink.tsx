import { ExternalLink } from '@/components/ExternalLink/ExternalLink';
import styles from './CardLink.module.css';

interface CardLinkProps {
  href: string;
  label: string;
  /** Completa o rótulo para leitor de tela quando ele se repete na página: "Demo" + "de Gerador". */
  context?: string;
}

export function CardLink({ href, label, context }: CardLinkProps) {
  return (
    <ExternalLink href={href} className={styles.link}>
      {label} <span aria-hidden="true">↗</span>
      {context && <span className="visually-hidden"> {context}</span>}
    </ExternalLink>
  );
}
