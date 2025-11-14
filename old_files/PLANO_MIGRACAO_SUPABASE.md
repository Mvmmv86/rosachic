# 🚀 Plano de Migração: SQLite → Supabase (PostgreSQL)

## 📊 Análise da Estrutura Atual

### **Database Atual: SQLite**
- Arquivo: `backend/prisma/dev.db`
- Provider: `sqlite`
- Bom para: Desenvolvimento local
- Limitações: Não suporta produção, sem backups automáticos, sem escalabilidade

### **Database Destino: Supabase (PostgreSQL)**
- Cloud PostgreSQL gerenciado
- Backups automáticos
- Escalável
- Row Level Security (RLS)
- Auth integrado (opcional)

---

## 📋 Estrutura do Banco de Dados

### **Models (10 tabelas):**

1. ✅ **User** - Usuários e autenticação
2. ✅ **Product** - Catálogo de produtos
3. ✅ **Cart** - Carrinho de compras
4. ✅ **CartItem** - Itens do carrinho
5. ✅ **Order** - Pedidos
6. ✅ **OrderItem** - Itens dos pedidos
7. ✅ **Payment** - Pagamentos (Mercado Pago)
8. ✅ **Shipping** - Endereços de entrega dos pedidos
9. ✅ **Favorite** - Produtos favoritos
10. ✅ **Address** - Endereços salvos dos usuários
11. ✅ **SavedCard** - Cartões salvos (apenas tokens, PCI compliant)
12. ✅ **MercadoPagoConfig** - Configurações do gateway

### **Enums (6):**
- Role (USER, ADMIN)
- Luminosidade (Translucida, Blackout)
- Material (Tecido, PVC, Madeira, Bambu)
- OrderStatus (PENDING, CONFIRMED, PROCESSING, SHIPPED, DELIVERED, CANCELLED)
- PaymentMethod (PIX, CREDIT_CARD, BOLETO)
- PaymentStatus (PENDING, APPROVED, REJECTED, REFUNDED)
- CheckoutMode (INTERNAL, MERCADOPAGO, PAGSEGURO, STRIPE, PAYPAL)

---

## 🎯 Estratégia de Migração

### **Opção Escolhida: Migração Incremental (Recomendada)**

**Vantagens:**
- ✅ Segura (testa cada passo)
- ✅ Reversível (pode voltar para SQLite se necessário)
- ✅ Dados preservados
- ✅ Zero downtime (desenvolvimento)

**Passos:**
1. Criar projeto no Supabase
2. Configurar connection string
3. Ajustar schema.prisma para PostgreSQL
4. Executar migration
5. Migrar dados existentes (se houver)
6. Testar todas as funcionalidades
7. Atualizar .env de produção

---

## 📝 Passo a Passo Detalhado

### **Passo 1: Criar Projeto no Supabase** ⏳

1. Acesse: https://app.supabase.com
2. Clique em "New Project"
3. Preencha:
   ```
   Name: rosachic-production
   Database Password: [SENHA FORTE - GUARDAR!]
   Region: South America (São Paulo) - sa-east-1
   Pricing Plan: Free (até 500MB)
   ```
4. Aguardar criação do projeto (1-2 minutos)

---

### **Passo 2: Obter Connection String**

1. No dashboard do Supabase, vá em:
   **Settings** → **Database** → **Connection string**

2. Escolha: **URI** (ou Session mode)

3. Copie a connection string:
   ```
   postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-sa-east-1.pooler.supabase.com:6543/postgres
   ```

4. **Substitua `[YOUR-PASSWORD]` pela senha** que você criou

---

### **Passo 3: Atualizar schema.prisma**

**Arquivo:** `backend/prisma/schema.prisma`

**Mudanças Necessárias:**

