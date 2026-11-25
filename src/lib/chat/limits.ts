/** Compartilhado: o navegador respeita os limites e a rota os impõe. */
export const CHAT_LIMITS = {
  maxMessages: 11,
  maxQuestionLength: 500,
  maxAnswerLength: 8_000,
  maxOutputTokens: 2_000,
  requestsPerWindow: 10,
  windowMs: 60_000,
} as const;
