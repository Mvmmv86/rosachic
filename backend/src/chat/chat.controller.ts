import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common'
import { ChatService } from './chat.service'

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  // ========== Endpoint Público - Chat com Cliente ==========

  @Post('message')
  async sendMessage(@Body() data: { message: string }) {
    return this.chatService.sendMessage(data.message)
  }

  // ========== Admin - Gestão de Conhecimento ==========

  @Get('knowledge')
  async getKnowledge() {
    return this.chatService.getKnowledge()
  }

  @Post('knowledge')
  async createKnowledge(
    @Body() data: { title: string; content: string; category?: string },
  ) {
    return this.chatService.createKnowledge(data)
  }

  @Put('knowledge/:id')
  async updateKnowledge(@Param('id') id: string, @Body() data: any) {
    return this.chatService.updateKnowledge(id, data)
  }

  @Delete('knowledge/:id')
  async deleteKnowledge(@Param('id') id: string) {
    return this.chatService.deleteKnowledge(id)
  }

  @Post('knowledge/:id/toggle')
  async toggleKnowledgeActive(@Param('id') id: string) {
    return this.chatService.toggleKnowledgeActive(id)
  }

  // ========== Admin - Configuração OpenAI ==========

  @Get('config')
  async getConfig() {
    return this.chatService.getOpenAIConfig()
  }

  @Post('config')
  async saveConfig(@Body() data: {
    apiKey: string
    model?: string
    temperature?: number
    maxTokens?: number
  }) {
    return this.chatService.saveOpenAIConfig(data)
  }

  @Post('config/test')
  async testConfig(@Body() data: { apiKey: string }) {
    return this.chatService.testOpenAIConnection(data.apiKey)
  }
}
