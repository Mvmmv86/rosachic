'use client'

import { MessageCircle } from 'lucide-react'

interface ChatButtonProps {
  onClick: () => void
}

export function ChatButton({ onClick }: ChatButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-16 h-16 bg-[rgb(108,25,29)] hover:bg-[rgb(88,20,24)] text-white rounded-full shadow-xl transition-all hover:scale-110 group"
      aria-label="Abrir chat de suporte"
    >
      {/* Ícone de Chat */}
      <MessageCircle className="w-7 h-7" strokeWidth={2} />

      {/* Animação de pulse */}
      <span className="absolute inline-flex h-full w-full rounded-full bg-[rgb(108,25,29)] opacity-75 animate-ping"></span>

      {/* Tooltip (aparece ao passar mouse) */}
      <span className="absolute right-20 bg-gray-900 text-white text-sm px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Precisa de ajuda?
      </span>
    </button>
  )
}
