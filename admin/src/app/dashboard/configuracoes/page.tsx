'use client'

import { useState, useEffect } from 'react'
import { api } from '@/lib/api'
import { Upload, X, Save } from 'lucide-react'

interface SiteConfig {
  id: string
  aboutImage: string
  instagramImages: string[]
  whatsappNumber: string
  instagramUrl: string
  facebookUrl: string
}

export default function ConfiguracoesPage() {
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [config, setConfig] = useState<SiteConfig | null>(null)
  const [aboutImage, setAboutImage] = useState('')
  const [instagramImages, setInstagramImages] = useState<string[]>([])

  useEffect(() => {
    fetchConfig()
  }, [])

  const fetchConfig = async () => {
    try {
      const { data } = await api.get('/site-config')
      setConfig(data)
      setAboutImage(data.aboutImage || '')
      setInstagramImages(data.instagramImages || [])
    } catch (error) {
      console.error('Erro ao buscar configurações:', error)
    }
  }

  const handleAboutImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', files[0])

      const { data } = await api.post('/upload/image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      setAboutImage(data.url || data.filename)
    } catch (error) {
      console.error('Erro ao fazer upload:', error)
      alert('Erro ao fazer upload da imagem')
    } finally {
      setUploading(false)
    }
  }

  const handleInstagramImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)

    try {
      const formData = new FormData()

      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i])
      }

      const { data } = await api.post('/upload/images', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      const novasImagens = data.files.map((f: any) => f.url || f.filename)
      setInstagramImages([...instagramImages, ...novasImagens].slice(0, 5)) // Máximo 5
    } catch (error) {
      console.error('Erro ao fazer upload:', error)
      alert('Erro ao fazer upload das imagens')
    } finally {
      setUploading(false)
    }
  }

  const removeInstagramImage = (index: number) => {
    setInstagramImages(instagramImages.filter((_, i) => i !== index))
  }

  const handleSave = async () => {
    setLoading(true)

    try {
      await api.patch('/site-config', {
        aboutImage,
        instagramImages,
      })

      alert('Configurações salvas com sucesso!')
      fetchConfig()
    } catch (error: any) {
      console.error('Erro ao salvar:', error)
      alert(error.response?.data?.message || 'Erro ao salvar configurações')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Configurações do Site</h1>
        <p className="text-gray-600 mt-1">Gerencie imagens e informações institucionais</p>
      </div>

      {/* Imagem "Sobre a Rosa Chic" */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Imagem da Seção "Sobre a Rosa Chic"
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Imagem exibida ao lado do texto na seção "Sobre Nós" (567x567px recomendado)
        </p>

        <div className="flex gap-4 items-start">
          {aboutImage && (
            <div className="relative">
              <img
                src={aboutImage.startsWith('http') ? aboutImage : `http://localhost:3001/uploads/${aboutImage}`}
                alt="Sobre Rosa Chic"
                className="w-64 h-64 object-cover rounded-lg border-2 border-gray-200"
              />
              <button
                type="button"
                onClick={() => setAboutImage('')}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <X size={14} />
              </button>
            </div>
          )}

          <label className="flex flex-col items-center justify-center w-64 h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-brand-maroon-500 hover:bg-brand-maroon-50 transition">
            <Upload className="text-gray-400 mb-2" size={32} />
            <span className="text-sm text-gray-500">
              {aboutImage ? 'Trocar imagem' : 'Adicionar imagem'}
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleAboutImageUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Imagens do Instagram */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Galeria Instagram (Footer)
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Adicione até 5 imagens que aparecerão na galeria do Instagram no rodapé (220x220px cada)
        </p>

        <div className="flex flex-wrap gap-4">
          {instagramImages.map((imagem, index) => (
            <div key={index} className="relative">
              <img
                src={imagem.startsWith('http') ? imagem : `http://localhost:3001/uploads/${imagem}`}
                alt={`Instagram ${index + 1}`}
                className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200"
              />
              <button
                type="button"
                onClick={() => removeInstagramImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <X size={14} />
              </button>
            </div>
          ))}

          {instagramImages.length < 5 && (
            <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-brand-maroon-500 hover:bg-brand-maroon-50 transition">
              <Upload className="text-gray-400 mb-1" size={24} />
              <span className="text-xs text-gray-500">Adicionar</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleInstagramImageUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
          )}
        </div>

        <p className="text-xs text-gray-500 mt-2">
          {instagramImages.length}/5 imagens adicionadas
        </p>
      </div>

      {/* Botão Salvar */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={loading || uploading}
          className="flex items-center gap-2 px-6 py-3 bg-brand-maroon-700 text-white rounded-lg font-medium hover:bg-brand-maroon-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save size={18} />
          {loading ? 'Salvando...' : 'Salvar Configurações'}
        </button>
      </div>
    </div>
  )
}
