import { Experience } from '@/types/portfolio';

export const experiences: Experience[] = [
  {
    id: 'graph-a',
    role: 'Desenvolvedor',
    company: 'Graph A',
    period: 'Julho/2025 - Presente',
    // TODO: troque uma das frases por um número real assim que tiver. Exemplos do formato:
    // "o gerador de etiquetas atende N pedidos por dia e tirou X horas de digitação por semana"
    // "a integração sincroniza N produtos de M fornecedores"
    description: 'Desenvolvo as ferramentas internas e o e-commerce da empresa. Criei em React o gerador de etiquetas usado na expedição, integrei catálogo e estoque de fornecedores ao site e desenvolvo plugins de WooCommerce para o checkout.',
    technologies: ['React', 'TypeScript', 'Node.js', 'PHP', 'WooCommerce', 'MySQL'],
  },
  {
    id: 'freelancer',
    role: 'Desenvolvedor Web (freelancer)',
    company: 'Autônomo',
    period: 'Maio/2024 - Presente',
    // Videomaker e social media saíram daqui: diluem a experiência como dev.
    // Se quiser manter, coloque no LinkedIn.
    description: 'Projetos web sob demanda para pequenas empresas: o site institucional da GH Locações, em Next.js, e o sistema de agendamento online do consultório Rogério Caetano.',
    technologies: ['Next.js', 'React', 'TypeScript'],
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
