# 🛡️ ROSACHIC.md - Boas Práticas & Segurança

**Guia Definitivo de Desenvolvimento Seguro e Clean Code para Rosa Chic Persinas**

---

## 📋 Índice

1. [Princípios Fundamentais](#princípios-fundamentais)
2. [🚨 PROTOCOLO ANTI-REDUNDÂNCIA (OBRIGATÓRIO)](#-protocolo-anti-redundância-obrigatório)
3. [Clean Code - Código Limpo](#clean-code---código-limpo)
4. [Segurança](#segurança)
5. [TypeScript - Type Safety](#typescript---type-safety)
6. [Arquitetura & Estrutura](#arquitetura--estrutura)
7. [Performance](#performance)
8. [Testes](#testes)
9. [Git & Commits](#git--commits)
10. [Code Review](#code-review)
11. [Deployment](#deployment)

---

## 🎯 Princípios Fundamentais

### **1. Regra de Ouro**
```
Código deve ser escrito pensando em quem vai ler, não em quem vai executar.
```

### **2. DRY (Don't Repeat Yourself)**
❌ **NUNCA** copiar e colar código
✅ **SEMPRE** criar funções/componentes reutilizáveis

### **3. KISS (Keep It Simple, Stupid)**
❌ **NUNCA** complexidade desnecessária
✅ **SEMPRE** solução mais simples que funciona

### **4. YAGNI (You Aren't Gonna Need It)**
❌ **NUNCA** código para "possíveis" funcionalidades futuras
✅ **SEMPRE** implementar apenas o necessário agora

### **5. Separation of Concerns**
❌ **NUNCA** misturar lógica de negócio com apresentação
✅ **SEMPRE** separar responsabilidades

---

## 🚨 PROTOCOLO ANTI-REDUNDÂNCIA (OBRIGATÓRIO)

### **⚠️ REGRA CRÍTICA:**
```
ANTES de escrever QUALQUER código novo,
REVISAR TODO o código existente para REUTILIZAR.
```

---

### **📋 Checklist Obrigatório ANTES de Codificar:**

#### **1. Auditoria do Código Existente (SEMPRE)**

Antes de implementar **QUALQUER** funcionalidade:

✅ **Passo 1: Buscar por funcionalidade similar**
```bash
# Buscar por funções relacionadas
grep -r "function calculate" src/
grep -r "export const.*Price" src/
grep -r "class.*Service" src/

# Buscar por tipos relacionados
grep -r "interface.*Product" src/
grep -r "type.*Pricing" src/

# Buscar por componentes similares
grep -r "export.*Button" src/components/
grep -r "function.*Card" src/components/
```

✅ **Passo 2: Revisar módulos relacionados**
```typescript
// Antes de criar nova validação, verificar:
src/lib/validations/
src/utils/validators/
src/common/validators/

// Antes de criar novo helper, verificar:
src/lib/helpers/
src/utils/
src/common/utils/

// Antes de criar novo hook, verificar:
src/hooks/
src/lib/hooks/
```

✅ **Passo 3: Revisar serviços existentes**
```typescript
// Backend: verificar serviços
src/modules/*/services/
src/services/
src/application/services/

// Frontend: verificar services/api
src/services/
src/api/
src/lib/api/
```

✅ **Passo 4: Verificar utilitários**
```typescript
// Verificar helpers matemáticos
src/utils/math.ts
src/lib/calculations.ts

// Verificar formatadores
src/utils/formatters.ts
src/lib/format.ts

// Verificar validadores
src/utils/validators.ts
src/lib/validation.ts
```

---

### **2. Estratégia de Reutilização**

#### ✅ **SEMPRE que encontrar código similar:**

**Opção A: Extrair para função reutilizável**
```typescript
// ANTES (código duplicado)
// arquivo1.ts
const price1 = (width / 100) * (height / 100) * pricePerM2

// arquivo2.ts
const price2 = (width / 100) * (height / 100) * pricePerM2

// DEPOIS (função reutilizável)
// src/lib/pricing/calculations.ts
export function calculateAreaPrice(
  widthCm: number,
  heightCm: number,
  pricePerM2: number
): number {
  const areaM2 = (widthCm / 100) * (heightCm / 100)
  return areaM2 * pricePerM2
}

// arquivo1.ts
import { calculateAreaPrice } from '@/lib/pricing/calculations'
const price1 = calculateAreaPrice(width, height, pricePerM2)

// arquivo2.ts
import { calculateAreaPrice } from '@/lib/pricing/calculations'
const price2 = calculateAreaPrice(width, height, pricePerM2)
```

**Opção B: Criar utilitário compartilhado**
```typescript
// src/utils/pricing.ts
export const PricingUtils = {
  calculateArea: (widthCm: number, heightCm: number) => {
    return (widthCm / 100) * (heightCm / 100)
  },

  applyLossFactor: (area: number, factor: number) => {
    return area * factor
  },

  roundToDecimal: (value: number, decimals: number) => {
    return Math.ceil(value * Math.pow(10, decimals)) / Math.pow(10, decimals)
  }
}
```

**Opção C: Criar hook customizado (React)**
```typescript
// src/hooks/usePricing.ts
export function usePricing() {
  const calculatePrice = useCallback((params: PricingParams) => {
    // Lógica centralizada
  }, [])

  const validateDimensions = useCallback((width: number, height: number) => {
    // Validação centralizada
  }, [])

  return { calculatePrice, validateDimensions }
}

// Uso em múltiplos componentes
function Component1() {
  const { calculatePrice } = usePricing()
  // ...
}

function Component2() {
  const { calculatePrice } = usePricing()
  // ...
}
```

---

### **3. Localização de Código Reutilizável**

#### **📁 Estrutura de Diretórios para Código Compartilhado:**

```
src/
├── lib/                    # Lógica de negócio compartilhada
│   ├── pricing/           # Cálculos de preço
│   │   ├── calculations.ts
│   │   ├── validations.ts
│   │   └── formatters.ts
│   ├── validations/       # Schemas Zod
│   ├── utils/             # Utilitários gerais
│   └── constants/         # Constantes globais
│
├── hooks/                 # React hooks customizados
│   ├── usePricing.ts
│   ├── useAuth.ts
│   └── useCart.ts
│
├── components/            # Componentes reutilizáveis
│   ├── ui/               # Componentes base (shadcn/ui)
│   ├── shared/           # Componentes compartilhados
│   └── layouts/          # Layouts
│
├── utils/                 # Helpers gerais
│   ├── formatters.ts     # Formatar moeda, data, etc
│   ├── validators.ts     # Validações simples
│   └── math.ts           # Operações matemáticas
│
└── types/                 # Types compartilhados
    ├── product.ts
    ├── pricing.ts
    └── common.ts
```

---

### **4. Exemplos de Redundância PROIBIDA**

#### ❌ **NUNCA Duplicar:**

**Validações:**
```typescript
// ❌ RUIM: Validação duplicada
// component1.tsx
if (width < 1 || width > 300) throw new Error('Largura inválida')

// component2.tsx
if (width < 1 || width > 300) throw new Error('Largura inválida')

// ✅ BOM: Validação centralizada
// src/lib/validations/dimensions.ts
export function validateWidth(width: number): void {
  if (width < 1 || width > 300) {
    throw new Error('Largura deve estar entre 1cm e 300cm')
  }
}
```

**Formatação:**
```typescript
// ❌ RUIM: Formatter duplicado
const formatted1 = `R$ ${price.toFixed(2).replace('.', ',')}`
const formatted2 = `R$ ${price.toFixed(2).replace('.', ',')}`

// ✅ BOM: Formatter centralizado
// src/utils/formatters.ts
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}
```

**Cálculos:**
```typescript
// ❌ RUIM: Cálculo duplicado
const area1 = (width / 100) * (height / 100)
const area2 = (width / 100) * (height / 100)

// ✅ BOM: Função reutilizável
// src/lib/pricing/calculations.ts
export function calculateArea(widthCm: number, heightCm: number): number {
  return (widthCm / 100) * (heightCm / 100)
}
```

**Requisições API:**
```typescript
// ❌ RUIM: Fetch duplicado
const response1 = await fetch('/api/products')
const data1 = await response1.json()

const response2 = await fetch('/api/products')
const data2 = await response2.json()

// ✅ BOM: Service centralizado
// src/services/productService.ts
export const productService = {
  async getAll() {
    const response = await fetch('/api/products')
    return response.json()
  }
}
```

---

### **5. Protocolo de Nova Implementação**

#### **FLUXO OBRIGATÓRIO:**

```
1. LER tarefa/requisito
   ↓
2. BUSCAR código similar existente
   ↓
3. ENCONTROU?
   ├─ SIM → REUTILIZAR/ADAPTAR
   │         ├─ Extrair para função compartilhada se necessário
   │         └─ Documentar reutilização
   │
   └─ NÃO → VERIFICAR NOVAMENTE
             ├─ Buscar em outros módulos
             ├─ Perguntar ao time
             └─ Se realmente não existe, criar CENTRALIZADO
```

---

### **6. Comandos de Busca Rápida**

#### **Buscar antes de criar:**

```bash
# Buscar funções de cálculo
rg "function calculate" --type ts

# Buscar validações
rg "validate.*width|height" --type ts

# Buscar formatações
rg "format.*currency|price" --type ts

# Buscar componentes
rg "export.*Button|Card|Modal" --type tsx

# Buscar hooks
rg "export.*use[A-Z]" --type ts

# Buscar services
rg "class.*Service|export.*service" --type ts

# Buscar tipos
rg "interface.*Product|type.*Pricing" --type ts
```

---

### **7. Refatoração de Código Duplicado**

#### **Quando encontrar duplicação:**

**Passo 1: Identificar padrão**
```typescript
// Código duplicado encontrado em 3 lugares
const result1 = Math.ceil(value * 10) / 10
const result2 = Math.ceil(value * 10) / 10
const result3 = Math.ceil(value * 10) / 10
```

**Passo 2: Extrair para função**
```typescript
// src/utils/math.ts
export function roundUp(value: number, decimals: number = 1): number {
  const factor = Math.pow(10, decimals)
  return Math.ceil(value * factor) / factor
}
```

**Passo 3: Substituir todas ocorrências**
```typescript
import { roundUp } from '@/utils/math'

const result1 = roundUp(value)
const result2 = roundUp(value)
const result3 = roundUp(value)
```

**Passo 4: Testar**
```typescript
// src/utils/math.test.ts
describe('roundUp', () => {
  it('should round up to 1 decimal', () => {
    expect(roundUp(3.14159, 1)).toBe(3.2)
  })
})
```

---

### **8. Código Compartilhado - Regras**

#### ✅ **SEMPRE:**

1. **Documentar funções compartilhadas**
```typescript
/**
 * Calcula a área em m² a partir de dimensões em cm.
 *
 * @param widthCm - Largura em centímetros
 * @param heightCm - Altura em centímetros
 * @returns Área em metros quadrados
 *
 * @example
 * calculateArea(180, 160) // 2.88
 */
export function calculateArea(widthCm: number, heightCm: number): number {
  return (widthCm / 100) * (heightCm / 100)
}
```

2. **Testar funções compartilhadas**
```typescript
// Se é usado em vários lugares, DEVE ter testes!
describe('calculateArea', () => {
  it('should calculate area correctly', () => {
    expect(calculateArea(100, 100)).toBe(1.0)
    expect(calculateArea(200, 150)).toBe(3.0)
  })
})
```

3. **Nomear claramente**
```typescript
// ✅ BOM
export function calculatePriceWithInstallation(...)
export function validateProductDimensions(...)
export function formatBrazilianCurrency(...)

// ❌ RUIM
export function calc(...)
export function validate(...)
export function format(...)
```

4. **Organizar por domínio**
```typescript
// Pricing domain
src/lib/pricing/
  ├── calculations.ts  // Cálculos de preço
  ├── validations.ts   // Validações de preço
  └── formatters.ts    // Formatação de preço

// Product domain
src/lib/product/
  ├── filters.ts       // Filtros de produto
  ├── validations.ts   // Validações de produto
  └── transformers.ts  // Transformações
```

---

### **9. Revisão de Código - Checklist Anti-Redundância**

Antes de aprovar PR, verificar:

- [ ] Código NÃO duplica funcionalidade existente?
- [ ] Busca por código similar foi feita?
- [ ] Se similar existe, foi reutilizado?
- [ ] Se necessário, código foi extraído para utilitário?
- [ ] Funções compartilhadas estão documentadas?
- [ ] Funções compartilhadas têm testes?
- [ ] Imports usam paths absolutos (@/lib, @/utils)?

---

### **10. Ferramentas de Detecção**

#### **ESLint - Detectar duplicação:**

```json
// .eslintrc.json
{
  "plugins": ["sonarjs"],
  "rules": {
    "sonarjs/no-duplicate-string": ["error", 3],
    "sonarjs/no-identical-functions": "error",
    "sonarjs/no-duplicated-branches": "error"
  }
}
```

#### **JSCPD - Copy-Paste Detector:**

```bash
# Instalar
npm install -g jscpd

# Executar
jscpd src/ --min-lines 5 --min-tokens 50

# Falhar CI se duplicação > 5%
jscpd src/ --threshold 5
```

---

### **📌 RESUMO - Mantra Anti-Redundância:**

```
1. BUSCAR antes de criar
2. REUTILIZAR sempre que possível
3. EXTRAIR quando encontrar duplicação
4. CENTRALIZAR em local apropriado
5. DOCUMENTAR código compartilhado
6. TESTAR código compartilhado
7. REFATORAR duplicação encontrada
```

---

### **⚠️ Consequências de Violação:**

**Duplicação de código leva a:**
- 🐛 Bugs duplicados
- 🔧 Manutenção duplicada (dobro do trabalho)
- 📏 Código maior e mais complexo
- 🐌 Performance pior
- 😤 Frustração do time
- 💸 Custo maior de desenvolvimento

**Por isso: ZERO TOLERÂNCIA para redundância!**

---

## 🧹 Clean Code - Código Limpo

### **1. Nomenclatura**

#### ✅ **BOM:**
```typescript
// Variáveis: camelCase, descritivas
const calculateTotalPrice = (items: CartItem[]): number => {...}
const userEmailAddress = 'user@example.com'
const isProductAvailable = true

// Interfaces/Types: PascalCase
interface Product {
  id: string
  name: string
  pricePerSquareMeter: number
}

// Componentes: PascalCase
export function ProductCard({ product }: Props) {...}

// Constantes: UPPER_SNAKE_CASE
const MAX_WIDTH_CM = 300
const MIN_AREA_M2 = 1.0
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL
```

#### ❌ **RUIM:**
```typescript
// Nomes genéricos ou abreviados
const data = fetchData() // Que data?
const tmp = calculate() // Temporário de quê?
const x = getValue() // X é o quê?

// Nomes ambíguos
const get = () => {...} // Get o quê?
const process = () => {...} // Process o quê?

// Abreviações não claras
const usr = getUser() // Use 'user'
const prod = getProduct() // Use 'product'
const calc = () => {...} // Use 'calculate'
```

---

### **2. Funções Pequenas e Focadas**

#### ✅ **BOM:**
```typescript
// Uma função, uma responsabilidade
function calculateArea(widthCm: number, heightCm: number): number {
  return (widthCm / 100) * (heightCm / 100)
}

function applyLossFactor(area: number, lossFactor: number): number {
  return area * lossFactor
}

function roundUpToDecimal(value: number, decimals: number): number {
  return Math.ceil(value * Math.pow(10, decimals)) / Math.pow(10, decimals)
}

function calculateFinalPrice(params: PricingParams): PricingResult {
  const area = calculateArea(params.width, params.height)
  const adjustedArea = applyLossFactor(area, params.lossFactor)
  const roundedArea = roundUpToDecimal(adjustedArea, 1)
  const chargeableArea = Math.max(roundedArea, MIN_AREA_M2)

  return {
    area: chargeableArea,
    price: chargeableArea * params.pricePerM2
  }
}
```

#### ❌ **RUIM:**
```typescript
// Função fazendo muitas coisas
function doEverything(w: number, h: number, p: number, f: number) {
  const a = (w / 100) * (h / 100)
  const aa = a * f
  const ra = Math.ceil(aa * 10) / 10
  const ca = ra < 1 ? 1 : ra
  const price = ca * p
  // ... mais 50 linhas de código
  return price
}
```

---

### **3. Evitar Comentários Desnecessários**

#### ✅ **BOM:**
```typescript
// Código auto-explicativo
function isProductOutOfStock(product: Product): boolean {
  return product.stock <= 0
}

function shouldSuggestSplittingOrder(areaM2: number): boolean {
  return areaM2 > MAX_RECOMMENDED_AREA_M2
}

// Comentário apenas quando necessário
/**
 * Calcula o preço final de uma persiana sob medida.
 *
 * @param params - Parâmetros de cálculo (largura, altura, modelo)
 * @returns Objeto com preço final e breakdown detalhado
 *
 * @example
 * calculatePrice({ widthCm: 180, heightCm: 160, modelId: '123' })
 */
export function calculatePrice(params: PricingParams): PricingResult {
  // Implementação
}
```

#### ❌ **RUIM:**
```typescript
// Comentários óbvios
let i = 0 // Inicializa contador
i++ // Incrementa contador

// Código confuso que precisa de comentário
// Multiplica largura por altura e divide por 10000
const x = (w * h) / 10000 // Melhor: const areaM2 = (widthCm * heightCm) / 10000
```

---

### **4. Evitar Magic Numbers**

#### ✅ **BOM:**
```typescript
// Constantes com nome descritivo
const CM_TO_METERS = 100
const MIN_CHARGEABLE_AREA_M2 = 1.0
const DEFAULT_LOSS_FACTOR = 1.1
const MAX_WIDTH_CM = 300
const MAX_HEIGHT_CM = 350
const INSTALLATION_PERCENTAGE_MIN = 0.08
const INSTALLATION_PERCENTAGE_MAX = 0.12

const areaM2 = (widthCm / CM_TO_METERS) * (heightCm / CM_TO_METERS)
const chargeableArea = Math.max(areaM2, MIN_CHARGEABLE_AREA_M2)
```

#### ❌ **RUIM:**
```typescript
// Magic numbers sem contexto
const area = (width / 100) * (height / 100) // Por que 100?
const final = area < 1 ? 1 : area // Por que 1?
const price = base * 1.1 // Por que 1.1?
```

---

### **5. Early Return**

#### ✅ **BOM:**
```typescript
function calculateDiscount(order: Order): number {
  // Validações primeiro (early return)
  if (!order.items.length) return 0
  if (order.total < 100) return 0
  if (!order.customer.isActive) return 0

  // Lógica principal
  const baseDiscount = order.total * 0.05

  if (order.customer.isPremium) {
    return baseDiscount * 1.5
  }

  return baseDiscount
}
```

#### ❌ **RUIM:**
```typescript
function calculateDiscount(order: Order): number {
  let discount = 0

  if (order.items.length > 0) {
    if (order.total >= 100) {
      if (order.customer.isActive) {
        discount = order.total * 0.05

        if (order.customer.isPremium) {
          discount = discount * 1.5
        }
      }
    }
  }

  return discount
}
```

---

### **6. Evitar Else After Return**

#### ✅ **BOM:**
```typescript
function getProductStatus(product: Product): string {
  if (product.stock === 0) {
    return 'out_of_stock'
  }

  if (product.stock < 5) {
    return 'low_stock'
  }

  return 'in_stock'
}
```

#### ❌ **RUIM:**
```typescript
function getProductStatus(product: Product): string {
  if (product.stock === 0) {
    return 'out_of_stock'
  } else {
    if (product.stock < 5) {
      return 'low_stock'
    } else {
      return 'in_stock'
    }
  }
}
```

---

## 🔒 Segurança

### **1. Validação de Entrada (CRÍTICO)**

#### ✅ **BOM:**
```typescript
import { z } from 'zod'

// Schema de validação
const PricingInputSchema = z.object({
  widthCm: z.number()
    .min(1, 'Largura deve ser no mínimo 1cm')
    .max(300, 'Largura máxima: 300cm'),
  heightCm: z.number()
    .min(1, 'Altura deve ser no mínimo 1cm')
    .max(350, 'Altura máxima: 350cm'),
  modelId: z.string().uuid('ID de modelo inválido'),
})

// Validar SEMPRE antes de processar
export async function calculatePrice(input: unknown) {
  // Parse e validação
  const validatedInput = PricingInputSchema.parse(input)

  // Agora é seguro usar
  const result = performCalculation(validatedInput)
  return result
}
```

#### ❌ **RUIM:**
```typescript
// Aceitar qualquer entrada sem validação
export async function calculatePrice(input: any) {
  // PERIGO: input pode ser qualquer coisa!
  const result = input.width * input.height
  return result
}
```

---

### **2. Sanitização de Dados**

#### ✅ **BOM:**
```typescript
import DOMPurify from 'isomorphic-dompurify'

// Sanitizar HTML antes de renderizar
function sanitizeUserInput(input: string): string {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
    ALLOWED_ATTR: ['href']
  })
}

// Escapar SQL (usar ORM como Prisma)
const products = await prisma.product.findMany({
  where: {
    name: {
      contains: userInput // Prisma escapa automaticamente
    }
  }
})
```

#### ❌ **RUIM:**
```typescript
// Renderizar HTML sem sanitizar
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// SQL injection vulnerável
const query = `SELECT * FROM products WHERE name = '${userInput}'`
```

---

### **3. Autenticação & Autorização**

#### ✅ **BOM:**
```typescript
// JWT com refresh tokens
import { SignJWT, jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET! // NUNCA hardcoded
)

export async function signToken(payload: TokenPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('15m') // Token curto
    .sign(JWT_SECRET)
}

// Middleware de autenticação
export async function requireAuth(request: Request) {
  const token = request.headers.get('authorization')?.split(' ')[1]

  if (!token) {
    throw new UnauthorizedError('Token não fornecido')
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as TokenPayload
  } catch {
    throw new UnauthorizedError('Token inválido ou expirado')
  }
}

// Verificar permissões
export async function requireAdmin(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId }
  })

  if (user?.role !== 'ADMIN') {
    throw new ForbiddenError('Acesso negado')
  }

  return user
}
```

#### ❌ **RUIM:**
```typescript
// Segredo hardcoded
const SECRET = 'my-secret-key' // NUNCA FAZER ISSO!

// Token sem expiração
jwt.sign({ userId }, SECRET) // Sem exp

// Sem verificação de permissões
if (user.isAdmin) { // Confiar no cliente
  // ...
}
```

---

### **4. Proteção de Senhas**

#### ✅ **BOM:**
```typescript
import bcrypt from 'bcrypt'

const SALT_ROUNDS = 12 // Custo alto

// Hash de senha
export async function hashPassword(password: string): Promise<string> {
  // Validar requisitos
  if (password.length < 8) {
    throw new Error('Senha deve ter no mínimo 8 caracteres')
  }

  return await bcrypt.hash(password, SALT_ROUNDS)
}

// Comparar senha
export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return await bcrypt.compare(password, hash)
}

// NUNCA retornar hash ao cliente
const user = await prisma.user.findUnique({
  where: { email },
  select: {
    id: true,
    email: true,
    name: true,
    // password: false (não incluir)
  }
})
```

#### ❌ **RUIM:**
```typescript
// Senha em texto plano
await prisma.user.create({
  data: {
    email,
    password: password // NUNCA!
  }
})

// Hash fraco
const hash = crypto.createHash('md5').update(password).digest('hex')

// Retornar senha/hash ao cliente
const user = await getUser(id)
return user // Inclui password_hash
```

---

### **5. Proteção contra CSRF**

#### ✅ **BOM:**
```typescript
// Usar CSRF token em formulários
import { getCsrfToken } from 'next-auth/react'

export default function Form() {
  const [csrfToken, setCsrfToken] = useState('')

  useEffect(() => {
    getCsrfToken().then(setCsrfToken)
  }, [])

  return (
    <form method="post">
      <input type="hidden" name="csrfToken" value={csrfToken} />
      {/* ... */}
    </form>
  )
}

// Backend: validar CSRF token
export async function POST(request: Request) {
  const formData = await request.formData()
  const token = formData.get('csrfToken')

  await validateCsrfToken(token) // Validar

  // Processar
}
```

---

### **6. Rate Limiting**

#### ✅ **BOM:**
```typescript
import rateLimit from 'express-rate-limit'

// Limitar tentativas de login
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // 5 tentativas
  message: 'Muitas tentativas de login. Tente novamente em 15 minutos.',
  standardHeaders: true,
  legacyHeaders: false,
})

// Aplicar no endpoint
app.post('/api/auth/login', loginLimiter, async (req, res) => {
  // ...
})

// Rate limit geral para API
export const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 100, // 100 requests
})

app.use('/api/', apiLimiter)
```

---

### **7. Variáveis de Ambiente**

#### ✅ **BOM:**
```typescript
// .env (NUNCA commitar)
DATABASE_URL="postgresql://..."
JWT_SECRET="..."
STRIPE_SECRET_KEY="sk_live_..."
NEXT_PUBLIC_API_URL="https://api.rosachic.com.br"

// Schema de validação
import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  STRIPE_SECRET_KEY: z.string().startsWith('sk_'),
  NEXT_PUBLIC_API_URL: z.string().url(),
})

// Validar ao iniciar
export const env = envSchema.parse(process.env)

// Usar
const client = new StripeClient(env.STRIPE_SECRET_KEY)
```

#### ❌ **RUIM:**
```typescript
// Hardcoded no código
const apiKey = 'sk_live_abc123...' // NUNCA!

// Commitar .env no git
git add .env // NUNCA!

// Sem validação
const url = process.env.API_URL // Pode ser undefined
```

---

### **8. Headers de Segurança**

#### ✅ **BOM:**
```typescript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
          }
        ]
      }
    ]
  }
}
```

---

### **9. Proteção de Rotas**

#### ✅ **BOM:**
```typescript
// middleware.ts (Next.js)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')

  // Rotas protegidas
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Verificar se é admin
    const user = verifyToken(token.value)
    if (user.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/account/:path*']
}
```

---

### **10. Logs Seguros**

#### ✅ **BOM:**
```typescript
import pino from 'pino'

const logger = pino({
  redact: {
    paths: [
      'password',
      'passwordHash',
      'creditCard',
      'token',
      'apiKey',
      'secret'
    ],
    remove: true
  }
})

// Logar sem expor dados sensíveis
logger.info({
  userId: user.id,
  action: 'login',
  // password: user.password // NUNCA!
})
```

#### ❌ **RUIM:**
```typescript
console.log('User:', user) // Pode conter senha!
console.log('Request:', req.body) // Pode conter dados sensíveis!
```

---

## 🎯 TypeScript - Type Safety

### **1. Zero 'any'**

#### ✅ **BOM:**
```typescript
// Type explícito
interface Product {
  id: string
  name: string
  price: number
}

function getProduct(id: string): Product {
  // ...
}

// Generic quando necessário
function findById<T extends { id: string }>(
  items: T[],
  id: string
): T | undefined {
  return items.find(item => item.id === id)
}

// Unknown para validar depois
function processInput(input: unknown) {
  if (typeof input === 'string') {
    // Aqui é seguro usar como string
    return input.toUpperCase()
  }
  throw new Error('Invalid input')
}
```

#### ❌ **RUIM:**
```typescript
// NUNCA usar 'any'
function doSomething(data: any) {
  return data.whatever // Sem type checking!
}

const result: any = fetchData()
```

---

### **2. Strict Mode**

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

---

### **3. Type Guards**

#### ✅ **BOM:**
```typescript
// Type guard personalizado
function isProduct(obj: unknown): obj is Product {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'name' in obj &&
    'price' in obj
  )
}

// Uso
function processData(data: unknown) {
  if (isProduct(data)) {
    // TypeScript sabe que é Product aqui
    console.log(data.name)
  }
}

// Discriminated unions
type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string }

function handleResult<T>(result: Result<T>) {
  if (result.success) {
    // TypeScript sabe que tem 'data'
    return result.data
  } else {
    // TypeScript sabe que tem 'error'
    throw new Error(result.error)
  }
}
```

---

## 🏗️ Arquitetura & Estrutura

### **1. Separação de Camadas**

```
src/
├── domain/           # Lógica de negócio (pura, sem dependências)
│   ├── entities/
│   ├── value-objects/
│   └── use-cases/
├── application/      # Casos de uso (orquestra domain)
│   └── services/
├── infrastructure/   # Implementações técnicas
│   ├── database/
│   ├── http/
│   └── external/
└── presentation/     # Interface (controllers, views)
    ├── api/
    └── web/
```

### **2. Dependency Injection**

#### ✅ **BOM:**
```typescript
// Interface (contrato)
interface ProductRepository {
  findById(id: string): Promise<Product | null>
  save(product: Product): Promise<void>
}

// Implementação
class PrismaProductRepository implements ProductRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string) {
    return await this.prisma.product.findUnique({ where: { id } })
  }

  async save(product: Product) {
    await this.prisma.product.create({ data: product })
  }
}

// Serviço recebe dependência
class ProductService {
  constructor(private repository: ProductRepository) {}

  async getProduct(id: string) {
    return await this.repository.findById(id)
  }
}

// Injeção
const repository = new PrismaProductRepository(prisma)
const service = new ProductService(repository)
```

---

## ⚡ Performance

### **1. Evitar N+1 Queries**

#### ✅ **BOM:**
```typescript
// Incluir relações de uma vez
const orders = await prisma.order.findMany({
  include: {
    items: {
      include: {
        product: true
      }
    },
    customer: true
  }
})
```

#### ❌ **RUIM:**
```typescript
// N+1 queries
const orders = await prisma.order.findMany()

for (const order of orders) {
  const items = await prisma.orderItem.findMany({
    where: { orderId: order.id }
  })
  // ...
}
```

---

### **2. Memoization**

```typescript
import { useMemo, useCallback } from 'react'

function ProductList({ products }: Props) {
  // Memoizar cálculos pesados
  const sortedProducts = useMemo(() => {
    return products.sort((a, b) => b.price - a.price)
  }, [products])

  // Memoizar callbacks
  const handleClick = useCallback((id: string) => {
    // ...
  }, [])

  return (
    <div>
      {sortedProducts.map(product => (
        <ProductCard key={product.id} onClick={handleClick} />
      ))}
    </div>
  )
}
```

---

## 🧪 Testes

### **1. Pirâmide de Testes**

```
       /\
      /E2E\      (Poucos - End-to-End)
     /______\
    /Integr.\   (Alguns - Integration)
   /__________\
  / Unitários \  (Muitos - Unit Tests)
 /______________\
```

### **2. Testes Unitários**

```typescript
import { describe, it, expect } from 'vitest'

describe('calculatePrice', () => {
  it('deve calcular preço corretamente', () => {
    const result = calculatePrice({
      widthCm: 180,
      heightCm: 160,
      pricePerM2: 220
    })

    expect(result.total).toBeCloseTo(633.6, 2)
  })

  it('deve aplicar área mínima de 1m²', () => {
    const result = calculatePrice({
      widthCm: 50,
      heightCm: 50,
      pricePerM2: 220
    })

    expect(result.area).toBe(1.0)
  })

  it('deve lançar erro para dimensões inválidas', () => {
    expect(() => {
      calculatePrice({
        widthCm: 400, // Acima do máximo
        heightCm: 160,
        pricePerM2: 220
      })
    }).toThrow('Largura máxima: 300cm')
  })
})
```

---

## 📝 Git & Commits

### **1. Conventional Commits**

```bash
# Formato
<type>(<scope>): <subject>

# Tipos
feat: Nova funcionalidade
fix: Correção de bug
docs: Documentação
style: Formatação (não afeta código)
refactor: Refatoração
test: Testes
chore: Manutenção

# Exemplos
feat(pricing): implementa cálculo de preço dinâmico
fix(auth): corrige validação de token JWT
docs(readme): atualiza instruções de instalação
refactor(product): simplifica lógica de validação
test(pricing): adiciona testes para área mínima
```

### **2. Commits Atômicos**

✅ **UM commit = UMA mudança lógica**

```bash
# BOM
git commit -m "feat(button): adiciona componente Button"
git commit -m "test(button): adiciona testes do Button"
git commit -m "docs(button): documenta props do Button"

# RUIM
git commit -m "adiciona button, testes, docs e refatora pricing"
```

---

## 👀 Code Review

### **Checklist:**

- [ ] Código segue padrões do projeto
- [ ] Sem `any` em TypeScript
- [ ] Validação de entrada implementada
- [ ] Tratamento de erros adequado
- [ ] Testes incluídos (>80% cobertura)
- [ ] Documentação atualizada
- [ ] Performance considerada
- [ ] Sem código duplicado
- [ ] Nomes descritivos
- [ ] Sem magic numbers
- [ ] Secrets não commitados
- [ ] Acessibilidade verificada

---

## 🚀 Deployment

### **Checklist de Deploy:**

- [ ] Testes passando (CI/CD)
- [ ] Build sem erros
- [ ] Variáveis de ambiente configuradas
- [ ] HTTPS habilitado
- [ ] Headers de segurança configurados
- [ ] Rate limiting ativo
- [ ] Monitoramento configurado (Sentry)
- [ ] Backups automáticos
- [ ] Rollback plan pronto

---

## 📌 Regras Inegociáveis

### ❌ **NUNCA:**

1. Commitar secrets/passwords
2. Usar `any` em TypeScript
3. Copiar e colar código
4. Fazer deploy sem testes
5. Ignorar warnings de segurança
6. Hardcodar configurações
7. Expor dados sensíveis em logs
8. Aceitar input sem validação
9. Guardar senhas em texto plano
10. Fazer SQL injection vulnerável

### ✅ **SEMPRE:**

1. Validar toda entrada de usuário
2. Usar HTTPS
3. Hash de senhas (bcrypt, salt rounds 12+)
4. Sanitizar HTML
5. Implementar rate limiting
6. Escrever testes
7. Code review antes de merge
8. Documentar código complexo
9. Usar type-safe queries (Prisma)
10. Princípio do menor privilégio

---

## 🎓 Recursos de Aprendizado

- **Clean Code:** "Clean Code" - Robert C. Martin
- **Security:** OWASP Top 10
- **TypeScript:** TypeScript Handbook
- **Testing:** Testing Library Best Practices
- **Architecture:** Clean Architecture - Robert C. Martin

---

## 📋 PLANO DE AÇÃO COMPLETO - DESENVOLVIMENTO ROSA CHIC

### **Metodologia de Execução:**

```
REGRA FUNDAMENTAL:
Cada task deve ser completada, testada e validada ANTES de avançar para a próxima.
NUNCA pular etapas ou fazer "depois".
```

---

## 🎨 FASE 1: FRONTEND (Next.js 14 + TypeScript)

### **1.1 Setup Inicial & Infraestrutura Frontend**

#### **Task 1.1.1: Criar projeto Next.js com configuração completa**
```bash
npx create-next-app@latest frontend --typescript --tailwind --app --src-dir --import-alias "@/*"
```

**Validação:**
- [ ] Projeto criado com sucesso
- [ ] TypeScript configurado (strict mode)
- [ ] Tailwind CSS funcionando
- [ ] App Router ativado
- [ ] `npm run dev` funciona sem erros

---

#### **Task 1.1.2: Configurar tsconfig.json com strict mode**

**Arquivo:** `frontend/tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

**Validação:**
- [ ] Nenhum erro de compilação
- [ ] Paths aliases funcionando (`@/`)
- [ ] Strict mode ativo

---

#### **Task 1.1.3: Instalar dependências essenciais**

```bash
cd frontend

# UI & Styling
npm install clsx tailwind-merge class-variance-authority lucide-react
npm install @radix-ui/react-slot @radix-ui/react-dialog @radix-ui/react-dropdown-menu
npm install @radix-ui/react-select @radix-ui/react-toast @radix-ui/react-form
npm install @radix-ui/react-label @radix-ui/react-checkbox @radix-ui/react-radio-group

# State Management
npm install zustand immer

# Forms & Validation
npm install react-hook-form zod @hookform/resolvers

# Data Fetching
npm install @tanstack/react-query axios

# Utilities
npm install date-fns isomorphic-dompurify

# Dev Dependencies
npm install -D @types/node @types/react @types/react-dom
npm install -D eslint eslint-config-next
npm install -D prettier prettier-plugin-tailwindcss
npm install -D vitest @testing-library/react @testing-library/jest-dom happy-dom
```

**Validação:**
- [ ] Todas dependências instaladas sem erros
- [ ] `package.json` atualizado
- [ ] `npm run build` funciona

---

#### **Task 1.1.4: Configurar ESLint + Prettier**

**Arquivo:** `frontend/.eslintrc.json`

```json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended"
  ],
  "plugins": ["sonarjs"],
  "rules": {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "sonarjs/no-duplicate-string": ["error", 3],
    "sonarjs/no-identical-functions": "error",
    "sonarjs/no-duplicated-branches": "error"
  }
}
```

**Arquivo:** `frontend/.prettierrc.json`

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

**Validação:**
- [ ] `npm run lint` funciona
- [ ] Prettier formata automaticamente
- [ ] ESLint detecta `any` e duplicação

---

#### **Task 1.1.5: Configurar Vitest para testes**

**Arquivo:** `frontend/vitest.config.ts`

```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom',
    setupFiles: './src/test/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

**Arquivo:** `frontend/src/test/setup.ts`

```typescript
import '@testing-library/jest-dom'
```

**Validação:**
- [ ] `npm run test` funciona
- [ ] Coverage configurado
- [ ] Happy-dom funcionando

---

#### **Task 1.1.6: Criar estrutura de diretórios**

```bash
mkdir -p src/components/ui
mkdir -p src/components/shared
mkdir -p src/components/layouts
mkdir -p src/lib/pricing
mkdir -p src/lib/validations
mkdir -p src/lib/utils
mkdir -p src/lib/constants
mkdir -p src/hooks
mkdir -p src/services
mkdir -p src/types
mkdir -p src/store
mkdir -p src/app/api
mkdir -p src/test
```

**Validação:**
- [ ] Todos diretórios criados
- [ ] Estrutura conforme ROSACHIC.md

---

### **1.2 Design System - Cores & Tipografia**

#### **Task 1.2.1: Configurar paleta de cores no Tailwind**

**Arquivo:** `frontend/tailwind.config.ts`

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Rosa Chic Brand Colors (do Design System)
        brand: {
          black: 'rgb(0, 0, 0)',
          dark: 'rgb(26, 32, 44)',
          error: 'rgb(211, 47, 47)',
          'error-light': 'rgb(255, 236, 236)',
          success: 'rgb(43, 142, 65)',
          'success-light': 'rgb(215, 255, 224)',
          warning: 'rgb(249, 157, 60)',
          info: 'rgb(81, 142, 248)',
          beige: 'rgb(247, 243, 239)',
          'beige-light': 'rgb(251, 251, 249)',
          cream: 'rgb(255, 254, 254)',
          neutral: {
            50: 'rgb(255, 254, 254)',
            100: 'rgb(251, 251, 249)',
            200: 'rgb(247, 243, 239)',
            300: 'rgb(241, 237, 237)',
            400: 'rgb(221, 213, 214)',
            500: 'rgb(180, 168, 169)',
            600: 'rgb(160, 146, 147)',
            700: 'rgb(119, 105, 106)',
            800: 'rgb(78, 67, 67)',
            900: 'rgb(49, 42, 42)',
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
      },
      fontSize: {
        // Typography do Design System
        'display': ['56px', { lineHeight: '56px', fontWeight: '400' }],
        'h1': ['40px', { lineHeight: '40px', fontWeight: '700' }],
        'h2': ['32px', { lineHeight: '40px', fontWeight: '500' }],
        'body-lg': ['18px', { lineHeight: '28px', fontWeight: '400' }],
        'body-lg-medium': ['18px', { lineHeight: '28px', fontWeight: '500' }],
        'body': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'body-medium': ['16px', { lineHeight: '24px', fontWeight: '500' }],
        'small': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'xs': ['12px', { lineHeight: '16px', fontWeight: '400' }],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
```

**Validação:**
- [ ] Todas cores acessíveis via Tailwind
- [ ] Tipografia funcionando
- [ ] `npm run dev` sem erros

---

#### **Task 1.2.2: Adicionar fontes do Google Fonts**

**Arquivo:** `frontend/src/app/layout.tsx`

```typescript
import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Rosa Chic Persinas - Persianas sob Medida',
  description: 'E-commerce premium de persianas sob medida',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
```

**Validação:**
- [ ] Fontes carregando corretamente
- [ ] `font-sans` usa Inter
- [ ] `font-serif` usa Cormorant Garamond

---

### **1.3 Componentes Base (shadcn/ui)**

#### **Task 1.3.1: Configurar shadcn/ui**

```bash
npx shadcn-ui@latest init
```

**Configuração:**
- Style: Default
- Base color: Neutral
- CSS variables: Yes

**Validação:**
- [ ] `components.json` criado
- [ ] `lib/utils.ts` criado com `cn()`

---

#### **Task 1.3.2: Instalar componentes shadcn/ui necessários**

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add label
npx shadcn-ui@latest add card
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add select
npx shadcn-ui@latest add toast
npx shadcn-ui@latest add form
npx shadcn-ui@latest add checkbox
npx shadcn-ui@latest add radio-group
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add separator
npx shadcn-ui@latest add skeleton
```

**Validação:**
- [ ] Todos componentes em `src/components/ui/`
- [ ] Nenhum erro de TypeScript
- [ ] Componentes importáveis

---

#### **Task 1.3.3: Customizar Button component para Design System**

**Arquivo:** `frontend/src/components/ui/button.tsx`

Editar os variants para incluir:

```typescript
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-brand-black text-white hover:bg-brand-dark",
        elevated: "bg-white text-brand-black border border-brand-neutral-300 hover:bg-brand-neutral-50 shadow-md",
        neutral: "bg-brand-neutral-100 text-brand-black hover:bg-brand-neutral-200",
        destructive: "bg-brand-error text-white hover:bg-red-700",
        outline: "border border-brand-black bg-transparent hover:bg-brand-neutral-50",
        ghost: "hover:bg-brand-neutral-50",
        link: "text-brand-black underline-offset-4 hover:underline",
      },
      size: {
        xs: "h-7 px-3 text-xs",
        sm: "h-9 px-4 text-sm",
        md: "h-12 px-6 text-base",
        lg: "h-14 px-8 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)
```

**Validação:**
- [ ] Variants conforme Design System
- [ ] Estados hover/disabled funcionando
- [ ] TypeScript sem erros

---

### **1.4 Componentes Compartilhados**

#### **Task 1.4.1: Criar componente Header**

**Arquivo:** `frontend/src/components/layouts/Header.tsx`

```typescript
'use client'

import Link from 'next/link'
import { ShoppingCart, User, Heart, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useCartStore } from '@/store/cart-store'
import { useAuthStore } from '@/store/auth-store'

export function Header() {
  const cartItemsCount = useCartStore((state) => state.items.length)
  const user = useAuthStore((state) => state.user)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-neutral-200 bg-white">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="font-serif text-2xl font-bold">
          Rosa Chic
        </Link>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex gap-8">
          <Link href="/produtos" className="hover:text-brand-dark">
            Produtos
          </Link>
          <Link href="/sobre" className="hover:text-brand-dark">
            Sobre
          </Link>
          <Link href="/contato" className="hover:text-brand-dark">
            Contato
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Favoritos */}
          <Button variant="ghost" size="sm" asChild>
            <Link href="/favoritos">
              <Heart className="h-5 w-5" />
            </Link>
          </Button>

          {/* Carrinho */}
          <Button variant="ghost" size="sm" asChild className="relative">
            <Link href="/carrinho">
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-black text-xs text-white">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </Button>

          {/* User Menu */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/conta">Minha Conta</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/pedidos">Meus Pedidos</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/favoritos">Favoritos</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => useAuthStore.getState().logout()}>
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button size="sm" asChild>
              <Link href="/login">Entrar</Link>
            </Button>
          )}

          {/* Mobile Menu */}
          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
```

**Validação:**
- [ ] Header renderiza corretamente
- [ ] Links funcionando
- [ ] Dropdown menu funcionando
- [ ] Badge do carrinho aparece quando > 0
- [ ] Responsivo (mobile menu)

---

#### **Task 1.4.2: Criar componente Footer**

**Arquivo:** `frontend/src/components/layouts/Footer.tsx`

```typescript
import Link from 'next/link'
import { Instagram, Facebook, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-brand-neutral-200 bg-brand-beige">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sobre */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-4">Rosa Chic</h3>
            <p className="text-sm text-brand-neutral-600">
              Persianas sob medida de alta qualidade para transformar seu
              ambiente.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-medium mb-4">Institucional</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/sobre" className="hover:underline">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/contato" className="hover:underline">
                  Contato
                </Link>
              </li>
              <li>
                <Link href="/como-medir" className="hover:underline">
                  Como Medir
                </Link>
              </li>
            </ul>
          </div>

          {/* Atendimento */}
          <div>
            <h4 className="font-medium mb-4">Atendimento</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/faq" className="hover:underline">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/trocas-devolucoes" className="hover:underline">
                  Trocas e Devoluções
                </Link>
              </li>
              <li>
                <Link href="/politica-privacidade" className="hover:underline">
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>

          {/* Redes Sociais */}
          <div>
            <h4 className="font-medium mb-4">Siga-nos</h4>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/rosachic"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-dark"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com/rosachic"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-dark"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="mailto:contato@rosachic.com.br"
                className="hover:text-brand-dark"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-brand-neutral-300 text-center text-sm text-brand-neutral-600">
          © {new Date().getFullYear()} Rosa Chic Persinas. Todos os direitos
          reservados.
        </div>
      </div>
    </footer>
  )
}
```

**Validação:**
- [ ] Footer renderiza corretamente
- [ ] Links funcionando
- [ ] Responsivo
- [ ] Ano dinâmico

---

#### **Task 1.4.3: Criar Layout principal**

**Arquivo:** `frontend/src/components/layouts/MainLayout.tsx`

```typescript
import { Header } from './Header'
import { Footer } from './Footer'

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
```

**Validação:**
- [ ] Layout renderiza Header + Content + Footer
- [ ] Min-height 100vh
- [ ] Footer sempre no final

---

### **1.5 Tipos Globais & Constantes**

#### **Task 1.5.1: Criar tipos de Product**

**Arquivo:** `frontend/src/types/product.ts`

```typescript
export type Luminosidade = 'Translúcida' | 'Blackout'
export type Material = 'Tecido' | 'PVC' | 'Madeira' | 'Bambu'
export type Ambiente = 'Quarto' | 'Sala' | 'Escritório' | 'Cozinha' | 'Banheiro'

export interface Product {
  id: string
  codigo: string
  modelo: string
  luminosidade: Luminosidade
  material: Material
  valorM2: number
  larguraMaxCm: number
  alturaMaxCm: number
  restricoes: {
    areaMinM2: number
    ambiente: Ambiente[]
  }
  imagens: string[]
  descricao: string
  estoque: number
  ativo: boolean
  createdAt: string
  updatedAt: string
}

export interface ProductFilter {
  luminosidade?: Luminosidade[]
  material?: Material[]
  ambiente?: Ambiente
  precoMin?: number
  precoMax?: number
  search?: string
}

export interface ProductListResponse {
  products: Product[]
  total: number
  page: number
  pageSize: number
}
```

**Validação:**
- [ ] Tipos refletem PRD e Pricing Spec
- [ ] Nenhum `any`
- [ ] Imports funcionando

---

#### **Task 1.5.2: Criar tipos de Pricing**

**Arquivo:** `frontend/src/types/pricing.ts`

```typescript
export interface PricingInput {
  widthCm: number
  heightCm: number
  modelId: string
  pricePerM2: number
  lossFactor?: number
  optionals?: PricingOptional[]
  installationPercentage?: number
  freightCost?: number
  discountPercentage?: number
}

export interface PricingOptional {
  id: string
  name: string
  type: 'fixed' | 'per_meter' | 'per_m2'
  value: number
  quantity?: number
}

export interface PricingResult {
  areaBruta: number
  areaAjustada: number
  areaCobravel: number
  precoBase: number
  opcionais: {
    name: string
    value: number
  }[]
  subtotal: number
  instalacao: number
  frete: number
  totalBruto: number
  desconto: number
  totalFinal: number
  breakdown: PricingBreakdown
}

export interface PricingBreakdown {
  step1_areaBruta: string
  step2_areaAjustada: string
  step3_arredondada: string
  step4_areaCobravel: string
  step5_precoBase: string
  step6_opcionais: string
  step7_instalacaoFrete: string
  step8_desconto: string
}
```

**Validação:**
- [ ] Tipos cobrem fórmula completa de 8 passos
- [ ] Nenhum `any`

---

#### **Task 1.5.3: Criar constantes globais**

**Arquivo:** `frontend/src/lib/constants/pricing.ts`

```typescript
export const PRICING_CONSTANTS = {
  CM_TO_METERS: 100,
  MIN_CHARGEABLE_AREA_M2: 1.0,
  DEFAULT_LOSS_FACTOR: 1.1,
  LOSS_FACTOR_MIN: 1.05,
  LOSS_FACTOR_MAX: 1.15,
  ROUNDING_DECIMAL_PLACES: 1,
  INSTALLATION_PERCENTAGE_MIN: 0.08,
  INSTALLATION_PERCENTAGE_MAX: 0.12,
  DEFAULT_INSTALLATION_PERCENTAGE: 0.1,
} as const

export const DIMENSION_LIMITS = {
  WIDTH_MIN_CM: 1,
  WIDTH_MAX_CM: 300,
  HEIGHT_MIN_CM: 1,
  HEIGHT_MAX_CM: 350,
  MAX_RECOMMENDED_AREA_M2: 8,
} as const

export const MATERIAL_FACTORS = {
  'Tela Solar': 1.0,
  'Blackout Tecido': 1.25,
  'Linho Premium': 1.15,
  'Madeira': 1.6,
  'Bambu': 1.7,
  'PVC': 1.0,
} as const
```

**Validação:**
- [ ] Constantes conforme Pricing Spec
- [ ] `as const` para type safety
- [ ] Importável em outros arquivos

---

#### **Task 1.5.4: Criar constantes de validação**

**Arquivo:** `frontend/src/lib/constants/validation.ts`

```typescript
export const VALIDATION_MESSAGES = {
  REQUIRED: 'Campo obrigatório',
  INVALID_EMAIL: 'E-mail inválido',
  INVALID_CPF: 'CPF inválido',
  INVALID_PHONE: 'Telefone inválido',
  INVALID_CEP: 'CEP inválido',
  PASSWORD_MIN_LENGTH: 'Senha deve ter no mínimo 8 caracteres',
  WIDTH_OUT_OF_RANGE: 'Largura deve estar entre 1cm e 300cm',
  HEIGHT_OUT_OF_RANGE: 'Altura deve estar entre 1cm e 350cm',
  DIMENSION_TOO_LARGE: 'Dimensão excede o máximo permitido. Considere dividir em 2 módulos.',
} as const

export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  CPF: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
  PHONE: /^\(\d{2}\) \d{4,5}-\d{4}$/,
  CEP: /^\d{5}-\d{3}$/,
} as const
```

**Validação:**
- [ ] Mensagens consistentes
- [ ] Regex testados
- [ ] Importável

---

#### **Task 1.5.5: Criar tipos avançados de Product para Admin**

**Arquivo:** `frontend/src/types/product-admin.ts`

```typescript
// DTOs para criação e edição
export interface CreateProductDTO {
  codigo: string
  modelo: string
  luminosidade: Luminosidade
  material: Material
  valorM2: number
  larguraMaxCm: number
  alturaMaxCm: number
  restricoes: {
    areaMinM2: number
    ambiente: Ambiente[]
  }
  descricao: string
  estoque: number
  ativo?: boolean
  imagens?: string[]
  seo?: ProductSEO
}

export interface UpdateProductDTO extends Partial<CreateProductDTO> {
  id: string
}

// Variações de produtos
export interface ProductVariant {
  id: string
  productId: string
  sku: string
  name: string // Ex: "Rosa Claro", "Textura Lisa"
  tipo: 'cor' | 'textura' | 'acabamento'
  priceAdjustment: number // Ajuste de preço em %
  stockQuantity: number
  images: string[]
  attributes: {
    colorHex?: string
    texture?: string
    finish?: string
  }
  isAvailable: boolean
}

// Categorias detalhadas
export interface ProductCategory {
  id: string
  name: string
  slug: string
  parentId?: string // Para subcategorias
  description: string
  image?: string
  displayOrder: number
  isActive: boolean
  children?: ProductCategory[]
}

// Especificações técnicas
export interface ProductSpecification {
  id: string
  productId: string
  grupo: 'tecnico' | 'material' | 'dimensional' | 'manutencao'
  especificacoes: {
    nome: string
    valor: string | number
    unidade?: string
  }[]
}

// Certificações
export interface ProductCertification {
  id: string
  nome: string // Ex: "Anti-chamas", "Anti-fungo"
  descricao: string
  orgaoEmissor: string
  validade?: Date
  certificado?: string // URL do PDF
}

// Auditoria e histórico
export interface ProductAudit {
  id: string
  productId: string
  userId: string
  userName: string
  action: 'create' | 'update' | 'delete' | 'archive'
  changes: {
    field: string
    oldValue: any
    newValue: any
  }[]
  timestamp: Date
  ip?: string
}

// Métricas de produto
export interface ProductMetrics {
  productId: string
  views: number
  uniqueViews: number
  addedToCart: number
  purchased: number
  conversionRate: number
  averageRating: number
  totalReviews: number
  lastViewDate?: Date
  lastPurchaseDate?: Date
}

// Relacionamentos
export interface ProductRelationship {
  id: string
  productId: string
  relatedProductId: string
  type: 'complementar' | 'similar' | 'upgrade' | 'kit'
  displayOrder: number
}

// Promoções
export interface ProductPromotion {
  id: string
  productId: string
  name: string
  type: 'desconto_percentual' | 'desconto_fixo' | 'leve_x_pague_y'
  value: number
  startDate: Date
  endDate: Date
  conditions?: {
    minQuantity?: number
    maxQuantity?: number
    customerGroups?: string[]
  }
  isActive: boolean
}
```

**Validação:**
- [ ] DTOs cobrem CRUD completo
- [ ] Tipos para variações e categorias
- [ ] Suporte para auditoria
- [ ] Métricas e analytics

---

#### **Task 1.5.6: Criar tipos de SEO e Mídia**

**Arquivo:** `frontend/src/types/product-seo.ts`

```typescript
// SEO e Meta tags
export interface ProductSEO {
  metaTitle?: string
  metaDescription?: string
  metaKeywords?: string[]
  slug: string
  canonicalUrl?: string
  ogImage?: string
  ogTitle?: string
  ogDescription?: string
  structuredData?: Record<string, any>
}

// Mídia e galeria
export interface ProductMedia {
  id: string
  productId: string
  type: 'imagem' | 'video' | '360' | 'pdf'
  url: string
  thumbnail?: string
  title: string
  alt: string
  description?: string
  category: 'principal' | 'galeria' | 'ambiente' | 'detalhe' | 'textura' | 'manual'
  displayOrder: number
  size?: number // em bytes
  dimensions?: {
    width: number
    height: number
  }
  mimeType: string
  isActive: boolean
}

// Avaliações e reviews
export interface ProductReview {
  id: string
  productId: string
  userId: string
  userName: string
  rating: 1 | 2 | 3 | 4 | 5
  title?: string
  comment: string
  pros?: string[]
  cons?: string[]
  verified: boolean // Compra verificada
  helpful: number // Votos úteis
  notHelpful: number
  images?: string[]
  createdAt: Date
  response?: {
    message: string
    respondedBy: string
    respondedAt: Date
  }
}

// FAQ do produto
export interface ProductFAQ {
  id: string
  productId: string
  question: string
  answer: string
  displayOrder: number
  helpful: number
  notHelpful: number
  createdAt: Date
  answeredBy?: string
}
```

**Validação:**
- [ ] SEO completo com Open Graph
- [ ] Sistema de mídia flexível
- [ ] Reviews com verificação
- [ ] FAQ integrado

---

#### **Task 1.5.7: Criar tipos de Inventário e Logística**

**Arquivo:** `frontend/src/types/product-inventory.ts`

```typescript
// Gestão de estoque
export interface ProductInventory {
  productId: string
  variantId?: string
  currentStock: number
  reservedStock: number // Reservado em carrinho/pedidos
  availableStock: number // currentStock - reservedStock
  incomingStock: number // Em produção/chegando
  incomingDate?: Date
  lowStockThreshold: number
  outOfStockThreshold: number
  restockAlert: boolean
  lastRestockDate?: Date
  averageDailySales?: number
  daysUntilOutOfStock?: number
}

// Movimentações de estoque
export interface StockMovement {
  id: string
  productId: string
  variantId?: string
  type: 'entrada' | 'saida' | 'ajuste' | 'reserva' | 'cancelamento'
  quantity: number
  reason: string
  reference?: string // Número do pedido, NF, etc
  previousStock: number
  newStock: number
  createdBy: string
  createdAt: Date
  notes?: string
}

// Fornecedores
export interface ProductSupplier {
  id: string
  productId: string
  supplierId: string
  supplierName: string
  supplierCode: string // Código no fornecedor
  cost: number
  leadTime: number // Dias para entrega
  minOrderQuantity: number
  isDefault: boolean
  lastPurchaseDate?: Date
  lastPurchasePrice?: number
}

// Tabela de preços por quantidade/região
export interface PriceTable {
  id: string
  productId: string
  name: string
  type: 'quantidade' | 'regiao' | 'cliente_tipo'
  rules: PriceRule[]
  validFrom: Date
  validUntil?: Date
  isActive: boolean
}

export interface PriceRule {
  id: string
  condition: {
    minQuantity?: number
    maxQuantity?: number
    region?: string[]
    customerType?: string[]
  }
  adjustment: {
    type: 'percentual' | 'fixo'
    value: number
  }
  priority: number
}

// Disponibilidade regional
export interface RegionalAvailability {
  productId: string
  regions: {
    id: string
    name: string
    available: boolean
    deliveryTime: number // dias
    shippingCost?: number
    restrictions?: string[]
  }[]
}

// Kits e combos
export interface ProductKit {
  id: string
  name: string
  description: string
  items: {
    productId: string
    quantity: number
    isOptional: boolean
    discount?: number // Desconto no item do kit
  }[]
  kitPrice: number
  savingAmount: number // Economia total
  savingPercentage: number
  isActive: boolean
}
```

**Validação:**
- [ ] Gestão completa de estoque
- [ ] Rastreamento de movimentações
- [ ] Suporte para múltiplos fornecedores
- [ ] Tabelas de preço flexíveis

---

### **1.6 Utilitários & Helpers**

#### **Task 1.6.1: Criar utilitários de formatação**

**Arquivo:** `frontend/src/lib/utils/formatters.ts`

```typescript
/**
 * Formata valor em moeda brasileira (R$)
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

/**
 * Formata dimensão em cm com unidade
 */
export function formatDimension(cm: number): string {
  return `${cm}cm`
}

/**
 * Formata área em m² com 2 decimais
 */
export function formatArea(m2: number): string {
  return `${m2.toFixed(2)}m²`
}

/**
 * Formata CPF
 */
export function formatCPF(cpf: string): string {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

/**
 * Formata telefone
 */
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  }
  return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
}

/**
 * Formata CEP
 */
export function formatCEP(cep: string): string {
  return cep.replace(/(\d{5})(\d{3})/, '$1-$2')
}

/**
 * Formata data em pt-BR
 */
export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(date))
}

/**
 * Formata data e hora
 */
export function formatDateTime(date: string | Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(date))
}
```

**Teste:** `frontend/src/lib/utils/formatters.test.ts`

```typescript
import { describe, it, expect } from 'vitest'
import {
  formatCurrency,
  formatDimension,
  formatArea,
  formatCPF,
  formatPhone,
  formatCEP,
} from './formatters'

describe('formatters', () => {
  it('formatCurrency deve formatar valores em BRL', () => {
    expect(formatCurrency(1000)).toBe('R$ 1.000,00')
    expect(formatCurrency(1234.56)).toBe('R$ 1.234,56')
  })

  it('formatDimension deve adicionar unidade cm', () => {
    expect(formatDimension(180)).toBe('180cm')
  })

  it('formatArea deve formatar com 2 decimais e m²', () => {
    expect(formatArea(2.88)).toBe('2.88m²')
  })

  it('formatCPF deve adicionar pontuação', () => {
    expect(formatCPF('12345678900')).toBe('123.456.789-00')
  })

  it('formatPhone deve formatar telefone com 11 dígitos', () => {
    expect(formatPhone('11987654321')).toBe('(11) 98765-4321')
  })

  it('formatCEP deve adicionar hífen', () => {
    expect(formatCEP('01310100')).toBe('01310-100')
  })
})
```

**Validação:**
- [ ] Todas funções documentadas (JSDoc)
- [ ] Testes passando
- [ ] Nenhum `any`
- [ ] Coverage > 80%

---

#### **Task 1.6.2: Criar utilitários matemáticos**

**Arquivo:** `frontend/src/lib/utils/math.ts`

```typescript
/**
 * Arredonda valor para cima com N casas decimais
 */
export function roundUp(value: number, decimals: number = 1): number {
  const factor = Math.pow(10, decimals)
  return Math.ceil(value * factor) / factor
}

/**
 * Arredonda valor para baixo com N casas decimais
 */
export function roundDown(value: number, decimals: number = 1): number {
  const factor = Math.pow(10, decimals)
  return Math.floor(value * factor) / factor
}

/**
 * Limita valor entre min e max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

/**
 * Calcula porcentagem
 */
export function percentage(value: number, percent: number): number {
  return value * (percent / 100)
}
```

**Teste:** `frontend/src/lib/utils/math.test.ts`

```typescript
import { describe, it, expect } from 'vitest'
import { roundUp, roundDown, clamp, percentage } from './math'

describe('math utils', () => {
  it('roundUp deve arredondar para cima', () => {
    expect(roundUp(3.14159, 1)).toBe(3.2)
    expect(roundUp(3.14159, 2)).toBe(3.15)
  })

  it('clamp deve limitar valores', () => {
    expect(clamp(5, 0, 10)).toBe(5)
    expect(clamp(-5, 0, 10)).toBe(0)
    expect(clamp(15, 0, 10)).toBe(10)
  })

  it('percentage deve calcular porcentagem', () => {
    expect(percentage(100, 10)).toBe(10)
    expect(percentage(200, 5)).toBe(10)
  })
})
```

**Validação:**
- [ ] Testes passando
- [ ] Coverage > 80%

---

### **1.7 Validações com Zod**

#### **Task 1.7.1: Criar schemas de validação de dimensões**

**Arquivo:** `frontend/src/lib/validations/dimensions.ts`

```typescript
import { z } from 'zod'
import { DIMENSION_LIMITS } from '@/lib/constants/pricing'
import { VALIDATION_MESSAGES } from '@/lib/constants/validation'

export const DimensionSchema = z.object({
  widthCm: z
    .number({
      required_error: VALIDATION_MESSAGES.REQUIRED,
      invalid_type_error: 'Largura deve ser um número',
    })
    .min(DIMENSION_LIMITS.WIDTH_MIN_CM, VALIDATION_MESSAGES.WIDTH_OUT_OF_RANGE)
    .max(DIMENSION_LIMITS.WIDTH_MAX_CM, VALIDATION_MESSAGES.WIDTH_OUT_OF_RANGE),

  heightCm: z
    .number({
      required_error: VALIDATION_MESSAGES.REQUIRED,
      invalid_type_error: 'Altura deve ser um número',
    })
    .min(DIMENSION_LIMITS.HEIGHT_MIN_CM, VALIDATION_MESSAGES.HEIGHT_OUT_OF_RANGE)
    .max(DIMENSION_LIMITS.HEIGHT_MAX_CM, VALIDATION_MESSAGES.HEIGHT_OUT_OF_RANGE),
})

export type DimensionInput = z.infer<typeof DimensionSchema>
```

**Validação:**
- [ ] Schema validando corretamente
- [ ] Mensagens customizadas
- [ ] Types inferidos

---

#### **Task 1.7.2: Criar schemas de validação de pricing**

**Arquivo:** `frontend/src/lib/validations/pricing.ts`

```typescript
import { z } from 'zod'
import { DimensionSchema } from './dimensions'
import { PRICING_CONSTANTS } from '@/lib/constants/pricing'

export const PricingOptionalSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  type: z.enum(['fixed', 'per_meter', 'per_m2']),
  value: z.number().positive(),
  quantity: z.number().positive().optional(),
})

export const PricingInputSchema = DimensionSchema.extend({
  modelId: z.string().uuid('ID de modelo inválido'),
  pricePerM2: z.number().positive('Preço/m² deve ser positivo'),
  lossFactor: z
    .number()
    .min(PRICING_CONSTANTS.LOSS_FACTOR_MIN)
    .max(PRICING_CONSTANTS.LOSS_FACTOR_MAX)
    .optional()
    .default(PRICING_CONSTANTS.DEFAULT_LOSS_FACTOR),
  optionals: z.array(PricingOptionalSchema).optional().default([]),
  installationPercentage: z
    .number()
    .min(PRICING_CONSTANTS.INSTALLATION_PERCENTAGE_MIN)
    .max(PRICING_CONSTANTS.INSTALLATION_PERCENTAGE_MAX)
    .optional()
    .default(PRICING_CONSTANTS.DEFAULT_INSTALLATION_PERCENTAGE),
  freightCost: z.number().nonnegative().optional().default(0),
  discountPercentage: z.number().min(0).max(100).optional().default(0),
})

export type PricingInput = z.infer<typeof PricingInputSchema>
```

**Validação:**
- [ ] Schema completo conforme Pricing Spec
- [ ] Defaults aplicados
- [ ] Types inferidos

---

#### **Task 1.7.3: Criar schemas de autenticação**

**Arquivo:** `frontend/src/lib/validations/auth.ts`

```typescript
import { z } from 'zod'
import { VALIDATION_MESSAGES, REGEX_PATTERNS } from '@/lib/constants/validation'

export const LoginSchema = z.object({
  email: z
    .string({ required_error: VALIDATION_MESSAGES.REQUIRED })
    .email(VALIDATION_MESSAGES.INVALID_EMAIL),
  password: z
    .string({ required_error: VALIDATION_MESSAGES.REQUIRED })
    .min(8, VALIDATION_MESSAGES.PASSWORD_MIN_LENGTH),
})

export const RegisterSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email(VALIDATION_MESSAGES.INVALID_EMAIL),
  phone: z.string().regex(REGEX_PATTERNS.PHONE, VALIDATION_MESSAGES.INVALID_PHONE),
  cpf: z.string().regex(REGEX_PATTERNS.CPF, VALIDATION_MESSAGES.INVALID_CPF),
  password: z.string().min(8, VALIDATION_MESSAGES.PASSWORD_MIN_LENGTH),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Senhas não conferem',
  path: ['confirmPassword'],
})

export type LoginInput = z.infer<typeof LoginSchema>
export type RegisterInput = z.infer<typeof RegisterSchema>
```

**Validação:**
- [ ] Validações robustas
- [ ] Regex aplicados
- [ ] Refinements funcionando

---

### **1.8 Lógica de Pricing (Calculadora)**

#### **Task 1.8.1: Criar função de cálculo de pricing completa**

**Arquivo:** `frontend/src/lib/pricing/calculations.ts`

```typescript
import { PRICING_CONSTANTS } from '@/lib/constants/pricing'
import { roundUp } from '@/lib/utils/math'
import type { PricingInput, PricingResult } from '@/types/pricing'
import { PricingInputSchema } from '@/lib/validations/pricing'

/**
 * Calcula preço completo de persiana seguindo fórmula de 8 passos
 */
export function calculatePrice(input: PricingInput): PricingResult {
  // Validar entrada
  const validatedInput = PricingInputSchema.parse(input)

  const {
    widthCm,
    heightCm,
    pricePerM2,
    lossFactor = PRICING_CONSTANTS.DEFAULT_LOSS_FACTOR,
    optionals = [],
    installationPercentage = PRICING_CONSTANTS.DEFAULT_INSTALLATION_PERCENTAGE,
    freightCost = 0,
    discountPercentage = 0,
  } = validatedInput

  // PASSO 1: Área bruta (m²)
  const areaBruta =
    (widthCm / PRICING_CONSTANTS.CM_TO_METERS) *
    (heightCm / PRICING_CONSTANTS.CM_TO_METERS)

  // PASSO 2: Área ajustada (com fator de perda)
  const areaAjustada = areaBruta * lossFactor

  // PASSO 3: Arredondar para cima (0.1 m²)
  const areaArredondada = roundUp(
    areaAjustada,
    PRICING_CONSTANTS.ROUNDING_DECIMAL_PLACES
  )

  // PASSO 4: Área cobrável (mínimo 1 m²)
  const areaCobravel = Math.max(
    areaArredondada,
    PRICING_CONSTANTS.MIN_CHARGEABLE_AREA_M2
  )

  // PASSO 5: Preço base
  const precoBase = areaCobravel * pricePerM2

  // PASSO 6: Opcionais
  const opcionaisCalculados = optionals.map((optional) => {
    let value = 0

    if (optional.type === 'fixed') {
      value = optional.value
    } else if (optional.type === 'per_meter') {
      const meters = widthCm / PRICING_CONSTANTS.CM_TO_METERS
      value = meters * optional.value
    } else if (optional.type === 'per_m2') {
      value = areaCobravel * optional.value
    }

    if (optional.quantity) {
      value *= optional.quantity
    }

    return {
      name: optional.name,
      value,
    }
  })

  const totalOpcionais = opcionaisCalculados.reduce(
    (sum, opt) => sum + opt.value,
    0
  )

  const subtotal = precoBase + totalOpcionais

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
    opcionais: opcionaisCalculados,
    subtotal,
    instalacao,
    frete: freightCost,
    totalBruto,
    desconto,
    totalFinal,
    breakdown: {
      step1_areaBruta: `${widthCm}cm × ${heightCm}cm = ${areaBruta.toFixed(2)}m²`,
      step2_areaAjustada: `${areaBruta.toFixed(2)}m² × ${lossFactor} = ${areaAjustada.toFixed(2)}m²`,
      step3_arredondada: `Arredondado: ${areaArredondada.toFixed(1)}m²`,
      step4_areaCobravel: `Área cobrável: ${areaCobravel.toFixed(1)}m² (mín: 1.0m²)`,
      step5_precoBase: `${areaCobravel.toFixed(1)}m² × R$ ${pricePerM2} = R$ ${precoBase.toFixed(2)}`,
      step6_opcionais: `Opcionais: R$ ${totalOpcionais.toFixed(2)}`,
      step7_instalacaoFrete: `Instalação (${(installationPercentage * 100).toFixed(0)}%): R$ ${instalacao.toFixed(2)} + Frete: R$ ${freightCost.toFixed(2)}`,
      step8_desconto: `Desconto (${discountPercentage}%): R$ ${desconto.toFixed(2)}`,
    },
  }
}
```

**Teste:** `frontend/src/lib/pricing/calculations.test.ts`

```typescript
import { describe, it, expect } from 'vitest'
import { calculatePrice } from './calculations'

describe('calculatePrice', () => {
  it('deve calcular preço corretamente conforme exemplo do PDF', () => {
    const result = calculatePrice({
      widthCm: 180,
      heightCm: 160,
      pricePerM2: 220,
      modelId: '123e4567-e89b-12d3-a456-426614174000',
      lossFactor: 1.1,
      optionals: [
        {
          id: '123e4567-e89b-12d3-a456-426614174001',
          name: 'Bandô',
          type: 'per_meter',
          value: 120,
        },
      ],
      installationPercentage: 0.08,
      freightCost: 80,
      discountPercentage: 5,
    })

    expect(result.areaBruta).toBeCloseTo(2.88, 2)
    expect(result.areaAjustada).toBeCloseTo(3.168, 3)
    expect(result.areaCobravel).toBe(3.2)
    expect(result.precoBase).toBe(704)
    expect(result.opcionais[0].value).toBe(216)
    expect(result.subtotal).toBe(920)
    expect(result.instalacao).toBeCloseTo(73.6, 1)
    expect(result.totalBruto).toBeCloseTo(1073.6, 1)
    expect(result.desconto).toBeCloseTo(53.68, 2)
    expect(result.totalFinal).toBeCloseTo(1019.92, 2)
  })

  it('deve aplicar área mínima de 1m²', () => {
    const result = calculatePrice({
      widthCm: 50,
      heightCm: 50,
      pricePerM2: 220,
      modelId: '123e4567-e89b-12d3-a456-426614174000',
    })

    expect(result.areaCobravel).toBe(1.0)
  })

  it('deve lançar erro para dimensões inválidas', () => {
    expect(() => {
      calculatePrice({
        widthCm: 400, // Acima do máximo (300cm)
        heightCm: 160,
        pricePerM2: 220,
        modelId: '123e4567-e89b-12d3-a456-426614174000',
      })
    }).toThrow()
  })
})
```

**Validação:**
- [ ] Cálculo conforme Exemplo 1 do PDF
- [ ] Todos 8 passos implementados
- [ ] Testes passando
- [ ] Coverage > 95%
- [ ] Breakdown detalhado

---

### **1.9 State Management (Zustand)**

#### **Task 1.9.1: Criar store de carrinho**

**Arquivo:** `frontend/src/store/cart-store.ts`

```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import type { Product } from '@/types/product'
import type { PricingResult } from '@/types/pricing'

export interface CartItem {
  id: string
  product: Product
  widthCm: number
  heightCm: number
  pricing: PricingResult
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'id'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    immer((set, get) => ({
      items: [],

      addItem: (item) => {
        set((state) => {
          const id = crypto.randomUUID()
          state.items.push({ ...item, id })
        })
      },

      removeItem: (id) => {
        set((state) => {
          state.items = state.items.filter((item) => item.id !== id)
        })
      },

      updateQuantity: (id, quantity) => {
        set((state) => {
          const item = state.items.find((item) => item.id === id)
          if (item) {
            item.quantity = quantity
          }
        })
      },

      clearCart: () => {
        set((state) => {
          state.items = []
        })
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.pricing.totalFinal * item.quantity,
          0
        )
      },
    })),
    {
      name: 'cart-storage',
    }
  )
)
```

**Validação:**
- [ ] Store funcionando
- [ ] Persist salvando no localStorage
- [ ] Immer para imutabilidade
- [ ] Funções testáveis

---

#### **Task 1.9.2: Criar store de autenticação**

**Arquivo:** `frontend/src/store/auth-store.ts`

```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: string
  name: string
  email: string
  role: 'USER' | 'ADMIN'
}

interface AuthStore {
  user: User | null
  token: string | null
  setAuth: (user: User, token: string) => void
  logout: () => void
  isAuthenticated: () => boolean
  isAdmin: () => boolean
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,

      setAuth: (user, token) => {
        set({ user, token })
      },

      logout: () => {
        set({ user: null, token: null })
      },

      isAuthenticated: () => {
        return get().token !== null
      },

      isAdmin: () => {
        return get().user?.role === 'ADMIN'
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)
```

**Validação:**
- [ ] Store funcionando
- [ ] Persist salvando token
- [ ] Helpers isAuthenticated/isAdmin

---

**Lembre-se: Segurança e qualidade não são opcionais. São requisitos.**

*Este documento deve ser consultado em TODA decisão de desenvolvimento.*
