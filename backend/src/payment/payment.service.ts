import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { PaymentMethod, PaymentStatus, OrderStatus } from '@prisma/client';
import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';
import { CreatePreferenceDto } from './dto/create-preference.dto';
import { PaymentNotificationDto } from './dto/payment-webhook.dto';

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);
  private mercadoPagoClient: MercadoPagoConfig;
  private preferenceClient: Preference;
  private paymentClient: Payment;

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {
    const accessToken = this.configService.get<string>('MERCADOPAGO_ACCESS_TOKEN');

    if (!accessToken) {
      this.logger.warn('MERCADOPAGO_ACCESS_TOKEN não configurado. Payment Module em modo simulado.');
    } else {
      this.mercadoPagoClient = new MercadoPagoConfig({
        accessToken,
        options: {
          timeout: 5000,
        },
      });
      this.preferenceClient = new Preference(this.mercadoPagoClient);
      this.paymentClient = new Payment(this.mercadoPagoClient);
    }
  }

  /**
   * Cria uma preferência de pagamento no Mercado Pago
   */
  async createPreference(userId: string, createPreferenceDto: CreatePreferenceDto) {
    const { orderId, paymentMethod } = createPreferenceDto;

    // 1. Validar que o pedido existe e pertence ao usuário
    const order = await this.prisma.order.findFirst({
      where: {
        id: orderId,
        userId,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        shipping: true,
        payment: true,
      },
    });

    if (!order) {
      throw new NotFoundException('Pedido não encontrado');
    }

    // 2. Validar que o pedido ainda não foi pago
    if (order.payment && order.payment.status === PaymentStatus.APPROVED) {
      throw new BadRequestException('Este pedido já foi pago');
    }

    // 3. Verificar se já existe um payment record
    let payment = order.payment;

    if (!payment) {
      // Criar novo registro de pagamento
      payment = await this.prisma.payment.create({
        data: {
          orderId: order.id,
          amount: order.total,
          paymentMethod,
          status: PaymentStatus.PENDING,
          externalReference: order.id,
          description: `Pedido Rosa Chic #${order.id.slice(0, 8)}`,
        },
      });
    }

    // 4. Criar preferência no Mercado Pago (se configurado)
    if (!this.preferenceClient) {
      this.logger.warn('Mercado Pago não configurado. Retornando payment simulado.');
      return {
        paymentId: payment.id,
        preferenceId: null,
        initPoint: null,
        sandboxInitPoint: null,
        qrCode: null,
        qrCodeBase64: null,
        status: payment.status,
        message: 'Mercado Pago não configurado. Use modo de teste.',
      };
    }

    try {
      const items = order.items.map((item) => ({
        id: item.productId,
        title: `${item.product.modelo} - ${item.widthCm}x${item.heightCm}cm`,
        description: item.product.descricao.slice(0, 100),
        quantity: item.quantity,
        unit_price: item.pricePerM2 * item.areaCobravel,
        currency_id: 'BRL',
      }));

      // Adicionar frete e instalação como itens separados
      if (order.frete > 0) {
        items.push({
          id: 'frete',
          title: 'Frete',
          description: 'Entrega',
          quantity: 1,
          unit_price: order.frete,
          currency_id: 'BRL',
        });
      }

      if (order.instalacao > 0) {
        items.push({
          id: 'instalacao',
          title: 'Instalação',
          description: 'Serviço de instalação',
          quantity: 1,
          unit_price: order.instalacao,
          currency_id: 'BRL',
        });
      }

      const preferenceData: any = {
        items,
        external_reference: order.id,
        back_urls: {
          success: `${this.configService.get('FRONTEND_URL')}/checkout/sucesso?orderId=${order.id}`,
          failure: `${this.configService.get('FRONTEND_URL')}/checkout/pagamento?orderId=${order.id}&status=failure`,
          pending: `${this.configService.get('FRONTEND_URL')}/checkout/pagamento?orderId=${order.id}&status=pending`,
        },
        auto_return: 'approved',
        notification_url: `${this.configService.get('BACKEND_URL')}/payment/webhook`,
        statement_descriptor: 'ROSA CHIC',
        expires: true,
        expiration_date_from: new Date().toISOString(),
        expiration_date_to: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24h
      };

      // Configurar método de pagamento específico
      if (paymentMethod === PaymentMethod.PIX) {
        preferenceData.payment_methods = {
          excluded_payment_types: [
            { id: 'credit_card' },
            { id: 'debit_card' },
            { id: 'ticket' },
          ],
        };
      } else if (paymentMethod === PaymentMethod.CREDIT_CARD) {
        preferenceData.payment_methods = {
          excluded_payment_types: [
            { id: 'ticket' },
          ],
          excluded_payment_methods: [
            { id: 'pix' },
          ],
        };
      } else if (paymentMethod === PaymentMethod.BOLETO) {
        preferenceData.payment_methods = {
          excluded_payment_types: [
            { id: 'credit_card' },
            { id: 'debit_card' },
          ],
          excluded_payment_methods: [
            { id: 'pix' },
          ],
        };
      }

      const preference = await this.preferenceClient.create({ body: preferenceData });

      // 5. Atualizar payment record com dados da preferência
      payment = await this.prisma.payment.update({
        where: { id: payment.id },
        data: {
          preferenceId: preference.id,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
      });

      this.logger.log(`Preferência criada: ${preference.id} para pedido ${order.id}`);

      return {
        paymentId: payment.id,
        preferenceId: preference.id,
        initPoint: preference.init_point,
        sandboxInitPoint: preference.sandbox_init_point,
        status: payment.status,
      };
    } catch (error) {
      this.logger.error('Erro ao criar preferência no Mercado Pago', error);
      throw new InternalServerErrorException('Erro ao criar preferência de pagamento');
    }
  }

  /**
   * Processa notificação webhook do Mercado Pago
   */
  async processWebhook(notificationData: any) {
    this.logger.log('Webhook recebido:', JSON.stringify(notificationData));

    // Mercado Pago envia diferentes tipos de notificações
    if (notificationData.type !== 'payment') {
      this.logger.log(`Tipo de notificação ignorado: ${notificationData.type}`);
      return { message: 'Notificação ignorada' };
    }

    const paymentId = notificationData.data?.id;
    if (!paymentId) {
      throw new BadRequestException('ID de pagamento não encontrado na notificação');
    }

    try {
      // Buscar dados completos do pagamento no Mercado Pago
      const paymentInfo = await this.paymentClient.get({ id: paymentId });

      return await this.updatePaymentFromNotification(paymentInfo as any);
    } catch (error) {
      this.logger.error('Erro ao processar webhook', error);
      throw new InternalServerErrorException('Erro ao processar notificação de pagamento');
    }
  }

  /**
   * Atualiza payment e order baseado em notificação do Mercado Pago
   */
  private async updatePaymentFromNotification(paymentInfo: PaymentNotificationDto) {
    const externalReference = paymentInfo.external_reference;

    if (!externalReference) {
      throw new BadRequestException('External reference não encontrada');
    }

    // Buscar payment pelo orderId
    const payment = await this.prisma.payment.findFirst({
      where: {
        orderId: externalReference,
      },
      include: {
        order: true,
      },
    });

    if (!payment) {
      throw new NotFoundException('Payment não encontrado para este pedido');
    }

    // Mapear status do Mercado Pago para nosso enum
    let paymentStatus: PaymentStatus;
    let orderStatus: OrderStatus;

    switch (paymentInfo.status) {
      case 'approved':
        paymentStatus = PaymentStatus.APPROVED;
        orderStatus = OrderStatus.CONFIRMED;
        break;
      case 'rejected':
      case 'cancelled':
        paymentStatus = PaymentStatus.REJECTED;
        orderStatus = OrderStatus.CANCELLED;
        break;
      case 'refunded':
        paymentStatus = PaymentStatus.REFUNDED;
        orderStatus = OrderStatus.CANCELLED;
        break;
      default:
        paymentStatus = PaymentStatus.PENDING;
        orderStatus = OrderStatus.PENDING;
    }

    // Calcular taxa do Mercado Pago
    const mercadoPagoFee = paymentInfo.fee_details?.reduce(
      (total, fee) => total + fee.amount,
      0,
    ) || 0;

    // Atualizar payment e order em transação
    await this.prisma.$transaction(async (prisma) => {
      // Atualizar payment
      await prisma.payment.update({
        where: { id: payment.id },
        data: {
          mercadoPagoId: paymentInfo.id,
          status: paymentStatus,
          paymentMethodId: paymentInfo.payment_method_id,
          transactionAmount: paymentInfo.transaction_amount,
          netAmount: paymentInfo.net_received_amount,
          mercadoPagoFee,
          payerEmail: paymentInfo.payer?.email,
          payerDocument: paymentInfo.payer?.identification?.number,
          payerName: `${paymentInfo.payer?.first_name || ''} ${paymentInfo.payer?.last_name || ''}`.trim(),
          approvedAt: paymentInfo.date_approved ? new Date(paymentInfo.date_approved) : null,
          pixQrCode: paymentInfo.point_of_interaction?.transaction_data?.qr_code,
          pixQrCodeBase64: paymentInfo.point_of_interaction?.transaction_data?.qr_code_base64,
          boletoUrl: paymentInfo.point_of_interaction?.transaction_data?.ticket_url,
          webhookNotifications: JSON.stringify([
            ...(payment.webhookNotifications ? JSON.parse(payment.webhookNotifications) : []),
            {
              date: new Date().toISOString(),
              status: paymentInfo.status,
              paymentId: paymentInfo.id,
            },
          ]),
        },
      });

      // Atualizar order
      await prisma.order.update({
        where: { id: payment.orderId },
        data: {
          paymentStatus,
          status: orderStatus,
        },
      });
    });

    this.logger.log(`Payment ${payment.id} atualizado para status: ${paymentStatus}`);

    return {
      paymentId: payment.id,
      status: paymentStatus,
      orderStatus,
    };
  }

  /**
   * Busca detalhes de um pagamento
   */
  async getPaymentByOrderId(orderId: string, userId: string) {
    const payment = await this.prisma.payment.findFirst({
      where: {
        orderId,
        order: {
          userId,
        },
      },
      include: {
        order: {
          select: {
            id: true,
            status: true,
            paymentStatus: true,
            total: true,
            createdAt: true,
          },
        },
      },
    });

    if (!payment) {
      throw new NotFoundException('Pagamento não encontrado');
    }

    return payment;
  }

  /**
   * Lista todos os pagamentos (admin)
   */
  async getAllPayments() {
    return this.prisma.payment.findMany({
      include: {
        order: {
          select: {
            id: true,
            userId: true,
            status: true,
            total: true,
            createdAt: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}