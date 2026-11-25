import type { ComponentProps } from 'react';

type ExternalLinkProps = Omit<ComponentProps<'a'>, 'target' | 'rel'>;

export function ExternalLink({ children, ...props }: ExternalLinkProps) {
  return (
    <a target="_blank" rel="noopener noreferrer" {...props}>
      {children}
      <span className="visually-hidden"> (abre em nova aba)</span>
    </a>
  );
}
