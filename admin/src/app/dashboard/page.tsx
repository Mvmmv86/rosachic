'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { Package, TrendingUp, Eye, Star } from 'lucide-react'

interface Stats {
  total: number
  active: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({ total: 0, active: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const { data } = await api.get('/products')
      const products = data.data || []
      const active = products.filter((p: any) => p.ativo).length
      setStats({ total: products.length, active })
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Total de Produtos',
      value: stats.total,
      icon: Package,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Produtos Ativos',
      value: stats.active,
      icon: TrendingUp,
      color: 'bg-green-500',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Produtos Inativos',
      value: stats.total - stats.active,
      icon: Eye,
      color: 'bg-orange-500',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500">Carregando estatísticas...</div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Bem-vindo ao painel administrativo Rosa Chic
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{card.title}</p>
                <p className="text-3xl font-bold text-gray-900">{card.value}</p>
              </div>
              <div className={`${card.bgColor} p-3 rounded-lg`}>
                <card.icon className={`${card.textColor}`} size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Ações Rápidas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="/dashboard/products/new"
            className="flex items-center gap-3 p-4 rounded-lg border-2 border-brand-maroon-200 hover:border-brand-maroon-500 hover:bg-brand-maroon-50 transition group"
          >
            <div className="bg-brand-maroon-100 p-2 rounded-lg group-hover:bg-brand-maroon-200 transition">
              <Package className="text-brand-maroon-700" size={20} />
            </div>
            <div>
              <p className="font-medium text-gray-900">Adicionar Produto</p>
              <p className="text-sm text-gray-600">Cadastrar novo produto</p>
            </div>
          </a>

          <a
            href="/dashboard/products"
            className="flex items-center gap-3 p-4 rounded-lg border-2 border-gray-200 hover:border-gray-400 hover:bg-gray-50 transition group"
          >
            <div className="bg-gray-100 p-2 rounded-lg group-hover:bg-gray-200 transition">
              <Eye className="text-gray-700" size={20} />
            </div>
            <div>
              <p className="font-medium text-gray-900">Ver Produtos</p>
              <p className="text-sm text-gray-600">Gerenciar produtos existentes</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}
