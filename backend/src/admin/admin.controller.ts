import {
  Controller,
  Get,
  Query,
  UseGuards,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { SalesReportFilterDto } from './dto/sales-report-filter.dto';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  /**
   * GET /admin/dashboard
   * Dashboard principal com estatísticas gerais
   */
  @Get('dashboard')
  async getDashboard() {
    return this.adminService.getDashboardStats();
  }

  /**
   * GET /admin/reports/sales
   * Relatório detalhado de vendas com filtros
   * Query params: startDate, endDate, status
   */
  @Get('reports/sales')
  async getSalesReport(@Query() filters: SalesReportFilterDto) {
    return this.adminService.getSalesReport(filters);
  }

  /**
   * GET /admin/reports/top-products
   * Produtos mais vendidos
   * Query param: limit (default: 10)
   */
  @Get('reports/top-products')
  async getTopProducts(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.adminService.getTopSellingProducts(limit);
  }

  /**
   * GET /admin/reports/customers
   * Relatório de clientes
   */
  @Get('reports/customers')
  async getCustomersReport() {
    return this.adminService.getCustomersReport();
  }

  /**
   * GET /admin/inventory/low-stock
   * Produtos com estoque baixo
   * Query param: threshold (default: 5)
   */
  @Get('inventory/low-stock')
  async getLowStockProducts(
    @Query('threshold', new DefaultValuePipe(5), ParseIntPipe)
    threshold: number,
  ) {
    return this.adminService.getLowStockProducts(threshold);
  }
}