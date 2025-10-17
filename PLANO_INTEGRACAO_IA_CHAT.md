# 🤖 Plano de Integração - Chat com IA (OpenAI GPT)

## 🎯 Objetivo

Transformar o ChatWidget existente em um chat inteligente com IA que responde perguntas sobre persianas automaticamente.

---

## ⚡ Plano RÁPIDO (1-2 horas)

### ✅ **O que JÁ TEMOS:**
- ✅ ChatWidget UI pronto
- ✅ ChatButton flutuante na Home
- ✅ Backend NestJS rodando
- ✅ Supabase PostgreSQL configurado

### 🎯 **O que FALTA (Simples):**
1. Criar endpoint `/chat` no backend
2. Integrar OpenAI API
3. Criar tabela para armazenar conhecimento
4. Painel admin para gerenciar conhecimento
5. Conectar frontend com backend

---

## 📋 Passo a Passo SIMPLES

### **PASSO 1: Configurar OpenAI (5 minutos)**

**Você precisa:**
1. Conta OpenAI: https://platform.openai.com
2. Criar API Key: https://platform.openai.com/api-keys
3. Adicionar créditos (mínimo $5 USD)

**No .env do backend:**
```env
# OpenAI
OPENAI_API_KEY="sk-proj-xxxxxxxxxxxxxxxxxxxxxxxx"
OPENAI_MODEL="gpt-4o-mini" # Mais barato e rápido
```

**Custo estimado:**
- gpt-4o-mini: $0.150 / 1M tokens input, $0.600 / 1M tokens output
- ~1000 mensagens/mês = ~$2-3 USD

---

### **PASSO 2: Backend - Criar Módulo de Chat (20 min)**

#### **2.1 - Criar Tabela de Conhecimento**

**Arquivo:** `backend/prisma/schema.prisma`

```prisma
model ChatKnowledge {
  id          String   @id @default(uuid())
  title       String   // Ex: "Tipos de Persianas"
  content     String   @db.Text // Texto do conhecimento
  category    String?  // Ex: "Produtos", "Instalação", "Medidas"
  active      Boolean  @default(true)
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")

  @@map("chat_knowledge")
}
```

**Executar:**
```bash
cd backend
npx prisma db push
npx prisma generate
```

---

#### **2.2 - Instalar SDK OpenAI**

```bash
cd backend
npm install openai
```

---

#### **2.3 - Criar ChatModule**

**Arquivo:** `backend/src/chat/chat.module.ts`
```typescript
import { Module } from '@nestjs/common'
import { ChatController } from './chat.controller'
import { ChatService } from './chat.service'
import { PrismaModule } from '../prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
```

---

#### **2.4 - Criar ChatService**

**Arquivo:** `backend/src/chat/chat.service.ts`
```typescript
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaService } from '../prisma/prisma.service'
import OpenAI from 'openai'

@Injectable()
export class ChatService {
  private openai: OpenAI

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {
    this.openai = new OpenAI({
      apiKey: this.configService.get('OPENAI_API_KEY'),
    })
  }

  async sendMessage(message: string) {
    // 1. Buscar conhecimento ativo do banco
    const knowledge = await this.prisma.chatKnowledge.findMany({
      where: { active: true },
    })

    // 2. Montar contexto (sistema prompt)
    const systemPrompt = `Você é um assistente virtual da Rosa Chic, especialista em persianas sob medida.

CONHECIMENTO DISPONÍVEL:
${knowledge.map(k => `### ${k.title}\n${k.content}`).join('\n\n')}

INSTRUÇÕES:
- Responda de forma amigável e profissional
- Use o conhecimento acima para responder
- Se não souber, sugira falar com um consultor humano
- Foque em ajudar o cliente a escolher a persiana ideal
- Mencione sempre qualidade e personalização da Rosa Chic
- Seja conciso (máximo 3 parágrafos)`

    // 3. Chamar OpenAI
    const completion = await this.openai.chat.completions.create({
      model: this.configService.get('OPENAI_MODEL') || 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message },
      ],
      temperature: 0.7,
      max_tokens: 500,
    })

    return {
      response: completion.choices[0].message.content,
      usage: completion.usage, // Para monitorar custos
    }
  }

  // CRUD de Conhecimento (para admin)
  async getKnowledge() {
    return this.prisma.chatKnowledge.findMany({
      orderBy: { createdAt: 'desc' },
    })
  }

  async createKnowledge(data: { title: string; content: string; category?: string }) {
    return this.prisma.chatKnowledge.create({ data })
  }

  async updateKnowledge(id: string, data: any) {
    return this.prisma.chatKnowledge.update({ where: { id }, data })
  }

  async deleteKnowledge(id: string) {
    return this.prisma.chatKnowledge.delete({ where: { id } })
  }
}
```

