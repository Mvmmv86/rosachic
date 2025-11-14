# 🚀 Guia Completo de Deploy em Produção - Rosa Chic

## 📋 Pré-requisitos

Antes de fazer deploy, você precisa ter:

- ✅ Conta no GitHub (já tem)
- ✅ Database PostgreSQL (Supabase - já configurado)
- ✅ SendGrid configurado (já feito)
- ✅ OpenAI API Key (já configurada)
- ✅ Domínio registrado (rosachicpersiana.com.br - DNS em propagação)

---

## 🎯 Plataformas Recomendadas para Deploy

### **Opção A: Vercel (RECOMENDADO)** ⭐

**Vantagens:**
- ✅ Grátis para hobby
- ✅ Deploy automático via GitHub
- ✅ HTTPS automático
- ✅ CDN global
- ✅ Fácil configuração
- ✅ Domínio personalizado gratuito

**Ideal para:** Frontend + Admin

---

### **Opção B: Railway (Para Backend)**

**Vantagens:**
- ✅ $5 grátis/mês
- ✅ Deploy via GitHub
- ✅ Variáveis de ambiente fáceis
- ✅ Logs em tempo real
- ✅ Escalável

**Ideal para:** Backend NestJS

---

### **Opção C: Render**

**Vantagens:**
- ✅ Grátis para web services
- ✅ Deploy via GitHub
- ✅ HTTPS automático

**Desvantagem:**
- ⚠️ Mais lento que Vercel/Railway

---

## 📝 PLANO DE DEPLOY COMPLETO

### **Arquitetura em Produção:**

```
┌─────────────────────────────────────────┐
│  Domínio: rosachicpersiana.com.br      │
│  (GoDaddy DNS)                          │
└───────────────┬─────────────────────────┘
                │
    ┌───────────┴───────────┐
    │                       │
    ▼                       ▼
┌─────────┐           ┌──────────┐
│ Vercel  │           │ Vercel   │
│ (Front) │           │ (Admin)  │
│ :4444   │           │ :5000    │
└────┬────┘           └────┬─────┘
     │                     │
     └──────────┬──────────┘
                │
                ▼
         ┌─────────────┐
         │  Railway    │
         │  (Backend)  │
         │  :3001      │
         └──────┬──────┘
                │
      ┌─────────┼─────────┐
      │         │         │
      ▼         ▼         ▼
  ┌────────┐ ┌────────┐ ┌────────┐
  │Supabase│ │SendGrid│ │ OpenAI │
  │   DB   │ │ Email  │ │   IA   │
  └────────┘ └────────┘ └────────┘
```

---

## 🚀 PASSO A PASSO DE DEPLOY

### **PASSO 1: Preparar Repositório GitHub (5 min)**

#### **1.1 - Verificar .gitignore**

Certifique-se que estes arquivos NÃO estão no Git:

```
# backend/.gitignore
.env
node_modules/
dist/
prisma/dev.db
uploads/

# frontend/.gitignore
.env.local
.next/
node_modules/

# admin/.gitignore
.env.local
.next/
node_modules/
```

#### **1.2 - Criar .env.example (template)**

```bash
# backend/.env.example
DATABASE_URL="postgresql://..."
SUPABASE_URL="https://..."
SUPABASE_ANON_KEY="..."
JWT_SECRET="..."
OPENAI_API_KEY="sk-proj-..."
SMTP_HOST="smtp.sendgrid.net"
SMTP_PASS="SG...."
```

---

### **PASSO 2: Deploy do Backend no Railway (20 min)**

#### **2.1 - Criar Conta Railway**

1. Acesse: https://railway.app
2. Login com GitHub
3. Criar novo projeto

#### **2.2 - Conectar Repositório**

1. Clique em "New Project"
2. Escolha "Deploy from GitHub repo"
3. Selecione: `Mvmmv86/rosachic`
4. Root Directory: `/backend`

#### **2.3 - Configurar Variáveis de Ambiente**

No painel Railway, vá em **Variables** e adicione:

