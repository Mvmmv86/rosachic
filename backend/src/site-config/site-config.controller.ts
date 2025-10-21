import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common';
import { SiteConfigService } from './site-config.service';
import type { UpdateSiteConfigDto } from './site-config.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('site-config')
export class SiteConfigController {
  constructor(private readonly siteConfigService: SiteConfigService) {}

  // Buscar configurações (público)
  @Get()
  async getConfig() {
    return this.siteConfigService.getOrCreate();
  }

  // Atualizar configurações (apenas admin)
  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateConfig(@Body() updateDto: UpdateSiteConfigDto) {
    return this.siteConfigService.update(updateDto);
  }
}
