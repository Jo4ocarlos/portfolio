import type { Project, ProjectPreview } from '@/types/portfolio';

export function toProjectPreview({ id, title, caseSummary, aiSuggestions }: Project): ProjectPreview {
  return { id, title, caseSummary, aiSuggestions };
}
