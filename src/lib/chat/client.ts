import type { ChatMessage } from '@/types/chat';
import { CHAT_LIMITS } from './limits';

const CHAT_ENDPOINT = '/api/chat';

export class ChatRequestError extends Error {
  constructor(readonly status: number) {
    super(`A rota de chat respondeu ${status}`);
    this.name = 'ChatRequestError';
  }
}

interface AskOptions {
  messages: readonly ChatMessage[];
  projectId?: string;
  signal?: AbortSignal;
}

function getMaxLength({ role }: ChatMessage): number {
  return role === 'user' ? CHAT_LIMITS.maxQuestionLength : CHAT_LIMITS.maxAnswerLength;
}

/** Recorta a conversa para o que a rota aceita: só o trecho recente, começando por uma pergunta. */
export function toRequestMessages(messages: readonly ChatMessage[]): ChatMessage[] {
  const recent = messages
    .filter(({ content }) => content.trim() !== '')
    .slice(-CHAT_LIMITS.maxMessages);

  const firstQuestion = recent.findIndex(({ role }) => role === 'user');

  return recent.slice(Math.max(firstQuestion, 0)).map((message) => ({
    role: message.role,
    content: message.content.slice(0, getMaxLength(message)),
  }));
}

async function* readChunks(body: ReadableStream<Uint8Array>): AsyncGenerator<string> {
  const reader = body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    yield decoder.decode(value, { stream: true });
  }

  yield decoder.decode();
}

/** Pergunta à rota e entrega a resposta aos poucos. Lança se a rota recusar ou a conexão cair. */
export async function* streamAnswer({ messages, projectId, signal }: AskOptions): AsyncGenerator<string> {
  const response = await fetch(CHAT_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: toRequestMessages(messages), projectId }),
    signal,
  });

  if (!response.ok) throw new ChatRequestError(response.status);
  if (!response.body) throw new Error('A resposta veio sem conteúdo');

  yield* readChunks(response.body);
}

export function getChatErrorMessage(error: Error): string {
  if (error instanceof ChatRequestError && error.status === 429) {
    return 'Muitas perguntas em pouco tempo. Espere um minuto e tente de novo.';
  }
  return 'Não consegui responder agora. Tente de novo em instantes ou me mande um e-mail.';
}
