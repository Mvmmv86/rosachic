'use client'

import { AccountLayout } from '@/components/AccountLayout'
import { useState, useEffect } from 'react'
import { User } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'

export default function MinhaContaPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading: authLoading, updateProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    birthDate: '',
    gender: '',
    phone: ''
  })

  // Carregar dados do usuário
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login')
      return
    }

    if (user) {
      setFormData({
        name: user.name || '',
        cpf: user.cpf || '',
        birthDate: user.birthDate ? formatDateToInput(user.birthDate) : '',
        gender: user.gender || '',
        phone: user.phone || ''
      })
    }
  }, [user, isAuthenticated, authLoading, router])

  // Converter ISO string para formato de input date (YYYY-MM-DD)
  function formatDateToInput(isoDate: string): string {
    try {
      const date = new Date(isoDate)
      return date.toISOString().split('T')[0]
    } catch {
      return ''
    }
  }

  // Converter formato de input date para display (DD/MM/YYYY)
  function formatDateToDisplay(inputDate: string): string {
    if (!inputDate) return ''
    const [year, month, day] = inputDate.split('-')
    return `${day}/${month}/${year}`
  }

  const handleSave = async () => {
    setError('')
    setSuccess('')
    setIsSaving(true)

    try {
      await updateProfile({
        name: formData.name,
        phone: formData.phone || undefined,
        birthDate: formData.birthDate || undefined,
        gender: formData.gender || undefined,
      })

      setSuccess('Perfil atualizado com sucesso!')
      setIsEditing(false)

      setTimeout(() => setSuccess(''), 3000)
    } catch (err: any) {
      setError(err.message || 'Erro ao atualizar perfil')
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    if (user) {
      setFormData({
        name: user.name || '',
        cpf: user.cpf || '',
        birthDate: user.birthDate ? formatDateToInput(user.birthDate) : '',
        gender: user.gender || '',
        phone: user.phone || ''
      })
    }
    setIsEditing(false)
    setError('')
  }

  if (authLoading) {
    return (
      <AccountLayout>
        <div className="bg-[rgb(241,237,237)] rounded-lg shadow-sm p-12 text-center">
          <p className="font-sans text-sm text-gray-600">Carregando...</p>
        </div>
      </AccountLayout>
    )
  }

  // Se não houver dados do usuário, mostrar estado vazio
  if (!user) {
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
                disabled={isSaving}
                className="px-6 py-2 bg-white border border-[rgb(108,25,29)] text-[rgb(108,25,29)] font-sans text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-6 py-2 bg-[rgb(108,25,29)] text-white font-sans text-sm font-medium rounded-lg hover:bg-[rgb(88,20,24)] transition-colors disabled:opacity-50"
              >
                {isSaving ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
          )}
        </div>

        {/* Mensagens */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-6">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm mb-6">
            {success}
          </div>
        )}

        <div className="grid grid-cols-2 gap-6">
          {/* Nome */}
          <div>
            <label className="block font-sans text-sm text-[rgb(119,105,106)] mb-2">
              Nome
            </label>
            {isEditing ? (
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg font-sans text-base text-black focus:outline-none focus:ring-2 focus:ring-[rgb(108,25,29)] focus:border-transparent"
              />
            ) : (
              <p className="font-sans text-base text-black">
                {formData.name || '-'}
              </p>
            )}
          </div>

          {/* CPF */}
          <div>
            <label className="block font-sans text-sm text-[rgb(119,105,106)] mb-2">
              CPF
            </label>
            <p className="font-sans text-base text-black">
              {formData.cpf || '-'}
            </p>
          </div>

          {/* Data de Nascimento */}
          <div>
            <label className="block font-sans text-sm text-[rgb(119,105,106)] mb-2">
              Data de nascimento
            </label>
            {isEditing ? (
              <input
                type="date"
                value={formData.birthDate}
                onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg font-sans text-base text-black focus:outline-none focus:ring-2 focus:ring-[rgb(108,25,29)] focus:border-transparent"
              />
            ) : (
              <p className="font-sans text-base text-black">
                {formData.birthDate ? formatDateToDisplay(formData.birthDate) : '-'}
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
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg font-sans text-base text-black focus:outline-none focus:ring-2 focus:ring-[rgb(108,25,29)] focus:border-transparent"
              >
                <option value="">Selecione</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="Outro">Outro</option>
              </select>
            ) : (
              <p className="font-sans text-base text-black">
                {formData.gender || '-'}
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
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+55 (00) 00000-0000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg font-sans text-base text-black focus:outline-none focus:ring-2 focus:ring-[rgb(108,25,29)] focus:border-transparent"
              />
            ) : (
              <p className="font-sans text-base text-black">
                {formData.phone || '-'}
              </p>
            )}
          </div>
        </div>
      </div>
    </AccountLayout>
  )
}
