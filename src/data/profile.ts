import type { Profile } from '@/types/portfolio';

const githubUsername = 'Jo4ocarlos';

export const profile: Profile = {
  name: 'João Carlos',
  title: 'Desenvolvedor de sistemas internos e integrações',
  location: 'São Paulo, SP',
  bio: [
    'Levanto os requisitos com quem vive a rotina, defino as regras e testo com quem usa antes de entregar. Uso IA no desenvolvimento e integrei LLMs ao assistente deste portfólio.',
    'Como autônomo, tive clientes próprios, com contrato, e entregava sites, loja virtual e vídeos, do roteiro à edição.',
    'Formado em Gestão da TI (2024).',
  ],
  avatarUrl: '/foto-perfil.jpg',
  stack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'APIs REST', 'MySQL', 'PHP', 'WordPress', 'Git'],
  githubUsername,
  links: {
    github: `https://github.com/${githubUsername}`,
    linkedin: 'https://www.linkedin.com/in/joão-carlos-de-almeida-silva-724579171/',
    email: 'joaocar4892@gmail.com',
  },
};
