# Relatório Completo de Design - Desktop / Page Item
## Página de Detalhes do Produto (PDP) - Rosa Chic Persinas

**Fonte:** Figma File Key: ZpEDBAOT8ImPyplkSUILxo
**Página:** Desktop / Page Item (Node ID: 95:1350)
**Data de Extração:** 2025-10-09

---

## 1. DIMENSÕES GERAIS

### Container Principal
- **Dimensão total da tela:** 1440px × 2767.55px
- **Container de conteúdo:** 1224px (max-width)
- **Margens laterais:** 108px em cada lado (para centralizar o container de 1224px na tela de 1440px)

### Estrutura Geral
A página é dividida em 3 seções principais verticais:
1. **Header:** 1440px × 110px
2. **Main Content:** 1440px × 2053.55px
3. **Footer:** 1440px × 604px

---

## 2. ESTRUTURA DE SEÇÕES (de cima para baixo)

### SEÇÃO 1: HEADER (Frame 19)
- **Dimensões:** 1440px × 110px
- **Background:** `#6c191d` - rgb(108, 25, 29) - [VINHO/MARSALA - COR PRIMÁRIA]
- **Layout:** Vertical, Gap: 8px
- **Padding:** Centraliza conteúdo de 1224px

#### Subseções do Header:

**1.1 Barra Superior (Frame 55)** - 1224px × 50px
- Layout: Horizontal
- Gap: 1006px (espaço flexível entre logo e ações)
- Contém:
  - Logo (50px × 50px, border-radius: 118.5px - circular)
  - Campo de busca (336px × 40px)
  - Ícones de ação (Carrinho + Perfil, 36px cada)

**1.2 Menu de Navegação (Frame 12)** - 621px × 20px
- Layout: Horizontal
- Gap: 16px entre itens
- Itens: "Home", "Categorias", "Mais procurados", "Guia rápido", "Ambientes", "Serviço Curitiba", "Outros"
- Fonte: Inter 14px weight 400
- Cor do texto: `#f1eded` - rgb(241, 237, 237)

---

### SEÇÃO 2: MAIN CONTENT (Frame 15)
- **Dimensões:** 1440px × 2053.55px
- **Background:** `#ffffff` (branco)
- **Layout:** Vertical, Gap: 24px
- **Padding lateral:** 108px (centraliza 1224px)

#### 2.1 BREADCRUMB (Frame 2088)
- **Dimensões:** 1224px × 21px
- **Layout:** Horizontal, Gap: 24px
- **Itens:** Voltar | Kitbox > Persianas Kitbox > Persiana
- **Fonte:** Inter 14px weight 400
- **Cor:** `#6c191d` rgb(108, 25, 29)
- **Separadores:** Line vertical (0px × 21px) e ícones de seta (16px)

#### 2.2 SEÇÃO DE DETALHES DO PRODUTO (Frame 2089)
- **Dimensões:** 1224px × 824.55px
- **Layout:** Horizontal, Gap: 24px
- **Estrutura:** 2 colunas

##### COLUNA ESQUERDA: GALERIA DE IMAGENS (Frame 2121) - 808px × 736px

**Thumbnails Verticais (Frame 7)** - 116px × 736px
- Layout: Vertical
- Gap: 8px
- 6 thumbnails visíveis
- Cada thumbnail: 116px × 116px
- Background: `#f1eded` rgb(241, 237, 237)
- Border-radius: 12px
- Último thumbnail mostra "+4" indicando mais imagens

**Thumbnail Individual:**
- Container: 116px × 116px
- Padding interno: para acomodar label "Cortinas" e imagem
- Label: Inter 14px weight 400, cor `#fff3f3`
- Imagem interna: 92px × 92px
- Border-radius da imagem: 6px

**Imagem Principal (Frame 10)** - 676px × 736px
- Background: `#f1eded` rgb(241, 237, 237)
- Border-radius: 12px
- Gap: 8px
- Label "Cortinas" no topo (mesmo estilo dos thumbnails)
- Imagem principal: 644px × 704px
- Border-radius da imagem: 6px

##### COLUNA DIREITA: INFORMAÇÕES DO PRODUTO (Frame 21) - 392px × 825px

**2.2.1 Informações Principais (Frame 29) - 368px × 705px**

*Título e Código (Frame 34) - 368px × 142px*
- Layout: Vertical, Gap: 4px
- **Título:** "Persiana Blackout Kitbox - Preto"
  - Font: Cormorant Garamond 40px weight 700
  - Color: `#000000` (preto)
  - Height: 80px (2 linhas)
- **Rating:** Estrelas (54px × 18px)
  - Layout: Horizontal, Gap: 1px
  - Background: `#ffffff`

*Preço (Frame 2090) - 368px × 88px*
- Layout: Vertical, Gap: 4px
- **Preço principal:** "R$ 350,19"
  - Font: Inter 32px weight 500
  - Color: `#000000`
  - Height: 40px
- **Parcelamento:** "Ou R$ 360 em 6X R$ sem juros"
  - Font: Inter 14px weight 400
  - Color: `#000000`
  - Height: 20px
- **Link:** "Ver formas de pagamentos"
  - Font: Inter 14px weight 400
  - Color: `#2b588e` rgb(43, 88, 142) [AZUL - LINKS]
  - Height: 20px

*Separador (Line 8)* - 368px × 0px (linha horizontal)

*Seção de Medidas/Especificações (Frame 2091) - 368px × 83px*
- Layout: Vertical, Gap: 8px
- Contém informações sobre disponibilidade/estoque
- Font: Inter 14px weight 400

*Separador (Line 6)* - 368px × 0px

*Seletores de Produto (Frame 2092) - 368px × 212px*

**SELETOR DE TAMANHO**
- **Label:** "Tamanho: (0,0m x 0,0m)"
  - "Tamanho:" → Inter 16px weight 500, color `#625656` rgb(98, 86, 86)
  - "(0,0m x 0,0m)" → Inter 16px weight 500, color `#000000`
- **Link de ajuda:** "Precisa de ajuda para medir? [Veja nosso guia completo]"
  - Font: Inter 14px weight 400
  - Color: `#2b588e` (azul)

**DROPDOWN DE ALTURA (Frame 2114) - 368px × 64px**
- Layout: Vertical, Gap: 4px
- **Label:** "Selecione a Altura:"
  - Font: Inter 14px weight 400
  - Color: `#000000`
