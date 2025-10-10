'use client'

import Link from 'next/link'
import { Search, ShoppingCart, User } from 'lucide-react'
import { Logo } from './Logo'

export function Header() {
  return (
    <header className="w-full bg-[rgb(108,25,29)] flex py-4 flex-col items-center gap-2">
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
            {/* Botão User - 36x36 QUADRADO com rounded-lg */}
            <Link href="/minha-conta" className="w-9 h-9 bg-white rounded-lg border border-[rgb(108,25,29)] flex items-center justify-center hover:bg-gray-50 transition-colors">
              <User className="w-3 h-3 text-[rgb(108,25,29)]" />
            </Link>
            {/* Botão Cart - 36x36 QUADRADO com rounded-lg */}
            <Link href="/carrinho" className="w-9 h-9 bg-white rounded-lg border border-[rgb(108,25,29)] flex items-center justify-center hover:bg-gray-50 transition-colors">
              <ShoppingCart className="w-3 h-3 text-[rgb(108,25,29)]" />
            </Link>
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
            <li>
              <Link href="/produtos" className="hover:text-white transition-colors">Categorias</Link>
            </li>
            <li>
              <Link href="/" className="hover:text-white transition-colors">Guia rápido</Link>
            </li>
            <li>
              <Link href="/" className="hover:text-white transition-colors">Ambientes</Link>
            </li>
            <li>
              <Link href="/" className="hover:text-white transition-colors">Serviços</Link>
            </li>
            <li>
              <Link href="/" className="hover:text-white transition-colors">Mais procurados</Link>
            </li>
            <li>
              <Link href="/" className="hover:text-white transition-colors">Outros</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
