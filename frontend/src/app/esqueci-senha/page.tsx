'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function EsqueciSenhaPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    try {
      const response = await fetch('http://localhost:3001/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(data.message)
        setEmail('')
      } else {
        setError(data.message || 'Erro ao solicitar recuperação de senha')
      }
    } catch (err) {
      setError('Erro ao conectar com o servidor')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[rgb(247,243,239)] px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-cormorant font-bold text-[rgb(108,25,29)] mb-2">
            Esqueci Minha Senha
          </h1>
          <p className="text-gray-600">
            Digite seu e-mail para receber instruções de recuperação
          </p>
        </div>

        {message && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              E-mail
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[rgb(108,25,29)] focus:border-transparent"
              placeholder="seu@email.com"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[rgb(108,25,29)] text-white py-3 px-6 rounded-lg hover:bg-[rgb(88,20,24)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Enviando...' : 'Enviar Link de Recuperação'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="text-[rgb(108,25,29)] hover:underline text-sm"
          >
            ← Voltar para o login
          </Link>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
          <p>Não tem uma conta?{' '}
            <Link href="/cadastro" className="text-[rgb(108,25,29)] hover:underline font-medium">
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
