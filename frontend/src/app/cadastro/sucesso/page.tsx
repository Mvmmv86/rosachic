'use client'

import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import { Logo } from '@/components/Logo'

export default function CadastroSucessoPage() {
  return (
    <div className="min-h-screen bg-[rgb(247,243,239)] flex flex-col">
      {/* Header */}
      <header className="bg-[rgb(108,25,29)] h-[60px] flex items-center justify-center">
        <Logo />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[570px] bg-white rounded-lg shadow-sm p-12 text-center">
          {/* Ícone de Sucesso */}
          <div className="flex justify-center mb-6">
            <CheckCircle size={80} className="text-green-500" strokeWidth={1.5} />
          </div>

          {/* Título */}
          <h1 className="font-sans text-3xl font-semibold text-black mb-4">
            Conta criada com sucesso!
          </h1>

          {/* Mensagem */}
          <p className="font-sans text-base text-gray-600 mb-8 leading-relaxed">
            Bem-vindo à Rosa Chic! Sua conta foi criada com sucesso.<br />
            Agora você pode fazer login e começar a explorar nossos produtos exclusivos.
          </p>

          {/* Botões */}
          <div className="space-y-4">
            <Link
              href="/login"
              className="block w-full h-12 bg-[rgb(108,25,29)] text-white font-sans text-sm font-medium rounded-lg hover:bg-[rgb(88,20,24)] transition-colors flex items-center justify-center"
            >
              Fazer Login
            </Link>

            <Link
              href="/"
              className="block w-full h-12 bg-white border border-[rgb(108,25,29)] text-[rgb(108,25,29)] font-sans text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
            >
              Voltar para Home
            </Link>
          </div>
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
              <div className="mb-4">
                <Logo />
              </div>
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
