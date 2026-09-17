// src/hooks/usePortfolioChat.ts
'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

export type MessageRole = 'user' | 'assistant' | 'system';

export interface PortfolioMessage {
  id: string;
  role: MessageRole;
  content: string;
  createdAt: Date;
}

interface UsePortfolioChatOptions {
  initialMessages?: PortfolioMessage[];
  projectId?: string;
  onError?: (error: Error) => void;
}

interface UsePortfolioChatReturn {
  messages: PortfolioMessage[];
  input: string;
  setInput: (value: string) => void;
  isLoading: boolean;
  error: Error | null;
  sendMessage: (customMessage?: string) => Promise<void>;
  stop: () => void;
  clearMessages: () => void;
}

export function usePortfolioChat(options: UsePortfolioChatOptions = {}): UsePortfolioChatReturn {
  const { initialMessages = [], projectId, onError } = options;

  const [messages, setMessages] = useState<PortfolioMessage[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  // 1. CARREGAR DO COFRE (Executa sempre que o projectId muda)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const storageKey = projectId ? `portfolio_chat_${projectId}` : 'portfolio_chat_general';
    const saved = localStorage.getItem(storageKey);
    
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Reidrata as strings de data de volta para objetos Date do JS
        const hydrated = parsed.map((m: any) => ({ ...m, createdAt: new Date(m.createdAt) }));
        setMessages(hydrated);
      } catch (e) {
        setMessages(initialMessages);
      }
    } else {
      setMessages(initialMessages);
    }
    
    setIsInitialized(true);
  }, [projectId]); // Removemos o initialMessages para evitar loops

  // 2. SALVAR NO COFRE (Executa sempre que as mensagens mudam)
  useEffect(() => {
    if (!isInitialized || typeof window === 'undefined') return;
    
    const storageKey = projectId ? `portfolio_chat_${projectId}` : 'portfolio_chat_general';
    if (messages.length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(messages));
    } else {
      localStorage.removeItem(storageKey);
    }
  }, [messages, isInitialized, projectId]);

  const stop = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsLoading(false);
    }
  }, []);

  const clearMessages = useCallback(() => {
    stop();
    setMessages([]);
    setError(null);
    if (typeof window !== 'undefined') {
      const storageKey = projectId ? `portfolio_chat_${projectId}` : 'portfolio_chat_general';
      localStorage.removeItem(storageKey);
    }
  }, [stop, projectId]);

  const sendMessage = useCallback(
    async (customMessage?: string) => {
      const textToSend = customMessage?.trim() ?? input.trim();
      if (!textToSend || isLoading) return;

      setError(null);
      setIsLoading(true);
      setInput('');

      const userMessageId = `user-${Date.now()}`;
      const assistantMessageId = `assistant-${Date.now()}`;

      const userMessage: PortfolioMessage = {
        id: userMessageId,
        role: 'user',
        content: textToSend,
        createdAt: new Date(),
      };

      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);

      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: updatedMessages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
            projectId,
          }),
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error(`Erro na comunicação com o servidor (Status: ${response.status})`);
        }

        if (!response.body) {
          throw new Error('A resposta do servidor não contém um fluxo de dados (stream).');
        }

        setMessages((prev) => [
          ...prev,
          {
            id: assistantMessageId,
            role: 'assistant',
            content: '',
            createdAt: new Date(),
          },
        ]);

        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let accumulatedContent = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          accumulatedContent += chunk;

          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessageId
                ? { ...msg, content: accumulatedContent }
                : msg
            )
          );
        }
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }

        // ROLLBACK: Remove a pergunta do usuário e a bolha fantasma da IA do estado/cofre
        setMessages((prev) => 
          prev.filter(m => m.id !== userMessageId && m.id !== assistantMessageId)
        );

        const resolvedError =
          err instanceof Error
            ? err
            : new Error('Ocorreu um erro desconhecido durante a comunicação.');

        setError(resolvedError);
        if (onError) onError(resolvedError);
      } finally {
        setIsLoading(false);
        abortControllerRef.current = null;
      }
    },
    [input, isLoading, messages, projectId, onError]
  );

  return {
    messages,
    input,
    setInput,
    isLoading,
    error,
    sendMessage,
    stop,
    clearMessages,
  };
}