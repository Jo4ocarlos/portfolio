// src/components/AiDrawer/AiDrawer.tsx
'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { usePortfolioChat } from '@/hooks/usePortfolioChat';
import { MarkdownRenderer } from './MarkdownRenderer';
import { Project } from '@/types/portfolio';
import { portfolioData } from '@/data'; 

import styles from './AiDrawer.module.css';

export function AiDrawer() {
  const searchParams = useSearchParams();
  const isOpen = searchParams.get('ai') === 'open';
  const projectId = searchParams.get('project') ?? undefined;
  const router = useRouter();
const pathname = usePathname();

  // 2. Adicione "Project | null" aqui para avisar o TypeScript
  const activeProject: Project | null = projectId
    ? portfolioData.projects.find((p) => p.id === projectId) ?? null
    : null;
  const {
    messages,
    input,
    setInput,
    isLoading,
    error,
    sendMessage,
    stop,
    clearMessages,
  } = usePortfolioChat({
    projectId,
  });

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const closeDrawer = useCallback(() => {
  stop(); 
  setInput('');
  const params = new URLSearchParams(searchParams.toString());
  params.delete('ai');
  params.delete('project');
  
  // Limpa a URL usando o roteador do Next.js
  const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
  router.replace(newUrl, { scroll: false }); 
}, [searchParams, pathname, router, stop, setInput]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        closeDrawer();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeDrawer]);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    await sendMessage();
  };

  const generalChips = [
    'Qual é o perfil técnico e especialidades de João Carlos?',
    'Como ele estrutura arquiteturas focadas em E-commerce B2B?',
    'Como o João Carlos utiliza Node.js para alta performance?'
  ];

  const activeChips = activeProject?.aiSuggestions || generalChips;

  return (
    <>
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`}
        onClick={closeDrawer}
        {...(!isOpen ? { inert: true } : {})}
      />
      <aside
        className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ''}`}
        {...(!isOpen ? { inert: true } : {})}
        aria-label="Assistente Técnico de IA"
      >
        <header className={styles.header}>
          <div className={styles.headerInfo}>
            <h2 className={styles.title}>Assistente Técnico</h2>
            {activeProject ? (
              <span className={styles.projectBadge}>
                {activeProject.title}
              </span>
            ) : (
              <span className={styles.projectBadge}>Visão Geral</span>
            )}
          </div>
          <button
            type="button"
            className={styles.closeButton}
            onClick={closeDrawer}
            aria-label="Fechar painel de IA"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </header>

        <section className={styles.body}>
          {messages.length === 0 ? (
            <div className={styles.emptyState}>
              <p className={styles.emptyTitle}>
                {activeProject
                  ? `Consulte detalhes técnicos, decisões de engenharia e métricas de "${activeProject.title}".`
                  : 'Consulte detalhes sobre a stack, projetos corporativos e arquiteturas desenvolvidas por João Carlos.'}
              </p>
              <div className={styles.chipsSection}>
                <span className={styles.chipsLabel}>Sugestões rápidas</span>
                <div className={styles.chipsList}>
                  {activeChips.map((chipText) => (
                    <button
                      key={chipText}
                      type="button"
                      className={styles.chip}
                      onClick={() => sendMessage(chipText)}
                    >
                      <span>{chipText}</span>
                      <svg
                        className={styles.chipIcon}
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`${styles.message} ${
                  message.role === 'user' ? styles.messageUser : styles.messageAssistant
                }`}
              >
                {message.role === 'user' ? (
                  message.content
                ) : (
                  <MarkdownRenderer content={message.content} />
                )}
              </div>
            ))
          )}

          {isLoading && messages.length > 0 && messages[messages.length - 1].role === 'user' && (
            <div className={`${styles.message} ${styles.messageAssistant}`}>
              <div className={styles.typingIndicator}>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
              </div>
            </div>
          )}

          {error && (
            <div className={styles.errorBox}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              <span>Servidores com alta demanda no momento. Aguarde alguns instantes e tente novamente.</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </section>

        <footer className={styles.footer}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="text"
              className={styles.input}
              placeholder={
                activeProject
                  ? `Pergunte sobre ${activeProject.title}...`
                  : 'Pergunte sobre stack, arquitetura ou automações...'
              }
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
            />
            {isLoading ? (
              <button
                type="button"
                className={`${styles.actionButton} ${styles.actionButtonStop}`}
                onClick={stop}
                aria-label="Interromper geração"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <rect x="4" y="4" width="16" height="16" rx="2" />
                </svg>
              </button>
            ) : (
              <button
                type="submit"
                className={styles.actionButton}
                disabled={!input.trim()}
                aria-label="Enviar mensagem"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="19" x2="12" y2="5" />
                  <polyline points="5 12 12 5 19 12" />
                </svg>
              </button>
            )}
          </form>
        </footer>
      </aside>
    </>
  );
}