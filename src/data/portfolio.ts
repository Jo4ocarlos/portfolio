// src/data/portfolio.ts
import { PortfolioData } from '@/types/portfolio';

export const portfolioData: PortfolioData = {
  profile: {
    name: 'João Carlos',
    title: 'Desenvolvedor Full Stack | E-commerce & Automação',
    location: 'São Paulo, SP',
    bio: 'Formado em Gestão de TI (2024), atuo como desenvolvedor Full Stack. Mais do que apenas escrever código, gosto de entender o negócio como um todo: tenho facilidade em me comunicar, mapear fluxos e enxergar onde a operação pode ser melhorada. Minha base principal no dia a dia é React, Next.js e TypeScript, apoiada por Node.js, PHP e integrações de APIs para entregar sistemas fluidos que realmente facilitem a rotina das pessoas',
    availability: true,
    socials: {
      github: 'https://github.com/jo4ocarlos',
      linkedin: 'https://linkedin.com/in/seu-linkedin-aqui',
      email: 'mailto:joaocar4892@gmail.com',
    },
  },
  experiences: [
    {
      id: 'graph-a',
      role: 'Desenvolvedor',
      company: 'Graph A',
      period: 'Julho/2025 - Presente', 
      description: 'Desenvolvimento de e-commerces e automação de rotinas internas. Crio plugins customizados (PHP/JS) para checkouts e integro catálogos e estoques de fornecedores utilizando n8n. No front-end (React), construo ferramentas internas, como um gerador de etiquetas logísticas (WMS) e algoritmos de nesting para precificação automática.',
      technologies: ['React', 'Node.js', 'n8n', 'PHP', 'WordPress', 'Google Sheets'],
    },
    {
      id: 'freelancer',
      role: 'Desenvolvedor Web & Freelancer',
      company: 'Autônomo',
      period: 'Maio/2024 - Presente',
      description: 'Desenvolvimento web de ponta a ponta, incluindo a criação do novo site da GH Locações e o sistema de agendamento online do consultório Rogério Caetano. Paralelamente ao desenvolvimento web, também atuo prestando serviços de produção audiovisual (videomaker) e gestão de social media para clientes independentes.',
      technologies: ['React', 'Next.js', 'TypeScript', 'Segurança Web', 'Audiovisual / Videomaker'],
    },
    {
      id: 'otorhinus',
      role: 'Estagiário em Gestão de TI',
      company: 'Otorhinus Clínica Médica',
      period: 'Agosto/2023 - Agosto/2024',
      description: 'Suporte técnico focado na manutenção de equipamentos e resolução de falhas de hardware e rede. Criação e gerenciamento de planilhas de controle interno para organizar e otimizar os fluxos organizacionais da clínica.',
      technologies: ['Infraestrutura de TI', 'Manutenção de Hardware', 'Google Sheets'],
    }
  ],
  projects: [
    // Substituir o bloco do 'graph-a-ecommerce' em src/data/portfolio.ts

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
    'Como foi feito o Join relacional sem usar banco de dados?',
    'Explique a injeção dinâmica de CSS para impressoras térmicas.',
    'Como o sistema impede inconsistências fiscais (remetentes cruzados)?'
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
  techStack: ['Node.js', 'JavaScript', 'Worker Threads'],
  featured: true,
  githubProfile: 'https://github.com/Jo4ocarlos',
  repositoryType:'private',
  // URL vazia ou omitida intencionalmente, pois é código fechado em desenvolvimento
  technicalHighlights: [
    {
      title: 'Motor True Shape: Detecção de Colisão por Matriz de Bits',
      description: 'O núcleo do algoritmo de Nesting. Como a matemática analítica de intersecção de polígonos é custosa, rasterizamos as primitivas (SVGs) via "sharp" em matrizes de pixels unidimensionais (Uint8Array). A colisão é detectada de forma ultrarrápida iterando sobre os bytes, permitindo validar milhares de posições por segundo para o Hole Nesting.',
      codeSnippet: `/**\n * Motor de Colisão Raster - Nesting SaaS\n * @author João Carlos de Almeida Silva\n */\nfunction verificarColisao(matrizChapa, matrizPeca, offsetX, offsetY, larguraChapa, larguraPeca) {\n    const linhasPeca = matrizPeca.length / larguraPeca;\n\n    for (let y = 0; y < linhasPeca; y++) {\n        const chapaY = offsetY + y;\n        if (chapaY < 0 || chapaY >= (matrizChapa.length / larguraChapa)) return true;\n\n        const offsetPecaRow = y * larguraPeca;\n        const offsetChapaRow = chapaY * larguraChapa + offsetX;\n\n        for (let x = 0; x < larguraPeca; x++) {\n            const pixelPeca = matrizPeca[offsetPecaRow + x];\n            if (pixelPeca === 0) continue; // Pixel transparente (furo/espaço vazio)\n\n            const chapaX = offsetX + x;\n            // Checa limites horizontais e sobreposição na chapa\n            if (chapaX < 0 || chapaX >= larguraChapa || matrizChapa[offsetChapaRow + x] > 0) {\n                return true; \n            }\n        }\n    }\n    return false; // Encaixe perfeito encontrado\n}`,
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
    'Como a colisão por Matriz de Bits supera a matemática tradicional?',
    'Por que foram utilizadas Worker Threads no cálculo de Nesting?',
    'Como funciona o isolamento Multi-Tenant via JWT na arquitetura?'
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
    'Como o SQL Mutex evita a falha de "dinheiro infinito" na Wallet?',
    'Explique a arquitetura do middleware defensivo no Volume Pricing.',
    'Como o Custom Modal foca em conversão (CRO) e blinda contra XSS?'
  ]
},
    
  ],
};