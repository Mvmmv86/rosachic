# 📧 Configuração de E-mails - Rosa Chic

## ✅ E-mails Implementados

### E-mails Transacionais de Pedidos
1. **Order Confirmed** (Template 15) - Quando pedido é criado
2. **Order Shipped** (Template 16) - Quando pedido é enviado
3. **Order Delivered** (Template 17) - Quando pedido é entregue

### E-mails de Autenticação (Próximos)
4. **Reset Password** (Template 23) - Recuperação de senha
5. **Password Changed** (Template 24) - Senha alterada

---

## 🔧 Como Configurar SMTP

### Opção 1: Mailtrap (RECOMENDADO para Testes)

**Vantagens:**
- ✅ Gratuito
- ✅ Não envia e-mails reais (sandbox)
- ✅ Visualiza e-mails na interface web
- ✅ Perfeito para desenvolvimento

**Passos:**
1. Acesse: https://mailtrap.io
2. Crie uma conta gratuita
3. Vá em "Email Testing" → "Inboxes"
4. Copie as credenciais SMTP
5. Cole no `.env`:

```env
SMTP_HOST="sandbox.smtp.mailtrap.io"
SMTP_PORT="2525"
SMTP_USER="seu-user-mailtrap"
SMTP_PASS="sua-senha-mailtrap"
SMTP_FROM="Rosa Chic <noreply@rosachic.com.br>"
```

---

### Opção 2: Gmail (Para Testes com E-mail Real)

**Passos:**
1. Acesse: https://myaccount.google.com/security
2. Ative "Verificação em 2 etapas"
3. Vá em "Senhas de app"
4. Gere uma senha para "Mail"
5. Cole no `.env`:

```env
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="seu-email@gmail.com"
SMTP_PASS="sua-senha-de-app-google"
SMTP_FROM="Rosa Chic <seu-email@gmail.com>"
```

⚠️ **Importante:** Use a "Senha de App", não sua senha normal!

---

### Opção 3: SendGrid (Produção)

**Vantagens:**
- ✅ Profissional
- ✅ 100 e-mails/dia grátis
- ✅ Métricas e analytics
- ✅ Domínio personalizado

**Passos:**
1. Acesse: https://sendgrid.com
2. Crie conta gratuita
3. Gere API Key
4. Configure no `.env`:

```env
SMTP_HOST="smtp.sendgrid.net"
SMTP_PORT="587"
SMTP_USER="apikey"
SMTP_PASS="SG.xxxxxxxxxx"
SMTP_FROM="Rosa Chic <noreply@rosachic.com.br>"
```

---

## 🧪 Como Testar

### 1. Configurar SMTP
Edite o arquivo `backend/.env` com suas credenciais

### 2. Reiniciar Backend
```bash
# Se estiver rodando, mate a porta
npx kill-port 3001

# Inicie novamente
cd backend && npm run start:dev
```

### 3. Verificar Logs
Ao iniciar, deve aparecer:
```
✅ SMTP configurado e pronto para enviar e-mails
```

Ou (se não configurado):
```
⚠️  SMTP não configurado. E-mails não serão enviados.
```

### 4. Fazer um Pedido de Teste
1. Faça login no site
2. Adicione produtos ao carrinho
3. Finalize a compra
4. **Verifique seu e-mail!**

### 5. Testar Atualização de Status
1. Acesse o admin
2. Vá em "Pedidos"
3. Mude o status para "Enviado" ou "Entregue"
4. **Verifique o e-mail correspondente!**

---

## 📝 Templates de E-mail Disponíveis

### Transacionais (Implementados)
- ✅ 15-order-confirmed.tsx
- ✅ 16-order-shipped.tsx
- ✅ 17-order-delivered.tsx
- ⏳ 23-reset-password.tsx (próximo)
- ⏳ 24-password-changed.tsx (próximo)

### Marketing (Disponíveis, não integrados)
- 01-welcome.tsx
- 02-order-received.tsx
- 03-cart-abandoned-elegant.tsx
- 04-how-to-measure.tsx
- 05-06-projects.tsx
- 07-why-choose.tsx
- 08-09-welcome-offer.tsx
- 10-recommendations.tsx
- 11-inspiration.tsx
- 12-cart-with-product.tsx
- 13-last-chance.tsx
- 14-free-shipping.tsx
- 18-thank-you.tsx
- 19-maintenance-tips.tsx
- 20-cross-sell.tsx
- 21-reactivation.tsx
- 22-reactivation-coupon.tsx

---

## 🎨 Estilos dos E-mails

Todos os e-mails usam:
- **Cores:** RGB(108,25,29) - Rosa Chic
- **Tipografia:** Inter
- **Layout:** Responsivo (mobile-friendly)
- **Botões:** CTAs destacados
- **Imagens:** Logotipo Rosa Chic

---

## ⚠️ Troubleshooting

### E-mail não chegou?
1. Verifique logs do backend
2. Verifique pasta de SPAM
3. Teste credenciais SMTP
4. Verifique se SMTP_USER e SMTP_PASS estão preenchidos

### Erro de autenticação?
- Gmail: Use "Senha de App", não senha normal
- SendGrid: User deve ser "apikey"
- Mailtrap: Copie exatamente do painel

### E-mail vai para SPAM?
- Configure SPF/DKIM (produção)
- Use domínio profissional
- Evite palavras spam ("grátis", "promoção")

---

## 🚀 Próximos Passos

1. [x] Configurar SMTP no `.env`
2. [x] Testar e-mail de pedido criado
3. [x] Testar e-mails de status
4. [ ] Implementar e-mails de senha
5. [ ] Adicionar templates mais bonitos (usar os React prontos)
6. [ ] Configurar domínio personalizado

---

**Desenvolvido por:** Claude Code + Marcus
**Data:** 16/10/2025
**Status:** 🟢 E-mails de Pedidos Funcionando!