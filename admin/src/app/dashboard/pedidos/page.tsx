'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { ShoppingCart, Eye, CheckCircle, XCircle } from 'lucide-react'

interface Order {
  id: string
  userId: string
  status: string
  subtotal: number
  instalacao: number
  frete: number
  desconto: number
  total: number
  paymentMethod: string
  paymentStatus: string
  createdAt: string
  user: {
    id: string
    name: string
    email: string
  }
  items: Array<{
    id: string
    productId: string
    widthCm: number
    heightCm: number
    areaCobravel: number
    pricePerM2: number
    quantity: number
    subtotal: number
    product: {
      id: string
      codigo: string
      modelo: string
    }
  }>
  shipping: {
    recipientName: string
    street: string
    number: string
    neighborhood: string
    city: string
    state: string
    zipCode: string
  }
}

export default function PedidosPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const { data } = await api.get('/orders')
      setOrders(data.data || [])
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      await api.patch(`/orders/${orderId}/status`, { status })
      await fetchOrders()
      setSelectedOrder(null)
      alert('Status atualizado com sucesso!')
    } catch (error) {
      console.error('Erro ao atualizar status:', error)
      alert('Erro ao atualizar status')
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR')
  }

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      PENDING: { label: 'Pendente', className: 'bg-yellow-100 text-yellow-800' },
      CONFIRMED: { label: 'Confirmado', className: 'bg-blue-100 text-blue-800' },
      PROCESSING: { label: 'Processando', className: 'bg-purple-100 text-purple-800' },
      SHIPPED: { label: 'Enviado', className: 'bg-indigo-100 text-indigo-800' },
      DELIVERED: { label: 'Entregue', className: 'bg-green-100 text-green-800' },
      CANCELLED: { label: 'Cancelado', className: 'bg-red-100 text-red-800' },
    }
    const config = statusMap[status] || { label: status, className: 'bg-gray-100 text-gray-800' }
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.className}`}>
        {config.label}
      </span>
    )
  }

  const getPaymentStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      PENDING: { label: 'Pendente', className: 'bg-yellow-100 text-yellow-800' },
      APPROVED: { label: 'Aprovado', className: 'bg-green-100 text-green-800' },
      REJECTED: { label: 'Rejeitado', className: 'bg-red-100 text-red-800' },
      REFUNDED: { label: 'Reembolsado', className: 'bg-gray-100 text-gray-800' },
    }
    const config = statusMap[status] || { label: status, className: 'bg-gray-100 text-gray-800' }
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.className}`}>
        {config.label}
      </span>
    )
  }

  const getPaymentMethodLabel = (method: string) => {
    const methodMap: Record<string, string> = {
      PIX: 'PIX',
      CREDIT_CARD: 'Cartão',
      BOLETO: 'Boleto',
    }
    return methodMap[method] || method
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500">Carregando pedidos...</div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Gestão de Pedidos</h1>
        <p className="text-gray-600 mt-1">Visualize e gerencie todos os pedidos</p>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pedido
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pagamento
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{order.id.slice(0, 8)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{order.user.name}</div>
                    <div className="text-sm text-gray-500">{order.user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{getPaymentMethodLabel(order.paymentMethod)}</div>
                    <div>{getPaymentStatusBadge(order.paymentStatus)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                    {formatCurrency(order.total)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-blue-600 hover:text-blue-900 inline-flex items-center gap-1"
                    >
                      <Eye size={16} />
                      Ver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Detalhes */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  Pedido #{selectedOrder.id.slice(0, 8)}
                </h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle size={24} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Cliente */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Cliente</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Nome: <span className="font-medium text-gray-900">{selectedOrder.user.name}</span></p>
                  <p className="text-sm text-gray-600">Email: <span className="font-medium text-gray-900">{selectedOrder.user.email}</span></p>
                </div>
              </div>

              {/* Endereço de Entrega */}
              {selectedOrder.shipping && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Endereço de Entrega</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-900">{selectedOrder.shipping.recipientName}</p>
                    <p className="text-sm text-gray-600">
                      {selectedOrder.shipping.street}, {selectedOrder.shipping.number}
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedOrder.shipping.neighborhood}, {selectedOrder.shipping.city} - {selectedOrder.shipping.state}
                    </p>
                    <p className="text-sm text-gray-600">CEP: {selectedOrder.shipping.zipCode}</p>
                  </div>
                </div>
              )}

              {/* Itens do Pedido */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Itens do Pedido</h3>
                <div className="space-y-2">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="bg-gray-50 p-4 rounded-lg flex justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{item.product.modelo}</p>
                        <p className="text-sm text-gray-600">
                          {item.widthCm}cm x {item.heightCm}cm ({item.areaCobravel}m²) - {item.quantity}x
                        </p>
                      </div>
                      <p className="font-medium text-gray-900">{formatCurrency(item.subtotal)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totais */}
              <div className="border-t pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium">{formatCurrency(selectedOrder.subtotal)}</span>
                  </div>
                  {selectedOrder.instalacao > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Instalação:</span>
                      <span className="font-medium">{formatCurrency(selectedOrder.instalacao)}</span>
                    </div>
                  )}
                  {selectedOrder.frete > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Frete:</span>
                      <span className="font-medium">{formatCurrency(selectedOrder.frete)}</span>
                    </div>
                  )}
                  {selectedOrder.desconto > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Desconto:</span>
                      <span className="font-medium">-{formatCurrency(selectedOrder.desconto)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Total:</span>
                    <span>{formatCurrency(selectedOrder.total)}</span>
                  </div>
                </div>
              </div>

              {/* Ações */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Atualizar Status</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.id, 'CONFIRMED')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                  >
                    Confirmar
                  </button>
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.id, 'PROCESSING')}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm"
                  >
                    Processar
                  </button>
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.id, 'SHIPPED')}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm"
                  >
                    Enviar
                  </button>
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.id, 'DELIVERED')}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                  >
                    Entregar
                  </button>
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.id, 'CANCELLED')}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}