# 🎯 PLANO DE INTEGRAÇÃO COMPLETO - ROSA CHIC E-COMMERCE
**Frontend + Backend + Admin - Guia Mestre de Desenvolvimento**

---

## 📊 ANÁLISE DO QUE JÁ TEMOS

### ✅ FRONTEND (18 Páginas Prontas)

| Categoria | Páginas | Status UI |
|-----------|---------|-----------|
| **Home** | `/` | ✅ Completa |
| **Produtos** | `/produtos`, `/produto/[id]` | ✅ Completas |
| **Autenticação** | `/login`, `/cadastro`, `/cadastro/sucesso` | ✅ Completas |
| **Carrinho** | `/carrinho` | ✅ Completa |
| **Checkout** | `/checkout/endereco`, `/checkout/pagamento`, `/checkout/resumo`, `/checkout/sucesso` | ✅ Completas (4 páginas) |
| **Minha Conta** | `/minha-conta/*` (perfil, pedidos, enderecos, pagamentos, favoritos) | ✅ Completas (6 páginas) |
| **Conteúdo** | `/servicos`, `/guia-rapido` | ✅ Completas |

**Total: 18 páginas com UI pronta, sem integração com backend**

---

### ✅ BACKEND (NestJS + Prisma)

#### Módulos Existentes:

**1. ProductsModule** ✅ COMPLETO
- ProductsController
- ProductsService
- Endpoints implementados:
  - `GET /products` (com filtros)
  - `GET /products/:id`
  - `POST /products` (protegido)
  - `PATCH /products/:id` (protegido)
  - `DELETE /products/:id` (protegido)
  - `GET /products/by-dimensions`
  - `GET /products/by-material/:material`
  - `GET /products/by-luminosidade/:luminosidade`

**2. AuthModule** ✅ COMPLETO
- AuthController
- AuthService
- Endpoints implementados:
  - `POST /auth/register`
  - `POST /auth/login`
  - `GET /auth/me` (protegido)

**3. PricingModule** ✅ COMPLETO
- PricingController
- PricingService
- Endpoints implementados:
  - `POST /pricing/calculate`
  - `POST /pricing/calculate-authenticated`

**4. PrismaModule** ✅ COMPLETO
- PrismaService (configurado com SQLite)

#### Database Schema (Prisma):

**Models Existentes:**
- ✅ User (com orders, favorites)
- ✅ Product (com orderItems, favorites)
- ✅ Order (com user, items, shipping)
- ✅ OrderItem (com order, product)
- ✅ Shipping (com order)
- ✅ Favorite (com user, product)

**Enums:**
- Role (USER, ADMIN)
- Luminosidade (Translucida, Blackout)
- Material (Tecido, PVC, Madeira, Bambu)
- OrderStatus (PENDING, CONFIRMED, PROCESSING, SHIPPED, DELIVERED, CANCELLED)
- PaymentMethod (PIX, CREDIT_CARD, BOLETO)
- PaymentStatus (PENDING, APPROVED, REJECTED, REFUNDED)

---

### ❌ O QUE ESTÁ FALTANDO

#### Backend - Módulos a Criar:

- [ ] **UsersModule** - Gestão de perfil, endereços, cartões
- [ ] **CartModule** - Carrinho de compras (session ou DB)
- [ ] **OrdersModule** - CRUD completo de pedidos
- [ ] **FavoritesModule** - Gerenciar favoritos
- [ ] **PaymentModule** - Integração com gateway
- [ ] **UploadModule** - Upload de imagens
- [ ] **EmailModule** - Envio de emails transacionais
- [ ] **ContentModule** - CMS para Serviços e Guia Rápido (opcional)

#### Admin - Criar do Zero:

- [ ] **Projeto /admin** (Next.js)
- [ ] Dashboard com métricas
- [ ] CRUD de Produtos
- [ ] Gestão de Pedidos
- [ ] Gestão de Usuários
- [ ] Gestão de Cupons (opcional)
- [ ] CMS de Conteúdo (opcional)

#### Frontend - Integrações:

- [ ] Cliente HTTP (API lib)
- [ ] Context de Autenticação
- [ ] Context de Carrinho
- [ ] Conectar todas as 18 páginas com backend

---

## 🚀 PLANO DE AÇÃO - CICLOS COMPLETOS

---

## ✅ CICLO 1 - PRODUTOS (4-5 dias)

### **Objetivo:** Catálogo de produtos 100% funcional com admin

### 📋 Checklist:

#### 1.1 Backend - Preparação (1 dia)
- [ ] Verificar ProductsController funcionando
- [ ] Criar seed de produtos (arquivo `prisma/seed.ts`)
  - [ ] 10-20 produtos de exemplo
  - [ ] Dados realistas (nome, preço, dimensões, imagens)
