import { z } from 'zod'
import { PRICING_CONSTANTS } from '@/lib/constants/pricing'
import { roundUp } from '@/lib/utils/math'

/**
 * Schema de entrada para cálculo de preço
 */
const pricingInputSchema = z.object({
  // Dimensões
  widthCm: z.number()
    .min(30, 'Largura mínima: 30cm')
    .max(300, 'Largura máxima: 300cm'),

  heightCm: z.number()
    .min(30, 'Altura mínima: 30cm')
    .max(350, 'Altura máxima: 350cm'),

  // Produto
  productId: z.string().min(1, 'ID do produto obrigatório'),
  pricePerM2: z.number().min(0, 'Preço por m² inválido'),
  kMaterial: z.number()
    .min(1, 'Fator de material mínimo: 1.0')
    .max(2, 'Fator de material máximo: 2.0')
    .default(1.0),

  // Fatores
  lossFactor: z.number()
    .min(1.0, 'Fator de perda mínimo: 1.0')
    .max(1.15, 'Fator de perda máximo: 1.15')
    .default(1.1),

  // Opcionais específicos
  bando: z.object({
    enabled: z.boolean(),
    pricePerMeter: z.number().min(0)
  }).optional(),

  motor: z.object({
    enabled: z.boolean(),
    fixedPrice: z.number().min(0)
  }).optional(),

  // Percentuais e valores
  installationPercentage: z.number()
    .min(0)
    .max(20, 'Instalação máxima: 20%')
    .default(8), // 8% padrão

  shippingCost: z.number()
    .min(0)
    .default(0),

  discountPercentage: z.number()
    .min(0)
    .max(100, 'Desconto máximo: 100%')
    .default(0),

  // Restrições do produto (opcional)
  maxWidthCm: z.number().optional(),
  maxHeightCm: z.number().optional(),
})

export type PricingInput = z.infer<typeof pricingInputSchema>

/**
 * Interface para resultado do cálculo
 */
export interface PricingResult {
  // Áreas
  areaBruta: number
  areaAjustada: number
  areaArredondada: number
  areaCobravel: number

  // Valores base
  precoBase: number

  // Opcionais
  opcionais: {
    bando: number
    motor: number
    total: number
  }

  // Subtotal
  subtotal: number

  // Adicionais
  instalacao: number
  frete: number

  // Total bruto
  totalBruto: number

  // Desconto
  desconto: number

  // Total final
  totalFinal: number

  // Avisos
  avisos: string[]

  // Breakdown detalhado
  breakdown: {
    step1_areaBruta: string
    step2_areaAjustada: string
    step3_arredondada: string
    step4_areaCobravel: string
    step5_precoBase: string
    step6_opcionais: string
    step7_instalacaoFrete: string
    step8_desconto: string
  }
}

/**
 * Calcula preço completo de persiana seguindo fórmula de 8 passos
 * Conforme especificação do documento PROJETO_COMPLETO_ROSA_CHIC.md
 */
