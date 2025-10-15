import { IsNotEmpty, IsString, IsEnum, IsOptional, IsNumber } from 'class-validator'
import { PaymentMethod } from '@prisma/client'

export class ShippingAddressDto {
  @IsNotEmpty()
  @IsString()
  recipientName: string

  @IsNotEmpty()
  @IsString()
  street: string

  @IsNotEmpty()
  @IsString()
  number: string

  @IsOptional()
  @IsString()
  complement?: string

  @IsNotEmpty()
  @IsString()
  neighborhood: string

  @IsNotEmpty()
  @IsString()
  city: string

  @IsNotEmpty()
  @IsString()
  state: string

  @IsNotEmpty()
  @IsString()
  zipCode: string
}

export class CreateOrderDto {
  @IsNotEmpty()
  shippingAddress: ShippingAddressDto

  @IsNotEmpty()
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod

  @IsOptional()
  @IsNumber()
  frete?: number

  @IsOptional()
  @IsNumber()
  instalacao?: number

  @IsOptional()
  @IsString()
  couponCode?: string
}