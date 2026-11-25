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
  solution: 'Aplicação que roda inteira no navegador (React e TypeScript), sem backend. Ela busca as duas planilhas publicadas em CSV pelo Google Sheets, cruza os dados pelo ID de conferência e gera uma etiqueta por loja. Lojas sem produto ficam de fora por padrão, o remetente é definido automaticamente pela empresa selecionada e o tamanho da página de impressão muda conforme o modelo de etiqueta, para a térmica imprimir no formato certo sem ajuste manual.',
  impact: 'Esta é a demonstração pública da primeira versão. A que a empresa usa hoje na expedição evoluiu: tem banco de dados, aponta divergências na importação das planilhas e guia a separação pelo celular. O código dela é fechado. A digitação manual, a etiqueta vazia e a escolha do remetente pelo operador saíram do processo. Ainda não há medição de tempo ou de erros.',
  techStack: ['React', 'TypeScript', 'Google Sheets'],
  repositoryType: 'public',
  repositoryUrl: 'https://github.com/Jo4ocarlos/wms-label-generator',
  liveUrl: 'https://jo4ocarlos.github.io/wms-label-generator/',
  technicalHighlights: [
    {
      title: 'Cruzamento das planilhas com useMemo',
      description: 'O join entre endereços e produtos roda no cliente e só é recalculado quando os dados da planilha ou a opção de incluir etiquetas vazias mudam.',
      codeSnippet: `const lojasComProdutosEEndereco = useMemo(() => {
  return lojas?.reduce((acc: LojaUnificada[], lojaEndereco) => {
    const idEnd = formatarTexto(lojaEndereco.ID_CONFERENCIA || "");
    const linhaProd = lojasEprodutos?.find(p => formatarTexto(p.ID_CONFERENCIA) === idEnd);

    const produtosDaLoja = linhaProd ? extrairProdutosDaLoja(linhaProd) : [];

    if (produtosDaLoja.length > 0 || forcarEtiquetasVazias) {
      acc.push({ endereco: lojaEndereco, produtos: produtosDaLoja });
    }
    return acc;
  }, []) || [];
}, [lojas, lojasEprodutos, forcarEtiquetasVazias]);`,
      language: 'typescript',
    },
    {
      title: 'Remetente definido pela regra, não pelo operador',
      description: 'Ao trocar de empresa, o remetente correto é aplicado automaticamente. Isso evita etiqueta saindo com o CNPJ de outra empresa.',
      codeSnippet: `useEffect(() => {
  // Trava logística: Aura Calçados exige remetente Corporate
  if (empresaAtiva === 'Aura Calçados') {
    setRemementeAtivo('Aura Corporate');
  }
  // Fallback preventivo ao sair da regra de exceção
  else if (remetenteAtivo === 'Aura Corporate') {
    setRemementeAtivo('Alpha Graphics');
  }
}, [empresaAtiva, remetenteAtivo]);`,
      language: 'typescript',
    },
    {
      title: 'Tamanho de impressão por modelo de etiqueta',
      description: 'Cada modelo (100x80 mm, 100x40 mm, A4) define a regra @page de impressão, então o navegador já envia a página no tamanho da bobina.',
      codeSnippet: `const getConfigPagina = () => {
  switch (etiquetaAtiva) {
    case "Etiqueta Envio": return { size: "100mm 80mm", margin: "0" };
    case "Etiqueta Simples": return { size: "100mm 40mm", margin: "0" };
    case "Declaração de Conteúdo": return { size: "A4", margin: "10mm" };
    default: return { size: "auto", margin: "auto" };
  }
};
const printConfig = getConfigPagina();
// Renderizado no JSX:
// <style>{\`@media print { @page { size: \${printConfig.size}; } }\`}</style>`,
      language: 'typescript',
    },
  ],
  aiSuggestions: [
    'Que problema da expedição essa ferramenta resolve?',
    'Como funciona o cruzamento das duas planilhas?',
    'O que mudou da primeira versão para a atual?',
  ],
} as const satisfies Project;
