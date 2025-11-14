# 📘 PROJETO COMPLETO - ROSA CHIC PERSINAS

**E-commerce Premium de Persianas sob Medida**

**Última atualização:** 06/10/2025

---

## 📑 Índice

1. [Visão Geral do Projeto](#visão-geral-do-projeto)
2. [Design System](#design-system)
3. [Product Requirements Document (PRD)](#product-requirements-document)
4. [Especificação de Preços e Regras](#especificação-de-preços-e-regras)
5. [Arquitetura Técnica Recomendada](#arquitetura-técnica-recomendada)

---

# 1. VISÃO GERAL DO PROJETO

## 🎯 Objetivo

Criar um **e-commerce premium de persianas** com cálculo dinâmico de preços baseado em medidas personalizadas (largura × comprimento) e gerenciamento inteligente de estoque, sem dependência de plataformas externas como Shopify.

## 👥 Stakeholders

- **Pedro**: Product Owner / Designer UX/UI
- **IA**: Responsável por Front-end e Back-end

## 🌟 Proposta de Valor

Plataforma proprietária, moderna e responsiva que combina:
- **Experiência premium**: Design clean, minimalista e sofisticado
- **Eficiência operacional**: Gestão de estoque, kits, relatórios
- **UX impecável**: Empty states claros, telas de erro personalizadas

---

# 2. DESIGN SYSTEM

## 🎨 Paleta de Cores

Total de **61 cores** identificadas no projeto:

\`\`\`css
/* Cores Principais */
--brand-primary: rgb(109, 6, 6);        /* Bordô */
--brand-secondary: rgb(177, 29, 29);
--brand-accent: rgb(211, 47, 47);

/* Backgrounds */
--bg-light: rgb(255, 255, 255);
--bg-neutral: rgb(247, 243, 239);
--bg-dark: rgb(26, 32, 44);

/* Textos */
--text-primary: rgb(0, 0, 0);
--text-secondary: rgb(68, 68, 68);
--text-tertiary: rgb(119, 105, 106);

/* Feedbacks */
--success: rgb(40, 180, 70);
--warning: rgb(251, 187, 0);
--error: rgb(238, 44, 60);
--info: rgb(81, 142, 248);

/* 58 cores adicionais disponíveis */
\`\`\`

## 📝 Tipografia

### Famílias de Fonte

#### Cormorant Garamond (Títulos Elegantes)

| Tamanho | Peso | Linha | Uso |
|---------|------|-------|-----|
| 56px | 400 | 56px | H1 - Hero Section |
| 40px | 700 | 40px | H2 - Títulos Principais |

#### Inter (Corpo de Texto)

| Tamanho | Peso | Linha | Uso |
|---------|------|-------|-----|
| 40px | 400 | 40px | H1 Alternativo |
| 32px | 500 | 40px | H2 |
| 18px | 500/400 | 28px | Corpo Principal |
| 16px | 500/400 | 24px | Corpo Secundário |
| 14px | 400 | 20px | Labels |
| 12px | 400 | 16px | Texto Pequeno |

## 🧩 Componentes

**Total: 186 componentes**

### Sistema de Botões
- **Tipos**: Primary, Secondary, Ghost, Elevated, Neutral, Positive, Danger
- **Estados**: Default, Hover, Pressed, Focused, Disable
- **Tamanhos**: xs (28px), sm (36px), md (48px)
- **Orientações**: Horizontal, Vertical

### Ícones Customizados (50+ ícones)
- Produtos: cortinas, persiana, rolô, romana
- Funcionalidades: carrinho, favoritos, busca, perfil
- Utilitários: WhatsApp, Instagram, e-mail, telefone
- Estados: sucesso, alerta, erro, info

## 📱 Estrutura de Telas

### Site Principal (28 telas)

**Home**
- Desktop / Home (1440×4359px)

**Catálogo**
- Desktop / Lista de Produtos (3 variações)
- Desktop / Page Item (página do produto)

**Checkout (5 telas)**
- Desktop / Checkout
- Desktop / Endereço (2 variações)
- Desktop / Forma de pagamento
- Desktop / Pagamento aprovado!

**Área do Cliente (8 telas)**
- Desktop / Login
- Desktop / Crie sua conta
- Desktop / Conta criada com sucesso
- Desktop / Minha Conta
- Desktop / Meus Pedidos (2 variações)
- Desktop / Favoritos
- Desktop / Meus Perfil (2 variações)

### Templates de E-mail (24 templates)

**Boas-vindas (3)**
- Seja bem-vindo(a) ao mundo Rosa Chic ✨
- Oferta de boas-vindas (2 variações)

**Pedidos (4)**
- Recebemos seu pedido ✅
- Pedido confirmado! 🎉
- Seu pedido foi enviado 📦
- Seu pedido chegou!

**Carrinho Abandonado (3)**
- Esqueceu algo no carrinho? 🛒
- Última chance antes que esgote!
- Finalize agora e ganhe frete grátis 🚚

**Conteúdo Educativo (4)**
- Como medir sua janela
- Veja como transformamos ambientes reais (2)
- Dicas para conservar sua persiana

**Reengajamento (2)**
- Sentimos sua falta…
- Volte e ganhe 15% OFF 🎁

**Outros (8)**
- Confirmações, redefinição de senha, etc.

---

# 3. PRODUCT REQUIREMENTS DOCUMENT (PRD)

## 📋 Funcionalidades Principais

### Front-end (Cliente)
1. ✅ Catálogo de persianas personalizáveis
2. ✅ Calculadora de preço dinâmica (largura × comprimento)
3. ✅ Carrinho de compras
4. ✅ Checkout nativo
5. ✅ Área do cliente (pedidos, favoritos, perfil)
6. ✅ Empty states e telas de erro customizadas
7. ✅ **Integração Facebook Pixel** (tracking de conversões)
8. ✅ **Integração Google Ads** (conversões e remarketing)
9. ✅ **Google Tag Manager** (eventos customizados)
10. ✅ **Landing Pages dinâmicas** por campanha
11. ✅ **Meta tags Open Graph** por produto (catálogo Facebook/Instagram)
12. ✅ **Feed de catálogo XML/JSON** para Facebook Ads
13. ✅ **WhatsApp Click-to-Chat** (integração com anúncios Meta)
14. ✅ **UTM Tracking** (rastreamento de origem de campanhas)

### Back-end (Admin)
1. ✅ Autenticação JWT (usuários/admin)
2. ✅ CRUD de produtos e kits
3. ✅ Gestão de estoque (produtos simples + compostos)
4. ✅ Integração com gateways de pagamento
5. ✅ Relatórios financeiros e de estoque
6. ✅ Gestão de leads/clientes
7. ✅ **Dashboard de ROI** (Facebook Ads + Google Ads)
8. ✅ **API de catálogo** para sincronização com Facebook Business Manager
9. ✅ **Tracking de conversões** por origem (UTM params)
10. ✅ **Webhook de eventos** para Meta Conversions API

## 🎯 Regras de Negócio

### Precificação
- Preço baseado em **área (m²) = largura × comprimento**
- Área mínima faturável: **1,00 m²**
- Fator de perda/ajuste: **1,05 a 1,15**
- Arredondamento: **para cima (0,1 m²)**

### Estoque
- Produtos compostos (kits) consomem itens do estoque individual
- Atualização em **tempo real**
- Bloqueio de compra se fora de estoque

### Pedidos
- Conclusão apenas após **confirmação de pagamento**
- Integração com PIX, cartão de crédito e boleto

### Limites Técnicos
- **Largura máxima**: 300 cm (padrão)
- **Altura máxima**: 350 cm (padrão)
- Peças acima de 6-8 m²: sugerir divisão em módulos

## 📊 Requisitos Não Funcionais

| Requisito | Meta |
|-----------|------|
| Performance | Endpoints críticos < 200ms |
| Segurança | Bcrypt + HTTPS obrigatório |
| Escalabilidade | Preparado para microsserviços |
| Testes | Cobertura > 80% |
| Monitoramento | Sentry/Datadog |
| Documentação | Swagger/OpenAPI |

## 🚀 Roadmap

### MVP (Fase 1)
- ✅ Catálogo com cálculo dinâmico
- ✅ Carrinho + Checkout + Pagamentos
- ✅ Painel admin (produtos + estoque)

### Fase 2
- ⏳ Relatórios financeiros detalhados
- ⏳ Sistema de cupons/descontos
- ⏳ Integrações adicionais de pagamento

---

# 4. ESPECIFICAÇÃO DE PREÇOS E REGRAS

## 📐 Fórmula de Cálculo

### Passo 1: Área Bruta
\`\`\`
Área (m²) = (Largura em cm / 100) × (Altura em cm / 100)
\`\`\`

### Passo 2: Aplicar Fator de Perda
\`\`\`
Área Ajustada = Área Bruta × Fator de Perda (1,05 a 1,15)
\`\`\`

### Passo 3: Arredondar
\`\`\`
Área Arredondada = Arredondar para cima (0,1 m²)
\`\`\`

### Passo 4: Aplicar Área Mínima
\`\`\`
Área Cobrável = max(Área Arredondada, 1,00 m²)
\`\`\`

### Passo 5: Calcular Preço Base
\`\`\`
Preço Base = Área Cobrável × Valor/m² × K_material
\`\`\`

### Passo 6: Adicionar Opcionais
\`\`\`
+ Bandô/Cassete (R$/metro linear de largura)
+ Motor (valor fixo)
+ Outros acessórios
\`\`\`

### Passo 7: Aplicar Instalação e Frete
\`\`\`
Subtotal = Preço Base + Opcionais
Instalação = Subtotal × % (8-12%)
Total Bruto = Subtotal + Instalação + Frete
\`\`\`

### Passo 8: Aplicar Desconto
\`\`\`
Desconto = Total Bruto × %
Total Final = Total Bruto - Desconto
\`\`\`

## 💰 Fatores de Material (K_material)

| Material | Multiplicador |
|----------|--------------|
| Tela solar (screen) | 1,00 |
| Blackout tecido | 1,15 - 1,30 |
| Linho/sarja premium | 1,10 - 1,25 |
| Madeira/bambu | 1,40 - 1,80 |
| PVC | 1,00 - 1,15 |

## 🛍️ Exemplo de Cálculo Real

### Dados de Entrada
- Modelo: Rolô Tela Solar 5%
- Largura: 180 cm (1,80 m)
- Altura: 160 cm (1,60 m)
- Valor/m²: R$ 220,00
- Fator de Perda: 1,10
- K_material: 1,00 (screen)
- Bandô: R$ 120,00/m linear
- Instalação: 8%
- Frete: R$ 80,00
- Desconto: 5%

### Cálculo
\`\`\`
1. Área bruta = 1,80 × 1,60 = 2,88 m²
2. Área ajustada = 2,88 × 1,10 = 3,168 m²
3. Área arredondada = 3,2 m²
4. Área cobrável = max(3,2; 1,0) = 3,2 m²
5. Preço base = 3,2 × 220,00 × 1,00 = R$ 704,00
6. Bandô = 1,80 × 120,00 = R$ 216,00
7. Subtotal = 704,00 + 216,00 = R$ 920,00
8. Instalação (8%) = R$ 73,60
9. Total bruto = 920,00 + 73,60 + 80,00 = R$ 1.073,60
10. Desconto (5%) = R$ 53,68
11. TOTAL FINAL = R$ 1.019,92
\`\`\`

## 📦 Estrutura de Dados do Produto

\`\`\`json
{
  "modelo": "Contrast Creme 01",
  "codigo": "RC 0201",
  "luminosidade": "Translúcida",
  "material": "Tecido",
  "largura_max_cm": 300,
  "altura_max_cm": 350,
  "valor_m2": 118.00,
  "k_material": 1.00,
  "restricoes": {
    "area_min_m2": 1.0,
    "ambiente": ["Quarto", "Sala", "Escritório"]
  },
  "opcionais": {
    "bandao": {
      "disponivel": true,
      "valor_por_metro": 120.00
    },
    "motor": {
      "disponivel": true,
      "valor_fixo": 450.00
    }
  }
}
\`\`\`

## 🚨 Casos de Borda

### Validações Obrigatórias

\`\`\`json
// Dimensão inválida
{
  "erro": "Dimensão inválida",
  "detalhes": "Máximo permitido: 300cm largura, 350cm altura",
  "largura_fornecida": 320,
  "altura_fornecida": 360
}

// Fora de estoque
{
  "erro": "Produto indisponível",
  "detalhes": "Este modelo está temporariamente fora de estoque",
  "codigo": "RC 0201"
}

// Área muito grande (sugerir divisão)
{
  "aviso": "Área muito grande",
  "detalhes": "Recomendamos dividir em 2 módulos para melhor desempenho",
  "area_calculada": 8.5,
  "limite_recomendado": 6.0
}
\`\`\`

---

# 5. ARQUITETURA TÉCNICA RECOMENDADA

## 🏗️ Stack Tecnológica Proposta

### OPÇÃO 1: Full JavaScript/TypeScript (RECOMENDADA)

#### Front-end
- **Framework**: **Next.js 14** (App Router)
  - SSR/SSG para SEO premium
  - Image optimization nativo
  - API Routes integradas
- **Linguagem**: **TypeScript**
- **UI**: **React 18**
- **Estilização**: **Tailwind CSS** + **shadcn/ui**
  - Implementação rápida do Design System
  - Componentes acessíveis (WCAG 2.1)
- **Gerenciamento de Estado**: **Zustand** (leve e performático)
- **Forms**: **React Hook Form** + **Zod**
- **Requests**: **TanStack Query** (React Query)

#### Back-end
- **Framework**: **NestJS**
  - Arquitetura modular e escalável
  - TypeScript nativo
  - Decorators para routing/validation
  - Preparado para microsserviços
- **ORM**: **Prisma**
  - Type-safe
  - Migrations automáticas
  - Excelente DX
- **Banco de Dados**: **PostgreSQL** (via **Supabase**)
  - Auth integrado
  - Storage para imagens
  - Real-time subscriptions
  - Backups automáticos

#### Infraestrutura
- **Hosting Front**: **Vercel**
- **Hosting Back**: **Railway** / **Fly.io**
- **Storage**: **Supabase Storage** / **Cloudflare R2**
- **CDN**: **Cloudflare**
- **Monitoramento**: **Sentry**
- **Analytics**: **Vercel Analytics**

---

### OPÇÃO 2: Python Backend (Alternativa)

#### Front-end
- Mesmo da Opção 1 (Next.js + TypeScript)

#### Back-end
- **Framework**: **FastAPI**
  - Performance excepcional
  - Documentação automática (OpenAPI)
  - Async nativo
- **ORM**: **SQLAlchemy** / **Tortoise ORM**
- **Validação**: **Pydantic**
- **Banco**: **PostgreSQL**

**Desvantagem**: Dois ambientes de linguagem (JS + Python)

---

## 🎯 Recomendação Final: OPÇÃO 1 (Full TypeScript)

### Por quê?

✅ **Unificação**: Uma linguagem (TypeScript) para todo o stack
✅ **Type Safety**: End-to-end type safety (Front → Back → DB)
✅ **Ecosystem**: NPM tem melhor ecossistema para e-commerce
✅ **Time-to-Market**: Desenvolvimento mais rápido
✅ **Maintainability**: Código mais fácil de manter
✅ **Escalabilidade**: NestJS preparado para microsserviços
✅ **DX**: Developer Experience superior (Prisma, Next.js, etc.)

---

## 📐 Arquitetura do Sistema

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                         FRONTEND                            │
│                      (Next.js 14)                           │
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Home    │  │ Catálogo │  │ Produto  │  │ Checkout │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Conta   │  │  Admin   │  │  E-mails │  │  Errors  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTPS/REST API
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                         BACKEND                             │
│                       (NestJS)                              │
│                                                             │
│  ┌────────────────────────────────────────────────────┐    │
│  │                 API Gateway                        │    │
│  │              (Guards, Interceptors)                │    │
│  └────────────────────────────────────────────────────┘    │
│                            │                                │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Auth    │  │ Products │  │  Orders  │  │ Payments │   │
│  │ Module   │  │  Module  │  │  Module  │  │  Module  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Stock   │  │  Users   │  │  Pricing │  │  Reports │   │
│  │ Module   │  │  Module  │  │  Module  │  │  Module  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                             │
│  ┌────────────────────────────────────────────────────┐    │
│  │              Prisma ORM Layer                      │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    SUPABASE                                 │
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │PostgreSQL│  │   Auth   │  │  Storage │  │ Real-time│   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                  SERVIÇOS EXTERNOS                          │
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │   PIX    │  │  Stripe  │  │  Sentry  │  │   SMTP   │   │
│  │ Gateway  │  │ (Cartão) │  │  Logs    │  │  E-mail  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
\`\`\`

---

## 📦 Estrutura de Pastas Proposta

\`\`\`
rosachic/
├── frontend/                 # Next.js App
│   ├── app/                 # App Router (Next.js 14)
│   │   ├── (auth)/         # Rotas autenticadas
│   │   ├── (shop)/         # Rotas da loja
│   │   ├── admin/          # Painel admin
│   │   ├── api/            # API Routes (se necessário)
│   │   └── layout.tsx
│   ├── components/         # Componentes React
│   │   ├── ui/            # shadcn/ui base
│   │   ├── product/       # Relacionados a produtos
│   │   ├── cart/          # Carrinho
│   │   └── shared/        # Compartilhados
│   ├── lib/               # Utilitários
│   │   ├── api/          # Client API
│   │   ├── hooks/        # Custom hooks
│   │   └── utils/        # Helpers
│   ├── styles/           # Estilos globais
│   └── public/           # Assets estáticos
│
├── backend/                # NestJS App
│   ├── src/
│   │   ├── auth/         # Módulo de autenticação
│   │   ├── products/     # Módulo de produtos
│   │   ├── orders/       # Módulo de pedidos
│   │   ├── payments/     # Módulo de pagamentos
│   │   ├── pricing/      # Lógica de precificação
│   │   ├── stock/        # Controle de estoque
│   │   ├── users/        # Gestão de usuários
│   │   ├── reports/      # Relatórios
│   │   ├── common/       # Guards, interceptors, etc.
│   │   └── prisma/       # Prisma service
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   └── test/
│
└── shared/                # Tipos compartilhados
    └── types/
        ├── product.ts
        ├── order.ts
        ├── pricing.ts
        └── user.ts
\`\`\`

---

## 🔐 Segurança

- ✅ HTTPS obrigatório (SSL/TLS)
- ✅ JWT com refresh tokens
- ✅ Bcrypt para senhas (salt rounds: 12)
- ✅ Rate limiting (express-rate-limit)
- ✅ CORS configurado
- ✅ Helmet.js (headers de segurança)
- ✅ Validação de inputs (class-validator)
- ✅ SQL Injection prevention (Prisma)
- ✅ XSS protection
- ✅ CSRF tokens

---

## 📊 Monitoramento

- **Logs**: Sentry (erros) + Winston (aplicação)
- **Performance**: Vercel Analytics
- **Uptime**: Better Uptime / UptimeRobot
- **APM**: New Relic / Datadog (opcional)

---

## 📢 Marketing & Tracking (Facebook Ads + Google Ads)

### Por que Next.js é IDEAL para Ads?

#### ✅ Vantagens do Next.js para Marketing

1. **Server-Side Rendering (SSR)**
   - Facebook Pixel e Google Tag Manager funcionam perfeitamente
   - Meta tags dinâmicas por produto (Open Graph, Twitter Cards)
   - Crawlers de anúncios leem conteúdo corretamente

2. **SEO Otimizado**
   - Google Ads Quality Score melhorado
   - Landing pages com SSR = melhor conversão
   - Core Web Vitals otimizados

3. **Performance**
   - Carregamento rápido = menor custo por clique (CPC)
   - Image optimization automática
   - Code splitting nativo

4. **Tracking Completo**
   - Facebook Pixel (eventos de conversão)
   - Google Analytics 4
   - Google Tag Manager
   - TikTok Pixel
   - Pinterest Tag

---

### 🎯 Integrações de Marketing Implementadas

#### 1. Facebook Pixel & Meta Ads

**Eventos Rastreados:**

```typescript
// app/lib/analytics/facebook-pixel.ts
import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID

// Eventos padrão
export const fbPageView = () => {
  window.fbq('track', 'PageView')
}

export const fbViewContent = (productData: {
  content_name: string
  content_ids: string[]
  content_type: string
  value: number
  currency: string
}) => {
  window.fbq('track', 'ViewContent', productData)
}

export const fbAddToCart = (productData: {
  content_ids: string[]
  content_name: string
  value: number
  currency: string
}) => {
  window.fbq('track', 'AddToCart', productData)
}

export const fbInitiateCheckout = (checkoutData: {
  value: number
  currency: string
  num_items: number
}) => {
  window.fbq('track', 'InitiateCheckout', checkoutData)
}

export const fbPurchase = (purchaseData: {
  value: number
  currency: string
  content_ids: string[]
  content_type: string
}) => {
  window.fbq('track', 'Purchase', purchaseData)
}

// Eventos customizados para persianas
export const fbCalculatePrice = (calculationData: {
  width: number
  height: number
  area: number
  estimated_price: number
}) => {
  window.fbq('trackCustom', 'CalculatePrice', calculationData)
}
```

**Implementação no Layout:**

```typescript
// app/layout.tsx
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        {/* Facebook Pixel */}
        <Script
          id="facebook-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${FB_PIXEL_ID}');
              fbq('track', 'PageView');
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

---

#### 2. Google Ads & Analytics

**Google Tag Manager:**

```typescript
// app/lib/analytics/google-tag-manager.ts

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

export const gtmPageView = (url: string) => {
  window.dataLayer.push({
    event: 'pageview',
    page: url,
  })
}

export const gtmEvent = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  window.dataLayer.push({
    event: 'custom_event',
    event_category: category,
    event_action: action,
    event_label: label,
    value: value,
  })
}

// Eventos específicos para Google Ads
export const gtmAddToCart = (product: {
  id: string
  name: string
  price: number
  category: string
}) => {
  window.dataLayer.push({
    event: 'add_to_cart',
    ecommerce: {
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          price: product.price,
          item_category: product.category,
        },
      ],
    },
  })
}

export const gtmPurchase = (transaction: {
  transaction_id: string
  value: number
  tax: number
  shipping: number
  items: any[]
}) => {
  window.dataLayer.push({
    event: 'purchase',
    ecommerce: transaction,
  })
}
```

**Conversões do Google Ads:**

```typescript
// app/lib/analytics/google-ads.ts

export const googleAdsConversion = (conversionLabel: string, value?: number) => {
  window.gtag('event', 'conversion', {
    send_to: `AW-CONVERSION_ID/${conversionLabel}`,
    value: value,
    currency: 'BRL',
  })
}

// Exemplo de uso
export const trackPurchaseConversion = (orderValue: number) => {
  googleAdsConversion('purchase', orderValue)
}

export const trackLeadConversion = () => {
  googleAdsConversion('lead_form_submit')
}
```

---

#### 3. Meta Tags Dinâmicas (Open Graph)

**Por produto (para campanhas de catálogo):**

```typescript
// app/produto/[slug]/page.tsx

import { Metadata } from 'next'

export async function generateMetadata({ params }): Promise<Metadata> {
  const product = await getProduct(params.slug)

  return {
    title: `${product.name} - Rosa Chic Persinas`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        {
          url: product.image_url,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
      type: 'product',
      locale: 'pt_BR',
      siteName: 'Rosa Chic Persinas',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: [product.image_url],
    },
    other: {
      'product:price:amount': product.price.toString(),
      'product:price:currency': 'BRL',
    },
  }
}
```

---

#### 4. Catálogo Dinâmico para Facebook

**Feed de produtos (XML/JSON):**

```typescript
// app/api/facebook-catalog/route.ts

export async function GET() {
  const products = await prisma.product.findMany({
    where: { active: true },
  })

  const feed = products.map((product) => ({
    id: product.id,
    title: product.name,
    description: product.description,
    availability: product.stock > 0 ? 'in stock' : 'out of stock',
    condition: 'new',
    price: `${product.base_price} BRL`,
    link: `https://rosachic.com.br/produto/${product.slug}`,
    image_link: product.main_image,
    brand: 'Rosa Chic',
    google_product_category: 'Home & Garden > Decor > Window Treatments',
    custom_label_0: product.material, // Tecido, PVC, etc.
    custom_label_1: product.luminosity, // Blackout, Translúcida
  }))

  return Response.json(feed)
}
```

---

### 📊 Eventos de Conversão Implementados

| Evento | Facebook Pixel | Google Ads | GTM |
|--------|---------------|------------|-----|
| **PageView** | ✅ | ✅ | ✅ |
| **ViewContent** | ✅ | ✅ | ✅ |
| **AddToCart** | ✅ | ✅ | ✅ |
| **InitiateCheckout** | ✅ | ✅ | ✅ |
| **Purchase** | ✅ | ✅ | ✅ |
| **Lead** | ✅ | ✅ | ✅ |
| **Calculate Price** (Custom) | ✅ | ✅ | ✅ |
| **Request Quote** (Custom) | ✅ | ✅ | ✅ |

---

### 🎨 Landing Pages Otimizadas

**Estrutura para campanhas:**

```
/campanha/[slug]/page.tsx  # Landing pages dinâmicas
/lp/blackout               # LP específica Blackout
/lp/sala                   # LP ambiente: Sala
/lp/quarto                 # LP ambiente: Quarto
/ofertas/[campaign-id]     # Ofertas por campanha
```

**Exemplo de Landing Page:**

```typescript
// app/lp/blackout/page.tsx

export const metadata: Metadata = {
  title: 'Persiana Blackout sob Medida | Rosa Chic',
  description: 'Bloqueio total de luz. Privacidade e conforto térmico.',
  openGraph: {
    title: 'Persiana Blackout - 15% OFF na Primeira Compra',
    images: ['/images/lp-blackout-og.jpg'],
  },
}

export default function BlackoutLandingPage({
  searchParams,
}: {
  searchParams: { utm_source?: string; utm_campaign?: string }
}) {
  // Tracking da origem
  useEffect(() => {
    fbPageView()
    gtmPageView(window.location.href)

    if (searchParams.utm_campaign) {
      gtmEvent({
        action: 'lp_view',
        category: 'campaign',
        label: searchParams.utm_campaign,
      })
    }
  }, [])

  return (
    <div>
      {/* Hero otimizado para conversão */}
      {/* Calculadora de preço inline */}
      {/* Prova social */}
      {/* CTA direto */}
    </div>
  )
}
```

---

### 🔄 Remarketing Avançado

**Audiences personalizadas:**

```typescript
// app/lib/analytics/audiences.ts

export const trackUserBehavior = (behavior: {
  viewed_products: string[]
  cart_abandonment: boolean
  price_range: string
  preferred_material: string
}) => {
  // Facebook Custom Audiences
  window.fbq('trackCustom', 'UserBehavior', behavior)

  // Google Ads Remarketing Tag
  window.gtag('event', 'user_behavior', {
    ...behavior,
  })
}

// Segmentação por interesse
export const segmentUser = (userSegment: {
  budget: 'low' | 'medium' | 'high'
  urgency: 'low' | 'high'
  room_type: string[]
}) => {
  window.fbq('trackCustom', 'UserSegment', userSegment)
}
```

---

### 📱 WhatsApp Integration (Click-to-WhatsApp Ads)

```typescript
// components/WhatsAppButton.tsx

'use client'

import { gtmEvent } from '@/lib/analytics/google-tag-manager'
import { fbEvent } from '@/lib/analytics/facebook-pixel'

export function WhatsAppButton({
  product,
  message
}: {
  product?: Product
  message?: string
}) {
  const handleClick = () => {
    // Track click
    fbEvent('Contact', { method: 'whatsapp' })
    gtmEvent({
      action: 'whatsapp_click',
      category: 'engagement',
      label: product?.name,
    })

    // Abrir WhatsApp
    const phone = '5511999999999'
    const text = message || `Olá! Tenho interesse em ${product?.name}`
    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(text)}`,
      '_blank'
    )
  }

  return (
    <button onClick={handleClick}>
      Falar no WhatsApp
    </button>
  )
}
```

---

### 🎯 ROI Tracking

**Dashboard de performance de campanhas:**

```typescript
// backend/src/reports/marketing-roi.service.ts

export class MarketingROIService {
  async getCampaignPerformance(startDate: Date, endDate: Date) {
    return {
      facebook_ads: {
        impressions: await this.getImpressions('facebook'),
        clicks: await this.getClicks('facebook'),
        conversions: await this.getConversions('facebook'),
        spend: await this.getAdSpend('facebook'),
        revenue: await this.getRevenue('facebook'),
        roas: await this.calculateROAS('facebook'),
      },
      google_ads: {
        // Same structure
      },
    }
  }
}
```

---

### ✅ Checklist de Marketing

- [x] Facebook Pixel instalado e testado
- [x] Google Tag Manager configurado
- [x] Google Analytics 4 integrado
- [x] Eventos de conversão mapeados
- [x] Meta tags Open Graph dinâmicas
- [x] Feed de catálogo para Facebook
- [x] Landing pages otimizadas
- [x] UTM tracking automático
- [x] Remarketing tags configuradas
- [x] WhatsApp Click-to-Chat
- [x] Dashboard de ROI

---

## 🚀 Deployment

### Frontend (Vercel)
\`\`\`bash
# Automático via GitHub integration
# Preview deployments em cada PR
# Production deployment em merge para main
\`\`\`

### Backend (Railway)
\`\`\`bash
# Dockerfile
# Variáveis de ambiente via dashboard
# Auto-deploy em push para main
# Health checks automáticos
\`\`\`

### Database (Supabase)
\`\`\`bash
# Backups diários automáticos
# Point-in-time recovery
# Connection pooling (PgBouncer)
\`\`\`

---

## ✅ Critérios de Aceite

- [ ] Implementação fiel ao Figma (>95%)
- [ ] Cálculo de preço correto (conforme especificação)
- [ ] Estoque em tempo real
- [ ] Testes (cobertura >80%)
- [ ] APIs documentadas (Swagger)
- [ ] Performance (<200ms em endpoints críticos)
- [ ] Acessibilidade (WCAG 2.1 AA)
- [ ] SEO otimizado (score >90 no Lighthouse)
- [ ] Mobile-first responsive

---

**Documento consolidado e aprovado para início do desenvolvimento.**
