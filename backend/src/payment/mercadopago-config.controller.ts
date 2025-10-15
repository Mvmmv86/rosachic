import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { MercadoPagoConfigService } from './mercadopago-config.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { CreateMercadoPagoConfigDto, UpdateMercadoPagoConfigDto } from './dto/mercadopago-config.dto';

@Controller('mercadopago-config')
export class MercadoPagoConfigController {
  constructor(private readonly configService: MercadoPagoConfigService) {}

  /**
   * GET /mercadopago-config/checkout-mode (público)
   * Retorna apenas o modo de checkout ativo - não requer autenticação
   */
  @Get('checkout-mode')
  async getCheckoutMode() {
    return this.configService.getCheckoutMode();
  }

  /**
   * GET /mercadopago-config (admin)
   * Busca configuração completa (somente admin)
   */
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async getConfig() {
    return this.configService.getConfig();
  }

  /**
   * POST /mercadopago-config (admin)
   * Cria nova configuração
   */
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  async createConfig(@Body() dto: CreateMercadoPagoConfigDto) {
    return this.configService.createConfig(dto);
  }

  /**
   * PUT /mercadopago-config (admin)
   * Atualiza configuração existente
   */
  @Put()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async updateConfig(@Body() dto: UpdateMercadoPagoConfigDto) {
    return this.configService.updateConfig(dto);
  }

  /**
   * POST /mercadopago-config/test (admin)
   * Testa conexão com Mercado Pago
   */
  @Post('test')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async testConnection() {
    return this.configService.testConnection();
  }
}