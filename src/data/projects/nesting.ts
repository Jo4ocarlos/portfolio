import type { Project } from '@/types/portfolio';

export const nesting = {
  id: 'nesting-algorithm-core',
  title: 'Motor de Nesting (em desenvolvimento)',
  category: 'SaaS & Algoritmos',
  shortDescription: 'Organiza peças de formato livre numa chapa para reduzir a sobra de material no corte. Projeto pessoal, em desenvolvimento, com código fechado.',
  caseSummary: {
    problem: 'No corte de chapa, a forma como as peças são distribuídas define quanto material vira sobra.',
    decision: 'É um produto próprio, então o código e os detalhes técnicos ficam fechados.',
    status: 'Em desenvolvimento, ainda não lançado.',
  },
  challenge: 'No corte de chapa, a forma como as peças são distribuídas define quanto material vira sobra.',
  solution: 'Sistema que recebe as peças e calcula como distribuí-las na chapa. Os detalhes técnicos não são públicos.',
  impact: 'Em desenvolvimento, ainda não lançado.',
  techStack: ['Node.js', 'JavaScript'],
  repositoryType: 'private',
  aiSuggestions: [
    'Que problema o nesting resolve na prática?',
    'Em que situação está o projeto?',
    'Por que o código é fechado?',
  ],
} as const satisfies Project;