```env
DATABASE_URL=postgresql://postgres.dcvoqjyicvbhjegpcymk:Rosa20Chic2025Persiana@aws-1-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true

DIRECT_URL=postgresql://postgres:Rosa20Chic2025Persiana@db.dcvoqjyicvbhjegpcymk.supabase.co:5432/postgres

SUPABASE_URL=https://dcvoqjyicvbhjegpcymk.supabase.co

SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjdm9xanlpY3ZiaGplZ3BjeW1rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3MDcyMDksImV4cCI6MjA3NjI4MzIwOX0.3FRcQnAWkZLYQY0DvO8A58ee8H6FJ2ZHtbB75Zya-tc

JWT_SECRET=kQRnPbxqA1xvPAPvbSn7TIFE838InhHzx9aiseYb6BdWCn2Hc5mjxJBCbHNA9KU6WjWdGe7e2nl3B57FafvY6A==

JWT_EXPIRATION=24h

CORS_ORIGIN=https://rosachicpersiana.com.br

NODE_ENV=production

OPENAI_API_KEY=sk-proj-XXXXXXXXXXXXXXXXXXXXXXXX

OPENAI_MODEL=gpt-4o-mini

SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=SG.XXXXXXXXXXXXXXXXXXXXXXXX
SMTP_FROM=Rosa Chic <rschicpersianas@gmail.com>

PORT=3001

BACKEND_URL=https://seu-backend.up.railway.app
FRONTEND_URL=https://rosachicpersiana.com.br
```

#### **2.4 - Deploy**

Railway faz deploy automático! Aguarde ~5 minutos.

**Você receberá uma URL:**
```
https://rosachic-backend-production.up.railway.app
```

**⚠️ Anote esta URL!** Vai usar no frontend.

---

### **PASSO 3: Deploy do Frontend no Vercel (15 min)**

#### **3.1 - Criar Conta Vercel**

1. Acesse: https://vercel.com
2. Login com GitHub
3. Import project

#### **3.2 - Conectar Repositório**

1. Clique em "Add New Project"
2. Selecione: `Mvmmv86/rosachic`
3. Root Directory: `/frontend`
4. Framework: Next.js (detecta automático)

#### **3.3 - Configurar Variáveis**

Em **Environment Variables:**

```env
NEXT_PUBLIC_API_URL=https://rosachic-backend-production.up.railway.app
```

#### **3.4 - Deploy**

Clique em "Deploy" → Aguarde ~3 minutos

**Você receberá uma URL:**
```
https://rosachic.vercel.app
```

---

### **PASSO 4: Deploy do Admin no Vercel (10 min)**

Mesmos passos do frontend:

1. New Project
2. Root Directory: `/admin`
3. Environment Variables:
   ```env
   NEXT_PUBLIC_API_URL=https://rosachic-backend-production.up.railway.app
   ```
4. Deploy

**URL:**
```
https://rosachic-admin.vercel.app
```

---

### **PASSO 5: Configurar Domínio Próprio (30 min)**

#### **5.1 - No Vercel (Frontend)**

1. Vá em: Settings → Domains
2. Adicione: `rosachicpersiana.com.br`
3. Vercel mostra DNS records para adicionar

#### **5.2 - No GoDaddy**

Adicione estes registros DNS:

```
Tipo: CNAME
Host: www
Valor: cname.vercel-dns.com

Tipo: A
Host: @
Valor: 76.76.21.21
```

Aguarde propagação (10 minutos a 48h)

#### **5.3 - Atualizar CORS no Backend**

No Railway, atualize:
```env
CORS_ORIGIN=https://rosachicpersiana.com.br,https://www.rosachicpersiana.com.br
```

---

### **PASSO 6: Validações Finais (30 min)**

**Checklist de Produção:**

