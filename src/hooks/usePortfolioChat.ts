'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { streamAnswer } from '@/lib/chat/client';
import { loadMessages, saveMessages } from '@/lib/chat/storage';
import type { ChatRole, StoredChatMessage } from '@/types/chat';

function createMessage(role: ChatRole, content: string): StoredChatMessage {
  return { id: `${role}-${Date.now()}`, role, content };
}

/** Cada projeto tem a própria conversa: para trocar, remonte o componente com outra `key`. */
export function usePortfolioChat(projectId?: string) {
  const [messages, setMessages] = useState(() => loadMessages(projectId));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const requestRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!isLoading) saveMessages(messages, projectId);
  }, [messages, isLoading, projectId]);

  const stop = useCallback(() => {
    requestRef.current?.abort();
    requestRef.current = null;
    setIsLoading(false);
  }, []);

  useEffect(() => () => requestRef.current?.abort(), []);

  const clearMessages = useCallback(() => {
    stop();
    setMessages([]);
    setError(null);
  }, [stop]);

  const sendMessage = useCallback(
    async (text: string) => {
      const question = text.trim();
      if (!question || requestRef.current) return;

      const request = new AbortController();
      requestRef.current = request;

      const conversation = [...messages, createMessage('user', question)];
      let answer = createMessage('assistant', '');

      setMessages(conversation);
      setError(null);
      setIsLoading(true);

      try {
        for await (const chunk of streamAnswer({ messages: conversation, projectId, signal: request.signal })) {
          if (request.signal.aborted) return;
          answer = { ...answer, content: answer.content + chunk };
          if (answer.content.trim()) setMessages([...conversation, answer]);
        }
        if (!answer.content.trim()) throw new Error('A resposta veio vazia');
      } catch (cause) {
        if (request.signal.aborted) return;
        setMessages(messages);
        setError(cause instanceof Error ? cause : new Error('Falha desconhecida no chat'));
      } finally {
        if (requestRef.current === request) {
          requestRef.current = null;
          setIsLoading(false);
        }
      }
    },
    [messages, projectId],
  );

  return { messages, isLoading, error, sendMessage, stop, clearMessages };
}
