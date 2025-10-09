'use client'

import Link from 'next/link'
import { Search, ShoppingCart, User, ChevronRight } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { useState } from 'react'

export default function ProductListPage() {
  const [favorites, setFavorites] = useState<number[]>([])
  const [filters, setFilters] = useState({
    categories: [] as string[],
    environments: [] as string[],
    colors: [] as string[],
    materials: [] as string[]
  })

  const toggleFavorite = (productId: number) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const toggleFilter = (type: 'categories' | 'environments' | 'colors' | 'materials', value: string) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter(v => v !== value)
        : [...prev[type], value]
    }))
  }

  // Dados dos produtos (12 produtos para grid 3x4)
  const products = Array.from({ length: 12 }, (_, i) => ({
    id: 100 + i,
    name: 'Persiana Rolô Tela Solar 5% - Branca',
    price: 'R$ 320,00',
    rating: 4,
    badge: i === 0 ? 'Lançamento' : i === 3 ? 'Lançamento' : null,
    image: `/products/produto${(i % 3) + 1}.jpg`
  }))

  return (
    <div className="min-h-screen bg-[rgb(247,243,239)]">
      {/* Header - Mesmo da Home */}
      <header className="w-full bg-[rgb(108,25,29)] flex py-4 flex-col items-center gap-2">
        <div className="w-full max-w-[1224px] mx-auto px-6">
          <div className="flex w-full justify-between items-center">
            <Logo />

            <div className="w-[336px] h-[40px] relative">
              <input
                type="text"
                placeholder="Buscar persianas, serviços, etc..."
                className="w-full h-full px-4 pr-10 rounded-lg border border-[rgb(200,190,191)] bg-white text-sm font-['Inter'] text-[rgb(119,105,106)] placeholder-[rgb(119,105,106)]"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgb(78,67,67)]" />
            </div>

            <div className="flex items-center gap-2">
              <button className="w-9 h-9 bg-white rounded-lg border border-[rgb(108,25,29)] flex items-center justify-center">
                <User className="w-3 h-3 text-[rgb(108,25,29)]" />
              </button>
              <button className="w-9 h-9 bg-white rounded-lg border border-[rgb(108,25,29)] flex items-center justify-center">
                <ShoppingCart className="w-3 h-3 text-[rgb(108,25,29)]" />
              </button>
            </div>
          </div>
        </div>

        <div className="w-full max-w-[1224px] mx-auto px-6">
          <nav className="flex w-full justify-center">
            <ul className="flex items-center gap-4 text-[rgb(241,237,237)] text-sm font-['Inter'] font-normal">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/produtos" className="hover:text-white transition-colors">Categorias</Link></li>
              <li><Link href={"/" as any} className="hover:text-white transition-colors">Guia rápido</Link></li>
              <li><Link href={"/" as any} className="hover:text-white transition-colors">Ambientes</Link></li>
              <li><Link href={"/" as any} className="hover:text-white transition-colors">Serviços</Link></li>
              <li><Link href={"/" as any} className="hover:text-white transition-colors">Mais procurados</Link></li>
              <li><Link href={"/" as any} className="hover:text-white transition-colors">Outros</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="w-full max-w-[1224px] mx-auto px-6 py-6">
        <div className="flex items-center gap-2 text-sm font-['Inter']">
          <Link href="/" className="text-gray-600 hover:text-[rgb(108,25,29)] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-[rgb(108,25,29)] font-medium">Produtos</span>
        </div>
      </div>

      {/* Main Content - Sidebar + Grid */}
      <div className="w-full max-w-[1224px] mx-auto px-6 pb-20">
        <div className="flex gap-6">

          {/* Sidebar de Filtros - 280px */}
          <aside className="w-[280px] flex-shrink-0">

            {/* Filtro: Buscar produtos */}
            <div className="bg-[rgb(241,237,237)] rounded-lg p-6 mb-6 border border-brand-neutral-800">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  className="w-full px-4 py-2 pr-10 rounded-lg border border-brand-neutral-800 text-sm font-['Inter'] text-black placeholder-gray-400 bg-white"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>

            {/* Filtro: Categorias */}
            <div className="bg-[rgb(241,237,237)] rounded-lg p-6 mb-6 border border-brand-neutral-800">
              <h3 className="font-['Inter'] font-semibold text-base text-[rgb(108,25,29)] mb-4">Categorias</h3>
              <div className="space-y-3">
                {['Sem Furos', 'Kitbox', 'Rolô', 'Romana', 'Cortinas', 'Double Vision', 'Trilhadas', 'Verticais'].map((category) => (
                  <label key={category} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(category)}
                      onChange={() => toggleFilter('categories', category)}
                      className="w-4 h-4 rounded border-[rgb(108,25,29)] text-[rgb(108,25,29)] focus:ring-[rgb(108,25,29)]"
                    />
                    <span className="text-sm font-['Inter'] text-black group-hover:text-[rgb(108,25,29)] transition-colors">
                      {category}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filtro: Ambientes */}
            <div className="bg-[rgb(241,237,237)] rounded-lg p-6 mb-6 border border-brand-neutral-800">
              <h3 className="font-['Inter'] font-semibold text-base text-[rgb(108,25,29)] mb-4">Ambientes</h3>
              <div className="space-y-3">
                {['Sala', 'Quarto', 'Cozinha', 'Banheiro', 'Escritório', 'Varanda e Sacada'].map((environment) => (
                  <label key={environment} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={filters.environments.includes(environment)}
                      onChange={() => toggleFilter('environments', environment)}
                      className="w-4 h-4 rounded border-[rgb(108,25,29)] text-[rgb(108,25,29)] focus:ring-[rgb(108,25,29)]"
                    />
                    <span className="text-sm font-['Inter'] text-black group-hover:text-[rgb(108,25,29)] transition-colors">
                      {environment}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filtro: Cor */}
            <div className="bg-[rgb(241,237,237)] rounded-lg p-6 mb-6 border border-brand-neutral-800">
              <h3 className="font-['Inter'] font-semibold text-base text-[rgb(108,25,29)] mb-4">Cor</h3>
              <div className="space-y-3">
                {[
                  { name: 'Branco', value: 'branco' },
                  { name: 'Cinza', value: 'cinza' },
                  { name: 'Bege', value: 'bege' },
                  { name: 'Marrom', value: 'marrom' },
                  { name: 'Preto', value: 'preto' }
                ].map((color) => (
                  <label key={color.value} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={filters.colors.includes(color.value)}
                      onChange={() => toggleFilter('colors', color.value)}
                      className="w-4 h-4 rounded border-[rgb(108,25,29)] text-[rgb(108,25,29)] focus:ring-[rgb(108,25,29)]"
                    />
                    <span className="text-sm font-['Inter'] text-black group-hover:text-[rgb(108,25,29)] transition-colors">
                      {color.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filtro: Material */}
            <div className="bg-[rgb(241,237,237)] rounded-lg p-6 border border-brand-neutral-800">
              <h3 className="font-['Inter'] font-semibold text-base text-[rgb(108,25,29)] mb-4">Material</h3>
              <div className="space-y-3">
                {[
                  { name: 'Madeira', value: 'madeira' },
                  { name: 'PVC', value: 'pvc' },
                  { name: 'Alumínio', value: 'aluminio' },
                  { name: 'Tecido', value: 'tecido' },
                  { name: 'Bambu', value: 'bambu' }
                ].map((material) => (
                  <label key={material.value} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={filters.materials.includes(material.value)}
                      onChange={() => toggleFilter('materials', material.value)}
                      className="w-4 h-4 rounded border-[rgb(108,25,29)] text-[rgb(108,25,29)] focus:ring-[rgb(108,25,29)]"
                    />
                    <span className="text-sm font-['Inter'] text-black group-hover:text-[rgb(108,25,29)] transition-colors">
                      {material.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Grid de Produtos */}
          <main className="flex-1">
            {/* Header: Título + Ordenação */}
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-[32px] font-['Cormorant_Garamond'] font-bold text-black">
                Todos os Produtos
              </h1>
              <select className="px-4 py-2 rounded-lg border border-[rgb(200,190,191)] text-sm font-['Inter'] text-gray-700 bg-white">
                <option>Mais relevantes</option>
                <option>Menor preço</option>
                <option>Maior preço</option>
                <option>Mais vendidos</option>
                <option>Lançamentos</option>
              </select>
            </div>

            {/* Grid 3x4 de Produtos */}
            <div className="grid grid-cols-3 gap-6 mb-12">
              {products.map((product) => {
                const isFavorite = favorites.includes(product.id)

                return (
                  <div
                    key={product.id}
                    className="flex p-6 flex-col justify-center items-center gap-2 rounded-xl border border-[rgb(200,190,191)] bg-[rgb(241,237,237)] hover:border-[rgb(108,25,29)] transition-colors cursor-pointer"
                  >
                    {/* Header do card */}
                    <div className="w-full flex justify-between items-start mb-2">
                      {product.badge ? (
                        <span className="px-3 py-1 bg-[rgb(184,115,51)] text-white text-xs font-['Inter'] rounded-full">
                          {product.badge}
                        </span>
                      ) : (
                        <div></div>
                      )}
                      <button
                        onClick={() => toggleFavorite(product.id)}
                        className="w-6 h-6 flex items-center justify-center transition-all hover:scale-110"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill={isFavorite ? "#B87333" : "none"}
                          stroke={isFavorite ? "#B87333" : "currentColor"}
                          strokeWidth="2"
                        >
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                      </button>
                    </div>

                    {/* Imagem do produto */}
                    <div className="w-full h-[224px] bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg mb-4 overflow-hidden">
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                        Produto {product.id}
                      </div>
                    </div>

                    {/* Informações */}
                    <div className="w-full flex flex-col gap-2">
                      <h3 className="text-base font-['Inter'] text-gray-800">
                        {product.name}
                      </h3>

                      <div className="flex justify-between items-center w-full">
                        <span className="text-lg font-['Inter'] font-semibold text-black">
                          {product.price}
                        </span>
                        <button className="w-6 h-6 flex items-center justify-center text-[rgb(108,25,29)]">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="9 18 15 12 9 6"></polyline>
                          </svg>
                        </button>
                      </div>

                      {/* Estrelas */}
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill={star <= product.rating ? "#B87333" : "none"}
                            stroke="#B87333"
                            strokeWidth="1.5"
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Paginação */}
            <div className="flex justify-center items-center gap-2">
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-[rgb(200,190,191)] text-gray-600 hover:bg-[rgb(108,25,29)] hover:text-white transition-colors">
                <ChevronRight className="w-5 h-5 rotate-180" />
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-[rgb(108,25,29)] text-white font-['Inter'] font-medium">
                1
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-[rgb(200,190,191)] text-gray-600 hover:bg-[rgb(108,25,29)] hover:text-white transition-colors font-['Inter']">
                2
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-[rgb(200,190,191)] text-gray-600 hover:bg-[rgb(108,25,29)] hover:text-white transition-colors font-['Inter']">
                3
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-[rgb(200,190,191)] text-gray-600 hover:bg-[rgb(108,25,29)] hover:text-white transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </main>
        </div>
      </div>

      {/* Footer - Mesmo da Home */}
      <footer className="bg-[rgb(108,25,29)] text-white">
        <div className="w-full bg-[rgb(88,20,24)] py-12">
          <div className="w-full max-w-[1224px] mx-auto px-6">
            <div className="flex justify-center gap-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="relative w-[220px] h-[220px] rounded-2xl overflow-hidden group cursor-pointer"
                >
                  <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800">
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-white/50 text-sm">Instagram {i}</div>
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="rgb(108,25,29)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full max-w-[1224px] mx-auto px-6 py-16">
          <div className="grid grid-cols-3 gap-16 mb-12">
            <div className="flex flex-col gap-6">
              <Logo />
              <div>
                <h3 className="font-['Inter'] font-semibold text-lg mb-4">Sobre nós</h3>
                <ul className="space-y-3 text-sm text-[rgb(241,237,237)]">
                  <li><Link href={"/" as any} className="hover:text-white transition-colors">Nossa história</Link></li>
                  <li><Link href={"/" as any} className="hover:text-white transition-colors">Nossa história</Link></li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="font-['Inter'] font-semibold text-lg mb-4">Nossos produtos</h3>
              <ul className="space-y-3 text-sm text-[rgb(241,237,237)]">
                <li><Link href={"/" as any} className="hover:text-white transition-colors">Cortinas</Link></li>
                <li><Link href={"/" as any} className="hover:text-white transition-colors">Rolos</Link></li>
                <li><Link href={"/" as any} className="hover:text-white transition-colors">Trilagem</Link></li>
                <li><Link href={"/" as any} className="hover:text-white transition-colors">Kitbox</Link></li>
                <li><Link href={"/" as any} className="hover:text-white transition-colors">Romana</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-['Inter'] font-semibold text-lg mb-4">Links rápidos</h3>
              <p className="text-sm text-[rgb(241,237,237)] leading-relaxed">
                Novas persianas chegaram! Descubra estilos exclusivos e transforme seus ambientes com design sob medida.
              </p>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8">
            <div className="flex justify-between items-center">
              <p className="text-sm text-[rgb(241,237,237)] font-['Inter']">
                © 2025 By Rosa Chic, All Rights Reserved.
              </p>
              <div className="flex gap-8 text-sm text-[rgb(241,237,237)]">
                <Link href={"/" as any} className="hover:text-white transition-colors">Termos e Condições</Link>
                <Link href={"/" as any} className="hover:text-white transition-colors">Política de privacidade</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