- **Campo (Frame 56):** 368px × 40px
  - Layout: Horizontal, Gap: 10px
  - Padding: 16px (left/right), 8px (top/bottom)
  - Background: `#ffffff`
  - Border: 1px solid `#c8bebf` rgb(200, 190, 191)
  - Border-radius: 8px
  - Ícone: icon/ReguaVertical (16px × 16px)
  - Placeholder: "Escolha o tamanho"
    - Font: Inter 16px weight 400
    - Color: `#77696a` rgb(119, 105, 106)
  - Dropdown icon: 16px × 16px
- **Supporting text:** "Precisa de ajuda para medir?"
  - Font: Inter 14px weight 400
  - Color: `#2b588e` (azul)

**DROPDOWN DE LARGURA (Frame 2086) - 368px × 64px**
- Layout: Vertical, Gap: 4px
- **Label:** "Selecione a Lagura:" [typo no Figma]
  - Font: Inter 14px weight 400
  - Color: `#000000`
- **Campo (Frame 56):** 368px × 40px
  - Layout: Horizontal, Gap: 10px
  - Padding: 16px (left/right), 8px (top/bottom)
  - Background: `#ffffff`
  - Border: 1px solid `#c8bebf` rgb(200, 190, 191)
  - Border-radius: 8px
  - Ícone: icon/RéguaHorizontal (16px × 16px)
  - Placeholder: "Escolha o tamanho"
    - Font: Inter 16px weight 400
    - Color: `#77696a` rgb(119, 105, 106)
  - Dropdown icon: 16px × 16px
- **Supporting text:** "Precisa de ajuda para medir?"
  - Font: Inter 14px weight 400
  - Color: `#2b588e` (azul)

*Seletor de Lado da Cordinha (Frame 2093) - 368px × 68px*

**Label Section:**
- "Lado da cordinha:" → Inter 16px weight 400, color `#625656`
- "Escolha" → Inter 16px weight 500, color `#000000`

**Botões de Seleção (Frame 2123) - 368px × 36px**
- Layout: Horizontal, Gap: 8px
- 2 botões lado a lado

**Botão Esquerdo/Direito (Frame 3) - 180px × 36px cada**
- Layout: Horizontal, Gap: 8px
- Padding: 8px (todos os lados)
- Background: `#ffffff`
- Border: 1px solid `#c8bebf` rgb(200, 190, 191)
- Border-radius: 8px
- Ícone: 20px × 20px
- Texto: Inter 14px weight 400, color `#000000`
- Conteúdo: Ícone + "Esquerdo"/"Direito" + Ícone

*Separador (Line 9)* - 368px × 0px

**2.2.2 Botões de Ação (Frame 2114) - 368px × 104px**
- Layout: Vertical, Gap: 8px

**BOTÃO "COMPRAR AGORA" (Frame 30) - 368px × 48px**
- Layout: Horizontal, Gap: 8px, Align: CENTER
- Padding: 12px (todos os lados)
- Background: `#42b05a` rgb(66, 176, 90) [VERDE - CTA PRIMÁRIO]
- Border-radius: 8px
- Ícone esquerdo: icon/diagonal (24px × 24px, cor `#ffffff`)
- Texto: "Comprar agora"
  - Font: Inter 16px weight 400
  - Color: `#ffffff`
- Ícone direito: icon/diagonal (24px × 24px, cor `#6c191d`)

**BOTÃO "ADICIONAR AO CARRINHO" (Frame 3) - 368px × 48px**
- Layout: Horizontal, Gap: 8px, Align: CENTER
- Padding: 12px (todos os lados)
- Background: `#ffffff` (transparente)
- Border: 1px solid `#42b05a` rgb(66, 176, 90)
- Border-radius: 8px
- Ícone esquerdo: icon/AddCart (24px × 24px)
- Texto: "Adicionar ao carrinho"
  - Font: Inter 16px weight 400
  - Color: `#196c2b` rgb(25, 108, 43) [VERDE ESCURO]
- Ícone direito: icon/AddCart (24px × 24px)

---

#### 2.3 SEPARADOR
- Line 6 - 1224px × 0px (linha horizontal)

---

#### 2.4 BLOCOS DE INFORMAÇÃO (Frame 2135) - 1224px × 80px
- **Layout:** Horizontal, Gap: 16px, Align: CENTER
- **Background:** `#f1eded` rgb(241, 237, 237)
- **Border-radius:** 12px
- **Estrutura:** 3 blocos + 2 separadores verticais

**Bloco Individual (Frame 2133) - 386.67px × 80px**
- Layout: Horizontal, Gap: 10px, Align: CENTER
- Padding: 16px (todos os lados)
- Border-radius: 16px
- Estrutura: Ícone (32px × 32px) + Texto (2 linhas)

**Separador Vertical (Line 10/11)**
- Dimensões: 0px × 47px
- Cor: linha divisória sutil

**Conteúdo dos Blocos:**
1. **Frete** - ícone + informações de entrega
2. **Garantia** - ícone + informações de garantia
3. **Devolução** - ícone + política de devolução

Tipografia dos blocos:
- Título: Inter 18px weight 500 (ou similar)
- Descrição: Inter 14px weight 400, color `#625656`

---

#### 2.5 SEÇÃO DE TABS/ABAS (Frame 2130) - 1224px × 852px
- **Layout:** Horizontal (container), Gap: 24px
- **Border:** 1px solid `#c8bebf` rgb(200, 190, 191)
- **Border-radius:** 16px

**Tab Bar (Frame 2125) - 1224px × 60px**
- Layout: Horizontal
- Border-bottom: 1px solid `#c8bebf`
- 3 tabs com largura igual: 408px cada

**Tab Individual:**
- Dimensões: 408px × 60px
- Layout: Horizontal, Gap: 10px, Align: CENTER
- Padding: 16px (todos os lados)

**Tab Inativa:**
- Texto: Inter 18px weight 400
- Color: `#b4a8a9` rgb(180, 168, 169) [CINZA CLARO]
- Exemplo: "Descrições", "Review"

**Tab Ativa:**
- Border: 1px solid `#6c191d` (vinho)
- Texto: Inter 18px weight 400
- Color: `#6c191d` rgb(108, 25, 29) [VINHO]
- Exemplo: "Características do produtos"

**Conteúdo das Tabs (Frame 2126) - 1224px × 792px**
- Layout: Vertical
- Padding: 16px (todos os lados)
- Align: CENTER

