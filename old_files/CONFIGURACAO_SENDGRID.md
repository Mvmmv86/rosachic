# Configuração SendGrid para Envios de Email em Produção

## 🚀 Por que SendGrid?

✅ **100 emails/dia GRÁTIS para sempre**
✅ **Envia emails REAIS** (não é sandbox como Mailtrap)
✅ **Analytics completo** (taxa de abertura, cliques, bounces)
✅ **Domínio verificado** (emails não vão para spam)
✅ **Escalável** (pode aumentar plano depois)
✅ **API simples** (integração rápida)

---

## 📋 Passo a Passo

### **Passo 1: Criar Conta no SendGrid**

1. **Acesse:** https://signup.sendgrid.com/
2. **Preencha:**
   - Email: `marcusvmoraes86@gmail.com`
   - Nome completo: Marcus Vinicius de Moraes
   - Password: (crie uma senha segura)
3. **Confirme o email** (cheque sua caixa de entrada)
4. **Preencha o questionário:**
   - I'm sending transactional emails (confirmações, notificações)
   - Website/Company: Rosa Chic E-commerce
   - Role: Developer
   - Country: Brazil

---

### **Passo 2: Verificar Sender (Remetente)**

⚠️ **IMPORTANTE:** SendGrid exige verificar o email de quem envia!

1. No dashboard do SendGrid, vá em:
   - **Settings** → **Sender Authentication** → **Single Sender Verification**

2. Clique em **"Create New Sender"**

3. Preencha os dados:
   ```
   From Name: Rosa Chic
   From Email: marcusvmoraes86@gmail.com
   Reply To: marcusvmoraes86@gmail.com
   Company Address: Rua Benedito Antunes de Oliveira, 1234
   City: Curitiba
   State: PR
   Zip Code: 81570-320
   Country: Brazil
   ```

4. **Clique em "Create"**

5. **IMPORTANTE:** Verifique seu email!
   - SendGrid enviará um email para `marcusvmoraes86@gmail.com`
   - Clique no link de verificação
   - Status mudará para "Verified" ✅

---

### **Passo 3: Criar API Key**

1. No dashboard, vá em:
   - **Settings** → **API Keys**

2. Clique em **"Create API Key"**

3. Configure:
   ```
   API Key Name: Rosa Chic Production
   API Key Permissions: Full Access (ou Restricted Access → Mail Send)
   ```

4. **Clique em "Create & View"**

