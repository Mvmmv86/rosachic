'use client'

import Link from 'next/link'
import { Search, ShoppingCart, User, ChevronLeft } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function EnderecoPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    cep: '',
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Salvar endereço e ir para página de pagamento
    router.push('/checkout/pagamento')
  }

  const buscarCEP = async () => {
    if (formData.cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${formData.cep}/json/`)
        const data = await response.json()
        if (!data.erro) {
          setFormData(prev => ({
            ...prev,
            rua: data.logradouro,
            bairro: data.bairro,
            cidade: data.localidade,
            estado: data.uf
          }))
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error)
      }
    }
  }

  const cartTotal = 980.88

  return (
    <div className="min-h-screen bg-[rgb(241,237,237)]">
      {/* Header */}
      <header className="w-full bg-[rgb(108,25,29)] flex py-4 flex-col items-center gap-2">
        <div className="w-full max-w-[1224px] mx-auto px-6">
          <div className="flex w-full justify-between items-center">
            <Logo />

            <div className="w-[336px] h-[40px] relative">
              <input
                type="text"
                placeholder="Buscar persianas, serviços, etc..."
                className="w-full h-full px-4 pr-10 rounded-lg border border-[rgb(200,190,191)] bg-white text-sm font-['Inter'] text-[rgb(119,105,106)] placeholder-[rgb(119,105,106)]"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgb(78,67,67)]" />
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

        <div className="w-full max-w-[1224px] mx-auto px-6">
          <nav className="flex w-full justify-center">
            <ul className="flex items-center gap-4 text-[rgb(241,237,237)] text-sm font-['Inter'] font-normal">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/produtos" className="hover:text-white transition-colors">Categorias</Link></li>
              <li><Link href={"/" as any} className="hover:text-white transition-colors">Guia rápido</Link></li>
              <li><Link href={"/" as any} className="hover:text-white transition-colors">Ambientes</Link></li>
              <li><Link href={"/" as any} className="hover:text-white transition-colors">Serviços</Link></li>
              <li><Link href={"/" as any} className="hover:text-white transition-colors">Mais procurados</Link></li>
              <li><Link href={"/" as any} className="hover:text-white transition-colors">Outros</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="w-full max-w-[1224px] mx-auto px-6 py-8">
        {/* Breadcrumb / Voltar */}
        <Link
          href="/carrinho"
          className="inline-flex items-center gap-2 text-sm font-['Inter'] text-[rgb(108,25,29)] hover:underline mb-6"
        >
          <ChevronLeft className="w-4 h-4" />
          Voltar para o carrinho
        </Link>

        <h1 className="text-[32px] font-['Inter'] font-bold text-black mb-2">Endereço de Entrega</h1>
        <p className="text-base font-['Inter'] text-gray-600 mb-8">
          Preencha os dados do endereço onde deseja receber seu pedido
        </p>

        <div className="flex gap-6">
          {/* Formulário - Coluna Principal */}
          <div className="flex-1">
            <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 border border-[rgb(229,229,229)]">

              {/* CEP */}
              <div className="mb-6">
                <label className="block text-sm font-['Inter'] font-medium text-black mb-2">
                  CEP <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.cep}
                  onChange={(e) => setFormData({ ...formData, cep: e.target.value.replace(/\D/g, '').slice(0, 8) })}
                  onBlur={buscarCEP}
                  placeholder="00000-000"
                  maxLength={8}
                  required
                  className="w-full h-12 px-4 rounded-lg border border-[rgb(217,217,217)] font-['Inter'] text-base text-black placeholder-gray-400 focus:border-[rgb(108,25,29)] focus:outline-none transition-colors"
                />
              </div>

              {/* Rua */}
              <div className="mb-6">
                <label className="block text-sm font-['Inter'] font-medium text-black mb-2">
                  Rua <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.rua}
                  onChange={(e) => setFormData({ ...formData, rua: e.target.value })}
                  placeholder="Nome da rua"
                  required
                  className="w-full h-12 px-4 rounded-lg border border-[rgb(217,217,217)] font-['Inter'] text-base text-black placeholder-gray-400 focus:border-[rgb(108,25,29)] focus:outline-none transition-colors"
                />
              </div>

              {/* Número e Complemento */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-['Inter'] font-medium text-black mb-2">
                    Número <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.numero}
                    onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
                    placeholder="123"
                    required
                    className="w-full h-12 px-4 rounded-lg border border-[rgb(217,217,217)] font-['Inter'] text-base text-black placeholder-gray-400 focus:border-[rgb(108,25,29)] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-['Inter'] font-medium text-black mb-2">
                    Complemento
                  </label>
                  <input
                    type="text"
                    value={formData.complemento}
                    onChange={(e) => setFormData({ ...formData, complemento: e.target.value })}
                    placeholder="Apto, Bloco, etc"
                    className="w-full h-12 px-4 rounded-lg border border-[rgb(217,217,217)] font-['Inter'] text-base text-black placeholder-gray-400 focus:border-[rgb(108,25,29)] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Bairro */}
              <div className="mb-6">
                <label className="block text-sm font-['Inter'] font-medium text-black mb-2">
                  Bairro <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.bairro}
                  onChange={(e) => setFormData({ ...formData, bairro: e.target.value })}
                  placeholder="Nome do bairro"
                  required
                  className="w-full h-12 px-4 rounded-lg border border-[rgb(217,217,217)] font-['Inter'] text-base text-black placeholder-gray-400 focus:border-[rgb(108,25,29)] focus:outline-none transition-colors"
                />
              </div>

              {/* Cidade e Estado */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div>
                  <label className="block text-sm font-['Inter'] font-medium text-black mb-2">
                    Cidade <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.cidade}
                    onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                    placeholder="Nome da cidade"
                    required
                    className="w-full h-12 px-4 rounded-lg border border-[rgb(217,217,217)] font-['Inter'] text-base text-black placeholder-gray-400 focus:border-[rgb(108,25,29)] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-['Inter'] font-medium text-black mb-2">
                    Estado <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.estado}
                    onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                    required
                    className="w-full h-12 px-4 rounded-lg border border-[rgb(217,217,217)] font-['Inter'] text-base text-black focus:border-[rgb(108,25,29)] focus:outline-none transition-colors"
                  >
                    <option value="">Selecione</option>
                    <option value="AC">AC</option>
                    <option value="AL">AL</option>
                    <option value="AP">AP</option>
                    <option value="AM">AM</option>
                    <option value="BA">BA</option>
                    <option value="CE">CE</option>
                    <option value="DF">DF</option>
                    <option value="ES">ES</option>
                    <option value="GO">GO</option>
                    <option value="MA">MA</option>
                    <option value="MT">MT</option>
                    <option value="MS">MS</option>
                    <option value="MG">MG</option>
                    <option value="PA">PA</option>
                    <option value="PB">PB</option>
                    <option value="PR">PR</option>
                    <option value="PE">PE</option>
                    <option value="PI">PI</option>
                    <option value="RJ">RJ</option>
                    <option value="RN">RN</option>
                    <option value="RS">RS</option>
                    <option value="RO">RO</option>
                    <option value="RR">RR</option>
                    <option value="SC">SC</option>
                    <option value="SP">SP</option>
                    <option value="SE">SE</option>
                    <option value="TO">TO</option>
                  </select>
                </div>
              </div>

              {/* Botões */}
              <div className="flex gap-4">
                <Link
                  href="/carrinho"
                  className="flex-1 h-12 flex items-center justify-center rounded-lg border border-[rgb(217,217,217)] font-['Inter'] font-medium text-black hover:bg-gray-50 transition-colors"
                >
                  Voltar
                </Link>
                <button
                  type="submit"
                  className="flex-1 h-12 flex items-center justify-center rounded-lg bg-[rgb(108,25,29)] font-['Inter'] font-medium text-white hover:bg-[rgb(88,20,24)] transition-colors"
                >
                  Continuar
                </button>
              </div>
            </form>
          </div>

          {/* Resumo do Pedido - Sidebar */}
          <div className="w-[400px] flex-shrink-0">
            <div className="bg-white rounded-xl p-6 border border-[rgb(229,229,229)] sticky top-8">
              <h2 className="text-xl font-['Inter'] font-bold text-black mb-6">
                Resumo do Pedido
              </h2>

              <div className="flex flex-col gap-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-base font-['Inter'] text-gray-600">Subtotal</span>
                  <span className="text-base font-['Inter'] font-medium text-black">
                    R$ 980,88
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
                    R$ {cartTotal.toFixed(2).replace('.', ',')}
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
                  <div className="w-6 h-6 rounded-full bg-[rgb(108,25,29)] flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-['Inter'] font-bold text-white">2</span>
                  </div>
                  <span className="text-sm font-['Inter'] font-medium text-black">Endereço</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-['Inter'] font-bold text-white">3</span>
                  </div>
                  <span className="text-sm font-['Inter'] text-gray-400">Pagamento</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-['Inter'] font-bold text-white">4</span>
                  </div>
                  <span className="text-sm font-['Inter'] text-gray-400">Confirmação</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[rgb(108,25,29)] text-white mt-20">
        <div className="w-full max-w-[1224px] mx-auto px-6 py-8">
          <div className="text-center">
            <p className="text-sm text-[rgb(241,237,237)] font-['Inter']">
              © 2025 By Rosa Chic, All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