export function calculatePrice(input: PricingInput): PricingResult {
  // Validar entrada
  const validatedInput = pricingInputSchema.parse(input)

  const {
    widthCm,
    heightCm,
    pricePerM2,
    kMaterial = 1.0,
    lossFactor = 1.1,
    bando,
    motor,
    installationPercentage = 8,
    shippingCost = 0,
    discountPercentage = 0,
    maxWidthCm,
    maxHeightCm,
  } = validatedInput

  // Validações de dimensões máximas do produto
  const avisos: string[] = []

  if (maxWidthCm && widthCm > maxWidthCm) {
    throw new Error(`Largura ${widthCm}cm excede o máximo permitido de ${maxWidthCm}cm para este produto`)
  }

  if (maxHeightCm && heightCm > maxHeightCm) {
    throw new Error(`Altura ${heightCm}cm excede o máximo permitido de ${maxHeightCm}cm para este produto`)
  }

  // PASSO 1: Área bruta (m²)
  const areaBruta = (widthCm / 100) * (heightCm / 100)

  // PASSO 2: Área ajustada (com fator de perda)
  const areaAjustada = areaBruta * lossFactor

  // PASSO 3: Arredondar para cima (0.1 m²)
  const areaArredondada = roundUp(areaAjustada, 1)

  // PASSO 4: Área cobrável (mínimo 1 m²)
  const areaCobravel = Math.max(areaArredondada, PRICING_CONSTANTS.MIN_CHARGEABLE_AREA_M2)

  // Aviso para áreas grandes
  if (areaCobravel > 6.0) {
    avisos.push('⚠️ Área muito grande (>6m²). Recomendamos dividir em 2 módulos para melhor desempenho.')
  }

  if (areaCobravel > 8.0) {
    avisos.push('❗ Área excede 8m². Fortemente recomendado dividir em múltiplos módulos.')
  }

  // PASSO 5: Preço base (COM K_MATERIAL)
  const precoBase = areaCobravel * pricePerM2 * kMaterial

  // PASSO 6: Opcionais
  let valorBando = 0
  if (bando?.enabled && bando.pricePerMeter > 0) {
    // Bandô é calculado pela largura em metros
    valorBando = (widthCm / 100) * bando.pricePerMeter
  }

  let valorMotor = 0
  if (motor?.enabled && motor.fixedPrice > 0) {
    valorMotor = motor.fixedPrice
  }

  const totalOpcionais = valorBando + valorMotor
  const subtotal = precoBase + totalOpcionais

  // PASSO 7: Instalação e Frete
  const instalacao = subtotal * (installationPercentage / 100)
  const totalBruto = subtotal + instalacao + shippingCost

  // PASSO 8: Desconto
  const desconto = totalBruto * (discountPercentage / 100)
  const totalFinal = totalBruto - desconto

  // Retornar resultado completo
  return {
    // Áreas
    areaBruta,
    areaAjustada,
    areaArredondada,
    areaCobravel,

    // Valores
    precoBase,

    // Opcionais
    opcionais: {
      bando: valorBando,
      motor: valorMotor,
      total: totalOpcionais,
    },

    // Totais
    subtotal,
    instalacao,
    frete: shippingCost,
    totalBruto,
    desconto,
    totalFinal,

    // Avisos
    avisos,

    // Breakdown detalhado para debug/exibição
    breakdown: {
      step1_areaBruta: `${widthCm}cm × ${heightCm}cm = ${areaBruta.toFixed(2)}m²`,
      step2_areaAjustada: `${areaBruta.toFixed(2)}m² × ${lossFactor} = ${areaAjustada.toFixed(3)}m²`,
      step3_arredondada: `Arredondado para cima: ${areaArredondada.toFixed(1)}m²`,
      step4_areaCobravel: `Área cobrável: ${areaCobravel.toFixed(1)}m² (mínimo: 1.0m²)`,
      step5_precoBase: `${areaCobravel.toFixed(1)}m² × R$ ${pricePerM2.toFixed(2)} × ${kMaterial} (k_material) = R$ ${precoBase.toFixed(2)}`,
      step6_opcionais: `Bandô: R$ ${valorBando.toFixed(2)} + Motor: R$ ${valorMotor.toFixed(2)} = R$ ${totalOpcionais.toFixed(2)}`,
      step7_instalacaoFrete: `Instalação (${installationPercentage}%): R$ ${instalacao.toFixed(2)} + Frete: R$ ${shippingCost.toFixed(2)}`,
      step8_desconto: discountPercentage > 0
        ? `Desconto (${discountPercentage}%): R$ ${desconto.toFixed(2)}`
        : 'Sem desconto aplicado',
    },
  }
}

/**
 * Calcula múltiplas persianas de uma vez
 */
export function calculateMultiple(items: PricingInput[]): {
  items: PricingResult[]
  totalGeral: number
  totalComDesconto: number
  economiaTotal: number
} {
  const results = items.map(item => calculatePrice(item))

  const totalGeral = results.reduce((sum, r) => sum + r.totalBruto, 0)
  const totalComDesconto = results.reduce((sum, r) => sum + r.totalFinal, 0)
  const economiaTotal = totalGeral - totalComDesconto

  return {
    items: results,
    totalGeral,
    totalComDesconto,
    economiaTotal,
  }
}

/**
 * Valida se as dimensões estão dentro dos limites
 */
export function validateDimensions(
  widthCm: number,
  heightCm: number,
  maxWidthCm: number = 300,
  maxHeightCm: number = 350
): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (widthCm < 30) errors.push('Largura mínima: 30cm')
  if (widthCm > maxWidthCm) errors.push(`Largura máxima: ${maxWidthCm}cm`)
  if (heightCm < 30) errors.push('Altura mínima: 30cm')
  if (heightCm > maxHeightCm) errors.push(`Altura máxima: ${maxHeightCm}cm`)

  const area = (widthCm / 100) * (heightCm / 100)
  if (area > 10.5) errors.push('Área máxima: 10.5m²')

  return {
    valid: errors.length === 0,
    errors,
  }
}

/**
 * Fatores de material padrão conforme especificação
 */
export const MATERIAL_FACTORS = {
  'tela_solar': 1.00,
  'blackout_tecido': 1.225, // Média entre 1.15 e 1.30
  'linho_sarja': 1.175,     // Média entre 1.10 e 1.25
  'madeira_bambu': 1.60,    // Média entre 1.40 e 1.80
  'pvc': 1.075,              // Média entre 1.00 e 1.15
} as const

/**
 * Helper para obter fator de material
 */
export function getMaterialFactor(material: keyof typeof MATERIAL_FACTORS): number {
  return MATERIAL_FACTORS[material] || 1.0
}