- [ ] Criar módulo de Upload
  - [ ] `UploadController`
  - [ ] `UploadService`
  - [ ] Configurar Multer (local ou S3)
  - [ ] Endpoint `POST /upload/images`
- [ ] Testar upload de imagem
- [ ] Rodar seed: `npm run seed`
- [ ] Verificar produtos no banco

#### 1.2 Admin - Estrutura Base (1 dia)
- [ ] Criar projeto `/admin`
  ```bash
  npx create-next-app@latest admin
  # TypeScript: Yes
  # ESLint: Yes
  # Tailwind CSS: Yes
  # src/ directory: Yes
  # App Router: Yes
  ```
- [ ] Instalar dependências:
  ```bash
  cd admin
  npm install axios zustand lucide-react
  npx shadcn-ui@latest init
  npx shadcn-ui@latest add button input card table dialog form
  ```
- [ ] Criar estrutura de pastas:
  ```
  /admin/src
  ├── /app
  │   ├── /login/page.tsx
  │   ├── /dashboard/page.tsx
  │   ├── /produtos/page.tsx
  │   ├── /produtos/novo/page.tsx
  │   └── /produtos/[id]/editar/page.tsx
  ├── /components
  │   └── /ui (shadcn)
  └── /lib
      └── api.ts
  ```
- [ ] Configurar variável de ambiente:
  ```
  # /admin/.env.local
  NEXT_PUBLIC_API_URL=http://localhost:3000
  ```

#### 1.3 Admin - Login (meio dia)
- [ ] Criar página `/admin/src/app/login/page.tsx`
- [ ] Form de login (email + senha)
- [ ] Conectar com `POST /auth/login`
- [ ] Salvar token no localStorage
- [ ] Redirecionar para `/dashboard`

#### 1.4 Admin - CRUD Produtos (2 dias)
- [ ] **Dashboard** (`/admin/src/app/dashboard/page.tsx`)
  - [ ] Métricas básicas (total produtos, pedidos, etc)
  - [ ] Cards com números
  - [ ] Menu lateral com navegação

- [ ] **Lista de Produtos** (`/admin/src/app/produtos/page.tsx`)
  - [ ] Tabela com produtos
  - [ ] Colunas: Imagem, Código, Modelo, Preço, Status, Ações
  - [ ] Botão "Adicionar Produto"
  - [ ] Filtros: Status (Ativo/Inativo), Material, Luminosidade
  - [ ] Busca por código ou modelo
  - [ ] Paginação
  - [ ] Ações: Editar, Deletar
  - [ ] Conectar com `GET /products`

- [ ] **Criar Produto** (`/admin/src/app/produtos/novo/page.tsx`)
  - [ ] Form completo:
    - [ ] Código (input)
    - [ ] Modelo (input)
    - [ ] Luminosidade (select)
    - [ ] Material (select)
    - [ ] Valor M² (number)
    - [ ] Largura Máx (cm) (number)
    - [ ] Altura Máx (cm) (number)
    - [ ] Área Mín M² (number)
    - [ ] Ambientes (multi-select)
    - [ ] Descrição (textarea)
    - [ ] Estoque (number)
    - [ ] Ativo (checkbox)
    - [ ] Imagens (upload múltiplo)
  - [ ] Upload de imagens com preview
  - [ ] Validação de campos
  - [ ] Salvar via `POST /products`
  - [ ] Redirecionar para lista após salvar

- [ ] **Editar Produto** (`/admin/src/app/produtos/[id]/editar/page.tsx`)
  - [ ] Carregar dados via `GET /products/:id`
  - [ ] Form pré-preenchido
  - [ ] Permitir trocar imagens
  - [ ] Atualizar via `PATCH /products/:id`

- [ ] **Deletar Produto**
  - [ ] Modal de confirmação
  - [ ] Deletar via `DELETE /products/:id`
  - [ ] Atualizar lista

#### 1.5 Frontend Cliente - Conectar Produtos (1 dia)
- [ ] Criar `/frontend/src/lib/api.ts`
  ```typescript
  import axios from 'axios'

  export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  })

  // Interceptor para adicionar token
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })
  ```

- [ ] Criar `/frontend/src/lib/products.ts`
  ```typescript
  import { api } from './api'

  export async function getProducts(params?: any) {
    const { data } = await api.get('/products', { params })
    return data
  }

  export async function getProduct(id: string) {
    const { data } = await api.get(`/products/${id}`)
    return data
  }
  ```

