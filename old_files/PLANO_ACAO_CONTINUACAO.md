# 📋 PLANO DE AÇÃO - CONTINUAÇÃO (Fases 2-6)

> **Este documento continua o plano iniciado em ROSACHIC.md**

---

## 🔧 FASE 2: BACKEND (NestJS + Prisma + PostgreSQL)

### **2.1 Setup Inicial Backend**

#### **Task 2.1.1: Criar projeto NestJS**

```bash
npm i -g @nestjs/cli
nest new backend --package-manager npm --strict
cd backend
```

**Validação:**
- [ ] Projeto criado
- [ ] `npm run start:dev` funciona
- [ ] Strict mode TypeScript ativo

---

#### **Task 2.1.2: Instalar dependências do backend**

```bash
cd backend

# Core
npm install @nestjs/config @nestjs/jwt @nestjs/passport passport passport-jwt
npm install @nestjs/throttler class-validator class-transformer
npm install bcrypt

# Prisma
npm install @prisma/client
npm install -D prisma

# Utilities
npm install zod

# Dev
npm install -D @types/bcrypt @types/passport-jwt
npm install -D @nestjs/testing

# Inicializar Prisma
npx prisma init
```

**Validação:**
- [ ] Todas dependências instaladas
- [ ] Prisma inicializado
- [ ] `prisma/schema.prisma` criado

---

#### **Task 2.1.3: Configurar variáveis de ambiente**

**Arquivo:** `backend/.env.example`

```env
NODE_ENV=development

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/rosachic_dev"

# JWT
JWT_SECRET="your-super-secret-jwt-key-min-32-chars"
JWT_EXPIRATION="15m"
JWT_REFRESH_EXPIRATION="7d"

# CORS
CORS_ORIGIN="http://localhost:3000"

# Rate Limiting
RATE_LIMIT_TTL=60
RATE_LIMIT_MAX=100

# Supabase (se usar)
SUPABASE_URL=""
SUPABASE_ANON_KEY=""
```

**Arquivo:** `backend/src/config/env.validation.ts`

```typescript
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRATION: z.string(),
  JWT_REFRESH_EXPIRATION: z.string(),
  CORS_ORIGIN: z.string(),
  RATE_LIMIT_TTL: z.string().transform(Number),
  RATE_LIMIT_MAX: z.string().transform(Number),
})

export type Env = z.infer<typeof envSchema>

export function validateEnv(config: Record<string, unknown>): Env {
  return envSchema.parse(config)
}
```

**Validação:**
- [ ] .env.example criado
- [ ] Validação funcionando
- [ ] Nenhum secret commitado

---

#### **Task 2.1.4: Configurar Prisma Schema**