**Linhas de Características:**
- Layout: Tabela (2 colunas)
- Coluna 1 (Label): 272px
- Coluna 2 (Valor): 880px
- Gap entre colunas: 8px
- Padding: 16px (left/right), 8px (top/bottom)

**Linha par (com background):**
- Background: `#f1eded` rgb(241, 237, 237)
- Height: 36px (texto simples) ou 56px (texto multilinha)

**Linha ímpar (sem background):**
- Background: transparente
- Height: 36px (texto simples) ou 56px (texto multilinha)

**Tipografia das características:**
- Label: Inter 14px weight 400, color `#000000`
- Valor: Inter 14px weight 400, color `#625656` rgb(98, 86, 86)
- Line-height: 20px

---

### SEÇÃO 3: FOOTER (Frame 18)
- **Dimensões:** 1440px × 604px
- **Background:** `#6c191d` rgb(108, 25, 29) [VINHO]
- **Layout:** Vertical, Gap: 40px
- **Padding lateral:** 108px (centraliza 1224px)

#### 3.1 Galeria de Instagram (Frame 47) - 1224px × 184px
- Layout: Horizontal, Gap: 24px
- 6 cards de imagem: 184px × 184px cada
- Border-radius: 16px
- Contém ícone do Instagram (48px × 48px)

#### 3.2 Footer Info (Frame 52) - 1224px × 220px
- Layout: Vertical, Gap: 16px

**Links e Newsletter (Frame 45)** - 1224px × 168px
- Layout: Horizontal, Gap: 48px
- Logo: 62px × 62px (circular, border-radius: 118.5px)
- Colunas de links (Frame 21): 1114px × 168px
  - Layout: Vertical, Gap: 16px
  - Múltiplas colunas de navegação

**Separador:** Line 3 - 1224px × 0px

**Copyright e Links (Frame 51)** - 1224px × 20px
- Layout: Horizontal, Gap: 48px
- Texto: "© 2025 By Rosa Chic, All Rights Reserved."
  - Font: Inter 14px weight 400
  - Color: `#f1eded` rgb(241, 237, 237)

---

## 3. CORES EXATAS - PALETA COMPLETA

### Cores Primárias
| Hex | RGB | Uso |
|-----|-----|-----|
| `#6c191d` | rgb(108, 25, 29) | Vinho/Marsala - Cor primária da marca (header, footer, acentos) |
| `#ffffff` | rgb(255, 255, 255) | Branco - Background principal, textos em fundos escuros |
| `#000000` | rgb(0, 0, 0) | Preto - Textos principais, títulos |

### Cores Secundárias
| Hex | RGB | Uso |
|-----|-----|-----|
| `#42b05a` | rgb(66, 176, 90) | Verde - CTA primário (Comprar agora) |
| `#196c2b` | rgb(25, 108, 43) | Verde escuro - Texto em botões secundários |
| `#2b8e41` | rgb(43, 142, 65) | Verde médio - Ícones, detalhes |
| `#5ed277` | rgb(94, 210, 119) | Verde claro - Estados hover/destaque |

### Cores de Links e Interação
| Hex | RGB | Uso |
|-----|-----|-----|
| `#2b588e` | rgb(43, 88, 142) | Azul - Links, textos interativos |
| `#7fb3f4` | rgb(127, 179, 244) | Azul claro - Hover de links |

### Cores de Texto
| Hex | RGB | Uso |
|-----|-----|-----|
| `#000000` | rgb(0, 0, 0) | Preto - Textos principais, títulos |
| `#312a2a` | rgb(49, 42, 42) | Preto suave - Textos secundários |
| `#4e4343` | rgb(78, 67, 67) | Cinza escuro - Textos terciários |
| `#625656` | rgb(98, 86, 86) | Cinza médio - Labels, descrições |
| `#77696a` | rgb(119, 105, 106) | Cinza - Placeholders |
| `#a09293` | rgb(160, 146, 147) | Cinza claro - Textos desabilitados |
| `#b4a8a9` | rgb(180, 168, 169) | Cinza muito claro - Tabs inativas |

### Cores de Background
| Hex | RGB | Uso |
|-----|-----|-----|
| `#f1eded` | rgb(241, 237, 237) | Bege/Cinza muito claro - Backgrounds secundários, cards |
| `#fff3f3` | rgb(255, 243, 243) | Rosa muito claro - Labels, badges |
| `#fff8f3` | rgb(255, 248, 243) | Bege claro - Variação de background |

### Cores de Bordas
| Hex | RGB | Uso |
|-----|-----|-----|
| `#c8bebf` | rgb(200, 190, 191) | Cinza rosado - Bordas principais (inputs, cards, tabs) |
| `#ddd5d6` | rgb(221, 213, 214) | Cinza claro - Bordas sutis, separadores |

### Cores Auxiliares (Badges, Tags, Estados)
| Hex | RGB | Uso |
|-----|-----|-----|
| `#d32f2f` | rgb(211, 47, 47) | Vermelho - Erros, alertas, descontos |
| `#b07242` | rgb(176, 114, 66) | Laranja/Marrom - Tags especiais |
| `#f4b27f` | rgb(244, 178, 127) | Laranja claro - Destaques suaves |
| `#c45ed2` | rgb(196, 94, 210) | Roxo - Badges especiais |
| `#d25eab` | rgb(210, 94, 171) | Rosa - Variações de badges |
| `#ccd25e` | rgb(204, 210, 94) | Amarelo esverdeado - Alertas informativos |

**Total de cores identificadas:** 26 cores únicas

---

## 4. TIPOGRAFIA COMPLETA

### Famílias de Fontes
1. **Inter** - Fonte principal (110 ocorrências - 99%)
2. **Cormorant Garamond** - Fonte display para títulos de produtos (1 ocorrência - 1%)

### Tamanhos de Fonte (Font-size)
| Tamanho | Uso | Ocorrências |
|---------|-----|-------------|
| **14px** | Textos padrão, labels, links, navegação | 87x (78%) |
| **16px** | Textos de ênfase, placeholders, botões | 14x (13%) |
| **18px** | Tabs, subtítulos | 6x (5%) |
| **32px** | Preços principais | 1x (1%) |
| **40px** | Títulos de produtos, destaques | 2x (2%) |
| **12px** | Textos muito pequenos, notas de rodapé | 1x (1%) |

