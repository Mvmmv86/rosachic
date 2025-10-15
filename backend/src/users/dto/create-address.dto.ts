import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator'

export class CreateAddressDto {
  @IsNotEmpty()
  @IsString()
  name: string

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

  @IsOptional()
  @IsBoolean()
  isDefault?: boolean
}