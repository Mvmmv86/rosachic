'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { LayoutDashboard, Package, Users, LogOut, Menu, X, ShoppingCart, TrendingUp, Settings, MessageSquare } from 'lucide-react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    const userData = localStorage.getItem('admin_user')

    if (!token || !userData) {
      router.push('/login')
      return
    }

    try {
      setUser(JSON.parse(userData))
    } catch (error) {
      router.push('/login')
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
    router.push('/login')
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-brand-maroon-700">Carregando...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg bg-white shadow-md text-brand-maroon-700"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-brand-maroon-700">
              Rosa Chic
            </h1>
            <p className="text-sm text-gray-600 mt-1">Painel Admin</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            <a
              href="/dashboard"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-brand-maroon-50 hover:text-brand-maroon-700 transition"
            >
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </a>

            <a
              href="/dashboard/vendas"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-brand-maroon-50 hover:text-brand-maroon-700 transition"
            >
              <TrendingUp size={20} />
              <span>Vendas</span>
            </a>

            <a
              href="/dashboard/pedidos"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-brand-maroon-50 hover:text-brand-maroon-700 transition"
            >
              <ShoppingCart size={20} />
              <span>Pedidos</span>
            </a>

            <a
              href="/dashboard/products"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-brand-maroon-50 hover:text-brand-maroon-700 transition"
            >
              <Package size={20} />
              <span>Produtos</span>
            </a>

            <a
              href="/dashboard/clientes"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-brand-maroon-50 hover:text-brand-maroon-700 transition"
            >
              <Users size={20} />
              <span>Clientes</span>
            </a>

            <a
              href="/dashboard/suporte/ia"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-brand-maroon-50 hover:text-brand-maroon-700 transition"
            >
              <MessageSquare size={20} />
              <span>Suporte IA</span>
            </a>

            <div className="pt-4 mt-4 border-t border-gray-200">
              <p className="text-xs font-semibold text-gray-400 px-4 mb-2">CONFIGURAÇÕES</p>
              <a
                href="/checkout-config"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-brand-maroon-50 hover:text-brand-maroon-700 transition"
              >
                <Settings size={20} />
                <span>Pagamentos</span>
              </a>
            </div>
          </nav>

          {/* User info & Logout */}
          <div className="p-4 border-t border-gray-200">
            <div className="mb-3">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
            >
              <LogOut size={18} />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="lg:ml-64 min-h-screen">
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