---

#### **2.5 - Criar ChatController**

**Arquivo:** `backend/src/chat/chat.controller.ts`
```typescript
import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common'
import { ChatService } from './chat.service'

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  // Endpoint público - enviar mensagem
  @Post('message')
  async sendMessage(@Body() data: { message: string }) {
    return this.chatService.sendMessage(data.message)
  }

  // Admin - CRUD de Conhecimento
  @Get('knowledge')
  async getKnowledge() {
    return this.chatService.getKnowledge()
  }

  @Post('knowledge')
  async createKnowledge(@Body() data: any) {
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
}
```

---

#### **2.6 - Registrar ChatModule**

**Arquivo:** `backend/src/app.module.ts`

Adicionar:
```typescript
import { ChatModule } from './chat/chat.module'

@Module({
  imports: [
    // ... outros módulos
    ChatModule, // ← Adicionar aqui
  ],
})
```

---

### **PASSO 3: Admin - Painel de Conhecimento (30 min)**

Criar página simples em: `admin/src/app/dashboard/chat-knowledge/page.tsx`

**Funcionalidades:**
- ✅ Lista de conhecimentos (tabela)
- ✅ Botão "Adicionar Conhecimento"
- ✅ Form: Título, Conteúdo (textarea grande), Categoria
- ✅ Editar/Deletar
- ✅ Ativar/Desativar

**Exemplo de Conhecimento:**

```
Título: Tipos de Persianas
Categoria: Produtos

Conteúdo:
Oferecemos 5 tipos principais de persianas:

1. Rolô - Minimalista e moderna, ideal para ambientes clean
2. Romana - Elegante com pregas horizontais
3. Vertical - Perfeita para janelas grandes e portas
4. Celular (Blackout) - Máximo bloqueio de luz
5. Double Vision - Alterna entre privacidade e luminosidade

Todas sob medida com instalação profissional em Curitiba.
```

---

### **PASSO 4: Frontend - Conectar Chat com API (15 min)**

**Atualizar:** `frontend/src/components/ChatWidget.tsx`

```typescript
const handleSendMessage = async () => {
  if (!newMessage.trim()) return

  // Adicionar mensagem do usuário
  const userMessage = { role: 'user', content: newMessage }
  setMessages(prev => [...prev, userMessage])
  setNewMessage('')
  setIsLoading(true)

  try {
    // Chamar API
    const response = await fetch('http://localhost:3001/chat/message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: newMessage }),
    })

    const data = await response.json()

    // Adicionar resposta da IA
    const aiMessage = { role: 'assistant', content: data.response }
    setMessages(prev => [...prev, aiMessage])
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error)
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: 'Desculpe, ocorreu um erro. Por favor, tente novamente.'
    }])
  } finally {
    setIsLoading(false)
  }
}
```

---

## 📊 Estrutura de Dados

### **Conhecimento Inicial (Seed):**

```javascript
// backend/seed-chat-knowledge.js
const knowledge = [
  {
    title: 'Sobre a Rosa Chic',
    category: 'Empresa',
    content: 'A Rosa Chic é especialista em persianas sob medida há mais de 10 anos. Oferecemos produtos de alta qualidade com design exclusivo e instalação profissional em Curitiba e região.'
  },
  {
    title: 'Tipos de Persianas',
    category: 'Produtos',
    content: 'Rolô, Romana, Vertical, Celular Blackout, Double Vision. Todas personalizáveis com diferentes materiais (tecido, PVC, madeira, bambu) e níveis de luminosidade (translúcida ou blackout).'
  },
  {
    title: 'Como Medir',
    category: 'Instalação',
    content: 'Para medir corretamente: 1) Use trena metálica, 2) Meça largura em 3 pontos (considere a menor), 3) Meça altura em 3 pontos (considere a menor), 4) Adicione 10cm de margem para instalação. Nosso site calcula automaticamente!'
  },
  {
    title: 'Prazo e Entrega',
    category: 'Logística',
    content: 'Prazo de produção: 5-7 dias úteis. Entrega em todo Brasil via Correios. Frete grátis para Curitiba. Instalação profissional disponível em Curitiba e região metropolitana.'
  },
  {
    title: 'Preços e Orçamento',
    category: 'Comercial',
    content: 'Preços variam de R$ 150 a R$ 450 por m², dependendo do material e modelo. Use nossa calculadora online para orçamento instantâneo. Aceitamos PIX, cartão (até 12x) e boleto.'
  }
]
```

---

## 🚀 Checklist de Implementação RÁPIDA

