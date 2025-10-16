import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async getCart(@Request() req: any) {
    return this.cartService.getCart(req.user.id);
  }

  @Post('items')
  async addItem(@Request() req: any, @Body() addToCartDto: AddToCartDto) {
    console.log('🛒 Adicionando item ao carrinho:', JSON.stringify(addToCartDto, null, 2));
    console.log('👤 UserId:', req.user.id);
    return this.cartService.addItem(req.user.id, addToCartDto);
  }

  @Put('items/:itemId')
  async updateItem(
    @Request() req: any,
    @Param('itemId') itemId: string,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ) {
    return this.cartService.updateItem(
      req.user.id,
      itemId,
      updateCartItemDto,
    );
  }

  @Delete('items/:itemId')
  async removeItem(@Request() req: any, @Param('itemId') itemId: string) {
    return this.cartService.removeItem(req.user.id, itemId);
  }

  @Delete()
  async clearCart(@Request() req: any) {
    return this.cartService.clearCart(req.user.id);
  }
}