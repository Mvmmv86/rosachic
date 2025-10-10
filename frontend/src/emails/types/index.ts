/**
 * TIPOS PARA EMAILS - ROSA CHIC
 *
 * Este arquivo contém todos os tipos TypeScript para os emails da plataforma.
 * Todas as variáveis marcadas com comentários são campos dinâmicos que serão
 * preenchidos pelo backend.
 */

// ============================================================================
// TIPOS BASE
// ============================================================================

export interface BaseEmailProps {
  /** VARIÁVEL DINÂMICA: Nome do cliente */
  customerName: string
}

export interface ProductItem {
  /** VARIÁVEL DINÂMICA: Nome do produto */
  name: string
  /** VARIÁVEL DINÂMICA: Categoria do produto */
  category: string
  /** VARIÁVEL DINÂMICA: Cor escolhida */
  color: string
  /** VARIÁVEL DINÂMICA: Largura em metros */
  width: number
  /** VARIÁVEL DINÂMICA: Altura em metros */
  height: number
  /** VARIÁVEL DINÂMICA: Lado da cordinha (Direito/Esquerdo) */
  cordSide: 'Direito' | 'Esquerdo'
  /** VARIÁVEL DINÂMICA: Quantidade */
  quantity: number
  /** VARIÁVEL DINÂMICA: Preço unitário */
  price: number
  /** VARIÁVEL DINÂMICA: URL da imagem do produto */
  imageUrl?: string
}

export interface OrderDetails {
  /** VARIÁVEL DINÂMICA: Número do pedido */
  orderNumber: string
  /** VARIÁVEL DINÂMICA: Data da compra */
  orderDate: string
  /** VARIÁVEL DINÂMICA: Itens do pedido */
  items: ProductItem[]
  /** VARIÁVEL DINÂMICA: Valor total */
  total: number
}

// ============================================================================
// EMAIL 1 - BEM-VINDO
// ============================================================================
export interface Email01WelcomeProps extends BaseEmailProps {
  // Apenas customerName é necessário
}

// ============================================================================
// EMAIL 2 - PEDIDO CONFIRMADO
// ============================================================================
export interface Email02OrderReceivedProps extends BaseEmailProps {
  /** VARIÁVEL DINÂMICA: Número do pedido */
  orderNumber: string
}

// ============================================================================
// EMAIL 3 - CARRINHO ABANDONADO (ELEGANTE)
// ============================================================================
export interface Email03CartAbandonedProps extends BaseEmailProps {
  // Apenas customerName é necessário
}

// ============================================================================
// EMAIL 4 - COMO MEDIR
// ============================================================================
export interface Email04HowToMeasureProps extends BaseEmailProps {
  // Apenas customerName é necessário
}

// ============================================================================
// EMAIL 5 e 6 - TRANSFORMAMOS AMBIENTES (IDÊNTICOS)
// ============================================================================
export interface Email05_06ProjectsProps extends BaseEmailProps {
  // Apenas customerName é necessário
}

// ============================================================================
// EMAIL 7 - POR QUE ESCOLHER ROSA CHIC
// ============================================================================
export interface Email07WhyChooseProps extends BaseEmailProps {
  // Apenas customerName é necessário
}

// ============================================================================
// EMAIL 8 e 9 - OFERTA DE BOAS-VINDAS (CUPOM)
// ============================================================================
export interface Email08_09WelcomeOfferProps extends BaseEmailProps {
  /** VARIÁVEL DINÂMICA: Código do cupom */
  couponCode: string
  /** VARIÁVEL DINÂMICA: Desconto percentual */
  discountPercentage: number
}

// ============================================================================
// EMAIL 10 - RECOMENDAÇÕES PERSONALIZADAS
// ============================================================================
export interface Email10RecommendationsProps extends BaseEmailProps {
  // Apenas customerName é necessário
}

// ============================================================================
// EMAIL 11 - INSPIRAÇÕES DE DECORAÇÃO
// ============================================================================
export interface Email11InspirationProps extends BaseEmailProps {
  // Apenas customerName é necessário
}

