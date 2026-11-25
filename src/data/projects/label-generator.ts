import type { Project } from '@/types/portfolio';

export const labelGenerator = {
  id: 'wms-label-generator',
  title: 'Gerador de Etiquetas de Expedição',
  category: 'Sistema Interno',
  shortDescription: 'Primeira versão do sistema de expedição: cruza duas planilhas e imprime uma etiqueta por loja. Loja sem produto fica de fora. Demonstração com lojas fictícias.',
  caseSummary: {
    problem: 'A etiqueta era montada à mão, cruzando a planilha de endereços com a de produtos. Saía etiqueta vazia e, às vezes, com o remetente errado.',
    decision: 'Loja sem produto fica de fora por padrão, e o remetente vem da empresa escolhida, não da memória de quem imprime.',
    status: 'Esta é a primeira versão, sem banco de dados. A da empresa evoluiu para banco, importação com conferência e separação pelo celular, e tem código fechado.',
  },
  challenge: 'A expedição montava as etiquetas cruzando à mão duas planilhas: uma com o endereço de cada loja e outra com os produtos de cada uma. Era lento, saía etiqueta sem produto (bobina desperdiçada) e, quando o operador trocava de empresa, às vezes a etiqueta saía com o remetente errado.',
  solution: 'Aplicação que roda inteira no navegador (React e TypeScript), sem backend. Ela busca as duas planilhas publicadas em CSV pelo Google Sheets, cruza os dados pelo ID de conferência ou pelo nome da loja e gera uma etiqueta por loja. Lojas sem produto ficam de fora por padrão, o remetente é definido automaticamente pela empresa selecionada e o tamanho da página de impressão muda conforme o modelo de etiqueta, para a térmica imprimir no formato certo sem ajuste manual.',
  impact: 'Esta é a demonstração pública da primeira versão, com lojas fictícias. Foi essa primeira versão que tirou do processo a digitação manual, a etiqueta vazia e a escolha do remetente pelo operador. Depois dela, a empresa passou a usar na expedição outra versão, com banco de dados, aviso de divergências na importação das planilhas e separação pelo celular. O código dessa outra versão é fechado, e não há mais detalhes públicos sobre ela. Ainda não há medição de tempo ou de erros.',
  techStack: ['React', 'TypeScript', 'Google Sheets'],
  repositoryType: 'public',
  repositoryUrl: 'https://github.com/Jo4ocarlos/wms-label-generator',
  liveUrl: 'https://jo4ocarlos.github.io/wms-label-generator/',
  technicalHighlights: [
    {
      title: 'Cruzamento das planilhas',
      description: 'Cada endereço procura a sua linha de produtos pelo ID de conferência e, se não achar, pelo nome da loja. As linhas são indexadas antes, para não percorrer a planilha inteira a cada loja.',
      codeSnippet: `export function juntarProdutos(
  enderecos: readonly LinhaPlanilha[],
  linhasDeProdutos: readonly LinhaPlanilha[],
): Loja[] {
  const porId = indexar(linhasDeProdutos, lerId);
  const porNome = indexar(linhasDeProdutos, lerNome);

  return enderecos.map((endereco) => {
    const linha = porId.get(formatarTexto(lerId(endereco))) ?? porNome.get(formatarTexto(lerNome(endereco)));
    return { endereco, produtos: linha ? extrairProdutosDaLoja(linha) : [] };
  });
}`,
      language: 'typescript',
    },
    {
      title: 'Remetente definido pela regra, não pelo operador',
      description: 'Um remetente exclusivo só vale para a empresa dele. A escolha é conferida a cada tela montada, então trocar de empresa não deixa o remetente da anterior.',
      codeSnippet: `export function listarRemetentesPermitidos(empresa: EmpresaId): RemetenteId[] {
  const { remetenteExclusivo } = empresas[empresa];
  if (remetenteExclusivo) return [remetenteExclusivo];

  return remetenteIds.filter((remetente) => !ehExclusivo(remetente));
}

export function definirRemetente(empresa: EmpresaId, escolhido: RemetenteId | null): RemetenteId {
  const permitidos = listarRemetentesPermitidos(empresa);

  if (escolhido && permitidos.includes(escolhido)) return escolhido;
  if (permitidos.includes(REMETENTE_PADRAO)) return REMETENTE_PADRAO;
  return permitidos[0];
}`,
      language: 'typescript',
    },
    {
      title: 'Tamanho de impressão por modelo',
      description: 'Cada modelo informa o tamanho e a margem da página, e a regra @page usa esses valores na impressão.',
      codeSnippet: `export const modelos = {
  'Etiqueta Envio': { pagina: { tamanho: '100mm 80mm', margem: '0' }, usaRemetente: true },
  'Etiqueta Simples': { pagina: { tamanho: '100mm 40mm', margem: '0' }, usaRemetente: false },
  'Declaração de Conteúdo': { pagina: { tamanho: 'A4', margem: '10mm' }, usaRemetente: true },
  'Folha de Conferência': { pagina: { tamanho: 'A4', margem: '10mm' }, usaRemetente: false },
} as const satisfies Record<string, Modelo>;

const { tamanho, margem } = modelos[modeloId].pagina;

<style>{\`@media print { @page { size: \${tamanho}; margin: \${margem}; } }\`}</style>`,
      language: 'typescript',
    },
  ],
  aiSuggestions: [
    'Que problema da expedição essa ferramenta resolve?',
    'Como funciona o cruzamento das duas planilhas?',
    'Esta é a versão que a empresa usa hoje?',
  ],
} as const satisfies Project;
