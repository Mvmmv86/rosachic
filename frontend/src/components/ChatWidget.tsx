'use client'

import { useState, useRef, useEffect } from 'react'
import { X, Send, MessageCircle, Loader2 } from 'lucide-react'

interface Message {
  text: string
  isUser: boolean
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { text: 'Olá! Sou a assistente virtual da Rosa Chic. Como posso ajudar você hoje? 😊', isUser: false }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll para última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage = inputMessage.trim()

    // Adicionar mensagem do usuário
    setMessages(prev => [...prev, { text: userMessage, isUser: true }])
    setInputMessage('')
    setIsLoading(true)

    try {
      // Chamar API do backend
      const response = await fetch('http://localhost:3001/chat/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      })

      const data = await response.json()

      // Adicionar resposta da IA
      if (data.error) {
        setMessages(prev => [...prev, {
          text: data.response || 'Desculpe, ocorreu um erro. Por favor, tente novamente ou entre em contato pelo WhatsApp.',
          isUser: false
        }])
      } else {
        setMessages(prev => [...prev, {
          text: data.response,
          isUser: false
        }])
      }

    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
      setMessages(prev => [...prev, {
        text: 'Desculpe, não consegui processar sua mensagem. Por favor, tente novamente ou fale com nosso WhatsApp! 💚',
        isUser: false
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Botão Flutuante */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br bg-[rgb(108,25,29)] rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-all z-50 group"
          aria-label="Abrir chat com IA"
        >
          <MessageCircle className="w-7 h-7 text-white" strokeWidth={2} />

          {/* Pulse animado */}
          <span className="absolute inline-flex h-full w-full rounded-full bg-[rgb(108,25,29)] opacity-75 animate-ping"></span>

          {/* Badge "IA" */}
          <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            IA
          </span>
        </button>
      )}

      {/* Widget de Chat */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[400px] h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200 animate-in slide-in-from-bottom-4">

          {/* Header do Chat */}
          <div className="bg-gradient-to-r bg-[rgb(108,25,29)] text-white px-6 py-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-[rgb(108,25,29)]" />
              </div>
              <div>
                <p className="font-['Inter'] font-semibold text-sm flex items-center gap-2">
                  Assistente IA Rosa Chic
                  <span className="bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    GPT-4
                  </span>
                </p>
                <p className="font-['Inter'] text-xs text-white/90 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Online agora
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
              aria-label="Fechar chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Área de Mensagens */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}
              >
                <div
                  className={`max-w-[85%] px-4 py-3 rounded-2xl ${
                    msg.isUser
                      ? 'bg-gradient-to-r bg-[rgb(108,25,29)] text-white rounded-br-sm shadow-md'
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm shadow-sm'
                  }`}
                >
                  <p className="font-['Inter'] text-sm leading-relaxed whitespace-pre-wrap">
                    {msg.text}
                  </p>
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start animate-in fade-in">
                <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm border border-gray-200 shadow-sm flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-[rgb(108,25,29)] animate-spin" />
                  <span className="text-sm text-gray-600 font-['Inter']">Pensando...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input de Mensagem */}
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                placeholder="Digite sua pergunta..."
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 text-sm font-['Inter'] focus:border-[rgb(108,25,29)] focus:ring-2 focus:ring-[rgb(108,25,29)]/20 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className="w-12 h-12 bg-gradient-to-r bg-[rgb(108,25,29)] rounded-lg flex items-center justify-center hover:bg-[rgb(88,20,24)] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                aria-label="Enviar mensagem"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 text-white animate-spin" />
                ) : (
                  <Send className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
            <p className="text-xs font-['Inter'] text-gray-500 mt-2 text-center">
              💬 Assistente com Inteligência Artificial
            </p>
          </div>
        </div>
      )}
    </>
  )
}
