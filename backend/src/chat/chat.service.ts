import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaService } from '../prisma/prisma.service'
import OpenAI from 'openai'

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name)
  private openai: OpenAI

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {
    // Inicializar OpenAI
    const apiKey = this.configService.get('OPENAI_API_KEY')
    if (apiKey) {
      this.openai = new OpenAI({ apiKey })
      this.logger.log('✅ OpenAI configurado e pronto')
    } else {
      this.logger.warn('⚠️  OPENAI_API_KEY não configurado')
    }
  }

  // Enviar mensagem para a IA
  async sendMessage(message: string) {
    try {
      // 1. Buscar API Key do banco (prioridade) ou usar do .env
      const config = await this.prisma.openAIConfig.findFirst({
        where: { active: true },
      })

      const apiKey = config?.apiKey || this.configService.get('OPENAI_API_KEY')
      const model = config?.model || this.configService.get('OPENAI_MODEL') || 'gpt-4o-mini'
      const temperature = config?.temperature || 0.7
      const maxTokens = config?.maxTokens || 500

      if (!apiKey) {
        return {
          response: 'Chat IA não configurado. Por favor, configure a API Key no admin.',
          error: true,
        }
      }

      // 2. Buscar conhecimento ativo do banco
      const knowledge = await this.prisma.chatKnowledge.findMany({
        where: { active: true },
        orderBy: { createdAt: 'desc' },
      })

      // 3. Montar contexto (sistema prompt)
      const knowledgeText = knowledge.map(k =>
        `### ${k.title}${k.category ? ` (${k.category})` : ''}\n${k.content}`
      ).join('\n\n')

      const systemPrompt = `Você é um assistente virtual da Rosa Chic, especialista em persianas sob medida.

CONHECIMENTO DISPONÍVEL:
${knowledgeText || 'Nenhum conhecimento cadastrado ainda.'}

INSTRUÇÕES:
- Responda de forma amigável, profissional e prestativa
- Use APENAS o conhecimento fornecido acima para responder
- Se não souber a resposta, seja honesto e sugira falar com um consultor humano
- Foque em ajudar o cliente a escolher a persiana ideal
- Mencione sempre a qualidade e personalização da Rosa Chic
- Seja conciso e objetivo (máximo 3 parágrafos)
- Use emojis quando apropriado para deixar mais amigável
- Se o cliente perguntar sobre orçamento, sugira usar a calculadora online do site`

      // 4. Chamar OpenAI
      this.logger.log(`💬 Enviando mensagem para OpenAI: "${message.substring(0, 50)}..."`)

      const completion = await this.openai.chat.completions.create({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message },
        ],
        temperature,
        max_tokens: maxTokens,
      })

      const response = completion.choices[0].message.content

      this.logger.log(`✅ Resposta recebida (${completion.usage?.total_tokens} tokens)`)

      return {
        response,
        usage: {
          promptTokens: completion.usage?.prompt_tokens,
          completionTokens: completion.usage?.completion_tokens,
          totalTokens: completion.usage?.total_tokens,
        },
      }
    } catch (error) {
      this.logger.error(`❌ Erro ao processar mensagem:`, error.message)
      return {
        response: 'Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente ou fale com nosso WhatsApp.',
        error: true,
      }
    }
  }

  // ========== CRUD de Conhecimento (para admin) ==========

  async getKnowledge() {
    return this.prisma.chatKnowledge.findMany({
      orderBy: { createdAt: 'desc' },
    })
  }

  async createKnowledge(data: { title: string; content: string; category?: string }) {
    return this.prisma.chatKnowledge.create({ data })
  }

  async updateKnowledge(id: string, data: any) {
    return this.prisma.chatKnowledge.update({
      where: { id },
      data,
    })
  }

  async deleteKnowledge(id: string) {
    return this.prisma.chatKnowledge.delete({ where: { id } })
  }

  async toggleKnowledgeActive(id: string) {
    const knowledge = await this.prisma.chatKnowledge.findUnique({ where: { id } })
    if (!knowledge) {
      throw new Error('Conhecimento não encontrado')
    }
    return this.prisma.chatKnowledge.update({
      where: { id },
      data: { active: !knowledge.active },
    })
  }

  // ========== Configuração OpenAI (para admin) ==========

  async getOpenAIConfig() {
    return this.prisma.openAIConfig.findFirst({
      orderBy: { createdAt: 'desc' },
    })
  }

  async saveOpenAIConfig(data: {
    apiKey: string
    model?: string
    temperature?: number
    maxTokens?: number
  }) {
    // Desativar configs antigas
    await this.prisma.openAIConfig.updateMany({
      data: { active: false },
    })

    // Criar nova config
    return this.prisma.openAIConfig.create({
      data: {
        apiKey: data.apiKey,
        model: data.model || 'gpt-4o-mini',
        temperature: data.temperature || 0.7,
        maxTokens: data.maxTokens || 500,
        active: true,
      },
    })
  }

  async testOpenAIConnection(apiKey: string) {
    try {
      const testClient = new OpenAI({ apiKey })
      const response = await testClient.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: 'teste' }],
        max_tokens: 10,
      })
      return { success: true, message: 'Conexão OK!' }
    } catch (error) {
      return { success: false, message: error.message }
    }
  }
}
