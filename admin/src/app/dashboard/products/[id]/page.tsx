'use client'

import { useState, useEffect } from 'react'
import { api } from '@/lib/api'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Upload, X, Plus } from 'lucide-react'

interface FormData {
  codigo: string
  modelo: string
  descricao: string
  material: string
  luminosidade: string
  valorM2: number
  estoque: number
  larguraMaxCm: number
  alturaMaxCm: number
  areaMinM2: number
  ambientes: string[]
  ativo: boolean
  isLancamento: boolean
  isMaisVendido: boolean
}

export default function EditProductPage() {
  const router = useRouter()
  const params = useParams()
  const productId = params.id as string

  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [imagens, setImagens] = useState<string[]>([])
  const [novoAmbiente, setNovoAmbiente] = useState('')
  const [formData, setFormData] = useState<FormData>({
    codigo: '',
    modelo: '',
    descricao: '',
    material: 'Tecido',
    luminosidade: 'Translucida',
    valorM2: 0,
    estoque: 0,
    larguraMaxCm: 0,
    alturaMaxCm: 0,
    areaMinM2: 1,
    ambientes: [],
    ativo: true,
    isLancamento: false,
    isMaisVendido: false,
  })

  useEffect(() => {
    fetchProduct()
  }, [productId])

  const fetchProduct = async () => {
    try {
      const { data } = await api.get(`/products/${productId}`)

      setFormData({
        codigo: data.codigo || '',
        modelo: data.modelo || '',
        descricao: data.descricao || '',
        material: data.material || 'Tecido',
        luminosidade: data.luminosidade || 'Translucida',
        valorM2: data.valorM2 || 0,
        estoque: data.estoque || 0,
        larguraMaxCm: data.larguraMaxCm || 0,
        alturaMaxCm: data.alturaMaxCm || 0,
        areaMinM2: data.areaMinM2 || 1,
        ambientes: data.ambientes || [],
        ativo: data.ativo !== undefined ? data.ativo : true,
        isLancamento: data.isLancamento !== undefined ? data.isLancamento : false,
        isMaisVendido: data.isMaisVendido !== undefined ? data.isMaisVendido : false,
      })

      setImagens(data.imagens || [])
    } catch (error) {
      console.error('Erro ao buscar produto:', error)
      alert('Erro ao carregar produto')
      router.push('/dashboard/products')
    } finally {
      setFetching(false)
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    setFormData({
      ...formData,
      [name]:
        type === 'number'
          ? parseFloat(value) || 0
          : type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : value,
    })
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)

    try {
      const formDataUpload = new FormData()

      for (let i = 0; i < files.length; i++) {
        formDataUpload.append('files', files[i])
      }

      const { data } = await api.post('/upload/images', formDataUpload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      // Usar a URL completa retornada pelo backend (Supabase Storage)
      const novasImagens = data.files.map((f: any) => f.url || f.filename)
      setImagens([...imagens, ...novasImagens])
    } catch (error) {
      console.error('Erro ao fazer upload:', error)
      alert('Erro ao fazer upload das imagens')
    } finally {
      setUploading(false)
    }
  }

  const removeImage = (index: number) => {
    setImagens(imagens.filter((_, i) => i !== index))
  }

  const addAmbiente = () => {
    if (novoAmbiente.trim() && !formData.ambientes.includes(novoAmbiente.trim())) {
      setFormData({
        ...formData,
        ambientes: [...formData.ambientes, novoAmbiente.trim()]
      })
      setNovoAmbiente('')
    }
  }

  const removeAmbiente = (ambiente: string) => {
    setFormData({
      ...formData,
      ambientes: formData.ambientes.filter(a => a !== ambiente)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const payload = {
        ...formData,
        imagens,
      }

      await api.patch(`/products/${productId}`, payload)
      alert('Produto atualizado com sucesso!')
      router.push('/dashboard/products')
    } catch (error: any) {
      console.error('Erro ao atualizar produto:', error)
      alert(error.response?.data?.message || 'Erro ao atualizar produto')
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-brand-maroon-700">Carregando produto...</div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Editar Persiana</h1>
          <p className="text-gray-600 mt-1">Atualize os dados da persiana</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informações Básicas */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Informações Básicas
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Código *
              </label>
              <input
                type="text"
                name="codigo"
                value={formData.codigo}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-maroon-500 focus:border-transparent outline-none"
                placeholder="PRS001"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Modelo *
              </label>
              <input
                type="text"
                name="modelo"
                value={formData.modelo}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-maroon-500 focus:border-transparent outline-none"
                placeholder="Persiana Rolô Blackout"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição *
              </label>
              <textarea
                name="descricao"
                value={formData.descricao}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-maroon-500 focus:border-transparent outline-none resize-none"
                placeholder="Descreva a persiana..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Material *
              </label>
              <select
                name="material"
                value={formData.material}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-maroon-500 focus:border-transparent outline-none"
              >
                <option value="Tecido">Tecido</option>
                <option value="Madeira">Madeira</option>
                <option value="PVC">PVC</option>
                <option value="Alumínio">Alumínio</option>
                <option value="Bambu">Bambu</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Luminosidade *
              </label>
              <select
                name="luminosidade"
                value={formData.luminosidade}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-maroon-500 focus:border-transparent outline-none"
              >
                <option value="Translucida">Translúcida</option>
                <option value="Blackout">Blackout</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Valor por m² (R$) *
              </label>
              <input
                type="number"
                name="valorM2"
                value={formData.valorM2}
                onChange={handleInputChange}
                required
                min="0"
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-maroon-500 focus:border-transparent outline-none"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estoque *
              </label>
              <input
                type="number"
                name="estoque"
                value={formData.estoque}
                onChange={handleInputChange}
                required
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-maroon-500 focus:border-transparent outline-none"
                placeholder="0"
              />
            </div>
          </div>
        </div>

        {/* Dimensões Máximas */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Dimensões Máximas</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Largura Máxima (cm) *
              </label>
              <input
                type="number"
                name="larguraMaxCm"
                value={formData.larguraMaxCm}
                onChange={handleInputChange}
                required
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-maroon-500 focus:border-transparent outline-none"
                placeholder="300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Altura Máxima (cm) *
              </label>
              <input
                type="number"
                name="alturaMaxCm"
                value={formData.alturaMaxCm}
                onChange={handleInputChange}
                required
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-maroon-500 focus:border-transparent outline-none"
                placeholder="300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Área Mínima (m²) *
              </label>
              <input
                type="number"
                name="areaMinM2"
                value={formData.areaMinM2}
                onChange={handleInputChange}
                required
                min="0"
                step="0.1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-maroon-500 focus:border-transparent outline-none"
                placeholder="1"
              />
            </div>
          </div>
        </div>

        {/* Ambientes */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Ambientes Recomendados</h2>

          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={novoAmbiente}
              onChange={(e) => setNovoAmbiente(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAmbiente())}
              placeholder="Ex: sala, quarto, escritório..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-maroon-500 focus:border-transparent outline-none"
            />
            <button
              type="button"
              onClick={addAmbiente}
              className="px-4 py-2 bg-brand-maroon-700 text-white rounded-lg hover:bg-brand-maroon-800 transition flex items-center gap-2"
            >
              <Plus size={18} />
              Adicionar
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {formData.ambientes.map((ambiente) => (
              <span
                key={ambiente}
                className="px-3 py-1 bg-brand-maroon-100 text-brand-maroon-800 rounded-full text-sm flex items-center gap-2"
              >
                {ambiente}
                <button
                  type="button"
                  onClick={() => removeAmbiente(ambiente)}
                  className="hover:text-brand-maroon-900"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Imagens */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Imagens</h2>

          <div className="flex flex-wrap gap-4">
            {imagens.map((imagem, index) => (
              <div key={index} className="relative">
                <img
                  src={imagem.startsWith('http') ? imagem : `http://localhost:3001/uploads/${imagem}`}
                  alt={`Preview ${index + 1}`}
                  className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X size={14} />
                </button>
              </div>
            ))}

            <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-brand-maroon-500 hover:bg-brand-maroon-50 transition">
              <Upload className="text-gray-400 mb-1" size={24} />
              <span className="text-xs text-gray-500">Adicionar</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Status */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="ativo"
              checked={formData.ativo}
              onChange={handleInputChange}
              className="w-5 h-5 text-brand-maroon-700 rounded focus:ring-brand-maroon-500"
            />
            <label className="text-sm font-medium text-gray-700">
              Produto ativo (visível no site)
            </label>
          </div>
        </div>

        {/* Destaque na Home */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Destaque na Home</h2>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="isLancamento"
                checked={formData.isLancamento}
                onChange={handleInputChange}
                className="w-5 h-5 text-brand-maroon-700 rounded focus:ring-brand-maroon-500"
              />
              <label className="text-sm font-medium text-gray-700">
                Marcar como Lançamento (aparece na seção Lançamentos da Home)
              </label>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="isMaisVendido"
                checked={formData.isMaisVendido}
                onChange={handleInputChange}
                className="w-5 h-5 text-brand-maroon-700 rounded focus:ring-brand-maroon-500"
              />
              <label className="text-sm font-medium text-gray-700">
                Marcar como Mais Vendido (aparece na aba Mais Vendidos)
              </label>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={loading || uploading}
            className="px-6 py-3 bg-brand-maroon-700 text-white rounded-lg font-medium hover:bg-brand-maroon-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Salvando...' : 'Salvar Alterações'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}
