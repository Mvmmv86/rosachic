# 🚀 Próximos Passos - Sistema de Lançamentos e Mais Vendidos

## ✅ O QUE JÁ FOI FEITO:

1. ✅ Campos adicionados no banco de dados (Supabase):
   - `isLancamento` (boolean)
   - `isMaisVendido` (boolean)
2. ✅ Commit e push para GitHub (commit 568b637)
3. ✅ Railway vai fazer redeploy automático do backend

---

## ⏳ O QUE FALTA FAZER (Próxima Sessão):

### **1. Atualizar Formulário do Admin** (15 min)

**Arquivo:** `admin/src/app/dashboard/products/new/page.tsx`

**Adicionar 2 checkboxes:**

Após o checkbox "Ativo", adicionar:

```tsx
{/* Checkbox Lançamento */}
<div className="flex items-center gap-2">
  <input
    type="checkbox"
    id="isLancamento"
    checked={formData.isLancamento}
    onChange={(e) => setFormData({ ...formData, isLancamento: e.target.checked })}
    className="w-4 h-4"
  />
  <label htmlFor="isLancamento" className="text-sm font-medium text-gray-700">
    Marcar como Lançamento (aparece na seção Lançamentos da Home)
  </label>
</div>

{/* Checkbox Mais Vendido */}
<div className="flex items-center gap-2">
  <input
    type="checkbox"
    id="isMaisVendido"
    checked={formData.isMaisVendido}
    onChange={(e) => setFormData({ ...formData, isMaisVendido: e.target.checked })}
    className="w-4 h-4"
  />
  <label htmlFor="isMaisVendido" className="text-sm font-medium text-gray-700">
    Marcar como Mais Vendido (aparece na aba Mais Vendidos)
  </label>
</div>
```

**E adicionar no FormData:**
```tsx
interface FormData {
  // ... campos existentes
  isLancamento: boolean
  isMaisVendido: boolean
}

// No useState:
const [formData, setFormData] = useState<FormData>({
  // ... outros campos
  isLancamento: false,
  isMaisVendido: false,
})
```

**Fazer o mesmo no arquivo de edição:** `admin/src/app/dashboard/products/[id]/page.tsx`

---

### **2. Conectar Home com API Real** (30 min)

**Arquivo:** `frontend/src/app/page.tsx`

**Trocar os arrays mock por chamadas reais:**

```tsx
'use client'

import { useEffect, useState } from 'react'
import { getActiveProducts } from '@/lib/products'

export default function HomePage() {
  const [lancamentos, setLancamentos] = useState([])
  const [todosOsProdutos, setTodosOsProdutos] = useState([])
  const [maisVendidos, setMaisVendidos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProdutos()
  }, [])

  const fetchProdutos = async () => {
    try {
      setLoading(true)
      const response = await getActiveProducts()
      const produtos = response.data

      // Filtrar lançamentos (isLancamento = true)
      const produtosLancamento = produtos.filter(p => p.isLancamento)
      setLancamentos(produtosLancamento.slice(0, 3))

      // Filtrar mais vendidos
      const produtosMaisVendidos = produtos.filter(p => p.isMaisVendido)
      setMaisVendidos(produtosMaisVendidos.slice(0, 4))

      // Todos (ordenados por data, mais recentes)
      const todosProdutos = produtos.sort((a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt)
      )
      setTodosOsProdutos(todosProdutos.slice(0, 4))

    } catch (error) {
      console.error('Erro ao buscar produtos:', error)
    } finally {
      setLoading(false)
    }
  }

  // Resto do código...
}
```

**Substituir os arrays mock:**

**Seção Lançamentos (linha ~134):**
```tsx
{lancamentos.map((product) => (
  <ProductCard key={product.id} product={product} badge="Lançamento" />
))}
```

**Seção Design Premium (linha ~320):**
```tsx
{/* Aba Todos */}
{activeTab === 'todos' && todosOsProdutos.map(product => ...)}

{/* Aba Lançamentos */}
{activeTab === 'lancamentos' && lancamentos.map(product => ...)}

{/* Aba Mais Vendidos */}
{activeTab === 'mais-vendidos' && maisVendidos.map(product => ...)}
```

---

### **3. Implementar Tabs Funcionais** (10 min)

Adicionar estado para controlar qual aba está ativa:

```tsx
const [activeTab, setActiveTab] = useState('todos')

// Nos botões das abas:
<button
  onClick={() => setActiveTab('todos')}
  className={activeTab === 'todos' ? 'underline' : 'text-gray-500'}
>
  Todos os produtos
</button>

<button
  onClick={() => setActiveTab('lancamentos')}
  className={activeTab === 'lancamentos' ? 'underline' : 'text-gray-500'}
>
  Lançamentos
</button>

<button
  onClick={() => setActiveTab('mais-vendidos')}
  className={activeTab === 'mais-vendidos' ? 'underline' : 'text-gray-500'}
>
  Mais vendidos
</button>
```

---

## 🎯 COMO VAI FUNCIONAR:

### **Para Você (Admin):**
1. Acessa admin em produção
2. Cria/edita produto
3. **Marca checkbox:**
   - ✅ "Lançamento" → Aparece na seção de Lançamentos
   - ✅ "Mais Vendido" → Aparece na aba Mais Vendidos
4. Salva

### **Para Clientes (Home):**
1. **Seção "Lançamentos":**
   - Mostra os 3 produtos com `isLancamento = true`

2. **Seção "Design Premium":**
   - **Aba "Todos":** Últimos 4 produtos adicionados
   - **Aba "Lançamentos":** Produtos com `isLancamento = true`
   - **Aba "Mais Vendidos":** Produtos com `isMaisVendido = true`

---

## ⏰ TEMPO ESTIMADO:

- Atualizar admin: 15 min
- Conectar Home: 30 min
- Tabs funcionais: 10 min
- Testar local: 10 min
- Deploy: 5 min
- **Total: ~1 hora**

---

## 🚀 PRÓXIMA AÇÃO:

**Quer que eu implemente AGORA ou deixa para depois?**

Se sim, eu faço tudo e comito!
Se não, você pode fazer manualmente seguindo este guia! 📋

---

**Me confirma se quer que eu implemente agora!** ✅
