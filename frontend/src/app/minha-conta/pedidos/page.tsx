'use client'

import { AccountLayout } from '@/components/AccountLayout'
import { Package } from 'lucide-react'
import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { formatPrice } from '@/lib/products'

interface Order {
  id: string
  status: string
  paymentStatus: string
  paymentMethod: string
  total: number
  createdAt: string
  items: Array<{
    id: string
    quantity: number
    subtotal: number
    widthCm: number
    heightCm: number
    product: {
      modelo: string
      imagens: string
      material: string
      luminosidade: string
    }
  }>
}

export default function MeusPedidosPage() {
  const [pedidos, setPedidos] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders/my-orders')
      setPedidos(response.data)
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusLabel = (status: string) => {
    const statusMap: Record<string, string> = {
      PENDING: 'Pendente',
      CONFIRMED: 'Confirmado',
      PROCESSING: 'Em Processamento',
      SHIPPED: 'Enviado',
      DELIVERED: 'Entregue',
      CANCELLED: 'Cancelado',
    }
    return statusMap[status] || status
  }

  const getStatusColor = (status: string) => {
    const colorMap: Record<string, string> = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      CONFIRMED: 'bg-blue-100 text-blue-800',
      PROCESSING: 'bg-purple-100 text-purple-800',
      SHIPPED: 'bg-indigo-100 text-indigo-800',
      DELIVERED: 'bg-green-100 text-green-800',
      CANCELLED: 'bg-red-100 text-red-800',
    }
    return colorMap[status] || 'bg-gray-100 text-gray-800'
  }

  const getPaymentMethodLabel = (method: string) => {
    const methodMap: Record<string, string> = {
      PIX: 'PIX',
      CREDIT_CARD: 'Cartão de Crédito',
      BOLETO: 'Boleto Bancário',
    }
    return methodMap[method] || method
  }

  const handleCancelOrder = async (orderId: string) => {
    if (!confirm('Tem certeza que deseja cancelar este pedido?')) return

    try {
      await api.patch(`/orders/${orderId}/cancel`)
      alert('Pedido cancelado com sucesso!')
      fetchOrders()
    } catch (error) {
      console.error('Erro ao cancelar pedido:', error)
      alert('Erro ao cancelar pedido')
    }
  }

  if (loading) {
    return (
      <AccountLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[rgb(108,25,29)]"></div>
            <p className="mt-4 text-gray-600">Carregando seus pedidos...</p>
          </div>
        </div>
      </AccountLayout>
    )
  }

  if (pedidos.length === 0) {
    return (
      <AccountLayout>
        <div className="text-center py-12">
          <Package size={64} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Nenhum pedido encontrado</h2>
          <p className="text-gray-600 mb-6">Você ainda não fez nenhuma compra</p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-[rgb(108,25,29)] text-white rounded-lg hover:bg-[rgb(88,20,24)] transition"
          >
            Começar a Comprar
          </a>
        </div>
      </AccountLayout>
    )
  }

  return (
    <AccountLayout>
      <div className="space-y-6">
        <h1 className="font-sans text-2xl font-semibold text-black">
          Meus Pedidos
        </h1>

        {/* Lista de Pedidos */}
        {pedidos.map((pedido) => {
          const firstItem = pedido.items[0]
          const totalItems = pedido.items.reduce((sum, item) => sum + item.quantity, 0)
          const productImages = firstItem?.product?.imagens ? JSON.parse(firstItem.product.imagens) : []
          const firstImage = productImages[0]
            ? `http://localhost:3001/uploads/${productImages[0]}`
            : 'https://via.placeholder.com/300x300?text=Sem+Imagem'

          return (
            <div key={pedido.id} className="bg-[rgb(241,237,237)] rounded-lg shadow-sm p-6">
              <div className="flex gap-6">
                {/* Imagem do Produto */}
                <div className="w-32 h-32 rounded-lg flex-shrink-0 overflow-hidden bg-gray-100">
                  {firstItem ? (
                    <img
                      src={firstImage}
                      alt={firstItem.product.modelo}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/300x300?text=Sem+Imagem'
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package size={48} className="text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Informações do Pedido */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex gap-2 mb-2">
                        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 font-sans text-xs font-medium rounded-full">
                          Pedido #{pedido.id.slice(0, 8)}
                        </span>
                        <span className={`inline-block px-3 py-1 ${getStatusColor(pedido.status)} font-sans text-xs font-medium rounded-full`}>
                          {getStatusLabel(pedido.status)}
                        </span>
                      </div>
                      <h3 className="font-sans text-lg font-semibold text-black">
                        {firstItem?.product?.modelo || 'Pedido'}
                        {pedido.items.length > 1 && ` +${pedido.items.length - 1} item(ns)`}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Data: {new Date(pedido.createdAt).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                    <div>
                      <span className="font-sans text-gray-600">Tamanho: </span>
                      <span className="font-sans text-black font-medium">
                        {firstItem ? `${firstItem.widthCm}cm × ${firstItem.heightCm}cm` : '-'}
                      </span>
                    </div>
                    <div>
                      <span className="font-sans text-gray-600">Pagamento: </span>
                      <span className="font-sans text-black font-medium">
                        {getPaymentMethodLabel(pedido.paymentMethod)}
                      </span>
                    </div>
                    <div>
                      <span className="font-sans text-gray-600">Itens: </span>
                      <span className="font-sans text-black font-medium">
                        {totalItems}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="font-sans text-xl font-bold text-[rgb(108,25,29)]">
                      {formatPrice(pedido.total)}
                    </p>

                    <div className="flex gap-3">
                      {pedido.status !== 'CANCELLED' && pedido.status !== 'DELIVERED' && (
                        <button
                          onClick={() => handleCancelOrder(pedido.id)}
                          className="px-4 py-2 font-sans text-sm font-medium rounded-lg transition-colors border border-red-500 text-red-500 hover:bg-red-50"
                        >
                          Cancelar
                        </button>
                      )}
                      <a
                        href={`/minha-conta/pedidos/${pedido.id}`}
                        className="px-4 py-2 font-sans text-sm font-medium rounded-lg transition-colors border border-[rgb(108,25,29)] text-[rgb(108,25,29)] hover:bg-[rgb(255,243,243)]"
                      >
                        Ver Detalhes
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        {/* Paginação */}
        <div className="flex items-center justify-center gap-2 mt-8">
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
