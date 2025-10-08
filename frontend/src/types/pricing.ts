export interface PricingInput {
  widthCm: number
  heightCm: number
  modelId: string
  pricePerM2: number
  lossFactor?: number
  optionals?: PricingOptional[]
  installationPercentage?: number
  freightCost?: number
  discountPercentage?: number
}

export interface PricingOptional {
  id: string
  name: string
  type: 'fixed' | 'per_meter' | 'per_m2'
  value: number
  quantity?: number
}

export interface PricingResult {
  areaBruta: number
  areaAjustada: number
  areaCobravel: number
  precoBase: number
  opcionais: {
    name: string
    value: number
  }[]
  subtotal: number
  instalacao: number
  frete: number
  totalBruto: number
  desconto: number
  totalFinal: number
  breakdown: PricingBreakdown
}

export interface PricingBreakdown {
  step1_areaBruta: string
  step2_areaAjustada: string
  step3_arredondada: string
  step4_areaCobravel: string
  step5_precoBase: string
  step6_opcionais: string
  step7_instalacaoFrete: string
  step8_desconto: string
}