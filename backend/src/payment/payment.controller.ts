import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { CreatePreferenceDto } from './dto/create-preference.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  /**
   * POST /payment/create-preference
   * Cria uma preferência de pagamento no Mercado Pago
   */
  @Post('create-preference')
  @UseGuards(JwtAuthGuard)
  async createPreference(
    @Request() req: any,
    @Body() createPreferenceDto: CreatePreferenceDto,
  ) {
    return this.paymentService.createPreference(req.user.userId, createPreferenceDto);
  }

  /**
   * POST /payment/webhook
   * Recebe notificações do Mercado Pago (público, sem autenticação)
   */
  @Post('webhook')
  @HttpCode(HttpStatus.OK)
  async webhook(@Body() webhookData: any) {
    return this.paymentService.processWebhook(webhookData);
  }

  /**
   * GET /payment/order/:orderId
   * Busca pagamento de um pedido específico
   */
  @Get('order/:orderId')
  @UseGuards(JwtAuthGuard)
  async getPaymentByOrder(@Request() req: any, @Param('orderId') orderId: string) {
    return this.paymentService.getPaymentByOrderId(orderId, req.user.userId);
  }

  /**
   * GET /payment/all (Admin)
   * Lista todos os pagamentos
   */
  @Get('all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async getAllPayments() {
    return this.paymentService.getAllPayments();
  }
}