- [ ] **Conectar `/produtos/page.tsx`**
  - [ ] Remover dados mock
  - [ ] Adicionar `getProducts()` no useEffect ou Server Component
  - [ ] Loading state (skeleton)
  - [ ] Error handling
  - [ ] Filtros funcionais (passar params para API)

- [ ] **Conectar `/produto/[id]/page.tsx`**
  - [ ] Remover dados mock
  - [ ] Adicionar `getProduct(id)`
  - [ ] Loading state
  - [ ] Error handling (404 se não encontrar)
  - [ ] Galeria de imagens funcionando

#### 1.6 Testes & Ajustes (meio dia)
- [ ] Adicionar 10 produtos pelo admin
- [ ] Ver produtos aparecendo no site cliente
- [ ] Testar filtros no site
- [ ] Testar busca
- [ ] Testar detalhes do produto
- [ ] Ajustar bugs de UI/UX
- [ ] Validar responsividade

**✅ ENTREGA CICLO 1:** Sistema de produtos 100% funcional!

---

## ✅ CICLO 2 - AUTENTICAÇÃO & USUÁRIOS (3-4 dias)

### **Objetivo:** Login, cadastro e gestão de usuários completos

### 📋 Checklist:

#### 2.1 Backend - Users Module (1 dia)
- [ ] Criar módulo Users
  ```bash
  cd backend
  nest g module users
  nest g controller users
  nest g service users
  ```

- [ ] **UsersController** (`/backend/src/users/users.controller.ts`)
  - [ ] `GET /users/me` - Perfil do usuário logado
  - [ ] `PUT /users/me` - Atualizar perfil
  - [ ] `GET /users` - Listar usuários (apenas admin)
  - [ ] `GET /users/:id` - Detalhes de um usuário (apenas admin)

- [ ] **UsersService** (`/backend/src/users/users.service.ts`)
  - [ ] `findById(id: string)`
  - [ ] `findByEmail(email: string)`
  - [ ] `updateProfile(id: string, data: UpdateUserDto)`
  - [ ] `findAll(filters: any)` (com paginação)

- [ ] Criar DTOs:
  - [ ] `UpdateUserDto` (name, phone, cpf)

- [ ] Testar endpoints no Postman/Insomnia

#### 2.2 Frontend Cliente - Auth Context (1 dia)
- [ ] Criar `/frontend/src/contexts/AuthContext.tsx`
  ```typescript
  // Context com:
  // - user (dados do usuário)
  // - isAuthenticated (boolean)
  // - login(email, password)
  // - logout()
  // - register(data)
  // - updateProfile(data)
  ```

- [ ] Provider no layout: `<AuthProvider>`

- [ ] **Conectar `/login/page.tsx`**
  - [ ] Remover dados mock
  - [ ] Form conectado com `login()` do context
  - [ ] Validação de campos
  - [ ] Mostrar erros
  - [ ] Redirecionar para `/minha-conta` após login
  - [ ] Loading state no botão

- [ ] **Conectar `/cadastro/page.tsx`**
  - [ ] Remover dados mock
  - [ ] Form conectado com `register()` do context
  - [ ] Validação (senha forte, CPF, etc)
  - [ ] Redirecionar para `/cadastro/sucesso`
  - [ ] Login automático após cadastro

- [ ] **Proteger rotas privadas**
  - [ ] Criar middleware de autenticação
  - [ ] Redirecionar para `/login` se não autenticado
  - [ ] Aplicar em:
    - [ ] `/minha-conta/*`
    - [ ] `/checkout/*`

- [ ] **Header atualizado**
  - [ ] Mostrar nome do usuário quando logado
  - [ ] Dropdown "Minha Conta" funcionando
  - [ ] Botão "Sair" funcionando

#### 2.3 Frontend Cliente - Minha Conta Perfil (meio dia)
- [ ] **Conectar `/minha-conta/perfil/page.tsx`**
  - [ ] Carregar dados via `GET /users/me`
  - [ ] Form de edição pré-preenchido
  - [ ] Campos: nome, email (disabled), telefone, CPF
  - [ ] Salvar via `PUT /users/me`
  - [ ] Feedback de sucesso/erro
  - [ ] Loading states

#### 2.4 Admin - Gestão de Usuários (1 dia)
- [ ] **Lista de Usuários** (`/admin/src/app/usuarios/page.tsx`)
  - [ ] Tabela de usuários
  - [ ] Colunas: Nome, Email, CPF, Telefone, Role, Data Cadastro
  - [ ] Filtros: Role (USER/ADMIN), Data de cadastro
  - [ ] Busca por nome/email
  - [ ] Ver detalhes (modal ou página)
  - [ ] Conectar com `GET /users`