```prisma
// ANTES:
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

// DEPOIS:
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

⚠️ **IMPORTANTE:** SQLite vs PostgreSQL tem algumas diferenças!

**Ajustes Necessários:**

1. **JSON Fields** (Product.ambientes, Product.imagens)
   - SQLite: String (serializado manualmente)
   - PostgreSQL: Pode usar `Json` type

2. **Auto-increment IDs**
   - SQLite: `@default(autoincrement())`
   - PostgreSQL: `@default(autoincrement())` (funciona igual)

3. **UUID**
   - Ambos suportam `@default(uuid())`
   - PostgreSQL nativo: `@default(dbgenerated("gen_random_uuid()"))`

**Recomendação:** Manter `@default(uuid())` (funciona em ambos)

---

### **Passo 4: Configurar .env**

**Arquivo:** `backend/.env`

**Adicionar/Modificar:**

```env
# Database (PostgreSQL - Supabase)
DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-sa-east-1.pooler.supabase.com:6543/postgres"

# Supabase (URLs e Keys)
SUPABASE_URL="https://[PROJECT-REF].supabase.co"
SUPABASE_ANON_KEY="[ANON-KEY]"
SUPABASE_SERVICE_KEY="[SERVICE-ROLE-KEY]" # Apenas para operações admin
```

**Onde encontrar:**
- Dashboard Supabase → **Settings** → **API**
- Project URL
- Project API keys (anon/public e service_role)

---

### **Passo 5: Criar Backup do SQLite (Segurança)**

Antes de qualquer mudança:

```bash
# Backup do banco atual
cp backend/prisma/dev.db backend/prisma/dev.db.backup-$(date +%Y%m%d)

# Ou exportar dados
npx prisma db pull --schema=schema.prisma
```

---

### **Passo 6: Executar Migration para PostgreSQL**

```bash
cd backend

# 1. Gerar migration
npx prisma migrate dev --name init_postgres

# 2. Aplicar no Supabase
npx prisma db push

# 3. Gerar Prisma Client
npx prisma generate
```

**O que acontece:**
- Prisma lê o schema
- Cria todas as tabelas no PostgreSQL
- Cria enums, indexes, foreign keys
- Gera client TypeScript atualizado

---

### **Passo 7: Migrar Dados Existentes (Se Houver)**

Se você tem dados importantes no SQLite (produtos, usuários, pedidos):

**Opção A: Script de Migração (Recomendado)**

```javascript
// backend/scripts/migrate-to-supabase.js
const { PrismaClient: SQLiteClient } = require('@prisma/client')
const { PrismaClient: PostgresClient } = require('@prisma/client')

// Criar 2 clientes
const sqliteDb = new SQLiteClient({
  datasources: { db: { url: 'file:./prisma/dev.db' } }
})

const postgresDb = new PostgresClient({
  datasources: { db: { url: process.env.SUPABASE_DATABASE_URL } }
})

async function migrate() {
  // 1. Migrar Users
  const users = await sqliteDb.user.findMany()
  for (const user of users) {
    await postgresDb.user.create({ data: user })
  }

  // 2. Migrar Products
  const products = await sqliteDb.product.findMany()
  for (const product of products) {
    await postgresDb.product.create({ data: product })
  }

  // ... (repetir para outras tabelas)
}

migrate()
```

**Opção B: Export/Import via SQL**

```bash
# Export SQLite
sqlite3 backend/prisma/dev.db .dump > backup.sql

# Converter para PostgreSQL (manual ou ferramentas)
# Import no Supabase via SQL Editor
```

**Opção C: Começar Limpo (Mais Simples)**
- ✅ Não migrar dados
- ✅ Começar com banco vazio
- ✅ Popular com seed de produtos
- ✅ Criar usuários de teste novos

---

### **Passo 8: Testar Conexão**

```bash
cd backend
npm run start:dev
```

**Verificar logs:**
```
✅ Prisma connected to PostgreSQL
✅ EmailService ready
✅ Backend is running on http://localhost:3001
```

**Testar endpoints:**
```bash
# Health check
curl http://localhost:3001

