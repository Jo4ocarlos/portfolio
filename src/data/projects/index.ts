import type { Project } from '@/types/portfolio';
import { ecommercePlugins } from './ecommerce-plugins';
import { ghLocacoes } from './gh-locacoes';
import { labelGenerator } from './label-generator';
import { nesting } from './nesting';
import { portfolioAssistant } from './portfolio-assistant';

const allProjects = [labelGenerator, ecommercePlugins, portfolioAssistant, nesting, ghLocacoes] as const;

export type ProjectId = (typeof allProjects)[number]['id'];

export const projects: readonly Project[] = allProjects;

export const projectIds: readonly ProjectId[] = allProjects.map((project) => project.id);

export function getProject(id: ProjectId): Project {
  const project = projects.find((candidate) => candidate.id === id);
  if (!project) throw new Error(`Projeto "${id}" não cadastrado`);
  return project;
}
