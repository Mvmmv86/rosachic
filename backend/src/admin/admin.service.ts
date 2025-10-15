import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OrderStatus, PaymentStatus } from '@prisma/client';
import { SalesReportFilterDto } from './dto/sales-report-filter.dto';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  /**
   * Dashboard - Estatísticas Gerais
   */
  async getDashboardStats() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const thisMonth = new Date();
    thisMonth.setDate(1);
    thisMonth.setHours(0, 0, 0, 0);

    // Estatísticas em paralelo
    const [
      totalOrders,
      totalRevenue,
      todayOrders,
      todayRevenue,
      monthOrders,
      monthRevenue,
      pendingOrders,
      completedOrders,
      cancelledOrders,
      totalUsers,
      newUsersThisMonth,
      lowStockProducts,
      ordersByStatus,
    ] = await Promise.all([
      // Total de pedidos
      this.prisma.order.count(),

      // Receita total (apenas pedidos aprovados)
      this.prisma.order.aggregate({
        where: { paymentStatus: PaymentStatus.APPROVED },
        _sum: { total: true },
      }),

      // Pedidos de hoje
      this.prisma.order.count({
        where: {
          createdAt: { gte: today },
        },
      }),

      // Receita de hoje
      this.prisma.order.aggregate({
        where: {
          createdAt: { gte: today },
          paymentStatus: PaymentStatus.APPROVED,
        },
        _sum: { total: true },
      }),

      // Pedidos do mês
      this.prisma.order.count({
        where: {
          createdAt: { gte: thisMonth },
        },
      }),

      // Receita do mês
      this.prisma.order.aggregate({
        where: {
          createdAt: { gte: thisMonth },
          paymentStatus: PaymentStatus.APPROVED,
        },
        _sum: { total: true },
      }),

      // Pedidos pendentes
      this.prisma.order.count({
        where: {
          status: { in: [OrderStatus.PENDING, OrderStatus.CONFIRMED] },
        },
      }),

      // Pedidos entregues
      this.prisma.order.count({
        where: { status: OrderStatus.DELIVERED },
      }),

      // Pedidos cancelados
      this.prisma.order.count({
        where: { status: OrderStatus.CANCELLED },
      }),

      // Total de usuários
      this.prisma.user.count(),

      // Novos usuários este mês
      this.prisma.user.count({
        where: { createdAt: { gte: thisMonth } },
      }),

      // Produtos com estoque baixo (< 5)
      this.prisma.product.count({
        where: {
          ativo: true,
          estoque: { lt: 5 },
        },
      }),

      // Pedidos por status
      this.prisma.order.groupBy({
        by: ['status'],
        _count: { status: true },
      }),
    ]);

    return {
      sales: {
        total: {
          orders: totalOrders,
          revenue: totalRevenue._sum.total || 0,
        },
        today: {
          orders: todayOrders,
          revenue: todayRevenue._sum.total || 0,
        },
        thisMonth: {
          orders: monthOrders,
          revenue: monthRevenue._sum.total || 0,
        },
      },
      orders: {
        pending: pendingOrders,
        completed: completedOrders,
        cancelled: cancelledOrders,
        byStatus: ordersByStatus.map((item) => ({
          status: item.status,
          count: item._count.status,
        })),
      },
      users: {
        total: totalUsers,
        newThisMonth: newUsersThisMonth,
      },
      products: {
        lowStock: lowStockProducts,
      },
    };
  }

  /**
   * Relatório de Vendas Detalhado
   */
  async getSalesReport(filters: SalesReportFilterDto) {
    const { startDate, endDate, status } = filters;

    const whereCondition: any = {
      paymentStatus: PaymentStatus.APPROVED,
    };

    if (startDate && endDate) {
      whereCondition.createdAt = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    if (status) {
      whereCondition.status = status;
    }

    // Buscar pedidos
    const orders = await this.prisma.order.findMany({
      where: whereCondition,
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
            product: {
              select: {
                id: true,
                codigo: true,
                modelo: true,
              },
            },
          },
        },
        payment: {
          select: {
            status: true,
            paymentMethod: true,
            mercadoPagoFee: true,
            netAmount: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Calcular estatísticas
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const totalMercadoPagoFees = orders.reduce(
      (sum, order) => sum + (order.payment?.mercadoPagoFee || 0),
      0,
    );
    const netRevenue = orders.reduce(
      (sum, order) => sum + (order.payment?.netAmount || order.total),
      0,
    );

    // Vendas por dia
    const salesByDay = this.groupOrdersByDay(orders);

    // Vendas por método de pagamento
    const salesByPaymentMethod = this.groupOrdersByPaymentMethod(orders);

    return {
      summary: {
        totalOrders,
        totalRevenue,
        totalMercadoPagoFees,
        netRevenue,
        averageTicket: totalOrders > 0 ? totalRevenue / totalOrders : 0,
      },
      salesByDay,
      salesByPaymentMethod,
      orders: orders.map((order) => ({
        id: order.id,
        date: order.createdAt,
        customerName: order.user.name,
        customerEmail: order.user.email,
        status: order.status,
        paymentStatus: order.payment?.status,
        paymentMethod: order.paymentMethod,
        subtotal: order.subtotal,
        instalacao: order.instalacao,
        frete: order.frete,
        desconto: order.desconto,
        total: order.total,
        mercadoPagoFee: order.payment?.mercadoPagoFee || 0,
        netAmount: order.payment?.netAmount || order.total,
        itemsCount: order.items.length,
      })),
    };
  }

  /**
   * Produtos Mais Vendidos
   */
  async getTopSellingProducts(limit: number = 10) {
    const topProducts = await this.prisma.orderItem.groupBy({
      by: ['productId'],
      _sum: {
        quantity: true,
        subtotal: true,
      },
      _count: {
        productId: true,
      },
      orderBy: {
        _sum: {
          quantity: 'desc',
        },
      },
      take: limit,
    });

    // Buscar detalhes dos produtos
    const productIds = topProducts.map((item) => item.productId);
    const products = await this.prisma.product.findMany({
      where: {
        id: { in: productIds },
      },
      select: {
        id: true,
        codigo: true,
        modelo: true,
        material: true,
        luminosidade: true,
        valorM2: true,
        estoque: true,
        imagens: true,
      },
    });

    // Mapear produtos com estatísticas
    return topProducts.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return {
        product: {
          id: product?.id,
          codigo: product?.codigo,
          modelo: product?.modelo,
          material: product?.material,
          luminosidade: product?.luminosidade,
          valorM2: product?.valorM2,
          estoque: product?.estoque,
          imagem: product?.imagens ? JSON.parse(product.imagens)[0] : null,
        },
        stats: {
          totalQuantity: item._sum.quantity || 0,
          totalRevenue: item._sum.subtotal || 0,
          ordersCount: item._count.productId,
        },
      };
    });
  }

  /**
   * Relatório de Clientes
   */
  async getCustomersReport() {
    const customers = await this.prisma.user.findMany({
      where: {
        orders: {
          some: {},
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        createdAt: true,
        _count: {
          select: {
            orders: true,
          },
        },
        orders: {
          where: {
            paymentStatus: PaymentStatus.APPROVED,
          },
          select: {
            total: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return customers.map((customer) => ({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      memberSince: customer.createdAt,
      ordersCount: customer._count.orders,
      totalSpent: customer.orders.reduce((sum, order) => sum + order.total, 0),
      averageOrderValue:
        customer._count.orders > 0
          ? customer.orders.reduce((sum, order) => sum + order.total, 0) /
            customer._count.orders
          : 0,
    }));
  }

  /**
   * Produtos com Estoque Baixo
   */
  async getLowStockProducts(threshold: number = 5) {
    return this.prisma.product.findMany({
      where: {
        ativo: true,
        estoque: { lt: threshold },
      },
      select: {
        id: true,
        codigo: true,
        modelo: true,
        material: true,
        luminosidade: true,
        estoque: true,
        valorM2: true,
        imagens: true,
      },
      orderBy: {
        estoque: 'asc',
      },
    });
  }

  /**
   * Helpers
   */
  private groupOrdersByDay(orders: any[]) {
    const grouped = orders.reduce((acc, order) => {
      const date = order.createdAt.toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = {
          date,
          orders: 0,
          revenue: 0,
        };
      }
      acc[date].orders += 1;
      acc[date].revenue += order.total;
      return acc;
    }, {});

    return Object.values(grouped);
  }

  private groupOrdersByPaymentMethod(orders: any[]) {
    const grouped = orders.reduce((acc, order) => {
      const method = order.paymentMethod;
      if (!acc[method]) {
        acc[method] = {
          method,
          orders: 0,
          revenue: 0,
        };
      }
      acc[method].orders += 1;
      acc[method].revenue += order.total;
      return acc;
    }, {});

    return Object.values(grouped);
  }
}