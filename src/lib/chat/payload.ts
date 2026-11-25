import { z } from 'zod';
import { projectIds } from '@/data/projects';
import { CHAT_LIMITS } from './limits';

const questionSchema = z.object({
  role: z.literal('user'),
  content: z.string().trim().min(1).max(CHAT_LIMITS.maxQuestionLength),
});

const answerSchema = z.object({
  role: z.literal('assistant'),
  content: z.string().trim().min(1).max(CHAT_LIMITS.maxAnswerLength),
});

const chatPayloadSchema = z.object({
  messages: z
    .array(z.discriminatedUnion('role', [questionSchema, answerSchema]))
    .min(1)
    .max(CHAT_LIMITS.maxMessages)
    .refine((messages) => messages.at(-1)?.role === 'user', 'A última mensagem precisa ser uma pergunta'),
  projectId: z.enum(projectIds).optional(),
});

export type ChatPayload = z.infer<typeof chatPayloadSchema>;

/** Devolve null para JSON quebrado ou fora do formato: nos dois casos o erro é de quem enviou. */
export async function readChatPayload(request: Request): Promise<ChatPayload | null> {
  const body: unknown = await request.json().catch(() => null);
  const result = chatPayloadSchema.safeParse(body);
  return result.success ? result.data : null;
}
