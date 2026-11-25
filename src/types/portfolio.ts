export type Technology =
  | 'APIs REST'
  | 'Git'
  | 'Google Sheets'
  | 'JavaScript'
  | 'MySQL'
  | 'Next.js'
  | 'Node.js'
  | 'PHP'
  | 'React'
  | 'TypeScript'
  | 'WordPress';

export type ProjectCategory =
  | 'E-commerce'
  | 'IA aplicada'
  | 'SaaS & Algoritmos'
  | 'Sistema Interno'
  | 'Web Development';

export type RepositoryType = 'public' | 'private' | 'multi-repo' | 'none';

export interface Profile {
  name: string;
  title: string;
  location: string;
  bio: readonly string[];
  avatarUrl: string;
  stack: readonly Technology[];
  githubUsername: string;
  links: {
    github: string;
    linkedin: string;
    email: string;
  };
}

/** Trecho que já existe no texto e vira link. */
export interface InlineLink {
  text: string;
  url: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  technologies: readonly string[];
  link?: InlineLink;
}

export interface ProjectModule {
  name: string;
  badge: string;
  repositoryUrl?: string;
}

export interface TechnicalHighlight {
  title: string;
  description: string;
  codeSnippet: string;
  language: string;
}

export interface CaseSummary {
  problem: string;
  decision: string;
  status: string;
}

export interface Project {
  id: string;
  title: string;
  client?: string;
  category: ProjectCategory;
  shortDescription: string;
  caseSummary?: CaseSummary;
  challenge: string;
  solution: string;
  impact: string;
  techStack: readonly Technology[];
  repositoryUrl?: string;
  repositoryType: RepositoryType;
  liveUrl?: string;
  modules?: readonly ProjectModule[];
  technicalHighlights?: readonly TechnicalHighlight[];
  aiSuggestions?: readonly string[];
}

/** O que o painel de IA precisa no navegador. O resto do projeto fica no servidor. */
export type ProjectPreview = Pick<Project, 'id' | 'title' | 'caseSummary' | 'aiSuggestions'>;