**Arquivo:** `backend/prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(uuid())
  email         String    @unique
  passwordHash  String    @map("password_hash")
  name          String
  phone         String?
  cpf           String?   @unique
  role          Role      @default(USER)
  createdAt     DateTime  @default(now()) @map("created_at")
  updatedAt     DateTime  @updatedAt @map("updated_at")

  orders        Order[]
  favorites     Favorite[]

  @@map("users")
}

model Product {
  id              String        @id @default(uuid())
  codigo          String        @unique
  modelo          String
  luminosidade    Luminosidade
  material        Material
  valorM2         Float         @map("valor_m2")
  larguraMaxCm    Int           @map("largura_max_cm")
  alturaMaxCm     Int           @map("altura_max_cm")
  areaMinM2       Float         @default(1.0) @map("area_min_m2")
  ambientes       String[]
  imagens         String[]
  descricao       String        @db.Text
  estoque         Int           @default(0)
  ativo           Boolean       @default(true)
  createdAt       DateTime      @default(now()) @map("created_at")
  updatedAt       DateTime      @updatedAt @map("updated_at")

  orderItems      OrderItem[]
  favorites       Favorite[]

  @@map("products")
}

model Order {
  id              String        @id @default(uuid())
  userId          String        @map("user_id")
  status          OrderStatus   @default(PENDING)
  subtotal        Float
  instalacao      Float
  frete           Float
  desconto        Float         @default(0)
  total           Float
  paymentMethod   PaymentMethod @map("payment_method")
  paymentStatus   PaymentStatus @default(PENDING) @map("payment_status")
  createdAt       DateTime      @default(now()) @map("created_at")
  updatedAt       DateTime      @updatedAt @map("updated_at")

  user            User          @relation(fields: [userId], references: [id])
  items           OrderItem[]
  shipping        Shipping?

  @@map("orders")
}

model OrderItem {
  id              String    @id @default(uuid())
  orderId         String    @map("order_id")
  productId       String    @map("product_id")
  widthCm         Int       @map("width_cm")
  heightCm        Int       @map("height_cm")
  areaCobravel    Float     @map("area_cobravel")
  pricePerM2      Float     @map("price_per_m2")
  quantity        Int       @default(1)
  subtotal        Float
  createdAt       DateTime  @default(now()) @map("created_at")

  order           Order     @relation(fields: [orderId], references: [id], onDelete: Cascade)
  product         Product   @relation(fields: [productId], references: [id])

  @@map("order_items")
}

model Shipping {
  id              String    @id @default(uuid())
  orderId         String    @unique @map("order_id")
  recipientName   String    @map("recipient_name")
  street          String
  number          String
  complement      String?
  neighborhood    String
  city            String
  state           String
  zipCode         String    @map("zip_code")
  trackingCode    String?   @map("tracking_code")
  createdAt       DateTime  @default(now()) @map("created_at")
  updatedAt       DateTime  @updatedAt @map("updated_at")

  order           Order     @relation(fields: [orderId], references: [id], onDelete: Cascade)

  @@map("shipping")
}

model Favorite {
  id          String    @id @default(uuid())
  userId      String    @map("user_id")
  productId   String    @map("product_id")
  createdAt   DateTime  @default(now()) @map("created_at")

  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  product     Product   @relation(fields: [productId], references: [id], onDelete: Cascade)

  @@unique([userId, productId])
  @@map("favorites")
}

enum Role {
  USER
  ADMIN
}

enum Luminosidade {
  Translucida
  Blackout
}

enum Material {
  Tecido
  PVC
  Madeira
  Bambu
}

enum OrderStatus {
  PENDING
  CONFIRMED
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
}

enum PaymentMethod {
  PIX
  CREDIT_CARD
  BOLETO
}

enum PaymentStatus {
  PENDING
  APPROVED
  REJECTED
  REFUNDED
}
```

**Validação:**
- [ ] Schema reflete PRD
- [ ] Relações corretas
- [ ] Enums definidos
- [ ] Indexes adequados

---

#### **Task 2.1.5: Gerar e rodar migrations**

```bash
cd backend

# Gerar migration
npx prisma migrate dev --name init

# Gerar Prisma Client
npx prisma generate
```

**Validação:**
- [ ] Migration criada
- [ ] Database criado
- [ ] Tabelas criadas
- [ ] Prisma Client gerado

---

### **2.2 Módulos Core do Backend**

#### **Task 2.2.1: Criar módulo Prisma**

**Arquivo:** `backend/src/prisma/prisma.service.ts`

```typescript
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect()
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }
}
```

**Arquivo:** `backend/src/prisma/prisma.module.ts`

```typescript
import { Module, Global } from '@nestjs/common'
import { PrismaService } from './prisma.service'

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
```

**Validação:**
- [ ] Prisma conectando
- [ ] Global module funcionando

---

#### **Task 2.2.2: Criar módulo Auth (JWT + Bcrypt)**

**Arquivo:** `backend/src/auth/auth.service.ts`

