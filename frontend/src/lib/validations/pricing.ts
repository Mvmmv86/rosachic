import { z } from 'zod'

/**
 * Schema para entrada de cálculo de preço
 */
export const pricingInputSchema = z.object({
  widthCm: z
    .number()
    .min(30, 'Largura mínima: 30cm')
    .max(300, 'Largura máxima: 300cm'),

  heightCm: z
    .number()
    .min(30, 'Altura mínima: 30cm')
    .max(350, 'Altura máxima: 350cm'),

  productId: z
    .string()
    .min(1, 'Selecione um produto'),

  pricePerM2: z
    .number()
    .min(0, 'Preço por m² inválido'),

  lossFactor: z
    .number()
    .min(1.05, 'Fator de perda mínimo: 1.05')
    .max(1.15, 'Fator de perda máximo: 1.15')
    .default(1.1),

  // Opcionais
  withMotor: z.boolean().default(false),
  motorPrice: z.number().optional(),

  withBando: z.boolean().default(false),
  bandoPricePerMeter: z.number().optional(),

  installationPercentage: z
    .number()
    .min(0)
    .max(20, 'Instalação máxima: 20%')
    .default(10),

  shippingCost: z
    .number()
    .min(0)
    .default(0),

  discountPercentage: z
    .number()
    .min(0)
    .max(100, 'Desconto máximo: 100%')
    .default(0),
})

/**
 * Schema para resultado do cálculo de preço
 */
export const pricingResultSchema = z.object({
  // Áreas
  grossArea: z.number(),
  adjustedArea: z.number(),
  chargeableArea: z.number(),

  // Valores base
  basePrice: z.number(),

  // Opcionais
  motorPrice: z.number().default(0),
  bandoPrice: z.number().default(0),
  optionalsTotal: z.number(),

  // Subtotal
  subtotal: z.number(),

  // Adicionais
  installationPrice: z.number(),
  shippingCost: z.number(),

  // Total bruto
  grossTotal: z.number(),

  // Desconto
  discountValue: z.number(),

  // Total final
  finalTotal: z.number(),

  // Detalhamento
  breakdown: z.array(z.string()),
})

/**
 * Schema para desconto
 */
export const discountSchema = z.object({
  type: z.enum(['percentage', 'fixed']),
  value: z.number().min(0),
  code: z.string().optional(),
  maxDiscount: z.number().optional(),
})

/**
 * Schema para cupom de desconto
 */
export const couponSchema = z.object({
  code: z
    .string()
    .min(3, 'Código mínimo: 3 caracteres')
    .max(20, 'Código máximo: 20 caracteres')
    .toUpperCase(),

  discountType: z.enum(['percentage', 'fixed']),

  discountValue: z
    .number()
    .min(0),

  minimumPurchase: z
    .number()
    .min(0)
    .default(0),

  maxDiscount: z
    .number()
    .min(0)
    .optional(),

  validFrom: z.string().datetime(),
  validUntil: z.string().datetime(),

  maxUses: z
    .number()
    .min(1)
    .optional(),

  currentUses: z
    .number()
    .min(0)
    .default(0),

  active: z.boolean().default(true),
})

/**
 * Schema para validação de aplicação de cupom
 */
export const applyCouponSchema = z.object({
  couponCode: z.string(),
  orderValue: z.number().min(0),
  userId: z.string().optional(),
}).refine(
  (data) => data.orderValue > 0,
  {
    message: 'Valor do pedido deve ser maior que zero',
    path: ['orderValue'],
  }
)

/**
 * Schema para cálculo em lote
 */
export const batchPricingSchema = z.array(
  pricingInputSchema.extend({
    id: z.string(),
    quantity: z.number().min(1).default(1),
  })
).min(1, 'Adicione pelo menos um item')
  .max(50, 'Máximo de 50 itens por cálculo')

/**
 * Schema para orçamento completo
 */
export const quotationSchema = z.object({
  customerId: z.string().optional(),

  items: batchPricingSchema,

  shippingAddress: z.object({
    cep: z.string(),
    city: z.string(),
    state: z.string(),
  }).optional(),

  paymentMethod: z.enum(['pix', 'credit', 'debit', 'boleto']).optional(),

  installments: z.number().min(1).max(12).default(1),

  notes: z.string().optional(),

  validUntil: z.string().datetime(),
})

// Tipos TypeScript inferidos dos schemas
export type PricingInput = z.infer<typeof pricingInputSchema>
export type PricingResult = z.infer<typeof pricingResultSchema>
export type Discount = z.infer<typeof discountSchema>
export type Coupon = z.infer<typeof couponSchema>
export type ApplyCoupon = z.infer<typeof applyCouponSchema>
export type BatchPricing = z.infer<typeof batchPricingSchema>
export type Quotation = z.infer<typeof quotationSchema>