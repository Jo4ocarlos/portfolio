# 🚀 Portfólio Interativo & Assistente de IA

*[joaocarlos-dev.vercel.app]*

![Next.js](https://img.shields.io/badge/next.js-%23000000.svg?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vercel AI SDK](https://img.shields.io/badge/Vercel_AI-000?style=for-the-badge&logo=vercel&logoColor=white)

Em vez de um PDF estático ou uma vitrine de links, construí este portfólio como uma aplicação Web completa (Next.js) orientada a dados. O diferencial é a integração de um **Assistente de IA nativo** que permite aos Tech Leads e Recrutadores "conversarem" com a minha base de código, recebendo respostas em tempo real sobre minhas decisões de arquitetura, integrações B2B e automações.

## Destaques de Arquitetura

O projeto foi desenhado para demonstrar domínio em engenharia de front-end e resiliência de software:

* **Engine de IA com Fallback Automático:** Integração com o Vercel AI SDK focada em alta disponibilidade. Se o modelo primário de LLM (Groq) sofrer *Rate Limit* ou instabilidade, o backend redireciona o stream silenciosamente para o fallback (Google Gemini). A interface do usuário nunca trava.
* **URL-Driven State & Deep Linking:** O controle do Drawer da IA não depende de `useState` isolados, mas sim dos `searchParams` nativos do Next.js. Isso garante navegação não-destrutiva e permite compartilhar links diretos (Deep Links) que abrem o portfólio já focado no contexto de um projeto específico.
* **Hydration Segura e Validação de Cache:** O histórico do chat é persistido no `localStorage`. Para blindar o React contra injeção de payloads corrompidos que causariam quebra de UI, o sistema hidrata os dados passando por validação estrita (Zod + Type Guards) antes da renderização.
* **Data Layer Desacoplada (Headless Concept):** Separação absoluta entre Interface (`src/components`), Tipagem (`src/types`) e Dados (`src/data`). O layout em *Bento Grid* consome os dados de forma agnóstica, permitindo escalar ou alterar o conteúdo sem encostar no código visual.

## Tecnologias Utilizadas

* **Core:** React, Next.js (App Router), TypeScript.
* **Integração de IA:** Vercel AI SDK, Groq API, Google Gemini API.
* **Estilização e UI:** CSS Modules, CSS Grid Avançado (Mobile First, Bento Box pattern).
* **Segurança e Validação:** Zod, Type Guards estritos.

## Roteiro de Testes para Avaliadores

Se você está revisando este código, recomendo testar os seguintes comportamentos projetados para o ecossistema React:

1. **Injeção de Contexto Dinâmico:** Clique no botão "Analisar com IA" dentro de qualquer card de projeto. Observe como a URL muda e o *System Prompt* injeta exclusivamente as regras de negócio daquela ferramenta específica.
2. **Interrupção de Stream:** Enquanto a IA estiver gerando a resposta, clique no botão vermelho de *Stop*. A aplicação aciona um `AbortController` nativo que corta o consumo da API na mesma hora, demonstrando gestão de requisições pendentes.
3. **Persistência Resiliente:** Atualize a página (`F5`) no meio de um chat. O hook de hidratação validará o cache e remontará a interface e o histórico exatamente onde você parou.

## ⚙️ Rodando Localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/jo4ocarlos/portfolio.git
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env.local` na raiz do projeto e adicione suas chaves. *(Nota: Nunca comite este arquivo)*
   ```env
   GROQ_API_KEY=sua_chave_da_groq_aqui
   GEMINI_API_KEY=sua_chave_do_gemini_aqui
   ```

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

---
*Desenvolvido por João Carlos de Almeida Silva — Conecte-se comigo no [LinkedIn](https://www.linkedin.com/in/joão-carlos-de-almeida-silva-724579171/)*