'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { useAuth } from '@/contexts/AuthContext'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await login(formData.email, formData.senha)
      router.push('/minha-conta')
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login. Verifique suas credenciais.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[rgb(247,243,239)] flex flex-col">
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[470px] bg-white rounded-lg shadow-sm p-12">
          {/* Título */}
          <h1 className="font-sans text-2xl font-semibold text-black mb-8">
            Login
          </h1>

          {/* Mensagem de Erro */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* E-mail */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-sans text-black">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="example@email.com"
                className="w-full h-12 px-4 border border-gray-300 rounded-lg font-sans text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[rgb(108,25,29)] focus:border-transparent"
                required
              />
            </div>

            {/* Senha */}
            <div className="space-y-2">
              <label htmlFor="senha" className="block text-sm font-sans text-black">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="senha"
                  value={formData.senha}
                  onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                  placeholder="************"
                  className="w-full h-12 px-4 pr-12 border border-gray-300 rounded-lg font-sans text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[rgb(108,25,29)] focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Link Esqueci minha senha */}
            <div className="text-right">
              <Link
                href="/esqueci-senha"
                className="text-sm text-[rgb(108,25,29)] hover:underline"
              >
                Esqueci minha senha
              </Link>
            </div>

            {/* Botão Login */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-[rgb(108,25,29)] text-white font-sans text-sm font-medium rounded-lg hover:bg-[rgb(88,20,24)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Entrando...' : 'Login'}
            </button>

            {/* Botão Google */}
            <button
              type="button"
              className="w-full h-12 bg-white border border-gray-300 text-gray-700 font-sans text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-3"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
                <path d="M9.003 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332C2.438 15.983 5.482 18 9.003 18z" fill="#34A853"/>
                <path d="M3.964 10.712c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.96H.957C.347 6.175 0 7.55 0 9.002c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.426 0 9.002 0 5.48 0 2.438 2.017.96 4.958L3.967 7.29c.708-2.127 2.692-3.71 5.036-3.71z" fill="#EA4335"/>
              </svg>
              Continue com o Google
            </button>

            {/* Link Cadastro */}
            <div className="text-center pt-2">
              <p className="font-sans text-sm text-gray-600">
                Não tem conta?{' '}
                <Link href="/cadastro" className="text-[rgb(108,25,29)] font-medium hover:underline">
                  Cadastre-se
                </Link>
              </p>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[rgb(108,25,29)] py-12">
        <div className="max-w-[1224px] mx-auto px-6">
          {/* Instagram Gallery */}
          <div className="flex gap-4 mb-8 overflow-x-auto">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="relative flex-shrink-0 w-[180px] h-[180px] rounded-lg overflow-hidden bg-gray-700">
                <div className="absolute inset-0 flex items-center justify-center">
                  {i === 3 && (
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-3 gap-8 text-white">
            <div>
              <h3 className="font-serif text-lg font-semibold mb-2">Sobre nós</h3>
              <ul className="space-y-1 font-sans text-sm">
                <li>Nossa história</li>
                <li>Nossa história</li>
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold mb-2">Nossos produtos</h3>
              <ul className="space-y-1 font-sans text-sm">
                <li>Cortinas</li>
                <li>Rolos</li>
                <li>Montagem</li>
                <li>Kitbox</li>
                <li>Romana</li>
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold mb-2">Links rápidos</h3>
              <p className="font-sans text-sm">
                Novas persianas chegaram! Descubra estilos exclusivos e transforme seus ambientes com design sob medida.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
