// src/components/GithubBanner/GithubCalendarClient.tsx
"use client";

import dynamic from 'next/dynamic';

// 1. O dynamic AQUI DENTRO do Client Component força o Code Splitting.
// 2. A propriedade 'loading' injeta o esqueleto com a altura exata, matando o CLS.
const GitHubCalendar = dynamic(
  () => import('react-github-calendar').then((mod) => mod.GitHubCalendar),
  { 
    ssr: false,
    loading: () => <div style={{ minHeight: '155px', width: '100%' }} /> 
  }
);

export default function GithubCalendarClient() {
  return (
    <GitHubCalendar 
      username="jo4ocarlos" 
      colorScheme="dark" 
      blockSize={11}
      blockMargin={4}
      fontSize={12}
    />
  );
}