```typescript
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '../prisma/prisma.service'
import * as bcrypt from 'bcrypt'

const SALT_ROUNDS = 12

interface TokenPayload {
  sub: string
  email: string
  role: string
}

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(data: {
    email: string
    password: string
    name: string
    phone?: string
    cpf?: string
  }) {
    // Validar se email já existe
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    })

    if (existingUser) {
      throw new UnauthorizedException('E-mail já cadastrado')
    }

    // Hash da senha
    const passwordHash = await bcrypt.hash(data.password, SALT_ROUNDS)

    // Criar usuário
    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        passwordHash,
        name: data.name,
        phone: data.phone,
        cpf: data.cpf,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    })

    // Gerar token
    const token = await this.generateToken({
      sub: user.id,
      email: user.email,
      role: user.role,
    })

    return { user, token }
  }

  async login(email: string, password: string) {
    // Buscar usuário
    const user = await this.prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas')
    }

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash)

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas')
    }

    // Gerar token
    const token = await this.generateToken({
      sub: user.id,
      email: user.email,
      role: user.role,
    })

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token,
    }
  }

  private async generateToken(payload: TokenPayload): Promise<string> {
    return this.jwtService.sign(payload)
  }

  async validateUser(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    })
  }
}
```

**Validação:**
- [ ] Register funcionando
- [ ] Login funcionando
- [ ] Hash bcrypt com 12 rounds
- [ ] JWT gerado corretamente
- [ ] NUNCA retornar passwordHash

---

#### **Task 2.2.3: Criar Pricing Calculator no Backend**

**Arquivo:** `backend/src/pricing/pricing.service.ts`

```typescript
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

interface PricingInput {
  widthCm: number
  heightCm: number
  productId: string
  lossFactor?: number
  installationPercentage?: number
  freightCost?: number
  discountPercentage?: number
}

const PRICING_CONSTANTS = {
  CM_TO_METERS: 100,
  MIN_CHARGEABLE_AREA_M2: 1.0,
  DEFAULT_LOSS_FACTOR: 1.1,
  ROUNDING_DECIMAL_PLACES: 1,
  DEFAULT_INSTALLATION_PERCENTAGE: 0.1,
}

@Injectable()
export class PricingService {
  constructor(private prisma: PrismaService) {}

  async calculatePrice(input: PricingInput) {
    // Buscar produto
    const product = await this.prisma.product.findUnique({
      where: { id: input.productId },
    })

    if (!product) {
      throw new Error('Produto não encontrado')
    }

    // Validar dimensões
    if (
      input.widthCm < 1 ||
      input.widthCm > product.larguraMaxCm ||
      input.heightCm < 1 ||
      input.heightCm > product.alturaMaxCm
    ) {
      throw new Error('Dimensões inválidas para este produto')
    }

    const lossFactor = input.lossFactor ?? PRICING_CONSTANTS.DEFAULT_LOSS_FACTOR
    const installationPercentage =
      input.installationPercentage ??
      PRICING_CONSTANTS.DEFAULT_INSTALLATION_PERCENTAGE
    const freightCost = input.freightCost ?? 0
    const discountPercentage = input.discountPercentage ?? 0

    // PASSO 1: Área bruta
    const areaBruta =
      (input.widthCm / PRICING_CONSTANTS.CM_TO_METERS) *
      (input.heightCm / PRICING_CONSTANTS.CM_TO_METERS)

    // PASSO 2: Área ajustada
    const areaAjustada = areaBruta * lossFactor

    // PASSO 3: Arredondar
    const areaArredondada = this.roundUp(
      areaAjustada,
      PRICING_CONSTANTS.ROUNDING_DECIMAL_PLACES
    )

    // PASSO 4: Área cobrável
    const areaCobravel = Math.max(
      areaArredondada,
      PRICING_CONSTANTS.MIN_CHARGEABLE_AREA_M2
    )

    // PASSO 5: Preço base
    const precoBase = areaCobravel * product.valorM2

    // PASSO 6: Opcionais (a implementar)
    const subtotal = precoBase

    // PASSO 7: Instalação e Frete
    const instalacao = subtotal * installationPercentage
    const totalBruto = subtotal + instalacao + freightCost

    // PASSO 8: Desconto
    const desconto = totalBruto * (discountPercentage / 100)
    const totalFinal = totalBruto - desconto

    return {
      areaBruta,
      areaAjustada,
      areaCobravel,
      precoBase,
      subtotal,
      instalacao,
      frete: freightCost,
      totalBruto,
      desconto,
      totalFinal,
      product: {
        id: product.id,
        modelo: product.modelo,
        codigo: product.codigo,
      },
    }
  }

  private roundUp(value: number, decimals: number): number {
    const factor = Math.pow(10, decimals)
    return Math.ceil(value * factor) / factor
  }
}
```

