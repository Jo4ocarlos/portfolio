import type { StoredChatMessage } from '@/types/chat';

function getStorageKey(projectId?: string): string {
  return `portfolio_chat_${projectId ?? 'general'}`;
}

function isStoredMessage(value: unknown): value is StoredChatMessage {
  if (typeof value !== 'object' || value === null) return false;

  const { id, role, content } = value as Record<string, unknown>;
  return (
    typeof id === 'string' &&
    (role === 'user' || role === 'assistant') &&
    typeof content === 'string' &&
    content.trim() !== ''
  );
}

/** Nunca lança: armazenamento bloqueado ou adulterado equivale a não ter conversa salva. */
export function loadMessages(projectId?: string): StoredChatMessage[] {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(getStorageKey(projectId)) ?? '[]');
    return Array.isArray(saved) ? saved.filter(isStoredMessage) : [];
  } catch {
    return [];
  }
}

export function saveMessages(messages: readonly StoredChatMessage[], projectId?: string): void {
  const key = getStorageKey(projectId);

  try {
    if (messages.length === 0) localStorage.removeItem(key);
    else localStorage.setItem(key, JSON.stringify(messages));
  } catch {
    // Sem armazenamento a conversa continua, só não sobrevive ao recarregar.
  }
}
