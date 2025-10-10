'use client'

import { AccountLayout } from '@/components/AccountLayout'
import { useState } from 'react'
import Link from 'next/link'
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

export default function MeuPerfilPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState({
    nome: 'Josnei',
    cpf: '520.250.526.30',
    dataNascimento: '20/01/1985',
    genero: 'Masculino',
    telefone: '+55 48 9 8985 8985',
    email: 'josnei.silva@email.com'
  })

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
    }
  ])

  const handleSave = () => {
    setIsEditing(false)
    // Aqui você adicionaria a lógica para salvar os dados
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Aqui você poderia resetar os dados para os valores originais
  }

  const handleDeleteAddress = (id: number) => {
    setAddresses(addresses.filter(addr => addr.id !== id))
  }

  return (
    <AccountLayout>
      <div className="space-y-6">
        {/* Dados Pessoais */}
        <div className="bg-[rgb(241,237,237)] rounded-lg shadow-sm p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-sans text-2xl font-semibold text-black">
              Meu Perfil
            </h1>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 bg-[rgb(108,25,29)] text-white font-sans text-sm font-medium rounded-lg hover:bg-[rgb(88,20,24)] transition-colors"
              >
                Alterar
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={handleCancel}
                  className="px-6 py-2 bg-white border border-[rgb(108,25,29)] text-[rgb(108,25,29)] font-sans text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-[rgb(108,25,29)] text-white font-sans text-sm font-medium rounded-lg hover:bg-[rgb(88,20,24)] transition-colors"
                >
                  Salvar
                </button>
              </div>
            )}
          </div>

          <h2 className="font-sans text-lg font-semibold text-black mb-4">
            Dados Pessoais
          </h2>

          <div className="grid grid-cols-2 gap-6">
            {/* Nome */}
            <div>
              <label className="block font-sans text-sm text-[rgb(119,105,106)] mb-2">
                Nome
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={userData.nome}
                  onChange={(e) => setUserData({ ...userData, nome: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg font-sans text-base text-black focus:outline-none focus:ring-2 focus:ring-[rgb(108,25,29)] focus:border-transparent"
                />
              ) : (
                <p className="font-sans text-base text-black">
                  {userData.nome}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block font-sans text-sm text-[rgb(119,105,106)] mb-2">
                E-mail
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg font-sans text-base text-black focus:outline-none focus:ring-2 focus:ring-[rgb(108,25,29)] focus:border-transparent"
                />
              ) : (
                <p className="font-sans text-base text-black">
                  {userData.email}
                </p>
              )}
            </div>

            {/* CPF */}
            <div>
              <label className="block font-sans text-sm text-[rgb(119,105,106)] mb-2">
                CPF
              </label>
              <p className="font-sans text-base text-black">
                {userData.cpf}
              </p>
            </div>

            {/* Data de Nascimento */}
            <div>
              <label className="block font-sans text-sm text-[rgb(119,105,106)] mb-2">
                Data de nascimento
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={userData.dataNascimento}
                  onChange={(e) => setUserData({ ...userData, dataNascimento: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg font-sans text-base text-black focus:outline-none focus:ring-2 focus:ring-[rgb(108,25,29)] focus:border-transparent"
                />
              ) : (
                <p className="font-sans text-base text-black">
                  {userData.dataNascimento}
                </p>
              )}
            </div>

            {/* Gênero */}
            <div>
              <label className="block font-sans text-sm text-[rgb(119,105,106)] mb-2">
                Gênero
              </label>
              {isEditing ? (
                <select
                  value={userData.genero}
                  onChange={(e) => setUserData({ ...userData, genero: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg font-sans text-base text-black focus:outline-none focus:ring-2 focus:ring-[rgb(108,25,29)] focus:border-transparent"
                >
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                  <option value="Outro">Outro</option>
                </select>
              ) : (
                <p className="font-sans text-base text-black">
                  {userData.genero}
                </p>
              )}
            </div>

            {/* Número de telefone */}
            <div>
              <label className="block font-sans text-sm text-[rgb(119,105,106)] mb-2">
                Número de telefone
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={userData.telefone}
                  onChange={(e) => setUserData({ ...userData, telefone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg font-sans text-base text-black focus:outline-none focus:ring-2 focus:ring-[rgb(108,25,29)] focus:border-transparent"
                />
              ) : (
                <p className="font-sans text-base text-black">
                  {userData.telefone}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Endereços Section */}
        <div className="bg-[rgb(241,237,237)] rounded-lg shadow-sm p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-sans text-lg font-semibold text-black">
              Endereços
            </h2>
            <Link
              href="/minha-conta/enderecos"
              className="flex items-center gap-2 px-4 py-2 bg-[rgb(108,25,29)] text-white font-sans text-sm font-medium rounded-lg hover:bg-[rgb(88,20,24)] transition-colors"
            >
              <Plus size={16} />
              Adicionar Endereço
            </Link>
          </div>

          {addresses.length > 0 ? (
            <div className="space-y-4">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className="bg-white rounded-lg p-4 border border-gray-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 bg-[rgb(108,25,29)] rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-sans text-base font-semibold text-black">
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
                      <button className="p-2 text-gray-600 hover:text-[rgb(108,25,29)] hover:bg-gray-100 rounded-lg transition-colors">
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteAddress(address.id)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Link
              href="/minha-conta/enderecos"
              className="block w-full py-4 border-2 border-dashed border-gray-300 rounded-lg font-sans text-sm text-gray-600 hover:border-[rgb(108,25,29)] hover:text-[rgb(108,25,29)] transition-colors text-center"
            >
              + Adicionar novo endereço
            </Link>
          )}
        </div>
      </div>
    </AccountLayout>
  )
}
