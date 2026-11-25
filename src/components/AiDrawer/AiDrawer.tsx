'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { getClosedHref, readDrawerState } from '@/lib/drawer-url';
import type { ProjectPreview } from '@/types/portfolio';
import { ChatPanel } from './ChatPanel';
import styles from './AiDrawer.module.css';

const TITLE_ID = 'ai-drawer-title';

interface AiDrawerProps {
  projects: readonly ProjectPreview[];
}

export function AiDrawer({ projects }: AiDrawerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const { isOpen, projectId } = readDrawerState(searchParams);
  const requestedProject = projects.find(({ id }) => id === projectId);

  // Ao fechar, a URL perde o projeto. Guardar o último evita trocar o conteúdo durante a animação.
  const [project, setProject] = useState(requestedProject);
  if (isOpen && project !== requestedProject) setProject(requestedProject);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (isOpen && !dialog?.open) dialog?.showModal();
    if (!isOpen && dialog?.open) dialog.close();
  }, [isOpen]);

  function close() {
    if (isOpen) router.replace(getClosedHref(pathname, searchParams), { scroll: false });
  }

  function closeOnBackdrop(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) close();
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.drawer}
      aria-labelledby={TITLE_ID}
      onClose={close}
      onClick={closeOnBackdrop}
    >
      <ChatPanel
        key={project?.id ?? 'general'}
        project={project}
        titleId={TITLE_ID}
        isOpen={isOpen}
        onClose={close}
      />
    </dialog>
  );
}
