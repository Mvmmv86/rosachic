'use client'

import Link from 'next/link'
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { useCartStore } from '@/store/cart-store'
import { getImageUrl } from '@/lib/products'

export default function CarrinhoPage() {
  const { items, updateQuantity, removeItem, getTotalPrice, getSubtotal, getTotalDiscount } = useCartStore()

  const subtotal = getSubtotal()
  const desconto = getTotalDiscount()
  const frete = 0 // Frete grátis para todos
  const total = getTotalPrice()

  return (
    <div className="min-h-screen bg-[rgb(241,237,237)]">
      {/* Main Content */}
      <div className="w-full max-w-[1224px] mx-auto px-6 py-8">
        <h1 className="text-[32px] font-['Inter'] font-bold text-black mb-8">Carrinho de Compras</h1>

        <div className="flex gap-6">
          {/* Lista de Produtos - Coluna Principal */}
          <div className="flex-1">
            {items.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center">
                <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-['Inter'] text-gray-600">Seu carrinho está vazio</p>
                <Link
                  href="/produtos"
                  className="inline-block mt-4 px-6 py-3 bg-[rgb(108,25,29)] text-white rounded-lg hover:bg-[rgb(88,20,24)] transition-colors"
                >
                  Continuar Comprando
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {items.map((item) => {
                  const itemTotal = item.pricing.totalFinal * item.quantity
                  const hasDiscount = item.pricing.desconto > 0

                  return (
                    <div
                      key={item.id}
                      className="bg-white rounded-xl p-6 flex gap-6 border border-[rgb(229,229,229)]"
                    >
                      {/* Imagem do Produto */}
                      <div className="w-[120px] h-[120px] rounded-lg bg-gradient-to-br from-gray-200 to-gray-300 flex-shrink-0 flex items-center justify-center overflow-hidden">
                        {item.product.imagens && item.product.imagens.length > 0 ? (
                          <img
                            src={getImageUrl(item.product.imagens[0])}
                            alt={item.product.modelo}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-xs text-gray-500">Produto</span>
                        )}
                      </div>

                      {/* Informações do Produto */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-lg font-['Inter'] font-semibold text-black mb-1">
                            {item.product.modelo}
                          </h3>
                          <p className="text-sm font-['Inter'] text-gray-600 mb-1">
                            Tamanho: {item.widthCm}cm x {item.heightCm}cm ({item.pricing.areaCobravel.toFixed(2)}m²)
                          </p>
                          {/* Opcionais selecionados */}
                          {(item.options.bando || item.options.motor || item.options.installation) && (
                            <div className="flex gap-2 mt-2">
                              {item.options.bando && (
                                <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">Bandô</span>
                              )}
                              {item.options.motor && (
                                <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded">Motor</span>
                              )}
                              {item.options.installation && (
                                <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded">Instalação</span>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          {/* Controles de Quantidade */}
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 rounded-lg border border-[rgb(217,217,217)] flex items-center justify-center hover:bg-gray-50 transition-colors"
                            >
                              <Minus className="w-4 h-4 text-gray-600" />
                            </button>
                            <span className="text-base font-['Inter'] font-medium text-black min-w-[40px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 rounded-lg border border-[rgb(217,217,217)] flex items-center justify-center hover:bg-gray-50 transition-colors"
                            >
                              <Plus className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>

                          {/* Preço */}
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              {hasDiscount && (
                                <p className="text-sm text-gray-500 line-through">
                                  R$ {(item.pricing.subtotal * item.quantity).toFixed(2).replace('.', ',')}
                                </p>
                              )}
                              <span className="text-xl font-['Inter'] font-bold text-[rgb(108,25,29)]">
                                R$ {itemTotal.toFixed(2).replace('.', ',')}
                              </span>
                            </div>

                            {/* Botão Remover */}
                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                              title="Remover item"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Resumo do Pedido - Sidebar */}
          <div className="w-[400px] flex-shrink-0">
            <div className="bg-white rounded-xl p-6 border border-[rgb(229,229,229)] sticky top-8">
              <h2 className="text-xl font-['Inter'] font-bold text-black mb-6">
                Resumo do Pedido
              </h2>

              <div className="flex flex-col gap-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-base font-['Inter'] text-gray-600">Subtotal</span>
                  <span className="text-base font-['Inter'] font-medium text-black">
                    R$ {subtotal.toFixed(2).replace('.', ',')}
                  </span>
                </div>

                {desconto > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-base font-['Inter'] text-gray-600">Desconto</span>
                    <span className="text-base font-['Inter'] font-medium text-green-600">
                      -R$ {desconto.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-base font-['Inter'] text-gray-600">Frete</span>
                  <span className="text-base font-['Inter'] font-medium text-[rgb(25,108,43)]">
                    Grátis
                  </span>
                </div>

                <div className="w-full h-px bg-[rgb(229,229,229)]"></div>

                <div className="flex justify-between items-center">
                  <span className="text-lg font-['Inter'] font-bold text-black">Total</span>
                  <span className="text-xl font-['Inter'] font-bold text-[rgb(108,25,29)]">
                    R$ {total.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>

              <Link
                href="/checkout/endereco"
                className={`w-full h-12 flex items-center justify-center rounded-lg font-['Inter'] font-medium transition-colors ${
                  items.length === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-[rgb(108,25,29)] text-white hover:bg-[rgb(88,20,24)]'
                }`}
                onClick={(e) => {
                  if (items.length === 0) e.preventDefault()
                }}
              >
                Finalizar Compra
              </Link>

              <Link
                href="/produtos"
                className="block w-full text-center mt-4 text-sm font-['Inter'] text-[rgb(108,25,29)] hover:underline"
              >
                Continuar Comprando
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[rgb(108,25,29)] text-white mt-20">
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