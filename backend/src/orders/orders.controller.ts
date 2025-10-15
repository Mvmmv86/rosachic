import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { OrderStatus, Role } from '@prisma/client';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // Criar pedido a partir do carrinho
  @Post()
  async createOrder(@Request() req: any, @Body() createOrderDto: CreateOrderDto) {
    try {
      console.log('📦 Creating order for user:', req.user.id);
      console.log('📦 Order data received:', JSON.stringify(createOrderDto, null, 2));
      const order = await this.ordersService.createFromCart(req.user.id, createOrderDto);
      console.log('✅ Order created successfully:', order.id);
      return order;
    } catch (error) {
      console.error('❌ Error creating order:', error);
      throw error;
    }
  }

  // Listar pedidos do usuário logado
  @Get('my-orders')
  async getMyOrders(@Request() req: any, @Query('status') status?: OrderStatus) {
    return this.ordersService.findByUser(req.user.id, status);
  }

  // Buscar detalhes de um pedido específico
  @Get(':id')
  async getOrderById(@Request() req: any, @Param('id') orderId: string) {
    const order = await this.ordersService.findById(orderId);

    // Verificar se o pedido pertence ao usuário (ou se é admin)
    if (
      order.userId !== req.user.id &&
      req.user.role !== Role.ADMIN
    ) {
      throw new Error('Não autorizado');
    }

    return order;
  }

  // Cancelar pedido (usuário pode cancelar seu próprio pedido)
  @Patch(':id/cancel')
  async cancelOrder(@Request() req: any, @Param('id') orderId: string) {
    return this.ordersService.cancelOrder(orderId, req.user.id);
  }

  // ========== ROTAS ADMIN ==========

  // Listar todos os pedidos (apenas admin)
  @Get()
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  async getAllOrders(
    @Query('status') status?: OrderStatus,
    @Query('search') search?: string,
    @Query('skip') skip?: string,
    @Query('take') take?: string,
  ) {
    return this.ordersService.findAll({
      status,
      search,
      skip: skip ? parseInt(skip) : undefined,
      take: take ? parseInt(take) : undefined,
    })
  }

  // Atualizar status do pedido (apenas admin)
  @Patch(':id/status')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  async updateOrderStatus(
    @Param('id') orderId: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    return this.ordersService.updateStatus(orderId, updateOrderStatusDto)
  }

  // Cancelar pedido (admin pode cancelar qualquer pedido)
  @Patch(':id/admin-cancel')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  async adminCancelOrder(@Param('id') orderId: string) {
    return this.ordersService.cancelOrder(orderId)
  }
}