### Pesos de Fonte (Font-weight)
| Peso | Uso | Ocorrências |
|------|-----|-------------|
| **400 (Regular)** | Textos padrão, corpo de texto | 102x (92%) |
| **500 (Medium)** | Ênfase, labels importantes, preços | 8x (7%) |
| **700 (Bold)** | Títulos principais de produtos | 1x (1%) |

### Line-height
| Altura | Uso | Ocorrências |
|--------|-----|-------------|
| **20px** | Textos de 14px | 87x (78%) |
| **24px** | Textos de 16px | 14x (13%) |
| **28px** | Textos de 18px | 6x (5%) |
| **40px** | Títulos de 32-40px | 3x (3%) |
| **16px** | Textos pequenos de 12px | 1x (1%) |

### Hierarquia Tipográfica

#### Display / Hero
```
Família: Cormorant Garamond
Tamanho: 40px
Peso: 700 (Bold)
Line-height: 40px
Cor: #000000
Uso: Título principal do produto
```

#### Heading 1 / Preços
```
Família: Inter
Tamanho: 32px
Peso: 500 (Medium)
Line-height: 40px
Cor: #000000
Uso: Preço principal
```

#### Heading 2 / Destaques
```
Família: Inter
Tamanho: 40px
Peso: 400 (Regular)
Line-height: 40px
Cor: Variável
Uso: Números grandes, contadores
```

#### Heading 3 / Tabs
```
Família: Inter
Tamanho: 18px
Peso: 400 (Regular)
Line-height: 28px
Cor: #6c191d (ativo) / #b4a8a9 (inativo)
Uso: Navegação em tabs
```

#### Heading 4 / Labels Importantes
```
Família: Inter
Tamanho: 16px
Peso: 500 (Medium)
Line-height: 24px
Cor: #000000 / #625656
Uso: Labels de formulário, seletores
```

#### Body Large / Botões
```
Família: Inter
Tamanho: 16px
Peso: 400 (Regular)
Line-height: 24px
Cor: #ffffff (em botões) / #196c2b (outline)
Uso: Texto de botões, placeholders
```

#### Body / Texto Padrão
```
Família: Inter
Tamanho: 14px
Peso: 400 (Regular)
Line-height: 20px
Cor: #000000 / #625656
Uso: Corpo de texto, descrições, navegação
```

#### Body Small / Links
```
Família: Inter
Tamanho: 14px
Peso: 400 (Regular)
Line-height: 20px
Cor: #2b588e
Uso: Links, textos de ajuda
```

#### Caption
```
Família: Inter
Tamanho: 12px
Peso: 400 (Regular)
Line-height: 16px
Cor: #625656
Uso: Notas, disclaimers
```

### Letter-spacing
- Não foram identificados valores customizados de letter-spacing
- Todas as fontes usam o espaçamento padrão

---

## 5. SISTEMA DE ESPAÇAMENTO (SPACING SYSTEM)

### Gap / Item Spacing (Espaçamento entre elementos)
| Valor | Uso | Ocorrências |
|-------|-----|-------------|
| **1px** | Gap mínimo entre estrelas de rating | 1x |
| **4px** | Espaçamento mínimo entre labels e campos | 18x |
| **8px** | Espaçamento padrão pequeno (thumbnails, cards internos) | 48x (41%) |
| **10px** | Espaçamento médio (elementos de formulário) | 25x (21%) |
| **16px** | Espaçamento grande (seções relacionadas) | 10x (8%) |
| **24px** | Espaçamento extra grande (seções principais) | 11x (9%) |
| **40px** | Espaçamento de seção (footer interno) | 2x |
| **48px** | Espaçamento de mega seção (footer links) | 3x |
| **1006px** | Gap flexível (header space-between) | 1x |

**Sistema predominante:** 4px, 8px, 16px, 24px (múltiplos de 4)

### Padding (Preenchimento interno)
| Valor | Uso | Ocorrências |
|-------|-----|-------------|
| **4px** | Padding mínimo | 50x (20%) |
| **8px** | Padding padrão pequeno (botões pequenos, cards) | 60x (24%) |
| **12px** | Padding médio (botões principais) | 42x (17%) |
| **16px** | Padding grande (containers, forms) | 80x (32%) |
| **24px** | Padding extra grande | 1x |
| **72px, 80px, 108px** | Padding de seções (margens laterais) | 10x (4%) |

**Sistema predominante:** 4px, 8px, 12px, 16px (múltiplos de 4)

### Margin
- Não foram identificados margins explícitos
- Layout é controlado principalmente por Flexbox com gaps

### Border Radius (Arredondamento de cantos)
| Valor | Uso | Ocorrências |
|-------|-----|-------------|
| **6px** | Imagens dentro de cards | 7x |
| **8px** | Botões, inputs, dropdowns | 8x (23%) |
| **12px** | Cards médios, thumbnails | 8x (23%) |
| **16px** | Cards grandes, containers principais | 10x (29%) |
| **24px, 29px** | Elementos especiais | 2x |
| **59px** | Ícones circulares médios | 2x |
| **118.5px** | Logos e ícones circulares | 2x |
| **360px** | Elementos totalmente circulares | 9x |

**Sistema predominante:** 6px, 8px, 12px, 16px

### Border Width / Stroke Weight
| Valor | Uso | Ocorrências |
|-------|-----|-------------|
| **1px** | Bordas padrão (inputs, cards, separadores) | 322x (68%) |
| **0.67px, 0.89px, 1.33px** | Bordas de ícones SVG (variações) | 119x (25%) |
| **5.33px** | Bordas grossas de ícones | 28x (6%) |
| **8px** | Bordas muito grossas (decoração) | 3x |
| **21.33px** | Bordas especiais | 2x |

**Padrão predominante:** 1px para UI, variações para ícones SVG

---

## 6. COMPONENTES INTERATIVOS

### 6.1 BOTÕES

#### Botão Primário (CTA Principal)
**Exemplo:** "Comprar agora"
- **Dimensões:** 368px × 48px
- **Layout:** Horizontal, Gap: 8px, Align: CENTER
- **Padding:** 12px (todos os lados)
- **Background:** `#42b05a` rgb(66, 176, 90) [VERDE]
- **Border:** Nenhuma
- **Border-radius:** 8px
- **Texto:** Inter 16px weight 400, color `#ffffff`
- **Ícones:** 24px × 24px (esquerda e direita)
- **Estado normal:** Verde sólido
- **Shadow:** Não identificado no design estático

