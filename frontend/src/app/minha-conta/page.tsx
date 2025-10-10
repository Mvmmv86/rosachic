'use client'

import { AccountLayout } from '@/components/AccountLayout'
import { useState } from 'react'
import { User } from 'lucide-react'

export default function MinhaContaPage() {
  const [isEditing, setIsEditing] = useState(false)

  // Simular dados do usuário - mude para null para testar estado vazio
  const [userData, setUserData] = useState<{
    nome: string
    cpf: string
    dataNascimento: string
    genero: string
    telefone: string
  } | null>({
    nome: 'Josnei',
    cpf: '520.250.526.30',
    dataNascimento: '20/01/1985',
    genero: 'Masculino',
    telefone: '+55 48 9 8985 8985'
  })

  const handleSave = () => {
    setIsEditing(false)
    // Aqui você adicionaria a lógica para salvar os dados
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Aqui você poderia resetar os dados para os valores originais
  }

  // Se não houver dados do usuário, mostrar estado vazio
  if (!userData) {
    return (
      <AccountLayout>
        <div className="bg-[rgb(241,237,237)] rounded-lg shadow-sm p-12 text-center">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="font-sans text-xl font-semibold text-black mb-2">
            Complete seu perfil
          </h2>
          <p className="font-sans text-sm text-gray-600 mb-6">
            Adicione suas informações pessoais para ter uma experiência personalizada
          </p>
          <button
            onClick={() => setUserData({
              nome: '',
              cpf: '',
              dataNascimento: '',
              genero: '',
              telefone: ''
            })}
            className="px-6 py-2 bg-[rgb(108,25,29)] text-white font-sans text-sm font-medium rounded-lg hover:bg-[rgb(88,20,24)] transition-colors"
          >
            Adicionar Informações
          </button>
        </div>
      </AccountLayout>
    )
  }

  return (
    <AccountLayout>
      <div className="bg-[rgb(241,237,237)] rounded-lg shadow-sm p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-sans text-2xl font-semibold text-black">
            Minha Conta
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
          <div className="col-span-2">
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
    </AccountLayout>
  )
}
