import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { AddToCartDto } from './dto/add-to-cart.dto'
import { UpdateCartItemDto } from './dto/update-cart-item.dto'

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  // Buscar ou criar carrinho do usuário
  async getOrCreateCart(userId: string) {
    let cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    })

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: { userId },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      })
    }

    return cart
  }

  // Adicionar item ao carrinho
  async addItem(userId: string, addToCartDto: AddToCartDto) {
    const { productId, widthCm, heightCm, quantity } = addToCartDto

    // Verificar se o produto existe
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    })

    if (!product) {
      throw new NotFoundException('Produto não encontrado')
    }

    if (!product.ativo) {
      throw new BadRequestException('Produto não está disponível')
    }

    // Validar dimensões
    if (widthCm > product.larguraMaxCm) {
      throw new BadRequestException(
        `Largura máxima permitida: ${product.larguraMaxCm}cm`,
      )
    }

    if (heightCm > product.alturaMaxCm) {
      throw new BadRequestException(
        `Altura máxima permitida: ${product.alturaMaxCm}cm`,
      )
    }

    // Calcular área cobrável (mesma lógica do PricingService)
    const areaCobravel = this.calculateAreaCobravel(widthCm, heightCm)

    // Validar área mínima
    if (areaCobravel < product.areaMinM2) {
      throw new BadRequestException(
        `Área mínima requerida: ${product.areaMinM2}m²`,
      )
    }

    // Validar estoque
    if (product.estoque < quantity) {
      throw new BadRequestException(
        `Estoque insuficiente. Disponível: ${product.estoque}`,
      )
    }

    // Calcular preço
    const pricePerM2 = product.valorM2
    const subtotal = areaCobravel * pricePerM2 * quantity

    // Buscar ou criar carrinho
    const cart = await this.getOrCreateCart(userId)

    // Verificar se já existe item com mesmo produto e dimensões
    const existingItem = cart.items.find(
      (item) =>
        item.productId === productId &&
        item.widthCm === widthCm &&
        item.heightCm === heightCm,
    )

    if (existingItem) {
      // Atualizar quantidade
      const newQuantity = existingItem.quantity + quantity

      // Verificar estoque novamente
      if (product.estoque < newQuantity) {
        throw new BadRequestException(
          `Estoque insuficiente. Disponível: ${product.estoque}`,
        )
      }

      const updatedItem = await this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: newQuantity,
          subtotal: areaCobravel * pricePerM2 * newQuantity,
        },
        include: {
          product: true,
        },
      })

      return {
        message: 'Quantidade atualizada no carrinho',
        item: updatedItem,
      }
    }

    // Criar novo item no carrinho
    const cartItem = await this.prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        widthCm,
        heightCm,
        areaCobravel,
        pricePerM2,
        quantity,
        subtotal,
      },
      include: {
        product: true,
      },
    })

    return {
      message: 'Item adicionado ao carrinho',
      item: cartItem,
    }
  }

  // Listar itens do carrinho
  async getCart(userId: string) {
    const cart = await this.getOrCreateCart(userId)

    const subtotal = cart.items.reduce((sum, item) => sum + item.subtotal, 0)
    const itemsCount = cart.items.reduce((sum, item) => sum + item.quantity, 0)

    return {
      cart,
      summary: {
        itemsCount,
        subtotal,
      },
    }
  }

  // Atualizar quantidade de um item
  async updateItem(
    userId: string,
    itemId: string,
    updateCartItemDto: UpdateCartItemDto,
  ) {
    const { quantity } = updateCartItemDto

    const cart = await this.getOrCreateCart(userId)

    const cartItem = cart.items.find((item) => item.id === itemId)

    if (!cartItem) {
      throw new NotFoundException('Item não encontrado no carrinho')
    }

    // Verificar estoque
    const product = await this.prisma.product.findUnique({
      where: { id: cartItem.productId },
    })

    if (!product) {
      throw new NotFoundException('Produto não encontrado')
    }

    if (product.estoque < quantity) {
      throw new BadRequestException(
        `Estoque insuficiente. Disponível: ${product.estoque}`,
      )
    }

    // Recalcular subtotal
    const subtotal = cartItem.areaCobravel * cartItem.pricePerM2 * quantity

    const updatedItem = await this.prisma.cartItem.update({
      where: { id: itemId },
      data: {
        quantity,
        subtotal,
      },
      include: {
        product: true,
      },
    })

    return {
      message: 'Quantidade atualizada',
      item: updatedItem,
    }
  }

  // Remover item do carrinho
  async removeItem(userId: string, itemId: string) {
    const cart = await this.getOrCreateCart(userId)

    const cartItem = cart.items.find((item) => item.id === itemId)

    if (!cartItem) {
      throw new NotFoundException('Item não encontrado no carrinho')
    }

    await this.prisma.cartItem.delete({
      where: { id: itemId },
    })

    return {
      message: 'Item removido do carrinho',
    }
  }

  // Limpar carrinho
  async clearCart(userId: string) {
    const cart = await this.getOrCreateCart(userId)

    await this.prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    })

    return {
      message: 'Carrinho limpo',
    }
  }

  // Função auxiliar para calcular área cobrável
  private calculateAreaCobravel(widthCm: number, heightCm: number): number {
    const widthM = widthCm / 100
    const heightM = heightCm / 100
    let area = widthM * heightM

    // Arredondar para cima com incrementos de 0.25m²
    area = Math.ceil(area / 0.25) * 0.25

    return area
  }
}