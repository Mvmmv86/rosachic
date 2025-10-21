import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface UpdateSiteConfigDto {
  aboutImage?: string;
  instagramImages?: string[];
  whatsappNumber?: string;
  instagramUrl?: string;
  facebookUrl?: string;
}

@Injectable()
export class SiteConfigService {
  constructor(private prisma: PrismaService) {}

  /**
   * Busca ou cria a configuração do site (sempre existe apenas 1 registro)
   */
  async getOrCreate() {
    let config = await this.prisma.siteConfig.findFirst();

    if (!config) {
      // Criar configuração inicial
      config = await this.prisma.siteConfig.create({
        data: {
          aboutImage: '',
          instagramImages: JSON.stringify([]),
          whatsappNumber: '',
          instagramUrl: '',
          facebookUrl: '',
        },
      });
    }

    return this.formatConfig(config);
  }

  /**
   * Atualiza a configuração do site
   */
  async update(data: UpdateSiteConfigDto) {
    const config = await this.getOrCreate();

    const updateData: any = {};

    if (data.aboutImage !== undefined) {
      updateData.aboutImage = data.aboutImage;
    }

    if (data.instagramImages !== undefined) {
      updateData.instagramImages = JSON.stringify(data.instagramImages);
    }

    if (data.whatsappNumber !== undefined) {
      updateData.whatsappNumber = data.whatsappNumber;
    }

    if (data.instagramUrl !== undefined) {
      updateData.instagramUrl = data.instagramUrl;
    }

    if (data.facebookUrl !== undefined) {
      updateData.facebookUrl = data.facebookUrl;
    }

    const updated = await this.prisma.siteConfig.update({
      where: { id: config.id },
      data: updateData,
    });

    return this.formatConfig(updated);
  }

  /**
   * Formata a config convertendo JSON strings para arrays
   */
  private formatConfig(config: any) {
    return {
      ...config,
      instagramImages:
        typeof config.instagramImages === 'string'
          ? JSON.parse(config.instagramImages || '[]')
          : config.instagramImages || [],
    };
  }
}