**Validação:**
- [ ] Cálculo conforme Pricing Spec
- [ ] Validações de dimensões
- [ ] 8 passos implementados

---

**CHECKPOINT FASE 2:**
```
Antes de prosseguir para FASE 3:

✅ Backend roda sem erros (`npm run start:dev`)?
✅ Database conectado?
✅ Auth funcionando (register/login)?
✅ JWT protegendo rotas?
✅ CRUD de produtos funcionando?
✅ Pricing calculator funcionando?
✅ Validações ativas?

SOMENTE AVANÇAR se TODAS as validações acima estiverem OK!
```

---

## 🌐 FASE 3: TELAS & PÁGINAS (Frontend)

### **3.1 Páginas Principais (do Figma)**

#### **Task 3.1.1: Criar página Home**

**Arquivo:** `frontend/src/app/page.tsx`

```typescript
import { MainLayout } from '@/components/layouts/MainLayout'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative h-[600px] bg-brand-beige">
        <div className="container mx-auto flex h-full items-center px-4">
          <div className="max-w-xl">
            <h1 className="font-serif text-display text-brand-black">
              Transforme seu ambiente com elegância
            </h1>
            <p className="mt-6 text-body-lg text-brand-neutral-700">
              Persianas sob medida com qualidade premium para cada estilo
            </p>
            <div className="mt-8 flex gap-4">
              <Button size="lg" asChild>
                <Link href="/produtos">Ver Produtos</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/como-medir">Como Medir</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categorias */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-serif text-h1">
            Encontre a Persiana Perfeita
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Card Blackout */}
            <Link
              href="/produtos?luminosidade=Blackout"
              className="group relative overflow-hidden rounded-lg"
            >
              <div className="aspect-square bg-brand-neutral-200">
                {/* Imagem */}
              </div>
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-6">
                <div className="text-white">
                  <h3 className="text-h2 font-serif">Blackout</h3>
                  <p className="mt-2 text-body">
                    Controle total de luz e privacidade
                  </p>
                </div>
              </div>
            </Link>

            {/* Card Translúcida */}
            <Link
              href="/produtos?luminosidade=Translucida"
              className="group relative overflow-hidden rounded-lg"
            >
              <div className="aspect-square bg-brand-neutral-200">
                {/* Imagem */}
              </div>
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-6">
                <div className="text-white">
                  <h3 className="text-h2 font-serif">Translúcida</h3>
                  <p className="mt-2 text-body">Luz natural com privacidade</p>
                </div>
              </div>
            </Link>

            {/* Card Premium */}
            <Link
              href="/produtos?material=Madeira"
              className="group relative overflow-hidden rounded-lg"
            >
              <div className="aspect-square bg-brand-neutral-200">
                {/* Imagem */}
              </div>
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-6">
                <div className="text-white">
                  <h3 className="text-h2 font-serif">Premium</h3>
                  <p className="mt-2 text-body">Madeira e materiais nobres</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="bg-brand-beige-light py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-serif text-h1">
            Simples e Personalizado
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-black text-h2 font-bold text-white">
                1
              </div>
              <h3 className="mt-4 font-medium">Escolha o Modelo</h3>
              <p className="mt-2 text-small text-brand-neutral-700">
                Navegue por nosso catálogo
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-black text-h2 font-bold text-white">
                2
              </div>
              <h3 className="mt-4 font-medium">Informe as Medidas</h3>
              <p className="mt-2 text-small text-brand-neutral-700">
                Largura e altura em centímetros
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-black text-h2 font-bold text-white">
                3
              </div>
              <h3 className="mt-4 font-medium">Adicione ao Carrinho</h3>
              <p className="mt-2 text-small text-brand-neutral-700">
                Preço calculado automaticamente
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-black text-h2 font-bold text-white">
                4
              </div>
              <h3 className="mt-4 font-medium">Receba em Casa</h3>
              <p className="mt-2 text-small text-brand-neutral-700">
                Com instalação inclusa
              </p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
```