- [ ] **Detalhes do Usuário** (modal ou `/admin/src/app/usuarios/[id]/page.tsx`)
  - [ ] Dados pessoais
  - [ ] Histórico de pedidos
  - [ ] Favoritos
  - [ ] Endereços salvos

#### 2.5 Testes (meio dia)
- [ ] Criar conta pelo `/cadastro`
- [ ] Fazer login
- [ ] Editar perfil
- [ ] Ver usuário no admin
- [ ] Testar logout
- [ ] Testar proteção de rotas (tentar acessar sem login)

**✅ ENTREGA CICLO 2:** Autenticação completa + Gestão de usuários!

---

## ✅ CICLO 3 - CARRINHO & CHECKOUT (6-8 dias)

### **Objetivo:** Fluxo completo de compra end-to-end

### 📋 Checklist:

#### 3.1 Backend - Cart Module (1-2 dias)
- [ ] Criar módulo Cart
  ```bash
  nest g module cart
  nest g controller cart
  nest g service cart
  ```

- [ ] **Decisão de Storage:**
  - [ ] Opção A: Redis (melhor performance, recomendado)
  - [ ] Opção B: Database (Prisma - mais simples para começar)
  - [ ] Implementar escolhido

- [ ] **CartController** (`/backend/src/cart/cart.controller.ts`)
  - [ ] `POST /cart/items` - Adicionar produto ao carrinho
  - [ ] `GET /cart` - Ver carrinho
  - [ ] `PUT /cart/items/:itemId` - Atualizar quantidade
  - [ ] `DELETE /cart/items/:itemId` - Remover item
  - [ ] `DELETE /cart` - Limpar carrinho

- [ ] **CartService**
  - [ ] Validar estoque ao adicionar
  - [ ] Calcular subtotal automaticamente
  - [ ] Validar dimensões do produto
  - [ ] Associar carrinho ao usuário (ou session)

- [ ] Criar DTOs:
  - [ ] `AddToCartDto` (productId, widthCm, heightCm, quantity)
  - [ ] `UpdateCartItemDto` (quantity)

- [ ] Testar endpoints

#### 3.2 Backend - Orders Module (2-3 dias)
- [ ] Criar módulo Orders
  ```bash
  nest g module orders
  nest g controller orders
  nest g service orders
  ```

- [ ] **OrdersController** (`/backend/src/orders/orders.controller.ts`)
  - [ ] `POST /orders` - Criar pedido a partir do carrinho
  - [ ] `GET /orders` - Listar pedidos do usuário logado
  - [ ] `GET /orders/:id` - Detalhes de um pedido
  - [ ] `PATCH /orders/:id/status` - Atualizar status (apenas admin)
  - [ ] `GET /orders/all` - Listar todos os pedidos (apenas admin)

- [ ] **OrdersService**
  - [ ] `createFromCart(userId, shippingData, paymentMethod)`
  - [ ] Criar Order + OrderItems + Shipping
  - [ ] Limpar carrinho após criar pedido
  - [ ] Calcular totais (subtotal, frete, desconto, total)
  - [ ] Atualizar estoque dos produtos
  - [ ] `updateStatus(orderId, newStatus)`
  - [ ] `findByUser(userId)`
  - [ ] `findAll(filters)` (com paginação para admin)

- [ ] Criar DTOs:
  - [ ] `CreateOrderDto` (shippingAddress, paymentMethod, coupon?)
  - [ ] `UpdateOrderStatusDto` (status)

- [ ] Testar criação de pedido

#### 3.3 Backend - Payment Module (1-2 dias)
- [ ] Escolher gateway de pagamento:
  - [ ] Opção A: Stripe (internacional, cartão)
  - [ ] Opção B: Mercado Pago (Brasil, PIX + cartão)
  - [ ] Opção C: PagSeguro (Brasil)

- [ ] Criar módulo Payment
  ```bash
  nest g module payment
  nest g controller payment
  nest g service payment
  ```

- [ ] Instalar SDK do gateway escolhido
  ```bash
  npm install stripe
  # ou
  npm install mercadopago
  ```

- [ ] **PaymentController** (`/backend/src/payment/payment.controller.ts`)
  - [ ] `POST /payment/create-checkout` - Criar sessão de pagamento
  - [ ] `POST /payment/webhook` - Receber confirmação de pagamento
  - [ ] `GET /payment/status/:orderId` - Status do pagamento

- [ ] **PaymentService**
  - [ ] Integrar com API do gateway
  - [ ] Criar checkout session
  - [ ] Processar webhook
  - [ ] Atualizar status do pedido após pagamento aprovado
  - [ ] Gerar link de pagamento (PIX, Boleto)

- [ ] Configurar webhook no gateway
- [ ] Testar pagamento em ambiente de sandbox

