import type { Experience } from '@/types/portfolio';
import { ghLocacoes } from './projects/gh-locacoes';

export const experiences: readonly Experience[] = [
  {
    id: 'graph-a',
    role: 'Desenvolvedor Web',
    company: 'Graph A',
    period: 'Julho/2025 - Presente',
    description: 'Desenvolvo lojas WooCommerce para clientes e cuido delas e do site da empresa. Também criei o gerador de etiquetas e um painel que reúne os pedidos das lojas.',
    technologies: ['React', 'TypeScript', 'Node.js', 'PHP', 'WooCommerce', 'MySQL'],
  },
  {
    id: 'freelancer',
    role: 'Desenvolvedor Web (freelancer)',
    company: 'Autônomo',
    period: 'Maio/2024 - Outubro/2026',
    description: 'Fiz o site institucional da GH Locações, em WordPress, e cuidei das redes sociais da empresa. Também criei um agendamento online que o consultório Rogério Caetano usou.',
    technologies: ['WordPress'],
    link: { text: 'site institucional da GH Locações', url: ghLocacoes.liveUrl },
  },
  {
    id: 'otorhinus',
    role: 'Estagiário em Gestão de TI',
    company: 'Otorhinus Clínica Médica',
    period: 'Agosto/2023 - Agosto/2024',
    description: 'Suporte de hardware e rede para a clínica e criação de planilhas de controle interno para organizar a rotina administrativa.',
    technologies: ['Suporte técnico', 'Redes', 'Google Sheets'],
  },
];
