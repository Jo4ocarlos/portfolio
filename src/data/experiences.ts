import { Experience } from '@/types/portfolio';

export const experiences: Experience[] = [
  {
      id: 'graph-a',
      role: 'Desenvolvedor',
      company: 'Graph A',
      period: 'Julho/2025 - Presente', 
      description: 'Desenvolvimento de e-commerces e automação de rotinas internas. Crio plugins customizados (PHP/JS) para checkouts e integro catálogos e estoques de fornecedores utilizando n8n. No front-end (React), construo ferramentas internas, como um gerador de etiquetas logísticas (WMS) e algoritmos de nesting para precificação automática.',
      technologies: ['React', 'Node.js', 'n8n', 'PHP', 'WordPress', 'Google Sheets'],
    },
    {
      id: 'freelancer',
      role: 'Desenvolvedor Web & Freelancer',
      company: 'Autônomo',
      period: 'Maio/2024 - Presente',
      description: 'Desenvolvimento web de ponta a ponta, incluindo a criação do novo site da GH Locações e o sistema de agendamento online do consultório Rogério Caetano. Paralelamente ao desenvolvimento web, também atuo prestando serviços de produção audiovisual (videomaker) e gestão de social media para clientes independentes.',
      technologies: ['React', 'Next.js', 'TypeScript', 'Segurança Web', 'Audiovisual / Videomaker'],
    },
    {
      id: 'otorhinus',
      role: 'Estagiário em Gestão de TI',
      company: 'Otorhinus Clínica Médica',
      period: 'Agosto/2023 - Agosto/2024',
      description: 'Suporte técnico focado na manutenção de equipamentos e resolução de falhas de hardware e rede. Criação e gerenciamento de planilhas de controle interno para organizar e otimizar os fluxos organizacionais da clínica.',
      technologies: ['Infraestrutura de TI', 'Manutenção de Hardware', 'Google Sheets'],
    }
];