#### Botão Secundário (Outline)
**Exemplo:** "Adicionar ao carrinho"
- **Dimensões:** 368px × 48px
- **Layout:** Horizontal, Gap: 8px, Align: CENTER
- **Padding:** 12px (todos os lados)
- **Background:** `#ffffff` (transparente)
- **Border:** 1px solid `#42b05a` rgb(66, 176, 90)
- **Border-radius:** 8px
- **Texto:** Inter 16px weight 400, color `#196c2b` rgb(25, 108, 43)
- **Ícones:** 24px × 24px (esquerda e direita)

#### Botão Terciário (Seletor)
**Exemplo:** "Esquerdo" / "Direito"
- **Dimensões:** 180px × 36px
- **Layout:** Horizontal, Gap: 8px, Align: CENTER
- **Padding:** 8px (todos os lados)
- **Background:** `#ffffff`
- **Border:** 1px solid `#c8bebf` rgb(200, 190, 191)
- **Border-radius:** 8px
- **Texto:** Inter 14px weight 400, color `#000000`
- **Ícones:** 20px × 20px ou 24px × 24px

#### Botão Ícone (Header)
**Exemplo:** Carrinho, Perfil
- **Dimensões:** 36px × 36px
- **Background:** `#ffffff`
- **Border:** 1px solid `#6c191d` (Perfil) ou sem borda (Carrinho)
- **Border-radius:** 59px (circular)
- **Padding:** 8px
- **Ícone:** 20px × 20px centralizado

### 6.2 INPUTS E DROPDOWNS

#### Dropdown Padrão
**Exemplo:** "Selecione a Altura"
- **Container:** 368px × 64px
- **Layout:** Vertical, Gap: 4px
- **Label:** Inter 14px weight 400, color `#000000`, height: 20px
- **Campo:** 368px × 40px
  - Layout: Horizontal, Gap: 10px
  - Padding: 16px (L/R), 8px (T/B)
  - Background: `#ffffff`
  - Border: 1px solid `#c8bebf`
  - Border-radius: 8px
  - **Ícone esquerdo:** 16px × 16px (icon/ReguaVertical ou icon/RéguaHorizontal)
  - **Placeholder:** Inter 16px weight 400, color `#77696a`
  - **Ícone dropdown:** 16px × 16px (icon/Dropdown)
- **Supporting text:** Inter 14px weight 400, color `#2b588e`, height: 20px

#### Campo de Busca (Header)
- **Dimensões:** 336px × 40px
- **Background:** `#ffffff`
- **Border-radius:** 8px
- **Placeholder:** "Buscar persianas, serviços, etc..."
  - Font: Inter 16px weight 400
  - Color: `#77696a` rgb(119, 105, 106)
- **Padding:** Não especificado (estimar 16px L/R, 8px T/B)

### 6.3 ÍCONES

**Tamanhos identificados:**
- **12px:** Ícones muito pequenos
- **16px:** Ícones em inputs, dropdowns
- **20px:** Ícones em botões pequenos
- **24px:** Ícones em botões principais
- **32px:** Ícones em info blocks
- **48px:** Ícones grandes (Instagram no footer)

**Ícones identificados:**
- icon/AddCart (carrinho)
- icon/Cart (carrinho alternativo)
- icon/profile (perfil)
- icon/Dropdown (seta dropdown)
- icon/leftarrow (seta voltar)
- icon/ReguaVertical (régua vertical)
- icon/RéguaHorizontal (régua horizontal)
- icon/diagonal (seta diagonal)
- icon/roloesquerdo (rolo esquerdo)
- icon/rolodireito (rolo direito)
- icon/blackout (blackout)
- icon/Frete (frete/entrega)
- icon/garantia basica (garantia)
- icon/devolução (devolução)
- icon/instagram (Instagram)
- icon/unfav (desfavoritar)

**Cores de ícones:**
- `#ffffff` (branco) - ícones em fundos escuros
- `#77696a` (cinza) - ícones em placeholders
- `#000000` (preto) - ícones em fundos claros
- `#6c191d` (vinho) - ícones de destaque
- `#2b8e41` (verde) - ícones de confirmação

### 6.4 THUMBNAILS DE GALERIA

**Thumbnail Individual:**
- **Container:** 116px × 116px
- **Background:** `#f1eded` rgb(241, 237, 237)
- **Border-radius:** 12px
- **Layout:** Vertical, Gap: 8px
- **Label:** "Cortinas"
  - Font: Inter 14px weight 400
  - Color: `#fff3f3` rgb(255, 243, 243)
  - Height: 20px
- **Imagem:** 92px × 92px
  - Border-radius: 6px

**Thumbnail "+X" (mais imagens):**
- **Container:** 116px × 116px (mesmo tamanho)
- **Background interno:** `#625656` rgb(98, 86, 86)
- **Border-radius:** 12px (container), 6px (interno)
- **Texto:** "+4"
  - Font: Inter 40px weight 400
  - Color: `#f1eded` rgb(241, 237, 237)
  - Centralizado

### 6.5 RATING (Estrelas)

**Container:**
- **Dimensões:** 54px × 18px
- **Layout:** Horizontal, Gap: 1px
- **Background:** `#ffffff`

**Estrela individual:**
- **Tamanho estimado:** ~10px × 10px
- **Cor preenchida:** Não especificado (provavelmente amarelo/dourado)
- **Cor vazia:** Não especificado (provavelmente cinza claro)

### 6.6 BADGES E TAGS

**Label "Cortinas" (exemplo):**
- **Dimensões:** 57px × 20px
- **Background:** `#fff3f3` rgb(255, 243, 243)
- **Font:** Inter 14px weight 400
- **Posicionamento:** Canto superior dos cards de imagem

**Badge "Sem Furos" (header):**
- **Font:** Inter 14px weight 400
- **Color:** `#fff3f3` rgb(255, 243, 243)
- **Background:** Provavelmente sobre fundo escuro

### 6.7 SEPARADORES (LINES)

**Separador Horizontal:**
- **Largura:** 368px, 1224px (varia conforme contexto)
- **Altura:** 0px (linha fina, stroke 1px)
- **Cor:** `#c8bebf` rgb(200, 190, 191) ou similar

**Separador Vertical:**
- **Largura:** 0px (linha fina, stroke 1px)
- **Altura:** 21px, 47px (varia conforme contexto)
- **Cor:** `#c8bebf` rgb(200, 190, 191) ou similar

