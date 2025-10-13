'use client'

import Link from 'next/link'
import { Search, ShoppingCart, User, ChevronLeft, CreditCard } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function PagamentoPage() {
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState<'cartao' | 'pix' | 'boleto'>('cartao')
  const [cardData, setCardData] = useState({
    numero: '',
    nome: '',
    validade: '',
    cvv: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push('/checkout/resumo')
  }

  const cartTotal = 980.88

  return (
    <div className="min-h-screen bg-[rgb(241,237,237)]">
      {/* Main Content */}
      <div className="w-full max-w-[1224px] mx-auto px-6 py-8">
        <Link href="/checkout/endereco" className="inline-flex items-center gap-2 text-sm font-['Inter'] text-[rgb(108,25,29)] hover:underline mb-6">
          <ChevronLeft className="w-4 h-4" />
          Voltar
        </Link>

        <h1 className="text-[32px] font-['Inter'] font-bold text-black mb-8">Forma de Pagamento</h1>

        <div className="flex gap-6">
          {/* Formulário */}
          <div className="flex-1">
            <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 border border-[rgb(229,229,229)]">

              {/* Seleção de Método */}
              <div className="flex gap-4 mb-8">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cartao')}
                  className={`flex-1 h-16 rounded-lg border-2 transition-all ${
                    paymentMethod === 'cartao'
                      ? 'border-[rgb(108,25,29)] bg-[rgb(241,237,237)]'
                      : 'border-[rgb(217,217,217)] hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    <span className="font-['Inter'] font-medium">Cartão de Crédito</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('pix')}
                  className={`flex-1 h-16 rounded-lg border-2 transition-all ${
                    paymentMethod === 'pix'
                      ? 'border-[rgb(108,25,29)] bg-[rgb(241,237,237)]'
                      : 'border-[rgb(217,217,217)] hover:border-gray-400'
                  }`}
                >
                  <span className="font-['Inter'] font-medium">PIX</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('boleto')}
                  className={`flex-1 h-16 rounded-lg border-2 transition-all ${
                    paymentMethod === 'boleto'
                      ? 'border-[rgb(108,25,29)] bg-[rgb(241,237,237)]'
                      : 'border-[rgb(217,217,217)] hover:border-gray-400'
                  }`}
                >
                  <span className="font-['Inter'] font-medium">Boleto</span>
                </button>
              </div>

              {/* Formulário de Cartão */}
              {paymentMethod === 'cartao' && (
                <>
                  <div className="mb-6">
                    <label className="block text-sm font-['Inter'] font-medium text-black mb-2">
                      Número do Cartão <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={cardData.numero}
                      onChange={(e) => setCardData({ ...cardData, numero: e.target.value })}
                      placeholder="0000 0000 0000 0000"
                      required
                      className="w-full h-12 px-4 rounded-lg border border-[rgb(217,217,217)] font-['Inter']"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-['Inter'] font-medium text-black mb-2">
                      Nome no Cartão <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={cardData.nome}
                      onChange={(e) => setCardData({ ...cardData, nome: e.target.value })}
                      placeholder="NOME COMO ESTÁ NO CARTÃO"
                      required
                      className="w-full h-12 px-4 rounded-lg border border-[rgb(217,217,217)] font-['Inter']"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div>
                      <label className="block text-sm font-['Inter'] font-medium text-black mb-2">
                        Validade <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={cardData.validade}
                        onChange={(e) => setCardData({ ...cardData, validade: e.target.value })}
                        placeholder="MM/AA"
                        required
                        className="w-full h-12 px-4 rounded-lg border border-[rgb(217,217,217)] font-['Inter']"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-['Inter'] font-medium text-black mb-2">
                        CVV <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={cardData.cvv}
                        onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                        placeholder="123"
                        maxLength={3}
                        required
                        className="w-full h-12 px-4 rounded-lg border border-[rgb(217,217,217)] font-['Inter']"
                      />
                    </div>
                  </div>
                </>
              )}

              {paymentMethod === 'pix' && (
                <div className="py-8 text-center">
                  <p className="text-base font-['Inter'] text-gray-600 mb-4">
                    O QR Code do PIX será gerado na próxima etapa
                  </p>
                </div>
              )}

              {paymentMethod === 'boleto' && (
                <div className="py-8 text-center">
                  <p className="text-base font-['Inter'] text-gray-600 mb-4">
                    O boleto será gerado após a confirmação do pedido
                  </p>
                </div>
              )}

              {/* Botões */}
              <div className="flex gap-4">
                <Link
                  href="/checkout/endereco"
                  className="flex-1 h-12 flex items-center justify-center rounded-lg border border-[rgb(217,217,217)] font-['Inter'] font-medium text-black hover:bg-gray-50"
                >
                  Voltar
                </Link>
                <button
                  type="submit"
                  className="flex-1 h-12 flex items-center justify-center rounded-lg bg-[rgb(108,25,29)] font-['Inter'] font-medium text-white hover:bg-[rgb(88,20,24)]"
                >
                  Continuar
                </button>
              </div>
            </form>
          </div>

          {/* Resumo - Sidebar */}
          <div className="w-[400px] flex-shrink-0">
            <div className="bg-white rounded-xl p-6 border border-[rgb(229,229,229)] sticky top-8">
              <h2 className="text-xl font-['Inter'] font-bold text-black mb-6">Resumo do Pedido</h2>
              <div className="flex flex-col gap-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-base font-['Inter'] text-gray-600">Subtotal</span>
                  <span className="text-base font-['Inter'] font-medium">R$ 980,88</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base font-['Inter'] text-gray-600">Frete</span>
                  <span className="text-base font-['Inter'] font-medium text-[rgb(25,108,43)]">Grátis</span>
                </div>
                <div className="w-full h-px bg-[rgb(229,229,229)]"></div>
                <div className="flex justify-between">
                  <span className="text-lg font-['Inter'] font-bold">Total</span>
                  <span className="text-xl font-['Inter'] font-bold text-[rgb(108,25,29)]">R$ {cartTotal.toFixed(2).replace('.', ',')}</span>
                </div>
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
