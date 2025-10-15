import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { CreateMercadoPagoConfigDto, UpdateMercadoPagoConfigDto } from './dto/mercadopago-config.dto';

@Injectable()
export class MercadoPagoConfigService {
  private readonly logger = new Logger(MercadoPagoConfigService.name);

  constructor(private prisma: PrismaService) {}

  /**
   * Busca apenas o modo de checkout (público)
   */
  async getCheckoutMode() {
    const config = await this.prisma.mercadoPagoConfig.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        checkoutMode: true,
      },
    });

    if (!config) {
      return { checkoutMode: 'INTERNAL' }; // Padrão: checkout interno
    }

    return { checkoutMode: config.checkoutMode };
  }

  /**
   * Busca configuração atual (retorna apenas 1 registro)
   */
  async getConfig() {
    const config = await this.prisma.mercadoPagoConfig.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!config) {
      return null;
    }

    // Mascarar access token (mostrar apenas primeiros e últimos 4 caracteres)
    return {
      ...config,
      accessToken: this.maskToken(config.accessToken),
      publicKey: this.maskToken(config.publicKey),
    };
  }

  /**
   * Cria nova configuração
   */
  async createConfig(dto: CreateMercadoPagoConfigDto) {
    // Validar credenciais apenas se o modo for MERCADOPAGO
    if (dto.checkoutMode === 'MERCADOPAGO') {
      if (!dto.accessToken || !dto.publicKey) {
        throw new BadRequestException('Public Key e Access Token são obrigatórios para Mercado Pago.');
      }

      try {
        await this.testMercadoPagoConnection(dto.accessToken);
      } catch (error) {
        throw new BadRequestException('Credenciais inválidas. Verifique o Access Token.');
      }
    }

    // Verificar se já existe configuração
    const existingConfig = await this.prisma.mercadoPagoConfig.findFirst();

    if (existingConfig) {
      throw new BadRequestException('Já existe uma configuração. Use PUT para atualizar.');
    }

    const config = await this.prisma.mercadoPagoConfig.create({
      data: dto,
    });

    this.logger.log(`Configuração de pagamento criada: ${dto.checkoutMode}`);

    return {
      ...config,
      accessToken: this.maskToken(config.accessToken),
      publicKey: this.maskToken(config.publicKey),
    };
  }

  /**
   * Atualiza configuração existente
   */
  async updateConfig(dto: UpdateMercadoPagoConfigDto) {
    const config = await this.prisma.mercadoPagoConfig.findFirst();

    if (!config) {
      throw new NotFoundException('Configuração não encontrada. Use POST para criar.');
    }

    // Determinar o modo final (novo ou existente)
    const finalMode = dto.checkoutMode || config.checkoutMode;

    // Validar credenciais apenas se o modo for MERCADOPAGO
    if (finalMode === 'MERCADOPAGO' && dto.accessToken) {
      try {
        await this.testMercadoPagoConnection(dto.accessToken);
      } catch (error) {
        throw new BadRequestException('Novo Access Token inválido.');
      }
    }

    const updatedConfig = await this.prisma.mercadoPagoConfig.update({
      where: { id: config.id },
      data: dto,
    });

    this.logger.log(`Configuração de pagamento atualizada: ${updatedConfig.checkoutMode}`);

    return {
      ...updatedConfig,
      accessToken: this.maskToken(updatedConfig.accessToken),
      publicKey: this.maskToken(updatedConfig.publicKey),
    };
  }

  /**
   * Testa conexão com Mercado Pago
   */
  async testConnection() {
    const config = await this.prisma.mercadoPagoConfig.findFirst();

    if (!config) {
      throw new NotFoundException('Configuração não encontrada');
    }

    try {
      await this.testMercadoPagoConnection(config.accessToken);
      return {
        success: true,
        message: 'Conexão com Mercado Pago funcionando corretamente',
        environment: config.isProduction ? 'Produção' : 'Sandbox',
      };
    } catch (error) {
      return {
        success: false,
        message: 'Erro ao conectar com Mercado Pago',
        error: error.message,
      };
    }
  }

  /**
   * Testa se o access token funciona fazendo uma requisição à API do MP
   */
  private async testMercadoPagoConnection(accessToken: string): Promise<void> {
    const client = new MercadoPagoConfig({ accessToken });
    const paymentClient = new Payment(client);

    // Fazer uma busca simples para validar credenciais
    await paymentClient.search({
      options: {
        criteria: 'desc',
        range: 'date_created',
        begin_date: 'NOW-1DAYS',
        end_date: 'NOW',
      },
    });
  }

  /**
   * Mascara token para exibição segura
   */
  private maskToken(token: string): string {
    if (!token || token.length < 8) return '****';
    return `${token.substring(0, 4)}****${token.substring(token.length - 4)}`;
  }

  /**
   * Busca configuração completa (uso interno, sem máscara)
   */
  async getConfigInternal() {
    return this.prisma.mercadoPagoConfig.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}