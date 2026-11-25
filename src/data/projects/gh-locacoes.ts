import type { Project } from '@/types/portfolio';

export const ghLocacoes = {
  id: 'gh-locacoes',
  title: 'Site institucional GH Locações',
  client: 'GH Locações',
  category: 'Web Development',
  shortDescription: 'Site institucional em WordPress para uma empresa de locação de estruturas para eventos.',
  challenge: 'A empresa precisava de um site que apresentasse os serviços e os trabalhos e recebesse contato de clientes.',
  solution: 'Site em WordPress com Elementor, apresentando serviços e trabalhos e levando o visitante ao contato.',
  impact: 'Trabalho autônomo, no ar. Não há resultado medido.',
  techStack: ['WordPress'],
  liveUrl: 'https://ghloc.com.br',
  repositoryType: 'none',
} as const satisfies Project;
