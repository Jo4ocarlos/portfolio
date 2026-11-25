# Portfólio de João Carlos

**No ar:** [joaocarlos-dev.vercel.app](https://joaocarlos-dev.vercel.app)

Site em Next.js que apresenta meus projetos e tem um assistente de IA para responder perguntas sobre eles. O código foi desenvolvido com apoio de IA.

## O que o projeto faz

* **Bento numa tela só:** no desktop, perfil, projetos e experiência aparecem sem rolagem, com link para o código e a demonstração quando existem.
* **Resumo do projeto:** "Detalhes + IA" abre um painel com problema, decisão e situação, mesmo que a IA esteja fora do ar.
* **Assistente de IA:** responde com o contexto do projeto que está aberto ou, na visão geral, com as experiências e a lista de projetos.
* **Troca de modelo:** a resposta vem da Groq. Se ela recusar, cair, demorar mais de 10 segundos ou terminar sem texto, o servidor tenta o Google Gemini. A troca só é possível antes do primeiro trecho da resposta. Se os dois falharem, a rota responde 503 e a tela mostra um erro.
* **Limites da rota:** o Zod recusa requisição malformada, pergunta acima de 500 caracteres e mais de 11 mensagens. São até 10 requisições por minuto por IP.
* **Estado na URL:** o painel abre e fecha pelos parâmetros da URL, então dá para compartilhar um link já no projeto certo.
* **Histórico local:** a conversa fica no `localStorage` do navegador e passa por uma checagem de formato antes de voltar para a tela.

## Limites conhecidos

* Ainda não há testes automatizados. É o que estou estudando e vou adicionar agora.
* O limite de requisições fica na memória de cada instância. Ele contém abuso comum, mas não substitui um contador compartilhado ou uma regra no firewall.

## Organização

| Pasta | Conteúdo |
|---|---|
| `src/app` | página e rota `/api/chat` |
| `src/components` | interface |
| `src/data` | textos e dados dos projetos |
| `src/hooks` | estado do chat |
| `src/lib/chat` | limites, validação, prompt, escolha do modelo e histórico |
| `src/types` | tipos compartilhados |

## Tecnologias

Next.js (App Router), React, TypeScript, CSS Modules, Zod, Vercel AI SDK, Groq e Google Gemini.

## Rodando localmente

1. Clone o repositório e instale as dependências:
   ```bash
   git clone https://github.com/Jo4ocarlos/portfolio.git
   cd portfolio
   npm install
   ```

2. Crie um arquivo `.env.local` na raiz. Ele não deve ir para o Git:
   ```env
   GROQ_API_KEY=sua_chave_da_groq
   GOOGLE_GENERATIVE_AI_API_KEY=sua_chave_do_gemini
   ```

3. Inicie o servidor:
   ```bash
   npm run dev
   ```

Para abrir pelo celular na mesma rede, inclua `ALLOWED_DEV_ORIGINS=ip_do_computador` no `.env.local`.

## Verificações

```bash
npm run lint
npm run typecheck
npm run build
```

O GitHub Actions roda as três a cada push na `main` e em pull requests.

---
João Carlos de Almeida Silva · [LinkedIn](https://www.linkedin.com/in/joão-carlos-de-almeida-silva-724579171/)