#### 3.4 Admin - Gestão de Pedidos (1-2 dias)
- [ ] **Dashboard Atualizado** (`/admin/src/app/dashboard/page.tsx`)
  - [ ] Métricas de vendas:
    - [ ] Total de vendas (dia/mês)
    - [ ] Pedidos pendentes
    - [ ] Pedidos do dia
    - [ ] Produtos mais vendidos
  - [ ] Gráfico de vendas (últimos 7 dias)
  - [ ] Lista de pedidos recentes

- [ ] **Lista de Pedidos** (`/admin/src/app/pedidos/page.tsx`)
  - [ ] Tabela de pedidos
  - [ ] Colunas: Nº Pedido, Cliente, Data, Status, Total, Ações
  - [ ] Filtros:
    - [ ] Status (todos, pendente, pago, enviado, etc)
    - [ ] Data (hoje, última semana, último mês, customizado)
    - [ ] Cliente (busca)
  - [ ] Busca por número do pedido
  - [ ] Badge colorido para status
  - [ ] Ações: Ver detalhes, Atualizar status
  - [ ] Conectar com `GET /orders/all`

- [ ] **Detalhes do Pedido** (`/admin/src/app/pedidos/[id]/page.tsx`)
  - [ ] Informações do pedido:
    - [ ] Número, data, status
    - [ ] Dados do cliente (nome, email, telefone)
    - [ ] Endereço de entrega
    - [ ] Método de pagamento
    - [ ] Status do pagamento
  - [ ] Itens do pedido (tabela)
    - [ ] Produto, dimensões, quantidade, preço unitário, subtotal
  - [ ] Totais:
    - [ ] Subtotal, instalação, frete, desconto, total
  - [ ] Histórico de status (timeline)
  - [ ] Atualizar status (dropdown):
    - [ ] PENDING → CONFIRMED
    - [ ] CONFIRMED → PROCESSING
    - [ ] PROCESSING → SHIPPED (pedir código rastreamento)
    - [ ] SHIPPED → DELIVERED
    - [ ] Qualquer → CANCELLED
  - [ ] Campo de notas internas
  - [ ] Botão "Imprimir Pedido"

#### 3.5 Frontend Cliente - Cart Context (1 dia)
- [ ] Criar `/frontend/src/contexts/CartContext.tsx`
  ```typescript
  // Context com:
  // - items (array de produtos no carrinho)
  // - itemsCount (número total de itens)
  // - subtotal (valor)
  // - addToCart(product, widthCm, heightCm, quantity)
  // - removeFromCart(itemId)
  // - updateQuantity(itemId, newQuantity)
  // - clearCart()
  // - isLoading
  ```

- [ ] Provider no layout: `<CartProvider>`

- [ ] **Conectar `/produto/[id]/page.tsx`**
  - [ ] Botão "Adicionar ao Carrinho"
  - [ ] Form de medidas (largura x altura)
  - [ ] Validar dimensões (min/max do produto)
  - [ ] Calcular preço em tempo real via `POST /pricing/calculate`
  - [ ] Adicionar ao carrinho via `addToCart()`
  - [ ] Feedback visual (toast "Adicionado ao carrinho!")

- [ ] **Header atualizado**
  - [ ] Badge com `itemsCount` no ícone do carrinho
  - [ ] Dropdown preview ao passar mouse:
    - [ ] Lista de produtos (imagem, nome, dimensões, preço)
    - [ ] Subtotal
    - [ ] Botão "Ver Carrinho"

#### 3.6 Frontend Cliente - Carrinho (1 dia)
- [ ] **Conectar `/carrinho/page.tsx`**
  - [ ] Listar todos os itens do carrinho
  - [ ] Para cada item:
    - [ ] Imagem do produto
    - [ ] Nome e código
    - [ ] Dimensões selecionadas
    - [ ] Preço unitário
    - [ ] Quantidade (com + e -)
    - [ ] Subtotal
    - [ ] Botão remover
  - [ ] Atualizar quantidade via `updateQuantity()`
  - [ ] Remover item via `removeFromCart()`
  - [ ] Calcular totais:
    - [ ] Subtotal de produtos
    - [ ] Instalação (se aplicável)
    - [ ] Frete (calcular ou estimar)
    - [ ] Total
  - [ ] Campo de cupom de desconto (opcional)
  - [ ] Botão "Finalizar Compra" → `/checkout/endereco`
  - [ ] Botão "Continuar Comprando" → `/produtos`
  - [ ] Mensagem se carrinho vazio

