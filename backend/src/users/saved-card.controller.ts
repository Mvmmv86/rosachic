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
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { SavedCardService } from './saved-card.service'
import { SaveCardDto } from './dto/save-card.dto'

@Controller('users/me/cards')
@UseGuards(JwtAuthGuard)
export class SavedCardController {
  constructor(private readonly savedCardService: SavedCardService) {}

  // Listar todos os cartões do usuário logado
  @Get()
  async getMyCards(@Request() req: any) {
    return this.savedCardService.findAllByUserId(req.user.id)
  }

  // Buscar cartão específico
  @Get(':id')
  async getCardById(@Request() req: any, @Param('id') cardId: string) {
    return this.savedCardService.findById(cardId, req.user.id)
  }

  // Adicionar novo cartão
  @Post()
  async saveCard(@Request() req: any, @Body() saveCardDto: SaveCardDto) {
    return this.savedCardService.create(req.user.id, saveCardDto)
  }

  // Atualizar cartão (definir como padrão)
  @Put(':id')
  async updateCard(
    @Request() req: any,
    @Param('id') cardId: string,
    @Body('isDefault') isDefault: boolean,
  ) {
    return this.savedCardService.update(cardId, req.user.id, isDefault)
  }

  // Excluir cartão
  @Delete(':id')
  async deleteCard(@Request() req: any, @Param('id') cardId: string) {
    return this.savedCardService.delete(cardId, req.user.id)
  }
}