import { Profile } from '@/types/portfolio';

export const profile: Profile = {
  name: 'João Carlos',
    title: 'Desenvolvedor Full Stack | E-commerce & Automação',
    location: 'São Paulo, SP',
    bio: 'Formado em Gestão de TI (2024), atuo como desenvolvedor Full Stack. Mais do que apenas escrever código, gosto de entender o negócio como um todo: tenho facilidade em me comunicar, mapear fluxos e enxergar onde a operação pode ser melhorada. Minha base principal no dia a dia é React, Next.js e TypeScript, apoiada por Node.js, PHP e integrações de APIs para entregar sistemas fluidos que realmente facilitem a rotina das pessoas',
    availability: true,
    avatarUrl: '/foto-perfil.jpg',
    stack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PHP', 'n8n'],
    socials: {
      github: 'https://github.com/jo4ocarlos',
      linkedin: 'https://www.linkedin.com/in/joão-carlos-de-almeida-silva-724579171/',
      email: 'mailto:joaocar4892@gmail.com',
    }
};