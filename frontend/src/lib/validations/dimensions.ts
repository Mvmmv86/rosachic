import { z } from 'zod'

/**
 * Schema para validação de dimensões de persianas
 */
export const dimensionsSchema = z.object({
  widthCm: z
    .number()
    .min(30, 'Largura mínima: 30cm')
    .max(300, 'Largura máxima: 300cm'),

  heightCm: z
    .number()
    .min(30, 'Altura mínima: 30cm')
    .max(350, 'Altura máxima: 350cm'),
})

/**
 * Schema para validação de área
 */
export const areaSchema = z.object({
  areaM2: z
    .number()
    .min(0.09, 'Área mínima: 0.09m²')
    .max(10.5, 'Área máxima: 10.5m²'),
})

/**
 * Schema para validação com área máxima recomendada
 */
export const dimensionsWithWarningSchema = dimensionsSchema.extend({
  areaM2: z.number(),
}).refine(
  (data) => {
    const area = (data.widthCm / 100) * (data.heightCm / 100)
    return area <= 8
  },
  {
    message: 'Área muito grande (>8m²). Recomenda-se dividir em 2 módulos',
    path: ['areaM2'],
  }
)

/**
 * Schema para validação de dimensões com restrições por produto
 */
export const productDimensionsSchema = z.object({
  widthCm: z.number(),
  heightCm: z.number(),
  maxWidthCm: z.number(),
  maxHeightCm: z.number(),
}).refine(
  (data) => data.widthCm <= data.maxWidthCm,
  {
    message: 'Largura excede o máximo permitido para este produto',
    path: ['widthCm'],
  }
).refine(
  (data) => data.heightCm <= data.maxHeightCm,
  {
    message: 'Altura excede o máximo permitido para este produto',
    path: ['heightCm'],
  }
)

/**
 * Schema para validação de dimensões mínimas
 */
export const minimumDimensionsSchema = z.object({
  widthCm: z.number(),
  heightCm: z.number(),
}).refine(
  (data) => {
    const area = (data.widthCm / 100) * (data.heightCm / 100)
    return area >= 1.0
  },
  {
    message: 'Área mínima para cobrança: 1.00m²',
    path: ['areaM2'],
  }
)

/**
 * Schema para múltiplas persianas
 */
export const multipleDimensionsSchema = z.array(
  dimensionsSchema.extend({
    id: z.string(),
    ambiente: z.string().optional(),
  })
).min(1, 'Adicione pelo menos uma persiana')
  .max(20, 'Máximo de 20 persianas por pedido')

// Tipos TypeScript inferidos dos schemas
export type Dimensions = z.infer<typeof dimensionsSchema>
export type Area = z.infer<typeof areaSchema>
export type DimensionsWithWarning = z.infer<typeof dimensionsWithWarningSchema>
export type ProductDimensions = z.infer<typeof productDimensionsSchema>
export type MinimumDimensions = z.infer<typeof minimumDimensionsSchema>
export type MultipleDimensions = z.infer<typeof multipleDimensionsSchema>