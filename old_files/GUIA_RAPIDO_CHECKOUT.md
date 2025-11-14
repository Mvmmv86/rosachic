# GUIA RÁPIDO - CHECKOUT ROSA CHIC

> Referência rápida para desenvolvimento. Para detalhes completos, consulte RELATORIO_DESIGN_CHECKOUT.md

---

## DIMENSÕES BASE

- **Layout desktop:** 1440px × 1674px
- **Container max-width:** 1224px
- **Padding lateral:** 108px (cada lado)

## LAYOUT PRINCIPAL

```
┌─────────────────────────────────────────┐
│           HEADER (1440×110px)           │
├──────────────────────┬──────────────────┤
│                      │                  │
│   CONTEÚDO MAIN      │   SIDEBAR        │
│   (904px)            │   (536px)        │
│                      │                  │
│   - Produtos         │   - Resumo       │
│   - Formulários      │   - Subtotal     │
│   - Opções           │   - Frete        │
│                      │   - Total        │
│                      │   - Botão CTA    │
│                      │                  │
├──────────────────────┴──────────────────┤
│           FOOTER (1440×604px)           │
└─────────────────────────────────────────┘
```

---

## CORES

### Primárias

| Nome | HEX | RGB | Uso |
|------|-----|-----|-----|
| Primary | `#6C191D` | `rgb(108, 25, 29)` | Header, Footer, Botões primários |
| White | `#FFFFFF` | `rgb(255, 255, 255)` | Background cards, textos em fundos escuros |
| Background | `#F1EDED` | `rgb(241, 237, 237)` | Background principal |

### Textos

| Nome | HEX | Uso |
|------|-----|-----|
| Text Primary | `#000000` | Títulos, textos principais |
| Text Secondary | `#666666` | Textos secundários, labels |
| Text Disabled | `#999999` | Placeholders, textos desabilitados |

### Borders

| Nome | HEX | Uso |
|------|-----|-----|
| Border Light | `#E5E5E5` | Separadores, borders de cards |
| Border | `#D9D9D9` | Inputs, borders mais visíveis |

---

## TIPOGRAFIA

### Font Family
```css
font-family: 'Inter', sans-serif;
```

### Escala de Tamanhos

| Uso | Size | Weight | Line Height |
|-----|------|--------|-------------|
| H1 - Títulos grandes | 32-36px | 700 (bold) | 120-130% |
| H2 - Títulos | 24-28px | 600 (semibold) | 130% |
| H3 - Subtítulos | 18-20px | 600 (semibold) | 140% |
| Body - Texto corpo | 14-16px | 400 (regular) | 150% |
| Caption - Textos pequenos | 12-13px | 400 (regular) | 140% |
| Button - Botões | 14-16px | 500 (medium) | 100% |
| Label - Labels de form | 14px | 500 (medium) | 140% |

---

## ESPAÇAMENTOS

### Sistema de Escala (múltiplos de 4px)

```
4px   → xs
8px   → sm
12px  → md
16px  → lg
24px  → xl
32px  → 2xl
40px  → 3xl
```

### Aplicações Comuns

| Elemento | Padding | Margin/Gap |
|----------|---------|------------|
| Container principal | 24-40px | - |
| Cards | 16-24px | 16px |
| Buttons | 12px (vertical) 24px (horizontal) | 8px |
| Inputs | 12-16px | 8px |
| Seções | 32-40px | 24-32px |

---

## COMPONENTES

### 1. BUTTON

#### Primary
```css
background: #6C191D
color: #FFFFFF
padding: 12px 24px
border-radius: 8px
font: Inter 16px 500
transition: all 200ms
hover: opacity 90%
```

#### Secondary
```css
background: transparent
border: 1px solid #6C191D
color: #6C191D
padding: 12px 24px
border-radius: 8px
font: Inter 16px 500
hover: background #6C191D, color #FFFFFF
```

### 2. INPUT FIELD

```css
width: 100%
height: 48px
padding: 12px 16px
border: 1px solid #E5E5E5
border-radius: 8px
font: Inter 14px 400
background: #FFFFFF

/* Focus */
border-color: #6C191D
outline: 2px solid rgba(108, 25, 29, 0.1)

/* Error */
border-color: #DC2626
```

### 3. CARD

```css
background: #FFFFFF
border: 1px solid #E5E5E5
border-radius: 12px
padding: 24px
shadow: 0px 2px 8px rgba(0, 0, 0, 0.08)
```

### 4. PRODUCT CARD

```css
display: flex
gap: 16px
padding: 16px
border: 1px solid #E5E5E5
border-radius: 8px

/* Estrutura */
├── Image (80×80px, border-radius: 8px)
├── Info
│   ├── Title (16px 600)
│   ├── Description (14px 400 #666)
│   └── Price (18px 700 #6C191D)
└── Actions
    ├── Quantity selector
    └── Remove button
```

---

## FORMULÁRIOS

### Address Form

**Campos obrigatórios:**
1. CEP (formato: 00000-000)
2. Rua
3. Número
4. Bairro
5. Cidade
6. Estado