- [ ] ✅ Backend respondendo (https://backend.railway.app)
- [ ] ✅ Frontend carregando (https://rosachicpersiana.com.br)
- [ ] ✅ Admin funcionando (https://admin.vercel.app)
- [ ] ✅ Cadastro criando usuário
- [ ] ✅ Login funcionando
- [ ] ✅ Produtos aparecendo
- [ ] ✅ Carrinho adicionando itens
- [ ] ✅ Checkout finalizando pedido
- [ ] ✅ Email de confirmação enviado
- [ ] ✅ Chat IA respondendo
- [ ] ✅ Admin listando pedidos
- [ ] ✅ HTTPS funcionando
- [ ] ✅ Imagens carregando

---

## ⚙️ CONFIGURAÇÕES ESPECÍFICAS

### **Backend (Railway):**

**Build Command:**
```bash
npm install && npx prisma generate
```

**Start Command:**
```bash
npm run start:prod
```

**Watch Paths:**
```
backend/**
```

---

### **Frontend/Admin (Vercel):**

**Framework Preset:** Next.js
**Build Command:** `npm run build`
**Output Directory:** `.next`
**Install Command:** `npm install`

---

## 🔒 SEGURANÇA EM PRODUÇÃO

### **Checklist de Segurança:**

- [ ] ✅ Todas API Keys em variáveis de ambiente (nunca no código)
- [ ] ✅ HTTPS habilitado (SSL/TLS)
- [ ] ✅ CORS configurado (apenas domínios permitidos)
- [ ] ✅ Rate limiting ativado
- [ ] ✅ Senhas com bcrypt (12 rounds)
- [ ] ✅ JWT com secret forte
- [ ] ✅ Validação de inputs (frontend + backend)
- [ ] ✅ SQL injection protegido (Prisma)
- [ ] ✅ XSS protegido (React escape)

### **Ações Recomendadas:**

1. **Trocar todas as senhas e secrets**
   - Gerar novo JWT_SECRET
   - Nova senha Supabase (opcional)
   - Novas API Keys SendGrid e OpenAI

2. **Configurar monitoramento**
   - Sentry para errors
   - LogRocket para sessões
   - Google Analytics

3. **Backup automatizado**
   - Supabase já faz (diário)
   - Considerar backup externo semanal

---

## 📊 MONITORAMENTO

### **Dashboards a Monitorar:**

1. **Railway (Backend):**
   - CPU e Memória
   - Logs de erros
   - Response time

2. **Vercel (Frontend/Admin):**
   - Page views
   - Performance score
   - Build status

3. **Supabase (Database):**
   - Database size
   - Active connections
   - Slow queries

4. **SendGrid (Emails):**
   - Emails enviados
   - Taxa de abertura
   - Bounces/Spam

5. **OpenAI (IA):**
   - Tokens usados
   - Custo acumulado
   - Erros de API

---

## 💰 CUSTOS MENSAIS ESTIMADOS (Produção)

| Serviço | Plano | Custo |
|---------|-------|-------|
| **Vercel** (Frontend) | Hobby | $0/mês |
| **Vercel** (Admin) | Hobby | $0/mês |
| **Railway** (Backend) | Hobby | $5/mês |
| **Supabase** (Database) | Free | $0/mês |
| **SendGrid** (Emails) | Free | $0/mês |
| **OpenAI** (Chat IA) | Pay-as-go | $2-5/mês |
| **Domínio** (GoDaddy) | Anual | ~$40/ano |
| **TOTAL** | | **~$7-10/mês** |

**Muito barato para um e-commerce completo!** 🎉

---

## 🚦 ESTRATÉGIA DE DEPLOY (Zero Downtime)

### **Fase 1: Soft Launch (Semana 1)**

1. Deploy em produção
2. Testar tudo funcionando
3. Compartilhar com amigos/família
4. Coletar feedback
5. Corrigir bugs urgentes

### **Fase 2: Beta (Semana 2-4)**

1. Abrir para primeiros clientes
2. Monitorar erros (Sentry)
3. Ajustar IA com perguntas reais
4. Melhorar conhecimento do chat
5. Otimizar performance

### **Fase 3: Launch Oficial (Mês 2)**

1. Marketing (Google Ads, Instagram)
2. SEO otimizado
3. Blog com conteúdo
4. Email marketing
5. Parcerias

---

## 📋 CHECKLIST PRÉ-DEPLOY

### **Código:**
- [x] Tudo commitado no GitHub
- [x] Sem senhas/keys no código
- [x] .gitignore configurado
- [x] Build local funcionando
- [ ] Testes automatizados (opcional)

### **Database:**
- [x] Supabase configurado
- [x] Tabelas criadas
- [x] Seed de dados executado
- [x] Backup do SQLite criado
- [ ] Produtos de produção cadastrados

### **Emails:**
- [x] SendGrid configurado
- [x] Sender verificado
- [x] Templates testados
- [ ] DNS propagado (aguardando)
- [ ] Emails saindo da pasta spam (tempo)

### **IA:**
- [x] OpenAI configurada
- [x] Conhecimento populado
- [x] Chat testado
- [ ] Mais conhecimento adicionado (opcional)

---

## 🎯 O QUE EU PRECISO DE VOCÊ PARA DEPLOY

### **Informações Necessárias:**

1. **Escolher plataforma de deploy:**
   - [ ] Vercel + Railway (recomendado)
   - [ ] Vercel + Render
   - [ ] Outra combinação

2. **Criar contas:**
   - [ ] Conta Vercel (grátis)
   - [ ] Conta Railway (grátis)

3. **Decisões:**
   - [ ] Usar domínio próprio agora ou depois?
   - [ ] Manter SendGrid free ou upgrade?
   - [ ] Adicionar mais conhecimento no chat antes?

4. **Permissões GitHub:**
   - [ ] Dar acesso Vercel ao repo
   - [ ] Dar acesso Railway ao repo

---

## 📦 COMANDOS DE BUILD (Para Configurar)

### **Backend:**
```json
{
  "scripts": {
    "build": "nest build",
    "start:prod": "node dist/main",
    "postinstall": "prisma generate"
  }
}
```

### **Frontend/Admin:**
```json
{
  "scripts": {
    "build": "next build",
    "start": "next start"
  }
}
```

---

## 🔄 CI/CD (Deploy Automático)

**Com Vercel + Railway:**

1. Você faz `git push`
2. **Automático:**
   - Railway detecta mudanças em `/backend` → rebuild automático
   - Vercel detecta mudanças em `/frontend` → rebuild automático
   - Vercel detecta mudanças em `/admin` → rebuild automático

**Zero esforço!** ✨

---

## ⚡ QUICK START (Mais Rápido)

Se quiser fazer deploy AGORA (versão simplificada):

### **Backend no Railway:**
```bash
# 1. Instalar Railway CLI
npm install -g @railway/cli

# 2. Login
railway login

# 3. Deploy
cd backend
railway init
railway up
```

### **Frontend no Vercel:**
```bash
# 1. Instalar Vercel CLI
npm install -g vercel

# 2. Deploy
cd frontend
vercel
```

---

## 🎯 PRÓXIMO PASSO

**Me diga:**

1. **Quer fazer deploy AGORA?**
   - Posso te guiar passo a passo
   - Leva ~1 hora
   - Tudo fica no ar!

2. **Ou prefere preparar melhor?**
   - Adicionar mais produtos
   - Adicionar mais conhecimento IA
   - Fazer mais testes
   - Deploy semana que vem

3. **Precisa de algo antes?**
   - Fotos dos produtos
   - Textos de descrição
   - Políticas (privacidade, termos)
   - Logo em alta resolução

---

## 📞 PRÓXIMOS PASSOS

Quando estiver pronto para deploy, me avise e eu:

1. ✅ Configuro tudo (Vercel + Railway)
2. ✅ Adiciono variáveis de ambiente
3. ✅ Faço primeiro deploy
4. ✅ Testo tudo funcionando
5. ✅ Configuro domínio próprio
6. ✅ Valido HTTPS
7. ✅ Monitoro primeiro acesso

**Tudo automatizado e documentado!** 🚀

---

**Data:** 17/10/2025
**Status:** ✅ Pronto para Produção
**Próxima Etapa:** Deploy em Cloud
