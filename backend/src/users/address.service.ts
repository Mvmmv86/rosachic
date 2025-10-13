import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateAddressDto } from './dto/create-address.dto'
import { UpdateAddressDto } from './dto/update-address.dto'

@Injectable()
export class AddressService {
  constructor(private prisma: PrismaService) {}

  async findAllByUserId(userId: string) {
    return this.prisma.address.findMany({
      where: { userId },
      orderBy: [{ isDefault: 'desc' }, { createdAt: 'desc' }],
    })
  }

  async findById(id: string, userId: string) {
    const address = await this.prisma.address.findFirst({
      where: { id, userId },
    })

    if (!address) {
      throw new NotFoundException('Endereço não encontrado')
    }

    return address
  }

  async create(userId: string, data: CreateAddressDto) {
    // Se este endereço for marcado como padrão, remover o padrão dos outros
    if (data.isDefault) {
      await this.prisma.address.updateMany({
        where: { userId, isDefault: true },
        data: { isDefault: false },
      })
    }

    return this.prisma.address.create({
      data: {
        userId,
        ...data,
      },
    })
  }

  async update(id: string, userId: string, data: UpdateAddressDto) {
    const address = await this.findById(id, userId)

    // Se este endereço for marcado como padrão, remover o padrão dos outros
    if (data.isDefault) {
      await this.prisma.address.updateMany({
        where: { userId, isDefault: true, NOT: { id } },
        data: { isDefault: false },
      })
    }

    return this.prisma.address.update({
      where: { id: address.id },
      data,
    })
  }

  async delete(id: string, userId: string) {
    const address = await this.findById(id, userId)

    await this.prisma.address.delete({
      where: { id: address.id },
    })

    return { message: 'Endereço excluído com sucesso' }
  }
}