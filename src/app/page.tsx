// src/app/page.tsx
import { Suspense } from 'react';
import styles from './page.module.css';
import { portfolioData } from '@/data/portfolio';
import { AiDrawer } from '@/components/AiDrawer/AiDrawer';
import GithubBanner from '@/components/GithubBanner/GithubBanner';
import { ProfileCard } from '@/components/bento/ProfileCard';
import { BentoCard } from '@/components/bento/BentoCard';
import { ExperienceCard } from '@/components/bento/ExperienceCard';
import { TechArsenal } from '@/components/bento/TechArsenal';

export default function Home() {
  const { profile, projects, experiences } = portfolioData;

  const projectCheckout = projects.find((p) => p.id === 'wms-label-generator') ?? projects[0];
  const projectPlugins = projects.find((p) => p.id === 'ecommerce-plugins');
  const projectNesting = projects.find((p) => p.id === 'nesting-algorithm-core') ?? projects[1];

  return (
    <main className={styles.mainContainer}>
      
      {/* ================= COLUNA ESQUERDA ================= */}
      <aside className={styles.leftColumn}>
        <ProfileCard profile={profile} />
      </aside>

      {/* ================= BANNER MOVIDO AQUI ================= */}
      {/* No mobile, ele vai renderizar naturalmente logo abaixo do "Sobre mim" */}
      <article className={styles.fullWidthBanner}>
        <GithubBanner />
      </article>

      {/* ================= COLUNA DIREITA ================= */}
      <section className={styles.rightGrid}>
        
        {projectCheckout && (
          <BentoCard project={projectCheckout} className={styles.colSpan6} />
        )}

        {projectPlugins && (
          <BentoCard project={projectPlugins} className={`${styles.colSpan3} ${styles.rowSpan2}`} />
        )}

        <TechArsenal className={`${styles.colSpan3} ${styles.rowSpan2}`} />

        {projectNesting && (
          <BentoCard project={projectNesting} className={styles.colSpan6} />
        )}

        {/* Experiências */}
        {experiences.slice(0, 3).map((exp) => (
          <ExperienceCard key={exp.id} experience={exp} className={styles.colSpan4} />
        ))}
        
      </section>

      {/* Isolamento com Suspense para Deep Linking da IA */}
      <Suspense fallback={null}>
        <AiDrawer />
      </Suspense>
      
    </main>
  );
}