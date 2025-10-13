'use client'

import Link from 'next/link'
import { Search, ShoppingCart, User, ChevronDown } from 'lucide-react'
import { Logo } from './Logo'
import { useState, useEffect, useRef } from 'react'

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(true) // TODO: Integrar com auth real
  const [userName, setUserName] = useState('Adriano') // TODO: Pegar do contexto de auth
  const [cartItemsCount, setCartItemsCount] = useState(3) // TODO: Pegar do contexto de carrinho

  // Estados para controlar abertura dos menus
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isCartMenuOpen, setIsCartMenuOpen] = useState(false)
  const [isCategoriasMenuOpen, setIsCategoriasMenuOpen] = useState(false)
  const [isAmbientesMenuOpen, setIsAmbientesMenuOpen] = useState(false)

  // Refs para detectar clicks fora
  const userMenuRef = useRef<HTMLDivElement>(null)
  const cartMenuRef = useRef<HTMLDivElement>(null)
  const categoriasMenuRef = useRef<HTMLLIElement>(null)
  const ambientesMenuRef = useRef<HTMLLIElement>(null)

  // Fechar menus ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false)
      }
      if (cartMenuRef.current && !cartMenuRef.current.contains(event.target as Node)) {
        setIsCartMenuOpen(false)
      }
      if (categoriasMenuRef.current && !categoriasMenuRef.current.contains(event.target as Node)) {
        setIsCategoriasMenuOpen(false)
      }
      if (ambientesMenuRef.current && !ambientesMenuRef.current.contains(event.target as Node)) {
        setIsAmbientesMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="w-full bg-[rgb(108,25,29)] flex py-4 flex-col items-center gap-2 relative">
      {/* Container centralizado 1224px */}
      <div className="w-full max-w-[1224px] mx-auto px-6">
        {/* Frame 55 - display: flex, justify-content: space-between, align-items: center */}
        <div className="flex w-full justify-between items-center">
          {/* Logo - 50x50 circular (esquerda) */}
          <Logo />

          {/* Campo de busca - 336x40 (centro) */}
          <div className="w-[336px] h-[40px] relative">
            <input
              type="text"
              placeholder="Buscar persianas, serviços, etc..."
              className="w-full h-full px-4 pr-10 rounded-lg border border-[rgb(200,190,191)] bg-white text-sm font-['Inter'] text-[rgb(119,105,106)] placeholder-[rgb(119,105,106)]"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgb(78,67,67)]" />
          </div>

          {/* Ícones direita - 80x36 */}
          <div className="flex items-center gap-2">
            {/* Botão User - 36x36 QUADRADO com rounded-lg + Dropdown */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => {
                  console.log('User menu clicked! Current state:', isUserMenuOpen)
                  setIsUserMenuOpen(!isUserMenuOpen)
                }}
                className="w-9 h-9 bg-white rounded-lg border border-[rgb(108,25,29)] flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <User className="w-3 h-3 text-[rgb(108,25,29)]" />
              </button>

              {/* Dropdown User */}
              {isUserMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-[200px] bg-white rounded-lg shadow-lg transition-all duration-200 z-50 border border-gray-200">
                  {isLoggedIn ? (
                    // Menu para usuário logado
                    <div className="py-2">
                      <div className="px-4 py-2 border-b border-gray-200">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-[rgb(108,25,29)] flex items-center justify-center">
                            <User className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-sm font-medium text-gray-800">{userName}</span>
                          <ChevronDown className="w-4 h-4 text-gray-500 ml-auto" />
                        </div>
                      </div>
                      <Link href="/minha-conta" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                        Minha Conta
                      </Link>
                      <Link href="/minha-conta/pedidos" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                        Meus Pedidos
                      </Link>
                      <Link href="/minha-conta/favoritos" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                        Favoritos
                      </Link>
                      <Link href="/minha-conta/enderecos" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                        Endereços
                      </Link>
                      <Link href="/minha-conta/pagamentos" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                        Pagamentos
                      </Link>
                      <div className="border-t border-gray-200 mt-2 pt-2">
                        <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors">
                          Sair
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Menu para usuário não logado
                    <div className="py-2">
                      <Link href="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                        Entre
                      </Link>
                      <Link href="/cadastro" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                        Cadastre-se
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Botão Cart - 36x36 QUADRADO com rounded-lg + Dropdown */}
            <div className="relative" ref={cartMenuRef}>
              <button
                onClick={() => {
                  console.log('Cart menu clicked! Current state:', isCartMenuOpen)
                  setIsCartMenuOpen(!isCartMenuOpen)
                }}
                className="w-9 h-9 bg-white rounded-lg border border-[rgb(108,25,29)] flex items-center justify-center hover:bg-gray-50 transition-colors relative"
              >
                <ShoppingCart className="w-3 h-3 text-[rgb(108,25,29)]" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                    {cartItemsCount}
                  </span>
                )}
              </button>

              {/* Dropdown Cart Preview */}
              {isCartMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-[320px] bg-white rounded-lg shadow-lg transition-all duration-200 z-50 border border-gray-200">
                  {cartItemsCount > 0 ? (
                    <div className="py-2">
                      <div className="px-4 py-2 border-b border-gray-200">
                        <h3 className="text-sm font-semibold text-gray-800">Seu Carrinho ({cartItemsCount} itens)</h3>
                      </div>
                      {/* TODO: Mapear itens do carrinho real */}
                      <div className="max-h-[300px] overflow-y-auto">
                        <div className="px-4 py-3 hover:bg-gray-50 transition-colors">
                          <div className="flex gap-3">
                            <div className="w-16 h-16 bg-gray-200 rounded-md flex-shrink-0"></div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-800 line-clamp-2">Persiana Rolô Blackout 1,20x1,60m</p>
                              <p className="text-xs text-gray-500 mt-1">Qtd: 1</p>
                              <p className="text-sm font-semibold text-[rgb(108,25,29)] mt-1">R$ 249,90</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="border-t border-gray-200 px-4 py-3">
                        <div className="flex justify-between mb-3">
                          <span className="text-sm font-medium text-gray-700">Subtotal:</span>
                          <span className="text-sm font-bold text-gray-900">R$ 749,70</span>
                        </div>
                        <Link href="/carrinho" className="block w-full bg-[rgb(108,25,29)] text-white text-center py-2 rounded-lg text-sm font-medium hover:bg-[rgb(88,20,24)] transition-colors">
                          Ver Carrinho
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="px-4 py-8 text-center">
                      <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">Seu carrinho está vazio</p>
                      <Link href="/produtos" className="inline-block mt-3 text-sm text-[rgb(108,25,29)] hover:underline">
                        Continuar comprando
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Frame 12 - Navegação CENTRALIZADA abaixo do input */}
      <div className="w-full max-w-[1224px] mx-auto px-6">
        <nav className="flex w-full justify-center">
          <ul className="flex items-center gap-4 text-[rgb(241,237,237)] text-sm font-['Inter'] font-normal">
            <li>
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
            </li>

            {/* Categorias com Mega Menu */}
            <li className="relative" ref={categoriasMenuRef}>
              <button
                onClick={() => {
                  console.log('Categorias menu clicked! Current state:', isCategoriasMenuOpen)
                  setIsCategoriasMenuOpen(!isCategoriasMenuOpen)
                }}
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                Categorias
                <ChevronDown className="w-3 h-3" />
              </button>

              {/* Mega Menu Categorias */}
              {isCategoriasMenuOpen && (
                <div className="absolute left-0 top-full mt-2 w-[600px] bg-white rounded-lg shadow-lg transition-all duration-200 z-50 border border-gray-200">
                  <div className="p-6 grid grid-cols-3 gap-6">
                    {/* Coluna 1 - Sem Furos */}
                    <div>
                      <h3 className="text-sm font-bold text-[rgb(108,25,29)] mb-3 pb-2 border-b border-gray-200">Sem Furos</h3>
                      <ul className="space-y-2">
                        <li><Link href="/produtos?categoria=kitbox" className="text-sm text-gray-700 hover:text-[rgb(108,25,29)] transition-colors">Kitbox</Link></li>
                        <li><Link href="/produtos?categoria=rolo" className="text-sm text-gray-700 hover:text-[rgb(108,25,29)] transition-colors">Rolô</Link></li>
                        <li><Link href="/produtos?categoria=romana" className="text-sm text-gray-700 hover:text-[rgb(108,25,29)] transition-colors">Romana</Link></li>
                        <li><Link href="/produtos?categoria=cortinas" className="text-sm text-gray-700 hover:text-[rgb(108,25,29)] transition-colors">Cortinas</Link></li>
                        <li><Link href="/produtos?categoria=double-vision" className="text-sm text-gray-700 hover:text-[rgb(108,25,29)] transition-colors">Double Vision</Link></li>
                      </ul>
                    </div>

                    {/* Coluna 2 - Quarto */}
                    <div>
                      <h3 className="text-sm font-bold text-[rgb(108,25,29)] mb-3 pb-2 border-b border-gray-200">Ambientes</h3>
                      <ul className="space-y-2">
                        <li><Link href="/produtos?ambiente=quarto" className="text-sm text-gray-700 hover:text-[rgb(108,25,29)] transition-colors">Quarto</Link></li>
                        <li><Link href="/produtos?ambiente=sala" className="text-sm text-gray-700 hover:text-[rgb(108,25,29)] transition-colors">Sala</Link></li>
                        <li><Link href="/produtos?ambiente=cozinha" className="text-sm text-gray-700 hover:text-[rgb(108,25,29)] transition-colors">Cozinha</Link></li>
                        <li><Link href="/produtos?ambiente=escritorio" className="text-sm text-gray-700 hover:text-[rgb(108,25,29)] transition-colors">Escritório</Link></li>
                        <li><Link href="/produtos?ambiente=varanda" className="text-sm text-gray-700 hover:text-[rgb(108,25,29)] transition-colors">Varanda e Sacada</Link></li>
                        <li><Link href="/produtos?ambiente=banheiro" className="text-sm text-gray-700 hover:text-[rgb(108,25,29)] transition-colors">Banheiro</Link></li>
                      </ul>
                    </div>

                    {/* Coluna 3 - Montagem */}
                    <div>
                      <h3 className="text-sm font-bold text-[rgb(108,25,29)] mb-3 pb-2 border-b border-gray-200">Serviços</h3>
                      <ul className="space-y-2">
                        <li><Link href="/servicos#montagem" className="text-sm text-gray-700 hover:text-[rgb(108,25,29)] transition-colors">Montagem</Link></li>
                        <li><Link href="/servicos#limpeza" className="text-sm text-gray-700 hover:text-[rgb(108,25,29)] transition-colors">Limpeza</Link></li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </li>

            <li>
              <Link href="/guia-rapido" className="hover:text-white transition-colors">Guia rápido</Link>
            </li>

            {/* Ambientes com Submenu */}
            <li className="relative" ref={ambientesMenuRef}>
              <button
                onClick={() => setIsAmbientesMenuOpen(!isAmbientesMenuOpen)}
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                Ambientes
                <ChevronDown className="w-3 h-3" />
              </button>

              {/* Submenu Ambientes */}
              {isAmbientesMenuOpen && (
                <div className="absolute left-0 top-full mt-2 w-[200px] bg-white rounded-lg shadow-lg transition-all duration-200 z-50 border border-gray-200">
                  <div className="py-2">
                    <Link href="/produtos?ambiente=quarto" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Quarto</Link>
                    <Link href="/produtos?ambiente=sala" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Sala</Link>
                    <Link href="/produtos?ambiente=cozinha" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Cozinha</Link>
                    <Link href="/produtos?ambiente=escritorio" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Escritório</Link>
                    <Link href="/produtos?ambiente=varanda" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Varanda e Sacada</Link>
                    <Link href="/produtos?ambiente=banheiro" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Banheiro</Link>
                  </div>
                </div>
              )}
            </li>

            <li>
              <Link href="/servicos" className="hover:text-white transition-colors">Serviços</Link>
            </li>
            <li>
              <Link href="/produtos?filtro=mais-procurados" className="hover:text-white transition-colors">Mais procurados</Link>
            </li>
            <li>
              <Link href="/produtos" className="hover:text-white transition-colors">Outros</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