// ============================================================================
// EMAIL 12 - CARRINHO ABANDONADO (COM PRODUTO)
// ============================================================================
export interface Email12CartWithProductProps extends BaseEmailProps {
  /** VARIÁVEL DINÂMICA: Detalhes do produto no carrinho */
  product: ProductItem
}

// ============================================================================
// EMAIL 13 - ÚLTIMA CHANCE (URGÊNCIA)
// ============================================================================
export interface Email13LastChanceProps extends BaseEmailProps {
  /** VARIÁVEL DINÂMICA: Detalhes do produto no carrinho */
  product: ProductItem
}

// ============================================================================
// EMAIL 14 - FRETE GRÁTIS (INCENTIVO)
// ============================================================================
export interface Email14FreeShippingProps extends BaseEmailProps {
  /** VARIÁVEL DINÂMICA: Detalhes do produto no carrinho */
  product: ProductItem
}

// ============================================================================
// EMAIL 15 - PEDIDO CONFIRMADO (DETALHADO)
// ============================================================================
export interface Email15OrderConfirmedProps extends BaseEmailProps {
  /** VARIÁVEL DINÂMICA: Detalhes completos do pedido */
  order: OrderDetails
}

// ============================================================================
// EMAIL 16 - PEDIDO ENVIADO
// ============================================================================
export interface Email16OrderShippedProps extends BaseEmailProps {
  /** VARIÁVEL DINÂMICA: Número do pedido */
  orderNumber: string
  /** VARIÁVEL DINÂMICA: Nome da transportadora */
  carrier: string
  /** VARIÁVEL DINÂMICA: Código de rastreio */
  trackingCode: string
}

// ============================================================================
// EMAIL 17 - PEDIDO ENTREGUE
// ============================================================================
export interface Email17OrderDeliveredProps extends BaseEmailProps {
  /** VARIÁVEL DINÂMICA: Número do pedido */
  orderNumber: string
  /** VARIÁVEL DINÂMICA: Data da entrega */
  deliveryDate: string
}

// ============================================================================
// EMAIL 18 - AGRADECIMENTO
// ============================================================================
export interface Email18ThankYouProps extends BaseEmailProps {
  // Apenas customerName é necessário
}

// ============================================================================
// EMAIL 19 - DICAS DE CONSERVAÇÃO
// ============================================================================
export interface Email19MaintenanceTipsProps extends BaseEmailProps {
  // Apenas customerName é necessário
}

// ============================================================================
// EMAIL 20 - CROSS-SELL (COMBINE COM OUTROS MODELOS)
// ============================================================================
export interface Email20CrossSellProps extends BaseEmailProps {
  // Apenas customerName é necessário
}

// ============================================================================
// EMAIL 21 - REATIVAÇÃO (SENTIMOS SUA FALTA)
// ============================================================================
export interface Email21ReactivationProps extends BaseEmailProps {
  // Apenas customerName é necessário
}

// ============================================================================
// EMAIL 22 - REATIVAÇÃO COM CUPOM (15% OFF)
// ============================================================================
export interface Email22ReactivationCouponProps extends BaseEmailProps {
  /** VARIÁVEL DINÂMICA: Código do cupom */
  couponCode: string
  /** VARIÁVEL DINÂMICA: Desconto percentual */
  discountPercentage: number
}

// ============================================================================
// EMAIL 23 - REDEFINIR SENHA
// ============================================================================
export interface Email23ResetPasswordProps extends BaseEmailProps {
  /** VARIÁVEL DINÂMICA: URL para redefinir senha */
  resetPasswordUrl: string
  /** VARIÁVEL DINÂMICA: Tempo de validade em minutos */
  expirationMinutes: number
}

// ============================================================================
// EMAIL 24 - SENHA ALTERADA
// ============================================================================
export interface Email24PasswordChangedProps extends BaseEmailProps {
  // Apenas customerName é necessário
}
