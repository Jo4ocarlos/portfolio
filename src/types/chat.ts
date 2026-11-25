export type ChatRole = 'user' | 'assistant';

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export interface StoredChatMessage extends ChatMessage {
  id: string;
}
