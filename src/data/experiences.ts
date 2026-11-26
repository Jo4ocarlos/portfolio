import type { Experience } from '@/types/portfolio';
import { ghLocacoes } from './projects/gh-locacoes';

export const experiences: readonly Experience[] = [
  {
    id: 'graph-a',
    role: 'Desenvolvedor Web',
    company: 'Graph A',
    period: 'Julho/2025 - Presente',
    description: 'Desenvolvo lojas WooCommerce para clientes e cuido delas e do site da empresa. Também criei o gerador de etiquetas e um painel que reúne os pedidos das lojas.',
  },
  {
    id: 'freelancer',
    role: 'Desenvolvedor Web, Social Media e Videomaker',
    company: 'Autônomo',
    period: 'Maio/2024 - Outubro/2026',
    description: 'Clientes próprios, com contrato. Fiz o site institucional da GH Locações e cuidei das redes. Para um consultório, criei um site com agendamento. Vídeos do roteiro à edição.',
    link: { text: 'site institucional da GH Locações', url: ghLocacoes.liveUrl },
  },
  {
    id: 'otorhinus',
    role: 'Estagiário de TI',
    company: 'Otorhinus Clínica Médica',
    period: 'Outubro/2023 - Julho/2024',
    description: 'Desenvolvi partes do site, como uma área com senha para residentes, e automatizei planilhas de convênios. Também cuidei de e-mails e suporte.',
  },
];
