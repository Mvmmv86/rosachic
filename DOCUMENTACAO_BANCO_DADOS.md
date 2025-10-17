# 📊 Documentação do Banco de Dados - Rosa Chic

## 🗄️ Database: PostgreSQL (Supabase)

**Provider:** PostgreSQL 15
**Host:** Supabase Cloud (aws-1-us-east-1)
**Project:** dcvoqjyicvbhjegpcymk
**Schema:** public
**ORM:** Prisma 6.17.0

---

## 📋 Tabelas (12 no total)

### 1️⃣ **users** - Usuários e Clientes

Armazena todos os usuários do sistema (clientes e administradores).

| Campo | Tipo | Descrição | Constraints |
|-------|------|-----------|-------------|
| `id` | UUID | Identificador único | PRIMARY KEY, DEFAULT uuid() |
| `email` | String | Email do usuário | UNIQUE, NOT NULL |
| `password_hash` | String | Hash bcrypt da senha | NOT NULL |
| `name` | String | Nome completo | NOT NULL |
| `phone` | String | Telefone (opcional) | NULLABLE |
| `cpf` | String | CPF (opcional) | UNIQUE, NULLABLE |
| `birth_date` | DateTime | Data de nascimento | NULLABLE |
| `gender` | String | Gênero | NULLABLE |
| `role` | Enum | Papel do usuário | DEFAULT 'USER', NOT NULL |
| `created_at` | DateTime | Data de criação | DEFAULT now() |
| `updated_at` | DateTime | Última atualização | AUTO UPDATE |

**Relações:**
- `orders[]` - Um usuário pode ter vários pedidos
- `favorites[]` - Produtos favoritos do usuário
- `addresses[]` - Endereços salvos
- `cart` - Carrinho de compras (1:1)
- `saved_cards[]` - Cartões salvos

**Enum `Role`:**
- `USER` - Cliente comum
- `ADMIN` - Administrador do sistema

**Índices Sugeridos:**
- `email` (UNIQUE INDEX - já existe)
- `cpf` (UNIQUE INDEX - já existe)
- `role` (para queries de admin)

---

### 2️⃣ **products** - Catálogo de Produtos

Armazena todas as persianas disponíveis para venda.

| Campo | Tipo | Descrição | Constraints |
|-------|------|-----------|-------------|
| `id` | UUID | Identificador único | PRIMARY KEY |
| `codigo` | String | Código do produto (ex: "RC-001") | UNIQUE, NOT NULL |
| `modelo` | String | Nome/modelo da persiana | NOT NULL |
| `luminosidade` | Enum | Nível de luz (Translúcida/Blackout) | NOT NULL |
| `material` | Enum | Material (Tecido/PVC/Madeira/Bambu) | NOT NULL |
| `valor_m2` | Float | Preço por metro quadrado | NOT NULL |
| `largura_max_cm` | Int | Largura máxima em cm | NOT NULL |
| `altura_max_cm` | Int | Altura máxima em cm | NOT NULL |
| `area_min_m2` | Float | Área mínima para venda | DEFAULT 1.0 |
| `ambientes` | String | Array JSON de ambientes | NOT NULL |
| `imagens` | String | Array JSON de URLs de imagens | NOT NULL |
| `descricao` | String | Descrição do produto | NOT NULL |
| `estoque` | Int | Quantidade em estoque | DEFAULT 0 |
| `ativo` | Boolean | Produto ativo/visível | DEFAULT true |
| `created_at` | DateTime | Data de criação | DEFAULT now() |
| `updated_at` | DateTime | Última atualização | AUTO UPDATE |

**Relações:**
- `order_items[]` - Itens de pedidos que usam este produto
- `favorites[]` - Usuários que favoritaram
- `cart_items[]` - Itens em carrinhos

**Enum `Luminosidade`:**
- `Translucida` - Permite passagem de luz
- `Blackout` - Bloqueia 100% da luz

