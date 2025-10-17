'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Power, Save, TestTube2, Loader2 } from 'lucide-react'

interface Knowledge {
  id: string
  title: string
  content: string
  category: string
  active: boolean
}

interface OpenAIConfig {
  id?: string
  apiKey: string
  model: string
  temperature: number
  maxTokens: number
}

export default function SuporteIAPage() {
  const [knowledge, setKnowledge] = useState<Knowledge[]>([])
  const [config, setConfig] = useState<OpenAIConfig>({
    apiKey: '',
    model: 'gpt-4o-mini',
    temperature: 0.7,
    maxTokens: 500,
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [testing, setTesting] = useState(false)
  const [showKnowledgeForm, setShowKnowledgeForm] = useState(false)
  const [editingKnowledge, setEditingKnowledge] = useState<Knowledge | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)

      // Buscar conhecimento
      const resKnowledge = await fetch('http://localhost:3001/chat/knowledge')
      const dataKnowledge = await resKnowledge.json()
      setKnowledge(dataKnowledge)

      // Buscar config
      const resConfig = await fetch('http://localhost:3001/chat/config')
      const dataConfig = await resConfig.json()
      if (dataConfig) {
        setConfig(dataConfig)
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveConfig = async () => {
    setSaving(true)
    try {
      await fetch('http://localhost:3001/chat/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      })
      alert('Configuração salva com sucesso!')
    } catch (error) {
      alert('Erro ao salvar configuração')
    } finally {
      setSaving(false)
    }
  }

  const handleTestConfig = async () => {
    if (!config.apiKey) {
      alert('Informe a API Key primeiro')
      return
    }

    setTesting(true)
    try {
      const res = await fetch('http://localhost:3001/chat/config/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey: config.apiKey }),
      })
      const data = await res.json()

      if (data.success) {
        alert('✅ Conexão OK! API Key válida!')
      } else {
        alert('❌ Erro: ' + data.message)
      }
    } catch (error) {
      alert('Erro ao testar conexão')
    } finally {
      setTesting(false)
    }
  }

  const handleCreateKnowledge = async () => {
    try {
      await fetch('http://localhost:3001/chat/knowledge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      setShowKnowledgeForm(false)
      setFormData({ title: '', content: '', category: '' })
      loadData()
      alert('Conhecimento adicionado!')
    } catch (error) {
      alert('Erro ao adicionar conhecimento')
    }
  }

  const handleUpdateKnowledge = async () => {
    if (!editingKnowledge) return

    try {
      await fetch(`http://localhost:3001/chat/knowledge/${editingKnowledge.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      setEditingKnowledge(null)
      setFormData({ title: '', content: '', category: '' })
      loadData()
      alert('Conhecimento atualizado!')
    } catch (error) {
      alert('Erro ao atualizar conhecimento')
    }
  }

  const handleDeleteKnowledge = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar?')) return

    try {
      await fetch(`http://localhost:3001/chat/knowledge/${id}`, {
        method: 'DELETE',
      })
      loadData()
      alert('Conhecimento deletado!')
    } catch (error) {
      alert('Erro ao deletar conhecimento')
    }
  }

  const handleToggleActive = async (id: string) => {
    try {
      await fetch(`http://localhost:3001/chat/knowledge/${id}/toggle`, {
        method: 'POST',
      })
      loadData()
    } catch (error) {
      alert('Erro ao atualizar status')
    }
  }

  const openEditForm = (item: Knowledge) => {
    setEditingKnowledge(item)
    setFormData({
      title: item.title,
      content: item.content,
      category: item.category || '',
    })
    setShowKnowledgeForm(true)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-brand-maroon-700" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Suporte com IA</h1>
        <p className="text-gray-600 mt-2">Gerencie o conhecimento e configurações do chat inteligente</p>
      </div>

      {/* Configuração OpenAI */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          🤖 Configuração OpenAI
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              API Key *
            </label>
            <div className="flex gap-2">
              <input
                type="password"
                value={config.apiKey}
                onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-maroon-500 focus:border-transparent outline-none"
                placeholder="sk-proj-..."
              />
              <button
                onClick={handleTestConfig}
                disabled={testing || !config.apiKey}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 flex items-center gap-2"
              >
                {testing ? <Loader2 className="w-4 h-4 animate-spin" /> : <TestTube2 size={18} />}
                Testar
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Obtenha em: <a href="https://platform.openai.com/api-keys" target="_blank" className="text-blue-600 hover:underline">platform.openai.com/api-keys</a>
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Modelo
            </label>
            <select
              value={config.model}
              onChange={(e) => setConfig({ ...config, model: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-maroon-500 focus:border-transparent outline-none"
            >
              <option value="gpt-4o-mini">GPT-4o Mini (Rápido e Barato)</option>
              <option value="gpt-4o">GPT-4o (Mais Inteligente)</option>
              <option value="gpt-3.5-turbo">GPT-3.5 Turbo (Mais Barato)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Tokens
            </label>
            <input
              type="number"
              value={config.maxTokens}
              onChange={(e) => setConfig({ ...config, maxTokens: parseInt(e.target.value) })}
              min="100"
              max="2000"
              step="50"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-maroon-500 focus:border-transparent outline-none"
            />
            <p className="text-xs text-gray-500 mt-1">Tamanho máximo da resposta</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Temperature
            </label>
            <input
              type="number"
              value={config.temperature}
              onChange={(e) => setConfig({ ...config, temperature: parseFloat(e.target.value) })}
              min="0"
              max="2"
              step="0.1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-maroon-500 focus:border-transparent outline-none"
            />
            <p className="text-xs text-gray-500 mt-1">0 = Preciso, 1 = Criativo</p>
          </div>
        </div>

        <div className="mt-4">
          <button
            onClick={handleSaveConfig}
            disabled={saving}
            className="px-6 py-2 bg-brand-maroon-700 text-white rounded-lg hover:bg-brand-maroon-600 transition disabled:opacity-50 flex items-center gap-2"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save size={18} />}
            Salvar Configuração
          </button>
        </div>
      </div>

      {/* Gestão de Conhecimento */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            📚 Base de Conhecimento
          </h2>
          <button
            onClick={() => {
              setEditingKnowledge(null)
              setFormData({ title: '', content: '', category: '' })
              setShowKnowledgeForm(true)
            }}
            className="px-4 py-2 bg-brand-maroon-700 text-white rounded-lg hover:bg-brand-maroon-600 transition flex items-center gap-2"
          >
            <Plus size={18} />
            Adicionar Conhecimento
          </button>
        </div>

        {/* Form de Adicionar/Editar */}
        {showKnowledgeForm && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">
              {editingKnowledge ? 'Editar' : 'Novo'} Conhecimento
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-maroon-500 focus:border-transparent outline-none"
                  placeholder="Ex: Tipos de Persianas"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoria
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-maroon-500 focus:border-transparent outline-none"
                  placeholder="Ex: Produtos, Instalação, Preços"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Conteúdo *
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={8}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-maroon-500 focus:border-transparent outline-none resize-none"
                  placeholder="Digite o conhecimento que a IA deve usar para responder..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  Escreva de forma clara e objetiva. A IA usará este texto para responder perguntas relacionadas.
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={editingKnowledge ? handleUpdateKnowledge : handleCreateKnowledge}
                  className="px-4 py-2 bg-brand-maroon-700 text-white rounded-lg hover:bg-brand-maroon-600 transition"
                >
                  {editingKnowledge ? 'Atualizar' : 'Adicionar'}
                </button>
                <button
                  onClick={() => {
                    setShowKnowledgeForm(false)
                    setEditingKnowledge(null)
                    setFormData({ title: '', content: '', category: '' })
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Lista de Conhecimentos */}
        <div className="space-y-3">
          {knowledge.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              Nenhum conhecimento cadastrado ainda. Clique em "Adicionar Conhecimento" para começar.
            </p>
          ) : (
            knowledge.map((item) => (
              <div
                key={item.id}
                className={`p-4 rounded-lg border ${
                  item.active ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{item.title}</h3>
                      {item.category && (
                        <span className="px-2 py-1 bg-brand-maroon-100 text-brand-maroon-700 text-xs rounded">
                          {item.category}
                        </span>
                      )}
                      <span
                        className={`px-2 py-1 text-xs rounded ${
                          item.active
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        {item.active ? 'Ativo' : 'Inativo'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{item.content}</p>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => handleToggleActive(item.id)}
                      className={`p-2 rounded-lg transition ${
                        item.active
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                      }`}
                      title={item.active ? 'Desativar' : 'Ativar'}
                    >
                      <Power size={18} />
                    </button>
                    <button
                      onClick={() => openEditForm(item)}
                      className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition"
                      title="Editar"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteKnowledge(item.id)}
                      className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
                      title="Deletar"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Informações de Uso */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>💡 Dica:</strong> A IA usa APENAS o conhecimento que você cadastrar aqui para responder perguntas.
          Seja específico e objetivo. Adicione informações sobre produtos, preços, instalação, medidas, etc.
        </p>
      </div>
    </div>
  )
}
