import { IsNotEmpty, IsNumber, IsString, IsPositive, Min } from 'class-validator'

export class AddToCartDto {
  @IsNotEmpty()
  @IsString()
  productId: string

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  widthCm: number

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  heightCm: number

  @IsNumber()
  @Min(1)
  quantity: number = 1
}