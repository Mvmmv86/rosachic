'use client'

import { AccountLayout } from '@/components/AccountLayout'

export default function FavoritosPage() {
  const produtos = [
    {
      id: 1,
      nome: 'Persiana Rolô Tela Solar 5% - Branca',
      categoria: 'Cortinas',
      preco: 320.00,
      badge: 'Lançamento',
      rating: 4.5,
      isFavorito: true,
      imagem: '/product-placeholder.jpg'
    },
    {
      id: 2,
      nome: 'Persiana Rolô Tela Solar 5% - Branca',
      categoria: 'Cortinas',
      preco: 320.00,
      badge: 'Lançamento',
      rating: 4.5,
      isFavorito: true,
      imagem: '/product-placeholder.jpg'
    },
    {
      id: 3,
      nome: 'Persiana Rolô Tela Solar 5% - Branca',
      categoria: 'Cortinas',
      preco: 320.00,
      badge: 'Lançamento',
      rating: 4.5,
      isFavorito: true,
      imagem: '/product-placeholder.jpg'
    },
    {
      id: 4,
      nome: 'Persiana Rolô Tela Solar 5% - Branca',
      categoria: 'Cortinas',
      preco: 320.00,
      badge: 'Lançamento',
      rating: 4.5,
      isFavorito: true,
      imagem: '/product-placeholder.jpg'
    },
    {
      id: 5,
      nome: 'Persiana Rolô Tela Solar 5% - Branca',
      categoria: 'Cortinas',
      preco: 320.00,
      badge: 'Lançamento',
      rating: 4.5,
      isFavorito: true,
      imagem: '/product-placeholder.jpg'
    },
    {
      id: 6,
      nome: 'Persiana Rolô Tela Solar 5% - Branca',
      categoria: 'Cortinas',
      preco: 320.00,
      badge: 'Lançamento',
      rating: 4.5,
      isFavorito: true,
      imagem: '/product-placeholder.jpg'
    },
  ]

  return (
    <AccountLayout>
      <div>
        <h1 className="font-sans text-2xl font-semibold text-black mb-6">
          Favoritos
        </h1>

        {/* Grid de Produtos */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {produtos.map((produto) => {
            const isFavorite = produto.isFavorito
            return (
              <div
                key={produto.id}
                className="flex p-6 flex-col justify-center items-center gap-2 rounded-xl border border-[rgb(200,190,191)] bg-[rgb(241,237,237)] hover:border-[rgb(108,25,29)] transition-colors cursor-pointer"
              >
                {/* Header do card */}
                <div className="w-full flex justify-between items-start mb-2">
                  {produto.badge ? (
                    <span className="px-3 py-1 bg-[rgb(184,115,51)] text-white text-xs font-['Inter'] rounded-full">
                      {produto.badge}
                    </span>
                  ) : (
                    <div></div>
                  )}
                  <button
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
                    Produto {produto.id}
                  </div>
                </div>

                {/* Informações */}
                <div className="w-full flex flex-col gap-2">
                  <h3 className="text-base font-['Inter'] text-gray-800">
                    {produto.nome}
                  </h3>

                  <div className="flex justify-between items-center w-full">
                    <span className="text-lg font-['Inter'] font-semibold text-black">
                      R$ {produto.preco.toFixed(2).replace('.', ',')}
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
                        fill={star <= Math.floor(produto.rating) ? "#B87333" : "none"}
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
        <div className="flex items-center justify-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center bg-[rgb(108,25,29)] text-white font-sans text-sm font-medium rounded-lg">
            1
          </button>
          <button className="w-10 h-10 flex items-center justify-center border border-gray-300 text-gray-700 font-sans text-sm font-medium rounded-lg hover:bg-gray-50">
            2
          </button>
          <button className="w-10 h-10 flex items-center justify-center border border-gray-300 text-gray-700 font-sans text-sm font-medium rounded-lg hover:bg-gray-50">
            3
          </button>
          <span className="px-2 text-gray-500">...</span>
        </div>
      </div>
    </AccountLayout>
  )
}