**Enum `Material`:**
- `Tecido`
- `PVC`
- `Madeira`
- `Bambu`

**Campo `ambientes` (JSON String):**
```json
["Sala", "Quarto", "Escritório"]
```

**Campo `imagens` (JSON String):**
```json
["/uploads/produto-1.jpg", "/uploads/produto-2.jpg"]
```

**Índices Sugeridos:**
- `codigo` (UNIQUE INDEX - já existe)
- `ativo` (para filtrar produtos ativos)
- `material` (para filtros)
- `luminosidade` (para filtros)

---

### 3️⃣ **carts** - Carrinhos de Compras

Um carrinho por usuário (relação 1:1).

| Campo | Tipo | Descrição | Constraints |
|-------|------|-----------|-------------|
| `id` | UUID | Identificador único | PRIMARY KEY |
| `user_id` | UUID | ID do usuário | UNIQUE, FOREIGN KEY → users(id) |
| `created_at` | DateTime | Data de criação | DEFAULT now() |
| `updated_at` | DateTime | Última atualização | AUTO UPDATE |

**Relações:**
- `user` - Dono do carrinho (1:1)
- `items[]` - Itens dentro do carrinho

**On Delete:** CASCADE (deletar usuário deleta carrinho)

---

### 4️⃣ **cart_items** - Itens do Carrinho

Cada produto adicionado ao carrinho com suas medidas específicas.

| Campo | Tipo | Descrição | Constraints |
|-------|------|-----------|-------------|
| `id` | UUID | Identificador único | PRIMARY KEY |
| `cart_id` | UUID | ID do carrinho | FOREIGN KEY → carts(id) |
| `product_id` | UUID | ID do produto | FOREIGN KEY → products(id) |
| `width_cm` | Int | Largura escolhida (cm) | NOT NULL |
| `height_cm` | Int | Altura escolhida (cm) | NOT NULL |
| `area_cobravel` | Float | Área calculada (m²) | NOT NULL |
| `price_per_m2` | Float | Preço/m² no momento | NOT NULL |
| `quantity` | Int | Quantidade de unidades | DEFAULT 1 |
| `subtotal` | Float | Preço total do item | NOT NULL |
| `created_at` | DateTime | Data de criação | DEFAULT now() |
| `updated_at` | DateTime | Última atualização | AUTO UPDATE |

**Relações:**
- `cart` - Carrinho pai
- `product` - Produto referenciado

**On Delete:** CASCADE (deletar carrinho deleta itens)

**Cálculos:**
```
area_cobravel = (width_cm × height_cm) / 10000
subtotal = area_cobravel × price_per_m2 × quantity
```

---

### 5️⃣ **orders** - Pedidos

Pedidos finalizados pelos clientes.

| Campo | Tipo | Descrição | Constraints |
|-------|------|-----------|-------------|
| `id` | UUID | Número do pedido | PRIMARY KEY |
| `user_id` | UUID | Cliente que fez o pedido | FOREIGN KEY → users(id) |
| `status` | Enum | Status do pedido | DEFAULT 'PENDING' |
| `subtotal` | Float | Soma dos produtos | NOT NULL |
| `instalacao` | Float | Taxa de instalação | NOT NULL |
| `frete` | Float | Valor do frete | NOT NULL |
| `desconto` | Float | Desconto aplicado | DEFAULT 0 |
| `total` | Float | Valor total final | NOT NULL |
| `payment_method` | Enum | Forma de pagamento | NOT NULL |
| `payment_status` | Enum | Status do pagamento | DEFAULT 'PENDING' |
| `created_at` | DateTime | Data do pedido | DEFAULT now() |
| `updated_at` | DateTime | Última atualização | AUTO UPDATE |

**Relações:**
- `user` - Cliente que fez o pedido
- `items[]` - Produtos do pedido
- `shipping` - Endereço de entrega (1:1)
- `payment` - Dados do pagamento (1:1)