#### 3.7 Frontend Cliente - Checkout (2 dias)
- [ ] **Backend - Addresses & PaymentMethods**
  - [ ] Adicionar endpoints em UsersController:
    - [ ] `GET /users/addresses`
    - [ ] `POST /users/addresses`
    - [ ] `PUT /users/addresses/:id`
    - [ ] `DELETE /users/addresses/:id`
    - [ ] `GET /users/payment-methods`
    - [ ] `POST /users/payment-methods`
    - [ ] `DELETE /users/payment-methods/:id`

- [ ] **Conectar `/checkout/endereco/page.tsx`**
  - [ ] Listar endereços salvos do usuário
  - [ ] Selecionar endereço existente (radio buttons)
  - [ ] Ou adicionar novo endereço:
    - [ ] CEP (com busca via ViaCEP)
    - [ ] Rua, número, complemento
    - [ ] Bairro, cidade, estado
    - [ ] Checkbox "Salvar endereço"
  - [ ] Calcular frete (integração com Correios/Melhor Envio - opcional)
  - [ ] Salvar endereço selecionado/novo no state
  - [ ] Botão "Continuar" → `/checkout/pagamento`

- [ ] **Conectar `/checkout/pagamento/page.tsx`**
  - [ ] Mostrar métodos de pagamento:
    - [ ] PIX (radio)
    - [ ] Cartão de Crédito (radio)
    - [ ] Boleto (radio - opcional)
  - [ ] Se Cartão de Crédito selecionado:
    - [ ] Form de cartão (número, nome, validade, CVV)
    - [ ] Validação com Luhn algorithm
    - [ ] Checkbox "Salvar cartão"
  - [ ] Salvar método selecionado no state
  - [ ] Botão "Continuar" → `/checkout/resumo`

- [ ] **Conectar `/checkout/resumo/page.tsx`**
  - [ ] Mostrar TUDO:
    - [ ] Produtos (mini lista)
    - [ ] Endereço de entrega
    - [ ] Método de pagamento selecionado
    - [ ] Totais (subtotal, frete, desconto, total)
  - [ ] Botão "Finalizar Compra"
  - [ ] Ao clicar:
    - [ ] Criar pedido via `POST /orders`
    - [ ] Se PIX: mostrar QR Code
    - [ ] Se Cartão: processar pagamento
    - [ ] Redirecionar para `/checkout/sucesso`

- [ ] **Conectar `/checkout/sucesso/page.tsx`**
  - [ ] Mostrar número do pedido
  - [ ] Status do pagamento
  - [ ] Instruções (PIX: escanear QR Code, etc)
  - [ ] Botão "Ver Pedido" → `/minha-conta/pedidos`
  - [ ] Botão "Voltar para Home"

#### 3.8 Frontend Cliente - Meus Pedidos (meio dia)
- [ ] **Conectar `/minha-conta/pedidos/page.tsx`**
  - [ ] Listar pedidos via `GET /orders`
  - [ ] Para cada pedido:
    - [ ] Número do pedido
    - [ ] Data
    - [ ] Status (badge colorido)
    - [ ] Total
    - [ ] Botão "Ver Detalhes"
  - [ ] Filtros: Status, Data
  - [ ] Paginação

- [ ] **Modal/Página de Detalhes do Pedido**
  - [ ] Mesmo layout do admin (visão do cliente)
  - [ ] Produtos comprados
  - [ ] Endereço de entrega
  - [ ] Status do pedido (timeline)
  - [ ] Código de rastreamento (se enviado)
  - [ ] Botão "Rastrear Pedido" (link Correios)

#### 3.9 Testes Completos (1 dia)
- [ ] **Fluxo E2E:**
  - [ ] Adicionar produto ao carrinho
  - [ ] Ver carrinho atualizado no header
  - [ ] Ir para `/carrinho`
  - [ ] Atualizar quantidade
  - [ ] Aplicar cupom (se implementado)
  - [ ] Finalizar compra
  - [ ] Preencher endereço
  - [ ] Selecionar pagamento
  - [ ] Confirmar pedido
  - [ ] Ver página de sucesso
  - [ ] Ver pedido em "Meus Pedidos"
  - [ ] Ver pedido no admin
  - [ ] Atualizar status no admin
  - [ ] Ver status atualizado no cliente

- [ ] **Testes de Edge Cases:**
  - [ ] Produto fora de estoque
  - [ ] Dimensões inválidas
  - [ ] Cupom inválido/expirado
  - [ ] Pagamento recusado
  - [ ] Carrinho vazio no checkout

**✅ ENTREGA CICLO 3:** E-commerce completo funcionando de ponta a ponta!

---

## ✅ CICLO 4 - FAVORITOS & MINHA CONTA EXTRAS (3-4 dias)

### **Objetivo:** Completar área do cliente

