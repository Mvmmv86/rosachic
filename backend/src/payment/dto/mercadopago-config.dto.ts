import { IsString, IsBoolean, IsOptional, IsUrl, IsEnum } from 'class-validator';
import { CheckoutMode } from '@prisma/client';

export class CreateMercadoPagoConfigDto {
  @IsEnum(CheckoutMode)
  checkoutMode: CheckoutMode;

  @IsString()
  @IsOptional()
  publicKey?: string = '';

  @IsString()
  @IsOptional()
  accessToken?: string = '';

  @IsString()
  @IsOptional()
  webhookSecret?: string;

  @IsBoolean()
  @IsOptional()
  isProduction?: boolean = false;

  @IsUrl()
  @IsOptional()
  notificationUrl?: string;

  @IsString()
  @IsOptional()
  successUrl?: string = '/checkout/sucesso';

  @IsString()
  @IsOptional()
  failureUrl?: string = '/checkout/falha';

  @IsString()
  @IsOptional()
  pendingUrl?: string = '/checkout/pendente';
}

export class UpdateMercadoPagoConfigDto {
  @IsEnum(CheckoutMode)
  @IsOptional()
  checkoutMode?: CheckoutMode;

  @IsString()
  @IsOptional()
  publicKey?: string;

  @IsString()
  @IsOptional()
  accessToken?: string;

  @IsString()
  @IsOptional()
  webhookSecret?: string;

  @IsBoolean()
  @IsOptional()
  isProduction?: boolean;

  @IsUrl()
  @IsOptional()
  notificationUrl?: string;

  @IsString()
  @IsOptional()
  successUrl?: string;

  @IsString()
  @IsOptional()
  failureUrl?: string;

  @IsString()
  @IsOptional()
  pendingUrl?: string;
}