**Enum `OrderStatus`:**
- `PENDING` - Aguardando confirmação
- `CONFIRMED` - Pedido confirmado
- `PROCESSING` - Em preparação
- `SHIPPED` - Enviado
- `DELIVERED` - Entregue
- `CANCELLED` - Cancelado

**Enum `PaymentMethod`:**
- `PIX` - Pagamento via PIX
- `CREDIT_CARD` - Cartão de crédito
- `BOLETO` - Boleto bancário

**Enum `PaymentStatus`:**
- `PENDING` - Aguardando pagamento
- `APPROVED` - Pagamento aprovado
- `REJECTED` - Pagamento recusado
- `REFUNDED` - Estornado

**Índices Sugeridos:**
- `user_id` (para listar pedidos do cliente)
- `status` (para admin filtrar por status)
- `created_at` (para ordenação)

---

### 6️⃣ **order_items** - Itens dos Pedidos

Produtos individuais dentro de cada pedido (com dimensões).

| Campo | Tipo | Descrição | Constraints |
|-------|------|-----------|-------------|
| `id` | UUID | Identificador único | PRIMARY KEY |
| `order_id` | UUID | ID do pedido | FOREIGN KEY → orders(id) |
| `product_id` | UUID | ID do produto | FOREIGN KEY → products(id) |
| `width_cm` | Int | Largura comprada (cm) | NOT NULL |
| `height_cm` | Int | Altura comprada (cm) | NOT NULL |
| `area_cobravel` | Float | Área calculada (m²) | NOT NULL |
| `price_per_m2` | Float | Preço/m² cobrado | NOT NULL |
| `quantity` | Int | Quantidade de unidades | DEFAULT 1 |
| `subtotal` | Float | Valor total do item | NOT NULL |
| `created_at` | DateTime | Data de criação | DEFAULT now() |

**Relações:**
- `order` - Pedido pai
- `product` - Produto vendido

**On Delete:** CASCADE (deletar pedido deleta itens)

**Por que armazenar preço?**
- Histórico (preço pode mudar no futuro)
- Auditoria
- Relatórios financeiros precisos

---

### 7️⃣ **shipping** - Endereços de Entrega

Endereço específico de cada pedido (snapshot no momento da compra).

| Campo | Tipo | Descrição | Constraints |
|-------|------|-----------|-------------|
| `id` | UUID | Identificador único | PRIMARY KEY |
| `order_id` | UUID | ID do pedido | UNIQUE, FOREIGN KEY → orders(id) |
| `recipient_name` | String | Nome do destinatário | NOT NULL |
| `street` | String | Rua/Avenida | NOT NULL |
| `number` | String | Número | NOT NULL |
| `complement` | String | Complemento (apt, bloco) | NULLABLE |
| `neighborhood` | String | Bairro | NOT NULL |
| `city` | String | Cidade | NOT NULL |
| `state` | String | Estado (UF) | NOT NULL |
| `zip_code` | String | CEP | NOT NULL |
| `tracking_code` | String | Código de rastreamento | NULLABLE |
| `created_at` | DateTime | Data de criação | DEFAULT now() |
| `updated_at` | DateTime | Última atualização | AUTO UPDATE |

**Relações:**
- `order` - Pedido relacionado (1:1)

**On Delete:** CASCADE (deletar pedido deleta shipping)

**Por que separar de Address?**
- Snapshot do endereço no momento da compra
- Cliente pode mudar endereço salvo depois
- Histórico imutável para cada pedido

---

### 8️⃣ **payments** - Pagamentos (Mercado Pago)

Dados detalhados de cada pagamento processado.

