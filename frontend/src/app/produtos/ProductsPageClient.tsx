'use client'

import Link from 'next/link'
import { Search, ChevronRight } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { getActiveProducts, formatPrice, getImageUrl, type Product } from '@/lib/products'

export function ProductsPageClient() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [favorites, setFavorites] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    environments: [] as string[],
    materials: [] as string[],
    luminosidade: [] as string[]
  })

  // Aplicar filtros da URL ao carregar
  useEffect(() => {
    const ambiente = searchParams.get('ambiente')
    const material = searchParams.get('material')

    const newFilters = {
      environments: [] as string[],
      materials: [] as string[],
      luminosidade: [] as string[]
    }

    if (ambiente) {
      // Normalizar: primeira letra maiúscula
      const ambienteNorm = ambiente.charAt(0).toUpperCase() + ambiente.slice(1).toLowerCase()
      newFilters.environments = [ambienteNorm]
    }

    if (material) {
      const materialNorm = material.charAt(0).toUpperCase() + material.slice(1).toLowerCase()
      newFilters.materials = [materialNorm]
    }

    setFilters(newFilters)
  }, [searchParams])

  // Buscar produtos da API
  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await getActiveProducts()
      setProducts(response.data)
    } catch (error) {
      console.error('Erro ao buscar produtos:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleFavorite = (productId: string) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const toggleFilter = (type: 'environments' | 'materials' | 'luminosidade', value: string) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter(v => v !== value)
        : [...prev[type], value]
    }))
  }

  // Filtrar produtos
  const filteredProducts = products.filter(product => {
    // Filtro de busca
    if (searchTerm) {
      const search = searchTerm.toLowerCase()
      if (
        !product.modelo.toLowerCase().includes(search) &&
        !product.descricao.toLowerCase().includes(search) &&
        !product.codigo.toLowerCase().includes(search)
      ) {
        return false
      }
    }

    // Filtro de material
    if (filters.materials.length > 0) {
      if (!filters.materials.some(m => m.toLowerCase() === product.material.toLowerCase())) {
        return false
      }
    }

    // Filtro de luminosidade
    if (filters.luminosidade.length > 0) {
      if (!filters.luminosidade.some(l => l.toLowerCase() === product.luminosidade.toLowerCase())) {
        return false
      }
    }

    // Filtro de ambientes
    if (filters.environments.length > 0) {
      if (!filters.environments.some(env =>
        product.ambientes.some(amb => amb.toLowerCase() === env.toLowerCase())
      )) {
        return false
      }
    }

    return true
  })

  return (
    <div className="min-h-screen bg-[rgb(247,243,239)]">
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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 pr-10 rounded-lg border border-brand-neutral-800 text-sm font-['Inter'] text-black placeholder-gray-400 bg-white"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>

            {/* Filtro: Luminosidade */}
            <div className="bg-[rgb(241,237,237)] rounded-lg p-6 mb-6 border border-brand-neutral-800">
              <h3 className="font-['Inter'] font-semibold text-base text-[rgb(108,25,29)] mb-4">Luminosidade</h3>
              <div className="space-y-3">
                {['Translucida', 'Blackout'].map((lum) => (
                  <label key={lum} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={filters.luminosidade.includes(lum)}
                      onChange={() => toggleFilter('luminosidade', lum)}
                      className="w-4 h-4 rounded border-[rgb(108,25,29)] text-[rgb(108,25,29)] focus:ring-[rgb(108,25,29)]"
                    />
                    <span className="text-sm font-['Inter'] text-black group-hover:text-[rgb(108,25,29)] transition-colors">
                      {lum}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filtro: Ambientes */}
            <div className="bg-[rgb(241,237,237)] rounded-lg p-6 mb-6 border border-brand-neutral-800">
              <h3 className="font-['Inter'] font-semibold text-base text-[rgb(108,25,29)] mb-4">Ambientes</h3>
              <div className="space-y-3">
                {['Sala', 'Quarto', 'Cozinha', 'Banheiro', 'Escritório', 'Varanda'].map((environment) => (
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

            {/* Filtro: Material */}
            <div className="bg-[rgb(241,237,237)] rounded-lg p-6 border border-brand-neutral-800">
              <h3 className="font-['Inter'] font-semibold text-base text-[rgb(108,25,29)] mb-4">Material</h3>
              <div className="space-y-3">
                {['Tecido', 'Madeira', 'PVC', 'Alumínio', 'Bambu'].map((material) => (
                  <label key={material} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={filters.materials.includes(material)}
                      onChange={() => toggleFilter('materials', material)}
                      className="w-4 h-4 rounded border-[rgb(108,25,29)] text-[rgb(108,25,29)] focus:ring-[rgb(108,25,29)]"
                    />
                    <span className="text-sm font-['Inter'] text-black group-hover:text-[rgb(108,25,29)] transition-colors">
                      {material}
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
                {filters.environments.length > 0 || filters.materials.length > 0
                  ? 'Produtos Filtrados'
                  : 'Todos os Produtos'}
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
            {loading ? (
              <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-gray-500 text-lg">Carregando produtos...</div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <div className="text-gray-500 text-lg">Nenhum produto encontrado</div>
                <button
                  onClick={() => setFilters({ environments: [], materials: [], luminosidade: [] })}
                  className="text-sm text-[rgb(108,25,29)] hover:underline"
                >
                  Limpar filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-6 mb-12">
                {filteredProducts.map((product) => {
                  const isFavorite = favorites.includes(product.id)
                  const hasImage = product.imagens && product.imagens.length > 0

                  return (
                    <Link
                      href={`/produto/${product.id}`}
                      key={product.id}
                      className="flex p-6 flex-col justify-center items-center gap-2 rounded-xl border border-[rgb(200,190,191)] bg-[rgb(241,237,237)] hover:border-[rgb(108,25,29)] transition-colors cursor-pointer"
                    >
                      {/* Header do card */}
                      <div className="w-full flex justify-between items-start mb-2">
                        <div className="flex flex-wrap gap-1">
                          <span className="px-2 py-1 bg-[rgb(108,25,29)] text-white text-xs font-['Inter'] rounded">
                            {product.material}
                          </span>
                          <span className="px-2 py-1 bg-gray-600 text-white text-xs font-['Inter'] rounded">
                            {product.luminosidade}
                          </span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            toggleFavorite(product.id)
                          }}
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
                        {hasImage ? (
                          <img
                            src={getImageUrl(product.imagens[0])}
                            alt={product.modelo}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                            Sem imagem
                          </div>
                        )}
                      </div>

                      {/* Informações */}
                      <div className="w-full flex flex-col gap-2">
                        <h3 className="text-base font-['Inter'] text-gray-800">
                          {product.modelo}
                        </h3>
                        <p className="text-xs text-gray-600 line-clamp-2">
                          {product.descricao}
                        </p>

                        <div className="flex justify-between items-center w-full mt-2">
                          <span className="text-lg font-['Inter'] font-semibold text-black">
                            {formatPrice(product.valorM2)}/m²
                          </span>
                          <div className="w-6 h-6 flex items-center justify-center text-[rgb(108,25,29)]">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                          </div>
                        </div>

                        {/* Ambientes */}
                        {product.ambientes.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {product.ambientes.slice(0, 3).map((amb) => (
                              <span key={amb} className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                                {amb}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}

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
