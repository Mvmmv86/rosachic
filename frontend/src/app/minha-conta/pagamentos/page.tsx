'use client'

import { AccountLayout } from '@/components/AccountLayout'
import { useState } from 'react'
import { CreditCard, Plus, Trash2 } from 'lucide-react'

interface PaymentMethod {
  id: number
  tipo: 'credito' | 'debito'
  bandeira: string
  numero: string
  nome: string
  validade: string
  principal: boolean
}

export default function PagamentosPage() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: 1,
      tipo: 'credito',
      bandeira: 'Visa',
      numero: '**** **** **** 1234',
      nome: 'JOSNEI SILVA',
      validade: '12/2025',
      principal: true
    },
    {
      id: 2,
      tipo: 'credito',
      bandeira: 'Mastercard',
      numero: '**** **** **** 5678',
      nome: 'JOSNEI SILVA',
      validade: '06/2026',
      principal: false
    }
  ])

  const [showForm, setShowForm] = useState(false)

  const handleDelete = (id: number) => {
    setPaymentMethods(paymentMethods.filter(pm => pm.id !== id))
  }

  const handleSetPrincipal = (id: number) => {
    setPaymentMethods(paymentMethods.map(pm => ({
      ...pm,
      principal: pm.id === id
    })))
  }

  const getBandeiraColor = (bandeira: string) => {
    const colors: { [key: string]: string } = {
      'Visa': 'bg-blue-600',
      'Mastercard': 'bg-red-600',
      'Elo': 'bg-yellow-600',
      'Amex': 'bg-green-600'
    }
    return colors[bandeira] || 'bg-gray-600'
  }

  return (
    <AccountLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="font-sans text-2xl font-semibold text-black">
            Formas de Pagamento
          </h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-6 py-2 bg-[rgb(108,25,29)] text-white font-sans text-sm font-medium rounded-lg hover:bg-[rgb(88,20,24)] transition-colors"
          >
            <Plus size={16} />
            Adicionar Cartão
          </button>
        </div>

        {/* Form de Adicionar (se visível) */}
        {showForm && (
          <div className="bg-[rgb(241,237,237)] rounded-lg shadow-sm p-8">
            <h2 className="font-sans text-lg font-semibold text-black mb-6">Novo Cartão</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block font-sans text-sm text-[rgb(119,105,106)] mb-2">
                  Número do cartão
                </label>
                <input
                  type="text"
                  placeholder="0000 0000 0000 0000"
                  maxLength={19}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg font-sans text-base focus:outline-none focus:ring-2 focus:ring-[rgb(108,25,29)] focus:border-transparent"
                />
              </div>

              <div className="col-span-2">
                <label className="block font-sans text-sm text-[rgb(119,105,106)] mb-2">
                  Nome no cartão
                </label>
                <input
                  type="text"
                  placeholder="Como está impresso no cartão"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg font-sans text-base focus:outline-none focus:ring-2 focus:ring-[rgb(108,25,29)] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block font-sans text-sm text-[rgb(119,105,106)] mb-2">
                  Validade
                </label>
                <input
                  type="text"
                  placeholder="MM/AA"
                  maxLength={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg font-sans text-base focus:outline-none focus:ring-2 focus:ring-[rgb(108,25,29)] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block font-sans text-sm text-[rgb(119,105,106)] mb-2">
                  CVV
                </label>
                <input
                  type="text"
                  placeholder="000"
                  maxLength={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg font-sans text-base focus:outline-none focus:ring-2 focus:ring-[rgb(108,25,29)] focus:border-transparent"
                />
              </div>

              <div className="col-span-2">
                <label className="block font-sans text-sm text-[rgb(119,105,106)] mb-2">
                  Tipo de cartão
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg font-sans text-base focus:outline-none focus:ring-2 focus:ring-[rgb(108,25,29)] focus:border-transparent">
                  <option value="credito">Crédito</option>
                  <option value="debito">Débito</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowForm(false)}
                className="px-6 py-2 bg-white border border-[rgb(108,25,29)] text-[rgb(108,25,29)] font-sans text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button className="px-6 py-2 bg-[rgb(108,25,29)] text-white font-sans text-sm font-medium rounded-lg hover:bg-[rgb(88,20,24)] transition-colors">
                Salvar Cartão
              </button>
            </div>
          </div>
        )}

        {/* Lista de Cartões */}
        <div className="space-y-4">
          {paymentMethods.map((card) => (
            <div
              key={card.id}
              className="bg-[rgb(241,237,237)] rounded-lg shadow-sm p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex gap-4">
                  <div className={`w-16 h-12 ${getBandeiraColor(card.bandeira)} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <CreditCard className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-sans text-base font-semibold text-black">
                        {card.bandeira} {card.tipo === 'credito' ? 'Crédito' : 'Débito'}
                      </h3>
                      {card.principal && (
                        <span className="px-2 py-1 bg-[rgb(108,25,29)] text-white text-xs font-sans rounded">
                          Principal
                        </span>
                      )}
                    </div>
                    <p className="font-sans text-sm text-gray-700 mb-1">
                      {card.numero}
                    </p>
                    <p className="font-sans text-xs text-gray-600">
                      {card.nome} • Validade: {card.validade}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  {!card.principal && (
                    <button
                      onClick={() => handleSetPrincipal(card.id)}
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

        {paymentMethods.length === 0 && (
          <div className="bg-[rgb(241,237,237)] rounded-lg shadow-sm p-12 text-center">
            <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="font-sans text-lg font-semibold text-black mb-2">
              Nenhum cartão cadastrado
            </h3>
            <p className="font-sans text-sm text-gray-600 mb-6">
              Adicione um cartão para agilizar suas compras
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-2 bg-[rgb(108,25,29)] text-white font-sans text-sm font-medium rounded-lg hover:bg-[rgb(88,20,24)] transition-colors"
            >
              Adicionar Cartão
            </button>
          </div>
        )}

        {/* Outros métodos de pagamento */}
        <div className="bg-[rgb(241,237,237)] rounded-lg shadow-sm p-6">
          <h2 className="font-sans text-lg font-semibold text-black mb-4">
            Outros métodos de pagamento
          </h2>
          <p className="font-sans text-sm text-gray-600 mb-4">
            Você também pode pagar com PIX ou Boleto Bancário no momento da compra.
          </p>
          <div className="flex gap-4">
            <div className="flex-1 p-4 border border-gray-300 rounded-lg text-center">
              <div className="w-12 h-12 bg-[rgb(108,25,29)] rounded-lg flex items-center justify-center mx-auto mb-2">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                </svg>
              </div>
              <p className="font-sans text-sm font-medium text-black">PIX</p>
            </div>
            <div className="flex-1 p-4 border border-gray-300 rounded-lg text-center">
              <div className="w-12 h-12 bg-[rgb(108,25,29)] rounded-lg flex items-center justify-center mx-auto mb-2">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <line x1="3" y1="9" x2="21" y2="9"/>
                  <line x1="9" y1="21" x2="9" y2="9"/>
                </svg>
              </div>
              <p className="font-sans text-sm font-medium text-black">Boleto</p>
            </div>
          </div>
        </div>
      </div>
    </AccountLayout>
  )
}