---

## 7. TABELA DE CARACTERÍSTICAS (TAB CONTENT)

### Estrutura de Linha

**Dimensões:**
- **Largura total:** 1192px (dentro do container de 1224px com padding 16px)
- **Altura:** 36px (texto simples) ou 56px (texto multilinha)

**Layout:**
- **Coluna Label (esquerda):** 272px
- **Gap:** 8px
- **Coluna Valor (direita):** 880px

**Padding:**
- **Horizontal:** 16px (left/right)
- **Vertical:** 8px (top/bottom)

### Estilos de Linha

**Linha com Background (par):**
- Background: `#f1eded` rgb(241, 237, 237)
- Border-radius: Não aplicado

**Linha sem Background (ímpar):**
- Background: Transparente
- Border-radius: Não aplicado

### Tipografia

**Label (coluna esquerda):**
- Font: Inter 14px weight 400
- Color: `#000000` (preto)
- Line-height: 20px

**Valor (coluna direita):**
- Font: Inter 14px weight 400
- Color: `#625656` rgb(98, 86, 86) (cinza médio)
- Line-height: 20px

**Exemplos de características:**
- Visibilidade
- Aplicação Comercial
- Aplicação Residencial
- Regulagem Padrão
- Conteúdo da embalagem
- Controle Solar
- Composição do tecido
- Dimensões
- Limpeza
- Cor dos acessórios
- Garantia
- Locais de instalação
- Modelo de produto
- Tempo de instalação
- Bandô
- Variação do lote
- Altura Máxima
- Largura Máxima

---

## 8. INFO BLOCKS (Seção 2.4)

### Container Geral
- **Dimensões:** 1224px × 80px
- **Background:** `#f1eded` rgb(241, 237, 237)
- **Border-radius:** 12px
- **Layout:** Horizontal, Gap: 16px, Align: CENTER

### Bloco Individual
- **Dimensões:** 386.67px × 80px (3 blocos = 1160px + 2×16px gaps = 1192px)
- **Layout:** Horizontal, Gap: 10px, Align: CENTER
- **Padding:** 16px (todos os lados)
- **Border-radius:** 16px (interno)

### Estrutura de Conteúdo

**Ícone:**
- **Dimensões:** 32px × 32px
- **Border-radius:** 24px (circular)
- **Gap:** 10px entre ícone e texto

**Texto:**
- **Container:** ~250px × 48px (ajustável)
- **Layout:** Vertical, Gap: 4px

**Título:**
- Font: Estimar Inter 16-18px weight 500
- Color: `#000000` ou `#6c191d`
- Height: ~24px

**Descrição:**
- Font: Inter 14px weight 400
- Color: `#625656` rgb(98, 86, 86)
- Height: ~20px

### Separador Vertical
- **Dimensões:** 0px × 47px
- **Color:** Sutil (não especificado, estimar `#c8bebf`)

### Conteúdo dos Blocos (inferido)

**Bloco 1 - Frete:**
- Ícone: icon/Frete
- Título: "Frete Grátis" ou "Entrega Rápida"
- Descrição: Informações sobre entrega

**Bloco 2 - Garantia:**
- Ícone: icon/garantia basica
- Título: "Garantia de 1 ano"
- Descrição: Detalhes da garantia

**Bloco 3 - Devolução:**
- Ícone: icon/devolução
- Título: "Troca fácil"
- Descrição: Política de devolução

---

## 9. BREADCRUMB

### Container
- **Dimensões:** 1224px × 21px
- **Layout:** Horizontal, Gap: 24px

### Estrutura
**Padrão:** Voltar | Item1 > Item2 > Item3

### Elementos

**Link "Voltar":**
- Text: "Voltar"
- Font: Inter 14px weight 400
- Color: `#6c191d` rgb(108, 25, 29)
- Icon: icon/leftarrow (16px × 16px)

**Separador Vertical:**
- Line: 0px × 21px
- Color: Não especificado (estimar `#ddd5d6`)

**Links de Navegação:**
- Text: "Kitbox", "Persianas Kitbox", "Persiana"
- Font: Inter 14px weight 400
- Color: `#6c191d` rgb(108, 25, 29)
- Gap: 16px entre itens

**Ícone de Seta (>):**
- Icon: Vector (9px × 16px)
- Color: `#ddd5d6` rgb(221, 213, 214)
- Gap: 16px antes e depois

---

## 10. HEADER DETALHADO

### Container Principal
- **Dimensões:** 1440px × 110px
- **Background:** `#6c191d` rgb(108, 25, 29)
- **Layout:** Vertical, Gap: 8px
- **Padding lateral:** 108px (centraliza 1224px)

### Barra Superior (Frame 55)
- **Dimensões:** 1224px × 50px
- **Layout:** Horizontal, Gap: 1006px (space-between)

**Logo (image 2):**
- **Dimensões:** 50px × 50px
- **Border-radius:** 118.5px (circular)
- **Imagem:** Logo da marca

**Campo de Busca (Placeholder):**
- **Container:** 336px × 40px (estimado, visível: 336px × 64px com label)
- **Layout:** Vertical, Gap: 4px
- **Label:** "Label text"
  - Font: Inter 14px weight 400
  - Color: `#000000` (não visível, placeholder)
- **Input (Frame 56):** 336px × 40px
  - Background: `#ffffff`
  - Border-radius: 8px
  - Gap: 40px (interno)
  - Placeholder: "Buscar persianas, serviços, etc..."
    - Font: Inter 16px weight 400
    - Color: `#77696a` rgb(119, 105, 106)
- **Supporting text:** "Supporting text"
  - Font: Inter 14px weight 400
  - Color: `#625656` (não visível)

**Ícones de Ação (Frame 8):**
- **Container:** 76px × 36px
- **Layout:** Horizontal, Gap: 4px

**Ícone Carrinho (Frame 5):**
- **Dimensões:** 36px × 36px
- **Background:** `#ffffff`
- **Border-radius:** 59px (circular)
- **Gap:** 8px (interno)
- **Layout:** Vertical
- **Badge:** "Sem Furos" (se aplicável)

**Ícone Perfil (Frame 4):**
- **Dimensões:** 36px × 36px
- **Background:** `#ffffff`
- **Border-radius:** 59px (circular)
- **Gap:** 8px (interno)
- **Layout:** Vertical

