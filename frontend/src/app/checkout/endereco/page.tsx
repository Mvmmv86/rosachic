'use client'

import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cart-store'
import { useCheckoutStore } from '@/store/checkout-store'
import { formatPrice } from '@/lib/products'
import { useAuth } from '@/contexts/AuthContext'
import { api } from '@/lib/api'

export default function EnderecoPage() {
  const router = useRouter()
  const { items } = useCartStore()
  const { setAddress } = useCheckoutStore()
  const { user, isAuthenticated, isLoading: authLoading } = useAuth()

  const [formData, setFormData] = useState({
    cep: '',
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: ''
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [saveAsDefault, setSaveAsDefault] = useState(true)

  // Verificar autenticação ao carregar
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      // Salvar URL atual para retornar após login
      localStorage.setItem('redirectAfterLogin', '/checkout/endereco')
      router.push('/login')
    }
  }, [authLoading, isAuthenticated, router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mostrar modal de confirmação
    setShowModal(true)
  }

  const handleConfirmSave = async () => {
    setLoading(true)
    setError('')
    setShowModal(false)

    try {
      // 1. Verificar se está autenticado
      if (!isAuthenticated) {
        setError('Você precisa estar logado para continuar')
        localStorage.setItem('redirectAfterLogin', '/checkout/endereco')
        router.push('/login')
        return
      }

      // 2. Preparar dados do endereço
      const addressData = {
        name: 'Endereço de Entrega',
        street: formData.rua,
        number: formData.numero,
        complement: formData.complemento || undefined,
        neighborhood: formData.bairro,
        city: formData.cidade,
        state: formData.estado,
        zipCode: formData.cep,
        isDefault: saveAsDefault
      }

      console.log('📦 Salvando endereço:', addressData)

      // Debug: verificar token
      const token = localStorage.getItem('token')
      console.log('🔑 Token no localStorage:', token ? token.substring(0, 50) + '...' : 'NENHUM TOKEN')
      console.log('👤 Usuário autenticado:', user)
      console.log('✅ isAuthenticated:', isAuthenticated)

      // 3. Salvar endereço no backend usando api (com interceptors)
      console.log('📡 Fazendo requisição POST para /users/me/addresses')
      const response = await api.post('/users/me/addresses', addressData)
      console.log('✅ Resposta recebida:', response.status)
      const savedAddress = response.data

      console.log('✅ Endereço salvo com sucesso:', savedAddress)

      // 4. Salvar no checkout store (para usar nas próximas páginas)
      setAddress({
        id: savedAddress.id,
        cep: formData.cep,
        rua: formData.rua,
        numero: formData.numero,
        complemento: formData.complemento,
        bairro: formData.bairro,
        cidade: formData.cidade,
        estado: formData.estado
      })

      // 5. Ir para página de pagamento
      router.push('/checkout/pagamento')
    } catch (err: any) {
      console.error('❌ Erro ao salvar endereço:', err)

      // Verificar se é erro 401 (token expirado)
      if (err.response?.status === 401) {
        setError('Sua sessão expirou. Por favor, faça login novamente.')
        localStorage.setItem('redirectAfterLogin', '/checkout/endereco')
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      } else {
        const errorMessage = err.response?.data?.message || err.message || 'Erro ao salvar endereço. Tente novamente.'
        setError(errorMessage)
        setShowModal(true) // Mostrar o modal novamente para o usuário tentar de novo
      }
    } finally {
      setLoading(false)
    }
  }

  const handleContinueWithoutSaving = () => {
    setShowModal(false)
    // Apenas salvar no checkout store (não no backend)
    setAddress({
      cep: formData.cep,
      rua: formData.rua,
      numero: formData.numero,
      complemento: formData.complemento,
      bairro: formData.bairro,
      cidade: formData.cidade,
      estado: formData.estado
    })
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

  // Calcular total do carrinho baseado nos itens reais
  const cartTotal = items.reduce((total, item) => {
    return total + (item.pricing.totalFinal * item.quantity)
  }, 0)

  // Mostrar loading enquanto verifica autenticação
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[rgb(241,237,237)] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[rgb(108,25,29)] mx-auto mb-4"></div>
          <p className="text-base font-['Inter'] text-gray-600">Verificando autenticação...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[rgb(241,237,237)]">
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

              {/* Mensagem de erro */}
              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm font-['Inter'] text-red-600">{error}</p>
                </div>
              )}

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
                  disabled={loading}
                  className="flex-1 h-12 flex items-center justify-center rounded-lg bg-[rgb(108,25,29)] font-['Inter'] font-medium text-white hover:bg-[rgb(88,20,24)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Salvando...' : 'Continuar'}
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

      {/* Modal de Confirmação */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-xl font-['Inter'] font-bold text-black mb-4">
              Salvar Endereço
            </h3>

            <p className="text-base font-['Inter'] text-gray-600 mb-6">
              Deseja salvar este endereço para compras futuras?
            </p>

            {/* Resumo do endereço */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm font-['Inter'] text-gray-700">
                <strong>CEP:</strong> {formData.cep}
              </p>
              <p className="text-sm font-['Inter'] text-gray-700">
                <strong>Endereço:</strong> {formData.rua}, {formData.numero}
                {formData.complemento && ` - ${formData.complemento}`}
              </p>
              <p className="text-sm font-['Inter'] text-gray-700">
                <strong>Bairro:</strong> {formData.bairro}
              </p>
              <p className="text-sm font-['Inter'] text-gray-700">
                <strong>Cidade:</strong> {formData.cidade} - {formData.estado}
              </p>
            </div>

            {/* Checkbox para salvar como principal */}
            <label className="flex items-center gap-3 mb-6 cursor-pointer">
              <input
                type="checkbox"
                checked={saveAsDefault}
                onChange={(e) => setSaveAsDefault(e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-[rgb(108,25,29)] focus:ring-[rgb(108,25,29)]"
              />
              <span className="text-sm font-['Inter'] text-gray-700">
                Definir como endereço principal
              </span>
            </label>

            {/* Botões */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleConfirmSave}
                disabled={loading}
                className="w-full h-12 flex items-center justify-center rounded-lg bg-[rgb(108,25,29)] font-['Inter'] font-medium text-white hover:bg-[rgb(88,20,24)] transition-colors disabled:opacity-50"
              >
                {loading ? 'Salvando...' : 'Sim, Salvar Endereço'}
              </button>

              <button
                onClick={handleContinueWithoutSaving}
                disabled={loading}
                className="w-full h-12 flex items-center justify-center rounded-lg border border-[rgb(217,217,217)] font-['Inter'] font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Não Salvar (Usar Apenas Nesta Compra)
              </button>

              <button
                onClick={() => setShowModal(false)}
                disabled={loading}
                className="w-full h-10 flex items-center justify-center font-['Inter'] text-sm text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
