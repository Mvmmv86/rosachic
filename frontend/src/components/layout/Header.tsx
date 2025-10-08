'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, ShoppingBag, User, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigation = [
    { name: 'Persinas', href: '/persianas' },
    { name: 'Cortinas', href: '/cortinas' },
    { name: 'Toldos', href: '/toldos' },
    { name: 'Sobre', href: '/sobre' },
    { name: 'Contato', href: '/contato' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-brand-cream/95 backdrop-blur supports-[backdrop-filter]:bg-brand-cream/90">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-h2 font-serif font-bold text-brand-dark">Rosa Chic</span>
            <span className="text-small text-brand-neutral-600">Persianas</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-body text-brand-dark hover:text-brand-neutral-700 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" aria-label="Buscar">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Conta">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Carrinho">
              <ShoppingBag className="h-5 w-5" />
              <span className="sr-only">Carrinho</span>
            </Button>
            <Button variant="primary" size="sm">
              Orçamento
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t py-4">
            <nav className="flex flex-col space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-body text-brand-dark hover:text-brand-neutral-700 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex items-center space-x-3 pt-3 border-t">
                <Button variant="ghost" size="icon" aria-label="Buscar">
                  <Search className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Conta">
                  <User className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Carrinho">
                  <ShoppingBag className="h-5 w-5" />
                </Button>
                <Button variant="primary" size="sm" className="flex-1">
                  Orçamento
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}