| Campo | Tipo | Descrição | Constraints |
|-------|------|-----------|-------------|
| `id` | UUID | Identificador único | PRIMARY KEY |
| `order_id` | UUID | ID do pedido | UNIQUE, FOREIGN KEY → orders(id) |
| `mercado_pago_id` | String | ID do pagamento no MP | UNIQUE, NULLABLE |
| `preference_id` | String | ID da preferência MP | UNIQUE, NULLABLE |
| `status` | Enum | Status do pagamento | DEFAULT 'PENDING' |
| `amount` | Float | Valor total | NOT NULL |
| `payment_method` | Enum | Forma de pagamento | NOT NULL |
| `payment_method_id` | String | ID do método (MP) | NULLABLE |
| `transaction_amount` | Float | Valor da transação | NULLABLE |
| `net_amount` | Float | Valor líquido (após taxas) | NULLABLE |
| `mercado_pago_fee` | Float | Taxa do Mercado Pago | NULLABLE |
| `payer_email` | String | Email do pagador | NULLABLE |
| `payer_document` | String | CPF do pagador | NULLABLE |
| `payer_name` | String | Nome do pagador | NULLABLE |
| `external_reference` | String | Referência externa | NULLABLE |
| `description` | String | Descrição do pagamento | NULLABLE |
| `pix_qr_code` | String | Texto do QR Code PIX | NULLABLE |
| `pix_qr_code_base64` | String | Imagem QR Code Base64 | NULLABLE |
| `boleto_url` | String | URL do boleto | NULLABLE |
| `boleto_barcode` | String | Código de barras do boleto | NULLABLE |
| `approved_at` | DateTime | Data de aprovação | NULLABLE |
| `expires_at` | DateTime | Data de expiração | NULLABLE |
| `webhook_notifications` | String | Notificações recebidas (JSON) | NULLABLE |
| `created_at` | DateTime | Data de criação | DEFAULT now() |
| `updated_at` | DateTime | Última atualização | AUTO UPDATE |

**Relações:**
- `order` - Pedido relacionado (1:1)

**On Delete:** CASCADE

**Webhooks:**
Recebe notificações do Mercado Pago e atualiza status automaticamente.

---

### 9️⃣ **addresses** - Endereços Salvos

Endereços salvos pelos clientes para reutilizar em compras futuras.

| Campo | Tipo | Descrição | Constraints |
|-------|------|-----------|-------------|
| `id` | UUID | Identificador único | PRIMARY KEY |
| `user_id` | UUID | Dono do endereço | FOREIGN KEY → users(id) |
| `name` | String | Apelido (Casa, Trabalho) | NOT NULL |
| `street` | String | Rua/Avenida | NOT NULL |
| `number` | String | Número | NOT NULL |
| `complement` | String | Complemento | NULLABLE |
| `neighborhood` | String | Bairro | NOT NULL |
| `city` | String | Cidade | NOT NULL |
| `state` | String | Estado (UF) | NOT NULL |
| `zip_code` | String | CEP | NOT NULL |
| `is_default` | Boolean | Endereço padrão | DEFAULT false |
| `created_at` | DateTime | Data de criação | DEFAULT now() |
| `updated_at` | DateTime | Última atualização | AUTO UPDATE |

**Relações:**
- `user` - Usuário dono do endereço

**On Delete:** CASCADE

**Regra de negócio:**
- Apenas 1 endereço pode ter `is_default = true` por usuário
- Implementar validação no backend

---

### 🔟 **saved_cards** - Cartões Salvos (PCI Compliant)

Armazena apenas dados não-sensíveis de cartões (tokens).

| Campo | Tipo | Descrição | Constraints |
|-------|------|-----------|-------------|
| `id` | UUID | Identificador único | PRIMARY KEY |
| `user_id` | UUID | Dono do cartão | FOREIGN KEY → users(id) |
| `card_token` | String | Token do Mercado Pago | NOT NULL |
| `last_four_digits` | String | Últimos 4 dígitos | NOT NULL |
| `brand` | String | Bandeira (Visa, Master) | NOT NULL |
| `expiration_month` | String | Mês de validade (MM) | NOT NULL |
| `expiration_year` | String | Ano de validade (YYYY) | NOT NULL |
| `holder_name` | String | Nome do titular | NOT NULL |
| `is_default` | Boolean | Cartão padrão | DEFAULT false |
| `created_at` | DateTime | Data de criação | DEFAULT now() |
| `updated_at` | DateTime | Última atualização | AUTO UPDATE |