**Validação:**
- [ ] Hero section renderiza
- [ ] Cards de categoria funcionam
- [ ] Links corretos
- [ ] Responsivo
- [ ] Conforme Figma

---

#### **Task 3.1.2: Criar página de Produtos (Lista)**

**Arquivo:** `frontend/src/app/produtos/page.tsx`

```typescript
'use client'

import { MainLayout } from '@/components/layouts/MainLayout'
import { useProducts } from '@/hooks/useProducts'
import { ProductCard } from '@/components/products/ProductCard'
import { ProductFilters } from '@/components/products/ProductFilters'
import { Skeleton } from '@/components/ui/skeleton'
import { useSearchParams } from 'next/navigation'

export default function ProductsPage() {
  const searchParams = useSearchParams()

  const filters = {
    luminosidade: searchParams.get('luminosidade')?.split(','),
    material: searchParams.get('material')?.split(','),
    search: searchParams.get('search') || undefined,
  }

  const { data, isLoading, error } = useProducts(filters)

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="font-serif text-h1">Nossos Produtos</h1>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Sidebar Filtros */}
          <aside className="lg:col-span-1">
            <ProductFilters />
          </aside>

          {/* Produtos Grid */}
          <div className="lg:col-span-3">
            {isLoading && (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="aspect-square" />
                ))}
              </div>
            )}

            {error && (
              <div className="text-center text-brand-error">
                Erro ao carregar produtos. Tente novamente.
              </div>
            )}

            {data && (
              <>
                <div className="mb-6 text-small text-brand-neutral-700">
                  {data.total} produtos encontrados
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {data.products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {data.totalPages > 1 && (
                  <div className="mt-12 flex justify-center">
                    {/* Implementar pagination */}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
```

**Validação:**
- [ ] Lista produtos
- [ ] Filtros funcionam
- [ ] Loading states
- [ ] Error handling
- [ ] Paginação

---

#### **Task 3.1.3: Criar ProductCard component**

**Arquivo:** `frontend/src/components/products/ProductCard.tsx`

```typescript
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/lib/utils/formatters'
import type { Product } from '@/types/product'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const handleAddToFavorites = (e: React.MouseEvent) => {
    e.preventDefault()
    // Implementar
  }

  return (
    <Link
      href={`/produtos/${product.id}`}
      className="group block overflow-hidden rounded-lg border border-brand-neutral-200 bg-white transition hover:shadow-lg"
    >
      {/* Imagem */}
      <div className="relative aspect-square bg-brand-neutral-100">
        {product.imagens[0] ? (
          <Image
            src={product.imagens[0]}
            alt={product.modelo}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-brand-neutral-400">Sem imagem</span>
          </div>
        )}

        {/* Favorito */}
        <button
          onClick={handleAddToFavorites}
          className="absolute right-4 top-4 rounded-full bg-white p-2 shadow-md transition hover:bg-brand-neutral-50"
        >
          <Heart className="h-5 w-5" />
        </button>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex gap-2">
          <Badge variant="secondary">{product.luminosidade}</Badge>
          <Badge variant="outline">{product.material}</Badge>
        </div>

        <h3 className="mt-3 font-medium">{product.modelo}</h3>
        <p className="text-xs text-brand-neutral-600">{product.codigo}</p>

        <div className="mt-4 flex items-baseline gap-1">
          <span className="text-small text-brand-neutral-600">A partir de</span>
          <span className="text-h2 font-bold">
            {formatCurrency(product.valorM2)}
          </span>
          <span className="text-small text-brand-neutral-600">/m²</span>
        </div>

        <Button className="mt-4 w-full" size="sm">
          Ver Detalhes
        </Button>
      </div>
    </Link>
  )
}
```

**Validação:**
- [ ] Card renderiza corretamente
- [ ] Imagem placeholder funciona
- [ ] Badges corretos
- [ ] Preço formatado
- [ ] Hover states

---

#### **Task 3.1.4: Criar página de Produto Individual**

**Arquivo:** `frontend/src/app/produtos/[id]/page.tsx`

