'use client'

import { useState } from 'react'
import { X, Send, MessageCircle } from 'lucide-react'

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: 'Olá! Sou a assistente virtual da Rosa Chic. Como posso ajudar você hoje?', isUser: false }
  ])
  const [inputMessage, setInputMessage] = useState('')

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    // Adiciona mensagem do usuário
    setMessages([...messages, { text: inputMessage, isUser: true }])

    // Simula resposta da IA (você substituirá com sua API real)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: 'Obrigado pela sua mensagem! Em breve um de nossos especialistas entrará em contato.',
          isUser: false
        }
      ])
    }, 1000)

    setInputMessage('')
  }

  return (
    <>
      {/* Botão Flutuante */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-[rgb(108,25,29)] rounded-full flex items-center justify-center shadow-lg hover:bg-[rgb(88,20,24)] transition-all z-50 group"
        >
          <MessageCircle className="w-7 h-7 text-white" />

          {/* Pulse animado */}
          <span className="absolute inline-flex h-full w-full rounded-full bg-[rgb(108,25,29)] opacity-75 animate-ping"></span>
        </button>
      )}

      {/* Widget de Chat */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[380px] h-[550px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-[rgb(200,190,191)]">

          {/* Header do Chat */}
          <div className="bg-[rgb(108,25,29)] text-white px-6 py-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-[rgb(108,25,29)]" />
              </div>
              <div>
                <p className="font-['Inter'] font-semibold text-sm">Assistente Rosa Chic</p>
                <p className="font-['Inter'] text-xs text-[rgb(241,237,237)]">Online agora</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Área de Mensagens */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[rgb(247,243,239)]">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                    msg.isUser
                      ? 'bg-[rgb(108,25,29)] text-white rounded-br-none'
                      : 'bg-white text-black border border-[rgb(200,190,191)] rounded-bl-none'
                  }`}
                >
                  <p className="font-['Inter'] text-sm leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input de Mensagem */}
          <div className="p-4 border-t border-[rgb(200,190,191)] bg-white rounded-b-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Digite sua mensagem..."
                className="flex-1 px-4 py-3 rounded-lg border border-[rgb(200,190,191)] text-sm font-['Inter'] focus:border-[rgb(108,25,29)] focus:outline-none"
              />
              <button
                onClick={handleSendMessage}
                className="w-12 h-12 bg-[rgb(108,25,29)] rounded-lg flex items-center justify-center hover:bg-[rgb(88,20,24)] transition-colors"
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
            <p className="text-xs font-['Inter'] text-[rgb(119,105,106)] mt-2 text-center">
              Respondemos em alguns minutos
            </p>
          </div>
        </div>
      )}
    </>
  )
}
