import { ArrowUpRightIcon } from '@/components/icons';
import type { CaseSummary, ProjectPreview } from '@/types/portfolio';
import styles from './EmptyChat.module.css';

const GENERAL_SUGGESTIONS = [
  'Com que tipo de sistema o João trabalha?',
  'Quais tecnologias ele usa?',
  'Como ele usa IA no desenvolvimento?',
];

interface EmptyChatProps {
  project?: ProjectPreview;
  onSelectSuggestion: (suggestion: string) => void;
}

export function EmptyChat({ project, onSelectSuggestion }: EmptyChatProps) {
  const suggestions = project?.aiSuggestions ?? GENERAL_SUGGESTIONS;

  return (
    <div className={styles.container}>
      {project?.caseSummary ? <CaseSummaryList summary={project.caseSummary} /> : <Invitation project={project} />}

      <section className={styles.suggestions} aria-labelledby="suggestions-title">
        <h3 id="suggestions-title" className={styles.suggestionsTitle}>Sugestões rápidas</h3>
        <ul className={styles.suggestionList}>
          {suggestions.map((suggestion) => (
            <li key={suggestion}>
              <button type="button" className={styles.suggestion} onClick={() => onSelectSuggestion(suggestion)}>
                {suggestion}
                <ArrowUpRightIcon className={styles.suggestionIcon} />
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function Invitation({ project }: { project?: ProjectPreview }) {
  return (
    <p className={styles.invitation}>
      {project
        ? `Pergunte sobre o problema, as decisões e os limites de "${project.title}".`
        : 'Pergunte sobre o trabalho e as tecnologias do João Carlos.'}
    </p>
  );
}

function CaseSummaryList({ summary }: { summary: CaseSummary }) {
  return (
    <dl className={styles.summary}>
      <div>
        <dt>Problema</dt>
        <dd>{summary.problem}</dd>
      </div>
      <div>
        <dt>Decisão</dt>
        <dd>{summary.decision}</dd>
      </div>
      <div>
        <dt>Situação</dt>
        <dd>{summary.status}</dd>
      </div>
    </dl>
  );
}
