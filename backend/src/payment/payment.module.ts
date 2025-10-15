import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { MercadoPagoConfigService } from './mercadopago-config.service';
import { MercadoPagoConfigController } from './mercadopago-config.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PaymentController, MercadoPagoConfigController],
  providers: [PaymentService, MercadoPagoConfigService],
  exports: [PaymentService, MercadoPagoConfigService],
})
export class PaymentModule {}