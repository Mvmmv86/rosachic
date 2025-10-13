'use client'

import Link from 'next/link'
import { Search, ShoppingCart, User, Building2, Sparkles, Phone, MessageCircle } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { ChatWidget } from '@/components/ChatWidget'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { useState } from 'react'

export default function ServicosPage() {
  const [showChat, setShowChat] = useState(false)

  // Dados dos serviços
  const services = [
    {
      id: 1,
      icon: Building2,
      title: 'Vendas Personalizadas',
      subtitle: 'Soluções sob medida para seu negócio',
      description: 'Oferecemos condições especiais para grandes volumes, empresas e projetos corporativos. Nossa equipe está pronta para criar uma proposta personalizada que atenda suas necessidades.',
      benefits: [
        'Atendimento dedicado para empresas',
        'Cotações para grandes volumes',
        'Prazos de entrega personalizados',
        'Condições de pagamento diferenciadas',
        'Instalação profissional inclusa',
        'Garantia estendida'
      ],
      availableInRegion: true // VARIÁVEL: Define se serviço está disponível na região
    },
    {
      id: 2,
      icon: Sparkles,
      title: 'Limpeza e Higienização',
      subtitle: 'Mantenha suas persianas como novas',
      description: 'Serviço profissional de limpeza e higienização de persianas. Utilizamos produtos especializados que preservam o tecido e garantem a durabilidade das suas persianas.',
      benefits: [
        'Limpeza profissional especializada',
        'Produtos que não danificam o tecido',
        'Remoção de ácaros e poeira',
        'Visita agendada no seu horário',
        'Secagem rápida',
        'Garantia de satisfação'
      ],
      availableInRegion: true // VARIÁVEL: Define se serviço está disponível na região
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="w-full max-w-[1224px] mx-auto px-6 py-12">

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-[56px] font-['Cormorant_Garamond'] font-bold text-[rgb(108,25,29)] leading-tight mb-4">
            Nossos Serviços
          </h1>
          <p className="text-lg font-['Inter'] text-[rgb(98,86,86)] max-w-[700px] mx-auto">
            Soluções completas para empresas e residências. Atendimento personalizado com qualidade Rosa Chic.
          </p>
        </div>

        {/* Cards de Serviços */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service) => {
            const IconComponent = service.icon
            return (
              <div
                key={service.id}
                className="flex flex-col bg-[rgb(241,237,237)] rounded-2xl border-2 border-[rgb(200,190,191)] overflow-hidden hover:border-[rgb(108,25,29)] transition-all"
              >
                {/* Header do Card */}
                <div className="bg-gradient-to-br from-[rgb(108,25,29)] to-[rgb(88,20,24)] p-8 text-white">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    {service.availableInRegion && (
                      <span className="text-xs font-['Inter'] font-medium bg-[rgb(66,176,90)] text-white px-3 py-1 rounded-full">
                        Disponível na sua região
                      </span>
                    )}
                  </div>
                  <h2 className="text-[32px] font-['Cormorant_Garamond'] font-bold mb-2">
                    {service.title}
                  </h2>
                  <p className="text-base font-['Inter'] text-[rgb(241,237,237)]">
                    {service.subtitle}
                  </p>
                </div>

                {/* Conteúdo do Card */}
                <div className="p-8 flex flex-col gap-6 flex-1">
                  <p className="text-base font-['Inter'] text-[rgb(98,86,86)] leading-relaxed">
                    {service.description}
                  </p>

                  {/* Lista de Benefícios */}
                  <div>
                    <h3 className="text-lg font-['Cormorant_Garamond'] font-bold text-black mb-4">
                      O que está incluso:
                    </h3>
                    <ul className="space-y-3">
                      {service.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-[rgb(66,176,90)] flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                              <path d="M1 5L4.5 8.5L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <span className="text-sm font-['Inter'] text-black">
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-[rgb(108,25,29)] to-[rgb(88,20,24)] rounded-2xl p-12 text-center text-white">
          <h2 className="text-[40px] font-['Cormorant_Garamond'] font-bold mb-4">
            Pronto para contratar nossos serviços?
          </h2>
          <p className="text-lg font-['Inter'] text-[rgb(241,237,237)] mb-8 max-w-[600px] mx-auto">
            Entre em contato conosco e receba um atendimento personalizado. Estamos prontos para ajudar você!
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            {/* Botão Chat IA */}
            <button
              onClick={() => setShowChat(true)}
              className="flex items-center gap-3 px-8 py-4 bg-white text-[rgb(108,25,29)] rounded-lg font-['Inter'] font-medium text-base hover:bg-[rgb(241,237,237)] transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Contate Nossos Serviços
            </button>

            {/* Botão WhatsApp */}
            <a
              href="https://wa.me/5511999999999?text=Olá! Gostaria de saber mais sobre os serviços da Rosa Chic."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 bg-[rgb(37,211,102)] text-white rounded-lg font-['Inter'] font-medium text-base hover:bg-[rgb(32,191,85)] transition-colors"
            >
              <Phone className="w-5 h-5" />
              Falar pelo WhatsApp
            </a>
          </div>

          <p className="text-sm font-['Inter'] text-[rgb(241,237,237)] mt-6">
            Atendimento de segunda a sexta, das 8h às 18h
          </p>
        </div>

        {/* Seção de Confiança */}
        <div className="grid grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-[rgb(241,237,237)] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgb(108,25,29)" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-['Cormorant_Garamond'] font-bold text-black mb-2">
              Garantia de Qualidade
            </h3>
            <p className="text-sm font-['Inter'] text-[rgb(98,86,86)]">
              Todos os serviços com garantia e satisfação garantida
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-[rgb(241,237,237)] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgb(108,25,29)" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="8.5" cy="7" r="4"></circle>
                <polyline points="17 11 19 13 23 9"></polyline>
              </svg>
            </div>
            <h3 className="text-xl font-['Cormorant_Garamond'] font-bold text-black mb-2">
              Equipe Especializada
            </h3>
            <p className="text-sm font-['Inter'] text-[rgb(98,86,86)]">
              Profissionais treinados e certificados
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-[rgb(241,237,237)] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgb(108,25,29)" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <h3 className="text-xl font-['Cormorant_Garamond'] font-bold text-black mb-2">
              Atendimento Rápido
            </h3>
            <p className="text-sm font-['Inter'] text-[rgb(98,86,86)]">
              Resposta em até 24 horas úteis
            </p>
          </div>
        </div>
      </div>

      {/* Chat Widget (abre quando clicar no botão) */}
      {showChat && <ChatWidget />}

      {/* Botão Flutuante WhatsApp */}
      <WhatsAppButton />

      {/* Footer */}
      <footer className="bg-[rgb(108,25,29)] text-white mt-20">
        <div className="w-full bg-[rgb(88,20,24)] py-12">
          <div className="w-full max-w-[1224px] mx-auto px-6">
            <div className="flex justify-center gap-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="relative w-[220px] h-[220px] rounded-2xl overflow-hidden group cursor-pointer"
                >
                  <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800">
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-white/50 text-sm">Instagram {i}</div>
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="rgb(108,25,29)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full max-w-[1224px] mx-auto px-6 py-16">
          <div className="grid grid-cols-3 gap-16 mb-12">
            <div className="flex flex-col gap-6">
              <Logo />
              <div>
                <h3 className="font-['Inter'] font-semibold text-lg mb-4">Sobre nós</h3>
                <ul className="space-y-3 text-sm text-[rgb(241,237,237)]">
                  <li><Link href="/" className="hover:text-white transition-colors">Nossa história</Link></li>
                  <li><Link href="/" className="hover:text-white transition-colors">Trabalhe conosco</Link></li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="font-['Inter'] font-semibold text-lg mb-4">Nossos produtos</h3>
              <ul className="space-y-3 text-sm text-[rgb(241,237,237)]">
                <li><Link href="/produtos" className="hover:text-white transition-colors">Cortinas</Link></li>
                <li><Link href="/produtos" className="hover:text-white transition-colors">Rolos</Link></li>
                <li><Link href="/produtos" className="hover:text-white transition-colors">Trilagem</Link></li>
                <li><Link href="/produtos" className="hover:text-white transition-colors">Kitbox</Link></li>
                <li><Link href="/produtos" className="hover:text-white transition-colors">Romana</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-['Inter'] font-semibold text-lg mb-4">Links rápidos</h3>
              <p className="text-sm text-[rgb(241,237,237)] leading-relaxed">
                Novas persianas chegaram! Descubra estilos exclusivos e transforme seus ambientes com design sob medida.
              </p>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8">
            <div className="flex justify-between items-center">
              <p className="text-sm text-[rgb(241,237,237)] font-['Inter']">
                © 2025 By Rosa Chic, All Rights Reserved.
              </p>
              <div className="flex gap-8 text-sm text-[rgb(241,237,237)]">
                <Link href="/" className="hover:text-white transition-colors">Termos e Condições</Link>
                <Link href="/" className="hover:text-white transition-colors">Política de privacidade</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
