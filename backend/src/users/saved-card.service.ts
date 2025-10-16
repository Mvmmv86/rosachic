import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { SaveCardDto } from './dto/save-card.dto'

@Injectable()
export class SavedCardService {
  constructor(private prisma: PrismaService) {}

  // Listar todos os cartões do usuário
  async findAllByUserId(userId: string) {
    return this.prisma.savedCard.findMany({
      where: { userId },
      orderBy: [{ isDefault: 'desc' }, { createdAt: 'desc' }],
    })
  }

  // Buscar cartão por ID
  async findById(id: string, userId: string) {
    const card = await this.prisma.savedCard.findFirst({
      where: { id, userId },
    })

    if (!card) {
      throw new NotFoundException('Cartão não encontrado')
    }

    return card
  }

  // Salvar novo cartão
  async create(userId: string, data: SaveCardDto) {
    // Se este cartão for marcado como padrão, remover o padrão dos outros
    if (data.isDefault) {
      await this.prisma.savedCard.updateMany({
        where: { userId, isDefault: true },
        data: { isDefault: false },
      })
    }

    // Se for o primeiro cartão, definir como padrão automaticamente
    const existingCards = await this.prisma.savedCard.count({
      where: { userId },
    })

    const isFirstCard = existingCards === 0

    return this.prisma.savedCard.create({
      data: {
        userId,
        cardToken: data.cardToken,
        lastFourDigits: data.lastFourDigits,
        brand: data.brand,
        expirationMonth: data.expirationMonth,
        expirationYear: data.expirationYear,
        holderName: data.holderName,
        isDefault: data.isDefault || isFirstCard,
      },
    })
  }

  // Atualizar cartão (apenas isDefault)
  async update(id: string, userId: string, isDefault: boolean) {
    const card = await this.findById(id, userId)

    // Se marcar como padrão, remover dos outros
    if (isDefault) {
      await this.prisma.savedCard.updateMany({
        where: { userId, isDefault: true, NOT: { id } },
        data: { isDefault: false },
      })
    }

    return this.prisma.savedCard.update({
      where: { id: card.id },
      data: { isDefault },
    })
  }

  // Excluir cartão
  async delete(id: string, userId: string) {
    const card = await this.findById(id, userId)

    // Se o cartão excluído era o padrão, definir outro como padrão
    if (card.isDefault) {
      const otherCards = await this.prisma.savedCard.findMany({
        where: { userId, NOT: { id } },
        orderBy: { createdAt: 'asc' },
        take: 1,
      })

      if (otherCards.length > 0) {
        await this.prisma.savedCard.update({
          where: { id: otherCards[0].id },
          data: { isDefault: true },
        })
      }
    }

    await this.prisma.savedCard.delete({
      where: { id: card.id },
    })

    return { message: 'Cartão excluído com sucesso' }
  }
}