# 🔧 Diagnóstico - Erro 504 Frontend Vercel

**Data:** 20/10/2025 21:15
**Problema:** Frontend dando 404/504 na Vercel

---

## ❌ ERRO IDENTIFICADO:

```
404: NOT_FOUND
Code: DEPLOYMENT_NOT_FOUND

504: GATEWAY_TIMEOUT
Code: FUNCTION_INVOCATION_TIMEOUT
```

---

## ✅ STATUS DOS SERVIÇOS:

### **Backend (Railway):**
```
URL: https://rosachic-production.up.railway.app
Status: ✅ ONLINE
Response: "Hello World!" (HTTP 200)
Último deploy: Sucesso
```

### **Admin (Railway):**
```
URL: https://rosachic-production-fdc2.up.railway.app
Status: ⏳ Em redeploy (commit 1662636)
Aguardando: Deploy terminar
```

### **Frontend (Vercel):**
```
URL: https://rosachic.vercel.app
Status: ❌ ERRO 404/504
Problema: Deployment not found ou timeout
```

---

## 🔍 CAUSA DO ERRO 504:

**Últimos commits que podem ter causado:**

1. **Commit a532505** - "fix: ChatWidget usar variável de ambiente"
   - Modificou ChatWidget.tsx
   - Possível problema: SSR tentando acessar process.env

2. **Commit 1662636** - "fix: restaurar form admin"
   - Afetou apenas admin, não frontend

---

## ✅ SOLUÇÃO RECOMENDADA:

### **OPÇÃO A: Rollback na Vercel (RÁPIDO)**

1. Vercel Dashboard → rosachic → Deployments
2. Procurar deploy **ANTES** do commit a532505
3. Deploy com commit `be45cbd` ou `3574810`
4. Clicar em "Promote to Production"
5. Site volta a funcionar imediatamente

---

### **OPÇÃO B: Corrigir o ChatWidget (IDEAL)**

**Problema:** ChatWidget pode estar causando timeout no SSR

**Correção:**
```tsx
// Em ChatWidget.tsx
const apiUrl = typeof window !== 'undefined'
  ? (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001')
  : 'http://localhost:3001'
```

Isso garante que só usa a variável no **cliente** (browser), não no servidor.

---

### **OPÇÃO C: Desabilitar SSR Temporariamente**

Adicionar em `next.config.js`:
```js
module.exports = {
  experimental: {
    runtime: 'edge',
  }
}
```

---

## 🎯 PRÓXIMOS PASSOS:

### **IMEDIATO:**
1. Fazer rollback na Vercel (Opção A)
2. Site volta a funcionar
3. Validar que tudo está ok

### **DEPOIS:**
1. Corrigir ChatWidget localmente
2. Testar build local
3. Novo deploy (sem timeout)

---

## 📊 PROCESSOS LOCAIS RODANDO:

Temos 4 shells em background:
- 1e0b57: backend (localhost:3001)
- 907e35: backend duplicado
- 89bc2c: frontend (localhost:4444)
- d51cf8: admin (localhost:5000)

**Recomendação:** Matar processos duplicados depois de resolver o deploy.

---

## ⚡ AÇÃO IMEDIATA:

**IR NA VERCEL E FAZER ROLLBACK:**

1. https://vercel.com/dashboard
2. Projeto rosachic
3. Deployments
4. Promover deploy anterior (be45cbd ou 3574810)

**OU**

**Fazer redeploy forçado:**
1. Deployments → Último deploy que funcionou
2. Redeploy

---

**RECOMENDAÇÃO:** Rollback para versão estável AGORA, depois corrigimos o ChatWidget!

---

**Data:** 20/10/2025 21:16
**Status:** Backend OK, Admin em deploy, Frontend com timeout
**Próxima ação:** Rollback Vercel