# Listar produtos
curl http://localhost:3001/products
```

---

### **Passo 9: Validação Completa**

**Checklist de Testes:**

- [ ] ✅ Backend inicia sem erros
- [ ] ✅ GET /products retorna produtos
- [ ] ✅ POST /auth/register cria usuário
- [ ] ✅ POST /auth/login retorna token
- [ ] ✅ POST /cart/items adiciona ao carrinho
- [ ] ✅ POST /orders cria pedido
- [ ] ✅ Email de pedido é enviado
- [ ] ✅ Admin consegue listar pedidos
- [ ] ✅ Admin consegue atualizar status

---

## 🔧 Ajustes Específicos para PostgreSQL

### **1. Campos JSON (Product)**

**Atual (SQLite):**
```prisma
ambientes  String  // JSON array stored as string
imagens    String  // JSON array stored as string
```

**Ideal (PostgreSQL):**
```prisma
ambientes  Json    // Native JSON type
imagens    Json    // Native JSON type
```

**⚠️ Isso requer atualizar o código:**
- Services que fazem `JSON.parse(product.ambientes)`
- Podem passar a usar `product.ambientes` direto

**Decisão:** Manter String por enquanto (compatibilidade), migrar depois

---

### **2. Indexes para Performance**

Adicionar indexes importantes:

```prisma
model Product {
  // ...
  @@index([ativo])
  @@index([material])
  @@index([luminosidade])
}

model Order {
  // ...
  @@index([userId])
  @@index([status])
  @@index([createdAt])
}

model User {
  // ...
  @@index([email])
}
```

---

### **3. Full-Text Search (Opcional)**

PostgreSQL suporta busca avançada:

```prisma
model Product {
  // ...
  @@index([modelo, descricao], type: Gin) // Full-text search
}
```

---

## 🔒 Segurança e Row Level Security (RLS)

### **Supabase RLS (Opcional)**

Se quiser usar autenticação do Supabase (em vez de JWT):

1. Habilitar RLS nas tabelas
2. Criar policies
3. Integrar Supabase Auth

**Recomendação:**
- ❌ **NÃO usar Supabase Auth** por enquanto
- ✅ Continuar com JWT (já implementado)
- ✅ Usar Supabase apenas como PostgreSQL

---

## ⚠️ Problemas Comuns e Soluções

### **1. Erro: "Relation does not exist"**
- **Causa:** Migration não foi aplicada
- **Solução:** `npx prisma db push`

### **2. Erro: "Connection timeout"**
- **Causa:** Connection string errada ou firewall
- **Solução:** Verificar URL, senha, e permitir IP no Supabase

### **3. Erro: "Enum type not found"**
- **Causa:** PostgreSQL não criou enums
- **Solução:** `npx prisma migrate reset` ou criar manualmente no SQL Editor

### **4. Dados não aparecem**
- **Causa:** Tabelas vazias após migration
- **Solução:** Rodar seed: `npx prisma db seed`

---

## 📦 Vantagens do Supabase

### **Para Desenvolvimento:**
- ✅ Banco na nuvem (acesso de qualquer lugar)
- ✅ Sem precisar rodar PostgreSQL local
- ✅ Interface web para SQL
- ✅ Logs e monitoring
- ✅ Backups automáticos

### **Para Produção:**
- ✅ Escalável (até 8GB no free tier)
- ✅ Connection pooling
- ✅ Read replicas (planos pagos)
- ✅ 99.9% uptime SLA
- ✅ CDN integrado para storage

---

## 💰 Limites do Plano Gratuito

| Recurso | Limite Free |
|---------|-------------|
| **Database** | 500MB |
| **Bandwidth** | 5GB/mês |
| **Storage** | 1GB |
| **API Requests** | Ilimitado |
| **Auth Users** | Ilimitado |
| **Rows** | Ilimitado |

**Quando Escalar:**
- Database > 500MB
- Bandwidth > 5GB/mês
- Precisar de read replicas

**Plano Pro:** $25/mês (8GB database, 50GB bandwidth)

---

## 🚀 Checklist de Migração

### **Pré-Migração:**
- [x] Analisar schema atual
- [ ] Criar projeto no Supabase
- [ ] Obter connection string
- [ ] Fazer backup do SQLite

### **Configuração:**
- [ ] Atualizar `schema.prisma` (provider: postgresql)
- [ ] Adicionar connection string no `.env`
- [ ] Adicionar Supabase keys no `.env`
- [ ] Garantir que `.env` está no `.gitignore`

### **Migration:**
- [ ] Executar `npx prisma migrate dev`
- [ ] Verificar tabelas criadas no Supabase
- [ ] Gerar Prisma Client
- [ ] Migrar dados (se necessário)

### **Testes:**
- [ ] Backend inicia corretamente
- [ ] CRUD de produtos funciona
- [ ] Auth funciona (register, login)
- [ ] Carrinho funciona
- [ ] Pedidos funcionam
- [ ] Emails são enviados
- [ ] Admin acessa dados

### **Produção:**
- [ ] Atualizar variáveis de ambiente de produção
- [ ] Deploy do backend
- [ ] Deploy do frontend
- [ ] Testar em produção
- [ ] Monitorar performance

---

## 🛠️ Comandos Úteis

### **Desenvolvimento:**
```bash
# Ver status do banco
npx prisma studio

