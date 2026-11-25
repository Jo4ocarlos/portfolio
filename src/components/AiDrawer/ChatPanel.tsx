'use client';

import { useEffect } from 'react';
import { CloseIcon, WarningIcon } from '@/components/icons';
import { usePortfolioChat } from '@/hooks/usePortfolioChat';
import { getChatErrorMessage } from '@/lib/chat/client';
import type { ProjectPreview } from '@/types/portfolio';
import { ChatForm } from './ChatForm';
import { EmptyChat } from './EmptyChat';
import { MessageList } from './MessageList';
import styles from './ChatPanel.module.css';

interface ChatPanelProps {
  project?: ProjectPreview;
  titleId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ChatPanel({ project, titleId, isOpen, onClose }: ChatPanelProps) {
  const { messages, isLoading, error, sendMessage, stop, clearMessages } = usePortfolioChat(project?.id);
  const hasMessages = messages.length > 0;

  useEffect(() => {
    if (!isOpen) stop();
  }, [isOpen, stop]);

  return (
    <div className={styles.panel}>
      <header className={styles.header}>
        <div>
          <h2 id={titleId} className={styles.title}>Assistente técnico</h2>
          <p className={styles.projectName}>{project?.title ?? 'Visão geral'}</p>
        </div>

        <div className={styles.actions}>
          {hasMessages && (
            <button type="button" className={styles.headerButton} onClick={clearMessages}>
              Limpar conversa
            </button>
          )}
          <button type="button" className={styles.headerButton} onClick={onClose} aria-label="Fechar painel de IA">
            <CloseIcon />
          </button>
        </div>
      </header>

      <div className={styles.body}>
        {hasMessages ? (
          <MessageList messages={messages} isLoading={isLoading} />
        ) : (
          <EmptyChat project={project} onSelectSuggestion={sendMessage} />
        )}

        {error && (
          <p className={styles.error} role="alert">
            <WarningIcon />
            {getChatErrorMessage(error)}
          </p>
        )}
      </div>

      <ChatForm projectTitle={project?.title} isLoading={isLoading} onSend={sendMessage} onStop={stop} />
    </div>
  );
}
