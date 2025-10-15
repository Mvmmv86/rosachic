# 🧪 Plano de Testes - Fluxo Completo E-commerce Rosa Chic

**Data**: 14 de Outubro de 2025
**Objetivo**: Testar todo o fluxo de Carrinho → Checkout → Pagamento

---

## ✅ Pré-requisitos Verificados

### Servidores Rodando:
- ✅ **Backend**: http://localhost:3001 (NestJS + Prisma)
- ✅ **Frontend Cliente**: http://localhost:4444 (Next.js)
- ✅ **Admin**: http://localhost:5000 (Next.js)

### Banco de Dados:
- ✅ **Produtos cadastrados**: Sim (pelo menos 2 produtos ativos)
- ✅ **Schema atualizado**: Sim (com Cart, Orders, Payment)

### Frontend:
- ✅ **Cart Store**: Implementado com Zustand + localStorage
- ✅ **Página /carrinho**: Implementada e integrada
- ✅ **Header com contador**: Implementado

---

## 🔧 O que FALTA para testar:

### 1. ⚠️ **Botão "Adicionar ao Carrinho" nas Páginas de Produto**
**Status**: ❌ **NÃO IMPLEMENTADO**

**O que precisa**:
- Botão na página `/produto/[id]`
- Formulário para selecionar dimensões (largura x altura)
- Checkboxes para opcionais (Bandô, Motor, Instalação)
- Integração com cart-store
- Toast notification ao adicionar
- Feedback visual (loading state)

**Localização**:
- Arquivo: `frontend/src/app/produto/[id]/page.tsx`
- Função: Chamar `addItem()` do cart-store

---

### 2. ⚠️ **Páginas de Checkout**
**Status**: ❌ **NÃO IMPLEMENTADAS**

#### 2.1. `/checkout/endereco`
- Formulário de endereço de entrega
- Campos: CEP, Rua, Número, Complemento, Bairro, Cidade, Estado
- Integração com API ViaCEP (opcional)
- Botão "Continuar" → redireciona para `/checkout/pagamento`

#### 2.2. `/checkout/pagamento`
- Seleção de método de pagamento:
  - PIX
  - Cartão de Crédito
  - Boleto Bancário
- Botão "Continuar" → redireciona para `/checkout/resumo`

#### 2.3. `/checkout/resumo`
- Exibir resumo completo do pedido:
  - Itens do carrinho
  - Endereço de entrega
  - Método de pagamento
  - Totais (subtotal, frete, desconto, total)
- Botão "Finalizar Pedido" → cria Order + Payment
- Redireciona para `/checkout/sucesso`

#### 2.4. `/checkout/sucesso`
- Exibir confirmação do pedido
- Número do pedido
- Status do pagamento
- Instruções de pagamento (se PIX ou Boleto)
- Botão "Ver Meus Pedidos"
- Botão "Voltar para Home"

---

## 📋 Fluxo de Teste Completo (Quando Pronto)

### Teste 1: Adicionar Produto ao Carrinho
1. Acessar http://localhost:4444/produtos
2. Clicar em um produto
3. Selecionar dimensões (ex: 120cm x 150cm)
4. Selecionar opcionais (ex: Motor)
5. Clicar em "Adicionar ao Carrinho"
6. **Validar**:
   - Toast de sucesso aparece
   - Contador no header atualiza
   - Produto aparece no dropdown do carrinho

### Teste 2: Ver Carrinho
1. Clicar no ícone do carrinho no header
2. Verificar dropdown com preview dos itens
3. Clicar em "Ver Carrinho"
4. **Validar**:
   - Página /carrinho abre
   - Todos os itens estão listados
   - Valores estão corretos
   - Controles de quantidade funcionam
   - Botão remover funciona

### Teste 3: Fluxo de Checkout - Endereço
1. Na página /carrinho, clicar em "Finalizar Compra"
2. Preencher formulário de endereço
3. Clicar em "Continuar"
4. **Validar**:
   - Redireciona para /checkout/pagamento
   - Endereço salvo (localStorage ou API)

### Teste 4: Fluxo de Checkout - Pagamento
1. Selecionar método de pagamento (PIX)
2. Clicar em "Continuar"
3. **Validar**:
   - Redireciona para /checkout/resumo
   - Método de pagamento selecionado

### Teste 5: Fluxo de Checkout - Resumo
1. Verificar todos os dados do pedido
2. Clicar em "Finalizar Pedido"
3. **Validar**:
   - **POST /orders** criado com sucesso
   - **POST /payment/create-preference** criado
   - Redireciona para /checkout/sucesso
   - Order ID recebido

### Teste 6: Página de Sucesso
1. Verificar informações do pedido
2. Se PIX: verificar QR Code
3. Se Boleto: verificar link
4. **Validar**:
   - Número do pedido exibido
   - Instruções de pagamento corretas
   - Carrinho limpo (localStorage)

---

## 🔌 APIs que Precisam Ser Testadas

