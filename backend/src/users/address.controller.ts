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
} from '@nestjs/common'
import { AddressService } from './address.service'
import { CreateAddressDto } from './dto/create-address.dto'
import { UpdateAddressDto } from './dto/update-address.dto'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

@Controller('users/me/addresses')
@UseGuards(JwtAuthGuard)
export class AddressController {
  constructor(private addressService: AddressService) {}

  @Get()
  async findAll(@Request() req: any) {
    return this.addressService.findAllByUserId(req.user.id)
  }

  @Get(':id')
  async findOne(@Request() req: any, @Param('id') id: string) {
    return this.addressService.findById(id, req.user.id)
  }

  @Post()
  async create(@Request() req: any, @Body() data: CreateAddressDto) {
    return this.addressService.create(req.user.id, data)
  }

  @Put(':id')
  async update(
    @Request() req: any,
    @Param('id') id: string,
    @Body() data: UpdateAddressDto,
  ) {
    return this.addressService.update(id, req.user.id, data)
  }

  @Delete(':id')
  async delete(@Request() req: any, @Param('id') id: string) {
    return this.addressService.delete(id, req.user.id)
  }
}