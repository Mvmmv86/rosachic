# 📋 Checklist de Páginas - Rosa Chic E-commerce

> **Projeto:** Rosa Chic - E-commerce de Persianas sob Medida
> **Figma:** [R-Chic Design System](https://www.figma.com/file/ZpEDBAOT8ImPyplkSUILxo)
> **Última atualização:** 2025-10-09

---

## 📊 Resumo Geral

- **Total de páginas:** 16
- **Concluídas:** 1 ✅
- **Pendentes:** 15 ⏳
- **Progresso:** 6.25% ████░░░░░░░░░░░░░░░░

---

## ✅ Páginas Implementadas

### 🏠 Homepage
- [x] **Desktop / Home** (1440x4359px)
  - ✅ Header com logo e navegação
  - ✅ Hero Section com gradiente e CTAs
  - ✅ Seção de Categorias (6 círculos)
  - ✅ Seção de Lançamentos (3 cards)
  - ✅ Seção Como Medir (3 steps com SVG)
  - ✅ Seção Mais Vendidos (4 cards com tabs)
  - ✅ Seção Sobre Nós
  - ✅ Footer com galeria Instagram (5 cards) e links
  - **Arquivo:** `frontend/src/app/page.tsx`
  - **Status:** ✅ 100% Concluída

---

## ⏳ Páginas Pendentes

### 📦 Catálogo e Produtos (3 páginas)

- [ ] **Desktop / Lista de Produtos** (1440x2305px)
  - Grid de produtos com filtros
  - Paginação e ordenação
  - Breadcrumb de navegação
  - **Rota sugerida:** `/produtos` ou `/categorias/[slug]`
  - **Prioridade:** 🔥 Alta

- [ ] **Desktop / Page Item** (1440x2767px)
  - Página de detalhes do produto (PDP)
  - Galeria de imagens
  - Descrição, especificações e avaliações
  - Botão adicionar ao carrinho
  - Produtos relacionados
  - **Rota sugerida:** `/produto/[id]`
  - **Prioridade:** 🔥 Alta

- [ ] **Desktop / Page Item / Desconto** (1440x2791px)
  - Página de produto com badge de desconto
  - Preço original e com desconto
  - Timer de oferta (opcional)
  - **Rota sugerida:** `/produto/[id]` (variante com desconto)
  - **Prioridade:** 🟡 Média

---

### �� Checkout e Carrinho (5 páginas)

- [ ] **Desktop / Checkout** (1440x1674px)
  - Carrinho de compras
  - Lista de produtos selecionados
  - Cálculo de subtotal, frete e total
  - Botão finalizar compra
  - **Rota sugerida:** `/carrinho`
  - **Prioridade:** 🔥 Alta

- [ ] **Desktop / Informações do Pedido** (1440x1567px)
  - Resumo do pedido antes de finalizar
  - Dados do cliente
  - Endereço de entrega
  - **Rota sugerida:** `/checkout/resumo`
  - **Prioridade:** 🔥 Alta

- [ ] **Desktop / Endereço** (1440x1674px)
  - Formulário de endereço de entrega
  - Validação de CEP
  - Endereços salvos
  - **Rota sugerida:** `/checkout/endereco`
  - **Prioridade:** 🔥 Alta

- [ ] **Desktop / Forma de pagamento** (1440x1674px)
  - Seleção de método de pagamento
  - Formulário de cartão de crédito
  - Opções: PIX, Boleto, Cartão
  - **Rota sugerida:** `/checkout/pagamento`
  - **Prioridade:** 🔥 Alta

- [ ] **Desktop / Pagamento aprovado!** (1440x1674px)
  - Confirmação de pedido realizado
  - Número do pedido
  - Resumo da compra
  - CTAs: Ver pedido, Continuar comprando
  - **Rota sugerida:** `/checkout/sucesso`
  - **Prioridade:** 🔥 Alta

---

### 🔐 Autenticação (3 páginas)

- [ ] **Desktop / Login** (1440x1646px)
  - Formulário de login (email + senha)
  - Link "Esqueci minha senha"
  - Link para criar conta
  - Login social (opcional)
  - **Rota sugerida:** `/login`
  - **Prioridade:** 🟡 Média

- [ ] **Desktop / Crie sua conta** (1440x1646px)
  - Formulário de cadastro
  - Campos: nome, email, senha, confirmação
  - Aceite de termos
  - **Rota sugerida:** `/cadastro`
  - **Prioridade:** 🟡 Média

- [ ] **Desktop / Conta criada com sucesso!** (1440x1646px)
  - Confirmação de cadastro realizado
  - Mensagem de boas-vindas
  - CTA para fazer login ou ir para home
  - **Rota sugerida:** `/cadastro/sucesso`
  - **Prioridade:** 🟡 Média

---

### 👤 Área do Cliente (4 páginas)

- [ ] **Desktop / Minha Conta** (1440x1423px)
  - Dashboard do usuário
  - Menu lateral: Perfil, Pedidos, Favoritos, Endereços
  - Visão geral da conta
  - **Rota sugerida:** `/minha-conta`
  - **Prioridade:** 🟡 Média

- [ ] **Desktop / Meus Perfil** (1440x1207px)
  - Formulário de edição de perfil
  - Campos: nome, email, telefone, CPF
  - Avatar/foto do usuário
  - Botão salvar alterações
  - **Rota sugerida:** `/minha-conta/perfil`
  - **Prioridade:** 🟢 Baixa

- [ ] **Desktop / Meus pedidos** / **Lista de Pedidos** (1440x3595px)
  - Lista de pedidos realizados
  - Status: Em andamento, Entregue, Cancelado
  - Detalhes resumidos de cada pedido
  - Filtros e busca
  - **Rota sugerida:** `/minha-conta/pedidos`
  - **Prioridade:** 🟡 Média

- [ ] **Desktop / Favoritos** (1440x1791px)
  - Grid de produtos favoritados
  - Botão remover dos favoritos
  - Adicionar ao carrinho direto
  - Mensagem quando lista vazia
  - **Rota sugerida:** `/minha-conta/favoritos`
  - **Prioridade:** 🟢 Baixa

---

## 📌 Componentes Compartilhados

Estes componentes já foram implementados e podem ser reutilizados:

- ✅ **Header** - Logo, busca, navegação, ícones
- ✅ **Footer** - Galeria Instagram, links, copyright
- ✅ **Logo Component** - `/frontend/src/components/Logo.tsx`
- ✅ **Product Card** - Card de produto com favoritos, rating, badge
- ✅ **Category Card** - Card circular de categoria

---

## 🎯 Ordem de Implementação Sugerida

### Sprint 1 - Catálogo e Produto (Alta prioridade)
1. Lista de Produtos
2. Page Item (Detalhes do Produto)
3. Page Item com Desconto

### Sprint 2 - Checkout (Alta prioridade)
4. Carrinho (Checkout)
5. Endereço
6. Forma de Pagamento
7. Informações do Pedido
8. Pagamento Aprovado

### Sprint 3 - Autenticação (Média prioridade)
9. Login
10. Criar Conta
11. Conta Criada com Sucesso

### Sprint 4 - Área do Cliente (Média/Baixa prioridade)
12. Minha Conta (Dashboard)
13. Meus Pedidos
14. Meu Perfil
15. Favoritos

---

## 📝 Notas Técnicas

### Stack Utilizado
- **Frontend:** Next.js 14 + React 18 + TypeScript
- **Styling:** Tailwind CSS
- **Tipografia:** Cormorant Garamond (títulos) + Inter (textos)
- **Ícones:** Lucide React
- **Estado:** Zustand (planejado)

### Cores do Projeto
- **Rosewood (primária):** `rgb(108, 25, 29)` - #6C191D
- **Bege claro:** `rgb(241, 237, 237)` - #F1EDED
- **Bege escuro:** `rgb(247, 243, 239)` - #F7F3EF
- **Cobre (accent):** `rgb(184, 115, 51)` - #B87333

### Container Padrão
- **Largura máxima:** 1224px (12 colunas × 80px + 11 gutters × 24px)
- **Padding lateral:** 24px (px-6)

---

## 🚀 Como Contribuir

1. Escolha uma página da lista de pendentes
2. Crie a rota em `/frontend/src/app/[rota]/page.tsx`
3. Replique o design do Figma com fidelidade pixel-perfect
4. Use os componentes compartilhados quando possível
5. Atualize este checklist marcando como concluída ✅
6. Faça commit com mensagem descritiva

---

**Última atualização:** 2025-10-09
**Responsável:** Claude Code + Marcus
