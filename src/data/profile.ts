import { Profile } from '@/types/portfolio';

export const profile: Profile = {
  name: 'João Carlos',
  title: 'Desenvolvedor Full Stack | Sistemas internos, e-commerce e SaaS',
  location: 'São Paulo, SP',
  // Parágrafos separados por \n\n. Cuidado com o tamanho: no desktop o card precisa
  // caber na tela junto com a foto (por volta de 450 caracteres no total).
  bio: 'Sou desenvolvedor full stack, formado em Gestão da Tecnologia da Informação (2024). Crio sistemas de gestão e ferramentas internas com React, Next.js e TypeScript, e integrações em Node.js. Gosto de entender a operação antes de programar: é ali que aparecem as melhorias que facilitam a rotina das pessoas.\n\nUso IA no dia a dia para acelerar as entregas, sempre com foco em algo que funcione de verdade. PHP e WordPress entram quando o projeto pede.',
  availability: true,
  avatarUrl: '/foto-perfil.jpg',
  stack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PHP / WordPress', 'MySQL'],
  socials: {
    github: 'https://github.com/jo4ocarlos',
    linkedin: 'https://www.linkedin.com/in/joão-carlos-de-almeida-silva-724579171/',
    email: 'joaocar4892@gmail.com',
  },
};
