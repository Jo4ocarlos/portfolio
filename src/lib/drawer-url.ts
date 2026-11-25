const OPEN_PARAM = 'ai';
const OPEN_VALUE = 'open';
const PROJECT_PARAM = 'project';

export interface DrawerState {
  isOpen: boolean;
  projectId?: string;
}

export function getDrawerHref(projectId?: string): string {
  const params = new URLSearchParams({ [OPEN_PARAM]: OPEN_VALUE });
  if (projectId) params.set(PROJECT_PARAM, projectId);
  return `/?${params}`;
}

export function readDrawerState(params: URLSearchParams): DrawerState {
  return {
    isOpen: params.get(OPEN_PARAM) === OPEN_VALUE,
    projectId: params.get(PROJECT_PARAM) ?? undefined,
  };
}

/** Fecha o painel sem perder os outros parâmetros da URL. */
export function getClosedHref(pathname: string, currentParams: URLSearchParams): string {
  const params = new URLSearchParams(currentParams);
  params.delete(OPEN_PARAM);
  params.delete(PROJECT_PARAM);

  const query = params.toString();
  return query ? `${pathname}?${query}` : pathname;
}
