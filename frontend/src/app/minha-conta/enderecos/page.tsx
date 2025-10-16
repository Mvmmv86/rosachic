'use client'

import { AccountLayout } from '@/components/AccountLayout'
import { useState, useEffect } from 'react'
import { MapPin, Plus, Pencil, Trash2 } from 'lucide-react'
import { api } from '@/lib/api'
import { showToast } from '@/lib/toast'

interface Address {
  id: string
  name: string
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
  isDefault: boolean
}

export default function EnderecosPage() {
  const [addresses, setAddresses] = useState<Address[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)

  // Dados do formulário
  const [formData, setFormData] = useState({
    name: '',
    zipCode: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    isDefault: false
  })

  const [loadingCep, setLoadingCep] = useState(false)

  useEffect(() => {
    fetchAddresses()
  }, [])

  const fetchAddresses = async () => {
    try {
      const response = await api.get('/users/me/addresses')
      setAddresses(response.data)
    } catch (error) {
      console.error('Erro ao buscar endereços:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este endereço?')) return

    showToast.promise(
      api.delete(`/users/me/addresses/${id}`).then(() => fetchAddresses()),
      {
        loading: 'Excluindo endereço...',
        success: 'Endereço excluído com sucesso!',
        error: 'Erro ao excluir endereço',
      }
    )
  }

  const handleSetPrincipal = async (id: string) => {
    showToast.promise(
      api.put(`/users/me/addresses/${id}`, { isDefault: true }).then(() => fetchAddresses()),
      {
        loading: 'Atualizando...',
        success: 'Endereço principal atualizado!',
        error: 'Erro ao definir endereço principal',
      }
    )
  }

  const handleCepChange = async (cep: string) => {
    const cleanCep = cep.replace(/\D/g, '')
    setFormData({ ...formData, zipCode: cleanCep })

    if (cleanCep.length === 8) {
      setLoadingCep(true)
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)
        const data = await response.json()

        if (!data.erro) {
          setFormData({
            ...formData,
            zipCode: cleanCep,
            street: data.logradouro || '',
            neighborhood: data.bairro || '',
            city: data.localidade || '',
            state: data.uf || '',
          })
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error)
      } finally {
        setLoadingCep(false)
      }
    }
  }

  const handleSaveAddress = async () => {
    if (!formData.name || !formData.zipCode || !formData.street || !formData.number ||
        !formData.neighborhood || !formData.city || !formData.state) {
      showToast.error('Por favor, preencha todos os campos obrigatórios')
      return
    }

    setSaving(true)
    try {
      await api.post('/users/me/addresses', formData)
      await fetchAddresses()
      setShowForm(false)
      setFormData({
        name: '',
        zipCode: '',
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: '',
        isDefault: false
      })
      showToast.success('Endereço salvo com sucesso!')
    } catch (error: any) {
      console.error('Erro ao salvar endereço:', error)

      if (error.response?.status === 401) {
        showToast.error('Sua sessão expirou. Por favor, faça login novamente.')
        setTimeout(() => window.location.href = '/login', 2000)
      } else {
        showToast.error('Erro ao salvar endereço: ' + (error.response?.data?.message || error.message))
      }
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <AccountLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[rgb(108,25,29)]"></div>
            <p className="mt-4 text-gray-600">Carregando endereços...</p>
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
                  Nome do endereço *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: Casa, Trabalho, etc."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg font-sans text-base focus:outline-none focus:ring-2 focus:ring-[rgb(108,25,29)] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block font-sans text-sm text-[rgb(119,105,106)] mb-2">
                  CEP *
                </label>
                <input
                  type="text"
                  value={formData.zipCode}
                  onChange={(e) => handleCepChange(e.target.value)}
                  placeholder="00000-000"
                  maxLength={8}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg font-sans text-base focus:outline-none focus:ring-2 focus:ring-[rgb(108,25,29)] focus:border-transparent"
                />
                {loadingCep && <p className="text-xs text-gray-500 mt-1">Buscando CEP...</p>}
              </div>

              <div>
                <label className="block font-sans text-sm text-[rgb(119,105,106)] mb-2">
                  Estado *
                </label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  maxLength={2}
                  placeholder="UF"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg font-sans text-base focus:outline-none focus:ring-2 focus:ring-[rgb(108,25,29)] focus:border-transparent"
                />
              </div>

              <div className="col-span-2">
                <label className="block font-sans text-sm text-[rgb(119,105,106)] mb-2">
                  Rua *
                </label>
                <input
                  type="text"
                  value={formData.street}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  placeholder="Rua, Avenida, etc."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg font-sans text-base focus:outline-none focus:ring-2 focus:ring-[rgb(108,25,29)] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block font-sans text-sm text-[rgb(119,105,106)] mb-2">
                  Número *
                </label>
                <input
                  type="text"
                  value={formData.number}
                  onChange={(e) => setFormData({ ...formData, number: e.target.value })}
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
                  value={formData.complement}
                  onChange={(e) => setFormData({ ...formData, complement: e.target.value })}
                  placeholder="Apt, Bloco, etc."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg font-sans text-base focus:outline-none focus:ring-2 focus:ring-[rgb(108,25,29)] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block font-sans text-sm text-[rgb(119,105,106)] mb-2">
                  Bairro *
                </label>
                <input
                  type="text"
                  value={formData.neighborhood}
                  onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                  placeholder="Nome do bairro"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg font-sans text-base focus:outline-none focus:ring-2 focus:ring-[rgb(108,25,29)] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block font-sans text-sm text-[rgb(119,105,106)] mb-2">
                  Cidade *
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Nome da cidade"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg font-sans text-base focus:outline-none focus:ring-2 focus:ring-[rgb(108,25,29)] focus:border-transparent"
                />
              </div>

              <div className="col-span-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isDefault}
                    onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                    className="w-4 h-4 text-[rgb(108,25,29)] border-gray-300 rounded focus:ring-[rgb(108,25,29)]"
                  />
                  <span className="font-sans text-sm text-gray-700">
                    Definir como endereço principal
                  </span>
                </label>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowForm(false)}
                className="px-6 py-2 bg-white border border-[rgb(108,25,29)] text-[rgb(108,25,29)] font-sans text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveAddress}
                disabled={saving}
                className="px-6 py-2 bg-[rgb(108,25,29)] text-white font-sans text-sm font-medium rounded-lg hover:bg-[rgb(88,20,24)] transition-colors disabled:opacity-50"
              >
                {saving ? 'Salvando...' : 'Salvar Endereço'}
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
                        {address.name}
                      </h3>
                      {address.isDefault && (
                        <span className="px-2 py-1 bg-[rgb(108,25,29)] text-white text-xs font-sans rounded">
                          Principal
                        </span>
                      )}
                    </div>
                    <p className="font-sans text-sm text-gray-700">
                      {address.street}, {address.number}
                      {address.complement && ` - ${address.complement}`}
                    </p>
                    <p className="font-sans text-sm text-gray-700">
                      {address.neighborhood} - {address.city}/{address.state}
                    </p>
                    <p className="font-sans text-sm text-gray-700">
                      CEP: {address.zipCode}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  {!address.isDefault && (
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