### **Backend (30 minutos):**
- [ ] Adicionar `OPENAI_API_KEY` no .env
- [ ] Instalar: `npm install openai`
- [ ] Adicionar model `ChatKnowledge` no schema.prisma
- [ ] Executar: `npx prisma db push`
- [ ] Criar pasta `backend/src/chat/`
- [ ] Criar `chat.module.ts`
- [ ] Criar `chat.service.ts` (com OpenAI)
- [ ] Criar `chat.controller.ts`
- [ ] Registrar ChatModule no app.module.ts
- [ ] Rodar seed de conhecimento inicial

### **Admin (30 minutos):**
- [ ] Criar página `/admin/src/app/dashboard/knowledge/page.tsx`
- [ ] Lista de conhecimentos (tabela)
- [ ] Form de adicionar/editar (título, conteúdo, categoria)
- [ ] Botões deletar/ativar/desativar
- [ ] Conectar com API `/chat/knowledge`

### **Frontend (15 minutos):**
- [ ] Atualizar `ChatWidget.tsx`
- [ ] Conectar com `POST /chat/message`
- [ ] Mostrar loading enquanto IA responde
- [ ] Exibir resposta da IA

### **Testes (15 minutos):**
- [ ] Testar pergunta simples: "Que tipos de persianas vocês tem?"
- [ ] Testar pergunta sobre medidas
- [ ] Testar pergunta sobre preços
- [ ] Adicionar novo conhecimento pelo admin
- [ ] Testar se IA usa o novo conhecimento

---

## 💰 Custos Estimados

### **OpenAI GPT-4o-mini:**
- Input: $0.150 / 1M tokens
- Output: $0.600 / 1M tokens

**Estimativa mensal:**
- 1000 conversas/mês
- ~3 mensagens por conversa
- ~200 tokens por mensagem
- **Custo: ~$2-5 USD/mês**

**Alternativa mais barata:**
- GPT-3.5-turbo: $0.50 / 1M tokens (3x mais barato)

---

## 🎨 Exemplo de Conversa

**Cliente:** "Qual persiana é melhor para quarto?"

**IA:** "Para quarto, recomendo nossas persianas Celular Blackout! Elas bloqueiam 100% da luz, garantindo um sono tranquilo mesmo durante o dia. São ideais para quem trabalha em turnos ou tem crianças pequenas.

Também temos a opção Double Vision, que permite alternar entre privacidade total e luz natural com um simples movimento.

Ambas são sob medida e disponíveis em diversas cores. Quer que eu calcule um orçamento para você? 😊"

---

## 🔧 Configuração Simplificada

### **Conhecimento Básico (5 blocos):**

1. **Sobre a Empresa** (quem somos, tempo de mercado)
2. **Produtos** (tipos, materiais, luminosidade)
3. **Como Medir** (passo a passo)
4. **Preços e Pagamento** (faixas, formas de pagamento)
5. **Entrega e Instalação** (prazos, regiões)

**Total:** ~2000 tokens de contexto

---

## ⚡ Implementação EXPRESS (Mais Rápida)

### **Alternativa: Hardcoded Knowledge (SEM Admin)**

Se quiser AINDA MAIS rápido, posso hardcodar o conhecimento direto no código:

```typescript
// chat.service.ts
const KNOWLEDGE = `
SOBRE A ROSA CHIC:
Especialistas em persianas sob medida há 10+ anos...

TIPOS DE PERSIANAS:
1. Rolô - minimalista e moderna
2. Romana - elegante com pregas
...

COMO MEDIR:
Use trena metálica, meça em 3 pontos...
`
```

**Vantagem:** Implementa em 30 minutos
**Desvantagem:** Precisa editar código para mudar conhecimento

---

## 🎯 Decisão Necessária

**Você quer:**

### **Opção A: Completo com Admin** ⭐ (Recomendado)
- ⏱️ Tempo: 1-2 horas
- ✅ Admin pode editar conhecimento
- ✅ Banco de dados estruturado
- ✅ Escalável
- ✅ Profissional

### **Opção B: Rápido (Hardcoded)**
- ⏱️ Tempo: 30 minutos
- ✅ Funciona imediatamente
- ❌ Precisa editar código para mudar
- ❌ Menos flexível

---

## 🚀 Próximos Passos

**Me diga:**

1. **Você já tem API Key da OpenAI?**
   - Se sim, me passe
   - Se não, crie em: https://platform.openai.com/api-keys

2. **Qual opção quer?**
   - A: Completo com admin (1-2h)
   - B: Rápido hardcoded (30min)

3. **Eu posso implementar AGORA!**
   - Passo a passo
   - Testando cada etapa

---

**Responda e eu implemento imediatamente!** 🤖💬

---

**Data:** 17/10/2025
**Status:** ⏳ Aguardando API Key da OpenAI e escolha da opção