5. **COPIE A API KEY AGORA!**
   ```
   SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
   ⚠️ **Ela só aparece UMA VEZ!** Guarde em local seguro!

---

### **Passo 4: Configurar no Backend**

Abra o arquivo `backend/.env` e atualize:

**SUBSTITUA:**
```bash
# E-mail / SMTP (Mailtrap - Teste)
SMTP_HOST="sandbox.smtp.mailtrap.io"
SMTP_PORT="2525"
SMTP_USER="6b3dc45e91f051"
SMTP_PASS="9fd15c41e83eeb"
SMTP_FROM="Rosa Chic <noreply@rosachic.com.br>"
```

**POR:**
```bash
# E-mail / SMTP (SendGrid - Produção)
SMTP_HOST="smtp.sendgrid.net"
SMTP_PORT="587"
SMTP_USER="apikey"
SMTP_PASS="SG.sua_api_key_aqui"
SMTP_FROM="Rosa Chic <marcusvmoraes86@gmail.com>"
```

⚠️ **ATENÇÃO:**
- `SMTP_USER` é LITERALMENTE a palavra `apikey` (não mude!)
- `SMTP_PASS` é a API Key que você copiou (começa com `SG.`)
- `SMTP_FROM` deve ser o email verificado (marcusvmoraes86@gmail.com)

---

### **Passo 5: Reiniciar o Backend**

```bash
# Parar o backend atual (Ctrl+C)
cd backend
npm run start:dev
```

Você verá no log:
```
✅ SMTP configurado e pronto para enviar e-mails
```

---

### **Passo 6: Testar!**

1. **Faça um pedido na loja**
2. **Email chegará no Gmail REAL!** 📧
3. **Verifique:**
   - Caixa de entrada do destinatário
   - Dashboard do SendGrid (Activity → Email Activity)

---

## 📊 Monitoramento

### **No Dashboard do SendGrid:**

1. **Activity** → **Email Activity**
   - Ver todos os emails enviados
   - Status: Delivered, Opened, Clicked, Bounced

2. **Stats** → **Overview**
   - Gráficos de envios
   - Taxa de abertura
   - Taxa de cliques

3. **Suppressions**
   - Emails bloqueados
   - Bounces
   - Spam reports

---

## 🔒 Segurança

### ✅ Boas Práticas:

1. **Nunca commite a API Key**
   ```bash
   # Verifique se está no .gitignore
   backend/.env
   .env
   ```

2. **Rotacione a API Key periodicamente**
   - A cada 90 dias ou se suspeitar de vazamento

3. **Use Restricted Access** em produção
   - Só permissão de "Mail Send"

4. **Monitore uso diário**
   - Alerta se ultrapassar limite

---

## 💰 Limites e Planos

### **Plano Gratuito (Free):**
- ✅ 100 emails/dia
- ✅ Para sempre
- ✅ Sem cartão de crédito
- ⚠️ Sem suporte técnico
- ⚠️ Logo SendGrid no email

### **Plano Essentials ($19.95/mês):**
- ✅ 50.000 emails/mês
- ✅ Sem logo SendGrid
- ✅ Suporte técnico
- ✅ Remove "via sendgrid.net"

### **Quando Escalar?**
- Se passar de 100 emails/dia
- Quando quiser remover marca SendGrid
- Precisar suporte técnico

---

## 🎯 Próximos Passos (Opcional - Futuro)

### **1. Domínio Próprio (Profissional)**

Em vez de `marcusvmoraes86@gmail.com`, usar `noreply@rosachic.com.br`

**Benefícios:**
- ✅ Mais profissional
- ✅ Maior taxa de entrega
- ✅ Emails não vão para spam
- ✅ Confiança do cliente

**Como fazer:**
1. Comprar domínio: `rosachic.com.br`
2. Configurar DNS no SendGrid (Domain Authentication)
3. Aguardar propagação (24-48h)
4. Usar `noreply@rosachic.com.br` como remetente

### **2. Templates no SendGrid (Opcional)**

- Upload de templates HTML
- Edição visual no SendGrid
- Versionamento
- Reutilização

---

## ⚠️ Troubleshooting

### **Erro: "Sender not verified"**
- Verifique o email de remetente no SendGrid
- Aguarde confirmação por email
- Use exatamente o mesmo email no SMTP_FROM

### **Erro: "Authentication failed"**
- Verifique se SMTP_USER é `apikey` (literal)
- Confirme que copiou a API Key completa
- Tente gerar nova API Key

### **Emails vão para spam**
- Verifique Domain Authentication (DNS)
- Não use palavras suspeitas no assunto
- Mantenha boa taxa de engajamento
- Não envie spam (obviamente)

### **Ultrapassou limite de 100/dia**
- Upgrade para plano pago
- Ou otimize: agrupe notificações

---

## 📚 Recursos

- **Documentação SendGrid:** https://docs.sendgrid.com/
- **API Reference:** https://docs.sendgrid.com/api-reference/
- **Nodemailer + SendGrid:** https://docs.sendgrid.com/for-developers/sending-email/integrating-with-the-smtp-api
- **Status SendGrid:** https://status.sendgrid.com/

---

## ✅ Checklist Final

Antes de ir para produção:

- [ ] Conta SendGrid criada e verificada
- [ ] Sender (remetente) verificado
- [ ] API Key criada e salva
- [ ] .env atualizado com credenciais SendGrid
- [ ] Backend reiniciado
- [ ] Teste enviado e recebido com sucesso
- [ ] .env no .gitignore
- [ ] Monitoramento configurado no dashboard

---

**🎉 Pronto! Seus emails agora são profissionais e chegam em QUALQUER email do mundo!**

---

**Dúvidas?** Consulte a documentação ou entre em contato com o suporte do SendGrid.
