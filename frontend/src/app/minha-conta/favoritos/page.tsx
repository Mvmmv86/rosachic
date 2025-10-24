'use client'

import { AccountLayout } from '@/components/AccountLayout'
import { useFavoritesStore } from '@/store/favorites-store'
import { useState, useEffect } from 'react'
import { getProductById, formatPrice, getImageUrl, type Product } from '@/lib/products'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'

export default function FavoritosPage() {
  const { favorites, toggleFavorite, isFavorite } = useFavoritesStore()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadFavoriteProducts()
  }, [favorites])

  const loadFavoriteProducts = async () => {
    try {
      setLoading(true)
      const promises = favorites.map(id => getProductById(id))
      const results = await Promise.allSettled(promises)
      const validProducts = results
        .filter((r): r is PromiseFulfilledResult<Product> => r.status === 'fulfilled')
        .map(r => r.value)
      setProducts(validProducts)
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <AccountLayout>
        <div className="flex items-center justify-center py-12">
          <div className="text-gray-500">Carregando favoritos...</div>
        </div>
      </AccountLayout>
    )
  }

  if (products.length === 0) {
    return (
      <AccountLayout>
        <div>
          <h1 className="font-sans text-2xl font-semibold text-black mb-6">
            Favoritos
          </h1>
          <div className="bg-white rounded-xl p-12 text-center">
            <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-['Inter'] text-gray-600 mb-2">Você ainda não tem favoritos</p>
            <p className="text-sm text-gray-500 mb-4">Navegue pelos produtos e adicione seus preferidos!</p>
            <Link
              href="/produtos"
              className="inline-block px-6 py-3 bg-[rgb(108,25,29)] text-white rounded-lg hover:bg-[rgb(88,20,24)] transition-colors"
            >
              Ver Produtos
            </Link>
          </div>
        </div>
      </AccountLayout>
    )
  }

  return (
    <AccountLayout>
      <div>
        <h1 className="font-sans text-2xl font-semibold text-black mb-6">
          Favoritos ({products.length})
        </h1>

        {/* Grid de Produtos */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {products.map((product) => {
            const favorite = isFavorite(product.id)
            const hasImage = product.imagens && product.imagens.length > 0

            return (
              <div
                key={product.id}
                className="flex p-6 flex-col justify-center items-center gap-2 rounded-xl border border-[rgb(200,190,191)] bg-[rgb(241,237,237)] hover:border-[rgb(108,25,29)] transition-colors"
              >
                {/* Header do card */}
                <div className="w-full flex justify-between items-start mb-2">
                  {product.isLancamento ? (
                    <span className="px-3 py-1 bg-[rgb(184,115,51)] text-white text-xs font-['Inter'] rounded-full">
                      Lançamento
                    </span>
                  ) : (
                    <div></div>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorite(product.id)
                    }}
                    className="w-6 h-6 flex items-center justify-center transition-all hover:scale-110"
                    aria-label="Remover dos favoritos"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill={favorite ? "#B87333" : "none"}
                      stroke={favorite ? "#B87333" : "currentColor"}
                      strokeWidth="2"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                  </button>
                </div>

                {/* Imagem do produto */}
                <Link href={`/produto/${product.id}`} className="w-full">
                  <div className="w-full h-[224px] bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg mb-4 overflow-hidden cursor-pointer">
                    {hasImage ? (
                      <img
                        src={getImageUrl(product.imagens[0])}
                        alt={product.modelo}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                        Sem imagem
                      </div>
                    )}
                  </div>
                </Link>

                {/* Informações */}
                <div className="w-full flex flex-col gap-2">
                  <Link href={`/produto/${product.id}`}>
                    <h3 className="text-base font-['Inter'] text-gray-800 hover:text-[rgb(108,25,29)] transition-colors cursor-pointer">
                      {product.modelo}
                    </h3>
                  </Link>

                  <div className="flex justify-between items-center w-full">
                    <span className="text-lg font-['Inter'] font-semibold text-black">
                      {formatPrice(product.valorM2)}/m²
                    </span>
                    <Link href={`/produto/${product.id}`} className="w-6 h-6 flex items-center justify-center text-[rgb(108,25,29)]">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </Link>
                  </div>

                  {/* Estrelas */}
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill={star <= 4 ? "#B87333" : "none"}
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
      </div>
    </AccountLayout>
  )
}
