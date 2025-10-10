# 📧 SISTEMA DE EMAILS - ROSA CHIC

Este diretório contém todos os templates de email da plataforma Rosa Chic. Os emails foram desenvolvidos seguindo exatamente o design do Figma, com todas as variáveis documentadas para facilitar a integração com o backend.

## 📁 Estrutura de Pastas

```
frontend/src/emails/
├── components/        # Componentes reutilizáveis (Layout, Button, etc)
├── templates/         # Templates dos 24 emails
├── types/            # Tipos TypeScript com documentação completa
└── README.md         # Este arquivo
```

## 🎨 Design System

Todos os emails seguem o mesmo padrão visual:

- **Background**: Preto (#000000)
- **Fonte**: Inter (Google Fonts)
- **Hierarquia de texto**:
  - Saudação: 18px, peso 500
  - Título: 18px, peso 400
  - Corpo: 16px, peso 400
  - Botões: 16px, texto #F1EDED (bege)
- **Cor primária**: #6C191D (rosewood)
- **Cor de texto nos botões**: #F1EDED (bege)

## 📋 Lista Completa dos 24 Emails

### **Categoria: Boas-vindas**
1. ✅ **Email 01** - Bem-vindo
2. ✅ **Email 08/09** - Oferta de boas-vindas com cupom

### **Categoria: Pedidos**
3. ✅ **Email 02** - Pedido recebido (simples)
4. ✅ **Email 15** - Pedido confirmado (detalhado)
5. ✅ **Email 16** - Pedido enviado
6. ✅ **Email 17** - Pedido entregue

### **Categoria: Carrinho Abandonado**
7. ✅ **Email 03** - Carrinho abandonado (elegante)
8. ✅ **Email 12** - Carrinho com produto
9. ✅ **Email 13** - Última chance (urgência)
10. ✅ **Email 14** - Frete grátis (incentivo)

### **Categoria: Conteúdo e Educação**
11. ✅ **Email 04** - Como medir
12. ✅ **Email 05/06** - Transformamos ambientes
13. ✅ **Email 07** - Por que escolher Rosa Chic
14. ✅ **Email 19** - Dicas de conservação

### **Categoria: Marketing e Recomendações**
15. ✅ **Email 10** - Recomendações personalizadas
16. ✅ **Email 11** - Inspirações de decoração
17. ✅ **Email 20** - Cross-sell (combine modelos)

### **Categoria: Pós-venda**
18. ✅ **Email 18** - Agradecimento

### **Categoria: Reativação**
19. ✅ **Email 21** - Sentimos sua falta
20. ✅ **Email 22** - Reativação com cupom (15% OFF)

### **Categoria: Conta e Segurança**
21. ✅ **Email 23** - Redefinir senha
22. ✅ **Email 24** - Senha alterada

## 🔧 Como Usar os Templates

### Exemplo 1: Email Simples (Bem-vindo)

```tsx
import { Email01Welcome } from './emails/templates/01-welcome'

// No backend, você enviará:
const emailData = {
  customerName: "João Silva"
}

// Renderizar o componente:
<Email01Welcome customerName={emailData.customerName} />
```

### Exemplo 2: Email com Produto (Carrinho Abandonado)

```tsx
import { Email12CartWithProduct } from './emails/templates/12-cart-with-product'

// No backend:
const emailData = {
  customerName: "Maria Santos",
  product: {
    name: "Persiana Blackout Kitbox - Preto",
    category: "Cortinas",
    color: "Preto",
    width: 2.5,
    height: 1.8,
    cordSide: "Direito",
    quantity: 1,
    price: 350.19
  }
}

<Email12CartWithProduct {...emailData} />
```

### Exemplo 3: Email com Pedido Completo

```tsx
import { Email15OrderConfirmed } from './emails/templates/15-order-confirmed'

// No backend:
const emailData = {
  customerName: "Carlos Oliveira",
  order: {
    orderNumber: "#12345",
    orderDate: "24/09/2025",
    items: [
      {
        name: "Persiana Blackout",
        category: "Cortinas",
        color: "Preto",
        width: 2.0,
        height: 1.5,
        cordSide: "Direito",
        quantity: 2,
        price: 350.19
      }
    ],
    total: 700.38
  }
}

<Email15OrderConfirmed {...emailData} />
```

## 📝 Variáveis por Email

Todas as variáveis estão documentadas em `types/index.ts` com comentários explícitos.

### Variáveis Comuns (aparecem em todos):
- `customerName: string` - Nome do cliente

### Variáveis de Produto:
```typescript
ProductItem {
  name: string          // Ex: "Persiana Blackout Kitbox - Preto"
  category: string      // Ex: "Cortinas"
  color: string         // Ex: "Preto"
  width: number         // Em metros, ex: 2.5
  height: number        // Em metros, ex: 1.8
  cordSide: string      // "Direito" ou "Esquerdo"
  quantity: number      // Ex: 1
  price: number         // Ex: 350.19
}
```

### Variáveis de Pedido:
```typescript
OrderDetails {
  orderNumber: string   // Ex: "#12345"
  orderDate: string     // Ex: "24/09/2025"
  items: ProductItem[]  // Array de produtos
  total: number         // Valor total
}
```

### Variáveis de Cupom:
```typescript
{
  couponCode: string           // Ex: "ROSACHIC10"
  discountPercentage: number   // Ex: 10
}
```

### Variáveis de Rastreamento:
```typescript
{
  carrier: string        // Ex: "Correios"
  trackingCode: string   // Ex: "XX123456789BR"
}
```

## 🎯 Mapeamento Backend → Template

| Email | Template | Variáveis Principais |
|-------|----------|---------------------|
| 01 | `01-welcome.tsx` | `customerName` |
| 02 | `02-order-received.tsx` | `customerName`, `orderNumber` |
| 03 | `03-cart-abandoned-elegant.tsx` | `customerName` |
| 04 | `04-how-to-measure.tsx` | `customerName` |
| 05/06 | `05-06-projects.tsx` | `customerName` |
| 07 | `07-why-choose.tsx` | `customerName` |
| 08/09 | `08-09-welcome-offer.tsx` | `customerName`, `couponCode`, `discountPercentage` |
| 10 | `10-recommendations.tsx` | `customerName` |
| 11 | `11-inspiration.tsx` | `customerName` |
| 12 | `12-cart-with-product.tsx` | `customerName`, `product` |
| 13 | `13-last-chance.tsx` | `customerName`, `product` |
| 14 | `14-free-shipping.tsx` | `customerName`, `product` |
| 15 | `15-order-confirmed.tsx` | `customerName`, `order` |
| 16 | `16-order-shipped.tsx` | `customerName`, `orderNumber`, `carrier`, `trackingCode` |
| 17 | `17-order-delivered.tsx` | `customerName`, `orderNumber`, `deliveryDate` |
| 18 | `18-thank-you.tsx` | `customerName` |
| 19 | `19-maintenance-tips.tsx` | `customerName` |
| 20 | `20-cross-sell.tsx` | `customerName` |
| 21 | `21-reactivation.tsx` | `customerName` |
| 22 | `22-reactivation-coupon.tsx` | `customerName`, `couponCode`, `discountPercentage` |
| 23 | `23-reset-password.tsx` | `customerName`, `resetPasswordUrl`, `expirationMinutes` |
| 24 | `24-password-changed.tsx` | `customerName` |

## 🚀 Próximos Passos para o Backend

### 1. Configurar biblioteca de renderização de emails
Recomendações:
- **React Email**: https://react.email
- **MJML**: Para emails responsivos
- **Nodemailer**: Para envio

### 2. Criar serviço de envio
```typescript
// Exemplo de estrutura
class EmailService {
  async sendWelcomeEmail(customerName: string, email: string) {
    const html = renderToString(<Email01Welcome customerName={customerName} />)
    await this.send(email, 'Bem-vindo à Rosa Chic', html)
  }

  async sendCartAbandonedEmail(customerName: string, product: ProductItem, email: string) {
    const html = renderToString(<Email12CartWithProduct customerName={customerName} product={product} />)
    await this.send(email, 'Esqueceu algo no carrinho?', html)
  }
}
```

### 3. Configurar gatilhos (triggers)
- Email 01: Quando usuário se cadastra
- Email 02: Quando pedido é criado
- Email 12-14: 1h, 24h, 48h após abandono de carrinho
- Email 16: Quando pedido é enviado
- Email 17: Quando pedido é entregue
- Email 21-22: 30, 60 dias sem compra
- Email 23: Quando usuário solicita reset de senha
- Email 24: Quando senha é alterada

## 📊 Estatísticas

- ✅ **24 templates** criados
- ✅ **100% das variáveis** documentadas
- ✅ **Tipos TypeScript** completos
- ✅ **Design system** consistente
- ✅ **Componentes reutilizáveis** criados

## 📞 Suporte

Para dúvidas sobre implementação ou novas funcionalidades, consulte:
- Arquivo de tipos: `types/index.ts`
- Componentes base: `components/EmailLayout.tsx`
- Templates individuais: `templates/*.tsx`
