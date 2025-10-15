'use client'

import Link from 'next/link'
import { Search, ShoppingCart, User, CheckCircle2 } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { api } from '@/lib/api'
import { formatPrice } from '@/lib/products'

interface Order {
  id: string
  total: number
  subtotal: number
  items: any[]
}

export default function SucessoPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const id = orderId || localStorage.getItem('pending_order_id')

        if (!id) {
          console.error('Nenhum ID de pedido encontrado')
          setLoading(false)
          return
        }

        const response = await api.get(`/orders/${id}`)
        setOrder(response.data)

        // Limpar localStorage após carregar
        localStorage.removeItem('pending_order_id')
      } catch (error) {
        console.error('Erro ao carregar pedido:', error)
      } finally {
        setLoading(false)
      }
    }

    loadOrder()
  }, [orderId])

  if (loading) {
    return (
      <div className="min-h-screen bg-[rgb(241,237,237)] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[rgb(108,25,29)]"></div>
          <p className="mt-4 text-gray-600">Carregando informações do pedido...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[rgb(241,237,237)]">
      {/* Main Content */}
      <div className="w-full max-w-[800px] mx-auto px-6 py-16">
        <div className="bg-white rounded-xl p-12 border border-[rgb(229,229,229)] text-center">

          {/* Ícone de Sucesso */}
          <div className="mb-6">
            <CheckCircle2 className="w-24 h-24 text-[rgb(25,108,43)] mx-auto" />
          </div>

          {/* Título */}
          <h1 className="text-[36px] font-['Inter'] font-bold text-black mb-4">
            Pedido Realizado com Sucesso!
          </h1>

          {/* Mensagem */}
          <p className="text-lg font-['Inter'] text-gray-600 mb-8">
            Obrigado pela sua compra! Seu pedido foi confirmado e está sendo processado.
          </p>

          {/* Número do Pedido */}
          <div className="bg-[rgb(241,237,237)] rounded-lg p-6 mb-8">
            <p className="text-sm font-['Inter'] text-gray-600 mb-2">Número do Pedido</p>
            <p className="text-2xl font-['Inter'] font-bold text-[rgb(108,25,29)]">
              #{order?.id || 'Carregando...'}
            </p>
          </div>

          {/* Informações do Pedido */}
          {order && (
            <div className="bg-[rgb(241,237,237)] rounded-lg p-6 mb-8 text-left">
              <h2 className="text-lg font-['Inter'] font-bold text-black mb-4">Resumo do Pedido</h2>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-base font-['Inter'] text-gray-600">
                    Subtotal ({order.items?.length || 0} {order.items?.length === 1 ? 'item' : 'itens'})
                  </span>
                  <span className="text-base font-['Inter'] font-medium text-black">
                    {formatPrice(order.subtotal)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-base font-['Inter'] text-gray-600">Frete</span>
                  <span className="text-base font-['Inter'] font-medium text-[rgb(25,108,43)]">Grátis</span>
                </div>

                <div className="w-full h-px bg-[rgb(217,217,217)]"></div>

                <div className="flex justify-between">
                  <span className="text-lg font-['Inter'] font-bold text-black">Total Pago</span>
                  <span className="text-xl font-['Inter'] font-bold text-[rgb(108,25,29)]">
                    {formatPrice(order.total)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Próximos Passos */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left">
            <h3 className="text-base font-['Inter'] font-bold text-blue-900 mb-3">Próximos Passos</h3>
            <ul className="space-y-2 text-sm font-['Inter'] text-blue-800">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">✓</span>
                <span>Enviamos um e-mail de confirmação com todos os detalhes do pedido</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">✓</span>
                <span>Você receberá atualizações sobre o status da entrega por e-mail</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">✓</span>
                <span>Prazo de entrega: até 7 dias úteis</span>
              </li>
            </ul>
          </div>

          {/* Botões de Ação */}
          <div className="flex gap-4">
            <Link
              href="/produtos"
              className="flex-1 h-12 flex items-center justify-center rounded-lg border border-[rgb(217,217,217)] font-['Inter'] font-medium text-black hover:bg-gray-50 transition-colors"
            >
              Continuar Comprando
            </Link>

            <Link
              href="/minha-conta/pedidos"
              className="flex-1 h-12 flex items-center justify-center rounded-lg bg-[rgb(108,25,29)] font-['Inter'] font-medium text-white hover:bg-[rgb(88,20,24)] transition-colors"
            >
              Ver Meus Pedidos
            </Link>
          </div>

          {/* Ajuda */}
          <p className="text-sm font-['Inter'] text-gray-500 mt-8">
            Precisa de ajuda? Entre em contato pelo WhatsApp: <a href="tel:+5541999999999" className="text-[rgb(108,25,29)] hover:underline">(41) 99999-9999</a>
          </p>
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