### Menu de Navegação (Frame 12)
- **Dimensões:** 621px × 20px
- **Layout:** Horizontal, Gap: 16px

**Links:**
1. "Home" (40px)
2. "Categorias" (72px)
3. "Mais procurados" (111px)
4. "Guia rápido" (80px)
5. "Ambientes" (71px)
6. "Serviço Curitiba" (106px)
7. "Outros" (45px)

**Estilo dos Links:**
- Font: Inter 14px weight 400
- Color: `#f1eded` rgb(241, 237, 237)
- Line-height: 20px
- Text-decoration: None (sem sublinhado)
- Hover: Não especificado (estimar sublinhado ou mudança de cor)

---

## 11. FOOTER DETALHADO

### Container Principal
- **Dimensões:** 1440px × 604px
- **Background:** `#6c191d` rgb(108, 25, 29)
- **Layout:** Vertical, Gap: 40px
- **Padding lateral:** 108px (centraliza 1224px)

### Galeria de Instagram (Frame 47)
- **Dimensões:** 1224px × 184px
- **Layout:** Horizontal, Gap: 24px

**Card de Imagem:**
- **Dimensões:** 184px × 184px (6 cards)
- **Border-radius:** 16px
- **Gap entre cards:** 24px

**Card com Ícone Instagram (Frame 47):**
- **Dimensões:** 184px × 184px
- **Layout:** Horizontal, Gap: 24px
- **Ícone:** icon/instagram (48px × 48px)
  - Background: `#ffffff`
  - Centralizado

### Footer Info (Frame 52)
- **Dimensões:** 1224px × 220px
- **Layout:** Vertical, Gap: 16px

**Links e Newsletter (Frame 45):**
- **Dimensões:** 1224px × 168px
- **Layout:** Horizontal, Gap: 48px

**Logo:**
- **Dimensões:** 62px × 62px
- **Border-radius:** 118.5px (circular)

**Colunas de Links (Frame 21):**
- **Dimensões:** 1114px × 168px
- **Layout:** Vertical, Gap: 16px
- **Conteúdo:** Múltiplas colunas de links de navegação
  - Font: Estimar Inter 14px weight 400
  - Color: `#f1eded` rgb(241, 237, 237)

### Separador
- **Line 3:** 1224px × 0px
- **Stroke:** Provavelmente 1px
- **Color:** Estimar `#ffffff` com opacidade ou `#ddd5d6`

### Copyright e Links Legais (Frame 51)
- **Dimensões:** 1224px × 20px
- **Layout:** Horizontal, Gap: 48px

**Texto de Copyright:**
- **Text:** "© 2025 By Rosa Chic, All Rights Reserved."
- **Dimensões:** 282px × 20px
- **Font:** Inter 14px weight 400
- **Color:** `#f1eded` rgb(241, 237, 237)
- **Line-height:** 20px

**Links Legais (Frame 53):**
- **Dimensões:** 334px × 20px
- **Layout:** Horizontal, Gap: 48px
- **Conteúdo:** Provavelmente "Política de Privacidade", "Termos de Uso", etc.
  - Font: Inter 14px weight 400
  - Color: `#f1eded` rgb(241, 237, 237)

---

## 12. RESPONSIVIDADE E BREAKPOINTS

**Nota:** O design analisado é específico para Desktop (1440px). Não foram identificados designs responsivos no frame analisado. Para implementação responsiva, sugere-se:

### Breakpoints Recomendados
- **Desktop Large:** 1440px+
- **Desktop:** 1200px - 1439px
- **Tablet:** 768px - 1199px
- **Mobile:** 320px - 767px

### Adaptações Sugeridas

**Desktop (1200px - 1439px):**
- Container: 1024px (reduzir de 1224px)
- Manter layout de 2 colunas

**Tablet (768px - 1199px):**
- Container: 720px
- Galeria: Thumbnails horizontais abaixo da imagem principal
- Info do produto: Full width abaixo da galeria
- Tabs: Scrollável horizontalmente se necessário

**Mobile (320px - 767px):**
- Container: 100% com padding 16px
- Galeria: Carousel simples com dots
- Thumbnails: Scrollável horizontal
- Botões: Full width, stack vertical
- Tabs: Accordion ou scroll horizontal
- Header: Hamburger menu
- Footer: Stack vertical

---

## 13. ESTADOS E INTERAÇÕES

### Botões

**Estado Normal:**
- Conforme especificado nas seções anteriores

**Estado Hover (sugerido):**
- **Botão Primário:**
  - Background: Escurecer 10% → `#3a9d4e` (estimar)
  - Cursor: pointer
  - Transição: 200ms ease
- **Botão Secundário:**
  - Border: Escurecer 10%
  - Background: `#f1eded` (leve preenchimento)
- **Botão Terciário:**
  - Background: `#f1eded`
  - Border: Escurecer 10%

**Estado Active/Pressed:**
- Background: Escurecer 20%
- Transform: scale(0.98)

**Estado Focus:**
- Outline: 2px solid `#2b588e` (azul)
- Offset: 2px

**Estado Disabled:**
- Opacity: 0.5
- Cursor: not-allowed
- Pointer-events: none

### Inputs e Dropdowns

**Estado Normal:**
- Conforme especificado

**Estado Focus:**
- Border: 2px solid `#2b588e` (azul)
- Outline: None
- Box-shadow: 0 0 0 3px rgba(43, 88, 142, 0.1)

**Estado Error:**
- Border: 2px solid `#d32f2f` (vermelho)
- Supporting text: Color `#d32f2f`

**Estado Success:**
- Border: 2px solid `#42b05a` (verde)
- Supporting text: Color `#42b05a`

**Estado Disabled:**
- Background: `#f1eded`
- Opacity: 0.6
- Cursor: not-allowed

### Links

**Estado Normal:**
- Color: `#2b588e` (azul)
- Text-decoration: none

**Estado Hover:**
- Color: `#7fb3f4` (azul claro)
- Text-decoration: underline

**Estado Active:**
- Color: `#2b588e`
- Text-decoration: underline

**Estado Visited:**
- Color: `#2b588e` (manter mesmo)

### Tabs

**Tab Inativa:**
- Conforme especificado (cinza `#b4a8a9`)
- Hover: Color → `#625656` (escurecer)
- Cursor: pointer

**Tab Ativa:**
- Border: 1px solid `#6c191d`
- Color: `#6c191d`
- Cursor: default
- Não reagir a hover

