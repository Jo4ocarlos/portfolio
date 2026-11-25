import type { ComponentProps } from 'react';
import styles from './Card.module.css';

type CardProps = ComponentProps<'article'> & {
  as?: 'article' | 'section';
};

export function Card({ as: Tag = 'article', className = '', ...props }: CardProps) {
  return <Tag className={`${styles.card} ${className}`} {...props} />;
}

type CardTitleProps = ComponentProps<'h3'> & {
  as?: 'h2' | 'h3';
};

export function CardTitle({ as: Tag = 'h3', className = '', ...props }: CardTitleProps) {
  return <Tag className={`${styles.title} ${className}`} {...props} />;
}

export function CardText({ className = '', ...props }: ComponentProps<'p'>) {
  return <p className={`${styles.text} ${className}`} {...props} />;
}
