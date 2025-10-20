import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common'
import { ProductsService } from './products.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // Criar produto (apenas admin - protegido)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body(ValidationPipe) createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto)
  }

  // Listar todos os produtos (público)
  @Get()
  findAll(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('ativo') ativo?: string,
    @Query('material') material?: string,
    @Query('luminosidade') luminosidade?: string,
    @Query('orderBy') orderBy?: string,
    @Query('isLancamento') isLancamento?: string,
    @Query('isMaisVendido') isMaisVendido?: string,
  ) {
    const where: any = {}

    if (ativo !== undefined) {
      where.ativo = ativo === 'true'
    }

    if (material) {
      where.material = material
    }

    if (luminosidade) {
      where.luminosidade = luminosidade
    }

    if (isLancamento !== undefined) {
      where.isLancamento = isLancamento === 'true'
    }

    if (isMaisVendido !== undefined) {
      where.isMaisVendido = isMaisVendido === 'true'
    }

    const orderByObj: any = {}
    if (orderBy === 'price-asc') {
      orderByObj.valorM2 = 'asc'
    } else if (orderBy === 'price-desc') {
      orderByObj.valorM2 = 'desc'
    } else if (orderBy === 'name') {
      orderByObj.modelo = 'asc'
    } else {
      orderByObj.createdAt = 'desc'
    }

    return this.productsService.findAll({
      skip: skip ? parseInt(skip) : undefined,
      take: take ? parseInt(take) : undefined,
      where,
      orderBy: orderByObj,
    })
  }

  // Buscar produtos ativos (público)
  @Get('active')
  findActive() {
    return this.productsService.findActive()
  }

  // Buscar lançamentos (público)
  @Get('lancamentos')
  findLancamentos() {
    return this.productsService.findLancamentos()
  }

  // Buscar mais vendidos (público)
  @Get('mais-vendidos')
  findMaisVendidos() {
    return this.productsService.findMaisVendidos()
  }

  // Buscar por dimensões (público)
  @Get('by-dimensions')
  findByDimensions(
    @Query('width') width: string,
    @Query('height') height: string,
  ) {
    return this.productsService.findByDimensions(
      parseInt(width),
      parseInt(height),
    )
  }

  // Buscar por material (público)
  @Get('by-material/:material')
  findByMaterial(@Param('material') material: string) {
    return this.productsService.findByMaterial(material)
  }

  // Buscar por luminosidade (público)
  @Get('by-luminosidade/:luminosidade')
  findByLuminosidade(@Param('luminosidade') luminosidade: string) {
    return this.productsService.findByLuminosidade(luminosidade)
  }

  // Buscar produto por código (público)
  @Get('codigo/:codigo')
  findByCodigo(@Param('codigo') codigo: string) {
    return this.productsService.findByCodigo(codigo)
  }

  // Buscar produto por ID (público)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id)
  }

  // Atualizar produto (apenas admin - protegido)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto)
  }

  // Deletar produto (apenas admin - protegido)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id)
  }
}