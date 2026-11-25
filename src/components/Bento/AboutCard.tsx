import { AiTriggerButton } from '@/components/AiTriggerButton/AiTriggerButton';
import { Card, CardText, CardTitle } from '@/components/Card/Card';
import styles from './aboutCard.module.css';

interface AboutCardProps {
  paragraphs: readonly string[];
}

export function AboutCard({ paragraphs }: AboutCardProps) {
  return (
    <Card as="section" aria-labelledby="about-title">
      <header className={styles.header}>
        <CardTitle as="h2" id="about-title">Sobre mim</CardTitle>
        <AiTriggerButton />
      </header>
      {paragraphs.map((paragraph) => (
        <CardText key={paragraph}>{paragraph}</CardText>
      ))}
    </Card>
  );
}
