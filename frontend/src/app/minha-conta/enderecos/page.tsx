'use client'

import { AccountLayout } from '@/components/AccountLayout'
import { useState } from 'react'
import { MapPin, Plus, Pencil, Trash2 } from 'lucide-react'

interface Address {
  id: number
  nome: string
  cep: string
  endereco: string
  numero: string
  complemento: string
  bairro: string
  cidade: string
  estado: string
  principal: boolean
}

export default function EnderecosPage() {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      nome: 'Casa',
      cep: '88015-100',
      endereco: 'Rua Felipe Schmidt',
      numero: '123',
      complemento: 'Apt 401',
      bairro: 'Centro',
      cidade: 'Florianópolis',
      estado: 'SC',
      principal: true
    },
    {
      id: 2,
      nome: 'Trabalho',
      cep: '88010-000',
      endereco: 'Av. Beira Mar Norte',
      numero: '456',
      complemento: 'Sala 12',
      bairro: 'Centro',
      cidade: 'Florianópolis',
      estado: 'SC',
      principal: false
    }
  ])

  const [showForm, setShowForm] = useState(false)

  const handleDelete = (id: number) => {
    setAddresses(addresses.filter(addr => addr.id !== id))
  }

  const handleSetPrincipal = (id: number) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      principal: addr.id === id
    })))
  }

  return (
    <AccountLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="font-sans text-2xl font-semibold text-black">
            Meus Endereços
          </h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-6 py-2 bg-[rgb(108,25,29)] text-white font-sans text-sm font-medium rounded-lg hover:bg-[rgb(88,20,24)] transition-colors"
          >
            <Plus size={16} />
            Adicionar Endereço
          </button>
        </div>

        {/* Form de Adicionar (se visível) */}
        {showForm && (
          <div className="bg-[rgb(241,237,237)] rounded-lg shadow-sm p-8">
            <h2 className="font-sans text-lg font-semibold text-black mb-6">Novo Endereço</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block font-sans text-sm text-[rgb(119,105,106)] mb-2">
                  Nome do endereço
                </label>
                <input
                  type="text"
                  placeholder="Ex: Casa, Trabalho, etc."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg font-sans text-base focus:outline-none focus:ring-2 focus:ring-[rgb(108,25,29)] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block font-sans text-sm text-[rgb(119,105,106)] mb-2">
                  CEP
                </label>
                <input
                  type="text"
                  placeholder="00000-000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg font-sans text-base focus:outline-none focus:ring-2 focus:ring-[rgb(108,25,29)] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block font-sans text-sm text-[rgb(119,105,106)] mb-2">
                  Estado
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg font-sans text-base focus:outline-none focus:ring-2 focus:ring-[rgb(108,25,29)] focus:border-transparent">
                  <option value="">Selecione</option>
                  <option value="SC">Santa Catarina</option>
                  <option value="PR">Paraná</option>
                  <option value="RS">Rio Grande do Sul</option>
                </select>
              </div>

              <div className="col-span-2">
                <label className="block font-sans text-sm text-[rgb(119,105,106)] mb-2">
                  Endereço
                </label>
                <input
                  type="text"
                  placeholder="Rua, Avenida, etc."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg font-sans text-base focus:outline-none focus:ring-2 focus:ring-[rgb(108,25,29)] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block font-sans text-sm text-[rgb(119,105,106)] mb-2">
                  Número
                </label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg font-sans text-base focus:outline-none focus:ring-2 focus:ring-[rgb(108,25,29)] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block font-sans text-sm text-[rgb(119,105,106)] mb-2">
                  Complemento
                </label>
                <input
                  type="text"
                  placeholder="Apt, Bloco, etc."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg font-sans text-base focus:outline-none focus:ring-2 focus:ring-[rgb(108,25,29)] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block font-sans text-sm text-[rgb(119,105,106)] mb-2">
                  Bairro
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg font-sans text-base focus:outline-none focus:ring-2 focus:ring-[rgb(108,25,29)] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block font-sans text-sm text-[rgb(119,105,106)] mb-2">
                  Cidade
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg font-sans text-base focus:outline-none focus:ring-2 focus:ring-[rgb(108,25,29)] focus:border-transparent"
                />
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
                Salvar Endereço
              </button>
            </div>
          </div>
        )}

        {/* Lista de Endereços */}
        <div className="space-y-4">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="bg-[rgb(241,237,237)] rounded-lg shadow-sm p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-[rgb(108,25,29)] rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-sans text-lg font-semibold text-black">
                        {address.nome}
                      </h3>
                      {address.principal && (
                        <span className="px-2 py-1 bg-[rgb(108,25,29)] text-white text-xs font-sans rounded">
                          Principal
                        </span>
                      )}
                    </div>
                    <p className="font-sans text-sm text-gray-700">
                      {address.endereco}, {address.numero}
                      {address.complemento && ` - ${address.complemento}`}
                    </p>
                    <p className="font-sans text-sm text-gray-700">
                      {address.bairro} - {address.cidade}/{address.estado}
                    </p>
                    <p className="font-sans text-sm text-gray-700">
                      CEP: {address.cep}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  {!address.principal && (
                    <button
                      onClick={() => handleSetPrincipal(address.id)}
                      className="px-4 py-2 text-[rgb(108,25,29)] font-sans text-sm hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      Tornar principal
                    </button>
                  )}
                  <button className="p-2 text-gray-600 hover:text-[rgb(108,25,29)] hover:bg-gray-100 rounded-lg transition-colors">
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(address.id)}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {addresses.length === 0 && (
          <div className="bg-[rgb(241,237,237)] rounded-lg shadow-sm p-12 text-center">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="font-sans text-lg font-semibold text-black mb-2">
              Nenhum endereço cadastrado
            </h3>
            <p className="font-sans text-sm text-gray-600 mb-6">
              Adicione um endereço para facilitar suas compras
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-2 bg-[rgb(108,25,29)] text-white font-sans text-sm font-medium rounded-lg hover:bg-[rgb(88,20,24)] transition-colors"
            >
              Adicionar Endereço
            </button>
          </div>
        )}
      </div>
    </AccountLayout>
  )
}
