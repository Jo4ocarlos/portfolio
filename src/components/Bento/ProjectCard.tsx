import { AiTriggerButton } from '@/components/AiTriggerButton/AiTriggerButton';
import { Card, CardText, CardTitle } from '@/components/Card/Card';
import { CardLink } from '@/components/CardLink/CardLink';
import type { Project } from '@/types/portfolio';
import { ModuleList } from './ModuleList';
import styles from './projectCard.module.css';

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const { id, category, title, shortDescription, modules, techStack, liveUrl, repositoryUrl } = project;

  return (
    <Card className={className}>
      <header className={styles.header}>
        <p className={styles.category}>{category}</p>
        <AiTriggerButton projectId={id} projectTitle={title} />
      </header>

      <CardTitle>{title}</CardTitle>
      <CardText>{shortDescription}</CardText>

      {modules && <ModuleList modules={modules} />}

      <footer className={styles.footer}>
        <ul className={styles.tags} aria-label="Tecnologias do projeto">
          {techStack.map((technology) => (
            <li key={technology} className={styles.tag}>{technology}</li>
          ))}
        </ul>

        <div className={styles.links}>
          {liveUrl && <CardLink href={liveUrl} label="Demo" context={`de ${title}`} />}
          {repositoryUrl && <CardLink href={repositoryUrl} label="Código" context={`de ${title}`} />}
        </div>
      </footer>
    </Card>
  );
}
