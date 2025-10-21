import { Module } from '@nestjs/common';
import { SiteConfigController } from './site-config.controller';
import { SiteConfigService } from './site-config.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SiteConfigController],
  providers: [SiteConfigService],
  exports: [SiteConfigService],
})
export class SiteConfigModule {}
