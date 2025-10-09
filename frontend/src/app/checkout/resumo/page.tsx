'use client'

import Link from 'next/link'
import { Search, ShoppingCart, User, ChevronLeft } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { useRouter } from 'next/navigation'

export default function ResumoPage() {
  const router = useRouter()

  const handleConfirm = () => {
    router.push('/checkout/sucesso')
  }

  return (
    <div className="min-h-screen bg-[rgb(241,237,237)]">
      {/* Header */}
      <header className="w-full bg-[rgb(108,25,29)] flex py-4 flex-col items-center gap-2">
        <div className="w-full max-w-[1224px] mx-auto px-6">
          <div className="flex w-full justify-between items-center">
            <Logo />
            <div className="w-[336px] h-[40px] relative">
              <input type="text" placeholder="Buscar persianas, serviços, etc..." className="w-full h-full px-4 pr-10 rounded-lg border border-[rgb(200,190,191)] bg-white text-sm font-['Inter']" />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4" />
            </div>
            <div className="flex items-center gap-2">
              <button className="w-9 h-9 bg-white rounded-full border border-[rgb(108,25,29)] flex items-center justify-center">
                <User className="w-5 h-5 text-[rgb(108,25,29)]" />
              </button>
              <button className="w-9 h-9 bg-white rounded-full flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-[rgb(108,25,29)]" />
              </button>
            </div>
          </div>
        </div>
      </header>

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
                <div className="flex gap-4 pb-4 border-b border-[rgb(229,229,229)]">
                  <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-gray-200 to-gray-300 flex-shrink-0"></div>
                  <div className="flex-1">
                    <h3 className="font-['Inter'] font-semibold text-black">Persiana Blackout Kitbox - Preto</h3>
                    <p className="text-sm text-gray-600">Tamanho: 2,0m x 1,5m</p>
                    <p className="text-sm text-gray-600">Quantidade: 2</p>
                  </div>
                  <span className="font-['Inter'] font-bold text-[rgb(108,25,29)]">R$ 700,38</span>
                </div>

                <div className="flex gap-4">
                  <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-gray-200 to-gray-300 flex-shrink-0"></div>
                  <div className="flex-1">
                    <h3 className="font-['Inter'] font-semibold text-black">Persiana Rolô Tela Solar 5% - Branca</h3>
                    <p className="text-sm text-gray-600">Tamanho: 1,8m x 1,2m</p>
                    <p className="text-sm text-gray-600">Quantidade: 1</p>
                  </div>
                  <span className="font-['Inter'] font-bold text-[rgb(108,25,29)]">R$ 280,50</span>
                </div>
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
              <p className="text-base font-['Inter'] text-gray-800">Rua Example, 123 - Apto 45</p>
              <p className="text-base font-['Inter'] text-gray-800">Bairro Centro - Curitiba/PR</p>
              <p className="text-base font-['Inter'] text-gray-800">CEP: 80000-000</p>
            </div>

            {/* Forma de Pagamento */}
            <div className="bg-white rounded-xl p-6 border border-[rgb(229,229,229)]">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-['Inter'] font-bold text-black">Forma de Pagamento</h2>
                <Link href="/checkout/pagamento" className="text-sm font-['Inter'] text-[rgb(108,25,29)] hover:underline">
                  Editar
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-8 bg-gradient-to-br from-gray-700 to-gray-900 rounded flex items-center justify-center">
                  <span className="text-xs text-white font-bold">VISA</span>
                </div>
                <span className="text-base font-['Inter'] text-gray-800">Cartão de crédito terminado em 1234</span>
              </div>
            </div>
          </div>

          {/* Resumo Final - Sidebar */}
          <div className="w-[400px] flex-shrink-0">
            <div className="bg-white rounded-xl p-6 border border-[rgb(229,229,229)] sticky top-8">
              <h2 className="text-xl font-['Inter'] font-bold text-black mb-6">Resumo do Pedido</h2>

              <div className="flex flex-col gap-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-base font-['Inter'] text-gray-600">Subtotal (2 itens)</span>
                  <span className="text-base font-['Inter'] font-medium">R$ 980,88</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base font-['Inter'] text-gray-600">Frete</span>
                  <span className="text-base font-['Inter'] font-medium text-[rgb(25,108,43)]">Grátis</span>
                </div>
                <div className="w-full h-px bg-[rgb(229,229,229)]"></div>
                <div className="flex justify-between">
                  <span className="text-lg font-['Inter'] font-bold">Total</span>
                  <span className="text-xl font-['Inter'] font-bold text-[rgb(108,25,29)]">R$ 980,88</span>
                </div>
              </div>

              <button
                onClick={handleConfirm}
                className="w-full h-12 flex items-center justify-center rounded-lg bg-[rgb(108,25,29)] font-['Inter'] font-medium text-white hover:bg-[rgb(88,20,24)] transition-colors"
              >
                Finalizar Pedido
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
