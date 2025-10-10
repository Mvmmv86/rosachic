'use client'

import Link from 'next/link'
import { Search, ShoppingCart, User, Clock } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { useState } from 'react'

export default function GuiaRapidoPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('todos')

  // Categorias de guias
  const categories = [
    { id: 'todos', label: 'Todos os Guias' },
    { id: 'montagem', label: 'Montagem e Instalação' },
    { id: 'decoracao', label: 'Decoração e Design' },
    { id: 'manutencao', label: 'Manutenção e Cuidados' },
    { id: 'escolha', label: 'Dicas de Escolha' },
    { id: 'medicao', label: 'Como Medir' }
  ]

  // Guias informativos (mock data)
  const guides = [
    {
      id: 1,
      title: 'Como medir sua janela para persiana sob medida',
      category: 'medicao',
      categoryLabel: 'Como Medir',
      excerpt: 'Aprenda o passo a passo simples e seguro para tirar as medidas corretas da sua janela e garantir o encaixe perfeito da sua persiana.',
      image: '/guides/guide1.jpg',
      readTime: '5 min',
      date: '15 Jan 2025'
    },
    {
      id: 2,
      title: 'Instalação de persiana: guia completo DIY',
      category: 'montagem',
      categoryLabel: 'Montagem e Instalação',
      excerpt: 'Passo a passo detalhado com fotos e vídeos de como instalar sua persiana Kitbox sem precisar de profissional.',
      image: '/guides/guide2.jpg',
      readTime: '8 min',
      date: '12 Jan 2025'
    },
    {
      id: 3,
      title: 'Tendências de decoração 2025: persianas em destaque',
      category: 'decoracao',
      categoryLabel: 'Decoração e Design',
      excerpt: 'Descubra as cores, texturas e estilos de persianas que estão fazendo sucesso na decoração de interiores este ano.',
      image: '/guides/guide3.jpg',
      readTime: '6 min',
      date: '10 Jan 2025'
    },
    {
      id: 4,
      title: 'Como limpar e conservar suas persianas',
      category: 'manutencao',
      categoryLabel: 'Manutenção e Cuidados',
      excerpt: 'Dicas práticas de limpeza e manutenção para prolongar a vida útil das suas persianas e mantê-las sempre bonitas.',
      image: '/guides/guide4.jpg',
      readTime: '4 min',
      date: '08 Jan 2025'
    },
    {
      id: 5,
      title: 'Blackout vs. translúcido: qual escolher?',
      category: 'escolha',
      categoryLabel: 'Dicas de Escolha',
      excerpt: 'Entenda as diferenças entre os tipos de tecidos e descubra qual é o mais adequado para cada ambiente da sua casa.',
      image: '/guides/guide5.jpg',
      readTime: '5 min',
      date: '05 Jan 2025'
    },
    {
      id: 6,
      title: 'Persianas para ambientes comerciais: o que considerar',
      category: 'escolha',
      categoryLabel: 'Dicas de Escolha',
      excerpt: 'Guia completo para escolher persianas ideais para escritórios, lojas e outros espaços corporativos.',
      image: '/guides/guide6.jpg',
      readTime: '7 min',
      date: '03 Jan 2025'
    },
    {
      id: 7,
      title: '10 ideias de decoração com persianas rolo',
      category: 'decoracao',
      categoryLabel: 'Decoração e Design',
      excerpt: 'Inspirações criativas e modernas para integrar persianas rolo na decoração de quartos, salas e escritórios.',
      image: '/guides/guide7.jpg',
      readTime: '6 min',
      date: '01 Jan 2025'
    },
    {
      id: 8,
      title: 'Problemas comuns em persianas e como resolver',
      category: 'manutencao',
      categoryLabel: 'Manutenção e Cuidados',
      excerpt: 'Soluções rápidas para os problemas mais frequentes: cordinha travada, persiana torta, e muito mais.',
      image: '/guides/guide8.jpg',
      readTime: '5 min',
      date: '28 Dez 2024'
    }
  ]

  // Filtrar guias por categoria e busca
  const filteredGuides = guides.filter((guide) => {
    const matchesCategory = selectedCategory === 'todos' || guide.category === selectedCategory
    const matchesSearch = guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          guide.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="w-full bg-[rgb(108,25,29)] flex py-4 flex-col items-center gap-2">
        <div className="w-full max-w-[1224px] mx-auto px-6">
          <div className="flex w-full justify-between items-center">
            <Link href="/">
              <Logo />
            </Link>

            <div className="w-[336px] h-[40px] relative">
              <input
                type="text"
                placeholder="Buscar persianas, serviços, etc..."
                className="w-full h-full px-4 pr-10 rounded-lg border border-[rgb(200,190,191)] bg-white text-sm font-['Inter'] text-[rgb(119,105,106)] placeholder-[rgb(119,105,106)]"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgb(78,67,67)]" />
            </div>

            <div className="flex items-center gap-2">
              <Link href="/login">
                <button className="w-9 h-9 bg-white rounded-full border border-[rgb(108,25,29)] flex items-center justify-center">
                  <User className="w-5 h-5 text-[rgb(108,25,29)]" />
                </button>
              </Link>
              <Link href="/carrinho">
                <button className="w-9 h-9 bg-white rounded-full flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-[rgb(108,25,29)]" />
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full max-w-[1224px] mx-auto px-6">
          <nav className="flex w-full justify-center">
            <ul className="flex items-center gap-4 text-[rgb(241,237,237)] text-sm font-['Inter'] font-normal">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/produtos" className="hover:text-white transition-colors">Categorias</Link></li>
              <li><Link href="/guia-rapido" className="text-white font-medium">Guia rápido</Link></li>
              <li><Link href="/servicos" className="hover:text-white transition-colors">Serviços</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Ambientes</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Mais procurados</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Outros</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="w-full max-w-[1224px] mx-auto px-6 py-12">

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-[56px] font-['Cormorant_Garamond'] font-bold text-[rgb(108,25,29)] leading-tight mb-4">
            Guia Completo Rosa Chic
          </h1>
          <p className="text-lg font-['Inter'] text-[rgb(98,86,86)] max-w-[700px] mx-auto">
            Aprenda tudo sobre persianas: instalação, manutenção, decoração e muito mais.
            Guias práticos e informativos para você transformar seu ambiente.
          </p>
        </div>

        {/* Busca */}
        <div className="mb-8">
          <div className="relative max-w-[600px] mx-auto">
            <input
              type="text"
              placeholder="Buscar guias..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-[56px] px-6 pr-14 rounded-lg border-2 border-[rgb(200,190,191)] bg-white text-base font-['Inter'] text-black placeholder-[rgb(119,105,106)] focus:border-[rgb(108,25,29)] focus:outline-none transition-colors"
            />
            <Search className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[rgb(119,105,106)]" />
          </div>
        </div>

        {/* Filtro de Categorias */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-3 rounded-lg font-['Inter'] text-sm font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[rgb(108,25,29)] text-white'
                  : 'bg-[rgb(241,237,237)] text-[rgb(98,86,86)] hover:bg-[rgb(108,25,29)] hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid de Guias */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredGuides.map((guide) => (
            <Link
              key={guide.id}
              href={`/guia-rapido/${guide.id}`}
              className="group flex flex-col bg-white rounded-xl border border-[rgb(200,190,191)] overflow-hidden hover:border-[rgb(108,25,29)] hover:shadow-lg transition-all"
            >
              {/* Imagem */}
              <div className="w-full h-[200px] bg-gradient-to-br from-[rgb(241,237,237)] to-[rgb(200,190,191)] overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-[rgb(119,105,106)]">
                  <span className="text-sm">Imagem do guia</span>
                </div>
              </div>

              {/* Conteúdo */}
              <div className="p-6 flex flex-col gap-3 flex-1">
                {/* Badge de Categoria */}
                <span className="text-xs font-['Inter'] font-medium text-white bg-[rgb(184,115,51)] px-3 py-1 rounded-full self-start">
                  {guide.categoryLabel}
                </span>

                {/* Título */}
                <h3 className="text-xl font-['Cormorant_Garamond'] font-bold text-black leading-tight group-hover:text-[rgb(108,25,29)] transition-colors">
                  {guide.title}
                </h3>

                {/* Resumo */}
                <p className="text-sm font-['Inter'] text-[rgb(98,86,86)] leading-relaxed flex-1">
                  {guide.excerpt}
                </p>

                {/* Meta informações */}
                <div className="flex items-center justify-between pt-3 border-t border-[rgb(200,190,191)]">
                  <div className="flex items-center gap-2 text-xs font-['Inter'] text-[rgb(119,105,106)]">
                    <Clock className="w-4 h-4" />
                    <span>{guide.readTime} de leitura</span>
                  </div>
                  <span className="text-xs font-['Inter'] text-[rgb(119,105,106)]">
                    {guide.date}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mensagem quando não há resultados */}
        {filteredGuides.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lg font-['Inter'] text-[rgb(98,86,86)]">
              Nenhum guia encontrado. Tente outra categoria ou termo de busca.
            </p>
          </div>
        )}
      </div>

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

      {/* Botão Flutuante WhatsApp */}
      <WhatsAppButton />
    </div>
  )
}
