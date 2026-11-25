import { Card, CardText, CardTitle } from '@/components/Card/Card';
import { ExternalLink } from '@/components/ExternalLink/ExternalLink';
import type { Experience } from '@/types/portfolio';
import styles from './experienceCard.module.css';

interface ExperienceCardProps {
  experience: Experience;
  className?: string;
}

export function ExperienceCard({ experience, className }: ExperienceCardProps) {
  const { company, period, role, description, link } = experience;

  return (
    <Card className={className}>
      <header>
        <div className={styles.heading}>
          <CardTitle>{company}</CardTitle>
          <p className={styles.period}>{period}</p>
        </div>
        <p className={styles.role}>{role}</p>
      </header>
      <CardText>
        <Description text={description} link={link} />
      </CardText>
    </Card>
  );
}

interface DescriptionProps {
  text: string;
  link: Experience['link'];
}

function Description({ text, link }: DescriptionProps) {
  if (!link || !text.includes(link.text)) return text;

  const [before, after] = text.split(link.text);

  return (
    <>
      {before}
      <ExternalLink href={link.url} className={styles.link}>{link.text}</ExternalLink>
      {after}
    </>
  );
}
