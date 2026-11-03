// src/data/projects.ts
import { Project } from '@/types/portfolio';

export const projects = [
  {
    id: 'wms-label-generator',
    title: 'Gerador de Etiquetas de Expedição',
    category: 'Sistema Interno',
    shortDescription: 'Ferramenta em React que lê endereços e pedidos do Google Sheets, monta uma etiqueta por loja e imprime direto na térmica, sem digitação manual. Versão de demonstração, com lojas fictícias.',
    challenge: 'A expedição montava as etiquetas cruzando à mão duas planilhas: uma com o endereço de cada loja e outra com os produtos de cada uma. Era lento, saía etiqueta sem produto (bobina desperdiçada) e, quando o operador trocava de empresa, às vezes a etiqueta saía com o remetente errado.',
    solution: 'Aplicação que roda inteira no navegador (React e TypeScript), sem backend. Ela busca as duas planilhas pela API do Google Sheets, cruza os dados pelo ID de conferência e gera uma etiqueta por loja. Lojas sem produto ficam de fora por padrão, o remetente é definido automaticamente pela empresa selecionada e o tamanho da página de impressão muda conforme o modelo de etiqueta, para a térmica imprimir no formato certo sem ajuste manual.',
    // TODO: se tiver como medir, troque por número. Ex.: "de X minutos para Y minutos por lote".
    impact: 'A versão oficial está em produção na expedição da empresa e tem mais recursos que esta demonstração pública. Ela acabou com a digitação manual das etiquetas, parou a impressão de etiquetas vazias e tirou do operador a escolha do remetente.',
    techStack: ['React', 'TypeScript', 'Google Sheets API'],
    featured: true,
    githubProfile: 'https://github.com/Jo4ocarlos',
    // O repositório é público. Antes estava como 'private' e o assistente de IA dizia
    // ao recrutador que o código era fechado.
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
      'Por que rodar tudo no navegador, sem backend?',
    ],
  },
  {
    id: 'nesting-algorithm-core',
    title: 'Motor de Nesting (em desenvolvimento)',
    category: 'SaaS & Algoritmos',
    shortDescription: 'Motor em Node.js que distribui peças de formato livre numa chapa para reduzir a sobra de material. Projeto pessoal, em desenvolvimento, com código fechado.',
    challenge: 'No corte de chapa (laser, router, plotter), a forma como as peças são distribuídas define quanto material vira sobra. Calcular colisão entre polígonos de forma analítica é caro, e um processamento longo não pode travar a API para os outros usuários.',
    solution: 'Em vez de calcular interseção entre polígonos, o motor rasteriza cada peça (SVG) numa grade de pixels e guarda só as coordenadas ocupadas. Testar se uma posição cabe vira conferir esses pontos na grade da chapa. O encaixe usa uma heurística best-fit, com rotação e aproveitamento de furos internos das peças, e roda em Worker Threads para não bloquear o event loop do Node. A API separa os dados de cada cliente (tenant) a partir do JWT.',
    // TODO: este é o projeto que mais te aproxima de pleno, e hoje não tem nenhum número.
    // Rode um benchmark e coloque aqui: "N peças, X% de aproveitamento (contra Y% do método
    // anterior), em Z segundos". Sem número, deixe como está e não invente.
    impact: 'O núcleo de encaixe já funciona. A camada de produto (API, contas e cobrança) está em construção.',
    techStack: ['Node.js', 'JavaScript', 'Worker Threads'],
    featured: true,
    githubProfile: 'https://github.com/Jo4ocarlos',
    repositoryType: 'private',
    technicalHighlights: [
      {
        title: 'Colisão testada só nos pixels ocupados',
        // TODO: o texto antigo dizia "reduz o custo em mais de 80%". Só volte com o número
        // se você mediu, porque vão perguntar como.
        description: 'Depois de rasterizar e rotacionar a peça, o motor guarda em dois Uint32Array apenas as coordenadas dos pixels ocupados. No teste de colisão, percorre só esses pontos, e não a área inteira da peça.',
        codeSnippet: `// Conta e indexa apenas os pixels ocupados da peça rotacionada
let pixelCount = 0;
for (let i = 0; i < matRotada.length; i++) {
    if (matRotada[i] === 1) pixelCount++;
}

// Uint32Array suporta coordenadas de peças grandes com alocação fixa
const activeX = new Uint32Array(pixelCount);
const activeY = new Uint32Array(pixelCount);
let idx = 0;

for (let y = 0; y < hR; y++) {
    for (let x = 0; x < wR; x++) {
        if (matRotada[y * wR + x] === 1) {
            activeX[idx] = x;
            activeY[idx] = y;
            idx++;
        }
    }
}`,
        language: 'javascript',
      },
      {
        title: 'Cálculo pesado fora do event loop',
        description: 'O encaixe é síncrono e demorado. Cada processamento roda numa Worker Thread, então o servidor continua respondendo às outras requisições enquanto calcula.',
        codeSnippet: `const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

if (isMainThread) {
    // Processo principal: dispara o cálculo sem bloquear a API
    class NestingQueue {
        static async iniciarProcessamento(vetoresSvg, configChapa) {
            return new Promise((resolve, reject) => {
                const worker = new Worker(__filename, {
                    workerData: { vetoresSvg, configChapa }
                });
                worker.on('message', resolve);
                worker.on('error', reject);
                worker.on('exit', (code) => {
                    if (code !== 0) reject(new Error(\`Worker falhou (código \${code})\`));
                });
            });
        }
    }
    module.exports = NestingQueue;
} else {
    // Worker Thread: executa o encaixe em segundo plano
    const { vetoresSvg, configChapa } = workerData;
    const mapaDeCorte = executarTrueShapeMotor(vetoresSvg, configChapa);
    parentPort.postMessage(mapaDeCorte);
}`,
        language: 'javascript',
      },
      {
        title: 'Dados separados por cliente',
        description: 'Um middleware lê a empresa do JWT e a coloca na requisição. Toda consulta do repositório filtra por esse tenant_id, sem precisar de um banco por cliente.',
        codeSnippet: `const tenantInterceptor = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ erro: 'Acesso negado' });

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.tenantId = payload.empresaId;
        next();
    } catch (err) {
        return res.status(403).json({ erro: 'Sessão inválida' });
    }
};

class WorkloadRepository {
    async buscarMapasDeCorte(req) {
        // Toda consulta filtra pelo tenant da requisição
        return await db('nesting_workloads')
            .where({ tenant_id: req.tenantId })
            .orderBy('criado_em', 'desc');
    }
}`,
        language: 'javascript',
      },
    ],
    aiSuggestions: [
      'Que problema o nesting resolve na prática?',
      'Por que rasterizar as peças em vez de calcular interseção de polígonos?',
      'Por que usar Worker Threads no cálculo?',
    ],
  },
  {
    id: 'gh-locacoes',
    title: 'Site institucional GH Locações',
    client: 'GH Locações',
    category: 'Web Development',
    shortDescription: 'Site institucional em Next.js para uma empresa de locação, feito para carregar rápido e levar o visitante ao pedido de orçamento.',
    challenge: 'A empresa não tinha um site que apresentasse os serviços e recebesse contato de clientes empresariais.',
    solution: 'Site em Next.js com TypeScript e CSS Modules, com foco em carregamento rápido, SEO técnico e um caminho curto até o pedido de orçamento.',
    // TODO: se o cliente tiver dados (contatos por mês, posição no Google), coloque aqui.
    impact: 'Passou a ser o canal digital da empresa para apresentar os serviços e receber pedidos de orçamento.',
    techStack: ['React', 'Next.js', 'CSS Modules', 'TypeScript'],
    featured: true,
    liveUrl: 'https://ghlocacoes.com.br',
    repositoryType: 'none',
  },
  {
    id: 'ecommerce-plugins',
    title: 'Plugins para WooCommerce',
    category: 'E-commerce',
    shortDescription: 'Três plugins em PHP: carteira digital com cashback, preço e quantidade por volume para atacado, e personalização de produto num modal.',
    challenge: 'Três problemas comuns em loja que vende para empresa e para consumidor final: o cliente compra uma vez e não volta; o atacado precisa de quantidade mínima e venda em múltiplos, que o WooCommerce não tem; e produto personalizado com muitos campos na página atrapalha a compra.',
    solution: '1. JC Digital Wallet: carteira com cashback. O saldo não fica guardado numa coluna, é calculado a partir de um extrato de créditos e débitos. O cashback entra como pendente no checkout, é liberado quando o pagamento é confirmado e é revertido se o pedido for cancelado ou reembolsado. O débito roda dentro de uma transação com SELECT ... FOR UPDATE, e cada lançamento tem uma chave de idempotência, então requisições simultâneas ou repetidas não debitam duas vezes.\n\n2. JC Volume Pricing: preço por faixa de quantidade, quantidade mínima e venda em múltiplos para atacado. A regra é validada no servidor ao adicionar e ao atualizar o carrinho, e não só no campo de quantidade da página.\n\n3. JC Custom Modal: leva os campos de personalização para um modal e salva perfis de preenchimento para o cliente reaproveitar na próxima compra. Cada valor recebido é conferido por tipo e sanitizado antes de ir para o carrinho.',
    // TODO: se algum plugin está em produção, coloque o resultado. Ex.: "X% dos clientes
    // usaram o cashback numa segunda compra", "ticket médio do atacado subiu de A para B".
    impact: 'Os três plugins são open source, com README e demonstração em GIF de cada um.',
    techStack: ['PHP', 'WordPress', 'MySQL', 'JavaScript'],
    featured: true,
    githubProfile: 'https://github.com/Jo4ocarlos',
    repositoryType: 'multi-repo',
    modules: [
      {
        name: 'Carteira e cashback',
        badge: 'Sem gasto duplo',
        repositoryUrl: 'https://github.com/Jo4ocarlos/jc-digital-wallet-for-woocommerce',
      },
      {
        name: 'Preço de atacado',
        badge: 'Regra no servidor',
        repositoryUrl: 'https://github.com/Jo4ocarlos/jc-volume-pricing-for-woocommerce',
      },
      {
        name: 'Modal de produto',
        badge: 'Perfis salvos',
        repositoryUrl: 'https://github.com/Jo4ocarlos/jc-custom-modal',
      },
    ],
    technicalHighlights: [
      {
        // Este trecho agora é o código real do WalletManager::deduct_funds (resumido).
        // O anterior mostrava uma tabela jc_wallets com coluna balance, que não existe no repositório.
        title: 'Débito sem gasto duplo',
        description: 'O saldo é recalculado dentro da transação com SELECT ... FOR UPDATE, que faz uma segunda requisição do mesmo usuário esperar até o COMMIT da primeira. Se a mesma operação chegar de novo (um retry, por exemplo), a chave de idempotência devolve o saldo atual sem debitar outra vez.',
        codeSnippet: `$wpdb->query( 'START TRANSACTION' );

// Recalcula o saldo liberado e trava as linhas do usuário até o COMMIT
$saldo = round( (float) $wpdb->get_var( $wpdb->prepare(
    "SELECT SUM( CASE WHEN type = 'credito' THEN amount
                      WHEN type = 'debito'  THEN -amount ELSE 0 END )
     FROM {$table} WHERE user_id = %d AND status = 'cleared' FOR UPDATE",
    $user_id
) ), 2 );

// Retry da mesma operação: já foi gravada, não debita de novo
if ( null !== $idempotency_key ) {
    $existing = $wpdb->get_var( $wpdb->prepare(
        "SELECT id FROM {$table} WHERE idempotency_key = %s FOR UPDATE",
        $idempotency_key
    ) );
    if ( $existing ) {
        $wpdb->query( 'COMMIT' );
        return self::get_balance( $user_id );
    }
}

if ( $saldo < $amount ) {
    $wpdb->query( 'ROLLBACK' );
    return false;
}

$inserted = self::insert_entry( $user_id, 'debito', $amount, $description, $order_id, 'cleared', $idempotency_key );
$wpdb->query( $inserted ? 'COMMIT' : 'ROLLBACK' );`,
        language: 'php',
      },
      {
        title: 'Regra de atacado validada no servidor',
        description: 'Quantidade mínima e múltiplos são conferidos no filtro de validação do carrinho do WooCommerce. Alterar o campo de quantidade pelo navegador não passa.',
        codeSnippet: `public function enforce_min_and_step( $passed, $product_id, $quantity ) {
    $min_qty  = absint( get_post_meta( $product_id, '_min_order_qty', true ) );
    $step_qty = absint( get_post_meta( $product_id, '_step_qty', true ) ) ?: 1;

    if ( $min_qty > 0 && $quantity < $min_qty ) {
        wc_add_notice( sprintf( __('Mínimo exigido: %d', 'domain'), $min_qty ), 'error' );
        return false;
    }

    if ( $step_qty > 1 && ( $quantity % $step_qty ) !== 0 ) {
        wc_add_notice( sprintf( __('Apenas múltiplos de: %d', 'domain'), $step_qty ), 'error' );
        return false;
    }

    return $passed;
}`,
        language: 'php',
      },
      {
        title: 'Entrada da personalização conferida por tipo',
        description: 'Cada campo recebido só é aceito se for texto, o que impede enviar um array no lugar de um valor. Depois é sanitizado conforme o tipo do campo antes de ir para o carrinho.',
        codeSnippet: `if ( isset( $_POST['jccm_custom'][$product_id] ) ) {
    $inputs = wp_unslash( $_POST['jccm_custom'][$product_id] );

    foreach ( $campos as $campo ) {
        $label = sanitize_text_field( $campo['label'] );

        // Só aceita string: um array no lugar do valor é descartado
        if ( isset( $inputs[$label] ) && is_string( $inputs[$label] ) ) {
            $valor_bruto = trim( $inputs[$label] );
            $dados[ $label ] = ( 'email' === $campo['tipo'] )
                ? sanitize_email( $valor_bruto )
                : sanitize_text_field( $valor_bruto );
        }
    }
}`,
        language: 'php',
      },
      {
        title: 'Estrutura em PSR-4',
        description: 'As classes são carregadas pelo autoloader do Composer (PSR-4) e registradas a partir de uma lista de serviços, cada um com o seu método register.',
        codeSnippet: `namespace JcCustomModal;

final class Init {
    public static function get_services() {
        return [
            Admin\\ProductTab::class,
            Frontend\\CartHandler::class,
            Frontend\\ModalDisplay::class
        ];
    }

    public static function run() {
        foreach ( self::get_services() as $class ) {
            $service = new $class();
            if ( method_exists( $service, 'register' ) ) {
                $service->register();
            }
        }
    }
}`,
        language: 'php',
      },
    ],
    aiSuggestions: [
      'Que problema cada plugin resolve?',
      'Como a carteira evita gastar o mesmo saldo duas vezes?',
      'Por que guardar o saldo como extrato e não numa coluna?',
    ],
  },
] as const satisfies readonly Project[];

// Tipagem dinamica baseada nos ids dos projetos
export type ProjectId = typeof projects[number]['id'];