```typescript
'use client'

import { use } from 'react'
import { MainLayout } from '@/components/layouts/MainLayout'
import { useProduct } from '@/hooks/useProducts'
import { ProductDimensionForm } from '@/components/products/ProductDimensionForm'
import { ProductGallery } from '@/components/products/ProductGallery'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/lib/utils/formatters'

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params)
  const { data: product, isLoading, error } = useProduct(id)

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <Skeleton className="aspect-square" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        </div>
      </MainLayout>
    )
  }

  if (error || !product) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-h1">Produto não encontrado</h1>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Galeria */}
          <ProductGallery images={product.imagens} alt={product.modelo} />

          {/* Info & Form */}
          <div>
            <div className="flex gap-2">
              <Badge>{product.luminosidade}</Badge>
              <Badge variant="outline">{product.material}</Badge>
            </div>

            <h1 className="mt-4 font-serif text-h1">{product.modelo}</h1>
            <p className="text-body text-brand-neutral-600">{product.codigo}</p>

            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-small text-brand-neutral-600">
                A partir de
              </span>
              <span className="text-h1 font-bold">
                {formatCurrency(product.valorM2)}
              </span>
              <span className="text-body text-brand-neutral-600">/m²</span>
            </div>

            <div className="mt-8 rounded-lg border border-brand-neutral-200 bg-brand-neutral-50 p-6">
              <h2 className="font-medium">Especificações</h2>
              <dl className="mt-4 space-y-2 text-small">
                <div className="flex justify-between">
                  <dt className="text-brand-neutral-600">Largura máxima:</dt>
                  <dd className="font-medium">{product.larguraMaxCm}cm</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-brand-neutral-600">Altura máxima:</dt>
                  <dd className="font-medium">{product.alturaMaxCm}cm</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-brand-neutral-600">Material:</dt>
                  <dd className="font-medium">{product.material}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-brand-neutral-600">Luminosidade:</dt>
                  <dd className="font-medium">{product.luminosidade}</dd>
                </div>
              </dl>
            </div>

            <div className="mt-8">
              <h2 className="mb-4 font-medium">Descrição</h2>
              <p className="text-body text-brand-neutral-700">
                {product.descricao}
              </p>
            </div>

            {/* Form de Medidas */}
            <div className="mt-12 rounded-lg border border-brand-black bg-white p-6">
              <h2 className="mb-4 font-serif text-h2">Personalize sua Persiana</h2>
              <ProductDimensionForm product={product} />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
```

**Validação:**
- [ ] Página carrega produto
- [ ] Galeria funciona
- [ ] Especificações corretas
- [ ] Form de dimensões funciona
- [ ] Responsivo

---

**CHECKPOINT FASE 3:**
```
✅ Todas páginas conforme Figma?
✅ Componentes reutilizáveis?
✅ Loading/error states?
✅ Responsivo?
✅ Validações funcionando?

SOMENTE AVANÇAR se OK!
```

---

## 📊 FASE 4: ADMIN PANEL

### **4.1 Dashboard Admin**

#### **Task 4.1.1: Criar layout admin**

**Arquivo:** `frontend/src/app/admin/layout.tsx`

```typescript
'use client'

import { useAuthStore } from '@/store/auth-store'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { AdminSidebar } from '@/components/admin/AdminSidebar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isAdmin = useAuthStore((state) => state.isAdmin())
  const router = useRouter()

  useEffect(() => {
    if (!isAdmin) {
      router.push('/login')
    }
  }, [isAdmin, router])

  if (!isAdmin) {
    return null
  }

  return (
    <div className="flex min-h-screen bg-brand-neutral-50">
      <AdminSidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}
```

**Validação:**
- [ ] Só admins acessam
- [ ] Redirect funciona
- [ ] Layout renderiza

---

#### **Task 4.1.2: Criar dashboard com métricas**

**Arquivo:** `frontend/src/app/admin/page.tsx`

