// src/app/api/chat/route.ts
import { google } from '@ai-sdk/google';
import { groq } from '@ai-sdk/groq';
import { streamText } from 'ai';
import { z } from 'zod';
import { generateSystemPrompt } from '@/lib/ai-prompt';
import { buildStreamResponse } from '@/lib/stream-utils';

export type MessageRole = 'user' | 'assistant' | 'system';

export interface ChatMessage {
  role: MessageRole;
  content: string;
}

const chatPayloadSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(['user', 'assistant', 'system']),
      content: z.string().min(1, 'A mensagem não pode ser vazia'),
    })
  ),
  projectId: z.string().optional(),
});

export async function POST(req: Request): Promise<Response> {
  try {
    const rawBody = (await req.json()) as unknown;
    const parsed = chatPayloadSchema.safeParse(rawBody);

    if (!parsed.success) {
      return Response.json(
        { error: 'Payload inválido', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { messages, projectId } = parsed.data;

    // 1. Busca as regras de negócio isoladas
    const systemPrompt = generateSystemPrompt(projectId);

    const formattedMessages = messages.map((m: ChatMessage) => ({
      role: m.role,
      content: m.content,
    }));
 
    
    try {
      // 2. TENTATIVA PRINCIPAL (Groq)
      const resultGroq = streamText({
        model: groq('openai/gpt-oss-20b'),
        system: systemPrompt,
        messages: formattedMessages,
        maxRetries: 0, 
        abortSignal: req.signal,
      });

      // Hack de checagem do primeiro chunk para validar estabilidade da API
      const iterator = resultGroq.textStream[Symbol.asyncIterator]();
      const firstChunk = await iterator.next(); 

      return buildStreamResponse(async (controller, encoder) => {
        if (!firstChunk.done) {
          controller.enqueue(encoder.encode(firstChunk.value));
        }
        while (true) {
          const { done, value } = await iterator.next();
          if (done) break;
          controller.enqueue(encoder.encode(value));
        }
      });

    } catch (erroGroq) {
      console.warn('⚠️ Falha crítica na Groq. Acionando Google Gemini (Reserva)...');
      
      // 3. FALLBACK (Gemini)
      const resultGemini = streamText({
        model: google('gemini-3.1-flash-lite'),
        system: systemPrompt,
        messages: formattedMessages,
        maxRetries: 0,
        abortSignal: req.signal,
      });

      return buildStreamResponse(async (controller, encoder) => {
        for await (const chunk of resultGemini.textStream) {
          controller.enqueue(encoder.encode(chunk));
        }
      });
    }

  } catch (error) {
    console.error('[API Chat Route Error]:', error);
    return Response.json(
      { error: 'Falha interna no processamento da rota de IA' },
      { status: 500 }
    );
  }
}