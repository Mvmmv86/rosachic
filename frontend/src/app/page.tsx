'use client'

import Link from 'next/link'
import { Search, ShoppingCart, User } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { useState } from 'react'

// Header com Logo component

export default function HomePage() {
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (productId: number) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  return (
    <div className="min-h-screen bg-[rgb(247,243,239)]">
      {/* Header - EXATAMENTE como no Figma */}
      <header className="w-full bg-[rgb(108,25,29)] flex py-4 flex-col items-center gap-2">
        {/* Container centralizado 1224px */}
        <div className="w-full max-w-[1224px] mx-auto px-6">
          {/* Frame 55 - display: flex, justify-content: space-between, align-items: center */}
          <div className="flex w-full justify-between items-center">
          {/* Logo - 50x50 circular (esquerda) */}
          <Logo />

          {/* Campo de busca - 336x40 (centro) */}
          <div className="w-[336px] h-[40px] relative">
            <input
              type="text"
              placeholder="Buscar persianas, serviços, etc..."
              className="w-full h-full px-4 pr-10 rounded-lg border border-[rgb(200,190,191)] bg-white text-sm font-['Inter'] text-[rgb(119,105,106)] placeholder-[rgb(119,105,106)]"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgb(78,67,67)]" />
          </div>

          {/* Ícones direita - 80x36 */}
          <div className="flex items-center gap-2">
            {/* Botão User - 36x36 QUADRADO com rounded-lg */}
            <button className="w-9 h-9 bg-white rounded-lg border border-[rgb(108,25,29)] flex items-center justify-center">
              <User className="w-3 h-3 text-[rgb(108,25,29)]" />
            </button>
            {/* Botão Cart - 36x36 QUADRADO com rounded-lg */}
            <button className="w-9 h-9 bg-white rounded-lg border border-[rgb(108,25,29)] flex items-center justify-center">
              <ShoppingCart className="w-3 h-3 text-[rgb(108,25,29)]" />
            </button>
          </div>
          </div>
        </div>

        {/* Frame 12 - Navegação CENTRALIZADA abaixo do input */}
        <div className="w-full max-w-[1224px] mx-auto px-6">
          <nav className="flex w-full justify-center">
          <ul className="flex items-center gap-4 text-[rgb(241,237,237)] text-sm font-['Inter'] font-normal">
            <li>
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
            </li>
            <li>
              <Link href={"/" as any} className="hover:text-white transition-colors">Categorias</Link>
            </li>
            <li>
              <Link href={"/" as any} className="hover:text-white transition-colors">Guia rápido</Link>
            </li>
            <li>
              <Link href={"/" as any} className="hover:text-white transition-colors">Ambientes</Link>
            </li>
            <li>
              <Link href={"/" as any} className="hover:text-white transition-colors">Serviços</Link>
            </li>
            <li>
              <Link href={"/" as any} className="hover:text-white transition-colors">Mais procurados</Link>
            </li>
            <li>
              <Link href={"/" as any} className="hover:text-white transition-colors">Outros</Link>
            </li>
          </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section - EXATAMENTE como no Figma */}
      <section
        className="w-full h-[582px] flex flex-col items-center justify-center relative bg-cover bg-center bg-no-repeat"
        style={{
          background: `linear-gradient(0deg, rgba(0, 0, 0, 0.03) 0%, rgba(0, 0, 0, 0.03) 100%), linear-gradient(270deg, rgba(0, 0, 0, 0.00) -15.14%, rgba(0, 0, 0, 0.45) 100%), url(/hero-background-clean.png) lightgray 50% / cover no-repeat`
        }}
      >
        {/* Container centralizado 1224px */}
        <div className="w-full max-w-[1224px] mx-auto px-6">
          {/* Conteúdo */}
          <div className="relative z-10 flex flex-col items-start gap-16 max-w-[600px]">
          <div className="flex flex-col gap-6">
            <h1 className="text-5xl font-['Cormorant_Garamond'] font-bold text-white leading-tight">
              Persianas sob medida para cada ambiente da sua casa
            </h1>
            <p className="text-lg font-['Inter'] text-white/90">
              Soluções exclusivas para valorizar cada ambiente, com entrega em todo o Brasil
            </p>
          </div>

          <div className="flex gap-4">
            <button className="bg-white text-[rgb(108,25,29)] px-8 py-3 rounded-lg font-['Inter'] font-medium hover:bg-white/90 transition-colors">
              Encontre a sua
            </button>
            <button className="bg-transparent text-white px-8 py-3 rounded-lg font-['Inter'] font-medium border-2 border-white hover:bg-white/10 transition-colors">
              Montagem em Curitiba
            </button>
          </div>
        </div>
        </div>
      </section>

      {/* Seção Categorias - EXATAMENTE como no Figma */}
      <section className="bg-[rgb(241,237,237)] py-20 text-center">
        {/* Container centralizado 1224px */}
        <div className="w-full max-w-[1224px] mx-auto px-6">
          {/* Título da seção */}
          <div className="mb-12">
            <p className="text-[rgb(108,25,29)] font-['Inter'] text-base font-normal leading-6 mb-2">
              Compre por categoria
            </p>
            <h2 className="text-[40px] font-['Cormorant_Garamond'] font-bold text-black leading-[40px]">
              Encontre o que você precisa
            </h2>
          </div>

          {/* Grid de categorias - 6 círculos de 152x152px com gap de 24px */}
          <div className="flex justify-between items-center gap-6 w-full">
            {[
              { name: 'Sem Furos', image: '/sem-furos.png' },
              { name: 'Kitbox', image: '/kitbox.png' },
              { name: 'Rolo', image: '/rolo.png' },
              { name: 'Romana', image: '/romana.png' },
              { name: 'Cortinas', image: '/cortina.png' },
              { name: 'Double Vision', image: '/double-vision.png' }
            ].map((category) => (
              <Link
                key={category.name}
                href={"/" as any}
                className="flex flex-col items-center gap-4"
              >
                {/* Círculo 152x152px com borda rosewood */}
                <div className="w-[152px] h-[152px] border-2 border-[rgb(108,25,29)] rounded-full overflow-hidden cursor-pointer transition-transform hover:scale-105">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Nome da categoria */}
                <span className="text-[18px] font-['Inter'] font-normal text-black leading-7">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Seção Lançamentos - EXATAMENTE como no Figma */}
      <section className="bg-white flex px-[108px] py-[108px] items-start gap-6">
        {/* Container centralizado 1224px */}
        <div className="w-full max-w-[1224px] mx-auto flex items-start gap-6">

          {/* Frame esquerdo - Texto e Botão */}
          <div className="flex flex-col justify-center items-start gap-16">
            {/* Textos */}
            <div className="flex flex-col items-start gap-6">
              <div className="flex flex-col items-start gap-2">
                <span className="text-[rgb(108,25,29)] font-['Inter'] text-base font-normal">
                  Lançamentos
                </span>
                <h2 className="text-[40px] font-['Cormorant_Garamond'] font-bold text-black leading-tight">
                  Veja nossos os últimos produtos que chegaram
                </h2>
              </div>
              <p className="text-base font-['Inter'] text-gray-700 leading-relaxed">
                Novas persianas chegaram! Descubra estilos exclusivos e transforme seus ambientes com design sob medida.
              </p>
            </div>

            {/* Botão */}
            <button className="flex px-3 py-3 justify-center items-center gap-2 bg-[rgb(108,25,29)] text-white rounded-lg font-['Inter'] font-medium hover:bg-[rgb(88,20,24)] transition-colors">
              Ver Todos os Lançamentos
            </button>
          </div>

          {/* Grid de 3 Cards de Produto */}
          <div className="flex items-start gap-6">
            {[
              { id: 1, image: '/products/produto1.jpg', name: 'Persiana Rolô Tela Solar 5% - Branca', price: 'R$ 320,00', rating: 4 },
              { id: 2, image: '/products/produto2.jpg', name: 'Persiana Rolô Tela Solar 5% - Branca', price: 'R$ 320,00', rating: 4 },
              { id: 3, image: '/products/produto3.jpg', name: 'Persiana Rolô Tela Solar 5% - Branca', price: 'R$ 320,00', rating: 4 }
            ].map((product) => {
              const isFavorite = favorites.includes(product.id)

              return (
                <div
                  key={product.id}
                  className="flex p-6 flex-col justify-center items-center gap-2 w-[288px] rounded-xl border border-[rgb(200,190,191)] bg-[rgb(241,237,237)]"
                >
                  {/* Header do card - Badge e Coração */}
                  <div className="w-full flex justify-between items-start mb-2">
                    <span className="px-3 py-1 bg-[rgb(184,115,51)] text-white text-xs font-['Inter'] rounded-full">
                      Lançamento
                    </span>
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className="w-6 h-6 flex items-center justify-center transition-all hover:scale-110"
                      aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill={isFavorite ? "#B87333" : "none"}
                        stroke={isFavorite ? "#B87333" : "currentColor"}
                        strokeWidth="2"
                        className="transition-colors"
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                      </svg>
                    </button>
                  </div>

                {/* Imagem do produto */}
                <div className="w-full h-[224px] bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg mb-4 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                    Produto {product.id}
                  </div>
                </div>

                {/* Informações do produto */}
                <div className="w-full flex flex-col gap-2">
                  <h3 className="text-base font-['Inter'] text-gray-800">
                    {product.name}
                  </h3>

                  <div className="flex justify-between items-center w-full">
                    <span className="text-lg font-['Inter'] font-semibold text-black">
                      {product.price}
                    </span>
                    <button className="w-6 h-6 flex items-center justify-center text-[rgb(108,25,29)]">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </button>
                  </div>

                  {/* Estrelas de avaliação */}
                  <div className="flex gap-1" title={`Avaliação: ${product.rating} de 5 estrelas`}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill={star <= product.rating ? "#B87333" : "none"}
                        stroke="#B87333"
                        strokeWidth="1.5"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                    ))}
                  </div>
                </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Seção Como medir - EXATAMENTE como no Figma */}
      <section className="bg-[rgb(241,237,237)] flex flex-col px-[108px] py-12 items-start gap-6 w-full">
        {/* Container centralizado 1224px */}
        <div className="w-full max-w-[1224px] mx-auto">

          {/* Título e subtítulo centralizados */}
          <div className="text-center mb-16">
            <h2 className="text-[40px] font-['Cormorant_Garamond'] font-bold text-black mb-4">
              Como medir
            </h2>
            <p className="text-base font-['Inter'] text-gray-700">
              Descubra como tirar suas medidas corretamente em apenas três passos simples.
            </p>
          </div>

          {/* 3 Steps com números e linhas conectoras */}
          <div className="relative flex items-start justify-between">
            {/* Step 01 */}
            <div className="flex flex-col items-center w-[376px]">
              <div className="w-[106px] h-[106px] bg-white rounded-3xl flex items-center justify-center mb-6 shadow-sm">
                <span className="text-[48px] font-['Cormorant_Garamond'] font-bold text-black">01</span>
              </div>
              <h3 className="text-lg font-['Inter'] font-semibold text-black text-center mb-4 leading-tight">
                Use uma trena para medir a largura total da janela ou espaço desejado.
              </h3>
              <p className="text-sm font-['Inter'] text-gray-600 text-center">
                Dica: sempre meça em três pontos (superior, meio e inferior) e anote a menor medida.
              </p>
            </div>

            {/* Linha conectora SVG entre 01 e 02 */}
            <div className="flex items-center justify-center" style={{ width: '264px', marginTop: '53px' }}>
              <svg width="264" height="83" viewBox="0 0 264 83" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 41.5C44 41.5 44 0 88 0C132 0 132 83 176 83C220 83 220 41.5 264 41.5" stroke="#1A1A1A" strokeWidth="2" strokeDasharray="4 4"/>
              </svg>
            </div>

            {/* Step 02 */}
            <div className="flex flex-col items-center w-[376px]">
              <div className="w-[106px] h-[106px] bg-white rounded-3xl flex items-center justify-center mb-6 shadow-sm">
                <span className="text-[48px] font-['Cormorant_Garamond'] font-bold text-black">02</span>
              </div>
              <h3 className="text-lg font-['Inter'] font-semibold text-black text-center mb-4 leading-tight">
                Meça a altura do espaço da janela do topo até a base.
              </h3>
              <p className="text-sm font-['Inter'] text-gray-600 text-center">
                Dica: tire medidas nos dois lados e utilize a maior medida para garantir o caimento perfeito.
              </p>
            </div>

            {/* Linha conectora SVG entre 02 e 03 */}
            <div className="flex items-center justify-center" style={{ width: '289px', marginTop: '53px' }}>
              <svg width="289" height="83" viewBox="0 0 289 83" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 41.5C48.1667 41.5 48.1667 0 96.3333 0C144.5 0 144.5 83 192.667 83C240.833 83 240.833 41.5 289 41.5" stroke="#1A1A1A" strokeWidth="2" strokeDasharray="4 4"/>
              </svg>
            </div>

            {/* Step 03 */}
            <div className="flex flex-col items-center w-[376px]">
              <div className="w-[101px] h-[106px] bg-white rounded-3xl flex items-center justify-center mb-6 shadow-sm">
                <span className="text-[48px] font-['Cormorant_Garamond'] font-bold text-black">03</span>
              </div>
              <h3 className="text-lg font-['Inter'] font-semibold text-black text-center mb-4 leading-tight">
                Escolha se sua persiana será instalada dentro do vão da janela (embutida) ou fora do vão (sobreposta).
              </h3>
              <p className="text-sm font-['Inter'] text-gray-600 text-center">
                Essa decisão influencia no tamanho final do produto e no acabamento.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Mais Vendidos */}
      <section className="bg-white py-20">
        {/* Container centralizado 1224px */}
        <div className="w-full max-w-[1224px] mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-[32px] font-['Cormorant_Garamond'] text-black">
                Mais Vendidos
              </h2>
              <p className="text-gray-600 font-['Inter']">Os favoritos dos nossos clientes</p>
            </div>
            <button className="text-[rgb(241,237,237)] bg-[rgb(108,25,29)] px-6 py-3 rounded font-['Inter']">
              Ver Todos os Lançamentos
            </button>
          </div>

          {/* Carousel de produtos */}
          <div className="flex gap-6 overflow-x-auto">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="min-w-[308px] bg-gray-50 rounded-lg p-4">
                <div className="h-[308px] bg-gray-200 rounded mb-4"></div>
                <h3 className="font-['Inter'] text-base mb-1">Produto {i}</h3>
                <p className="text-[rgb(108,25,29)] font-bold font-['Inter']">R$ 299,90</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção Sobre Nós */}
      <section className="bg-[rgb(241,237,237)] py-20">
        {/* Container centralizado 1224px */}
        <div className="w-full max-w-[1224px] mx-auto px-6">
          <div className="grid grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-[40px] font-['Cormorant_Garamond'] text-black mb-6">
                Sobre a Rosa Chic
              </h2>
              <p className="text-gray-700 font-['Inter'] mb-6 leading-relaxed">
                Há mais de 10 anos transformando ambientes com persianas de alta qualidade.
                Nossa missão é proporcionar elegância, conforto e praticidade para seu lar.
              </p>
              <div className="flex gap-4">
                <button className="bg-[rgb(108,25,29)] text-white px-6 py-3 rounded font-['Inter']">
                  Conhecer mais
                </button>
                <button className="border border-[rgb(108,25,29)] text-[rgb(108,25,29)] px-6 py-3 rounded font-['Inter']">
                  Fale conosco
                </button>
              </div>
            </div>
            <div className="h-[567px] bg-gray-300 rounded-lg"></div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[rgb(108,25,29)] text-white py-20">
        {/* Container centralizado 1224px */}
        <div className="w-full max-w-[1224px] mx-auto px-6">
          {/* Links do footer */}
          <div className="grid grid-cols-6 gap-8 mb-12">
            {['Produtos', 'Serviços', 'Sobre', 'Ajuda', 'Social', 'Legal'].map((section) => (
              <div key={section}>
                <h3 className="font-['Inter'] font-semibold mb-4">{section}</h3>
                <ul className="space-y-2 text-sm text-[rgb(241,237,237)]">
                  <li>Link 1</li>
                  <li>Link 2</li>
                  <li>Link 3</li>
                </ul>
              </div>
            ))}
          </div>

          {/* Linha divisória */}
          <div className="border-t border-white/20 pt-8">
            <div className="flex justify-between items-center">
              <p className="text-sm text-[rgb(241,237,237)] font-['Inter']">
                © 2024 Rosa Chic Persinas. Todos os direitos reservados.
              </p>
              <div className="flex gap-6 text-sm text-[rgb(241,237,237)]">
                <Link href={"/" as any}>Privacidade</Link>
                <Link href={"/" as any}>Termos</Link>
                <Link href={"/" as any}>Cookies</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}