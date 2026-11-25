import { AboutCard } from '@/components/Bento/AboutCard';
import { ExperienceCard } from '@/components/Bento/ExperienceCard';
import { ProfileCard } from '@/components/Bento/ProfileCard';
import { ProjectCard } from '@/components/Bento/ProjectCard';
import { TechStack } from '@/components/Bento/TechStack';
import { AiDrawerLoader } from '@/components/AiDrawer/AiDrawerLoader';
import { GithubBanner } from '@/components/GithubBanner/GithubBanner';
import { experiences } from '@/data/experiences';
import { profile } from '@/data/profile';
import { toProjectPreview } from '@/data/project-preview';
import { getProject, projects, type ProjectId } from '@/data/projects';
import styles from './page.module.css';

const featuredProjects: readonly { id: ProjectId; className: string }[] = [
  { id: 'wms-label-generator', className: styles.half },
  { id: 'ecommerce-plugins', className: styles.tall },
  { id: 'portfolio-assistant', className: styles.tall },
  { id: 'nesting-algorithm-core', className: styles.half },
];

export default function Home() {
  return (
    <>
      <main className={styles.page}>
        <div className={styles.profileColumn}>
          <ProfileCard profile={profile} />
          <AboutCard paragraphs={profile.bio} />
          <TechStack stack={profile.stack} />
        </div>

        <GithubBanner
          username={profile.githubUsername}
          profileUrl={profile.links.github}
          className={styles.banner}
        />

        <div className={styles.grid}>
          <section className={styles.gridSection} aria-labelledby="projects-title">
            <h2 id="projects-title" className="visually-hidden">Projetos</h2>
            {featuredProjects.map(({ id, className }) => (
              <ProjectCard key={id} project={getProject(id)} className={className} />
            ))}
          </section>

          <section className={styles.gridSection} aria-labelledby="experience-title">
            <h2 id="experience-title" className="visually-hidden">Experiência</h2>
            {experiences.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} className={styles.third} />
            ))}
          </section>
        </div>
      </main>

      <AiDrawerLoader projects={projects.map(toProjectPreview)} />
    </>
  );
}
