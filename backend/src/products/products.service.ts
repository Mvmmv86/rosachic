import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { Prisma } from '@prisma/client'

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateProductDto) {
    try {
      // Para SQLite, converter arrays para JSON string
      const product = await this.prisma.product.create({
        data: {
          ...data,
          ambientes: JSON.stringify(data.ambientes),
          imagens: JSON.stringify(data.imagens),
          areaMinM2: data.areaMinM2 ?? 1.0,
          estoque: data.estoque ?? 0,
          ativo: data.ativo ?? true,
        },
      })

      return this.formatProduct(product)
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('Código de produto já existe')
        }
      }
      throw error
    }
  }

  async findAll(params?: {
    skip?: number
    take?: number
    where?: Prisma.ProductWhereInput
    orderBy?: Prisma.ProductOrderByWithRelationInput
  }) {
    const { skip, take, where, orderBy } = params || {}

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        skip,
        take,
        where,
        orderBy: orderBy || { createdAt: 'desc' },
      }),
      this.prisma.product.count({ where }),
    ])

    return {
      data: products.map(p => this.formatProduct(p)),
      total,
      skip: skip || 0,
      take: take || products.length,
    }
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    })

    if (!product) {
      throw new NotFoundException('Produto não encontrado')
    }

    return this.formatProduct(product)
  }

  async findByCodigo(codigo: string) {
    const product = await this.prisma.product.findUnique({
      where: { codigo },
    })

    if (!product) {
      throw new NotFoundException('Produto não encontrado')
    }

    return this.formatProduct(product)
  }

  async update(id: string, data: UpdateProductDto) {
    try {
      const updateData: any = { ...data }

      // Converter arrays para JSON string se fornecidos
      if (data.ambientes) {
        updateData.ambientes = JSON.stringify(data.ambientes)
      }
      if (data.imagens) {
        updateData.imagens = JSON.stringify(data.imagens)
      }

      const product = await this.prisma.product.update({
        where: { id },
        data: updateData,
      })

      return this.formatProduct(product)
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('Código de produto já existe')
        }
        if (error.code === 'P2025') {
          throw new NotFoundException('Produto não encontrado')
        }
      }
      throw error
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.product.delete({
        where: { id },
      })

      return { message: 'Produto removido com sucesso' }
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Produto não encontrado')
        }
      }
      throw error
    }
  }

  // Buscar produtos ativos
  async findActive() {
    const products = await this.prisma.product.findMany({
      where: { ativo: true },
      orderBy: { modelo: 'asc' },
    })

    return products.map(p => this.formatProduct(p))
  }

  // Buscar por material
  async findByMaterial(material: string) {
    const products = await this.prisma.product.findMany({
      where: {
        material: material as any,
        ativo: true,
      },
      orderBy: { valorM2: 'asc' },
    })

    return products.map(p => this.formatProduct(p))
  }

  // Buscar por luminosidade
  async findByLuminosidade(luminosidade: string) {
    const products = await this.prisma.product.findMany({
      where: {
        luminosidade: luminosidade as any,
        ativo: true,
      },
      orderBy: { valorM2: 'asc' },
    })

    return products.map(p => this.formatProduct(p))
  }

  // Buscar produtos que cabem nas dimensões especificadas
  async findByDimensions(widthCm: number, heightCm: number) {
    const products = await this.prisma.product.findMany({
      where: {
        larguraMaxCm: { gte: widthCm },
        alturaMaxCm: { gte: heightCm },
        ativo: true,
      },
      orderBy: { valorM2: 'asc' },
    })

    return products.map(p => this.formatProduct(p))
  }

  // Helper para formatar produto (converter JSON strings de volta para arrays)
  private formatProduct(product: any) {
    return {
      ...product,
      ambientes: typeof product.ambientes === 'string'
        ? JSON.parse(product.ambientes)
        : product.ambientes,
      imagens: typeof product.imagens === 'string'
        ? JSON.parse(product.imagens)
        : product.imagens,
    }
  }
}