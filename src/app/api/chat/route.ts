import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { groq } from '@ai-sdk/groq';
import { CHAT_LIMITS } from '@/lib/chat/limits';
import { openStreamWithFallback, type ModelCandidate } from '@/lib/chat/model-stream';
import { readChatPayload } from '@/lib/chat/payload';
import { createRateLimiter, getClientIp } from '@/lib/chat/rate-limit';
import { buildSystemPrompt } from '@/lib/chat/system-prompt';
import { textStreamResponse } from '@/lib/chat/text-stream-response';

export const maxDuration = 60;

const CLIENT_CLOSED_REQUEST = 499;

// O SDK só lê GOOGLE_GENERATIVE_AI_API_KEY. GEMINI_API_KEY era o nome usado no README.
const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY,
});

const models: readonly ModelCandidate[] = [
  { name: 'Groq', model: groq('openai/gpt-oss-20b') },
  { name: 'Gemini', model: google('gemini-3.1-flash-lite') },
];

const rateLimiter = createRateLimiter({
  maxRequests: CHAT_LIMITS.requestsPerWindow,
  windowMs: CHAT_LIMITS.windowMs,
});

function errorResponse(error: string, status: number, headers?: HeadersInit): Response {
  return Response.json({ error }, { status, headers });
}

export async function POST(request: Request): Promise<Response> {
  const limit = rateLimiter.check(getClientIp(request.headers));
  if (!limit.allowed) {
    return errorResponse('Muitas perguntas em pouco tempo', 429, {
      'Retry-After': String(limit.retryAfterSeconds),
    });
  }

  const payload = await readChatPayload(request);
  if (!payload) return errorResponse('Requisição inválida', 400);

  try {
    const answer = await openStreamWithFallback(models, {
      instructions: buildSystemPrompt(payload.projectId),
      messages: payload.messages,
      abortSignal: request.signal,
    });
    return textStreamResponse(answer);
  } catch {
    if (request.signal.aborted) return new Response(null, { status: CLIENT_CLOSED_REQUEST });
    return errorResponse('Assistente indisponível no momento', 503);
  }
}