**Layout:**
```
┌─────────────────────────────────┐
│ CEP [     ]  [Buscar]           │
├─────────────────────────────────┤
│ Rua [                         ] │
├────────────────┬────────────────┤
│ Número [     ] │ Comp. [      ] │
├────────────────┴────────────────┤
│ Bairro [                      ] │
├────────────────┬────────────────┤
│ Cidade [     ] │ Estado [ UF ]  │
└────────────────┴────────────────┘
```

### Payment Form (Cartão)

**Campos:**
1. Número do cartão (0000 0000 0000 0000)
2. Nome no cartão
3. Validade (MM/AA)
4. CVV (000)

**Bandeiras aceitas:**
- Visa
- Mastercard
- Elo
- American Express

---

## SIDEBAR RESUMO

### Estrutura

```
┌────────────────────────────┐
│ Resumo do Pedido           │
├────────────────────────────┤
│ Subtotal      R$ 000,00    │
│ Frete         R$ 00,00     │
│ Desconto    - R$ 00,00     │
├────────────────────────────┤
│ TOTAL         R$ 000,00    │
│               (18px 700)    │
├────────────────────────────┤
│ [   FINALIZAR PEDIDO   ]   │
│  (Button Primary Full)     │
└────────────────────────────┘
```

**Dimensões:**
- Width: 312px
- Gap entre itens: 8px
- Padding: 24px

---

## STEPPER / PROGRESS

**Etapas do checkout:**
1. Carrinho
2. Endereço
3. Pagamento
4. Confirmação
5. Sucesso

**Estados:**
- Ativo: #6C191D (bold)
- Completo: #6C191D com checkmark
- Pendente: #999999

---

## VALIDAÇÕES

### CEP
- Formato: 00000-000
- Validar via API (ViaCEP)
- Preencher automático: rua, bairro, cidade, estado

### Cartão de Crédito
- Número: 16 dígitos (Luhn algorithm)
- Validade: MM/AA (futuro)
- CVV: 3-4 dígitos

### Campos Obrigatórios
- Mostrar asterisco (*)
- Validar no blur
- Feedback visual (border vermelho + mensagem)

---

## ESTADOS

### Loading
```
Botão:
- Desabilitar
- Mostrar spinner
- Texto: "Processando..."
```

### Error
```
Campo:
- Border: 1px solid #DC2626
- Texto erro: 12px 400 #DC2626
- Ícone: ⚠️
```

### Success
```
Campo:
- Border: 1px solid #10B981
- Ícone: ✓
```

---

## RESPONSIVIDADE

### Breakpoints

```javascript
mobile: '0-640px',
tablet: '641-1024px',
desktop: '1025px+'
```

### Layout Mobile

```
┌─────────────────┐
│     HEADER      │
├─────────────────┤
│                 │
│   CONTEÚDO      │
│   (full width)  │
│                 │
├─────────────────┤
│   SIDEBAR       │
│   (abaixo)      │
│                 │
├─────────────────┤
│     FOOTER      │
└─────────────────┘
```

---

## ACESSIBILIDADE

### Checklist
- [ ] Labels em todos os inputs
- [ ] Placeholders descritivos
- [ ] Feedback visual em estados (focus, error, success)
- [ ] Contraste mínimo 4.5:1 (WCAG AA)
- [ ] Navegação por teclado (Tab)
- [ ] ARIA labels em ícones
- [ ] Mensagens de erro descritivas

---

## PERFORMANCE

### Otimizações
- [ ] Lazy loading de imagens
- [ ] Debounce em validações (300ms)
- [ ] Memoização de cálculos (total, subtotal)
- [ ] Code splitting por página
- [ ] Prefetch de dados (CEP)

---

## CÓDIGO RÁPIDO

### Tailwind Classes Úteis

```javascript
// Container
'max-w-[1440px] mx-auto px-[108px]'

// Card
'bg-white border border-[#E5E5E5] rounded-xl p-6 shadow-sm'

// Button Primary
'bg-[#6C191D] text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-all'

// Input
'w-full h-12 px-4 border border-[#E5E5E5] rounded-lg focus:border-[#6C191D] focus:ring-2 focus:ring-[#6C191D]/10'

// Text Styles
h1: 'text-4xl font-bold text-black'
h2: 'text-2xl font-semibold text-black'
body: 'text-base text-black'
caption: 'text-sm text-[#666666]'
```

---

## LINKS ÚTEIS

- **Relatório Completo:** RELATORIO_DESIGN_CHECKOUT.md
- **Especificações Técnicas:** ESPECIFICACOES_TECNICAS_CHECKOUT.md
- **Mapa Visual:** MAPA_VISUAL_CHECKOUT.md
- **Índice Geral:** INDICE_ANALISE_CHECKOUT.md

---

## DÚVIDAS FREQUENTES

**Q: Qual a largura máxima do container?**
A: 1224px (com padding de 108px de cada lado = 1440px total)

**Q: Qual a font padrão?**
A: Inter (via Google Fonts ou @fontsource/inter)

**Q: Como fazer o cálculo do frete?**
A: Via API após preencher CEP (integrar com Correios ou transportadora)

**Q: O design é mobile-first?**
A: Não, o design original é desktop (1440px). Adaptar para mobile.

**Q: Preciso seguir o design pixel-perfect?**
A: Seguir estrutura e espaçamentos principais. Pequenas variações são aceitáveis para responsividade.

---

**Última atualização:** 09/10/2025
