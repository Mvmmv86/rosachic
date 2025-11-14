# Configuração Gmail SMTP para Envios Reais

## 📧 Como Configurar Gmail para Enviar Emails Reais

### Passo 1: Gerar Senha de App no Google

1. **Acesse:** https://myaccount.google.com/apppasswords
   - Faça login com: `marcusvmoraes86@gmail.com`

2. **Se não conseguir acessar diretamente:**
   - Vá em: https://myaccount.google.com/security
   - Role até "Verificação em duas etapas"
   - **IMPORTANTE:** Você precisa ter a verificação em 2 etapas ATIVADA
   - Se não tiver, ative primeiro: https://myaccount.google.com/signinoptions/two-step-verification

3. **Depois de ativar 2FA:**
   - Volte em: https://myaccount.google.com/apppasswords
   - Clique em "Criar senha de app"
   - Selecione "Email" ou "Outro (nome personalizado)"
   - Digite: "Rosa Chic Backend"
   - Clique em "Gerar"

4. **Copie a senha gerada** (16 caracteres, formato: `abcd efgh ijkl mnop`)
   - **IMPORTANTE:** Guarde essa senha, ela só aparece uma vez!

---

### Passo 2: Atualizar arquivo .env

Abra o arquivo `backend/.env` e substitua as linhas de SMTP:

**DE:**
```bash
SMTP_HOST="sandbox.smtp.mailtrap.io"
SMTP_PORT="2525"
SMTP_USER="6b3dc45e91f051"
SMTP_PASS="9fd15c41e83eeb"
SMTP_FROM="Rosa Chic <noreply@rosachic.com.br>"
```

**PARA:**
```bash
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="marcusvmoraes86@gmail.com"
SMTP_PASS="sua_senha_de_app_aqui"  # Senha de 16 dígitos gerada
SMTP_FROM="Rosa Chic <marcusvmoraes86@gmail.com>"
```

⚠️ **ATENÇÃO:**
- Use a senha de APP, NÃO a senha normal do Gmail
- Não compartilhe essa senha com ninguém
- Adicione `backend/.env` ao `.gitignore` (já deve estar)

---

### Passo 3: Reiniciar o Backend

Depois de alterar o `.env`:

```bash
# Parar o backend atual (Ctrl+C no terminal)
# OU matar o processo

cd backend
npm run start:dev
```

O backend vai reconectar com as novas configurações.

---

### Passo 4: Testar

Faça um novo pedido e o email chegará no seu Gmail real!

---

## 🔒 Segurança

### ✅ O que fazer:
- ✓ Usar senha de app
- ✓ Manter .env no .gitignore
- ✓ Nunca commitar credenciais
- ✓ Trocar senha se for comprometida

### ❌ O que NÃO fazer:
- ✗ Usar senha normal do Gmail
- ✗ Desativar verificação em 2 etapas
- ✗ Compartilhar senha de app
- ✗ Commitar .env no Git

---

## 🌍 Para Produção

Em produção, use serviços profissionais:

### Opções Recomendadas:

1. **SendGrid** (Recomendado)
   - 100 emails/dia grátis
   - Fácil de configurar
   - API robusta
   - https://sendgrid.com

2. **AWS SES**
   - 62.000 emails/mês grátis (no EC2)
   - Escalável
   - Muito barato
   - https://aws.amazon.com/ses

3. **Mailgun**
   - 5.000 emails/mês grátis (3 meses)
   - API simples
   - https://mailgun.com

4. **Resend** (Novo e Moderno)
   - 100 emails/dia grátis
   - Muito fácil de usar
   - https://resend.com

---

## 📊 Comparação

| Serviço | Grátis | Preço após | Melhor para |
|---------|--------|------------|-------------|
| Gmail | Limitado | N/A | Desenvolvimento/Testes |
| SendGrid | 100/dia | $15/mês | Pequenas empresas |
| AWS SES | 62k/mês* | $0.10/1000 | Alta escala |
| Mailgun | 5k/mês† | $35/mês | Médias empresas |
| Resend | 100/dia | $20/mês | Startups modernas |

*No EC2 / †Primeiros 3 meses

---

## 🚀 Próximos Passos

Depois de configurar o Gmail:

1. [ ] Testar envio de email de pedido
2. [ ] Verificar se chega na caixa de entrada (não spam)
3. [ ] Considerar migrar para SendGrid/Resend em produção
4. [ ] Configurar domínio próprio para emails profissionais

---

**Dúvidas?** Entre em contato ou consulte:
- Documentação Gmail SMTP: https://support.google.com/mail/answer/7126229
- Nodemailer + Gmail: https://nodemailer.com/usage/using-gmail/
