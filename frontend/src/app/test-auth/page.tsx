'use client'

import { useState } from 'react'
import { api } from '@/lib/api'

export default function TestAuthPage() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const testLogin = async () => {
    setLoading(true)
    try {
      const response = await api.post('/auth/login', {
        email: 'admin@rosachic.com',
        password: 'admin123'
      })

      // O backend retorna "token" e não "access_token"
      const { token, user } = response.data

      if (!token) {
        throw new Error('No token in response')
      }

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))

      setResult({ success: true, token: token.substring(0, 50) + '...', user })
    } catch (error: any) {
      setResult({ success: false, error: error.message })
    } finally {
      setLoading(false)
    }
  }

  const testAuthMe = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      console.log('Token:', token)

      const response = await api.get('/auth/me')
      setResult({ success: true, data: response.data })
    } catch (error: any) {
      setResult({ success: false, error: error.message, response: error.response?.data })
    } finally {
      setLoading(false)
    }
  }

  const testCreateAddress = async () => {
    setLoading(true)
    try {
      const response = await api.post('/users/me/addresses', {
        name: 'Teste',
        street: 'Rua Teste',
        number: '123',
        neighborhood: 'Bairro Teste',
        city: 'Cidade Teste',
        state: 'SP',
        zipCode: '12345678',
        isDefault: true
      })
      setResult({ success: true, data: response.data })
    } catch (error: any) {
      setResult({ success: false, error: error.message, response: error.response?.data })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6">Test Authentication</h1>

        <div className="space-y-4">
          <button
            onClick={testLogin}
            disabled={loading}
            className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            1. Test Login (admin@rosachic.com)
          </button>

          <button
            onClick={testAuthMe}
            disabled={loading}
            className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600 disabled:opacity-50"
          >
            2. Test /auth/me (verify token)
          </button>

          <button
            onClick={testCreateAddress}
            disabled={loading}
            className="w-full bg-purple-500 text-white p-3 rounded hover:bg-purple-600 disabled:opacity-50"
          >
            3. Test Create Address
          </button>

          <div className="mt-6 p-4 bg-gray-50 rounded">
            <h2 className="font-bold mb-2">Result:</h2>
            <pre className="text-xs overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
