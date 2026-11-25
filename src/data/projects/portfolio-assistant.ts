import type { Project } from '@/types/portfolio';

export const portfolioAssistant = {
  id: 'portfolio-assistant',
  title: 'Assistente de IA do site',
  category: 'IA aplicada',
  shortDescription: 'Responde sobre os projetos deste site. Se o primeiro modelo falhar antes de responder, o servidor tenta o segundo.',
  caseSummary: {
    problem: 'Um card curto não responde às dúvidas de quem quer entender um projeto, e um provedor de IA pode falhar ou atingir o limite.',
    decision: 'O contexto enviado é só o do projeto aberto. Se o primeiro modelo falhar antes de responder, o servidor tenta o segundo.',
    status: 'Está neste site. Se os dois modelos falharem antes de responder, o visitante recebe um erro em vez de uma resposta vazia.',
  },
  challenge: 'Responder dúvidas sobre os projetos a partir do que está cadastrado e não deixar o visitante sem retorno quando um provedor de IA falha.',
  modules: [
    { name: '1. Groq', badge: 'Primeira tentativa' },
    { name: '2. Gemini', badge: 'Reserva' },
    { name: '3. Erro na tela', badge: 'Se os dois falharem' },
  ],
  solution: 'Uma rota do Next.js valida a pergunta, monta o contexto do projeto e chama a Groq. Se ela recusar, cair ou não enviar texto, a rota tenta o Google Gemini. A troca só acontece antes do primeiro trecho da resposta; depois disso, a falha vira erro na tela.',
  impact: 'O assistente está neste portfólio. Não há medição de uso.',
  techStack: ['Next.js', 'TypeScript'],
  repositoryType: 'public',
  repositoryUrl: 'https://github.com/Jo4ocarlos/portfolio',
  aiSuggestions: [
    'O que acontece se o primeiro modelo falhar?',
    'Que informações o assistente usa para responder?',
    'O que o assistente não faz?',
  ],
} as const satisfies Project;