### 📋 Checklist:

#### 4.1 Backend - Favorites Module (1 dia)
- [ ] Criar módulo Favorites
  ```bash
  nest g module favorites
  nest g controller favorites
  nest g service favorites
  ```

- [ ] **FavoritesController**
  - [ ] `POST /favorites` - Adicionar favorito
  - [ ] `GET /favorites` - Listar favoritos do usuário
  - [ ] `DELETE /favorites/:id` - Remover favorito
  - [ ] `GET /favorites/check/:productId` - Verificar se produto é favorito

- [ ] **FavoritesService**
  - [ ] Criar favorito
  - [ ] Listar com detalhes do produto (JOIN)
  - [ ] Remover
  - [ ] Verificar se existe

#### 4.2 Frontend Cliente - Favoritos (1 dia)
- [ ] **Botão de Favorito**
  - [ ] Adicionar coração em `/produtos` (grid de produtos)
  - [ ] Adicionar coração em `/produto/[id]` (detalhes)
  - [ ] Toggle favorito via `POST` ou `DELETE /favorites`
  - [ ] Mostrar estado (preenchido se favoritado)
  - [ ] Loading state

- [ ] **Conectar `/minha-conta/favoritos/page.tsx`**
  - [ ] Listar favoritos via `GET /favorites`
  - [ ] Grid de produtos favoritos
  - [ ] Botão para remover
  - [ ] Mensagem se não houver favoritos
  - [ ] Link para cada produto

#### 4.3 Frontend Cliente - Endereços (1 dia)
- [ ] **Conectar `/minha-conta/enderecos/page.tsx`**
  - [ ] Listar endereços via `GET /users/addresses`
  - [ ] Card para cada endereço
  - [ ] Badge "Principal" no endereço padrão
  - [ ] Botão "Adicionar Endereço" (modal ou página)
  - [ ] Ações: Editar, Deletar, Marcar como principal
  - [ ] Form de endereço:
    - [ ] CEP (buscar via ViaCEP)
    - [ ] Rua, número, complemento
    - [ ] Bairro, cidade, estado
    - [ ] Checkbox "Endereço principal"
  - [ ] Salvar via `POST /users/addresses`
  - [ ] Editar via `PUT /users/addresses/:id`
  - [ ] Deletar via `DELETE /users/addresses/:id`

#### 4.4 Frontend Cliente - Métodos de Pagamento (1 dia)
- [ ] **Conectar `/minha-conta/pagamentos/page.tsx`**
  - [ ] Listar cartões salvos via `GET /users/payment-methods`
  - [ ] Card para cada cartão (últimos 4 dígitos + bandeira)
  - [ ] Botão "Adicionar Cartão"
  - [ ] Form de cartão (igual ao checkout)
  - [ ] Salvar via `POST /users/payment-methods`
  - [ ] Deletar via `DELETE /users/payment-methods/:id`
  - [ ] **IMPORTANTE:** Nunca salvar dados completos do cartão (usar tokenização do gateway)

#### 4.5 Admin - Cupons (Opcional - 1 dia)
- [ ] Criar módulo Coupons
  ```bash
  nest g module coupons
  nest g controller coupons
  nest g service coupons
  ```

- [ ] Schema Prisma:
  ```prisma
  model Coupon {
    id              String    @id @default(uuid())
    code            String    @unique
    discountType    DiscountType // PERCENTAGE, FIXED
    discountValue   Float
    minOrderValue   Float?
    maxUses         Int?
    usedCount       Int       @default(0)
    validFrom       DateTime
    validUntil      DateTime
    active          Boolean   @default(true)
    createdAt       DateTime  @default(now())
  }

  enum DiscountType {
    PERCENTAGE
    FIXED
  }
  ```

- [ ] **CouponsController**
  - [ ] `GET /coupons` - Listar (admin)
  - [ ] `POST /coupons` - Criar (admin)
  - [ ] `PATCH /coupons/:id` - Atualizar (admin)
  - [ ] `DELETE /coupons/:id` - Deletar (admin)
  - [ ] `POST /coupons/validate` - Validar cupom (público)

- [ ] **Admin - CRUD Cupons** (`/admin/src/app/cupons/page.tsx`)
  - [ ] Lista de cupons
  - [ ] Criar cupom (código, tipo, valor, validade)
  - [ ] Editar/Deletar
  - [ ] Ativar/Desativar

- [ ] **Frontend - Aplicar Cupom**
  - [ ] Campo de cupom em `/carrinho`
  - [ ] Validar via `POST /coupons/validate`
  - [ ] Aplicar desconto
  - [ ] Salvar cupom no pedido

