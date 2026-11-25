import type { Profile } from '@/types/portfolio';

const githubUsername = 'Jo4ocarlos';

export const profile: Profile = {
  name: 'João Carlos',
  title: 'Desenvolvedor de sistemas internos e integrações',
  location: 'São Paulo, SP',
  bio: [
    'Transformo processos manuais em sistemas que a operação consegue usar. Gosto de entender o problema com quem vive a rotina, definir a regra e validar o resultado.',
    'Uso IA para acelerar o desenvolvimento. Sou formado em Gestão da Tecnologia da Informação (2024).',
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
