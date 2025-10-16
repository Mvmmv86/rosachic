import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator'

export class SaveCardDto {
  @IsNotEmpty()
  @IsString()
  cardToken: string // Token do Mercado Pago (NÃO o número do cartão!)

  @IsNotEmpty()
  @IsString()
  lastFourDigits: string // Apenas últimos 4 dígitos

  @IsNotEmpty()
  @IsString()
  brand: string // Visa, Mastercard, etc

  @IsNotEmpty()
  @IsString()
  expirationMonth: string // MM

  @IsNotEmpty()
  @IsString()
  expirationYear: string // YYYY

  @IsNotEmpty()
  @IsString()
  holderName: string

  @IsOptional()
  @IsBoolean()
  isDefault?: boolean
}