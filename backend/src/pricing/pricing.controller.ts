import { Controller, Post, Body, UseGuards } from '@nestjs/common'
import { PricingService } from './pricing.service'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

@Controller('pricing')
export class PricingController {
  constructor(private pricingService: PricingService) {}

  @Post('calculate')
  async calculate(
    @Body()
    data: {
      widthCm: number
      heightCm: number
      productId: string
      lossFactor?: number
      installationPercentage?: number
      freightCost?: number
      discountPercentage?: number
    },
  ) {
    return this.pricingService.calculatePrice(data)
  }

  @UseGuards(JwtAuthGuard)
  @Post('calculate-authenticated')
  async calculateAuthenticated(
    @Body()
    data: {
      widthCm: number
      heightCm: number
      productId: string
      lossFactor?: number
      installationPercentage?: number
      freightCost?: number
      discountPercentage?: number
    },
  ) {
    // Pode aplicar descontos especiais para usuários autenticados
    return this.pricingService.calculatePrice(data)
  }
}