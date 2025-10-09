# ESPECIFICAÇÕES TÉCNICAS - CHECKOUT ROSA CHIC

Este documento fornece tokens e classes CSS/Tailwind para implementação do checkout.

---

## 1. TOKENS DE COR

### Tailwind Config (tailwind.config.js)

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        'checkout': {
          'black': '#000000', // rgb(0, 0, 0)
          'color-2': '#6C191D', // rgb(108, 25, 29)
          'color-3': '#77696A', // rgb(119, 105, 106)
          'color-4': '#C8BEBF', // rgb(200, 190, 191)
          'color-5': '#DDD5D6', // rgb(221, 213, 214)
          'color-6': '#F1EDED', // rgb(241, 237, 237)
          'color-7': '#FFF3F3', // rgb(255, 243, 243)
          'white': '#FFFFFF', // rgb(255, 255, 255)
          'color-9': '#4E4343', // rgb(78, 67, 67)
          'color-10': '#625656', // rgb(98, 86, 86)
          'color-11': '#000000 (opacity: 0%)', // rgba(0, 0, 0, 0.00)
          'color-12': '#000000 (opacity: 25%)', // rgba(0, 0, 0, 0.25)
          'color-13': '#2B8E41', // rgb(43, 142, 65)
          'color-14': '#196C2B', // rgb(25, 108, 43)
          'color-15': '#312A2A', // rgb(49, 42, 42)
          'color-16': '#000000 (opacity: 12%)', // rgba(0, 0, 0, 0.12)
          'color-17': '#4DB6AC', // rgb(77, 182, 172)
          'color-18': '#F3FFF5', // rgb(243, 255, 245)
          'color-19': '#030104', // rgb(3, 1, 4)
          'color-20': '#D7FFE0', // rgb(215, 255, 224)
        },
      },
    },
  },
}
```

## 2. TOKENS DE TIPOGRAFIA

### CSS Variables (globals.css)

```css
:root {
  /* Font Families */
  --font-inter: 'Inter', sans-serif;

  /* Font Sizes */
  --font-size-xs: 12.0px;
  --font-size-sm: 14.0px;
  --font-size-base: 16.0px;
  --font-size-lg: 18.0px;

  /* Font Weights */
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* Line Heights */
  --line-height-16: 16.0px;
  --line-height-20: 20.0px;
  --line-height-24: 24.0px;
  --line-height-28: 28.0px;
}
```

## 3. TOKENS DE ESPAÇAMENTO

### Tailwind Config (extend spacing)

```javascript
spacing: {
  '4.0': '4.0px',
  '6.0': '6.0px',
  '8.0': '8.0px',
  '10.0': '10.0px',
  '12.0': '12.0px',
  '16.0': '16.0px',
  '24.0': '24.0px',
  '29.0': '29.0px',
  '40.0': '40.0px',
  '48.0': '48.0px',
  '59.0': '59.0px',
  '72.0': '72.0px',
  '80.0': '80.0px',
  '108.0': '108.0px',
  '116.0': '116.0px',
  '118.5': '118.5px',
  '524.0': '524.0px',
  '1006.0': '1006.0px',
}
```

## 4. TOKENS DE BORDER RADIUS

### CSS Variables

```css
:root {
  --radius-md: 6.0px;
  --radius-md: 8.0px;
  --radius-xl: 16.0px;
  --radius-xl: 29.0px;
  --radius-xl: 59.0px;
  --radius-xl: 118.5px;
}
```

## 5. CLASSES UTILITÁRIAS RECOMENDADAS

### Componentes de Formulário

```css
/* Input padrão */
.input-field {
  @apply w-full px-4 py-3 border border-checkout-border rounded-md;
  @apply focus:outline-none focus:ring-2 focus:ring-primary;
  @apply transition-colors duration-200;
}

/* Input com erro */
.input-field-error {
  @apply input-field border-red-500;
}

/* Input com sucesso */
.input-field-success {
  @apply input-field border-green-500;
}
```

### Botões

```css
/* Botão primário */
.btn-primary {
  @apply px-6 py-3 bg-primary text-white rounded-md;
  @apply hover:bg-primary-dark transition-colors duration-200;
  @apply font-medium;
}

/* Botão secundário */
.btn-secondary {
  @apply px-6 py-3 bg-transparent border border-primary text-primary rounded-md;
  @apply hover:bg-primary hover:text-white transition-all duration-200;
}
```

### Cards

```css
/* Card padrão */
.card {
  @apply bg-white rounded-lg shadow-sm p-6;
  @apply border border-checkout-border;
}

/* Card de produto */
.product-card {
  @apply card flex items-start gap-4;
}
```

## 6. BREAKPOINTS RESPONSIVOS

Com base na análise (todas as páginas são 1440px), recomendamos:

```javascript
screens: {
  'sm': '640px',   // Mobile
  'md': '768px',   // Tablet
  'lg': '1024px',  // Desktop pequeno
  'xl': '1440px',  // Desktop (design base)
  '2xl': '1536px', // Desktop grande
}
```

## 7. CONTAINER

```css
.container-checkout {
  @apply max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8;
}
```
