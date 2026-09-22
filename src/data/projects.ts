// src/data/projects.ts
import { Project } from '@/types/portfolio';

export const projects = [
 {
  id: 'wms-label-generator',
  title: 'WMS Label Generator & Logistics Engine',
  category: 'Automação Corporativa',
  shortDescription: 'Motor de processamento logístico client-side para roteamento automático, cruzamento de dados e controle de impressoras térmicas via React.',
  challenge: 'Operações de picking/packing perdem horas cruzando planilhas horizontais descentralizadas. Essa fricção humana causa lentidão extrema na expedição, geração de etiquetas vazias (desperdício de bobina) e alto risco de inconsistência fiscal por troca acidental de remetentes.',
  solution: 'Construí um motor WMS no navegador (React/TypeScript) que elimina a necessidade de um backend complexo. Ele consome CSVs via Google Sheets API, realiza o Join relacional (Endereços x Produtos) em memória usando Memoization, bloqueia inconsistências fiscais e controla o hardware de impressoras Zebra programaticamente injetando regras de @page no CSSOM.',
  impact: 'Redução drástica no tempo de separação de pedidos e zero erros fiscais. O sistema barra etiquetas vazias em tempo real, automatiza a formatação para qualquer bobina e entrega resiliência total para os operadores logísticos operarem sem fricção.',
  techStack: ['React', 'TypeScript', 'Google Sheets API'],
  featured: true,
  githubProfile: 'https://github.com/Jo4ocarlos/wms-label-generator',
  repositoryType: 'private',
  liveUrl: 'https://jo4ocarlos.github.io/wms-label-generator/',
  technicalHighlights: [
    {
      title: 'Data Cross-Referencing com Memoization (Client-Side Join)',
      description: 'Processamento e cruzamento de dados relacionais (Endereços vs. Produtos) no client-side. Uso do hook useMemo para evitar re-renders desnecessários, calculando o matching de IDs e Nomes apenas quando o payload da API sofre mutação.',
      codeSnippet: `const lojasComProdutosEEndereco = useMemo(() => {\n  return lojas?.reduce((acc: LojaUnificada[], lojaEndereco) => {\n    const idEnd = formatarTexto(lojaEndereco.ID_CONFERENCIA || "");\n    const linhaProd = lojasEprodutos?.find(p => formatarTexto(p.ID_CONFERENCIA) === idEnd);\n\n    const produtosDaLoja = linhaProd ? extrairProdutosDaLoja(linhaProd) : [];\n\n    if (produtosDaLoja.length > 0 || forcarEtiquetasVazias) {\n      acc.push({ endereco: lojaEndereco, produtos: produtosDaLoja });\n    }\n    return acc;\n  }, []) || [];\n}, [lojas, lojasEprodutos, forcarEtiquetasVazias]);`,
      language: 'typescript'
    },
    {
      title: 'Controle Estrito de Regras de Negócio e Compliance Logístico',
      description: 'Prevenção de erros fiscais e de expedição via Side-Effects controlados. A troca de empresa força automaticamente o estado do remetente fiscal correto, impedindo que o operador gere etiquetas com CNPJs cruzados.',
      codeSnippet: `useEffect(() => {\n  // Trava logística: Aura Calçados exige remetente Corporate\n  if (empresaAtiva === 'Aura Calçados') {\n    setRemementeAtivo('Aura Corporate');\n  } \n  // Fallback preventivo ao sair da regra de exceção\n  else if (remetenteAtivo === 'Aura Corporate') {\n    setRemementeAtivo('Alpha Graphics');\n  }\n}, [empresaAtiva, remetenteAtivo]);`,
      language: 'typescript'
    },
    {
      title: 'Hardware Abstraction via Injeção Dinâmica de CSS',
      description: 'Manipulação reativa do CSS Object Model (CSSOM) para controle de hardware. O React altera dinamicamente as regras @page de impressão baseando-se no modelo de etiqueta selecionado, eliminando a necessidade de drivers de impressora específicos.',
      codeSnippet: `const getConfigPagina = () => {\n  switch (etiquetaAtiva) {\n    case "Etiqueta Envio": return { size: "100mm 80mm", margin: "0" };\n    case "Etiqueta Simples": return { size: "100mm 40mm", margin: "0" };\n    case "Declaração de Conteúdo": return { size: "A4", margin: "10mm" };\n    default: return { size: "auto", margin: "auto" };\n  }\n};\nconst printConfig = getConfigPagina();\n// Renderizado no JSX:\n// <style>{\`@media print { @page { size: \${printConfig.size}; } }\`}</style>`,
      language: 'typescript'
    }
  ],
  aiSuggestions: [
  'Resuma como esse sistema acelerou a logística da empresa.',
  'Como o sistema impede erros fiscais de forma automática?', 
  'Explique o Join relacional no client-side com Memoization.' 
]
},
   {
  id: 'nesting-algorithm-core',
  title: 'True Shape Nesting Engine (SaaS)',
  category: 'SaaS & Algoritmos',
  shortDescription: 'Motor SaaS proprietário (em Active Development) para otimização de corte industrial, reduzindo desperdício de matéria-prima através de arranjos geométricos avançados.',
  challenge: 'Indústrias de manufatura (corte a laser, CNC, gráficas) perdem milhões anualmente com desperdício de matéria-prima (chapas, madeira, tecido) devido a arranjos ineficientes de peças. Além disso, os algoritmos matemáticos tradicionais de intersecção de polígonos são lentos demais para rodar em nuvem, travando servidores e encarecendo a infraestrutura.',
  solution: 'Concepção e desenvolvimento de um SaaS Multi-Tenant com um motor proprietário de "Hole Nesting". Em vez de matemática analítica lenta, a engine rasteriza SVGs em matrizes de bytes (Uint8Array), detectando colisões na velocidade da memória. Para garantir concorrência na API, o processamento heurístico foi isolado em Worker Threads no Node.js, mantendo o Event Loop livre.',
  impact: 'SaaS em Desenvolvimento Ativo (Core Engine concluída). A arquitetura atual valida milhares de posições por segundo e garante isolamento total de dados entre clientes corporativos, estruturando a base técnica para um produto altamente escalável e comercializável.',
  techStack: ['Node.js', 'JavaScript', 'Worker Threads', 'Matrizes (Uint32Array)'],
  featured: true,
  githubProfile: 'https://github.com/Jo4ocarlos',
  repositoryType:'private',
  // URL vazia ou omitida intencionalmente, pois é código fechado em desenvolvimento
  technicalHighlights: [
    {
      title: 'Active Pixel Caching: Otimização Extrema de Detecção de Colisão',
      description: 'Em vez de varrer espaços vazios ao calcular o "Hole Nesting", o motor rasteriza os SVGs e indexa apenas as coordenadas de pixels sólidos em matrizes de alta performance (Uint32Array). Durante o loop heurístico, o algoritmo testa exclusivamente os pontos reais de matéria, reduzindo o custo computacional em mais de 80% e permitindo a rotação de dezenas de peças quase em tempo real.',
      codeSnippet: `//  ACTIVE PIXEL CACHING: Mapeia apenas onde há "matéria" sólida\nlet pixelCount = 0;\nfor (let i = 0; i < matRotada.length; i++) {\n    if (matRotada[i] === 1) pixelCount++;\n}\n\n// Usa Uint32Array para suportar peças gigantes otimizando alocação de RAM\nconst activeX = new Uint32Array(pixelCount);\nconst activeY = new Uint32Array(pixelCount);\nlet idx = 0;\n\nfor (let y = 0; y < hR; y++) {\n    for (let x = 0; x < wR; x++) {\n        if (matRotada[y * wR + x] === 1) {\n            activeX[idx] = x;\n            activeY[idx] = y;\n            idx++;\n        }\n    }\n}`,
      language: 'javascript'
    },
    {
      title: 'Performance: Offloading de CPU com Worker Threads',
      description: 'O cálculo heurístico de Nesting (Best-Fit) é uma operação síncrona que bloqueia o Event Loop do Node.js. Para manter a API responsiva a outros usuários no SaaS, o motor isola o processamento da matriz em Worker Threads. O backend apenas enfileira requisições e devolve um ID de Processamento para o Front-end fazer polling.',
      codeSnippet: `const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');\n\nif (isMainThread) {\n    // Node.js API: Enfileira a carga de cálculo sem travar o servidor principal\n    class NestingQueue {\n        static async iniciarProcessamento(vetoresSvg, configChapa) {\n            return new Promise((resolve, reject) => {\n                const worker = new Worker(__filename, {\n                    workerData: { vetoresSvg, configChapa }\n                });\n                worker.on('message', resolve);\n                worker.on('error', reject);\n                worker.on('exit', (code) => {\n                    if (code !== 0) reject(new Error(\`Worker falhou (código \${code})\`));\n                });\n            });\n        }\n    }\n    module.exports = NestingQueue;\n} else {\n    // Worker Thread: Executa a matriz pesada no background\n    const { vetoresSvg, configChapa } = workerData;\n    const mapaDeCorte = executarTrueShapeMotor(vetoresSvg, configChapa);\n    parentPort.postMessage(mapaDeCorte);\n}`,
      language: 'javascript'
    },
    {
      title: 'Design Multi-Tenant: Isolamento de Cargas de Trabalho por Cliente',
      description: 'Preparando o terreno para a bilhetagem, a arquitetura garante isolamento lógico de dados sem precisar de bancos separados. Um middleware atua como interceptor, extraindo o Tenant ID do JWT e injetando-o no contexto da requisição, impedindo vazamento de chapas ou projetos entre clientes.',
      codeSnippet: `/**\n * Interceptor Multi-Tenant (SaaS)\n * Isola arquivos SVG, DXF e matrizes de corte por usuário.\n */\nconst tenantInterceptor = (req, res, next) => {\n    const token = req.headers.authorization?.split(' ')[1];\n    if (!token) return res.status(401).json({ erro: 'Acesso negado' });\n\n    try {\n        const payload = jwt.verify(token, process.env.JWT_SECRET);\n        // Injeta a identidade organizacional na requisição\n        req.tenantId = payload.empresaId;\n        next();\n    } catch (err) {\n        return res.status(403).json({ erro: 'Sessão inválida' });\n    }\n};\n\n// Consumo na camada de Repositório (Data Access)\nclass WorkloadRepository {\n    async buscarMapasDeCorte(req) {\n        // O ORM obriga o uso do tenant_id em toda query\n        return await db('nesting_workloads')\n            .where({ tenant_id: req.tenantId })\n            .orderBy('criado_em', 'desc');\n    }\n}`,
      language: 'javascript'
    }
  ],
  aiSuggestions: [
  'O que é esse motor de Nesting e qual problema ele resolve?', 
  'Como esse SaaS ajuda indústrias a economizarem material?',
  'Por que foram utilizadas Worker Threads no cálculo de colisão?'
]
},
    {
      id: 'gh-locacoes',
      title: 'Plataforma B2B GH Locações',
      client: 'GH Locações',
      category: 'Web Development',
      shortDescription: 'Desenvolvimento do portal corporativo com foco em alta performance e captação B2B.',
      challenge: 'A empresa não possuía uma presença digital otimizada capaz de reter usuários e gerar autoridade B2B.',
      solution: 'Arquitetura front-end focada em performance de carregamento, SEO técnico e usabilidade direta para conversão.',
      impact: 'Estabeleceu o canal digital da empresa, melhorando a métrica de retenção e servindo como motor de captação de novos contratos de locação.',
      techStack: ['React', 'Next.js', 'CSS Modules', 'TypeScript'],
      featured: true,
      liveUrl: 'https://ghlocacoes.com.br',
      repositoryType: 'none',
    },

{
  id: 'ecommerce-plugins',
  title: 'WooCommerce Engineering Toolkit',
  category: 'E-commerce',
  shortDescription: 'Três plugins proprietários focados em alavancar o faturamento B2B/B2C: retenção via cashback, precificação por lotes e otimização de conversão (CRO).',
  challenge: 'E-commerces escaláveis deixam dinheiro na mesa por três motivos: 1) Alto custo de aquisição e dificuldade em reter clientes (CAC alto). 2) Falta de regras estritas para vender em atacado (pacotes fechados/múltiplos), gerando furos no B2B. 3) Abandono de carrinho em produtos sob medida porque a página fica poluída com dezenas de campos de formulário.',
  solution: 'Desenvolvimento de um toolkit com 3 plugins independentes em PHP (OOP/PSR-4) focados em Produto e Engenharia:\n\n1. JC Digital Wallet: Cria um sistema de cashback e carteira digital para aumentar a retenção (LTV). A engenharia por trás usa SQL Mutex (trava pessimista) para evitar o exploit de "dinheiro infinito" (Race Conditions).\n\n2. JC Volume Pricing: Motor de regras B2B para venda de pacotes fechados e múltiplos. Atua como um middleware no backend, blindando o carrinho contra manipulações no frontend.\n\n3. JC Custom Modal: Construtor reativo que move a personalização do produto para um modal limpo, aumentando a conversão. Salva "Smart Profiles" para compras em 1 clique e usa Server-Side Rendering contra ataques XSS.',
  impact: 'Aumento direto do LTV via carteira digital, elevação do Ticket Médio em operações de atacado e redução extrema de atrito no funil de produtos personalizados. Arquitetura robusta garante zero furos financeiros e total compatibilidade com os temas originais.',
  techStack: ['PHP', 'WordPress', 'JavaScript'],
  featured: true,
  githubProfile: 'https://github.com/Jo4ocarlos',
  repositoryType: 'multi-repo',
  modules: [
    { 
      name: 'Digital Wallet & Cashback', 
      badge: 'SQL Mutex',
      repositoryUrl: 'https://github.com/Jo4ocarlos/jc-digital-wallet-for-woocommerce.git' 
    },
    { 
      name: 'Volume Pricing B2B', 
      badge: 'Middleware',
      repositoryUrl: 'https://github.com/Jo4ocarlos/jc-volume-pricing-for-woocommerce.git' 
    },
    { 
      name: 'Smart Profiles Modal', 
      badge: 'Anti-XSS / AJAX',
      repositoryUrl: 'https://github.com/Jo4ocarlos/jc-custom-modal.git' 
    },
  ],
  technicalHighlights: [
    {
      title: 'Prevenção de Double-Spending via Pessimistic Locking (SQL Mutex)',
      description: 'Mitigação de Race Conditions em arquitetura transacional. Uso de travas pessimistas de linha (FOR UPDATE) direto no driver de banco de dados para garantir compliance ACID, impedindo que requisições simultâneas efetuem duplo gasto em carteiras digitais.',
      codeSnippet: `global $wpdb;\n$wpdb->query('START TRANSACTION');\n\n// Mutex: Trava a linha da carteira no MySQL até o fim da transação\n$wallet = $wpdb->get_row( $wpdb->prepare(\n    "SELECT balance FROM {$wpdb->prefix}jc_wallets WHERE user_id = %d FOR UPDATE",\n    $user_id\n) );\n\nif ( $wallet->balance >= $debit_amount ) {\n    $wpdb->update( "{$wpdb->prefix}jc_wallets", \n        ['balance' => $wallet->balance - $debit_amount], \n        ['user_id' => $user_id] \n    );\n    $wpdb->query('COMMIT');\n} else {\n    $wpdb->query('ROLLBACK');\n    throw new Exception('Saldo insuficiente.');\n}`,
      language: 'php'
    },
    {
      title: 'Middleware de Interceptação de Carrinho (Server-Side Validation)',
      description: 'Blindagem de infraestrutura B2B contra bypass de HTML5 no frontend. Implementação de validações rígidas no ciclo de vida de requisição do backend, validando múltiplos e quantidades mínimas na origem antes de alocar I/O no banco de dados.',
      codeSnippet: `public function enforce_min_and_step( $passed, $product_id, $quantity ) {\n    $min_qty  = absint( get_post_meta( $product_id, '_min_order_qty', true ) );\n    $step_qty = absint( get_post_meta( $product_id, '_step_qty', true ) ) ?: 1;\n\n    if ( $min_qty > 0 && $quantity < $min_qty ) {\n        wc_add_notice( sprintf( __('Mínimo exigido: %d', 'domain'), $min_qty ), 'error' );\n        return false;\n    }\n\n    if ( $step_qty > 1 && ( $quantity % $step_qty ) !== 0 ) {\n        wc_add_notice( sprintf( __('Apenas múltiplos de: %d', 'domain'), $step_qty ), 'error' );\n        return false;\n    }\n\n    return $passed;\n}`,
      language: 'php'
    },
    {
      title: 'Blindagem contra XSS via Escopo Restrito e Sanitização Dinâmica',
      description: 'Proteção do banco de dados (SQLi) e do DOM (XSS) ao lidar com payloads dinâmicos (Smart Profiles). Uso de Type Juggling checking e mapeamento estrito de arrays de input, neutralizando a injeção de scripts no fluxo de checkout.',
      codeSnippet: `if ( isset( $_POST['jccm_custom'][$product_id] ) ) {\n    $inputs = wp_unslash( $_POST['jccm_custom'][$product_id] );\n\n    foreach ( $campos as $campo ) {\n        $label = sanitize_text_field( $campo['label'] );\n        \n        // Type Casting Check: Previne Fatal Errors e Array Injection\n        if ( isset( $inputs[$label] ) && is_string( $inputs[$label] ) ) {\n            $valor_bruto = trim( $inputs[$label] );\n            $dados[ $label ] = ( 'email' === $campo['tipo'] ) \n                ? sanitize_email( $valor_bruto ) \n                : sanitize_text_field( $valor_bruto );\n        }\n    }\n}`,
      language: 'php'
    },
    {
      title: 'Arquitetura Modular PSR-4 e Injeção de Dependências',
      description: 'Abandono do paradigma procedimental caótico herdado de ecossistemas legados. Otimização de performance com Lazy Loading de classes via Autoloader do Composer (PSR-4) e inicialização baseada em Singleton/Controller Pattern.',
      codeSnippet: `namespace JcCustomModal;\n\nfinal class Init {\n    public static function get_services() {\n        return [\n            Admin\\ProductTab::class,\n            Frontend\\CartHandler::class,\n            Frontend\\ModalDisplay::class\n        ];\n    }\n\n    public static function run() {\n        foreach ( self::get_services() as $class ) {\n            $service = new $class();\n            if ( method_exists( $service, 'register' ) ) {\n                $service->register();\n            }\n        }\n    }\n}`,
      language: 'php'
    }
  ],
  aiSuggestions: [
  'De forma simples, como esses plugins aumentam o faturamento?', 
  'Como a carteira digital ajuda a fidelizar e reter clientes?', 
  'Como a arquitetura de SQL Mutex previne o duplo gasto?' 
]
}
] as const satisfies readonly Project[];

// Tipagem dinamica baseada nos ids dos projetos
export type ProjectId = typeof projects[number]['id'];