'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { Package, TrendingUp, DollarSign, ShoppingCart, Users, AlertTriangle } from 'lucide-react'

interface DashboardStats {
  sales: {
    total: { orders: number; revenue: number }
    today: { orders: number; revenue: number }
    thisMonth: { orders: number; revenue: number }
  }
  orders: {
    pending: number
    completed: number
    cancelled: number
    byStatus: Array<{ status: string; count: number }>
  }
  users: {
    total: number
    newThisMonth: number
  }
  products: {
    lowStock: number
  }
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const { data } = await api.get('/admin/dashboard')
      setStats(data)
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500">Carregando estatísticas...</div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-red-500">Erro ao carregar estatísticas</div>
      </div>
    )
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Bem-vindo ao painel administrativo Rosa Chic - Sistema atualizado
        </p>
      </div>

      {/* Vendas Stats */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Vendas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Hoje */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Hoje</p>
                <p className="text-3xl font-bold text-gray-900">{formatCurrency(stats.sales.today.revenue)}</p>
                <p className="text-sm text-gray-500 mt-1">{stats.sales.today.orders} pedidos</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <DollarSign className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          {/* Este Mês */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Este Mês</p>
                <p className="text-3xl font-bold text-gray-900">{formatCurrency(stats.sales.thisMonth.revenue)}</p>
                <p className="text-sm text-gray-500 mt-1">{stats.sales.thisMonth.orders} pedidos</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <TrendingUp className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          {/* Total */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Geral</p>
                <p className="text-3xl font-bold text-gray-900">{formatCurrency(stats.sales.total.revenue)}</p>
                <p className="text-sm text-gray-500 mt-1">{stats.sales.total.orders} pedidos</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <DollarSign className="text-purple-600" size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pedidos e Usuários */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Pedidos Pendentes</p>
              <p className="text-3xl font-bold text-orange-600">{stats.orders.pending}</p>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <ShoppingCart className="text-orange-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Pedidos Completos</p>
              <p className="text-3xl font-bold text-green-600">{stats.orders.completed}</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <Package className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Usuários</p>
              <p className="text-3xl font-bold text-blue-600">{stats.users.total}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <Users className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Estoque Baixo</p>
              <p className="text-3xl font-bold text-red-600">{stats.products.lowStock}</p>
            </div>
            <div className="bg-red-50 p-3 rounded-lg">
              <AlertTriangle className="text-red-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Ações Rápidas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/dashboard/vendas"
            className="flex items-center gap-3 p-4 rounded-lg border-2 border-green-200 hover:border-green-500 hover:bg-green-50 transition group"
          >
            <div className="bg-green-100 p-2 rounded-lg group-hover:bg-green-200 transition">
              <DollarSign className="text-green-700" size={20} />
            </div>
            <div>
              <p className="font-medium text-gray-900">Ver Vendas</p>
              <p className="text-sm text-gray-600">Relatório detalhado</p>
            </div>
          </a>

          <a
            href="/dashboard/pedidos"
            className="flex items-center gap-3 p-4 rounded-lg border-2 border-orange-200 hover:border-orange-500 hover:bg-orange-50 transition group"
          >
            <div className="bg-orange-100 p-2 rounded-lg group-hover:bg-orange-200 transition">
              <ShoppingCart className="text-orange-700" size={20} />
            </div>
            <div>
              <p className="font-medium text-gray-900">Gerenciar Pedidos</p>
              <p className="text-sm text-gray-600">{stats.orders.pending} pendentes</p>
            </div>
          </a>

          <a
            href="/dashboard/products"
            className="flex items-center gap-3 p-4 rounded-lg border-2 border-gray-200 hover:border-gray-400 hover:bg-gray-50 transition group"
          >
            <div className="bg-gray-100 p-2 rounded-lg group-hover:bg-gray-200 transition">
              <Package className="text-gray-700" size={20} />
            </div>
            <div>
              <p className="font-medium text-gray-900">Ver Produtos</p>
              <p className="text-sm text-gray-600">Gerenciar estoque</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}