# Ver schema gerado
npx prisma db pull

# Resetar banco (CUIDADO!)
npx prisma migrate reset

# Seed de dados
npx prisma db seed
```

### **Supabase:**
```bash
# SQL Editor no dashboard
https://app.supabase.com/project/[PROJECT-REF]/editor

# Backups
https://app.supabase.com/project/[PROJECT-REF]/database/backups

# Logs
https://app.supabase.com/project/[PROJECT-REF]/logs/explorer
```

---

## 📊 Comparação: SQLite vs PostgreSQL

| Recurso | SQLite | PostgreSQL (Supabase) |
|---------|--------|----------------------|
| **Tipo** | Arquivo local | Cloud database |
| **Concorrência** | Limitada | Excelente |
| **Escalabilidade** | ❌ Não | ✅ Sim |
| **Backups** | Manual | Automático |
| **JSON** | String | Native JSON |
| **Full-text Search** | Básico | Avançado |
| **Produção** | ❌ Não recomendado | ✅ Pronto |
| **Custo** | Grátis | Grátis (500MB) |

---

## 🎯 Próximos Passos

**Para Começar a Migração:**

1. **Me passe as credenciais do Supabase:**
   - Project URL
   - Database Password (que você criou)
   - Anon Key
   - Service Role Key (opcional)

2. **Decisão: Migrar dados ou começar limpo?**
   - ✅ **Limpo** (recomendado): Banco vazio, criar seed de produtos
   - ⏳ **Com dados**: Migrar usuários/pedidos existentes

3. **Confirmar que quer prosseguir**
   - Posso fazer toda a configuração automaticamente
   - Leva ~10 minutos
   - Reversível (pode voltar para SQLite)

---

## ⚠️ Avisos Importantes

### **Não Commitar:**
- ❌ Database passwords
- ❌ Supabase service role key
- ❌ API keys privadas
- ✅ Usar apenas variáveis de ambiente

### **Backup:**
- ✅ Sempre fazer backup antes de migration
- ✅ Testar em desenvolvimento primeiro
- ✅ Nunca rodar `migrate reset` em produção

### **Performance:**
- ✅ Usar connection pooling do Supabase
- ✅ Criar indexes em queries frequentes
- ✅ Monitorar slow queries no dashboard

---

**🎊 Pronto para Começar a Migração?**

Me passe as credenciais do Supabase e eu configuro tudo automaticamente!

---

**Data:** 17/10/2025
**Status:** ⏳ Aguardando credenciais do Supabase
