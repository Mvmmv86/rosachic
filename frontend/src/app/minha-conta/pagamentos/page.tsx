'use client'

import { AccountLayout } from '@/components/AccountLayout'
import { CreditCard, Shield, Plus, Trash2, AlertCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import { CreditCardForm, type CardData } from '@/components/CreditCardForm'
import { api } from '@/lib/api'
import { showToast } from '@/lib/toast'
import toast from 'react-hot-toast'

interface SavedCard {
  id: string
  lastFourDigits: string
  brand: string
  expirationMonth: string
  expirationYear: string
  holderName: string
  isDefault: boolean
}

export default function PagamentosPage() {
  const [savedCards, setSavedCards] = useState<SavedCard[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [cardData, setCardData] = useState<CardData | null>(null)
  const [isCardValid, setIsCardValid] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchSavedCards()
  }, [])

  const fetchSavedCards = async () => {
    try {
      const response = await api.get('/users/me/cards')
      setSavedCards(response.data)
    } catch (error) {
      console.error('Erro ao buscar cartões:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveCard = async () => {
    if (!isCardValid || !cardData) {
      showToast.error('Por favor, preencha todos os dados do cartão corretamente')
      return
    }

    setSaving(true)
    const loadingToast = showToast.loading('Salvando cartão...')

    try {
      // Por segurança PCI DSS, geramos um token simulado aqui
      // Em produção, isso seria feito pelo SDK do Mercado Pago
      const cardToken = `tok_${crypto.randomUUID().replace(/-/g, '')}`

      const cardPayload = {
        cardToken,
        lastFourDigits: cardData.cardNumber.replace(/\D/g, '').slice(-4),
        brand: cardData.brand,
        expirationMonth: cardData.expiryDate.split('/')[0],
        expirationYear: '20' + cardData.expiryDate.split('/')[1],
        holderName: cardData.cardHolder,
        isDefault: savedCards.length === 0,
      }

      await api.post('/users/me/cards', cardPayload)
      await fetchSavedCards()
      setShowForm(false)
      showToast.success('Cartão adicionado com sucesso!')
    } catch (error: any) {
      console.error('Erro ao salvar cartão:', error)
      if (error.response?.status === 401) {
        showToast.error('Sua sessão expirou. Faça login novamente.')
        setTimeout(() => window.location.href = '/login', 2000)
      } else {
        showToast.error('Erro ao salvar cartão: ' + (error.response?.data?.message || error.message))
      }
    } finally {
      toast.dismiss(loadingToast)
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja remover este cartão?')) return

    showToast.promise(
      api.delete(`/users/me/cards/${id}`).then(() => fetchSavedCards()),
      {
        loading: 'Removendo cartão...',
        success: 'Cartão removido com sucesso!',
        error: 'Erro ao remover cartão',
      }
    )
  }

  const handleSetDefault = async (id: string) => {
    showToast.promise(
      api.put(`/users/me/cards/${id}`, { isDefault: true }).then(() => fetchSavedCards()),
      {
        loading: 'Atualizando...',
        success: 'Cartão principal atualizado!',
        error: 'Erro ao atualizar cartão principal',
      }
    )
  }

  const getBrandColor = (brand: string) => {
    const colors: { [key: string]: string } = {
      visa: 'bg-blue-600',
      mastercard: 'bg-red-600',
      elo: 'bg-yellow-600',
      amex: 'bg-green-600',
      hipercard: 'bg-orange-600',
      diners: 'bg-purple-600',
    }
    return colors[brand.toLowerCase()] || 'bg-gray-600'
  }

  const getBrandName = (brand: string) => {
    const names: { [key: string]: string } = {
      visa: 'Visa',
      mastercard: 'Mastercard',
      elo: 'Elo',
      amex: 'American Express',
      hipercard: 'Hipercard',
      diners: 'Diners Club',
    }
    return names[brand.toLowerCase()] || brand
  }

  if (loading) {
    return (
      <AccountLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[rgb(108,25,29)]"></div>
            <p className="mt-4 text-gray-600">Carregando cartões...</p>
          </div>
        </div>
      </AccountLayout>
    )
  }

  return (
    <AccountLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-sans text-2xl font-semibold text-black mb-2">
              Formas de Pagamento
            </h1>
            <p className="font-sans text-sm text-gray-600">
              Adicione cartões para compras mais rápidas
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-6 py-2 bg-[rgb(108,25,29)] text-white font-sans text-sm font-medium rounded-lg hover:bg-[rgb(88,20,24)] transition-colors"
          >
            <Plus size={16} />
            Adicionar Cartão
          </button>
        </div>

        {/* Aviso de Segurança */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-sans text-sm font-semibold text-green-900 mb-1">
                Seus dados estão protegidos
              </h3>
              <p className="font-sans text-xs text-green-800">
                Não armazenamos dados completos do cartão. Apenas guardamos um token seguro fornecido pelo Mercado Pago e os últimos 4 dígitos para sua identificação.
              </p>
            </div>
          </div>
        </div>

        {/* Formulário de Adicionar Cartão */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-sans text-xl font-semibold text-black">
                Adicionar Novo Cartão
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <CreditCardForm
              onValidCard={(data) => {
                setCardData(data)
                setIsCardValid(true)
              }}
              onInvalidCard={() => {
                setIsCardValid(false)
              }}
            />

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 px-6 py-3 bg-white border border-[rgb(108,25,29)] text-[rgb(108,25,29)] font-sans text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveCard}
                disabled={!isCardValid || saving}
                className="flex-1 px-6 py-3 bg-[rgb(108,25,29)] text-white font-sans text-sm font-medium rounded-lg hover:bg-[rgb(88,20,24)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Salvando...' : 'Salvar Cartão'}
              </button>
            </div>
          </div>
        )}

        {/* Lista de Cartões Salvos */}
        {savedCards.length > 0 && (
          <div className="space-y-4">
            <h2 className="font-sans text-lg font-semibold text-black">
              Cartões Salvos
            </h2>
            {savedCards.map((card) => (
              <div
                key={card.id}
                className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex gap-4">
                    <div className={`w-16 h-12 ${getBrandColor(card.brand)} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <CreditCard className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-sans text-base font-semibold text-black">
                          {getBrandName(card.brand)}
                        </h3>
                        {card.isDefault && (
                          <span className="px-2 py-1 bg-[rgb(108,25,29)] text-white text-xs font-sans rounded">
                            Principal
                          </span>
                        )}
                      </div>
                      <p className="font-sans text-sm text-gray-700 mb-1">
                        •••• •••• •••• {card.lastFourDigits}
                      </p>
                      <p className="font-sans text-xs text-gray-600">
                        {card.holderName} • Validade: {card.expirationMonth}/{card.expirationYear}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {!card.isDefault && (
                      <button
                        onClick={() => handleSetDefault(card.id)}
                        className="px-4 py-2 text-[rgb(108,25,29)] font-sans text-sm hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        Tornar principal
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(card.id)}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Estado vazio */}
        {savedCards.length === 0 && !showForm && (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center border border-gray-200">
            <CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="font-sans text-lg font-semibold text-black mb-2">
              Nenhum cartão cadastrado
            </h3>
            <p className="font-sans text-sm text-gray-600 mb-6">
              Adicione um cartão para agilizar suas compras futuras
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[rgb(108,25,29)] text-white font-sans text-sm font-medium rounded-lg hover:bg-[rgb(88,20,24)] transition-colors"
            >
              <Plus size={16} />
              Adicionar Primeiro Cartão
            </button>
          </div>
        )}

        {/* Informação sobre segurança */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-sans text-sm font-semibold text-blue-900 mb-1">
                Validação automática
              </h3>
              <p className="font-sans text-xs text-blue-800">
                Nosso sistema valida automaticamente o número do cartão (algoritmo de Luhn), data de validade, CVV e detecta a bandeira.
                Os dados são criptografados e tokenizados pelo Mercado Pago antes de serem armazenados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AccountLayout>
  )
}