### Backend APIs:
- ✅ **GET /products** - Listar produtos
- ✅ **GET /products/:id** - Detalhes do produto
- ❌ **POST /cart** - Adicionar item ao carrinho (precisa auth)
- ❌ **GET /cart** - Ver carrinho (precisa auth)
- ❌ **POST /orders** - Criar pedido (precisa auth)
- ❌ **POST /payment/create-preference** - Criar pagamento Mercado Pago
- ❌ **GET /payment/order/:orderId** - Ver status do pagamento

### Auth necessária:
- ❌ **POST /auth/register** - Criar usuário
- ❌ **POST /auth/login** - Fazer login
- ❌ **GET /auth/me** - Verificar usuário logado

---

## 🛠️ Tarefas Prioritárias

### 1️⃣ **URGENTE - Implementar "Adicionar ao Carrinho"** (30min)
**Arquivo**: `frontend/src/app/produto/[id]/page.tsx`

**Código necessário**:
```typescript
import { useCartStore } from '@/store/cart-store'

const { addItem } = useCartStore()

const handleAddToCart = () => {
  addItem({
    product,
    widthCm: selectedWidth,
    heightCm: selectedHeight,
    pricing: calculatedPricing,
    quantity: 1,
    options: {
      bando: selectedBando,
      motor: selectedMotor,
      installation: selectedInstallation
    }
  })

  // Toast notification
  alert('Produto adicionado ao carrinho!')
}
```

---

### 2️⃣ **IMPORTANTE - Implementar Checkout** (2-3h)

#### Passo 1: Criar `/checkout/endereco`
- Form com React Hook Form
- Validação com Zod
- Salvar em `localStorage` ou context

#### Passo 2: Criar `/checkout/pagamento`
- Radio buttons para PIX/Cartão/Boleto
- Salvar seleção

#### Passo 3: Criar `/checkout/resumo`
- Exibir todos os dados
- Botão "Finalizar" → chama APIs:
  1. `POST /orders` (cria pedido)
  2. `POST /payment/create-preference` (cria pagamento MP)
  3. Redireciona para `/checkout/sucesso`

#### Passo 4: Criar `/checkout/sucesso`
- Mostrar número do pedido
- Instruções de pagamento
- Limpar carrinho

---

### 3️⃣ **TESTE - Usuário e Autenticação** (opcional para teste)

**Opção A**: Testar sem auth (mock user ID)
- Modificar APIs para aceitar user ID via body (dev mode)

**Opção B**: Criar usuário de teste
```bash
curl -X POST http://localhost:3001/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste@teste.com",
    "password": "senha123",
    "name": "Usuario Teste"
  }'
```

---

## 📊 Checklist de Teste

### Pré-teste:
- [ ] Backend rodando (porta 3001)
- [ ] Frontend rodando (porta 4444)
- [ ] Banco de dados com produtos
- [ ] Implementar "Adicionar ao Carrinho"
- [ ] Implementar páginas de Checkout

### Teste do Fluxo:
- [ ] Adicionar produto ao carrinho
- [ ] Ver carrinho
- [ ] Atualizar quantidade
- [ ] Remover item
- [ ] Finalizar compra → Endereço
- [ ] Selecionar pagamento
- [ ] Revisar resumo
- [ ] Confirmar pedido
- [ ] Ver página de sucesso
- [ ] Verificar carrinho limpo

### Validações de Dados:
- [ ] Order criado no banco (`/backend/prisma/dev.db`)
- [ ] Payment criado no banco
- [ ] Status inicial: `PENDING`
- [ ] Preference ID do Mercado Pago gerado (se configurado)

---

## 🚀 Próximos Passos Imediatos

1. **AGORA**: Implementar botão "Adicionar ao Carrinho"
2. **DEPOIS**: Testar fluxo Produto → Carrinho
3. **EM SEGUIDA**: Implementar Checkout (4 páginas)
4. **FINAL**: Testar fluxo completo end-to-end

---

## 💡 Observações

### Mercado Pago:
- Se `MERCADOPAGO_ACCESS_TOKEN` não estiver configurado:
  - Payment será criado em modo SIMULADO
  - Preference ID será falso
  - Webhook não funcionará
- Para testes completos, configurar credenciais de sandbox

### SQLite Limitations:
- `mode: "insensitive"` não funciona no SQLite
- Causa erros no `users.service.ts`
- Solução: Remover o `mode` ou usar PostgreSQL

### Cart Persistence:
- Carrinho salvo em `localStorage` com chave `rosa-chic-cart`
- Sobrevive a reloads da página
- Não sincroniza com backend (ainda)

---

**Status Geral**: ⚠️ **70% Pronto para Teste**

**Falta**:
- ❌ Botão "Adicionar ao Carrinho" (crítico)
- ❌ Páginas de Checkout (4 páginas)
- ✅ Backend APIs (prontas)
- ✅ Cart Store (pronto)
- ✅ Página /carrinho (pronta)

---

**Desenvolvido por**: Claude Code
**Data**: 14 de Outubro de 2025