// src/types/portfolio.ts

export type TechStack =
  | 'React'
  | 'Next.js'
  | 'TypeScript'
  | 'JavaScript'
  | 'Node.js'
  | 'n8n'
  | 'REST APIs'
  | 'APIs REST'
  | 'PHP'
  | 'WordPress'
  | 'CSS3'
  | 'CSS Modules'
  | 'HTML5'
  | 'Google Sheets'
  | 'Git'
  | 'Google Sheets API'
  |'Worker Threads';

export type ProjectCategory =
  | 'E-commerce'
  | 'Automação Corporativa'
  | 'Sistema Interno'
  | 'Web Development'
  | 'SaaS & Algoritmos';

  export type RepositoryType = 'public' | 'private' | 'multi-repo' | 'none';

export interface Profile {
  name: string;
  title: string;
  location: string;
  bio: string;
  availability: boolean;
  socials: {
    github: string;
    linkedin: string;
    email: string;
  };
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  technologies: readonly string[];
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

export interface Project {
  id: string;
  title: string;
  client?: string;
  category: ProjectCategory;
  shortDescription: string;
  challenge: string;
  solution: string;
  impact: string;
  techStack: readonly TechStack[];
  featured: boolean;
  githubProfile?: string;
  repositoryUrl?: string;
  repositoryType: RepositoryType; // Agora só aceita as 4 strings exatas definidas la em cima
  liveUrl?: string;
  modules?: readonly ProjectModule[];
  technicalHighlights?: readonly TechnicalHighlight[]; // <-- ADICIONADO READONLY
  aiSuggestions?: readonly string[]; // <-- ADICIONADO READONLY
}

export interface PortfolioData {
  profile: Profile;
  experiences: Experience[];
  projects: Project[];
}