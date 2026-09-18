// src/app/page.tsx
import { Suspense } from 'react';
import styles from './page.module.css';
import { portfolioData } from '@/data'; // Puxa do index.ts automaticamente
import { ProjectId } from '@/data/projects'; // Importa o tipo estrito
import { AiDrawer } from '@/components/AiDrawer/AiDrawer';
import GithubBanner from '@/components/GithubBanner/GithubBanner';
import { ProfileCard } from '@/components/bento/ProfileCard';
import { BentoCard } from '@/components/bento/BentoCard';
import { ExperienceCard } from '@/components/bento/ExperienceCard';
import { TechArsenal } from '@/components/bento/TechArsenal';

// O Mapa de busca O(1)
const projectMap = new Map(portfolioData.projects.map((p) => [p.id, p]));

function getProject(id: ProjectId) {
  const project = projectMap.get(id);
  if (!project) throw new Error(`Projeto "${id}" ausente na base.`);
  return project;
}

export default function Home() {
  const { profile, experiences } = portfolioData;

  // Busca tipada. Se errar a string, o VSCode avisa antes de salvar.
  const projectCheckout = getProject('wms-label-generator');
  const projectPlugins  = getProject('ecommerce-plugins');
  const projectNesting  = getProject('nesting-algorithm-core');

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
          <BentoCard project={projectCheckout} className={`${styles.colSpan6} ${styles.orderCheckout}`} />
        )}

        {projectPlugins && (
          <BentoCard project={projectPlugins} className={`${styles.colSpan3} ${styles.rowSpan2} ${styles.orderPlugins}`} />
        )}

        {/* TechArsenal com a classe orderTech para reorganizar no mobile*/}
        <TechArsenal className={`${styles.colSpan3} ${styles.rowSpan2} ${styles.orderTech}`} />

       {/* Nesting com a classe orderNesting para subir no mobile */}
        {projectNesting && (
          <BentoCard project={projectNesting} className={`${styles.colSpan6} ${styles.orderNesting}`} />
        )}
        {/* Experiências com a classe orderExp para ficarem no final */}
        {experiences.slice(0, 3).map((exp) => (
          <ExperienceCard key={exp.id} experience={exp} className={`${styles.colSpan4} ${styles.orderExp}`} />
        ))}
        
      </section>

      {/* Isolamento com Suspense para Deep Linking da IA */}
      <Suspense fallback={null}>
        <AiDrawer />
      </Suspense>
      
    </main>
  );
}