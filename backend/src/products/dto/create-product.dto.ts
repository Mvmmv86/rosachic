import { IsString, IsNumber, IsEnum, IsArray, IsBoolean, IsOptional, Min, Max } from 'class-validator'
import { Luminosidade, Material } from '@prisma/client'

export class CreateProductDto {
  @IsString()
  codigo: string

  @IsString()
  modelo: string

  @IsEnum(Luminosidade)
  luminosidade: Luminosidade

  @IsEnum(Material)
  material: Material

  @IsNumber()
  @Min(0.01)
  valorM2: number

  @IsNumber()
  @Min(1)
  @Max(1000)
  larguraMaxCm: number

  @IsNumber()
  @Min(1)
  @Max(1000)
  alturaMaxCm: number

  @IsNumber()
  @IsOptional()
  @Min(0.1)
  areaMinM2?: number

  @IsArray()
  @IsString({ each: true })
  ambientes: string[]

  @IsArray()
  @IsString({ each: true })
  imagens: string[]

  @IsString()
  descricao: string

  @IsNumber()
  @IsOptional()
  @Min(0)
  estoque?: number

  @IsBoolean()
  @IsOptional()
  ativo?: boolean
}