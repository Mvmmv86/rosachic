'use client'

import Link from 'next/link'
import { ChevronLeft, CreditCard, Check } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cart-store'
import { useCheckoutStore } from '@/store/checkout-store'
import { formatPrice } from '@/lib/products'
import { api } from '@/lib/api'
import { useAuth } from '@/contexts/AuthContext'
import { CreditCardForm } from '@/components/CreditCardForm'

export default function PagamentoPage() {
  const router = useRouter()
  const { items } = useCartStore()
  const { address, hasAddress } = useCheckoutStore()
  const { user, isAuthenticated, isLoading: authLoading } = useAuth()

  const [paymentMethod, setPaymentMethod] = useState<'PIX' | 'CREDIT_CARD' | 'BOLETO'>('CREDIT_CARD')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [checkoutMode, setCheckoutMode] = useState<'INTERNAL' | 'MERCADOPAGO'>('INTERNAL')
  const [isCardValid, setIsCardValid] = useState(false)

  // Calcular total do carrinho
  const cartTotal = items.reduce((total, item) => {
    return total + (item.pricing.totalFinal * item.quantity)
  }, 0)

  // Verificar autenticação ao carregar
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      localStorage.setItem('redirectAfterLogin', '/checkout/pagamento')
      router.push('/login')
    }
  }, [authLoading, isAuthenticated, router])

  // Buscar modo de checkout configurado no admin
  useEffect(() => {
    const fetchCheckoutMode = async () => {
      try {
        const response = await api.get('/mercadopago-config/checkout-mode')
        setCheckoutMode(response.data.checkoutMode || 'INTERNAL')
      } catch (error) {
        console.error('Erro ao buscar modo de checkout:', error)
        // Padrão: checkout interno
        setCheckoutMode('INTERNAL')
      }
    }

    if (isAuthenticated) {
      fetchCheckoutMode()
    }
  }, [isAuthenticated])

  // Verificar se há itens no carrinho
  useEffect(() => {
    if (items.length === 0) {
      router.push('/carrinho')
    }
  }, [items, router])

  // Verificar se o endereço foi preenchido
  useEffect(() => {
    if (!hasAddress()) {
      setError('Endereço de entrega não encontrado. Volte e preencha novamente.')
      setTimeout(() => {
        router.push('/checkout/endereco')
      }, 2000)
    }
  }, [hasAddress, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // 1. Verificar se tem endereço
      if (!hasAddress() || !address) {
        setError('Endereço de entrega não encontrado. Volte e preencha novamente.')
        setTimeout(() => router.push('/checkout/endereco'), 2000)
        return
      }

      // 2. Verificar autenticação
      if (!isAuthenticated) {
        router.push('/login?redirect=/checkout/pagamento')
        return
      }

      // 3. SINCRONIZAR CARRINHO COM BACKEND
      console.log('🛒 Sincronizando carrinho com backend...')
      console.log('🛒 Items no localStorage:', items.length)

      // Limpar carrinho do backend primeiro
      try {
        await api.delete('/cart')
        console.log('🗑️ Carrinho backend limpo')
      } catch (err) {
        console.log('ℹ️ Carrinho backend já estava vazio')
      }

      // Adicionar cada item ao carrinho do backend
      for (const item of items) {
        console.log(`🛒 Adicionando item: ${item.product.modelo}`)
        try {
          await api.post('/cart/items', {
            productId: item.product.id,
            widthCm: item.widthCm,
            heightCm: item.heightCm,
            quantity: item.quantity,
          })
        } catch (itemError: any) {
          console.error(`❌ Erro ao adicionar item ${item.product.modelo}:`, itemError.response?.data?.message || itemError.message)
          throw new Error(`Erro ao adicionar ${item.product.modelo} ao carrinho: ${itemError.response?.data?.message || itemError.message}`)
        }
      }

      console.log('✅ Carrinho sincronizado com backend')

      // Preparar endereço para o backend
      const shippingAddress = {
        recipientName: user?.name || 'Cliente',
        street: address.rua,
        number: address.numero,
        complement: address.complemento || '',
        neighborhood: address.bairro,
        city: address.cidade,
        state: address.estado,
        zipCode: address.cep,
      }

      // Criar pedido usando api com interceptors
      const orderData = {
        shippingAddress,
        paymentMethod,
        frete: 0, // Grátis
        instalacao: items.reduce((total, item) => total + (item.pricing.instalacao * item.quantity), 0),
      }

      const orderResponse = await api.post('/orders', orderData)
      const order = orderResponse.data

      // 2. DECISÃO: Checkout Interno ou Mercado Pago
      if (checkoutMode === 'INTERNAL') {
        // ✅ CHECKOUT INTERNO: Ir para página de resumo
        localStorage.setItem('pending_order_id', order.id)
        router.push('/checkout/resumo')
      } else if (checkoutMode === 'MERCADOPAGO') {
        // ✅ MERCADO PAGO: Criar preferência e redirecionar
        const preferenceResponse = await api.post('/payment/create-preference', {
          orderId: order.id,
          paymentMethod,
        })

        const preferenceData = preferenceResponse.data

        if (preferenceData.initPoint) {
          // Limpar carrinho antes de redirecionar
          localStorage.setItem('pending_order_id', order.id)
          window.location.href = preferenceData.sandboxInitPoint || preferenceData.initPoint
        } else {
          throw new Error('URL de pagamento não disponível. Mercado Pago pode não estar configurado.')
        }
      }

    } catch (err: any) {
      console.error('Erro ao processar pagamento:', err)
      setError(err.message || 'Erro ao processar pagamento. Tente novamente.')
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return null // Vai redirecionar
  }

  return (
    <div className="min-h-screen bg-[rgb(241,237,237)]">
      {/* Main Content */}
      <div className="w-full max-w-[1224px] mx-auto px-6 py-8">
        <Link href="/checkout/endereco" className="inline-flex items-center gap-2 text-sm font-['Inter'] text-[rgb(108,25,29)] hover:underline mb-6">
          <ChevronLeft className="w-4 h-4" />
          Voltar
        </Link>

        <h1 className="text-[32px] font-['Inter'] font-bold text-black mb-2">Forma de Pagamento</h1>
        <p className="text-base font-['Inter'] text-gray-600 mb-8">
          Escolha como deseja pagar seu pedido
        </p>

        <div className="flex gap-6">
          {/* Formulário */}
          <div className="flex-1">
            <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 border border-[rgb(229,229,229)]">

              {/* Seleção de Método */}
              <div className="flex flex-col gap-4 mb-8">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('CREDIT_CARD')}
                  className={`w-full h-20 rounded-lg border-2 transition-all ${
                    paymentMethod === 'CREDIT_CARD'
                      ? 'border-[rgb(108,25,29)] bg-[rgb(241,237,237)]'
                      : 'border-[rgb(217,217,217)] hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center justify-center gap-3">
                    <CreditCard className="w-6 h-6" />
                    <div className="text-left">
                      <div className="font-['Inter'] font-medium text-lg">Cartão de Crédito</div>
                      <div className="text-xs text-gray-500">Aprovação imediata</div>
                    </div>
                    {paymentMethod === 'CREDIT_CARD' && (
                      <Check className="w-5 h-5 text-[rgb(108,25,29)] ml-auto mr-4" />
                    )}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('PIX')}
                  className={`w-full h-20 rounded-lg border-2 transition-all ${
                    paymentMethod === 'PIX'
                      ? 'border-[rgb(108,25,29)] bg-[rgb(241,237,237)]'
                      : 'border-[rgb(217,217,217)] hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center justify-center gap-3">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                    </svg>
                    <div className="text-left">
                      <div className="font-['Inter'] font-medium text-lg">PIX</div>
                      <div className="text-xs text-gray-500">Aprovação instantânea</div>
                    </div>
                    {paymentMethod === 'PIX' && (
                      <Check className="w-5 h-5 text-[rgb(108,25,29)] ml-auto mr-4" />
                    )}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('BOLETO')}
                  className={`w-full h-20 rounded-lg border-2 transition-all ${
                    paymentMethod === 'BOLETO'
                      ? 'border-[rgb(108,25,29)] bg-[rgb(241,237,237)]'
                      : 'border-[rgb(217,217,217)] hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center justify-center gap-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div className="text-left">
                      <div className="font-['Inter'] font-medium text-lg">Boleto Bancário</div>
                      <div className="text-xs text-gray-500">Vencimento em 3 dias úteis</div>
                    </div>
                    {paymentMethod === 'BOLETO' && (
                      <Check className="w-5 h-5 text-[rgb(108,25,29)] ml-auto mr-4" />
                    )}
                  </div>
                </button>
              </div>

              {/* Formulário de Cartão de Crédito */}
              {paymentMethod === 'CREDIT_CARD' && checkoutMode === 'INTERNAL' && (
                <div className="mb-8">
                  <CreditCardForm
                    onValidCard={() => {
                      setIsCardValid(true)
                    }}
                    onInvalidCard={() => {
                      setIsCardValid(false)
                    }}
                  />
                </div>
              )}

              {/* Info do Método Selecionado */}
              <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  {checkoutMode === 'MERCADOPAGO' ? (
                    <>
                      {paymentMethod === 'CREDIT_CARD' && (
                        <>
                          <strong>Cartão de Crédito:</strong> Você será redirecionado para o checkout seguro do Mercado Pago para finalizar o pagamento.
                        </>
                      )}
                      {paymentMethod === 'PIX' && (
                        <>
                          <strong>PIX:</strong> Após confirmar, você será redirecionado para o Mercado Pago onde receberá um QR Code para pagar via PIX.
                        </>
                      )}
                      {paymentMethod === 'BOLETO' && (
                        <>
                          <strong>Boleto Bancário:</strong> Após confirmar, você será redirecionado para o Mercado Pago onde receberá o boleto.
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      {paymentMethod === 'CREDIT_CARD' && (
                        <>
                          <strong>Cartão de Crédito:</strong> Você será redirecionado para a página de resumo para finalizar seu pedido.
                        </>
                      )}
                      {paymentMethod === 'PIX' && (
                        <>
                          <strong>PIX:</strong> Você será redirecionado para a página de resumo para finalizar seu pedido.
                        </>
                      )}
                      {paymentMethod === 'BOLETO' && (
                        <>
                          <strong>Boleto Bancário:</strong> Você será redirecionado para a página de resumo para finalizar seu pedido.
                        </>
                      )}
                    </>
                  )}
                </p>
              </div>

              {/* Erro */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              {/* Botões */}
              <div className="flex gap-4">
                <Link
                  href="/checkout/endereco"
                  className="flex-1 h-12 flex items-center justify-center rounded-lg border border-[rgb(217,217,217)] font-['Inter'] font-medium text-black hover:bg-gray-50 transition-colors"
                >
                  Voltar
                </Link>
                <button
                  type="submit"
                  disabled={loading || (paymentMethod === 'CREDIT_CARD' && checkoutMode === 'INTERNAL' && !isCardValid)}
                  className="flex-1 h-12 flex items-center justify-center rounded-lg bg-[rgb(108,25,29)] font-['Inter'] font-medium text-white hover:bg-[rgb(88,20,24)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processando...' : 'Ir para Pagamento'}
                </button>
              </div>
            </form>
          </div>

          {/* Resumo - Sidebar */}
          <div className="w-[400px] flex-shrink-0">
            <div className="bg-white rounded-xl p-6 border border-[rgb(229,229,229)] sticky top-8">
              <h2 className="text-xl font-['Inter'] font-bold text-black mb-6">Resumo do Pedido</h2>

              <div className="flex flex-col gap-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-base font-['Inter'] text-gray-600">Subtotal</span>
                  <span className="text-base font-['Inter'] font-medium text-black">
                    {formatPrice(cartTotal)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-base font-['Inter'] text-gray-600">Frete</span>
                  <span className="text-base font-['Inter'] font-medium text-[rgb(25,108,43)]">
                    Grátis
                  </span>
                </div>

                <div className="w-full h-px bg-[rgb(229,229,229)]"></div>

                <div className="flex justify-between items-center">
                  <span className="text-lg font-['Inter'] font-bold text-black">Total</span>
                  <span className="text-xl font-['Inter'] font-bold text-[rgb(108,25,29)]">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
              </div>

              {/* Progresso do Checkout */}
              <div className="flex flex-col gap-3 pt-6 border-t border-[rgb(229,229,229)]">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[rgb(25,108,43)] flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm font-['Inter'] text-[rgb(25,108,43)]">Carrinho</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[rgb(25,108,43)] flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm font-['Inter'] text-[rgb(25,108,43)]">Endereço</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[rgb(108,25,29)] flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-['Inter'] font-bold text-white">3</span>
                  </div>
                  <span className="text-sm font-['Inter'] font-medium text-black">Pagamento</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-['Inter'] font-bold text-white">4</span>
                  </div>
                  <span className="text-sm font-['Inter'] text-gray-400">Confirmação</span>
                </div>
              </div>

              {/* Segurança */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className="text-sm font-['Inter'] font-medium text-gray-900">
                    Pagamento Seguro
                  </span>
                </div>
                <p className="text-xs text-gray-600">
                  Processado pelo Mercado Pago com criptografia SSL
                </p>
              </div>
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