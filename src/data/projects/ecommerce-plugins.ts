import type { Project } from '@/types/portfolio';

export const ecommercePlugins = {
  id: 'ecommerce-plugins',
  title: 'Plugins para WooCommerce',
  category: 'E-commerce',
  shortDescription: 'Três plugins pessoais em PHP, de código aberto: cashback, regras de atacado e personalização de produto.',
  caseSummary: {
    problem: 'Loja que vende para empresa e para consumidor precisa de cashback, quantidade mínima e personalização sem complicar a compra.',
    decision: 'Um plugin por problema. No atacado, mínimo e múltiplo são conferidos no servidor, e não só na tela do produto.',
    status: 'Código publicado, com README e demonstração. São projetos pessoais, sem resultado de produção medido.',
  },
  challenge: 'Loja que vende para empresa e para consumidor final esbarra em três pontos: o cliente compra uma vez e não volta; o atacado precisa de quantidade mínima e venda em múltiplos; e produto personalizado com muitos campos atrapalha a compra.',
  solution: '1. JC Digital Wallet: carteira com cashback. O saldo é calculado a partir de um extrato de créditos e débitos. O cashback fica pendente até o pagamento ser confirmado. O débito roda dentro de uma transação no banco, e uma chave única evita gravar a mesma operação duas vezes.\n\n2. JC Volume Pricing: preço por faixa de quantidade, quantidade mínima e venda em múltiplos. A regra é conferida no servidor, no carrinho, e não só na página do produto.\n\n3. JC Custom Modal: leva os campos de personalização para um modal e salva perfis de preenchimento para o cliente reaproveitar. Os valores recebidos são conferidos e limpos antes de ir para o carrinho.',
  impact: 'Os três plugins são projetos pessoais de código aberto, com README e demonstração. Não há resultado de produção medido.',
  techStack: ['PHP', 'WordPress', 'MySQL', 'JavaScript'],
  repositoryType: 'multi-repo',
  modules: [
    {
      name: 'Carteira e cashback',
      badge: 'Saldo por extrato',
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
      title: 'Débito dentro de uma transação',
      description: 'O saldo é recalculado dentro da transação, com as linhas do usuário travadas até o fim. Se a mesma operação chegar de novo com a mesma chave, ela não debita outra vez.',
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
    'Como o saldo da carteira é calculado?',
    'Por que conferir a regra de atacado no servidor?',
  ],
} as const satisfies Project;