```typescript
'use client'

import { Card } from '@/components/ui/card'
import { Package, ShoppingCart, Users, DollarSign } from 'lucide-react'

export default function AdminDashboard() {
  // TODO: Buscar métricas da API

  return (
    <div>
      <h1 className="text-h1 font-serif">Dashboard</h1>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-small text-brand-neutral-600">Vendas Hoje</p>
              <p className="mt-2 text-h1 font-bold">R$ 0</p>
            </div>
            <DollarSign className="h-8 w-8 text-brand-success" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-small text-brand-neutral-600">Pedidos</p>
              <p className="mt-2 text-h1 font-bold">0</p>
            </div>
            <ShoppingCart className="h-8 w-8 text-brand-info" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-small text-brand-neutral-600">Produtos</p>
              <p className="mt-2 text-h1 font-bold">0</p>
            </div>
            <Package className="h-8 w-8 text-brand-warning" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-small text-brand-neutral-600">Clientes</p>
              <p className="mt-2 text-h1 font-bold">0</p>
            </div>
            <Users className="h-8 w-8 text-brand-black" />
          </div>
        </Card>
      </div>
    </div>
  )
}
```

**Validação:**
- [ ] Cards renderizam
- [ ] Métricas funcionam
- [ ] Icons corretos

---

## 🚀 FASE 5: DEPLOYMENT

### **5.1 Preparação para Deploy**

#### **Task 5.1.1: Configurar variáveis de ambiente de produção**

**Arquivo:** `frontend/.env.production.example`

```env
NEXT_PUBLIC_API_URL=https://api.rosachic.com.br
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=
```

**Arquivo:** `backend/.env.production.example`

```env
NODE_ENV=production
DATABASE_URL=
JWT_SECRET=
CORS_ORIGIN=https://rosachic.com.br
```

**Validação:**
- [ ] .env.example sem secrets
- [ ] Todos valores necessários documentados

---

#### **Task 5.1.2: Configurar Vercel (Frontend)**

**Arquivo:** `vercel.json`

```json
{
  "buildCommand": "cd frontend && npm run build",
  "outputDirectory": "frontend/.next",
  "framework": "nextjs",
  "env": {
    "NEXT_PUBLIC_API_URL": "@api-url"
  }
}
```

**Validação:**
- [ ] Deploy funciona
- [ ] Env vars configuradas
- [ ] HTTPS ativo

---

#### **Task 5.1.3: Configurar Railway/Fly.io (Backend)**

**Arquivo:** `railway.json` (ou `fly.toml`)

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "DOCKERFILE",
    "dockerfilePath": "backend/Dockerfile"
  },
  "deploy": {
    "startCommand": "node dist/main.js",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

**Validação:**
- [ ] Backend rodando
- [ ] Database conectado
- [ ] Migrations rodaram

---

**CHECKPOINT FINAL:**
```
✅ Frontend no ar (Vercel)?
✅ Backend no ar (Railway)?
✅ Database (Supabase/Railway)?
✅ HTTPS funcionando?
✅ Variáveis de ambiente configuradas?
✅ Testes E2E passando em produção?
✅ Monitoring configurado?
✅ Backup automático ativo?

PROJETO COMPLETO!
```

---

## 📌 RESUMO GERAL DO PLANO

```
FASE 1: FRONTEND (Tasks 1.1 - 1.10)
├── Setup (Next.js, TypeScript, Tailwind)
├── Design System (Cores, Fonts, Components)
├── Tipos & Validações (Zod)
├── Pricing Calculator (Client-side)
└── State Management (Zustand)

FASE 2: BACKEND (Tasks 2.1 - 2.2)
├── Setup (NestJS, Prisma, PostgreSQL)
├── Auth (JWT, Bcrypt)
├── Modules (Products, Orders, Users)
└── Pricing Calculator (Server-side)

FASE 3: PÁGINAS (Tasks 3.1)
├── Home
├── Lista de Produtos
├── Produto Individual
├── Carrinho
├── Checkout
└── Conta do Usuário

FASE 4: ADMIN (Tasks 4.1)
├── Dashboard
├── Gestão de Produtos
├── Gestão de Pedidos
└── Relatórios

FASE 5: DEPLOYMENT (Tasks 5.1)
├── Docker
├── CI/CD
├── Vercel (Frontend)
└── Railway (Backend)
```

---

**REGRA DE OURO:**
```
Cada task DEVE ser:
1. Completada 100%
2. Testada
3. Validada (checklist ✓)
4. Commitada

NUNCA pular para próxima task sem validar atual!
```
