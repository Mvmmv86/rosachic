import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        cpf: true,
        birthDate: true,
        gender: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    if (!user) {
      throw new NotFoundException('Usuário não encontrado')
    }

    return user
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        cpf: true,
        birthDate: true,
        gender: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    })
  }

  async updateProfile(id: string, data: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    })

    if (!user) {
      throw new NotFoundException('Usuário não encontrado')
    }

    return this.prisma.user.update({
      where: { id },
      data: {
        name: data.name,
        phone: data.phone,
        cpf: data.cpf,
        birthDate: data.birthDate,
        gender: data.gender,
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        cpf: true,
        birthDate: true,
        gender: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    })
  }

  async findAll(filters?: { skip?: number; take?: number; search?: string }) {
    const { skip = 0, take = 20, search } = filters || {}

    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' as const } },
            { email: { contains: search, mode: 'insensitive' as const } },
            { cpf: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {}

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take,
        select: {
          id: true,
          email: true,
          name: true,
          phone: true,
          cpf: true,
          birthDate: true,
          gender: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count({ where }),
    ])

    return {
      data: users,
      total,
      skip,
      take,
    }
  }
}