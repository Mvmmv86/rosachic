'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

export default function SobrePage() {
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[rgb(247,243,239)] to-white">
      {/* Hero Section com Parallax */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background com cor bege igual à seção Nossa História */}
        <div
          className="absolute inset-0 bg-[rgb(247,243,239)]"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        />

        {/* Padrão decorativo com animação - bolinhas cor vinho da navbar */}
        <div className="absolute inset-0 opacity-15">
          <div
            className="absolute top-20 left-20 w-48 h-48 border-2 border-[rgb(108,25,29)] rounded-full animate-float"
            style={{ animation: 'float 20s ease-in-out infinite' }}
          />
          <div
            className="absolute bottom-40 right-32 w-64 h-64 border-2 border-[rgb(108,25,29)] rounded-full animate-float-slow"
            style={{ animation: 'float 25s ease-in-out infinite 2s' }}
          />
          <div
            className="absolute top-1/2 left-1/3 w-32 h-32 border-2 border-[rgb(108,25,29)] rounded-full animate-float-slower"
            style={{ animation: 'float 30s ease-in-out infinite 5s' }}
          />
        </div>

        {/* Adiciona keyframes CSS para animação das bolinhas */}
        <style jsx>{`
          @keyframes float {
            0%, 100% {
              transform: translate(0, 0) scale(1);
            }
            25% {
              transform: translate(10px, -20px) scale(1.05);
            }
            50% {
              transform: translate(-15px, -10px) scale(0.95);
            }
            75% {
              transform: translate(5px, 15px) scale(1.02);
            }
          }
        `}</style>

        {/* Conteúdo Hero */}
        <div className={`relative z-10 text-center px-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-6xl md:text-7xl font-['Cormorant_Garamond'] font-bold text-[rgb(108,25,29)] mb-6">
            Sobre a Rosa Chic
          </h1>
          <p className="text-xl md:text-2xl font-['Inter'] text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Transformando ambientes com elegância e funcionalidade desde 2009
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-[rgb(108,25,29)]" />
        </div>
      </section>

      {/* Nossa História - Timeline */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-['Cormorant_Garamond'] font-bold text-[rgb(108,25,29)] text-center mb-16">
            Nossa História
          </h2>

          <div className="relative">
            {/* Linha vertical */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[rgb(108,25,29)] to-[rgb(184,115,51)]" />

            {/* Timeline Item - Fundação */}
            <div className="relative mb-16 group">
              <div className="flex items-center justify-center mb-8">
                <div className="w-16 h-16 bg-[rgb(108,25,29)] rounded-full flex items-center justify-center text-white font-['Inter'] font-bold text-lg shadow-lg group-hover:scale-110 transition-transform">
                  2009
                </div>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-[rgb(241,237,237)] hover:border-[rgb(108,25,29)]">
                <h3 className="text-2xl font-['Cormorant_Garamond'] font-bold text-[rgb(108,25,29)] mb-4">
                  O Começo
                </h3>
                <p className="text-lg font-['Inter'] text-gray-700 leading-relaxed">
                  Fundada em Curitiba, em <strong>18 de dezembro de 2009</strong>, a Rosa Chic Persianas iniciou suas atividades oferecendo serviços de manutenção e higienização de persianas. O cuidado com cada detalhe e o compromisso com a satisfação dos clientes rapidamente destacaram a empresa no mercado.
                </p>
              </div>
            </div>

            {/* Timeline Item - Expansão */}
            <div className="relative mb-16 group">
              <div className="flex items-center justify-center mb-8">
                <div className="w-16 h-16 bg-[rgb(184,115,51)] rounded-full flex items-center justify-center text-white font-['Inter'] font-bold text-lg shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-[rgb(241,237,237)] hover:border-[rgb(184,115,51)]">
                <h3 className="text-2xl font-['Cormorant_Garamond'] font-bold text-[rgb(184,115,51)] mb-4">
                  Nova Fase
                </h3>
                <p className="text-lg font-['Inter'] text-gray-700 leading-relaxed">
                  A qualidade do trabalho despertou o interesse dos clientes, que passaram a buscar também persianas novas com o mesmo padrão de excelência — dando origem à nova fase da Rosa Chic.
                </p>
              </div>
            </div>

            {/* Timeline Item - Atualidade */}
            <div className="relative group">
              <div className="flex items-center justify-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-[rgb(108,25,29)] to-[rgb(184,115,51)] rounded-full flex items-center justify-center text-white font-['Inter'] font-bold text-lg shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-[rgb(241,237,237)] hover:border-[rgb(108,25,29)]">
                <h3 className="text-2xl font-['Cormorant_Garamond'] font-bold text-[rgb(108,25,29)] mb-4">
                  Hoje
                </h3>
                <p className="text-lg font-['Inter'] text-gray-700 leading-relaxed">
                  Com mais de uma década de atuação, a empresa se consolidou como <strong>referência em soluções completas</strong> para persianas e cortinas, unindo tecnologia, estética e funcionalidade para transformar ambientes residenciais e corporativos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Propósito, Missão, Visão - Cards com Hover */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-[rgb(247,243,239)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Propósito */}
            <div className="group relative h-full">
              <div className="relative bg-white group-hover:bg-gradient-to-br group-hover:from-[rgb(108,25,29)] group-hover:to-[rgb(184,115,51)] rounded-3xl p-8 h-full flex flex-col shadow-xl group-hover:shadow-2xl transition-all duration-300 border-2 border-[rgb(241,237,237)] group-hover:border-transparent transform group-hover:-translate-y-2 group-hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-[rgb(108,25,29)] to-[rgb(184,115,51)] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-['Cormorant_Garamond'] font-bold text-[rgb(108,25,29)] mb-4 group-hover:text-white transition-colors">
                  Propósito
                </h3>
                <p className="text-lg font-['Inter'] text-gray-700 leading-relaxed group-hover:text-white transition-colors">
                  Oferecer conforto, funcionalidade e elegância aos ambientes, por meio de soluções sob medida em persianas e cortinas.
                </p>
              </div>
            </div>

            {/* Missão */}
            <div className="group relative h-full">
              <div className="relative bg-white group-hover:bg-gradient-to-br group-hover:from-[rgb(108,25,29)] group-hover:to-[rgb(184,115,51)] rounded-3xl p-8 h-full flex flex-col shadow-xl group-hover:shadow-2xl transition-all duration-300 border-2 border-[rgb(241,237,237)] group-hover:border-transparent transform group-hover:-translate-y-2 group-hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-[rgb(108,25,29)] to-[rgb(184,115,51)] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-['Cormorant_Garamond'] font-bold text-[rgb(108,25,29)] mb-4 group-hover:text-white transition-colors">
                  Missão
                </h3>
                <p className="text-lg font-['Inter'] text-gray-700 leading-relaxed group-hover:text-white transition-colors">
                  Atender com excelência às necessidades dos clientes, proporcionando produtos de alta qualidade, atendimento especializado e resultados que unam design e durabilidade.
                </p>
              </div>
            </div>

            {/* Visão */}
            <div className="group relative h-full">
              <div className="relative bg-white group-hover:bg-gradient-to-br group-hover:from-[rgb(108,25,29)] group-hover:to-[rgb(184,115,51)] rounded-3xl p-8 h-full flex flex-col shadow-xl group-hover:shadow-2xl transition-all duration-300 border-2 border-[rgb(241,237,237)] group-hover:border-transparent transform group-hover:-translate-y-2 group-hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-[rgb(108,25,29)] to-[rgb(184,115,51)] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-['Cormorant_Garamond'] font-bold text-[rgb(108,25,29)] mb-4 group-hover:text-white transition-colors">
                  Visão
                </h3>
                <p className="text-lg font-['Inter'] text-gray-700 leading-relaxed group-hover:text-white transition-colors">
                  Ser reconhecida como uma das principais referências em persianas e cortinas do sul do Brasil, destacando-se pela inovação, confiança e satisfação dos clientes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valores - Lista com Animação */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-['Cormorant_Garamond'] font-bold text-[rgb(108,25,29)] text-center mb-16">
            Nossos Valores
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                svg: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />,
                title: 'Qualidade',
                text: 'Excelência em cada etapa do processo.'
              },
              {
                svg: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />,
                title: 'Comprometimento',
                text: 'Foco total nas expectativas e necessidades do cliente.'
              },
              {
                svg: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />,
                title: 'Inovação',
                text: 'Atualização constante em produtos e tendências.'
              },
              {
                svg: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
                title: 'Ética e Transparência',
                text: 'Relações baseadas na confiança e no respeito.'
              },
              {
                svg: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
                title: 'Sustentabilidade',
                text: 'Responsabilidade com o meio ambiente e a comunidade.'
              },
            ].map((valor, index) => (
              <div
                key={valor.title}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-[rgb(241,237,237)] hover:border-[rgb(108,25,29)] transform hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[rgb(108,25,29)] to-[rgb(184,115,51)] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {valor.svg}
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-['Cormorant_Garamond'] font-bold text-[rgb(108,25,29)] mb-2">
                      {valor.title}
                    </h3>
                    <p className="text-lg font-['Inter'] text-gray-700 leading-relaxed">
                      {valor.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-6 bg-gradient-to-br from-[rgb(108,25,29)] to-[rgb(184,115,51)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-['Cormorant_Garamond'] font-bold text-white mb-6">
            Pronto para Transformar seu Ambiente?
          </h2>
          <p className="text-xl font-['Inter'] text-[rgb(241,237,237)] mb-10">
            Entre em contato e descubra como podemos ajudar você
          </p>
          <Link
            href="/produtos"
            className="inline-block px-10 py-4 bg-white text-[rgb(108,25,29)] font-['Inter'] font-semibold text-lg rounded-full hover:bg-[rgb(241,237,237)] transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            Conhecer Nossos Produtos
          </Link>
        </div>
      </section>
    </div>
  )
}
