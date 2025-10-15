import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderStatusDto } from './dto/update-order-status.dto'
import { OrderStatus } from '@prisma/client'

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  // Criar pedido a partir do carrinho
  async createFromCart(userId: string, createOrderDto: CreateOrderDto) {
    const { shippingAddress, paymentMethod, frete, instalacao, couponCode } =
      createOrderDto

    // Buscar carrinho do usuário
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    })

    if (!cart || cart.items.length === 0) {
      throw new BadRequestException('Carrinho vazio')
    }

    // Validar estoque de todos os produtos
    for (const item of cart.items) {
      if (item.product.estoque < item.quantity) {
        throw new BadRequestException(
          `Produto ${item.product.modelo} sem estoque suficiente. Disponível: ${item.product.estoque}`,
        )
      }
    }

    // Calcular subtotal
    const subtotal = cart.items.reduce((sum, item) => sum + item.subtotal, 0)

    // Valores padrão se não fornecidos
    const freteValue = frete || 0
    const instalacaoValue = instalacao || 0
    const desconto = 0 // TODO: implementar lógica de cupom

    // Calcular total
    const total = subtotal + freteValue + instalacaoValue - desconto

    // Criar pedido em uma transação
    const order = await this.prisma.$transaction(async (prisma) => {
      // 1. Criar o pedido
      const newOrder = await prisma.order.create({
        data: {
          userId,
          status: OrderStatus.PENDING,
          subtotal,
          instalacao: instalacaoValue,
          frete: freteValue,
          desconto,
          total,
          paymentMethod,
          shipping: {
            create: {
              recipientName: shippingAddress.recipientName,
              street: shippingAddress.street,
              number: shippingAddress.number,
              complement: shippingAddress.complement,
              neighborhood: shippingAddress.neighborhood,
              city: shippingAddress.city,
              state: shippingAddress.state,
              zipCode: shippingAddress.zipCode,
            },
          },
        },
      })

      // 2. Criar os itens do pedido e atualizar estoque
      for (const cartItem of cart.items) {
        await prisma.orderItem.create({
          data: {
            orderId: newOrder.id,
            productId: cartItem.productId,
            widthCm: cartItem.widthCm,
            heightCm: cartItem.heightCm,
            areaCobravel: cartItem.areaCobravel,
            pricePerM2: cartItem.pricePerM2,
            quantity: cartItem.quantity,
            subtotal: cartItem.subtotal,
          },
        })

        // Atualizar estoque do produto
        await prisma.product.update({
          where: { id: cartItem.productId },
          data: {
            estoque: {
              decrement: cartItem.quantity,
            },
          },
        })
      }

      // 3. Limpar carrinho
      await prisma.cartItem.deleteMany({
        where: { cartId: cart.id },
      })

      return newOrder
    })

    // Retornar pedido completo
    return this.findById(order.id)
  }

  // Buscar pedido por ID
  async findById(orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        items: {
          include: {
            product: true,
          },
        },
        shipping: true,
      },
    })

    if (!order) {
      throw new NotFoundException('Pedido não encontrado')
    }

    return order
  }

  // Listar pedidos do usuário
  async findByUser(userId: string, status?: OrderStatus) {
    const where: any = { userId }

    if (status) {
      where.status = status
    }

    const orders = await this.prisma.order.findMany({
      where,
      include: {
        items: {
          include: {
            product: true,
          },
        },
        shipping: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return orders
  }

  // Listar todos os pedidos (admin) com filtros
  async findAll(filters?: {
    status?: OrderStatus
    search?: string
    skip?: number
    take?: number
  }) {
    const { status, search, skip = 0, take = 10 } = filters || {}

    const where: any = {}

    if (status) {
      where.status = status
    }

    if (search) {
      where.OR = [
        { id: { contains: search } },
        { user: { name: { contains: search } } },
        { user: { email: { contains: search } } },
      ]
    }

    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        skip,
        take,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
            },
          },
          items: {
            include: {
              product: true,
            },
          },
          shipping: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.order.count({ where }),
    ])

    return {
      data: orders,
      total,
      page: Math.floor(skip / take) + 1,
      totalPages: Math.ceil(total / take),
    }
  }

  // Atualizar status do pedido
  async updateStatus(
    orderId: string,
    updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    const { status, trackingCode } = updateOrderStatusDto

    // Verificar se o pedido existe
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    })

    if (!order) {
      throw new NotFoundException('Pedido não encontrado')
    }

    // Preparar dados de atualização
    const updateData: any = { status }

    // Se o pedido for confirmado e o pagamento ainda estiver pendente, aprovar automaticamente
    if (status === OrderStatus.CONFIRMED && order.paymentStatus === 'PENDING') {
      updateData.paymentStatus = 'APPROVED'
      console.log(`✅ Auto-aprovando pagamento do pedido ${orderId}`)
    }

    // Atualizar pedido
    const updatedOrder = await this.prisma.order.update({
      where: { id: orderId },
      data: updateData,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        items: {
          include: {
            product: true,
          },
        },
        shipping: true,
      },
    })

    // Se status for SHIPPED e tiver código de rastreamento, atualizar shipping
    if (status === OrderStatus.SHIPPED && trackingCode) {
      await this.prisma.shipping.update({
        where: { orderId },
        data: { trackingCode },
      })
    }

    return updatedOrder
  }

  // Cancelar pedido
  async cancelOrder(orderId: string, userId?: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: true,
      },
    })

    if (!order) {
      throw new NotFoundException('Pedido não encontrado')
    }

    // Se userId for fornecido, verificar se o pedido pertence ao usuário
    if (userId && order.userId !== userId) {
      throw new BadRequestException('Pedido não pertence ao usuário')
    }

    // Não permitir cancelamento de pedidos já enviados
    if (
      order.status === OrderStatus.SHIPPED ||
      order.status === OrderStatus.DELIVERED
    ) {
      throw new BadRequestException(
        'Não é possível cancelar pedidos já enviados ou entregues',
      )
    }

    // Cancelar pedido e devolver estoque em transação
    await this.prisma.$transaction(async (prisma) => {
      // Atualizar status do pedido
      await prisma.order.update({
        where: { id: orderId },
        data: { status: OrderStatus.CANCELLED },
      })

      // Devolver estoque dos produtos
      for (const item of order.items) {
        await prisma.product.update({
          where: { id: item.productId },
          data: {
            estoque: {
              increment: item.quantity,
            },
          },
        })
      }
    })

    return {
      message: 'Pedido cancelado com sucesso',
    }
  }
}