### Thumbnails de Galeria

**Thumbnail Normal:**
- Conforme especificado
- Opacity: 0.6

**Thumbnail Hover:**
- Opacity: 1
- Cursor: pointer
- Transform: scale(1.05)
- Transição: 200ms ease

**Thumbnail Ativa:**
- Opacity: 1
- Border: 2px solid `#6c191d` (vinho)

---

## 14. SOMBRAS E EFEITOS

**Nota:** Não foram identificadas sombras (box-shadow) explícitas no design do Figma analisado. Todos os cards e componentes usam apenas bordas e backgrounds planos.

### Sugestões de Implementação

**Cards Elevados (se necessário):**
```css
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
```

**Botões em Hover:**
```css
box-shadow: 0 4px 12px rgba(108, 25, 29, 0.15);
```

**Dropdowns Abertos:**
```css
box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
```

**Imagem Principal em Zoom (se hover):**
```css
box-shadow: 0 8px 24px rgba(0, 0, 0, 0.16);
```

---

## 15. ACESSIBILIDADE (WCAG 2.1)

### Contraste de Cores

**Textos Principais:**
- `#000000` em `#ffffff` - Contraste: 21:1 ✓ AAA
- `#625656` em `#ffffff` - Contraste: ~6.5:1 ✓ AA
- `#f1eded` em `#6c191d` - Verificar: ~11:1 ✓ AAA

**Links:**
- `#2b588e` em `#ffffff` - Contraste: ~6:1 ✓ AA

**Botões:**
- `#ffffff` em `#42b05a` - Contraste: ~3.8:1 ⚠ AA Large Text
- `#196c2b` em `#ffffff` - Contraste: ~8:1 ✓ AAA

### Recomendações

1. **Focus Indicators:** Garantir outline visível em todos os elementos interativos
2. **Alt Text:** Todas as imagens devem ter alt text descritivo
3. **ARIA Labels:** Botões de ícone precisam de aria-label
4. **Keyboard Navigation:** Tab order lógico, escape para fechar modais
5. **Screen Reader:** Anunciar mudanças de conteúdo (tabs, loading)
6. **Color Blindness:** Não usar apenas cor para transmitir informação
7. **Touch Targets:** Mínimo 44px × 44px (botões de 48px atendem)

---

## 16. ANIMAÇÕES E TRANSIÇÕES SUGERIDAS

### Transições Padrão
```css
transition: all 200ms ease;
```

### Componentes Específicos

**Botões:**
- Hover: 200ms ease (background, border, transform)
- Active: 100ms ease (transform)

**Links:**
- Hover: 150ms ease (color)

**Tabs:**
- Mudança de tab: Fade in/out 300ms ease

**Galeria:**
- Thumbnail hover: 200ms ease (opacity, transform)
- Troca de imagem principal: Fade 400ms ease

**Dropdowns:**
- Abrir: 250ms ease-out (height, opacity)
- Fechar: 200ms ease-in

**Modais/Overlays:**
- Abrir: 300ms ease-out (opacity, transform translateY)
- Fechar: 250ms ease-in

**Loading States:**
- Skeleton: Pulse 1500ms ease-in-out infinite
- Spinner: Rotate 1000ms linear infinite

---

## 17. Z-INDEX HIERARCHY (Sugerido)

```
1. Base content: z-index: 1
2. Sticky header: z-index: 100
3. Dropdowns: z-index: 200
4. Tooltips: z-index: 300
5. Modals backdrop: z-index: 400
6. Modals content: z-index: 500
7. Toast notifications: z-index: 600
8. Dev tools: z-index: 9999
```

---

## 18. IMAGENS E ASSETS

### Formato e Otimização

**Imagens de Produto:**
- Formato: WebP (fallback: JPEG)
- Qualidade: 85%
- Thumbnails: 116px × 116px @2x = 232px × 232px
- Imagem principal: 676px × 736px @2x = 1352px × 1472px
- Lazy loading: Sim

**Ícones:**
- Formato: SVG (vetorial)
- Cor: Inline CSS ou currentColor para facilitar temas
- Fallback: PNG @2x para browsers antigos

**Logo:**
- Formato: SVG (preferencial) ou PNG @2x
- Tamanhos: 50px (header), 62px (footer)

---

## 19. PERFORMANCE

### Otimizações Recomendadas

**Imagens:**
- Lazy loading para imagens abaixo do fold
- Responsive images com srcset
- Preload da imagem principal
- Blur-up placeholder (LQIP)

**Fontes:**
- Preload: Inter (Regular 400, Medium 500)
- Preload: Cormorant Garamond (Bold 700)
- Font-display: swap
- Subsetting: Apenas caracteres usados (latin + acentuação PT-BR)

**CSS:**
- Critical CSS inline
- Demais estilos async
- Minificação e compressão

**JavaScript:**
- Code splitting por rota
- Lazy loading de componentes pesados (galeria, tabs)
- Debounce em eventos (scroll, resize)

---

## 20. CONSIDERAÇÕES FINAIS

### Dados Extraídos do Figma

Este relatório foi gerado através da análise completa da API do Figma, extraindo:
- ✓ 111 nós de texto analisados
- ✓ 26 cores únicas identificadas
- ✓ 119 elementos com spacing analisados
- ✓ Estrutura completa de 3 seções principais
- ✓ Hierarquia de 6 níveis de profundidade

### Limitações

1. **Estados interativos:** Não foram encontradas variantes de hover/active no Figma
2. **Responsividade:** Apenas o design desktop foi analisado
3. **Animações:** Não há especificações de motion design
4. **Assets:** Ícones SVG não foram exportados (apenas referências)

### Próximos Passos Recomendados

1. **Exportar assets:**
   - Ícones SVG (24px × 24px base)
   - Logos (50px e 62px)
   - Imagens placeholder

2. **Criar variantes:**
   - Estados hover/active/focus/disabled
   - Versões mobile/tablet

3. **Implementar Design Tokens:**
   - Criar arquivo de variáveis CSS/SCSS
   - Mapear cores, spacing, typography

4. **Desenvolver componentes:**
   - Biblioteca de componentes reutilizáveis
   - Storybook para documentação

5. **Testes de acessibilidade:**
   - Validar contrastes
   - Testar com screen readers
   - Keyboard navigation

---

**Relatório gerado em:** 2025-10-09
**Ferramenta:** Figma API + Claude Code
**Versão:** 1.0
