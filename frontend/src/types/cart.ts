import { ProductItem } from './products'

// Status do orçamento
export enum QuoteStatus {
  DRAFT = 'draft',
  PENDING = 'pending',
  SENT = 'sent',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  EXPIRED = 'expired'
}

// Status do pedido
export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PROCESSING = 'processing',
  PRODUCTION = 'production',
  READY = 'ready',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  INSTALLED = 'installed',
  CANCELLED = 'cancelled'
}

// Interface para desconto
export interface Discount {
  type: 'percentage' | 'fixed'
  value: number
  code?: string
  description?: string
}

// Interface para custos adicionais
export interface AdditionalCost {
  type: 'installation' | 'delivery' | 'urgency' | 'other'
  description: string
  value: number
}

// Interface para cálculo de preços
export interface PriceCalculation {
  basePrice: number // preço base do produto
  area: number // área em m²
  subtotal: number // basePrice * area * quantity
  materialSurcharge: number // sobretaxa do material
  colorSurcharge: number // sobretaxa da cor
  controlSurcharge: number // sobretaxa do controle
  additionalCosts: AdditionalCost[]
  discount?: Discount
  total: number // total com todos os cálculos
}

// Interface para item do carrinho
export interface CartItem extends ProductItem {
  id: string
  addedAt: Date
  priceCalculation: PriceCalculation
}

// Interface para carrinho
export interface Cart {
  id: string
  items: CartItem[]
  subtotal: number
  discount?: Discount
  additionalCosts: AdditionalCost[]
  total: number
  createdAt: Date
  updatedAt: Date
  expiresAt?: Date
}

// Interface para orçamento
export interface Quote {
  id: string
  quoteNumber: string
  cart: Cart
  customer: {
    name: string
    email: string
    phone: string
    document?: string // CPF ou CNPJ
    address?: Address
  }
  status: QuoteStatus
  notes?: string
  validUntil: Date
  paymentConditions?: string
  deliveryTime?: string
  createdAt: Date
  updatedAt: Date
  approvedAt?: Date
  rejectedAt?: Date
  sentAt?: Date
}

// Interface para pedido
export interface Order {
  id: string
  orderNumber: string
  quote: Quote
  status: OrderStatus
  paymentMethod?: PaymentMethod
  paymentStatus?: PaymentStatus
  installationDate?: Date
  installationAddress?: Address
  trackingCode?: string
  notes?: string
  timeline: OrderTimeline[]
  createdAt: Date
  updatedAt: Date
}

// Interface para endereço
export interface Address {
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
  country: string
  reference?: string
}

// Métodos de pagamento
export enum PaymentMethod {
  CREDIT_CARD = 'credit_card',
  DEBIT_CARD = 'debit_card',
  PIX = 'pix',
  BANK_SLIP = 'bank_slip',
  BANK_TRANSFER = 'bank_transfer',
  CASH = 'cash',
  CHECK = 'check'
}

// Status do pagamento
export enum PaymentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
  PARTIALLY_REFUNDED = 'partially_refunded'
}

// Timeline do pedido
export interface OrderTimeline {
  status: OrderStatus
  description: string
  date: Date
  user?: string
}

// Interface para resumo de preços (usado na UI)
export interface PriceSummary {
  subtotal: number
  discountAmount: number
  additionalCostsAmount: number
  installationCost: number
  deliveryCost: number
  taxAmount?: number
  total: number
}