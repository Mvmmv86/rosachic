# RELATÓRIO COMPLETO DE DESIGN - CHECKOUT ROSA CHIC

**Data:** 09/10/2025 19:02:55
**Figma File Key:** ZpEDBAOT8ImPyplkSUILxo

---

## ÍNDICE

1. [Desktop / Checkout](#1-desktop--checkout)
2. [Desktop / Endereço (Versão 1)](#2-desktop--endereço-versão-1)
3. [Desktop / Endereço (Versão 2)](#3-desktop--endereço-versão-2)
4. [Desktop / Forma de pagamento](#4-desktop--forma-de-pagamento)
5. [Desktop / Informações do Pedido](#5-desktop--informações-do-pedido)
6. [Desktop / Pagamento aprovado!](#6-desktop--pagamento-aprovado)
7. [Análise Consolidada](#7-análise-consolidada)

---

## 1. Desktop / Checkout

### 1.1. DIMENSÕES GERAIS

- **Dimensão total:** 1440.0px × 1674.0px
- **Posição:** x: 10523.0px, y: 3224.0px
- **Layout Mode:** VERTICAL
- **Item Spacing:** 0px
- **Padding:** 0px (top) 0px (right) 0px (bottom) 0px (left)
- **Background Color:** #000000 (opacity: 0%) (rgba(0, 0, 0, 0.00))

### 1.2. ESTRUTURA COMPLETA

```
- **[FRAME]** `Desktop / Checkout` (1440.0×1674.0px)
  → Layout: VERTICAL, Gap: 0px
  - **[FRAME]** `Frame 19` (1440.0×110.0px)
    → Fill: #6C191D
    → Layout: VERTICAL, Gap: 8.0px
    - **[FRAME]** `Frame 55` (1224.0×50.0px)
      → Layout: HORIZONTAL, Gap: 1006.0px
      - **[INSTANCE]** `Placeholder` (336.0×40.0px)
        → Layout: VERTICAL, Gap: 4.0px
      - **[FRAME]** `Frame 8` (76.0×36.0px)
        → Layout: HORIZONTAL, Gap: 4.0px
    - **[FRAME]** `Frame 12` (621.0×20.0px)
      → Layout: HORIZONTAL, Gap: 16.0px
      - **[TEXT]** `Home` (40.0×20.0px)
        → Fill: #F1EDED
        → Text: "Home"
        → Font: Inter 14.0px 400
      - **[TEXT]** `Categorias` (72.0×20.0px)
        → Fill: #F1EDED
        → Text: "Categorias"
        → Font: Inter 14.0px 400
      - **[TEXT]** `Mais procurados` (111.0×20.0px)
        → Fill: #F1EDED
        → Text: "Mais procurados"
        → Font: Inter 14.0px 400
      - **[TEXT]** `Guia rápido` (80.0×20.0px)
        → Fill: #F1EDED
        → Text: " Guia rápido"
        → Font: Inter 14.0px 400
      - **[TEXT]** `Ambientes` (71.0×20.0px)
        → Fill: #F1EDED
        → Text: "Ambientes"
        → Font: Inter 14.0px 400
      - **[TEXT]** `Serviço Curitiba` (106.0×20.0px)
        → Fill: #F1EDED
        → Text: "Serviço Curitiba"
        → Font: Inter 14.0px 400
      - **[TEXT]** `Outros` (45.0×20.0px)
        → Fill: #F1EDED
        → Text: "Outros"
        → Font: Inter 14.0px 400
  - **[FRAME]** `Frame 2169` (1440.0×960.0px)
    → Layout: HORIZONTAL, Gap: 0px
    - **[FRAME]** `Frame 15` (904.0×960.0px)
      → Fill: #F1EDED
      → Layout: VERTICAL, Gap: 24.0px
      - **[FRAME]** `Frame 2088` (520.0×21.0px)
        → Layout: HORIZONTAL, Gap: 24.0px
      - **[FRAME]** `Frame 2121` (688.0×735.0px)
        → Layout: VERTICAL, Gap: 16.0px
    - **[FRAME]** `Frame 20` (536.0×960.0px)
      → Fill: #FFFFFF
      → Layout: VERTICAL, Gap: 24.0px
      - **[FRAME]** `Frame 29` (312.0×340.0px)
        → Layout: VERTICAL, Gap: 16.0px
      - **[FRAME]** `Frame 2114` (312.0×104.0px)
        → Layout: VERTICAL, Gap: 8.0px
  - **[FRAME]** `Frame 18` (1440.0×604.0px)
    → Fill: #6C191D
    → Layout: VERTICAL, Gap: 40.0px
    - **[FRAME]** `Frame 47` (1224.0×184.0px)
      → Layout: HORIZONTAL, Gap: 24.0px
      - **[FRAME]** `Frame 36` (184.0×184.0px)
        → Radius: 16.0px
        → Layout: HORIZONTAL, Gap: 24.0px
      - **[FRAME]** `Frame 46` (184.0×184.0px)
        → Radius: 16.0px
        → Layout: HORIZONTAL, Gap: 24.0px
      - **[FRAME]** `Frame 47` (184.0×184.0px)
        → Fill: #000000
        → Radius: 16.0px
        → Layout: HORIZONTAL, Gap: 24.0px
      - **[FRAME]** `Frame 48` (184.0×184.0px)
        → Radius: 16.0px
        → Layout: HORIZONTAL, Gap: 24.0px
      - **[FRAME]** `Frame 49` (184.0×184.0px)
        → Radius: 16.0px
        → Layout: HORIZONTAL, Gap: 24.0px
      - **[FRAME]** `Frame 50` (184.0×184.0px)
        → Radius: 16.0px
        → Layout: HORIZONTAL, Gap: 24.0px
    - **[FRAME]** `Frame 52` (1224.0×220.0px)
      → Layout: VERTICAL, Gap: 16.0px
      - **[FRAME]** `Frame 45` (1224.0×168.0px)
        → Layout: HORIZONTAL, Gap: 48.0px
      - **[FRAME]** `Frame 51` (1224.0×20.0px)
        → Layout: HORIZONTAL, Gap: 48.0px
```

### 1.3. SEÇÕES PRINCIPAIS

#### Seção 1: Desktop / Checkout

- **Dimensões:** 1440.0px × 1674.0px
- **Background:** #000000 (opacity: 0%)
- **Layout:** VERTICAL
- **Gap:** 0px
- **Padding:** 0px 0px 0px 0px
- **Children:** 3 elementos

#### Seção 2: Frame 19

- **Dimensões:** 1440.0px × 110.0px
- **Background:** #6C191D
- **Layout:** VERTICAL
- **Gap:** 8.0px
- **Padding:** 16.0px 108.0px 16.0px 108.0px
- **Children:** 2 elementos

#### Seção 3: Frame 55

- **Dimensões:** 1224.0px × 50.0px
- **Background:** #000000 (opacity: 0%)
- **Layout:** HORIZONTAL
- **Gap:** 1006.0px
- **Padding:** 0px 0px 0px 0px
- **Children:** 3 elementos

#### Seção 4: Frame 8

- **Dimensões:** 76.0px × 36.0px
- **Background:** #000000 (opacity: 0%)
- **Layout:** HORIZONTAL
- **Gap:** 4.0px
- **Padding:** 0px 0px 0px 0px
- **Children:** 2 elementos

#### Seção 5: Frame 12

- **Dimensões:** 621.0px × 20.0px
- **Background:** #000000 (opacity: 0%)
- **Layout:** HORIZONTAL
- **Gap:** 16.0px
- **Padding:** 0px 0px 0px 0px
- **Children:** 7 elementos

#### Seção 6: Frame 2169

- **Dimensões:** 1440.0px × 960.0px
- **Background:** #000000 (opacity: 0%)
- **Layout:** HORIZONTAL
- **Gap:** 0px
- **Padding:** 0px 0px 0px 0px
- **Children:** 2 elementos

#### Seção 7: Frame 15

- **Dimensões:** 904.0px × 960.0px
- **Background:** #F1EDED
- **Layout:** VERTICAL
- **Gap:** 24.0px
- **Padding:** 72.0px 108.0px 108.0px 108.0px
- **Children:** 2 elementos

#### Seção 8: Frame 2088

- **Dimensões:** 520.0px × 21.0px
- **Background:** #000000 (opacity: 0%)
- **Layout:** HORIZONTAL
- **Gap:** 24.0px
- **Padding:** 0px 0px 0px 0px
- **Children:** 1 elementos

#### Seção 9: Frame 2121

- **Dimensões:** 688.0px × 735.0px
- **Background:** #000000 (opacity: 0%)
- **Layout:** VERTICAL
- **Gap:** 16.0px
- **Padding:** 0px 0px 0px 0px
- **Children:** 1 elementos

#### Seção 10: Frame 20

- **Dimensões:** 536.0px × 960.0px
- **Background:** #FFFFFF
- **Layout:** VERTICAL
- **Gap:** 24.0px
- **Padding:** 72.0px 108.0px 108.0px 116.0px
- **Children:** 2 elementos

### 1.4. PALETA DE CORES

| RGB | HEX | Uso provável |
|-----|-----|--------------|
| `rgb(0, 0, 0)` | `#000000` | Texto / Preto |
| `rgb(108, 25, 29)` | `#6C191D` | N/A |
| `rgb(119, 105, 106)` | `#77696A` | N/A |
| `rgb(200, 190, 191)` | `#C8BEBF` | N/A |
| `rgb(221, 213, 214)` | `#DDD5D6` | N/A |
| `rgb(241, 237, 237)` | `#F1EDED` | N/A |
| `rgb(25, 108, 43)` | `#196C2B` | N/A |
| `rgb(255, 243, 243)` | `#FFF3F3` | Background / Branco |
| `rgb(255, 255, 255)` | `#FFFFFF` | Background / Branco |
| `rgb(43, 142, 65)` | `#2B8E41` | N/A |
| `rgb(49, 42, 42)` | `#312A2A` | N/A |
| `rgb(78, 67, 67)` | `#4E4343` | N/A |
| `rgb(98, 86, 86)` | `#625656` | N/A |
| `rgba(0, 0, 0, 0.00)` | `#000000 (opacity: 0%)` | Texto / Preto |
| `rgba(0, 0, 0, 0.12)` | `#000000 (opacity: 12%)` | Texto / Preto |
| `rgba(0, 0, 0, 0.25)` | `#000000 (opacity: 25%)` | Texto / Preto |

### 1.5. TIPOGRAFIA

| Texto (preview) | Font Family | Size | Weight | Line Height | Color |
|----------------|-------------|------|--------|-------------|-------|
| `Label text` | Inter | 14.0px | 400 | 20.0px | `#000000` |
| `Buscar persianas, serviços, et` | Inter | 16.0px | 400 | 24.0px | `#77696A` |
| `Produtos selecionados` | Inter | 18.0px | 400 | 28.0px | `#000000` |
| `Cor: ` | Inter | 12.0px | 400 | 16.0px | `#625656` |
| `R$ 350,19` | Inter | 16.0px | 500 | 24.0px | `#000000` |

### 1.6. ESPAÇAMENTOS

| Tipo | Valor |
|------|-------|
| cornerRadius | 6.0px, 8.0px, 16.0px, 59.0px, 118.5px |
| itemSpacing | 4.0px, 8.0px, 10.0px, 16.0px, 24.0px, 40.0px, 48.0px, 1006.0px |
| paddingBottom | 4.0px, 8.0px, 12.0px, 16.0px, 80.0px, 108.0px |
| paddingLeft | 4.0px, 8.0px, 12.0px, 16.0px, 108.0px, 116.0px |
| paddingRight | 4.0px, 8.0px, 12.0px, 16.0px, 108.0px |
| paddingTop | 4.0px, 8.0px, 12.0px, 16.0px, 72.0px, 80.0px |


---

## 2. Desktop / Endereço (1)

### 1.1. DIMENSÕES GERAIS

- **Dimensão total:** 1440.0px × 1674.0px
- **Posição:** x: 10523.0px, y: 5250.0px
- **Layout Mode:** VERTICAL
- **Item Spacing:** 0px
- **Padding:** 0px (top) 0px (right) 0px (bottom) 0px (left)
- **Background Color:** #000000 (opacity: 0%) (rgba(0, 0, 0, 0.00))

### 1.2. ESTRUTURA COMPLETA

```
- **[FRAME]** `Desktop / Endereço` (1440.0×1674.0px)
  → Layout: VERTICAL, Gap: 0px
  - **[FRAME]** `Frame 19` (1440.0×110.0px)
    → Fill: #6C191D
    → Layout: VERTICAL, Gap: 8.0px
    - **[FRAME]** `Frame 55` (1224.0×50.0px)
      → Layout: HORIZONTAL, Gap: 1006.0px
      - **[INSTANCE]** `Placeholder` (336.0×40.0px)
        → Layout: VERTICAL, Gap: 4.0px
      - **[FRAME]** `Frame 8` (76.0×36.0px)
        → Layout: HORIZONTAL, Gap: 4.0px
    - **[FRAME]** `Frame 12` (621.0×20.0px)
      → Layout: HORIZONTAL, Gap: 16.0px
      - **[TEXT]** `Home` (40.0×20.0px)
        → Fill: #F1EDED
        → Text: "Home"
        → Font: Inter 14.0px 400
      - **[TEXT]** `Categorias` (72.0×20.0px)
        → Fill: #F1EDED
        → Text: "Categorias"
        → Font: Inter 14.0px 400
      - **[TEXT]** `Mais procurados` (111.0×20.0px)
        → Fill: #F1EDED
        → Text: "Mais procurados"
        → Font: Inter 14.0px 400
      - **[TEXT]** `Guia rápido` (80.0×20.0px)
        → Fill: #F1EDED
        → Text: " Guia rápido"
        → Font: Inter 14.0px 400
      - **[TEXT]** `Ambientes` (71.0×20.0px)
        → Fill: #F1EDED
        → Text: "Ambientes"
        → Font: Inter 14.0px 400
      - **[TEXT]** `Serviço Curitiba` (106.0×20.0px)
        → Fill: #F1EDED
        → Text: "Serviço Curitiba"
        → Font: Inter 14.0px 400
      - **[TEXT]** `Outros` (45.0×20.0px)
        → Fill: #F1EDED
        → Text: "Outros"
        → Font: Inter 14.0px 400
  - **[FRAME]** `Frame 2169` (1440.0×960.0px)
    → Layout: HORIZONTAL, Gap: 0px
    - **[FRAME]** `Frame 15` (836.0×960.0px)
      → Fill: #F1EDED
      → Layout: VERTICAL, Gap: 24.0px
      - **[FRAME]** `Frame 2088` (520.0×21.0px)
        → Layout: HORIZONTAL, Gap: 24.0px
      - **[FRAME]** `Frame 2121` (620.0×735.0px)
        → Layout: VERTICAL, Gap: 16.0px
    - **[FRAME]** `Frame 20` (604.0×960.0px)
      → Fill: #FFFFFF
      → Layout: VERTICAL, Gap: 24.0px
      - **[FRAME]** `Frame 29` (388.0×340.0px)
        → Layout: VERTICAL, Gap: 16.0px
  - **[FRAME]** `Frame 18` (1440.0×604.0px)
    → Fill: #6C191D
    → Layout: VERTICAL, Gap: 40.0px
    - **[FRAME]** `Frame 47` (1224.0×184.0px)
      → Layout: HORIZONTAL, Gap: 24.0px
      - **[FRAME]** `Frame 36` (184.0×184.0px)
        → Radius: 16.0px
        → Layout: HORIZONTAL, Gap: 24.0px
      - **[FRAME]** `Frame 46` (184.0×184.0px)
        → Radius: 16.0px
        → Layout: HORIZONTAL, Gap: 24.0px
      - **[FRAME]** `Frame 47` (184.0×184.0px)
        → Fill: #000000
        → Radius: 16.0px
        → Layout: HORIZONTAL, Gap: 24.0px
      - **[FRAME]** `Frame 48` (184.0×184.0px)
        → Radius: 16.0px
        → Layout: HORIZONTAL, Gap: 24.0px
      - **[FRAME]** `Frame 49` (184.0×184.0px)
        → Radius: 16.0px
        → Layout: HORIZONTAL, Gap: 24.0px
      - **[FRAME]** `Frame 50` (184.0×184.0px)
        → Radius: 16.0px
        → Layout: HORIZONTAL, Gap: 24.0px
    - **[FRAME]** `Frame 52` (1224.0×220.0px)
      → Layout: VERTICAL, Gap: 16.0px
      - **[FRAME]** `Frame 45` (1224.0×168.0px)
        → Layout: HORIZONTAL, Gap: 48.0px
      - **[FRAME]** `Frame 51` (1224.0×20.0px)
        → Layout: HORIZONTAL, Gap: 48.0px
```

### 1.3. SEÇÕES PRINCIPAIS

#### Seção 1: Desktop / Endereço

- **Dimensões:** 1440.0px × 1674.0px
- **Background:** #000000 (opacity: 0%)
- **Layout:** VERTICAL
- **Gap:** 0px
- **Padding:** 0px 0px 0px 0px
- **Children:** 3 elementos

#### Seção 2: Frame 19

- **Dimensões:** 1440.0px × 110.0px
- **Background:** #6C191D
- **Layout:** VERTICAL
- **Gap:** 8.0px
- **Padding:** 16.0px 108.0px 16.0px 108.0px
- **Children:** 2 elementos

#### Seção 3: Frame 55

- **Dimensões:** 1224.0px × 50.0px
- **Background:** #000000 (opacity: 0%)
- **Layout:** HORIZONTAL
- **Gap:** 1006.0px
- **Padding:** 0px 0px 0px 0px
- **Children:** 3 elementos

#### Seção 4: Frame 8

- **Dimensões:** 76.0px × 36.0px
- **Background:** #000000 (opacity: 0%)
- **Layout:** HORIZONTAL
- **Gap:** 4.0px
- **Padding:** 0px 0px 0px 0px
- **Children:** 2 elementos

#### Seção 5: Frame 12

- **Dimensões:** 621.0px × 20.0px
- **Background:** #000000 (opacity: 0%)
- **Layout:** HORIZONTAL
- **Gap:** 16.0px
- **Padding:** 0px 0px 0px 0px
- **Children:** 7 elementos

#### Seção 6: Frame 2169

- **Dimensões:** 1440.0px × 960.0px
- **Background:** #000000 (opacity: 0%)
- **Layout:** HORIZONTAL
- **Gap:** 0px
- **Padding:** 0px 0px 0px 0px
- **Children:** 2 elementos

#### Seção 7: Frame 15

- **Dimensões:** 836.0px × 960.0px
- **Background:** #F1EDED
- **Layout:** VERTICAL
- **Gap:** 24.0px
- **Padding:** 72.0px 108.0px 108.0px 108.0px
- **Children:** 2 elementos

#### Seção 8: Frame 2088

- **Dimensões:** 520.0px × 21.0px
- **Background:** #000000 (opacity: 0%)
- **Layout:** HORIZONTAL
- **Gap:** 24.0px
- **Padding:** 0px 0px 0px 0px
- **Children:** 1 elementos

#### Seção 9: Frame 2121

- **Dimensões:** 620.0px × 735.0px
- **Background:** #000000 (opacity: 0%)
- **Layout:** VERTICAL
- **Gap:** 16.0px
- **Padding:** 0px 0px 0px 0px
- **Children:** 3 elementos

#### Seção 10: Frame 20

- **Dimensões:** 604.0px × 960.0px
- **Background:** #FFFFFF
- **Layout:** VERTICAL
- **Gap:** 24.0px
- **Padding:** 72.0px 108.0px 108.0px 108.0px
- **Children:** 1 elementos

### 1.4. PALETA DE CORES

| RGB | HEX | Uso provável |
|-----|-----|--------------|
| `rgb(0, 0, 0)` | `#000000` | Texto / Preto |
| `rgb(108, 25, 29)` | `#6C191D` | N/A |
| `rgb(119, 105, 106)` | `#77696A` | N/A |
| `rgb(200, 190, 191)` | `#C8BEBF` | N/A |
| `rgb(221, 213, 214)` | `#DDD5D6` | N/A |
| `rgb(241, 237, 237)` | `#F1EDED` | N/A |
| `rgb(25, 108, 43)` | `#196C2B` | N/A |
| `rgb(255, 243, 243)` | `#FFF3F3` | Background / Branco |
| `rgb(255, 255, 255)` | `#FFFFFF` | Background / Branco |
| `rgb(43, 142, 65)` | `#2B8E41` | N/A |
| `rgb(78, 67, 67)` | `#4E4343` | N/A |
| `rgb(98, 86, 86)` | `#625656` | N/A |
| `rgba(0, 0, 0, 0.00)` | `#000000 (opacity: 0%)` | Texto / Preto |
| `rgba(0, 0, 0, 0.25)` | `#000000 (opacity: 25%)` | Texto / Preto |

### 1.5. TIPOGRAFIA

| Texto (preview) | Font Family | Size | Weight | Line Height | Color |
|----------------|-------------|------|--------|-------------|-------|
| `Label text` | Inter | 14.0px | 400 | 20.0px | `#000000` |
| `Buscar persianas, serviços, et` | Inter | 16.0px | 400 | 24.0px | `#77696A` |
| `Endereço de entrega` | Inter | 18.0px | 400 | 28.0px | `#000000` |
| `R$ 350,19` | Inter | 16.0px | 500 | 24.0px | `#000000` |
| `Sobre nós` | Inter | 18.0px | 500 | 28.0px | `#F1EDED` |

### 1.6. ESPAÇAMENTOS

| Tipo | Valor |
|------|-------|
| cornerRadius | 8.0px, 16.0px, 59.0px, 118.5px |
| itemSpacing | 4.0px, 8.0px, 10.0px, 16.0px, 24.0px, 40.0px, 48.0px, 1006.0px |
| paddingBottom | 8.0px, 12.0px, 16.0px, 80.0px, 108.0px |
| paddingLeft | 8.0px, 12.0px, 16.0px, 108.0px |
| paddingRight | 8.0px, 12.0px, 16.0px, 108.0px |
| paddingTop | 8.0px, 12.0px, 16.0px, 72.0px, 80.0px |

### 1.7. CAMPOS DE INPUT

#### Input 1: Desktop / Endereço

- **Dimensões:** 1440.0px × 1674.0px


---

## 3. Desktop / Endereço (2)

### 1.1. DIMENSÕES GERAIS

- **Dimensão total:** 1440.0px × 1674.0px
- **Posição:** x: 10523.0px, y: 7275.0px
- **Layout Mode:** VERTICAL
- **Item Spacing:** 0px
- **Padding:** 0px (top) 0px (right) 0px (bottom) 0px (left)
- **Background Color:** #000000 (opacity: 0%) (rgba(0, 0, 0, 0.00))

### 1.2. ESTRUTURA COMPLETA

```
- **[FRAME]** `Desktop / Endereço` (1440.0×1674.0px)
  → Layout: VERTICAL, Gap: 0px
  - **[FRAME]** `Frame 19` (1440.0×110.0px)
    → Fill: #6C191D
    → Layout: VERTICAL, Gap: 8.0px
    - **[FRAME]** `Frame 55` (1224.0×50.0px)
      → Layout: HORIZONTAL, Gap: 1006.0px
      - **[INSTANCE]** `Placeholder` (336.0×40.0px)
        → Layout: VERTICAL, Gap: 4.0px
      - **[FRAME]** `Frame 8` (76.0×36.0px)
        → Layout: HORIZONTAL, Gap: 4.0px
    - **[FRAME]** `Frame 12` (621.0×20.0px)
      → Layout: HORIZONTAL, Gap: 16.0px
      - **[TEXT]** `Home` (40.0×20.0px)
        → Fill: #F1EDED
        → Text: "Home"
        → Font: Inter 14.0px 400
      - **[TEXT]** `Categorias` (72.0×20.0px)
        → Fill: #F1EDED
        → Text: "Categorias"
        → Font: Inter 14.0px 400
      - **[TEXT]** `Mais procurados` (111.0×20.0px)
        → Fill: #F1EDED
        → Text: "Mais procurados"
        → Font: Inter 14.0px 400
      - **[TEXT]** `Guia rápido` (80.0×20.0px)
        → Fill: #F1EDED
        → Text: " Guia rápido"
        → Font: Inter 14.0px 400
      - **[TEXT]** `Ambientes` (71.0×20.0px)
        → Fill: #F1EDED
        → Text: "Ambientes"
        → Font: Inter 14.0px 400
      - **[TEXT]** `Serviço Curitiba` (106.0×20.0px)
        → Fill: #F1EDED
        → Text: "Serviço Curitiba"
        → Font: Inter 14.0px 400
      - **[TEXT]** `Outros` (45.0×20.0px)
        → Fill: #F1EDED
        → Text: "Outros"
        → Font: Inter 14.0px 400
  - **[FRAME]** `Frame 2169` (1440.0×960.0px)
    → Layout: HORIZONTAL, Gap: 0px
    - **[FRAME]** `Frame 15` (836.0×960.0px)
      → Fill: #F1EDED
      → Layout: VERTICAL, Gap: 24.0px
      - **[FRAME]** `Frame 2088` (520.0×21.0px)
        → Layout: HORIZONTAL, Gap: 24.0px
      - **[FRAME]** `Frame 2121` (620.0×735.0px)
        → Layout: VERTICAL, Gap: 16.0px
    - **[FRAME]** `Frame 20` (604.0×960.0px)
      → Fill: #FFFFFF
      → Layout: VERTICAL, Gap: 24.0px
      - **[FRAME]** `Frame 29` (388.0×340.0px)
        → Layout: VERTICAL, Gap: 16.0px
  - **[FRAME]** `Frame 18` (1440.0×604.0px)
    → Fill: #6C191D
    → Layout: VERTICAL, Gap: 40.0px
    - **[FRAME]** `Frame 47` (1224.0×184.0px)
      → Layout: HORIZONTAL, Gap: 24.0px
      - **[FRAME]** `Frame 36` (184.0×184.0px)
        → Radius: 16.0px
        → Layout: HORIZONTAL, Gap: 24.0px
      - **[FRAME]** `Frame 46` (184.0×184.0px)
        → Radius: 16.0px
        → Layout: HORIZONTAL, Gap: 24.0px
      - **[FRAME]** `Frame 47` (184.0×184.0px)
        → Fill: #000000
        → Radius: 16.0px
        → Layout: HORIZONTAL, Gap: 24.0px
      - **[FRAME]** `Frame 48` (184.0×184.0px)
        → Radius: 16.0px
        → Layout: HORIZONTAL, Gap: 24.0px
      - **[FRAME]** `Frame 49` (184.0×184.0px)
        → Radius: 16.0px
        → Layout: HORIZONTAL, Gap: 24.0px
      - **[FRAME]** `Frame 50` (184.0×184.0px)
        → Radius: 16.0px
        → Layout: HORIZONTAL, Gap: 24.0px
    - **[FRAME]** `Frame 52` (1224.0×220.0px)
      → Layout: VERTICAL, Gap: 16.0px
      - **[FRAME]** `Frame 45` (1224.0×168.0px)
        → Layout: HORIZONTAL, Gap: 48.0px
      - **[FRAME]** `Frame 51` (1224.0×20.0px)
        → Layout: HORIZONTAL, Gap: 48.0px
```

### 1.3. SEÇÕES PRINCIPAIS

#### Seção 1: Desktop / Endereço

- **Dimensões:** 1440.0px × 1674.0px
- **Background:** #000000 (opacity: 0%)
- **Layout:** VERTICAL
- **Gap:** 0px
- **Padding:** 0px 0px 0px 0px
- **Children:** 3 elementos

#### Seção 2: Frame 19

- **Dimensões:** 1440.0px × 110.0px
- **Background:** #6C191D
- **Layout:** VERTICAL
- **Gap:** 8.0px
- **Padding:** 16.0px 108.0px 16.0px 108.0px
- **Children:** 2 elementos

#### Seção 3: Frame 55

- **Dimensões:** 1224.0px × 50.0px
- **Background:** #000000 (opacity: 0%)
- **Layout:** HORIZONTAL
- **Gap:** 1006.0px
- **Padding:** 0px 0px 0px 0px
- **Children:** 3 elementos

#### Seção 4: Frame 8

- **Dimensões:** 76.0px × 36.0px
- **Background:** #000000 (opacity: 0%)
- **Layout:** HORIZONTAL
- **Gap:** 4.0px
- **Padding:** 0px 0px 0px 0px
- **Children:** 2 elementos

#### Seção 5: Frame 12

- **Dimensões:** 621.0px × 20.0px
- **Background:** #000000 (opacity: 0%)
- **Layout:** HORIZONTAL
- **Gap:** 16.0px
- **Padding:** 0px 0px 0px 0px
- **Children:** 7 elementos

#### Seção 6: Frame 2169

- **Dimensões:** 1440.0px × 960.0px
- **Background:** #000000 (opacity: 0%)
- **Layout:** HORIZONTAL
- **Gap:** 0px
- **Padding:** 0px 0px 0px 0px
- **Children:** 2 elementos

#### Seção 7: Frame 15

- **Dimensões:** 836.0px × 960.0px
- **Background:** #F1EDED
- **Layout:** VERTICAL
- **Gap:** 24.0px
- **Padding:** 72.0px 108.0px 108.0px 108.0px
- **Children:** 2 elementos

#### Seção 8: Frame 2088

- **Dimensões:** 520.0px × 21.0px
- **Background:** #000000 (opacity: 0%)
- **Layout:** HORIZONTAL
- **Gap:** 24.0px
- **Padding:** 0px 0px 0px 0px
- **Children:** 1 elementos

#### Seção 9: Frame 2121

- **Dimensões:** 620.0px × 735.0px
- **Background:** #000000 (opacity: 0%)
- **Layout:** VERTICAL
- **Gap:** 16.0px
- **Padding:** 0px 0px 0px 0px
- **Children:** 4 elementos

#### Seção 10: Frame 20

- **Dimensões:** 604.0px × 960.0px
- **Background:** #FFFFFF
- **Layout:** VERTICAL
- **Gap:** 24.0px
- **Padding:** 72.0px 108.0px 108.0px 108.0px
- **Children:** 1 elementos

### 1.4. PALETA DE CORES

| RGB | HEX | Uso provável |
|-----|-----|--------------|
| `rgb(0, 0, 0)` | `#000000` | Texto / Preto |
| `rgb(108, 25, 29)` | `#6C191D` | N/A |
| `rgb(119, 105, 106)` | `#77696A` | N/A |
| `rgb(200, 190, 191)` | `#C8BEBF` | N/A |
| `rgb(221, 213, 214)` | `#DDD5D6` | N/A |
| `rgb(241, 237, 237)` | `#F1EDED` | N/A |
| `rgb(25, 108, 43)` | `#196C2B` | N/A |
| `rgb(255, 243, 243)` | `#FFF3F3` | Background / Branco |
| `rgb(255, 255, 255)` | `#FFFFFF` | Background / Branco |
| `rgb(43, 142, 65)` | `#2B8E41` | N/A |
| `rgb(78, 67, 67)` | `#4E4343` | N/A |
| `rgb(98, 86, 86)` | `#625656` | N/A |
| `rgba(0, 0, 0, 0.00)` | `#000000 (opacity: 0%)` | Texto / Preto |
| `rgba(0, 0, 0, 0.25)` | `#000000 (opacity: 25%)` | Texto / Preto |

### 1.5. TIPOGRAFIA

| Texto (preview) | Font Family | Size | Weight | Line Height | Color |
|----------------|-------------|------|--------|-------------|-------|
| `Label text` | Inter | 14.0px | 400 | 20.0px | `#000000` |
| `Buscar persianas, serviços, et` | Inter | 16.0px | 400 | 24.0px | `#77696A` |
| `Endereço de entrega` | Inter | 18.0px | 400 | 28.0px | `#000000` |
| `R$ 350,19` | Inter | 16.0px | 500 | 24.0px | `#000000` |

### 1.6. ESPAÇAMENTOS

| Tipo | Valor |
|------|-------|
| cornerRadius | 8.0px, 16.0px, 59.0px, 118.5px |
| itemSpacing | 4.0px, 8.0px, 10.0px, 16.0px, 24.0px, 40.0px, 48.0px, 1006.0px |
| paddingBottom | 8.0px, 12.0px, 16.0px, 80.0px, 108.0px |
| paddingLeft | 8.0px, 12.0px, 16.0px, 108.0px |
| paddingRight | 8.0px, 12.0px, 16.0px, 108.0px |
| paddingTop | 8.0px, 12.0px, 16.0px, 72.0px, 80.0px |

### 1.7. CAMPOS DE INPUT

#### Input 1: Desktop / Endereço

- **Dimensões:** 1440.0px × 1674.0px


---

## 4. Desktop / Forma de pagamento

### 1.1. DIMENSÕES GERAIS

- **Dimensão total:** 1440.0px × 1674.0px
- **Posição:** x: 10523.0px, y: 9301.0px
- **Layout Mode:** VERTICAL
- **Item Spacing:** 0px
- **Padding:** 0px (top) 0px (right) 0px (bottom) 0px (left)
- **Background Color:** #FFFFFF (rgb(255, 255, 255))

### 1.2. ESTRUTURA COMPLETA

```
- **[FRAME]** `Desktop / Forma de pagamento` (1440.0×1674.0px)
  → Fill: #FFFFFF
  → Layout: VERTICAL, Gap: 0px
  - **[FRAME]** `Frame 19` (1440.0×110.0px)
    → Fill: #6C191D
    → Layout: VERTICAL, Gap: 8.0px
    - **[FRAME]** `Frame 55` (1224.0×50.0px)
      → Layout: HORIZONTAL, Gap: 1006.0px
      - **[INSTANCE]** `Placeholder` (336.0×40.0px)
        → Layout: VERTICAL, Gap: 4.0px
      - **[FRAME]** `Frame 8` (76.0×36.0px)
        → Layout: HORIZONTAL, Gap: 4.0px
    - **[FRAME]** `Frame 12` (621.0×20.0px)
      → Layout: HORIZONTAL, Gap: 16.0px
      - **[TEXT]** `Home` (40.0×20.0px)
        → Fill: #F1EDED
        → Text: "Home"
        → Font: Inter 14.0px 400
      - **[TEXT]** `Categorias` (72.0×20.0px)
        → Fill: #F1EDED
        → Text: "Categorias"
        → Font: Inter 14.0px 400
      - **[TEXT]** `Mais procurados` (111.0×20.0px)
        → Fill: #F1EDED
        → Text: "Mais procurados"
        → Font: Inter 14.0px 400
      - **[TEXT]** `Guia rápido` (80.0×20.0px)
        → Fill: #F1EDED
        → Text: " Guia rápido"
        → Font: Inter 14.0px 400
      - **[TEXT]** `Ambientes` (71.0×20.0px)
        → Fill: #F1EDED
        → Text: "Ambientes"
        → Font: Inter 14.0px 400
      - **[TEXT]** `Serviço Curitiba` (106.0×20.0px)
        → Fill: #F1EDED
        → Text: "Serviço Curitiba"
        → Font: Inter 14.0px 400
      - **[TEXT]** `Outros` (45.0×20.0px)
        → Fill: #F1EDED
        → Text: "Outros"
        → Font: Inter 14.0px 400
  - **[FRAME]** `Frame 2169` (1440.0×960.0px)
    → Layout: HORIZONTAL, Gap: 0px
    - **[FRAME]** `Frame 15` (836.0×960.0px)
      → Fill: #F1EDED
      → Layout: VERTICAL, Gap: 24.0px
      - **[FRAME]** `Frame 21` (411.4×21.0px)
        → Layout: HORIZONTAL, Gap: 8.0px
      - **[FRAME]** `Frame 2121` (612.0×735.0px)
        → Layout: VERTICAL, Gap: 16.0px
    - **[FRAME]** `Frame 20` (604.0×960.0px)
      → Fill: #FFFFFF
      → Layout: VERTICAL, Gap: 24.0px
      - **[FRAME]** `Frame 29` (380.0×468.0px)
        → Layout: VERTICAL, Gap: 16.0px
      - **[FRAME]** `Frame 2114` (380.0×104.0px)
        → Layout: VERTICAL, Gap: 8.0px
  - **[FRAME]** `Frame 18` (1440.0×604.0px)
    → Fill: #6C191D
    → Layout: VERTICAL, Gap: 40.0px
    - **[FRAME]** `Frame 47` (1224.0×184.0px)
      → Layout: HORIZONTAL, Gap: 24.0px
      - **[FRAME]** `Frame 36` (184.0×184.0px)
        → Radius: 16.0px
        → Layout: HORIZONTAL, Gap: 24.0px
      - **[FRAME]** `Frame 46` (184.0×184.0px)
        → Radius: 16.0px
        → Layout: HORIZONTAL, Gap: 24.0px
      - **[FRAME]** `Frame 47` (184.0×184.0px)
        → Fill: #000000
        → Radius: 16.0px
        → Layout: HORIZONTAL, Gap: 24.0px
      - **[FRAME]** `Frame 48` (184.0×184.0px)
        → Radius: 16.0px
        → Layout: HORIZONTAL, Gap: 24.0px
      - **[FRAME]** `Frame 49` (184.0×184.0px)
        → Radius: 16.0px
        → Layout: HORIZONTAL, Gap: 24.0px
      - **[FRAME]** `Frame 50` (184.0×184.0px)
        → Radius: 16.0px
        → Layout: HORIZONTAL, Gap: 24.0px
    - **[FRAME]** `Frame 52` (1224.0×220.0px)
      → Layout: VERTICAL, Gap: 16.0px
      - **[FRAME]** `Frame 45` (1224.0×168.0px)
        → Layout: HORIZONTAL, Gap: 48.0px
      - **[FRAME]** `Frame 51` (1224.0×20.0px)
        → Layout: HORIZONTAL, Gap: 48.0px
```

### 1.3. SEÇÕES PRINCIPAIS

#### Seção 1: Desktop / Forma de pagamento

- **Dimensões:** 1440.0px × 1674.0px
- **Background:** #FFFFFF
- **Layout:** VERTICAL
- **Gap:** 0px
- **Padding:** 0px 0px 0px 0px
- **Children:** 3 elementos

#### Seção 2: Frame 19

- **Dimensões:** 1440.0px × 110.0px
- **Background:** #6C191D
- **Layout:** VERTICAL
- **Gap:** 8.0px
- **Padding:** 16.0px 108.0px 16.0px 108.0px
- **Children:** 2 elementos

#### Seção 3: Frame 55

- **Dimensões:** 1224.0px × 50.0px
- **Background:** #000000 (opacity: 0%)
- **Layout:** HORIZONTAL
- **Gap:** 1006.0px
- **Padding:** 0px 0px 0px 0px
- **Children:** 3 elementos

#### Seção 4: Frame 8

- **Dimensões:** 76.0px × 36.0px
- **Background:** #000000 (opacity: 0%)
- **Layout:** HORIZONTAL
- **Gap:** 4.0px
- **Padding:** 0px 0px 0px 0px
- **Children:** 2 elementos

#### Seção 5: Frame 12

- **Dimensões:** 621.0px × 20.0px
- **Background:** #000000 (opacity: 0%)
- **Layout:** HORIZONTAL
- **Gap:** 16.0px
- **Padding:** 0px 0px 0px 0px
- **Children:** 7 elementos

#### Seção 6: Frame 2169

- **Dimensões:** 1440.0px × 960.0px
- **Background:** #000000 (opacity: 0%)
- **Layout:** HORIZONTAL
- **Gap:** 0px
- **Padding:** 0px 0px 0px 0px
- **Children:** 2 elementos

#### Seção 7: Frame 15

- **Dimensões:** 836.0px × 960.0px
- **Background:** #F1EDED
- **Layout:** VERTICAL
- **Gap:** 24.0px
- **Padding:** 72.0px 116.0px 108.0px 108.0px
- **Children:** 2 elementos

#### Seção 8: Frame 21

- **Dimensões:** 411.4px × 21.0px
- **Background:** #000000 (opacity: 0%)
- **Layout:** HORIZONTAL
- **Gap:** 8.0px
- **Padding:** 0px 0px 0px 0px
- **Children:** 9 elementos

#### Seção 9: Frame 2121

- **Dimensões:** 612.0px × 735.0px
- **Background:** #000000 (opacity: 0%)
- **Layout:** VERTICAL
- **Gap:** 16.0px
- **Padding:** 0px 0px 0px 0px
- **Children:** 5 elementos

#### Seção 10: Frame 20

- **Dimensões:** 604.0px × 960.0px
- **Background:** #FFFFFF
- **Layout:** VERTICAL
- **Gap:** 24.0px
- **Padding:** 72.0px 108.0px 108.0px 116.0px
- **Children:** 2 elementos

### 1.4. PALETA DE CORES

| RGB | HEX | Uso provável |
|-----|-----|--------------|
| `rgb(0, 0, 0)` | `#000000` | Texto / Preto |
| `rgb(108, 25, 29)` | `#6C191D` | N/A |
| `rgb(119, 105, 106)` | `#77696A` | N/A |
| `rgb(200, 190, 191)` | `#C8BEBF` | N/A |
| `rgb(221, 213, 214)` | `#DDD5D6` | N/A |
| `rgb(241, 237, 237)` | `#F1EDED` | N/A |
| `rgb(243, 255, 245)` | `#F3FFF5` | Background / Branco |
| `rgb(25, 108, 43)` | `#196C2B` | N/A |
| `rgb(255, 243, 243)` | `#FFF3F3` | Background / Branco |
| `rgb(255, 255, 255)` | `#FFFFFF` | Background / Branco |
| `rgb(3, 1, 4)` | `#030104` | N/A |
| `rgb(43, 142, 65)` | `#2B8E41` | N/A |
| `rgb(77, 182, 172)` | `#4DB6AC` | N/A |
| `rgb(78, 67, 67)` | `#4E4343` | N/A |
| `rgb(98, 86, 86)` | `#625656` | N/A |
| `rgba(0, 0, 0, 0.00)` | `#000000 (opacity: 0%)` | Texto / Preto |
| `rgba(0, 0, 0, 0.25)` | `#000000 (opacity: 25%)` | Texto / Preto |

### 1.5. TIPOGRAFIA

| Texto (preview) | Font Family | Size | Weight | Line Height | Color |
|----------------|-------------|------|--------|-------------|-------|
| `Label text` | Inter | 14.0px | 400 | 20.0px | `#000000` |
| `Buscar persianas, serviços, et` | Inter | 16.0px | 400 | 24.0px | `#77696A` |
| `Voltar` | Inter | 12.0px | 400 | 16.0px | `#6C191D` |
| `Escolha a forma de pagamento` | Inter | 18.0px | 400 | 28.0px | `#000000` |
| `Subtotal` | Inter | 16.0px | 500 | 24.0px | `#000000` |

### 1.6. ESPAÇAMENTOS

| Tipo | Valor |
|------|-------|
| cornerRadius | 8.0px, 16.0px, 59.0px, 118.5px |
| itemSpacing | 4.0px, 8.0px, 10.0px, 16.0px, 24.0px, 40.0px, 48.0px, 1006.0px |
| paddingBottom | 4.0px, 8.0px, 12.0px, 16.0px, 80.0px, 108.0px |
| paddingLeft | 4.0px, 12.0px, 16.0px, 108.0px, 116.0px |
| paddingRight | 4.0px, 12.0px, 16.0px, 108.0px, 116.0px |
| paddingTop | 4.0px, 8.0px, 12.0px, 16.0px, 72.0px, 80.0px |


---

## 5. Desktop / Informações do Pedido

### 1.1. DIMENSÕES GERAIS

- **Dimensão total:** 1440.0px × 1567.0px
- **Posição:** x: 20631.0px, y: 5034.0px
- **Layout Mode:** VERTICAL
- **Item Spacing:** 0px
- **Padding:** 0px (top) 0px (right) 0px (bottom) 0px (left)
- **Background Color:** #000000 (opacity: 0%) (rgba(0, 0, 0, 0.00))

### 1.2. ESTRUTURA COMPLETA

```
- **[FRAME]** `Desktop / Informações do Pedido` (1440.0×1567.0px)
  → Layout: VERTICAL, Gap: 0px
  - **[FRAME]** `Frame 19` (1440.0×110.0px)
    → Fill: #6C191D
    → Layout: VERTICAL, Gap: 8.0px
    - **[FRAME]** `Frame 55` (1224.0×50.0px)
      → Layout: HORIZONTAL, Gap: 1006.0px
      - **[INSTANCE]** `Placeholder` (336.0×40.0px)
        → Layout: VERTICAL, Gap: 4.0px
      - **[FRAME]** `Frame 8` (76.0×36.0px)
        → Layout: HORIZONTAL, Gap: 4.0px
    - **[FRAME]** `Frame 12` (621.0×20.0px)
      → Layout: HORIZONTAL, Gap: 16.0px
      - **[TEXT]** `Home` (40.0×20.0px)
        → Fill: #F1EDED
        → Text: "Home"
        → Font: Inter 14.0px 400
      - **[TEXT]** `Categorias` (72.0×20.0px)
        → Fill: #F1EDED
        → Text: "Categorias"
        → Font: Inter 14.0px 400
      - **[TEXT]** `Mais procurados` (111.0×20.0px)
        → Fill: #F1EDED
        → Text: "Mais procurados"
        → Font: Inter 14.0px 400
      - **[TEXT]** `Guia rápido` (80.0×20.0px)
        → Fill: #F1EDED
        → Text: " Guia rápido"
        → Font: Inter 14.0px 400
      - **[TEXT]** `Ambientes` (71.0×20.0px)
        → Fill: #F1EDED
        → Text: "Ambientes"
        → Font: Inter 14.0px 400
      - **[TEXT]** `Serviço Curitiba` (106.0×20.0px)
        → Fill: #F1EDED
        → Text: "Serviço Curitiba"
        → Font: Inter 14.0px 400
      - **[TEXT]** `Outros` (45.0×20.0px)
        → Fill: #F1EDED
        → Text: "Outros"
        → Font: Inter 14.0px 400
  - **[FRAME]** `Frame 2169` (1440.0×853.0px)
    → Layout: HORIZONTAL, Gap: 0px
    - **[FRAME]** `Frame 15` (904.0×853.0px)
      → Fill: #F1EDED
      → Layout: VERTICAL, Gap: 24.0px
      - **[FRAME]** `Frame 2088` (520.0×21.0px)
        → Layout: HORIZONTAL, Gap: 24.0px
      - **[FRAME]** `Frame 2121` (688.0×628.0px)
        → Layout: VERTICAL, Gap: 16.0px
    - **[FRAME]** `Frame 20` (536.0×853.0px)
      → Fill: #FFFFFF
      → Layout: VERTICAL, Gap: 24.0px
      - **[FRAME]** `Frame 30` (312.0×272.0px)
        → Layout: VERTICAL, Gap: 16.0px
  - **[FRAME]** `Frame 18` (1440.0×604.0px)
    → Fill: #6C191D
    → Layout: VERTICAL, Gap: 40.0px
    - **[FRAME]** `Frame 47` (1224.0×184.0px)
      → Layout: HORIZONTAL, Gap: 24.0px
      - **[FRAME]** `Frame 36` (184.0×184.0px)
        → Radius: 16.0px
        → Layout: HORIZONTAL, Gap: 24.0px
      - **[FRAME]** `Frame 46` (184.0×184.0px)
        → Radius: 16.0px
        → Layout: HORIZONTAL, Gap: 24.0px
      - **[FRAME]** `Frame 47` (184.0×184.0px)
        → Fill: #000000
        → Radius: 16.0px
        → Layout: HORIZONTAL, Gap: 24.0px
      - **[FRAME]** `Frame 48` (184.0×184.0px)
        → Radius: 16.0px
        → Layout: HORIZONTAL, Gap: 24.0px
      - **[FRAME]** `Frame 49` (184.0×184.0px)
        → Radius: 16.0px
        → Layout: HORIZONTAL, Gap: 24.0px
      - **[FRAME]** `Frame 50` (184.0×184.0px)
        → Radius: 16.0px
        → Layout: HORIZONTAL, Gap: 24.0px
    - **[FRAME]** `Frame 52` (1224.0×220.0px)
      → Layout: VERTICAL, Gap: 16.0px
      - **[FRAME]** `Frame 45` (1224.0×168.0px)
        → Layout: HORIZONTAL, Gap: 48.0px
      - **[FRAME]** `Frame 51` (1224.0×20.0px)
        → Layout: HORIZONTAL, Gap: 48.0px
```

### 1.3. SEÇÕES PRINCIPAIS

#### Seção 1: Desktop / Informações do Pedido

- **Dimensões:** 1440.0px × 1567.0px
- **Background:** #000000 (opacity: 0%)
- **Layout:** VERTICAL
- **Gap:** 0px
- **Padding:** 0px 0px 0px 0px
- **Children:** 3 elementos

#### Seção 2: Frame 19

- **Dimensões:** 1440.0px × 110.0px
- **Background:** #6C191D
- **Layout:** VERTICAL
- **Gap:** 8.0px
- **Padding:** 16.0px 108.0px 16.0px 108.0px
- **Children:** 2 elementos

#### Seção 3: Frame 55

- **Dimensões:** 1224.0px × 50.0px
- **Background:** #000000 (opacity: 0%)
- **Layout:** HORIZONTAL
- **Gap:** 1006.0px
- **Padding:** 0px 0px 0px 0px
- **Children:** 3 elementos

#### Seção 4: Frame 8

- **Dimensões:** 76.0px × 36.0px
- **Background:** #000000 (opacity: 0%)
- **Layout:** HORIZONTAL
- **Gap:** 4.0px
- **Padding:** 0px 0px 0px 0px
- **Children:** 2 elementos

#### Seção 5: Frame 12

- **Dimensões:** 621.0px × 20.0px
- **Background:** #000000 (opacity: 0%)
- **Layout:** HORIZONTAL
- **Gap:** 16.0px
- **Padding:** 0px 0px 0px 0px
- **Children:** 7 elementos

#### Seção 6: Frame 2169

- **Dimensões:** 1440.0px × 853.0px
- **Background:** #000000 (opacity: 0%)
- **Layout:** HORIZONTAL
- **Gap:** 0px
- **Padding:** 0px 0px 0px 0px
- **Children:** 2 elementos

#### Seção 7: Frame 15

- **Dimensões:** 904.0px × 853.0px
- **Background:** #F1EDED
- **Layout:** VERTICAL
- **Gap:** 24.0px
- **Padding:** 72.0px 108.0px 108.0px 108.0px
- **Children:** 2 elementos

#### Seção 8: Frame 2088

- **Dimensões:** 520.0px × 21.0px
- **Background:** #000000 (opacity: 0%)
- **Layout:** HORIZONTAL
- **Gap:** 24.0px
- **Padding:** 0px 0px 0px 0px
- **Children:** 1 elementos

#### Seção 9: Frame 2121

- **Dimensões:** 688.0px × 628.0px
- **Background:** #000000 (opacity: 0%)
- **Layout:** VERTICAL
- **Gap:** 16.0px
- **Padding:** 0px 0px 0px 0px
- **Children:** 1 elementos

#### Seção 10: Frame 20

- **Dimensões:** 536.0px × 853.0px
- **Background:** #FFFFFF
- **Layout:** VERTICAL
- **Gap:** 24.0px
- **Padding:** 72.0px 108.0px 108.0px 116.0px
- **Children:** 1 elementos

### 1.4. PALETA DE CORES

| RGB | HEX | Uso provável |
|-----|-----|--------------|
| `rgb(0, 0, 0)` | `#000000` | Texto / Preto |
| `rgb(108, 25, 29)` | `#6C191D` | N/A |
| `rgb(119, 105, 106)` | `#77696A` | N/A |
| `rgb(200, 190, 191)` | `#C8BEBF` | N/A |
| `rgb(215, 255, 224)` | `#D7FFE0` | Verde/Amarelo |
| `rgb(221, 213, 214)` | `#DDD5D6` | N/A |
| `rgb(241, 237, 237)` | `#F1EDED` | N/A |
| `rgb(255, 243, 243)` | `#FFF3F3` | Background / Branco |
| `rgb(255, 255, 255)` | `#FFFFFF` | Background / Branco |
| `rgb(43, 142, 65)` | `#2B8E41` | N/A |
| `rgb(49, 42, 42)` | `#312A2A` | N/A |
| `rgb(77, 182, 172)` | `#4DB6AC` | N/A |
| `rgb(78, 67, 67)` | `#4E4343` | N/A |
| `rgb(98, 86, 86)` | `#625656` | N/A |
| `rgba(0, 0, 0, 0.00)` | `#000000 (opacity: 0%)` | Texto / Preto |
| `rgba(0, 0, 0, 0.12)` | `#000000 (opacity: 12%)` | Texto / Preto |
| `rgba(0, 0, 0, 0.25)` | `#000000 (opacity: 25%)` | Texto / Preto |

### 1.5. TIPOGRAFIA

| Texto (preview) | Font Family | Size | Weight | Line Height | Color |
|----------------|-------------|------|--------|-------------|-------|
| `Label text` | Inter | 14.0px | 400 | 20.0px | `#000000` |
| `Buscar persianas, serviços, et` | Inter | 16.0px | 400 | 24.0px | `#77696A` |
| `Informações do Pedido` | Inter | 18.0px | 400 | 28.0px | `#000000` |
| `Entregue` | Inter | 12.0px | 400 | 16.0px | `#D7FFE0` |
| `R$ 350,19` | Inter | 16.0px | 500 | 24.0px | `#000000` |

### 1.6. ESPAÇAMENTOS

| Tipo | Valor |
|------|-------|
| cornerRadius | 6.0px, 8.0px, 16.0px, 29.0px, 59.0px, 118.5px |
| itemSpacing | 4.0px, 8.0px, 10.0px, 16.0px, 24.0px, 40.0px, 48.0px, 1006.0px |
| paddingBottom | 4.0px, 8.0px, 12.0px, 16.0px, 80.0px, 108.0px |
| paddingLeft | 4.0px, 8.0px, 12.0px, 16.0px, 108.0px, 116.0px |
| paddingRight | 4.0px, 8.0px, 12.0px, 16.0px, 108.0px |
| paddingTop | 4.0px, 8.0px, 12.0px, 16.0px, 72.0px, 80.0px |


---

## 6. Desktop / Pagamento aprovado!

### 1.1. DIMENSÕES GERAIS

- **Dimensão total:** 1440.0px × 1674.0px
- **Posição:** x: 10523.0px, y: 13587.0px
- **Layout Mode:** VERTICAL
- **Item Spacing:** 0px
- **Padding:** 0px (top) 0px (right) 0px (bottom) 0px (left)
- **Background Color:** #FFFFFF (rgb(255, 255, 255))

### 1.2. ESTRUTURA COMPLETA

```
- **[FRAME]** `Desktop / Pagamento aprovado!` (1440.0×1674.0px)
  → Fill: #FFFFFF
  → Layout: VERTICAL, Gap: 0px
  - **[FRAME]** `Frame 19` (1440.0×110.0px)
    → Fill: #6C191D
    → Layout: VERTICAL, Gap: 8.0px
    - **[FRAME]** `Frame 55` (1224.0×50.0px)
      → Layout: HORIZONTAL, Gap: 1006.0px
      - **[INSTANCE]** `Placeholder` (336.0×40.0px)
        → Layout: VERTICAL, Gap: 4.0px
      - **[FRAME]** `Frame 8` (76.0×36.0px)
        → Layout: HORIZONTAL, Gap: 4.0px
    - **[FRAME]** `Frame 12` (621.0×20.0px)
      → Layout: HORIZONTAL, Gap: 16.0px
      - **[TEXT]** `Home` (40.0×20.0px)
        → Fill: #F1EDED
        → Text: "Home"
        → Font: Inter 14.0px 400
      - **[TEXT]** `Categorias` (72.0×20.0px)
        → Fill: #F1EDED
        → Text: "Categorias"
        → Font: Inter 14.0px 400
      - **[TEXT]** `Mais procurados` (111.0×20.0px)
        → Fill: #F1EDED
        → Text: "Mais procurados"
        → Font: Inter 14.0px 400
      - **[TEXT]** `Guia rápido` (80.0×20.0px)
        → Fill: #F1EDED
        → Text: " Guia rápido"
        → Font: Inter 14.0px 400
      - **[TEXT]** `Ambientes` (71.0×20.0px)
        → Fill: #F1EDED
        → Text: "Ambientes"
        → Font: Inter 14.0px 400
      - **[TEXT]** `Serviço Curitiba` (106.0×20.0px)
        → Fill: #F1EDED
        → Text: "Serviço Curitiba"
        → Font: Inter 14.0px 400
      - **[TEXT]** `Outros` (45.0×20.0px)
        → Fill: #F1EDED
        → Text: "Outros"
        → Font: Inter 14.0px 400
  - **[FRAME]** `Frame 2169` (1440.0×960.0px)
    → Layout: HORIZONTAL, Gap: 0px
    - **[FRAME]** `Frame 20` (1440.0×960.0px)
      → Fill: #FFFFFF
      → Layout: VERTICAL, Gap: 24.0px
      - **[FRAME]** `Frame 2215` (392.0×192.0px)
        → Layout: VERTICAL, Gap: 24.0px
  - **[FRAME]** `Frame 18` (1440.0×604.0px)
    → Fill: #6C191D
    → Layout: VERTICAL, Gap: 40.0px
    - **[FRAME]** `Frame 47` (1224.0×184.0px)
      → Layout: HORIZONTAL, Gap: 24.0px
      - **[FRAME]** `Frame 36` (184.0×184.0px)
        → Radius: 16.0px
        → Layout: HORIZONTAL, Gap: 24.0px
      - **[FRAME]** `Frame 46` (184.0×184.0px)
        → Radius: 16.0px
        → Layout: HORIZONTAL, Gap: 24.0px
      - **[FRAME]** `Frame 47` (184.0×184.0px)
        → Fill: #000000
        → Radius: 16.0px
        → Layout: HORIZONTAL, Gap: 24.0px
      - **[FRAME]** `Frame 48` (184.0×184.0px)
        → Radius: 16.0px
        → Layout: HORIZONTAL, Gap: 24.0px
      - **[FRAME]** `Frame 49` (184.0×184.0px)
        → Radius: 16.0px
        → Layout: HORIZONTAL, Gap: 24.0px
      - **[FRAME]** `Frame 50` (184.0×184.0px)
        → Radius: 16.0px
        → Layout: HORIZONTAL, Gap: 24.0px
    - **[FRAME]** `Frame 52` (1224.0×220.0px)
      → Layout: VERTICAL, Gap: 16.0px
      - **[FRAME]** `Frame 45` (1224.0×168.0px)
        → Layout: HORIZONTAL, Gap: 48.0px
      - **[FRAME]** `Frame 51` (1224.0×20.0px)
        → Layout: HORIZONTAL, Gap: 48.0px
```

### 1.3. SEÇÕES PRINCIPAIS

#### Seção 1: Desktop / Pagamento aprovado!

- **Dimensões:** 1440.0px × 1674.0px
- **Background:** #FFFFFF
- **Layout:** VERTICAL
- **Gap:** 0px
- **Padding:** 0px 0px 0px 0px
- **Children:** 3 elementos

#### Seção 2: Frame 19

- **Dimensões:** 1440.0px × 110.0px
- **Background:** #6C191D
- **Layout:** VERTICAL
- **Gap:** 8.0px
- **Padding:** 16.0px 108.0px 16.0px 108.0px
- **Children:** 2 elementos

#### Seção 3: Frame 55

- **Dimensões:** 1224.0px × 50.0px
- **Background:** #000000 (opacity: 0%)
- **Layout:** HORIZONTAL
- **Gap:** 1006.0px
- **Padding:** 0px 0px 0px 0px
- **Children:** 3 elementos

#### Seção 4: Frame 8

- **Dimensões:** 76.0px × 36.0px
- **Background:** #000000 (opacity: 0%)
- **Layout:** HORIZONTAL
- **Gap:** 4.0px
- **Padding:** 0px 0px 0px 0px
- **Children:** 2 elementos

#### Seção 5: Frame 12

- **Dimensões:** 621.0px × 20.0px
- **Background:** #000000 (opacity: 0%)
- **Layout:** HORIZONTAL
- **Gap:** 16.0px
- **Padding:** 0px 0px 0px 0px
- **Children:** 7 elementos

#### Seção 6: Frame 2169

- **Dimensões:** 1440.0px × 960.0px
- **Background:** #000000 (opacity: 0%)
- **Layout:** HORIZONTAL
- **Gap:** 0px
- **Padding:** 0px 0px 0px 0px
- **Children:** 1 elementos

#### Seção 7: Frame 20

- **Dimensões:** 1440.0px × 960.0px
- **Background:** #FFFFFF
- **Layout:** VERTICAL
- **Gap:** 24.0px
- **Padding:** 72.0px 524.0px 108.0px 524.0px
- **Children:** 1 elementos

#### Seção 8: Frame 2215

- **Dimensões:** 392.0px × 192.0px
- **Background:** #000000 (opacity: 0%)
- **Layout:** VERTICAL
- **Gap:** 24.0px
- **Padding:** 0px 0px 0px 0px
- **Children:** 3 elementos

#### Seção 9: Frame 18

- **Dimensões:** 1440.0px × 604.0px
- **Background:** #6C191D
- **Layout:** VERTICAL
- **Gap:** 40.0px
- **Padding:** 80.0px 108.0px 80.0px 108.0px
- **Children:** 2 elementos

#### Seção 10: Frame 47

- **Dimensões:** 1224.0px × 184.0px
- **Background:** #000000 (opacity: 0%)
- **Layout:** HORIZONTAL
- **Gap:** 24.0px
- **Padding:** 0px 0px 0px 0px
- **Children:** 6 elementos

### 1.4. PALETA DE CORES

| RGB | HEX | Uso provável |
|-----|-----|--------------|
| `rgb(0, 0, 0)` | `#000000` | Texto / Preto |
| `rgb(108, 25, 29)` | `#6C191D` | N/A |
| `rgb(119, 105, 106)` | `#77696A` | N/A |
| `rgb(200, 190, 191)` | `#C8BEBF` | N/A |
| `rgb(221, 213, 214)` | `#DDD5D6` | N/A |
| `rgb(241, 237, 237)` | `#F1EDED` | N/A |
| `rgb(255, 243, 243)` | `#FFF3F3` | Background / Branco |
| `rgb(255, 255, 255)` | `#FFFFFF` | Background / Branco |
| `rgb(57, 181, 74)` | `#39B54A` | N/A |
| `rgb(78, 67, 67)` | `#4E4343` | N/A |
| `rgb(98, 86, 86)` | `#625656` | N/A |
| `rgba(0, 0, 0, 0.00)` | `#000000 (opacity: 0%)` | Texto / Preto |
| `rgba(0, 0, 0, 0.25)` | `#000000 (opacity: 25%)` | Texto / Preto |

### 1.5. TIPOGRAFIA

| Texto (preview) | Font Family | Size | Weight | Line Height | Color |
|----------------|-------------|------|--------|-------------|-------|
| `Label text` | Inter | 14.0px | 400 | 20.0px | `#000000` |
| `Buscar persianas, serviços, et` | Inter | 16.0px | 400 | 24.0px | `#77696A` |
| `Pagamento aprovado!` | Inter | 18.0px | 400 | 28.0px | `#000000` |
| `Sobre nós` | Inter | 18.0px | 500 | 28.0px | `#F1EDED` |

### 1.6. ESPAÇAMENTOS

| Tipo | Valor |
|------|-------|
| cornerRadius | 8.0px, 16.0px, 59.0px, 118.5px |
| itemSpacing | 4.0px, 8.0px, 16.0px, 24.0px, 40.0px, 48.0px, 1006.0px |
| paddingBottom | 8.0px, 12.0px, 16.0px, 80.0px, 108.0px |
| paddingLeft | 12.0px, 16.0px, 108.0px, 524.0px |
| paddingRight | 12.0px, 16.0px, 108.0px, 524.0px |
| paddingTop | 8.0px, 12.0px, 16.0px, 72.0px, 80.0px |


---
## 7. ANÁLISE CONSOLIDADA

### 7.1. COMPONENTES IDENTIFICADOS POR PÁGINA

#### Desktop / Checkout

*Nenhum componente específico identificado automaticamente*

#### Desktop / Endereço (1)

**INPUTS (1):**

1. **Desktop / Endereço**
   - Dimensões: 1440.0px × 1674.0px
   - Layout: VERTICAL, Gap: 0px
   - Textos:
     - "Label text"
       - Font: Inter 14.0px 400
     - "Buscar persianas, serviços, etc..."
       - Font: Inter 16.0px 400
     - "Supporting text"
       - Font: Inter 14.0px 400
     - "Sem Furos"
       - Font: Inter 14.0px 400
     - "Sem Furos"
       - Font: Inter 14.0px 400


#### Desktop / Endereço (2)

**INPUTS (1):**

1. **Desktop / Endereço**
   - Dimensões: 1440.0px × 1674.0px
   - Layout: VERTICAL, Gap: 0px
   - Textos:
     - "Label text"
       - Font: Inter 14.0px 400
     - "Buscar persianas, serviços, etc..."
       - Font: Inter 16.0px 400
     - "Supporting text"
       - Font: Inter 14.0px 400
     - "Sem Furos"
       - Font: Inter 14.0px 400
     - "Sem Furos"
       - Font: Inter 14.0px 400


#### Desktop / Forma de pagamento

**CARDS (1):**

1. **icon/card**
   - Dimensões: 20.0px × 20.0px

**PAYMENTS (1):**

1. **Desktop / Forma de pagamento**
   - Dimensões: 1440.0px × 1674.0px
   - Background: #FFFFFF
   - Layout: VERTICAL, Gap: 0px
   - Textos:
     - "Label text"
       - Font: Inter 14.0px 400
     - "Buscar persianas, serviços, etc..."
       - Font: Inter 16.0px 400
     - "Supporting text"
       - Font: Inter 14.0px 400
     - "Sem Furos"
       - Font: Inter 14.0px 400
     - "Sem Furos"
       - Font: Inter 14.0px 400


#### Desktop / Informações do Pedido

**SUMMARYS (1):**

1. **Desktop / Informações do Pedido**
   - Dimensões: 1440.0px × 1567.0px
   - Layout: VERTICAL, Gap: 0px
   - Textos:
     - "Label text"
       - Font: Inter 14.0px 400
     - "Buscar persianas, serviços, etc..."
       - Font: Inter 16.0px 400
     - "Supporting text"
       - Font: Inter 14.0px 400
     - "Sem Furos"
       - Font: Inter 14.0px 400
     - "Sem Furos"
       - Font: Inter 14.0px 400


#### Desktop / Pagamento aprovado!

**PAYMENTS (1):**

1. **Desktop / Pagamento aprovado!**
   - Dimensões: 1440.0px × 1674.0px
   - Background: #FFFFFF
   - Layout: VERTICAL, Gap: 0px
   - Textos:
     - "Label text"
       - Font: Inter 14.0px 400
     - "Buscar persianas, serviços, etc..."
       - Font: Inter 16.0px 400
     - "Supporting text"
       - Font: Inter 14.0px 400
     - "Sem Furos"
       - Font: Inter 14.0px 400
     - "Sem Furos"
       - Font: Inter 14.0px 400


### 7.2. SISTEMA DE CORES CONSOLIDADO

| HEX | RGB | Páginas que usam |
|-----|-----|------------------|
| `#000000` | `rgb(0, 0, 0)` | Checkout, Endereço (1), Endereço (2) (+3) |
| `#6C191D` | `rgb(108, 25, 29)` | Checkout, Endereço (1), Endereço (2) (+3) |
| `#77696A` | `rgb(119, 105, 106)` | Checkout, Endereço (1), Endereço (2) (+3) |
| `#C8BEBF` | `rgb(200, 190, 191)` | Checkout, Endereço (1), Endereço (2) (+3) |
| `#DDD5D6` | `rgb(221, 213, 214)` | Checkout, Endereço (1), Endereço (2) (+3) |
| `#F1EDED` | `rgb(241, 237, 237)` | Checkout, Endereço (1), Endereço (2) (+3) |
| `#FFF3F3` | `rgb(255, 243, 243)` | Checkout, Endereço (1), Endereço (2) (+3) |
| `#FFFFFF` | `rgb(255, 255, 255)` | Checkout, Endereço (1), Endereço (2) (+3) |
| `#4E4343` | `rgb(78, 67, 67)` | Checkout, Endereço (1), Endereço (2) (+3) |
| `#625656` | `rgb(98, 86, 86)` | Checkout, Endereço (1), Endereço (2) (+3) |
| `#000000 (opacity: 0%)` | `rgba(0, 0, 0, 0.00)` | Checkout, Endereço (1), Endereço (2) (+3) |
| `#000000 (opacity: 25%)` | `rgba(0, 0, 0, 0.25)` | Checkout, Endereço (1), Endereço (2) (+3) |
| `#2B8E41` | `rgb(43, 142, 65)` | Checkout, Endereço (1), Endereço (2) (+2) |
| `#196C2B` | `rgb(25, 108, 43)` | Checkout, Endereço (1), Endereço (2) (+1) |
| `#312A2A` | `rgb(49, 42, 42)` | Checkout, Informações do Pedido |
| `#000000 (opacity: 12%)` | `rgba(0, 0, 0, 0.12)` | Checkout, Informações do Pedido |
| `#4DB6AC` | `rgb(77, 182, 172)` | Forma de pagamento, Informações do Pedido |
| `#F3FFF5` | `rgb(243, 255, 245)` | Forma de pagamento |
| `#030104` | `rgb(3, 1, 4)` | Forma de pagamento |
| `#D7FFE0` | `rgb(215, 255, 224)` | Informações do Pedido |
| `#39B54A` | `rgb(57, 181, 74)` | Pagamento aprovado! |

### 7.3. SISTEMA DE TIPOGRAFIA CONSOLIDADO

| Font Family | Size | Weight | Line Height | Uso |
|-------------|------|--------|-------------|-----|
| Inter | 14.0px | 400 | 20.0px | Texto secundário (179 páginas) |
| Inter | 16.0px | 400 | 24.0px | Texto corpo / H4 (44 páginas) |
| Inter | 12.0px | 400 | 16.0px | Texto pequeno / Labels (33 páginas) |
| Inter | 18.0px | 500 | 28.0px | Subtítulos / H3 (24 páginas) |
| Inter | 16.0px | 500 | 24.0px | Texto corpo / H4 (13 páginas) |
| Inter | 18.0px | 400 | 28.0px | Subtítulos / H3 (11 páginas) |

### 7.4. SISTEMA DE ESPAÇAMENTOS CONSOLIDADO

| Tipo | Valores (px) |
|------|--------------|
| cornerRadius | 6.0, 8.0, 16.0, 29.0, 59.0, 118.5 |
| itemSpacing | 4.0, 8.0, 10.0, 16.0, 24.0, 40.0, 48.0, 1006.0 |
| paddingBottom | 4.0, 8.0, 12.0, 16.0, 80.0, 108.0 |
| paddingLeft | 4.0, 8.0, 12.0, 16.0, 108.0, 116.0, 524.0 |
| paddingRight | 4.0, 8.0, 12.0, 16.0, 108.0, 116.0, 524.0 |
| paddingTop | 4.0, 8.0, 12.0, 16.0, 72.0, 80.0 |

### 7.5. PADRÕES DE LAYOUT IDENTIFICADOS

| Layout Mode | Ocorrências |
|-------------|-------------|
| HORIZONTAL | 214 |
| VERTICAL | 142 |

### 7.6. DIMENSÕES PADRÃO

**Dimensões das páginas:**

| Página | Largura | Altura |
|--------|---------|--------|
| Checkout | 1440.0px | 1674.0px |
| Endereço (1) | 1440.0px | 1674.0px |
| Endereço (2) | 1440.0px | 1674.0px |
| Forma de pagamento | 1440.0px | 1674.0px |
| Informações do Pedido | 1440.0px | 1567.0px |
| Pagamento aprovado! | 1440.0px | 1674.0px |

### 7.7. RECOMENDAÇÕES PARA IMPLEMENTAÇÃO

#### Sistema de Design

Com base na análise das 5 páginas de checkout, recomendamos implementar:

1. **Sistema de Cores:**
   - Definir variáveis CSS/Tailwind para as cores mais usadas
   - Agrupar cores por função (primary, secondary, error, success, background, border, text)

2. **Sistema de Tipografia:**
   - Criar classes reutilizáveis para cada combinação font-family/size/weight
   - Definir hierarquia tipográfica clara (h1-h6, body, caption)

3. **Sistema de Espaçamento:**
   - Usar escala consistente (múltiplos de 4px ou 8px)
   - Definir tokens de espaçamento (xs, sm, md, lg, xl)

4. **Componentes Reutilizáveis:**
   - Button (variants: primary, secondary, outline)
   - Input/TextField (variants: normal, error, success)
   - Card
   - Stepper/Progress indicator
   - Summary/Order total

5. **Layout:**
   - Container max-width consistente
   - Grid system para responsividade
   - Sidebar fixa para resumo do pedido
# ANÁLISE DETALHADA POR ELEMENTO - CHECKOUT

Este documento complementa o RELATORIO_DESIGN_CHECKOUT.md com análises mais específicas.

---

## Desktop / Checkout

### TEXTOS IDENTIFICADOS (52)

#### Tamanho: 18.0px (5 elementos)

1. **"Produtos selecionados"**
   - Font: Inter 400
   - Line Height: 28.0px
   - Color: #000000

2. **"Resumo"**
   - Font: Inter 400
   - Line Height: 28.0px
   - Color: #000000

3. **"Sobre nós"**
   - Font: Inter 500
   - Line Height: 28.0px
   - Color: #F1EDED

4. **"Nossos produtos"**
   - Font: Inter 500
   - Line Height: 28.0px
   - Color: #F1EDED

5. **"Links rápidos"**
   - Font: Inter 500
   - Line Height: 28.0px
   - Color: #F1EDED

#### Tamanho: 16.0px (12 elementos)

1. **"Buscar persianas, serviços, etc..."**
   - Font: Inter 400
   - Line Height: 24.0px
   - Color: #77696A

2. **"Persiana Blackout Kitbox - Preto"**
   - Font: Inter 400
   - Line Height: 24.0px
   - Color: #000000

3. **"R$ 350,19"**
   - Font: Inter 500
   - Line Height: 24.0px
   - Color: #000000

4. **"Valor a prazo"**
   - Font: Inter 400
   - Line Height: 24.0px
   - Color: #625656

5. **"R$ 350,19"**
   - Font: Inter 500
   - Line Height: 24.0px
   - Color: #000000

6. **"(em até 10X de R$ 159,43 sem juros)"**
   - Font: Inter 400
   - Line Height: 24.0px
   - Color: #625656

7. **"Valor à vista no PIX"**
   - Font: Inter 400
   - Line Height: 24.0px
   - Color: #196C2B

8. **"R$ 350,19"**
   - Font: Inter 500
   - Line Height: 24.0px
   - Color: #196C2B

9. **"(Economize: R$ 332,68) "**
   - Font: Inter 400
   - Line Height: 24.0px
   - Color: #196C2B

10. **"Insira código do cupom"**
   - Font: Inter 400
   - Line Height: 24.0px
   - Color: #77696A

#### Tamanho: 14.0px (32 elementos)

1. **"Label text"**
   - Font: Inter 400
   - Line Height: 20.0px
   - Color: #000000

2. **"Supporting text"**
   - Font: Inter 400
   - Line Height: 20.0px
   - Color: #625656

3. **"Sem Furos"**
   - Font: Inter 400
   - Line Height: 20.0px
   - Color: #FFF3F3

4. **"Sem Furos"**
   - Font: Inter 400
   - Line Height: 20.0px
   - Color: #FFF3F3

5. **"Home"**
   - Font: Inter 400
   - Line Height: 20.0px
   - Color: #F1EDED

6. **"Categorias"**
   - Font: Inter 400
   - Line Height: 20.0px
   - Color: #F1EDED

7. **"Mais procurados"**
   - Font: Inter 400
   - Line Height: 20.0px
   - Color: #F1EDED

8. **" Guia rápido"**
   - Font: Inter 400
   - Line Height: 20.0px
   - Color: #F1EDED

9. **"Ambientes"**
   - Font: Inter 400
   - Line Height: 20.0px
   - Color: #F1EDED

10. **"Serviço Curitiba"**
   - Font: Inter 400
   - Line Height: 20.0px
   - Color: #F1EDED

#### Tamanho: 12.0px (3 elementos)

1. **"Cor: "**
   - Font: Inter 400
   - Line Height: 16.0px
   - Color: #625656

2. **"Tamanho:"**
   - Font: Inter 400
   - Line Height: 16.0px
   - Color: #625656

3. **"Lado da cordinha:"**
   - Font: Inter 400
   - Line Height: 16.0px
   - Color: #625656

### CONTAINERS E ELEMENTOS GRÁFICOS (81)

#### Elementos com estilização especial (22)

1. **Frame 19** (FRAME)
   - Dimensões: 1440.0px × 110.0px
   - Background: #6C191D
   - Effect: DROP_SHADOW
     - Blur Radius: 4.0px
     - Color: #000000 (opacity: 25%)

2. **image 2** (RECTANGLE)
   - Dimensões: 50.0px × 50.0px
   - Border Radius: 118.5px

3. **Frame 56** (FRAME)
   - Dimensões: 336.0px × 40.0px
   - Background: #FFFFFF
   - Border: 1.0px solid #C8BEBF
   - Border Radius: 8.0px

4. **Frame 5** (INSTANCE)
   - Dimensões: 36.0px × 36.0px
   - Background: #FFFFFF
   - Border: 1.0px solid #6C191D
   - Border Radius: 59.0px

5. **Frame 4** (INSTANCE)
   - Dimensões: 36.0px × 36.0px
   - Background: #FFFFFF
   - Border: 1.0px solid #6C191D
   - Border Radius: 59.0px

6. **Frame 7** (FRAME)
   - Dimensões: 688.0px × 164.0px
   - Background: #FFFFFF
   - Border: 1.0px solid #C8BEBF
   - Border Radius: 16.0px

7. **Frame 10** (FRAME)
   - Dimensões: 124.0px × 132.0px
   - Background: #F1EDED
   - Border Radius: 8.0px
   - Effect: DROP_SHADOW
     - Blur Radius: 24.0px
     - Color: #000000 (opacity: 12%)

8. **gray-curtains-white-wall-modern-style 1** (RECTANGLE)
   - Dimensões: 108.0px × 116.0px
   - Border Radius: 6.0px

9. **Frame 30** (INSTANCE)
   - Dimensões: 52.0px × 28.0px
   - Border Radius: 8.0px

10. **Frame 30** (INSTANCE)
   - Dimensões: 83.0px × 28.0px
   - Background: #FFFFFF
   - Border: 1.0px solid #C8BEBF
   - Border Radius: 8.0px

11. **Frame 2174** (FRAME)
   - Dimensões: 312.0px × 84.0px
   - Border Radius: 16.0px

12. **Frame 2175** (FRAME)
   - Dimensões: 312.0px × 84.0px
   - Border Radius: 16.0px

13. **Frame 56** (FRAME)
   - Dimensões: 312.0px × 40.0px
   - Background: #FFFFFF
   - Border: 1.0px solid #C8BEBF
   - Border Radius: 8.0px

14. **Frame 30** (INSTANCE)
   - Dimensões: 312.0px × 48.0px
   - Background: #6C191D
   - Border Radius: 8.0px

15. **Frame 3** (INSTANCE)
   - Dimensões: 312.0px × 48.0px
   - Background: #FFFFFF
   - Border: 1.0px solid #C8BEBF
   - Border Radius: 8.0px

16. **Frame 36** (FRAME)
   - Dimensões: 184.0px × 184.0px
   - Border Radius: 16.0px

17. **Frame 46** (FRAME)
   - Dimensões: 184.0px × 184.0px
   - Border Radius: 16.0px

18. **Frame 47** (FRAME)
   - Dimensões: 184.0px × 184.0px
   - Background: #000000
   - Border Radius: 16.0px

19. **Frame 48** (FRAME)
   - Dimensões: 184.0px × 184.0px
   - Border Radius: 16.0px

20. **Frame 49** (FRAME)
   - Dimensões: 184.0px × 184.0px
   - Border Radius: 16.0px

### IMAGENS (9)

1. **image 2**
   - Dimensões: 50.0px × 50.0px
   - Image Ref: ea32901c74b76e6ed7a1ada332c7cb3d17d44427
   - Scale Mode: STRETCH

2. **gray-curtains-white-wall-modern-style 1**
   - Dimensões: 108.0px × 116.0px
   - Image Ref: 1c9774fac0f48ec78aacafedd659db87dd27fbb2
   - Scale Mode: FILL

3. **Frame 36**
   - Dimensões: 184.0px × 184.0px
   - Image Ref: 1c9774fac0f48ec78aacafedd659db87dd27fbb2
   - Scale Mode: FILL

4. **Frame 46**
   - Dimensões: 184.0px × 184.0px
   - Image Ref: 1c9774fac0f48ec78aacafedd659db87dd27fbb2
   - Scale Mode: FILL

5. **Frame 47**
   - Dimensões: 184.0px × 184.0px
   - Image Ref: 1c9774fac0f48ec78aacafedd659db87dd27fbb2
   - Scale Mode: FILL

6. **Frame 48**
   - Dimensões: 184.0px × 184.0px
   - Image Ref: 1c9774fac0f48ec78aacafedd659db87dd27fbb2
   - Scale Mode: FILL

7. **Frame 49**
   - Dimensões: 184.0px × 184.0px
   - Image Ref: 1c9774fac0f48ec78aacafedd659db87dd27fbb2
   - Scale Mode: FILL

8. **Frame 50**
   - Dimensões: 184.0px × 184.0px
   - Image Ref: 1c9774fac0f48ec78aacafedd659db87dd27fbb2
   - Scale Mode: FILL

9. **image 2**
   - Dimensões: 62.0px × 62.0px
   - Image Ref: ea32901c74b76e6ed7a1ada332c7cb3d17d44427
   - Scale Mode: STRETCH


---

## Desktop / Endereço (1)

### TEXTOS IDENTIFICADOS (43)

#### Tamanho: 18.0px (5 elementos)

1. **"Endereço de entrega"**
   - Font: Inter 400
   - Line Height: 28.0px
   - Color: #000000

2. **"Resumo"**
   - Font: Inter 400
   - Line Height: 28.0px
   - Color: #000000

3. **"Sobre nós"**
   - Font: Inter 500
   - Line Height: 28.0px
   - Color: #F1EDED

4. **"Nossos produtos"**
   - Font: Inter 500
   - Line Height: 28.0px
   - Color: #F1EDED

5. **"Links rápidos"**
   - Font: Inter 500
   - Line Height: 28.0px
   - Color: #F1EDED

#### Tamanho: 16.0px (10 elementos)

1. **"Buscar persianas, serviços, etc..."**
   - Font: Inter 400
   - Line Height: 24.0px
   - Color: #77696A

2. **"Cadastrar endereço"**
   - Font: Inter 400
   - Line Height: 24.0px
   - Color: #F1EDED

3. **"Voltar"**
   - Font: Inter 400
   - Line Height: 24.0px
   - Color: #000000

4. **"Valor a prazo"**
   - Font: Inter 400
   - Line Height: 24.0px
   - Color: #625656

5. **"R$ 350,19"**
   - Font: Inter 500
   - Line Height: 24.0px
   - Color: #000000

6. **"(em até 10X de R$ 159,43 sem juros)"**
   - Font: Inter 400
   - Line Height: 24.0px
   - Color: #625656

7. **"Valor à vista no PIX"**
   - Font: Inter 400
   - Line Height: 24.0px
   - Color: #196C2B

8. **"R$ 350,19"**
   - Font: Inter 500
   - Line Height: 24.0px
   - Color: #196C2B

9. **"(Economize: R$ 332,68) "**
   - Font: Inter 400
   - Line Height: 24.0px
   - Color: #196C2B

10. **"Insira código do cupom"**
   - Font: Inter 400
   - Line Height: 24.0px
   - Color: #77696A

#### Tamanho: 14.0px (28 elementos)

1. **"Label text"**
   - Font: Inter 400
   - Line Height: 20.0px
   - Color: #000000

2. **"Supporting text"**
   - Font: Inter 400
   - Line Height: 20.0px
   - Color: #625656

3. **"Sem Furos"**
   - Font: Inter 400
   - Line Height: 20.0px
   - Color: #FFF3F3

4. **"Sem Furos"**
   - Font: Inter 400
   - Line Height: 20.0px
   - Color: #FFF3F3

5. **"Home"**
   - Font: Inter 400
   - Line Height: 20.0px
   - Color: #F1EDED

6. **"Categorias"**
   - Font: Inter 400
   - Line Height: 20.0px
   - Color: #F1EDED

7. **"Mais procurados"**
   - Font: Inter 400
   - Line Height: 20.0px
   - Color: #F1EDED

8. **" Guia rápido"**
   - Font: Inter 400
   - Line Height: 20.0px
   - Color: #F1EDED

9. **"Ambientes"**
   - Font: Inter 400
   - Line Height: 20.0px
   - Color: #F1EDED

10. **"Serviço Curitiba"**
   - Font: Inter 400
   - Line Height: 20.0px
   - Color: #F1EDED

### CONTAINERS E ELEMENTOS GRÁFICOS (71)

#### Elementos com estilização especial (18)

1. **Frame 19** (FRAME)
   - Dimensões: 1440.0px × 110.0px
   - Background: #6C191D
   - Effect: DROP_SHADOW
     - Blur Radius: 4.0px
     - Color: #000000 (opacity: 25%)

2. **image 2** (RECTANGLE)
   - Dimensões: 50.0px × 50.0px
   - Border Radius: 118.5px

3. **Frame 56** (FRAME)
   - Dimensões: 336.0px × 40.0px
   - Background: #FFFFFF
   - Border: 1.0px solid #C8BEBF
   - Border Radius: 8.0px

4. **Frame 5** (INSTANCE)
   - Dimensões: 36.0px × 36.0px
   - Background: #FFFFFF
   - Border: 1.0px solid #6C191D
   - Border Radius: 59.0px

5. **Frame 4** (INSTANCE)
   - Dimensões: 36.0px × 36.0px
   - Background: #FFFFFF
   - Border: 1.0px solid #6C191D
   - Border Radius: 59.0px

6. **Frame 30** (INSTANCE)
   - Dimensões: 620.0px × 48.0px
   - Background: #6C191D
   - Border Radius: 8.0px

7. **Frame 3** (INSTANCE)
   - Dimensões: 620.0px × 48.0px
   - Background: #FFFFFF
   - Border: 1.0px solid #C8BEBF
   - Border Radius: 8.0px

8. **Frame 2174** (FRAME)
   - Dimensões: 388.0px × 84.0px
   - Border Radius: 16.0px

9. **Frame 2175** (FRAME)
   - Dimensões: 388.0px × 84.0px
   - Border Radius: 16.0px

10. **Frame 56** (FRAME)
   - Dimensões: 310.0px × 40.0px
   - Background: #FFFFFF
   - Border: 1.0px solid #C8BEBF
   - Border Radius: 8.0px

11. **Frame 30** (INSTANCE)
   - Dimensões: 62.0px × 36.0px
   - Border: 1.0px solid #6C191D
   - Border Radius: 8.0px

12. **Frame 36** (FRAME)
   - Dimensões: 184.0px × 184.0px
   - Border Radius: 16.0px

13. **Frame 46** (FRAME)
   - Dimensões: 184.0px × 184.0px
   - Border Radius: 16.0px

14. **Frame 47** (FRAME)
   - Dimensões: 184.0px × 184.0px
   - Background: #000000
   - Border Radius: 16.0px

15. **Frame 48** (FRAME)
   - Dimensões: 184.0px × 184.0px
   - Border Radius: 16.0px

16. **Frame 49** (FRAME)
   - Dimensões: 184.0px × 184.0px
   - Border Radius: 16.0px

17. **Frame 50** (FRAME)
   - Dimensões: 184.0px × 184.0px
   - Border Radius: 16.0px

18. **image 2** (RECTANGLE)
   - Dimensões: 62.0px × 62.0px
   - Border Radius: 118.5px

### IMAGENS (8)

1. **image 2**
   - Dimensões: 50.0px × 50.0px
   - Image Ref: ea32901c74b76e6ed7a1ada332c7cb3d17d44427
   - Scale Mode: STRETCH

2. **Frame 36**
   - Dimensões: 184.0px × 184.0px
   - Image Ref: 1c9774fac0f48ec78aacafedd659db87dd27fbb2
   - Scale Mode: FILL

3. **Frame 46**
   - Dimensões: 184.0px × 184.0px
   - Image Ref: 1c9774fac0f48ec78aacafedd659db87dd27fbb2
   - Scale Mode: FILL

4. **Frame 47**
   - Dimensões: 184.0px × 184.0px
   - Image Ref: 1c9774fac0f48ec78aacafedd659db87dd27fbb2
   - Scale Mode: FILL

5. **Frame 48**
   - Dimensões: 184.0px × 184.0px
   - Image Ref: 1c9774fac0f48ec78aacafedd659db87dd27fbb2
   - Scale Mode: FILL

6. **Frame 49**
   - Dimensões: 184.0px × 184.0px
   - Image Ref: 1c9774fac0f48ec78aacafedd659db87dd27fbb2
   - Scale Mode: FILL

7. **Frame 50**
   - Dimensões: 184.0px × 184.0px
   - Image Ref: 1c9774fac0f48ec78aacafedd659db87dd27fbb2
   - Scale Mode: FILL

8. **image 2**
   - Dimensões: 62.0px × 62.0px
   - Image Ref: ea32901c74b76e6ed7a1ada332c7cb3d17d44427
   - Scale Mode: STRETCH


---

## Desktop / Endereço (2)

### TEXTOS IDENTIFICADOS (47)

#### Tamanho: 18.0px (5 elementos)

1. **"Endereço de entrega"**
   - Font: Inter 400
   - Line Height: 28.0px
   - Color: #000000

2. **"Resumo"**
   - Font: Inter 400
   - Line Height: 28.0px
   - Color: #000000

3. **"Sobre nós"**
   - Font: Inter 500
   - Line Height: 28.0px
   - Color: #F1EDED

4. **"Nossos produtos"**
   - Font: Inter 500
   - Line Height: 28.0px
   - Color: #F1EDED

5. **"Links rápidos"**
   - Font: Inter 500
   - Line Height: 28.0px
   - Color: #F1EDED

#### Tamanho: 16.0px (11 elementos)

1. **"Buscar persianas, serviços, etc..."**
   - Font: Inter 400
   - Line Height: 24.0px
   - Color: #77696A

2. **"Casa"**
   - Font: Inter 400
   - Line Height: 24.0px
   - Color: #000000

3. **"Voltar"**
   - Font: Inter 400
   - Line Height: 24.0px
   - Color: #000000

4. **"Continuar"**
   - Font: Inter 400
   - Line Height: 24.0px
   - Color: #F1EDED

5. **"Valor a prazo"**
   - Font: Inter 400
   - Line Height: 24.0px
   - Color: #625656

6. **"R$ 350,19"**
   - Font: Inter 500
   - Line Height: 24.0px
   - Color: #000000

7. **"(em até 10X de R$ 159,43 sem juros)"**
   - Font: Inter 400
   - Line Height: 24.0px
   - Color: #625656

8. **"Valor à vista no PIX"**
   - Font: Inter 400
   - Line Height: 24.0px
   - Color: #196C2B

9. **"R$ 350,19"**
   - Font: Inter 500
   - Line Height: 24.0px
   - Color: #196C2B

10. **"(Economize: R$ 332,68) "**
   - Font: Inter 400
   - Line Height: 24.0px
   - Color: #196C2B

#### Tamanho: 14.0px (31 elementos)

1. **"Label text"**
   - Font: Inter 400
   - Line Height: 20.0px
   - Color: #000000

2. **"Supporting text"**
   - Font: Inter 400
   - Line Height: 20.0px
   - Color: #625656

3. **"Sem Furos"**
   - Font: Inter 400
   - Line Height: 20.0px
   - Color: #FFF3F3

4. **"Sem Furos"**
   - Font: Inter 400
   - Line Height: 20.0px
   - Color: #FFF3F3

5. **"Home"**
   - Font: Inter 400
   - Line Height: 20.0px
   - Color: #F1EDED

6. **"Categorias"**
   - Font: Inter 400
   - Line Height: 20.0px
   - Color: #F1EDED

7. **"Mais procurados"**
   - Font: Inter 400
   - Line Height: 20.0px
   - Color: #F1EDED

8. **" Guia rápido"**
   - Font: Inter 400
   - Line Height: 20.0px
   - Color: #F1EDED

9. **"Ambientes"**
   - Font: Inter 400
   - Line Height: 20.0px
   - Color: #F1EDED

10. **"Serviço Curitiba"**
   - Font: Inter 400
   - Line Height: 20.0px
   - Color: #F1EDED

### CONTAINERS E ELEMENTOS GRÁFICOS (81)

#### Elementos com estilização especial (20)

1. **Frame 19** (FRAME)
   - Dimensões: 1440.0px × 110.0px
   - Background: #6C191D
   - Effect: DROP_SHADOW
     - Blur Radius: 4.0px
     - Color: #000000 (opacity: 25%)

2. **image 2** (RECTANGLE)
   - Dimensões: 50.0px × 50.0px
   - Border Radius: 118.5px

3. **Frame 56** (FRAME)
   - Dimensões: 336.0px × 40.0px
   - Background: #FFFFFF
   - Border: 1.0px solid #C8BEBF
   - Border Radius: 8.0px

4. **Frame 5** (INSTANCE)
   - Dimensões: 36.0px × 36.0px
   - Background: #FFFFFF
   - Border: 1.0px solid #6C191D
   - Border Radius: 59.0px

5. **Frame 4** (INSTANCE)
   - Dimensões: 36.0px × 36.0px
   - Background: #FFFFFF
   - Border: 1.0px solid #6C191D
   - Border Radius: 59.0px

6. **Frame 56** (FRAME)
   - Dimensões: 620.0px × 68.0px
   - Background: #FFFFFF
   - Border: 1.0px solid #6C191D
   - Border Radius: 8.0px

7. **Frame 30** (INSTANCE)
   - Dimensões: 127.0px × 36.0px
   - Border Radius: 8.0px

8. **Frame 3** (INSTANCE)
   - Dimensões: 69.0px × 48.0px
   - Background: #FFFFFF
   - Border: 1.0px solid #C8BEBF
   - Border Radius: 8.0px

9. **Frame 30** (INSTANCE)
   - Dimensões: 98.0px × 48.0px
   - Background: #6C191D
   - Border Radius: 8.0px

10. **Frame 2174** (FRAME)
   - Dimensões: 388.0px × 84.0px
   - Border Radius: 16.0px

11. **Frame 2175** (FRAME)
   - Dimensões: 388.0px × 84.0px
   - Border Radius: 16.0px

12. **Frame 56** (FRAME)
   - Dimensões: 310.0px × 40.0px
   - Background: #FFFFFF
   - Border: 1.0px solid #C8BEBF
   - Border Radius: 8.0px

13. **Frame 30** (INSTANCE)
   - Dimensões: 62.0px × 36.0px
   - Border: 1.0px solid #6C191D
   - Border Radius: 8.0px

14. **Frame 36** (FRAME)
   - Dimensões: 184.0px × 184.0px
   - Border Radius: 16.0px

15. **Frame 46** (FRAME)
   - Dimensões: 184.0px × 184.0px
   - Border Radius: 16.0px

16. **Frame 47** (FRAME)
   - Dimensões: 184.0px × 184.0px
   - Background: #000000
   - Border Radius: 16.0px

17. **Frame 48** (FRAME)
   - Dimensões: 184.0px × 184.0px
   - Border Radius: 16.0px

18. **Frame 49** (FRAME)
   - Dimensões: 184.0px × 184.0px
   - Border Radius: 16.0px

19. **Frame 50** (FRAME)
   - Dimensões: 184.0px × 184.0px
   - Border Radius: 16.0px

20. **image 2** (RECTANGLE)
   - Dimensões: 62.0px × 62.0px
   - Border Radius: 118.5px

### IMAGENS (8)

1. **image 2**
   - Dimensões: 50.0px × 50.0px
   - Image Ref: ea32901c74b76e6ed7a1ada332c7cb3d17d44427
   - Scale Mode: STRETCH

2. **Frame 36**
   - Dimensões: 184.0px × 184.0px
   - Image Ref: 1c9774fac0f48ec78aacafedd659db87dd27fbb2
   - Scale Mode: FILL

3. **Frame 46**
   - Dimensões: 184.0px × 184.0px
   - Image Ref: 1c9774fac0f48ec78aacafedd659db87dd27fbb2
   - Scale Mode: FILL

4. **Frame 47**
   - Dimensões: 184.0px × 184.0px
   - Image Ref: 1c9774fac0f48ec78aacafedd659db87dd27fbb2
   - Scale Mode: FILL

5. **Frame 48**
   - Dimensões: 184.0px × 184.0px
   - Image Ref: 1c9774fac0f48ec78aacafedd659db87dd27fbb2
   - Scale Mode: FILL

6. **Frame 49**
   - Dimensões: 184.0px × 184.0px
   - Image Ref: 1c9774fac0f48ec78aacafedd659db87dd27fbb2
   - Scale Mode: FILL

7. **Frame 50**
   - Dimensões: 184.0px × 184.0px
   - Image Ref: 1c9774fac0f48ec78aacafedd659db87dd27fbb2
   - Scale Mode: FILL

8. **image 2**
   - Dimensões: 62.0px × 62.0px
   - Image Ref: ea32901c74b76e6ed7a1ada332c7cb3d17d44427
   - Scale Mode: STRETCH


---

## Desktop / Forma de pagamento

### TEXTOS IDENTIFICADOS (60)

#### Tamanho: 18.0px (9 elementos)

1. **"Escolha a forma de pagamento"**
   - Font: Inter 400
   - Line Height: 28.0px
   - Color: #000000

2. **"Seu pedido"**
   - Font: Inter 400
   - Line Height: 28.0px
   - Color: #000000

3. **"Total"**
   - Font: Inter 500
   - Line Height: 28.0px
   - Color: #000000

4. **"R$ 350,19"**
   - Font: Inter 500
   - Line Height: 28.0px
   - Color: #000000

5. **"R$ 350,19"**
   - Font: Inter 500
   - Line Height: 28.0px
   - Color: #000000

6. **"R$ 332,68"**
   - Font: Inter 500
   - Line Height: 28.0px
   - Color: #196C2B

7. **"Sobre nós"**
   - Font: Inter 500
   - Line Height: 28.0px
   - Color: #F1EDED

8. **"Nossos produtos"**
   - Font: Inter 500
   - Line Height: 28.0px
   - Color: #F1EDED

9. **"Links rápidos"**
   - Font: Inter 500
   - Line Height: 28.0px
   - Color: #F1EDED

#### Tamanho: 16.0px (12 elementos)

1. **"Buscar persianas, serviços, etc..."**
   - Font: Inter 400
   - Line Height: 24.0px
   - Color: #77696A

2. **"PIX"**
   - Font: Inter 400
   - Line Height: 24.0px
   - Color: #000000

3. **"Boleto"**
   - Font: Inter 400
   - Line Height: 24.0px
   - Color: #000000

4. **"Cartão de crédito"**
   - Font: Inter 400
   - Line Height: 24.0px
   - Color: #000000

5. **"Subtotal"**
   - Font: Inter 500
   - Line Height: 24.0px
   - Color: #000000

6. **"R$ 350,19"**
   - Font: Inter 500
   - Line Height: 24.0px
   - Color: #000000

7. **"Valor a prazo"**
   - Font: Inter 400
   - Line Height: 24.0px
   - Color: #625656

8. **"(em até 6X de R$ 159,43 sem juros)"**
   - Font: Inter 400
   - Line Height: 24.0px
   - Color: #625656

9. **"Valor à vista no PIX"**
   - Font: Inter 400
   - Line Height: 24.0px
   - Color: #196C2B

10. **"(Economize: R$ 17,50)"**
   - Font: Inter 400
   - Line Height: 24.0px
   - Color: #196C2B

#### Tamanho: 14.0px (26 elementos)

1. **"Label text"**
   - Font: Inter 400
   - Line Height: 20.0px
   - Color: #000000

2. **"Supporting text"**
   - Font: Inter 400
   - Line Height: 20.0px
   - Color: #625656

3. **"Sem Furos"**
   - Font: Inter 400
   - Line Height: 20.0px
   - Color: #FFF3F3

4. **"Sem Furos"**
   - Font: Inter 400
   - Line Height: 20.0px
   - Color: #FFF3F3

5. **"Home"**
   - Font: Inter 400
   - Line Height: 20.0px
   - Color: #F1EDED

6. **"Categorias"**
   - Font: Inter 400
   - Line Height: 20.0px
   - Color: #F1EDED

7. **"Mais procurados"**
   - Font: Inter 400
   - Line Height: 20.0px
   - Color: #F1EDED

8. **" Guia rápido"**
   - Font: Inter 400
   - Line Height: 20.0px
   - Color: #F1EDED

9. **"Ambientes"**
   - Font: Inter 400
   - Line Height: 20.0px
   - Color: #F1EDED

10. **"Serviço Curitiba"**
   - Font: Inter 400
   - Line Height: 20.0px
   - Color: #F1EDED

#### Tamanho: 12.0px (13 elementos)

1. **"Voltar"**
   - Font: Inter 400
   - Line Height: 16.0px
   - Color: #6C191D

2. **"Carrinho"**
   - Font: Inter 400
   - Line Height: 16.0px
   - Color: #6C191D

3. **"Chekout"**
   - Font: Inter 400
   - Line Height: 16.0px
   - Color: #6C191D

4. **"Endereço"**
   - Font: Inter 400
   - Line Height: 16.0px
   - Color: #6C191D

5. **"Forma de pagamento"**
   - Font: Inter 400
   - Line Height: 16.0px
   - Color: #6C191D

6. **"Produtos"**
   - Font: Inter 400
   - Line Height: 16.0px
   - Color: #625656

7. **"R$ 350,19"**
   - Font: Inter 400
   - Line Height: 16.0px
   - Color: #000000

8. **"Entrega"**
   - Font: Inter 400
   - Line Height: 16.0px
   - Color: #625656

9. **"R$ 80"**
   - Font: Inter 400
   - Line Height: 16.0px
   - Color: #000000

10. **"Serviço de Montagem"**
   - Font: Inter 400
   - Line Height: 16.0px
   - Color: #625656

### CONTAINERS E ELEMENTOS GRÁFICOS (93)

#### Elementos com estilização especial (19)

1. **Frame 19** (FRAME)
   - Dimensões: 1440.0px × 110.0px
   - Background: #6C191D
   - Effect: DROP_SHADOW
     - Blur Radius: 4.0px
     - Color: #000000 (opacity: 25%)

2. **image 2** (RECTANGLE)
   - Dimensões: 50.0px × 50.0px
   - Border Radius: 118.5px

3. **Frame 56** (FRAME)
   - Dimensões: 336.0px × 40.0px
   - Background: #FFFFFF
   - Border: 1.0px solid #C8BEBF
   - Border Radius: 8.0px

4. **Frame 5** (INSTANCE)
   - Dimensões: 36.0px × 36.0px
   - Background: #FFFFFF
   - Border: 1.0px solid #6C191D
   - Border Radius: 59.0px

5. **Frame 4** (INSTANCE)
   - Dimensões: 36.0px × 36.0px
   - Background: #FFFFFF
   - Border: 1.0px solid #6C191D
   - Border Radius: 59.0px

6. **Frame 56** (FRAME)
   - Dimensões: 612.0px × 56.0px
   - Background: #FFFFFF
   - Border: 1.0px solid #C8BEBF
   - Border Radius: 8.0px

7. **Frame 2177** (FRAME)
   - Dimensões: 612.0px × 56.0px
   - Background: #FFFFFF
   - Border: 1.0px solid #C8BEBF
   - Border Radius: 8.0px

8. **Frame 2178** (FRAME)
   - Dimensões: 612.0px × 56.0px
   - Background: #FFFFFF
   - Border: 1.0px solid #C8BEBF
   - Border Radius: 8.0px

9. **Frame 2174** (FRAME)
   - Dimensões: 380.0px × 88.0px
   - Background: #F1EDED
   - Border Radius: 16.0px

10. **Frame 2175** (FRAME)
   - Dimensões: 380.0px × 88.0px
   - Background: #F3FFF5
   - Border Radius: 16.0px

11. **Frame 30** (INSTANCE)
   - Dimensões: 380.0px × 48.0px
   - Background: #C8BEBF
   - Border Radius: 8.0px

12. **Frame 3** (INSTANCE)
   - Dimensões: 380.0px × 48.0px
   - Background: #FFFFFF
   - Border: 1.0px solid #C8BEBF
   - Border Radius: 8.0px

13. **Frame 36** (FRAME)
   - Dimensões: 184.0px × 184.0px
   - Border Radius: 16.0px

14. **Frame 46** (FRAME)
   - Dimensões: 184.0px × 184.0px
   - Border Radius: 16.0px

15. **Frame 47** (FRAME)
   - Dimensões: 184.0px × 184.0px
   - Background: #000000
   - Border Radius: 16.0px

16. **Frame 48** (FRAME)
   - Dimensões: 184.0px × 184.0px
   - Border Radius: 16.0px

17. **Frame 49** (FRAME)
   - Dimensões: 184.0px × 184.0px
   - Border Radius: 16.0px

18. **Frame 50** (FRAME)
   - Dimensões: 184.0px × 184.0px
   - Border Radius: 16.0px

19. **image 2** (RECTANGLE)
   - Dimensões: 62.0px × 62.0px
   - Border Radius: 118.5px

### IMAGENS (8)

1. **image 2**
   - Dimensões: 50.0px × 50.0px
   - Image Ref: ea32901c74b76e6ed7a1ada332c7cb3d17d44427
   - Scale Mode: STRETCH

2. **Frame 36**
   - Dimensões: 184.0px × 184.0px
   - Image Ref: 1c9774fac0f48ec78aacafedd659db87dd27fbb2
   - Scale Mode: FILL

3. **Frame 46**
   - Dimensões: 184.0px × 184.0px
   - Image Ref: 1c9774fac0f48ec78aacafedd659db87dd27fbb2
   - Scale Mode: FILL

4. **Frame 47**
   - Dimensões: 184.0px × 184.0px
   - Image Ref: 1c9774fac0f48ec78aacafedd659db87dd27fbb2
   - Scale Mode: FILL

5. **Frame 48**
   - Dimensões: 184.0px × 184.0px
   - Image Ref: 1c9774fac0f48ec78aacafedd659db87dd27fbb2
   - Scale Mode: FILL

6. **Frame 49**
   - Dimensões: 184.0px × 184.0px
   - Image Ref: 1c9774fac0f48ec78aacafedd659db87dd27fbb2
   - Scale Mode: FILL

7. **Frame 50**
   - Dimensões: 184.0px × 184.0px
   - Image Ref: 1c9774fac0f48ec78aacafedd659db87dd27fbb2
   - Scale Mode: FILL

8. **image 2**
   - Dimensões: 62.0px × 62.0px
   - Image Ref: ea32901c74b76e6ed7a1ada332c7cb3d17d44427
   - Scale Mode: STRETCH


---

## Desktop / Informações do Pedido

### TEXTOS IDENTIFICADOS (74)

#### Tamanho: 18.0px (7 elementos)

1. **"Informações do Pedido"**
   - Font: Inter 400
   - Line Height: 28.0px
   - Color: #000000

2. **"Detalhes da compra"**
   - Font: Inter 400
   - Line Height: 28.0px
   - Color: #000000

3. **"Total"**
   - Font: Inter 500
   - Line Height: 28.0px
   - Color: #000000

4. **"R$ 350,19"**
   - Font: Inter 500
   - Line Height: 28.0px
   - Color: #000000

5. **"Sobre nós"**
   - Font: Inter 500
   - Line Height: 28.0px
   - Color: #F1EDED

6. **"Nossos produtos"**
   - Font: Inter 500
   - Line Height: 28.0px
   - Color: #F1EDED

7. **"Links rápidos"**
   - Font: Inter 500
   - Line Height: 28.0px
   - Color: #F1EDED

#### Tamanho: 16.0px (10 elementos)

1. **"Buscar persianas, serviços, etc..."**
   - Font: Inter 400
   - Line Height: 24.0px
   - Color: #77696A

2. **"Persiana Blackout Kitbox - Preto"**
   - Font: Inter 400
   - Line Height: 24.0px
   - Color: #000000

3. **"R$ 350,19"**
   - Font: Inter 500
   - Line Height: 24.0px
   - Color: #000000

4. **"Persiana Blackout Kitbox - Preto"**
   - Font: Inter 400
   - Line Height: 24.0px
   - Color: #000000

5. **"R$ 350,19"**
   - Font: Inter 500
   - Line Height: 24.0px
   - Color: #000000

6. **"Pedido entregue no dia 10 de março"**
   - Font: Inter 400
   - Line Height: 24.0px
   - Color: #000000

7. **"Forma de pagamento"**
   - Font: Inter 400
   - Line Height: 24.0px
   - Color: #000000

8. **"PIX"**
   - Font: Inter 400
   - Line Height: 24.0px
   - Color: #000000

9. **"Subtotal"**
   - Font: Inter 500
   - Line Height: 24.0px
   - Color: #000000

10. **"R$ 350,19"**
   - Font: Inter 500
   - Line Height: 24.0px
   - Color: #000000

#### Tamanho: 14.0px (40 elementos)

1. **"Label text"**
   - Font: Inter 400
   - Line Height: 20.0px
   - Color: #000000

2. **"Supporting text"**
   - Font: Inter 400
   - Line Height: 20.0px
   - Color: #625656

3. **"Sem Furos"**
   - Font: Inter 400
   - Line Height: 20.0px
   - Color: #FFF3F3

4. **"Sem Furos"**
   - Font: Inter 400
   - Line Height: 20.0px
   - Color: #FFF3F3

5. **"Home"**
   - Font: Inter 400
   - Line Height: 20.0px
   - Color: #F1EDED

6. **"Categorias"**
   - Font: Inter 400
   - Line Height: 20.0px
   - Color: #F1EDED

7. **"Mais procurados"**
   - Font: Inter 400
   - Line Height: 20.0px
   - Color: #F1EDED

8. **" Guia rápido"**
   - Font: Inter 400
   - Line Height: 20.0px
   - Color: #F1EDED

9. **"Ambientes"**
   - Font: Inter 400
   - Line Height: 20.0px
   - Color: #F1EDED

10. **"Serviço Curitiba"**
   - Font: Inter 400
   - Line Height: 20.0px
   - Color: #F1EDED

#### Tamanho: 12.0px (17 elementos)

1. **"Entregue"**
   - Font: Inter 400
   - Line Height: 16.0px
   - Color: #D7FFE0

2. **"Cor: "**
   - Font: Inter 400
   - Line Height: 16.0px
   - Color: #625656

3. **"Tamanho:"**
   - Font: Inter 400
   - Line Height: 16.0px
   - Color: #625656

4. **"Lado da cordinha:"**
   - Font: Inter 400
   - Line Height: 16.0px
   - Color: #625656

5. **"Entregue"**
   - Font: Inter 400
   - Line Height: 16.0px
   - Color: #D7FFE0

6. **"Cor: "**
   - Font: Inter 400
   - Line Height: 16.0px
   - Color: #625656

7. **"Tamanho:"**
   - Font: Inter 400
   - Line Height: 16.0px
   - Color: #625656

8. **"Lado da cordinha:"**
   - Font: Inter 400
   - Line Height: 16.0px
   - Color: #625656

9. **"Endereço da entrega:"**
   - Font: Inter 400
   - Line Height: 16.0px
   - Color: #625656

10. **"Produtos"**
   - Font: Inter 400
   - Line Height: 16.0px
   - Color: #625656

### CONTAINERS E ELEMENTOS GRÁFICOS (100)

#### Elementos com estilização especial (25)

1. **Frame 19** (FRAME)
   - Dimensões: 1440.0px × 110.0px
   - Background: #6C191D
   - Effect: DROP_SHADOW
     - Blur Radius: 4.0px
     - Color: #000000 (opacity: 25%)

2. **image 2** (RECTANGLE)
   - Dimensões: 50.0px × 50.0px
   - Border Radius: 118.5px

3. **Frame 56** (FRAME)
   - Dimensões: 336.0px × 40.0px
   - Background: #FFFFFF
   - Border: 1.0px solid #C8BEBF
   - Border Radius: 8.0px

4. **Frame 5** (INSTANCE)
   - Dimensões: 36.0px × 36.0px
   - Background: #FFFFFF
   - Border: 1.0px solid #6C191D
   - Border Radius: 59.0px

5. **Frame 4** (INSTANCE)
   - Dimensões: 36.0px × 36.0px
   - Background: #FFFFFF
   - Border: 1.0px solid #6C191D
   - Border Radius: 59.0px

6. **Frame 31** (INSTANCE)
   - Dimensões: 143.0px × 28.0px
   - Background: #6C191D
   - Border Radius: 8.0px

7. **Frame 32** (INSTANCE)
   - Dimensões: 108.0px × 28.0px
   - Border: 1.0px solid #6C191D
   - Border Radius: 8.0px

8. **Frame 33** (INSTANCE)
   - Dimensões: 134.0px × 28.0px
   - Border Radius: 8.0px

9. **Frame 35** (FRAME)
   - Dimensões: 688.0px × 192.0px
   - Background: #FFFFFF
   - Border: 1.0px solid #C8BEBF
   - Border Radius: 16.0px

10. **Frame 10** (FRAME)
   - Dimensões: 124.0px × 160.0px
   - Background: #F1EDED
   - Border Radius: 8.0px
   - Effect: DROP_SHADOW
     - Blur Radius: 24.0px
     - Color: #000000 (opacity: 12%)

11. **gray-curtains-white-wall-modern-style 1** (RECTANGLE)
   - Dimensões: 108.0px × 144.0px
   - Border Radius: 6.0px

12. **Frame 27** (FRAME)
   - Dimensões: 68.0px × 24.0px
   - Background: #2B8E41
   - Border Radius: 29.0px

13. **Frame 38** (FRAME)
   - Dimensões: 688.0px × 192.0px
   - Background: #FFFFFF
   - Border: 1.0px solid #C8BEBF
   - Border Radius: 16.0px

14. **Frame 10** (FRAME)
   - Dimensões: 124.0px × 160.0px
   - Background: #F1EDED
   - Border Radius: 8.0px
   - Effect: DROP_SHADOW
     - Blur Radius: 24.0px
     - Color: #000000 (opacity: 12%)

15. **gray-curtains-white-wall-modern-style 1** (RECTANGLE)
   - Dimensões: 108.0px × 144.0px
   - Border Radius: 6.0px

16. **Frame 27** (FRAME)
   - Dimensões: 68.0px × 24.0px
   - Background: #2B8E41
   - Border Radius: 29.0px

17. **Frame 36** (FRAME)
   - Dimensões: 688.0px × 80.0px
   - Background: #FFFFFF
   - Border: 1.0px solid #C8BEBF
   - Border Radius: 16.0px

18. **Frame 37** (FRAME)
   - Dimensões: 688.0px × 56.0px
   - Background: #FFFFFF
   - Border: 1.0px solid #C8BEBF
   - Border Radius: 16.0px

19. **Frame 36** (FRAME)
   - Dimensões: 184.0px × 184.0px
   - Border Radius: 16.0px

20. **Frame 46** (FRAME)
   - Dimensões: 184.0px × 184.0px
   - Border Radius: 16.0px

### IMAGENS (10)

1. **image 2**
   - Dimensões: 50.0px × 50.0px
   - Image Ref: ea32901c74b76e6ed7a1ada332c7cb3d17d44427
   - Scale Mode: STRETCH

2. **gray-curtains-white-wall-modern-style 1**
   - Dimensões: 108.0px × 144.0px
   - Image Ref: 1c9774fac0f48ec78aacafedd659db87dd27fbb2
   - Scale Mode: FILL

3. **gray-curtains-white-wall-modern-style 1**
   - Dimensões: 108.0px × 144.0px
   - Image Ref: 1c9774fac0f48ec78aacafedd659db87dd27fbb2
   - Scale Mode: FILL

4. **Frame 36**
   - Dimensões: 184.0px × 184.0px
   - Image Ref: 1c9774fac0f48ec78aacafedd659db87dd27fbb2
   - Scale Mode: FILL

5. **Frame 46**
   - Dimensões: 184.0px × 184.0px
   - Image Ref: 1c9774fac0f48ec78aacafedd659db87dd27fbb2
   - Scale Mode: FILL

6. **Frame 47**
   - Dimensões: 184.0px × 184.0px
   - Image Ref: 1c9774fac0f48ec78aacafedd659db87dd27fbb2
   - Scale Mode: FILL

7. **Frame 48**
   - Dimensões: 184.0px × 184.0px
   - Image Ref: 1c9774fac0f48ec78aacafedd659db87dd27fbb2
   - Scale Mode: FILL

8. **Frame 49**
   - Dimensões: 184.0px × 184.0px
   - Image Ref: 1c9774fac0f48ec78aacafedd659db87dd27fbb2
   - Scale Mode: FILL

9. **Frame 50**
   - Dimensões: 184.0px × 184.0px
   - Image Ref: 1c9774fac0f48ec78aacafedd659db87dd27fbb2
   - Scale Mode: FILL

10. **image 2**
   - Dimensões: 62.0px × 62.0px
   - Image Ref: ea32901c74b76e6ed7a1ada332c7cb3d17d44427
   - Scale Mode: STRETCH


---

## Desktop / Pagamento aprovado!

### TEXTOS IDENTIFICADOS (28)

#### Tamanho: 18.0px (4 elementos)

1. **"Pagamento aprovado!"**
   - Font: Inter 400
   - Line Height: 28.0px
   - Color: #000000

2. **"Sobre nós"**
   - Font: Inter 500
   - Line Height: 28.0px
   - Color: #F1EDED

3. **"Nossos produtos"**
   - Font: Inter 500
   - Line Height: 28.0px
   - Color: #F1EDED

4. **"Links rápidos"**
   - Font: Inter 500
   - Line Height: 28.0px
   - Color: #F1EDED

#### Tamanho: 16.0px (2 elementos)

1. **"Buscar persianas, serviços, etc..."**
   - Font: Inter 400
   - Line Height: 24.0px
   - Color: #77696A

2. **"Acompanhar pedido"**
   - Font: Inter 400
   - Line Height: 24.0px
   - Color: #F1EDED

#### Tamanho: 14.0px (22 elementos)

1. **"Label text"**
   - Font: Inter 400
   - Line Height: 20.0px
   - Color: #000000

2. **"Supporting text"**
   - Font: Inter 400
   - Line Height: 20.0px
   - Color: #625656

3. **"Sem Furos"**
   - Font: Inter 400
   - Line Height: 20.0px
   - Color: #FFF3F3

4. **"Sem Furos"**
   - Font: Inter 400
   - Line Height: 20.0px
   - Color: #FFF3F3

5. **"Home"**
   - Font: Inter 400
   - Line Height: 20.0px
   - Color: #F1EDED

6. **"Categorias"**
   - Font: Inter 400
   - Line Height: 20.0px
   - Color: #F1EDED

7. **"Mais procurados"**
   - Font: Inter 400
   - Line Height: 20.0px
   - Color: #F1EDED

8. **" Guia rápido"**
   - Font: Inter 400
   - Line Height: 20.0px
   - Color: #F1EDED

9. **"Ambientes"**
   - Font: Inter 400
   - Line Height: 20.0px
   - Color: #F1EDED

10. **"Serviço Curitiba"**
   - Font: Inter 400
   - Line Height: 20.0px
   - Color: #F1EDED

### CONTAINERS E ELEMENTOS GRÁFICOS (47)

#### Elementos com estilização especial (13)

1. **Frame 19** (FRAME)
   - Dimensões: 1440.0px × 110.0px
   - Background: #6C191D
   - Effect: DROP_SHADOW
     - Blur Radius: 4.0px
     - Color: #000000 (opacity: 25%)

2. **image 2** (RECTANGLE)
   - Dimensões: 50.0px × 50.0px
   - Border Radius: 118.5px

3. **Frame 56** (FRAME)
   - Dimensões: 336.0px × 40.0px
   - Background: #FFFFFF
   - Border: 1.0px solid #C8BEBF
   - Border Radius: 8.0px

4. **Frame 5** (INSTANCE)
   - Dimensões: 36.0px × 36.0px
   - Background: #FFFFFF
   - Border: 1.0px solid #6C191D
   - Border Radius: 59.0px

5. **Frame 4** (INSTANCE)
   - Dimensões: 36.0px × 36.0px
   - Background: #FFFFFF
   - Border: 1.0px solid #6C191D
   - Border Radius: 59.0px

6. **Frame 30** (INSTANCE)
   - Dimensões: 392.0px × 48.0px
   - Background: #6C191D
   - Border Radius: 8.0px

7. **Frame 36** (FRAME)
   - Dimensões: 184.0px × 184.0px
   - Border Radius: 16.0px

8. **Frame 46** (FRAME)
   - Dimensões: 184.0px × 184.0px
   - Border Radius: 16.0px

9. **Frame 47** (FRAME)
   - Dimensões: 184.0px × 184.0px
   - Background: #000000
   - Border Radius: 16.0px

10. **Frame 48** (FRAME)
   - Dimensões: 184.0px × 184.0px
   - Border Radius: 16.0px

11. **Frame 49** (FRAME)
   - Dimensões: 184.0px × 184.0px
   - Border Radius: 16.0px

12. **Frame 50** (FRAME)
   - Dimensões: 184.0px × 184.0px
   - Border Radius: 16.0px

13. **image 2** (RECTANGLE)
   - Dimensões: 62.0px × 62.0px
   - Border Radius: 118.5px

### IMAGENS (8)

1. **image 2**
   - Dimensões: 50.0px × 50.0px
   - Image Ref: ea32901c74b76e6ed7a1ada332c7cb3d17d44427
   - Scale Mode: STRETCH

2. **Frame 36**
   - Dimensões: 184.0px × 184.0px
   - Image Ref: 1c9774fac0f48ec78aacafedd659db87dd27fbb2
   - Scale Mode: FILL

3. **Frame 46**
   - Dimensões: 184.0px × 184.0px
   - Image Ref: 1c9774fac0f48ec78aacafedd659db87dd27fbb2
   - Scale Mode: FILL

4. **Frame 47**
   - Dimensões: 184.0px × 184.0px
   - Image Ref: 1c9774fac0f48ec78aacafedd659db87dd27fbb2
   - Scale Mode: FILL

5. **Frame 48**
   - Dimensões: 184.0px × 184.0px
   - Image Ref: 1c9774fac0f48ec78aacafedd659db87dd27fbb2
   - Scale Mode: FILL

6. **Frame 49**
   - Dimensões: 184.0px × 184.0px
   - Image Ref: 1c9774fac0f48ec78aacafedd659db87dd27fbb2
   - Scale Mode: FILL

7. **Frame 50**
   - Dimensões: 184.0px × 184.0px
   - Image Ref: 1c9774fac0f48ec78aacafedd659db87dd27fbb2
   - Scale Mode: FILL

8. **image 2**
   - Dimensões: 62.0px × 62.0px
   - Image Ref: ea32901c74b76e6ed7a1ada332c7cb3d17d44427
   - Scale Mode: STRETCH


---