#### 4.6 Testes
- [ ] Favoritar produto
- [ ] Ver favoritos
- [ ] Remover favorito
- [ ] Adicionar endereço
- [ ] Editar endereço
- [ ] Deletar endereço
- [ ] Adicionar cartão
- [ ] Deletar cartão
- [ ] Criar cupom no admin
- [ ] Aplicar cupom no carrinho

**✅ ENTREGA CICLO 4:** Área do cliente 100% completa!

---

## ✅ CICLO 5 - CMS & EXTRAS (2-3 dias) - OPCIONAL

### **Objetivo:** Conteúdo dinâmico e relatórios

### 📋 Checklist:

#### 5.1 Backend - Content Module (1 dia)
- [ ] Criar módulo Content
- [ ] Schema Prisma:
  ```prisma
  model Content {
    id        String   @id @default(uuid())
    slug      String   @unique // "servicos", "guia-rapido"
    title     String
    content   String   // HTML ou Markdown
    active    Boolean  @default(true)
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
  }
  ```

- [ ] **ContentController**
  - [ ] `GET /content/:slug` - Buscar conteúdo (público)
  - [ ] `PUT /content/:slug` - Atualizar (admin)

#### 5.2 Admin - CMS (1 dia)
- [ ] **Editor de Conteúdo** (`/admin/src/app/conteudo/page.tsx`)
  - [ ] Lista de páginas editáveis
  - [ ] Editor WYSIWYG (TinyMCE, Tiptap, ou Quill)
  - [ ] Preview
  - [ ] Salvar via `PUT /content/:slug`

#### 5.3 Frontend - Conteúdo Dinâmico (meio dia)
- [ ] **Conectar `/servicos/page.tsx`**
  - [ ] Buscar conteúdo via `GET /content/servicos`
  - [ ] Renderizar HTML

- [ ] **Conectar `/guia-rapido/page.tsx`**
  - [ ] Buscar conteúdo via `GET /content/guia-rapido`
  - [ ] Renderizar HTML

#### 5.4 Admin - Relatórios (Opcional - 1 dia)
- [ ] **Página de Relatórios** (`/admin/src/app/relatorios/page.tsx`)
  - [ ] Vendas por período (gráfico de linha)
  - [ ] Produtos mais vendidos (gráfico de barras)
  - [ ] Taxa de conversão
  - [ ] Ticket médio
  - [ ] Clientes novos vs recorrentes
  - [ ] Exportar CSV

**✅ ENTREGA CICLO 5:** CMS e relatórios completos!

---

## 📊 RESUMO DO CRONOGRAMA

| Ciclo | Funcionalidade | Duração Estimada | Prioridade |
|-------|---------------|------------------|------------|
| **1** | Produtos (Front + Back + Admin) | 4-5 dias | 🔴 MÁXIMA |
| **2** | Auth & Usuários | 3-4 dias | 🔴 MÁXIMA |
| **3** | Carrinho & Checkout | 6-8 dias | 🔴 MÁXIMA |
| **4** | Favoritos & Minha Conta | 3-4 dias | 🟡 MÉDIA |
| **5** | CMS & Relatórios | 2-3 dias | 🟢 BAIXA |

**TOTAL: 18-24 dias de desenvolvimento**

---

## 🎯 PRÓXIMOS PASSOS

**AGUARDANDO APROVAÇÃO PARA INICIAR CICLO 1 - PRODUTOS**

Ao receber OK, iniciarei:
1. ✅ Seed de produtos no backend
2. ✅ Criar projeto `/admin`
3. ✅ CRUD de produtos no admin
4. ✅ Conectar frontend cliente com backend
5. ✅ Testes E2E

---

## 📝 OBSERVAÇÕES IMPORTANTES

### Stack Confirmada:
- **Frontend Cliente:** Next.js 14 (já existe)
- **Backend:** NestJS + Prisma + SQLite (já existe)
- **Admin:** Next.js 14 (a criar)
- **Autenticação:** JWT (já implementado)
- **Upload:** Multer + Local Storage ou S3
- **Pagamento:** A definir (Stripe, Mercado Pago, ou PagSeguro)

### Variáveis de Ambiente Necessárias:

**Backend** (`/backend/.env`):
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="sua-chave-secreta-aqui"
STRIPE_SECRET_KEY="sk_test_..." # ou outro gateway
UPLOAD_DIR="./uploads"
```

**Frontend** (`/frontend/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

**Admin** (`/admin/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Portas:
- Backend: `http://localhost:3000`
- Frontend: `http://localhost:4444`
- Admin: `http://localhost:3001` (sugestão)

---

**Documento criado em:** 2025-10-10
**Última atualização:** 2025-10-10
**Status:** Aguardando aprovação para iniciar
