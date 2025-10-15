'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface MercadoPagoConfig {
  id: string
  checkoutMode: 'INTERNAL' | 'MERCADOPAGO' | 'PAGSEGURO' | 'STRIPE' | 'PAYPAL'
  publicKey: string
  accessToken: string
  webhookSecret?: string
  isProduction: boolean
  notificationUrl?: string
  successUrl: string
  failureUrl: string
  pendingUrl: string
}

export default function PaymentConfigPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [testing, setTesting] = useState(false)
  const [testResult, setTestResult] = useState<any>(null)
  const [config, setConfig] = useState<MercadoPagoConfig | null>(null)
  const [formData, setFormData] = useState({
    checkoutMode: 'INTERNAL' as 'INTERNAL' | 'MERCADOPAGO' | 'PAGSEGURO' | 'STRIPE' | 'PAYPAL',
    publicKey: '',
    accessToken: '',
    webhookSecret: '',
    isProduction: false,
    notificationUrl: '',
    successUrl: '/checkout/sucesso',
    failureUrl: '/checkout/falha',
    pendingUrl: '/checkout/pendente',
  })

  useEffect(() => {
    fetchConfig()
  }, [])

  const fetchConfig = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch('http://localhost:3001/mercadopago-config', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        if (data) {
          setConfig(data)
          setFormData({
            checkoutMode: data.checkoutMode || 'INTERNAL',
            publicKey: data.publicKey || '',
            accessToken: data.accessToken || '',
            webhookSecret: data.webhookSecret || '',
            isProduction: data.isProduction || false,
            notificationUrl: data.notificationUrl || '',
            successUrl: data.successUrl || '/checkout/sucesso',
            failureUrl: data.failureUrl || '/checkout/falha',
            pendingUrl: data.pendingUrl || '/checkout/pendente',
          })
        }
      }
    } catch (error) {
      console.error('Erro ao buscar configuração:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setTestResult(null)

    try {
      const token = localStorage.getItem('admin_token')
      const method = config ? 'PUT' : 'POST'
      const response = await fetch('http://localhost:3001/mercadopago-config', {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert('Configuração salva com sucesso!')
        fetchConfig()
      } else {
        const error = await response.json()
        alert(`Erro: ${error.message}`)
      }
    } catch (error) {
      console.error('Erro ao salvar configuração:', error)
      alert('Erro ao salvar configuração')
    } finally {
      setSaving(false)
    }
  }

  const handleTestConnection = async () => {
    setTesting(true)
    setTestResult(null)

    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch('http://localhost:3001/mercadopago-config/test', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const result = await response.json()
        setTestResult(result)
      } else {
        setTestResult({
          success: false,
          message: 'Erro ao testar conexão',
        })
      }
    } catch (error) {
      console.error('Erro ao testar conexão:', error)
      setTestResult({
        success: false,
        message: 'Erro ao testar conexão',
      })
    } finally {
      setTesting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Carregando...</div>
      </div>
    )
  }

  const isMercadoPago = formData.checkoutMode === 'MERCADOPAGO'
  const isInternal = formData.checkoutMode === 'INTERNAL'

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/dashboard')}
            className="text-blue-600 hover:text-blue-800 mb-4"
          >
            ← Voltar para Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Configuração de Pagamentos</h1>
          <p className="text-gray-600 mt-2">
            Configure o gateway de pagamento do seu e-commerce
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 space-y-6">

          {/* Seletor de Gateway */}
          <div className="border-b pb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Gateway de Pagamento *
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, checkoutMode: 'INTERNAL' })}
                className={`p-4 border-2 rounded-lg transition-all ${
                  formData.checkoutMode === 'INTERNAL'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">Checkout Interno</div>
                    <div className="text-xs text-gray-500 mt-1">Processar pagamento no próprio site</div>
                  </div>
                  {formData.checkoutMode === 'INTERNAL' && (
                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, checkoutMode: 'MERCADOPAGO' })}
                className={`p-4 border-2 rounded-lg transition-all ${
                  formData.checkoutMode === 'MERCADOPAGO'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">Mercado Pago</div>
                    <div className="text-xs text-gray-500 mt-1">PIX, Cartão, Boleto</div>
                  </div>
                  {formData.checkoutMode === 'MERCADOPAGO' && (
                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, checkoutMode: 'PAGSEGURO' })}
                disabled
                className="p-4 border-2 border-gray-200 rounded-lg bg-gray-50 opacity-50 cursor-not-allowed"
              >
                <div className="text-left">
                  <div className="font-semibold text-gray-600">PagSeguro</div>
                  <div className="text-xs text-gray-400 mt-1">Em breve</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, checkoutMode: 'STRIPE' })}
                disabled
                className="p-4 border-2 border-gray-200 rounded-lg bg-gray-50 opacity-50 cursor-not-allowed"
              >
                <div className="text-left">
                  <div className="font-semibold text-gray-600">Stripe</div>
                  <div className="text-xs text-gray-400 mt-1">Em breve</div>
                </div>
              </button>
            </div>
          </div>

          {/* Checkout Interno - Informação */}
          {isInternal && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex">
                <svg className="h-5 w-5 text-green-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">Checkout Interno Ativado</h3>
                  <p className="text-sm text-green-700 mt-1">
                    Os clientes vão finalizar o pagamento nas páginas internas do site (página de resumo e sucesso).
                    <br/>
                    <strong>Nota:</strong> Você precisará implementar a lógica de processamento de pagamento manualmente.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Mercado Pago - Credenciais */}
          {isMercadoPago && (
            <>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex">
                  <svg className="h-5 w-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">Mercado Pago Selecionado</h3>
                    <p className="text-sm text-blue-700 mt-1">
                      Configure suas credenciais abaixo. Os clientes serão redirecionados para o checkout seguro do Mercado Pago.
                    </p>
                  </div>
                </div>
              </div>

              {/* Public Key */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Public Key *
                </label>
                <input
                  type="text"
                  required={isMercadoPago}
                  value={formData.publicKey}
                  onChange={(e) => setFormData({ ...formData, publicKey: e.target.value })}
                  placeholder="APP_USR-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Chave pública encontrada no painel do Mercado Pago
                </p>
              </div>

              {/* Access Token */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Access Token *
                </label>
                <input
                  type="password"
                  required={isMercadoPago}
                  value={formData.accessToken}
                  onChange={(e) => setFormData({ ...formData, accessToken: e.target.value })}
                  placeholder="APP_USR-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Token de acesso encontrado no painel do Mercado Pago
                </p>
              </div>

              {/* Webhook Secret */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Webhook Secret (Opcional)
                </label>
                <input
                  type="text"
                  value={formData.webhookSecret}
                  onChange={(e) => setFormData({ ...formData, webhookSecret: e.target.value })}
                  placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Secret para validar webhooks (opcional)
                </p>
              </div>

              {/* Environment */}
              <div>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.isProduction}
                    onChange={(e) => setFormData({ ...formData, isProduction: e.target.checked })}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Modo Produção
                  </span>
                </label>
                <p className="text-xs text-gray-500 mt-1 ml-7">
                  {formData.isProduction
                    ? '⚠️ Pagamentos reais serão processados'
                    : '✓ Modo de teste - usar credenciais de teste do MP'
                  }
                </p>
              </div>

              {/* URLs de Retorno */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">URLs de Retorno</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      URL de Sucesso
                    </label>
                    <input
                      type="text"
                      value={formData.successUrl}
                      onChange={(e) => setFormData({ ...formData, successUrl: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      URL de Falha
                    </label>
                    <input
                      type="text"
                      value={formData.failureUrl}
                      onChange={(e) => setFormData({ ...formData, failureUrl: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      URL Pendente
                    </label>
                    <input
                      type="text"
                      value={formData.pendingUrl}
                      onChange={(e) => setFormData({ ...formData, pendingUrl: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Notification URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL de Notificação (Webhook)
                </label>
                <input
                  type="url"
                  value={formData.notificationUrl}
                  onChange={(e) => setFormData({ ...formData, notificationUrl: e.target.value })}
                  placeholder="https://seudominio.com/payment/webhook"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Configure esta URL no painel do Mercado Pago para receber notificações de pagamento
                </p>
              </div>

              {/* Test Result */}
              {testResult && (
                <div className={`p-4 rounded-lg ${testResult.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                  <p className={`text-sm ${testResult.success ? 'text-green-800' : 'text-red-800'}`}>
                    {testResult.success ? '✓' : '✗'} {testResult.message}
                  </p>
                  {testResult.environment && (
                    <p className="text-xs text-gray-600 mt-1">
                      Ambiente: {testResult.environment}
                    </p>
                  )}
                </div>
              )}
            </>
          )}

          {/* Buttons */}
          <div className="flex gap-4 pt-6 border-t">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? 'Salvando...' : config ? 'Atualizar Configuração' : 'Salvar Configuração'}
            </button>

            {config && isMercadoPago && (
              <button
                type="button"
                onClick={handleTestConnection}
                disabled={testing}
                className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {testing ? 'Testando...' : 'Testar Conexão'}
              </button>
            )}
          </div>
        </form>

        {/* Instruções - apenas para Mercado Pago */}
        {isMercadoPago && (
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-medium text-blue-900 mb-2">
              Como obter suas credenciais do Mercado Pago
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
              <li>Acesse o painel do Mercado Pago: <a href="https://www.mercadopago.com.br/developers" target="_blank" rel="noopener noreferrer" className="underline">mercadopago.com.br/developers</a></li>
              <li>Vá em "Suas integrações" → "Credenciais"</li>
              <li>Copie a "Public Key" e o "Access Token"</li>
              <li>Para modo de teste, use as credenciais de teste</li>
              <li>Para produção, ative sua conta e use credenciais de produção</li>
            </ol>
          </div>
        )}
      </div>
    </div>
  )
}