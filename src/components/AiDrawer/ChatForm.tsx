import { useState, type FormEvent } from 'react';
import { SendIcon, StopIcon } from '@/components/icons';
import { CHAT_LIMITS } from '@/lib/chat/limits';
import styles from './ChatForm.module.css';

interface ChatFormProps {
  projectTitle?: string;
  isLoading: boolean;
  onSend: (text: string) => void;
  onStop: () => void;
}

export function ChatForm({ projectTitle, isLoading, onSend, onStop }: ChatFormProps) {
  const [input, setInput] = useState('');
  const label = projectTitle ? `Pergunte sobre ${projectTitle}` : 'Pergunte sobre o trabalho do João';

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (isLoading || !input.trim()) return;

    onSend(input);
    setInput('');
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label htmlFor="chat-question" className="visually-hidden">{label}</label>
        <input
          id="chat-question"
          type="text"
          className={styles.input}
          placeholder={`${label}...`}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          maxLength={CHAT_LIMITS.maxQuestionLength}
          autoComplete="off"
        />
        {isLoading ? (
          <button
            type="button"
            className={`${styles.button} ${styles.stopButton}`}
            onClick={onStop}
            aria-label="Interromper resposta"
          >
            <StopIcon />
          </button>
        ) : (
          <button type="submit" className={styles.button} disabled={!input.trim()} aria-label="Enviar pergunta">
            <SendIcon />
          </button>
        )}
      </div>
    </form>
  );
}
