import { useEffect, useRef } from 'react';
import type { StoredChatMessage } from '@/types/chat';
import { MarkdownRenderer } from './MarkdownRenderer';
import styles from './MessageList.module.css';

interface MessageListProps {
  messages: readonly StoredChatMessage[];
  isLoading: boolean;
}

export function MessageList({ messages, isLoading }: MessageListProps) {
  const endRef = useRef<HTMLDivElement>(null);
  const isWaitingAnswer = isLoading && messages.at(-1)?.role === 'user';

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' });
  }, [messages]);

  return (
    <div className={styles.list} role="log" aria-label="Conversa" aria-busy={isLoading}>
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      {isWaitingAnswer && <TypingIndicator />}
      <div ref={endRef} />
    </div>
  );
}

function Message({ message: { role, content } }: { message: StoredChatMessage }) {
  if (role === 'user') return <p className={`${styles.message} ${styles.question}`}>{content}</p>;

  return (
    <div className={`${styles.message} ${styles.answer}`}>
      <MarkdownRenderer content={content} />
    </div>
  );
}

function TypingIndicator() {
  return (
    <p className={`${styles.message} ${styles.answer} ${styles.typing}`}>
      <span className="visually-hidden">Escrevendo a resposta</span>
      <span className={styles.dot} />
      <span className={styles.dot} />
      <span className={styles.dot} />
    </p>
  );
}
