'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { User, Package, Heart, MapPin, CreditCard, ChevronRight } from 'lucide-react'

interface AccountLayoutProps {
  children: React.ReactNode
}

export function AccountLayout({ children }: AccountLayoutProps) {
  const pathname = usePathname()

  const menuItems = [
    { href: '/minha-conta', label: 'Minha conta', icon: User },
    { href: '/minha-conta/pedidos', label: 'Meus pedidos', icon: Package },
    { href: '/minha-conta/favoritos', label: 'Favoritos', icon: Heart },
    { href: '/minha-conta/enderecos', label: 'Endereços', icon: MapPin },
    { href: '/minha-conta/pagamentos', label: 'Pagamentos', icon: CreditCard },
  ]

  return (
    <div className="min-h-screen bg-[rgb(247,243,239)] flex flex-col">
      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-[1224px] mx-auto px-6 py-12">
          <div className="flex gap-8">
            {/* Sidebar Menu */}
            <aside className="w-64 flex-shrink-0">
              <div className="bg-[rgb(241,237,237)] rounded-lg shadow-sm p-6">
                <h2 className="font-sans text-lg font-semibold text-black mb-4">Minha Conta</h2>
                <nav className="space-y-2">
                  {menuItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.href}
                        href={item.href as any}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg font-sans text-sm transition-colors ${
                          isActive
                            ? 'bg-[rgb(108,25,29)] text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Icon size={20} />
                        <span className="flex-1">{item.label}</span>
                        {isActive && <ChevronRight size={16} />}
                      </Link>
                    )
                  })}
                </nav>
              </div>
            </aside>

            {/* Content Area */}
            <div className="flex-1">
              {children}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[rgb(108,25,29)] py-12 mt-auto">
        <div className="max-w-[1224px] mx-auto px-6">
          <div className="flex gap-4 mb-8 overflow-x-auto">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="relative flex-shrink-0 w-[180px] h-[180px] rounded-lg overflow-hidden bg-gray-700">
                <div className="absolute inset-0 flex items-center justify-center">
                  {i === 3 && (
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-8 text-white">
            <div>
              <div className="mb-4">
                <img
                  src="/rosa-chic-logo.png"
                  alt="Rosa Chic"
                  className="w-[50px] h-[50px] rounded-full object-contain flex-shrink-0"
                />
              </div>
              <h3 className="font-serif text-lg font-semibold mb-2">Sobre nós</h3>
              <ul className="space-y-1 font-sans text-sm">
                <li>Nossa história</li>
                <li>Nossa história</li>
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold mb-2">Nossos produtos</h3>
              <ul className="space-y-1 font-sans text-sm">
                <li>Cortinas</li>
                <li>Rolos</li>
                <li>Montagem</li>
                <li>Kitbox</li>
                <li>Romana</li>
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold mb-2">Links rápidos</h3>
              <p className="font-sans text-sm">
                Novas persianas chegaram! Descubra estilos exclusivos e transforme seus ambientes com design sob medida.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