**Relações:**
- `user` - Dono do cartão

**On Delete:** CASCADE

**⚠️ SEGURANÇA (PCI DSS Compliance):**
- ❌ **NUNCA** armazenar número completo do cartão
- ❌ **NUNCA** armazenar CVV
- ✅ Usar tokens do gateway de pagamento
- ✅ Armazenar apenas últimos 4 dígitos
- ✅ HTTPS obrigatório

---

### 1️⃣1️⃣ **favorites** - Produtos Favoritos

Lista de produtos favoritos de cada usuário.

| Campo | Tipo | Descrição | Constraints |
|-------|------|-----------|-------------|
| `id` | UUID | Identificador único | PRIMARY KEY |
| `user_id` | UUID | Usuário | FOREIGN KEY → users(id) |
| `product_id` | UUID | Produto favoritado | FOREIGN KEY → products(id) |
| `created_at` | DateTime | Data que favoritou | DEFAULT now() |

**Relações:**
- `user` - Usuário que favoritou
- `product` - Produto favoritado

**On Delete:** CASCADE (deletar usuário ou produto remove favorito)

**Constraint Único:**
- `UNIQUE(user_id, product_id)` - Usuário não pode favoritar o mesmo produto 2x

---

### 1️⃣2️⃣ **mercadopago_config** - Configurações do Gateway

Configurações globais do Mercado Pago (1 registro apenas).

| Campo | Tipo | Descrição | Constraints |
|-------|------|-----------|-------------|
| `id` | UUID | Identificador único | PRIMARY KEY |
| `checkout_mode` | Enum | Modo de checkout | DEFAULT 'INTERNAL' |
| `public_key` | String | Public key do MP | DEFAULT "" |
| `access_token` | String | Access token do MP | DEFAULT "" |
| `webhook_secret` | String | Secret para validar webhooks | NULLABLE |
| `is_production` | Boolean | Ambiente (prod/sandbox) | DEFAULT false |
| `notification_url` | String | URL para webhooks | NULLABLE |
| `success_url` | String | URL de sucesso | DEFAULT "/checkout/sucesso" |
| `failure_url` | String | URL de falha | DEFAULT "/checkout/falha" |
| `pending_url` | String | URL de pendente | DEFAULT "/checkout/pendente" |
| `created_at` | DateTime | Data de criação | DEFAULT now() |
| `updated_at` | DateTime | Última atualização | AUTO UPDATE |

**Enum `CheckoutMode`:**
- `INTERNAL` - Checkout próprio do site
- `MERCADOPAGO` - Redireciona para MP
- `PAGSEGURO` - Futuro
- `STRIPE` - Futuro
- `PAYPAL` - Futuro

**Uso:**
- Configurado uma única vez pelo admin
- Usado por todos os pagamentos

---

## 🔗 Diagrama de Relações

```
users (1) ────┬──── (N) orders ────┬──── (N) order_items ───→ products
              │                    │
              │                    └──── (1) shipping
              │                    └──── (1) payments
              │
              ├──── (N) addresses
              ├──── (N) favorites ───→ products
              ├──── (1) cart ───→ (N) cart_items ───→ products
              └──── (N) saved_cards
```

---

## 📊 Estatísticas e Métricas (Queries Úteis)

### **Total de Clientes:**
```sql
SELECT COUNT(*) FROM users WHERE role = 'USER';
```

### **Total de Pedidos por Status:**
```sql
SELECT status, COUNT(*)
FROM orders
GROUP BY status;
```

