import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

interface PricingInput {
  widthCm: number
  heightCm: number
  productId: string
  lossFactor?: number
  installationPercentage?: number
  freightCost?: number
  discountPercentage?: number
}

const PRICING_CONSTANTS = {
  CM_TO_METERS: 100,
  MIN_CHARGEABLE_AREA_M2: 1.2, // Área mínima cobrável: 1,2m²
  DEFAULT_LOSS_FACTOR: 1.1,
  ROUNDING_DECIMAL_PLACES: 1,
  DEFAULT_INSTALLATION_PERCENTAGE: 0.1,
}

@Injectable()
export class PricingService {
  constructor(private prisma: PrismaService) {}

  async calculatePrice(input: PricingInput) {
    // Buscar produto
    const product = await this.prisma.product.findUnique({
      where: { id: input.productId },
    })

    if (!product) {
      throw new Error('Produto não encontrado')
    }

    // Validar dimensões
    if (
      input.widthCm < 1 ||
      input.widthCm > product.larguraMaxCm ||
      input.heightCm < 1 ||
      input.heightCm > product.alturaMaxCm
    ) {
      throw new Error('Dimensões inválidas para este produto')
    }

    const lossFactor = input.lossFactor ?? PRICING_CONSTANTS.DEFAULT_LOSS_FACTOR
    const installationPercentage =
      input.installationPercentage ??
      PRICING_CONSTANTS.DEFAULT_INSTALLATION_PERCENTAGE
    const freightCost = input.freightCost ?? 0
    const discountPercentage = input.discountPercentage ?? 0

    // PASSO 1: Área bruta
    const areaBruta =
      (input.widthCm / PRICING_CONSTANTS.CM_TO_METERS) *
      (input.heightCm / PRICING_CONSTANTS.CM_TO_METERS)

    // PASSO 2: Área ajustada
    const areaAjustada = areaBruta * lossFactor

    // PASSO 3: Arredondar
    const areaArredondada = this.roundUp(
      areaAjustada,
      PRICING_CONSTANTS.ROUNDING_DECIMAL_PLACES
    )

    // PASSO 4: Área cobrável
    const areaCobravel = Math.max(
      areaArredondada,
      PRICING_CONSTANTS.MIN_CHARGEABLE_AREA_M2
    )

    // PASSO 5: Preço base
    const precoBase = areaCobravel * product.valorM2

    // PASSO 6: Opcionais (a implementar)
    const subtotal = precoBase

    // PASSO 7: Instalação e Frete
    const instalacao = subtotal * installationPercentage
    const totalBruto = subtotal + instalacao + freightCost

    // PASSO 8: Desconto
    const desconto = totalBruto * (discountPercentage / 100)
    const totalFinal = totalBruto - desconto

    return {
      areaBruta,
      areaAjustada,
      areaCobravel,
      precoBase,
      subtotal,
      instalacao,
      frete: freightCost,
      totalBruto,
      desconto,
      totalFinal,
      product: {
        id: product.id,
        modelo: product.modelo,
        codigo: product.codigo,
      },
    }
  }

  private roundUp(value: number, decimals: number): number {
    const factor = Math.pow(10, decimals)
    return Math.ceil(value * factor) / factor
  }
}