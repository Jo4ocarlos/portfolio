'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import type { ProjectPreview } from '@/types/portfolio';

// Só no navegador: depende da URL, do localStorage e de um renderizador de Markdown pesado.
const AiDrawer = dynamic(() => import('./AiDrawer').then((module) => module.AiDrawer), { ssr: false });

interface AiDrawerLoaderProps {
  projects: readonly ProjectPreview[];
}

export function AiDrawerLoader({ projects }: AiDrawerLoaderProps) {
  return (
    <Suspense fallback={null}>
      <AiDrawer projects={projects} />
    </Suspense>
  );
}
