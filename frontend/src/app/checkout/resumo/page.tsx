'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { formatPrice } from '@/lib/products'
import { useCartStore } from '@/store/cart-store'

interface Order {
  id: string
  status: string
  total: number
  subtotal: number
  paymentMethod: string
  createdAt: string
  items: any[]
  shipping: any
}

export default function ResumoPage() {
  const router = useRouter()
  const { clearCart } = useCartStore()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [processingPayment, setProcessingPayment] = useState(false)

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const orderId = localStorage.getItem('pending_order_id')
        const token = localStorage.getItem('token')

        if (!orderId || !token) {
          router.push('/carrinho')
          return
        }

        // Buscar detalhes do pedido
        const response = await fetch(`http://localhost:3001/orders/${orderId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })

        if (response.ok) {
          const orderData = await response.json()
          setOrder(orderData)
        } else {
          throw new Error('Pedido não encontrado')
        }
      } catch (error) {
        console.error('Erro ao carregar pedido:', error)
        router.push('/carrinho')
      } finally {
        setLoading(false)
      }
    }

    loadOrder()
  }, [router])

  const handleConfirm = async () => {
    setProcessingPayment(true)

    try {
      // Simular processamento de pagamento (2 segundos)
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Limpar carrinho
      clearCart()
      localStorage.removeItem('pending_order_id')
      localStorage.removeItem('checkout_address')

      // Redirecionar para página de sucesso
      const successUrl = `/checkout/sucesso?orderId=${order?.id}`
      router.push(successUrl as any)
    } catch (error) {
      console.error('Erro ao processar pagamento:', error)
      alert('Erro ao processar pagamento. Tente novamente.')
      setProcessingPayment(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[rgb(241,237,237)] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[rgb(108,25,29)]"></div>
          <p className="mt-4 text-gray-600">Carregando resumo do pedido...</p>
        </div>
      </div>
    )
  }

  if (!order) {
    return null
  }

  const paymentMethodNames: Record<string, string> = {
    PIX: 'PIX',
    CREDIT_CARD: 'Cartão de Crédito',
    BOLETO: 'Boleto Bancário',
  }

  return (
    <div className="min-h-screen bg-[rgb(241,237,237)]">
      {/* Main Content */}
      <div className="w-full max-w-[1224px] mx-auto px-6 py-8">
        <Link href="/checkout/pagamento" className="inline-flex items-center gap-2 text-sm font-['Inter'] text-[rgb(108,25,29)] hover:underline mb-6">
          <ChevronLeft className="w-4 h-4" />
          Voltar
        </Link>

        <h1 className="text-[32px] font-['Inter'] font-bold text-black mb-8">Confirme seu Pedido</h1>

        <div className="flex gap-6">
          {/* Resumo Detalhado */}
          <div className="flex-1 space-y-6">

            {/* Produtos */}
            <div className="bg-white rounded-xl p-6 border border-[rgb(229,229,229)]">
              <h2 className="text-xl font-['Inter'] font-bold text-black mb-4">Produtos</h2>

              <div className="space-y-4">
                {order.items?.map((item: any, index: number) => {
                  const productImages = item.product?.imagens ? JSON.parse(item.product.imagens) : []
                  const firstImage = productImages[0] || '/placeholder-product.jpg'

                  return (
                    <div key={index} className={`flex gap-4 ${index < order.items.length - 1 ? 'pb-4 border-b border-[rgb(229,229,229)]' : ''}`}>
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                        <img
                          src={firstImage}
                          alt={item.product?.modelo || 'Produto'}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = '/placeholder-product.jpg'
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-['Inter'] font-semibold text-black">
                          {item.product?.modelo || 'Produto'}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Tamanho: {item.widthCm}cm × {item.heightCm}cm
                        </p>
                        <p className="text-sm text-gray-600">Quantidade: {item.quantity}</p>
                      </div>
                      <span className="font-['Inter'] font-bold text-[rgb(108,25,29)]">
                        {formatPrice(item.subtotal)}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Endereço de Entrega */}
            <div className="bg-white rounded-xl p-6 border border-[rgb(229,229,229)]">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-['Inter'] font-bold text-black">Endereço de Entrega</h2>
                <Link href="/checkout/endereco" className="text-sm font-['Inter'] text-[rgb(108,25,29)] hover:underline">
                  Editar
                </Link>
              </div>
              <p className="text-base font-['Inter'] font-medium text-black">{order.shipping?.recipientName}</p>
              <p className="text-base font-['Inter'] text-gray-800">
                {order.shipping?.street}, {order.shipping?.number}
                {order.shipping?.complement && ` - ${order.shipping.complement}`}
              </p>
              <p className="text-base font-['Inter'] text-gray-800">
                {order.shipping?.neighborhood} - {order.shipping?.city}/{order.shipping?.state}
              </p>
              <p className="text-base font-['Inter'] text-gray-800">CEP: {order.shipping?.zipCode}</p>
            </div>

            {/* Forma de Pagamento */}
            <div className="bg-white rounded-xl p-6 border border-[rgb(229,229,229)]">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-['Inter'] font-bold text-black">Forma de Pagamento</h2>
                <Link href="/checkout/pagamento" className="text-sm font-['Inter'] text-[rgb(108,25,29)] hover:underline">
                  Editar
                </Link>
              </div>
              <p className="text-base font-['Inter'] text-gray-800">
                {paymentMethodNames[order.paymentMethod] || order.paymentMethod}
              </p>
            </div>
          </div>

          {/* Resumo Final - Sidebar */}
          <div className="w-[400px] flex-shrink-0">
            <div className="bg-white rounded-xl p-6 border border-[rgb(229,229,229)] sticky top-8">
              <h2 className="text-xl font-['Inter'] font-bold text-black mb-6">Resumo do Pedido</h2>

              <div className="flex flex-col gap-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-base font-['Inter'] text-gray-600">Subtotal ({order.items?.length || 0} {order.items?.length === 1 ? 'item' : 'itens'})</span>
                  <span className="text-base font-['Inter'] font-medium">{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base font-['Inter'] text-gray-600">Frete</span>
                  <span className="text-base font-['Inter'] font-medium text-[rgb(25,108,43)]">Grátis</span>
                </div>
                <div className="w-full h-px bg-[rgb(229,229,229)]"></div>
                <div className="flex justify-between">
                  <span className="text-lg font-['Inter'] font-bold">Total</span>
                  <span className="text-xl font-['Inter'] font-bold text-[rgb(108,25,29)]">{formatPrice(order.total)}</span>
                </div>
              </div>

              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-800">
                  <strong>Checkout Interno:</strong> Ao confirmar, simularemos o processamento do pagamento.
                </p>
              </div>

              <button
                onClick={handleConfirm}
                disabled={processingPayment}
                className="w-full h-12 flex items-center justify-center rounded-lg bg-[rgb(108,25,29)] font-['Inter'] font-medium text-white hover:bg-[rgb(88,20,24)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processingPayment ? (
                  <>
                    <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processando...
                  </>
                ) : (
                  'Finalizar Pedido'
                )}
              </button>

              <p className="text-xs font-['Inter'] text-gray-500 text-center mt-4">
                Ao finalizar, você concorda com nossos Termos e Condições
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-[rgb(108,25,29)] text-white mt-20">
        <div className="w-full max-w-[1224px] mx-auto px-6 py-8">
          <p className="text-sm text-[rgb(241,237,237)] font-['Inter'] text-center">© 2025 By Rosa Chic, All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  )
}
