import { streamText, type LanguageModel } from 'ai';
import type { ChatMessage } from '@/types/chat';
import { CHAT_LIMITS } from './limits';

const FIRST_CHUNK_TIMEOUT_MS = 10_000;
const NEXT_CHUNK_TIMEOUT_MS = 10_000;

export interface ModelCandidate {
  name: string;
  model: LanguageModel;
}

export interface ModelRequest {
  instructions: string;
  messages: ChatMessage[];
  abortSignal?: AbortSignal;
}

// O textStream do SDK termina em silêncio quando o provedor falha.
// O stream completo traz o erro como evento, e aqui ele vira exceção.
async function* readText(model: LanguageModel, request: ModelRequest): AsyncGenerator<string> {
  const result = streamText({
    model,
    ...request,
    maxOutputTokens: CHAT_LIMITS.maxOutputTokens,
    maxRetries: 0,
    timeout: { chunkMs: NEXT_CHUNK_TIMEOUT_MS },
    onError: () => {},
  });

  for await (const part of result.stream) {
    if (part.type === 'error') throw part.error;
    if (part.type === 'abort') throw new DOMException('Resposta interrompida', 'AbortError');
    if (part.type === 'text-delta' && part.text) yield part.text;
  }
}

async function* prepend<T>(first: T, rest: AsyncIterable<T>): AsyncGenerator<T> {
  yield first;
  yield* rest;
}

// Só devolve depois do primeiro trecho: até ali ainda dá para trocar de modelo.
// O timeout do SDK não serve aqui: ele só começa a contar depois que o provedor responde.
async function openStream(model: LanguageModel, request: ModelRequest): Promise<AsyncGenerator<string>> {
  const firstChunk = new AbortController();
  const timeoutId = setTimeout(() => firstChunk.abort(), FIRST_CHUNK_TIMEOUT_MS);
  const abortSignal = AbortSignal.any([firstChunk.signal, ...(request.abortSignal ? [request.abortSignal] : [])]);

  try {
    const chunks = readText(model, { ...request, abortSignal });
    const first = await chunks.next();

    if (first.done) throw new Error('O modelo terminou sem enviar texto');
    return prepend(first.value, chunks);
  } finally {
    clearTimeout(timeoutId);
  }
}

/** Tenta os modelos em ordem. Para se o visitante cancelar; se todos falharem, lança o último erro. */
export async function openStreamWithFallback(
  candidates: readonly ModelCandidate[],
  request: ModelRequest,
): Promise<AsyncGenerator<string>> {
  let lastError: unknown = new Error('Nenhum modelo configurado');

  for (const { name, model } of candidates) {
    try {
      return await openStream(model, request);
    } catch (error) {
      if (request.abortSignal?.aborted) throw error;
      lastError = error;
      console.warn(`[chat] ${name} falhou:`, error instanceof Error ? error.message : error);
    }
  }

  throw lastError;
}