### **Produtos Mais Vendidos:**
```sql
SELECT p.modelo, SUM(oi.quantity) as total_vendido
FROM order_items oi
JOIN products p ON oi.product_id = p.id
GROUP BY p.id
ORDER BY total_vendido DESC
LIMIT 10;
```

### **Receita Total:**
```sql
SELECT SUM(total)
FROM orders
WHERE status != 'CANCELLED';
```

### **Ticket Médio:**
```sql
SELECT AVG(total)
FROM orders
WHERE status NOT IN ('CANCELLED', 'PENDING');
```

### **Produtos em Baixo Estoque:**
```sql
SELECT codigo, modelo, estoque
FROM products
WHERE estoque < 5 AND ativo = true;
```

---

## 🔒 Segurança e Boas Práticas

### **Senhas:**
- ✅ Usar bcrypt com SALT_ROUNDS = 12
- ✅ NUNCA armazenar senha em texto plano
- ✅ Validar força da senha no frontend e backend

### **Dados Sensíveis:**
- ✅ CPF: criptografar ou hashear (opcional)
- ✅ Cartões: APENAS tokens e últimos 4 dígitos
- ✅ Emails: validar formato
- ✅ Telefones: validar formato brasileiro

### **Soft Delete vs Hard Delete:**
**Atual:** Hard delete (dados são removidos)

**Recomendação para Produção:**
```prisma
model User {
  deletedAt DateTime? @map("deleted_at")
}
```
- Permite recuperar dados
- Compliance com LGPD
- Auditoria

### **LGPD (Lei Geral de Proteção de Dados):**
- [ ] Implementar endpoint de exportar dados do usuário
- [ ] Implementar endpoint de deletar conta (+ todos dados)
- [ ] Adicionar checkbox de aceite de termos
- [ ] Política de privacidade visível

---

## 🚀 Backup e Recuperação

### **Backups Automáticos (Supabase):**
- ✅ Daily backups (últimos 7 dias - plano free)
- ✅ Point-in-time recovery (planos pagos)
- ✅ Acessar em: https://app.supabase.com/project/dcvoqjyicvbhjegpcymk/database/backups

### **Backup Manual:**
```bash
# Export completo
pg_dump [CONNECTION_STRING] > backup.sql

# Export apenas dados
pg_dump --data-only [CONNECTION_STRING] > data.sql

# Restore
psql [CONNECTION_STRING] < backup.sql
```

---

## 📈 Escalabilidade

### **Plano Free (Atual):**
- 500MB database
- Suficiente para ~10.000 pedidos
- ~50.000 produtos
- ~100.000 usuários

### **Quando Escalar:**
- Database > 400MB (80% do limite)
- Queries lentas (> 1s)
- Muitos usuários simultâneos

### **Otimizações Futuras:**
1. **Indexes compostos** para queries frequentes
2. **Particionamento** de tabelas grandes (orders por ano)
3. **Materialized Views** para relatórios
4. **Read Replicas** para queries pesadas
5. **Cache** (Redis) para dados frequentes

---

## 🧪 Dados de Teste

### **Criar Usuário Admin:**
```sql
INSERT INTO users (id, email, password_hash, name, role)
VALUES (
  gen_random_uuid(),
  'admin@rosachic.com.br',
  -- Hash da senha "admin123" (trocar depois!)
  '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyKaeOzxeW5.',
  'Admin Rosa Chic',
  'ADMIN'
);
```

### **Seed de Produtos:**
```bash
cd backend
npm run seed
```

---

## 📚 Referências

- **Prisma Docs:** https://www.prisma.io/docs
- **Supabase Docs:** https://supabase.com/docs
- **PostgreSQL Docs:** https://www.postgresql.org/docs/
- **PCI DSS:** https://www.pcisecuritystandards.org/

---

**Data:** 17/10/2025
**Database:** PostgreSQL 15 (Supabase)
**Total de Tabelas:** 12
**Total de Enums:** 6
**Status:** ✅ Migrado com Sucesso!
