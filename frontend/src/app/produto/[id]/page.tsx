'use client'

import Link from 'next/link'
import { Search, ShoppingCart, User, ChevronRight, ChevronLeft } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { useState } from 'react'

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [activeTab, setActiveTab] = useState<'descricoes' | 'caracteristicas' | 'review'>('caracteristicas')
  const [selectedHeight, setSelectedHeight] = useState('')
  const [selectedWidth, setSelectedWidth] = useState('')
  const [selectedSide, setSelectedSide] = useState<'esquerdo' | 'direito' | null>(null)
  const [selectedColor, setSelectedColor] = useState('preto')

  // Dados de reviews
  const reviews = [
    {
      id: 1,
      author: 'Adriano',
      rating: 5,
      date: '3 meses atrás',
      comment: 'Muito bom, gostei bastante.',
      images: ['/reviews/review1-1.jpg', '/reviews/review1-2.jpg', '/reviews/review1-3.jpg']
    },
    {
      id: 2,
      author: 'Adriano',
      rating: 4,
      date: '3 meses atrás',
      comment: 'Muito bom, gostei bastante.',
      images: []
    },
    {
      id: 3,
      author: 'Adriano',
      rating: 5,
      date: '3 meses atrás',
      comment: 'Muito bom, gostei bastante.',
      images: []
    },
    {
      id: 4,
      author: 'Adriano',
      rating: 4,
      date: '3 meses atrás',
      comment: 'Muito bom, gostei bastante.',
      images: []
    },
    {
      id: 5,
      author: 'Adriano',
      rating: 5,
      date: '3 meses atrás',
      comment: 'Muito bom, gostei bastante.',
      images: []
    }
  ]

  const ratingStats = {
    average: 4.0,
    total: 10,
    distribution: [
      { stars: 5, count: 6, percentage: 60 },
      { stars: 4, count: 3, percentage: 30 },
      { stars: 3, count: 1, percentage: 10 },
      { stars: 2, count: 0, percentage: 0 },
      { stars: 1, count: 0, percentage: 0 }
    ]
  }

  // Dados mock do produto
  const product = {
    id: 1,
    name: 'Persiana Blackout Kitbox - Preto',
    category: 'Lançamento',
    price: 350.19,
    originalPrice: null, // VARIÁVEL: Preço original (quando houver desconto) - ex: 450.00
    discount: null, // VARIÁVEL: Percentual de desconto - ex: 22 (para 22%)

    // ⚠️ EXEMPLO COM DESCONTO: Descomente as linhas abaixo para testar
    // price: 350.19,
    // originalPrice: 450.00,
    // discount: 22,

    installments: { amount: 360, count: 6 },
    rating: 4,
    code: 'KIT-BLK-001',
    colors: [
      { name: 'Preto', value: 'preto', hex: '#000000' },
      { name: 'Branco', value: 'branco', hex: '#FFFFFF' },
      { name: 'Vermelho', value: 'vermelho', hex: '#E91E63' },
      { name: 'Verde', value: 'verde', hex: '#4CAF50' },
      { name: 'Azul', value: 'azul', hex: '#2196F3' },
      { name: 'Roxo', value: 'roxo', hex: '#9C27B0' },
      { name: 'Rosa', value: 'rosa', hex: '#E040FB' },
      { name: 'Laranja', value: 'laranja', hex: '#FF9800' },
      { name: 'Amarelo', value: 'amarelo', hex: '#CDDC39' }
    ],
    images: [
      '/products/produto1.jpg',
      '/products/produto2.jpg',
      '/products/produto3.jpg',
      '/products/produto4.jpg',
      '/products/produto5.jpg',
      '/products/produto6.jpg',
      '/products/produto7.jpg',
      '/products/produto8.jpg',
      '/products/produto9.jpg',
      '/products/produto10.jpg'
    ],
    characteristics: [
      { label: 'Visibilidade', value: 'Blackout (0% de luminosidade)' },
      { label: 'Aplicação Comercial', value: 'Sim' },
      { label: 'Aplicação Residencial', value: 'Sim' },
      { label: 'Regulagem Padrão', value: 'Cordinha lateral' },
      { label: 'Conteúdo da embalagem', value: '1 Persiana Kitbox com todos os acessórios para instalação' },
      { label: 'Controle Solar', value: 'Máximo (Blackout)' },
      { label: 'Composição do tecido', value: '100% Poliéster com tratamento blackout' },
      { label: 'Dimensões', value: 'Sob medida - escolha altura e largura no seletor acima' },
      { label: 'Limpeza', value: 'Pano úmido com detergente neutro' },
      { label: 'Cor dos acessórios', value: 'Preto' },
      { label: 'Garantia', value: '1 ano contra defeitos de fabricação' },
      { label: 'Locais de instalação', value: 'Sala, quarto, escritório, cozinha' },
      { label: 'Modelo de produto', value: 'Kitbox' },
      { label: 'Tempo de instalação', value: 'Aproximadamente 15 minutos' },
      { label: 'Bandô', value: 'Incluído' },
      { label: 'Variação do lote', value: 'Pode haver variação de tonalidade entre lotes diferentes' },
      { label: 'Altura Máxima', value: '2,80m' },
      { label: 'Largura Máxima', value: '2,20m' }
    ]
  }

  const visibleThumbnails = product.images.slice(0, 6)
  const remainingImages = product.images.length - 6

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Mesmo da Home */}
      <header className="w-full bg-[rgb(108,25,29)] flex py-4 flex-col items-center gap-2">
        <div className="w-full max-w-[1224px] mx-auto px-6">
          <div className="flex w-full justify-between items-center">
            <Logo />

            <div className="w-[336px] h-[40px] relative">
              <input
                type="text"
                placeholder="Buscar persianas, serviços, etc..."
                className="w-full h-full px-4 pr-10 rounded-lg border border-[rgb(200,190,191)] bg-white text-sm font-['Inter'] text-[rgb(119,105,106)] placeholder-[rgb(119,105,106)]"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgb(78,67,67)]" />
            </div>

            <div className="flex items-center gap-2">
              <button className="w-9 h-9 bg-white rounded-full border border-[rgb(108,25,29)] flex items-center justify-center">
                <User className="w-5 h-5 text-[rgb(108,25,29)]" />
              </button>
              <button className="w-9 h-9 bg-white rounded-full flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-[rgb(108,25,29)]" />
              </button>
            </div>
          </div>
        </div>

        <div className="w-full max-w-[1224px] mx-auto px-6">
          <nav className="flex w-full justify-center">
            <ul className="flex items-center gap-4 text-[rgb(241,237,237)] text-sm font-['Inter'] font-normal">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/produtos" className="hover:text-white transition-colors">Categorias</Link></li>
              <li><Link href={"/" as any} className="hover:text-white transition-colors">Guia rápido</Link></li>
              <li><Link href={"/" as any} className="hover:text-white transition-colors">Ambientes</Link></li>
              <li><Link href={"/" as any} className="hover:text-white transition-colors">Serviços</Link></li>
              <li><Link href={"/" as any} className="hover:text-white transition-colors">Mais procurados</Link></li>
              <li><Link href={"/" as any} className="hover:text-white transition-colors">Outros</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="w-full max-w-[1224px] mx-auto px-6 py-6">

        {/* Breadcrumb */}
        <div className="flex items-center gap-6 mb-6">
          <Link href="/produtos" className="flex items-center gap-2 text-sm font-['Inter'] text-[rgb(108,25,29)] hover:underline">
            <ChevronLeft className="w-4 h-4" />
            Voltar
          </Link>

          <div className="w-px h-[21px] bg-[rgb(221,213,214)]"></div>

          <div className="flex items-center gap-4 text-sm font-['Inter']">
            <Link href="/produtos" className="text-[rgb(108,25,29)] hover:underline">Kitbox</Link>
            <ChevronRight className="w-4 h-4 text-[rgb(221,213,214)]" />
            <Link href="/produtos" className="text-[rgb(108,25,29)] hover:underline">Persianas Kitbox</Link>
            <ChevronRight className="w-4 h-4 text-[rgb(221,213,214)]" />
            <span className="text-[rgb(108,25,29)]">Persiana</span>
          </div>
        </div>

        {/* Seção de Detalhes do Produto */}
        <div className="flex gap-6 mb-6">

          {/* Galeria de Imagens - Coluna Esquerda */}
          <div className="flex gap-2">

            {/* Thumbnails Verticais */}
            <div className="flex flex-col gap-2">
              {visibleThumbnails.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-[116px] h-[116px] rounded-xl overflow-hidden transition-all ${
                    selectedImage === index
                      ? 'ring-2 ring-[rgb(108,25,29)] opacity-100'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <div className="w-full h-full bg-[rgb(241,237,237)] flex items-center justify-center">
                    <div className="w-[92px] h-[92px] rounded-md bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-xs text-gray-600">
                      {index + 1}
                    </div>
                  </div>
                </button>
              ))}

              {remainingImages > 0 && (
                <div className="w-[116px] h-[116px] rounded-xl bg-[rgb(241,237,237)] flex items-center justify-center">
                  <div className="w-[92px] h-[92px] rounded-md bg-[rgb(98,86,86)] flex items-center justify-center">
                    <span className="text-[40px] font-['Inter'] text-[rgb(241,237,237)]">+{remainingImages}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Imagem Principal */}
            <div className="w-[676px] h-[736px] rounded-xl bg-[rgb(241,237,237)] overflow-hidden flex items-center justify-center">
              <div className="bg-gradient-to-br from-gray-300 to-gray-500 w-full h-full flex items-center justify-center text-white text-lg">
                Imagem {selectedImage + 1}
              </div>
            </div>
          </div>

          {/* Informações do Produto - Coluna Direita */}
          <div className="w-[392px] flex flex-col gap-4">

            {/* Badges de Categoria e Desconto */}
            <div className="flex gap-2">
              <span className="text-sm font-['Inter'] text-white bg-[rgb(184,115,51)] px-3 py-1 rounded-full">
                {product.category}
              </span>
              {product.discount && (
                <span className="text-sm font-['Inter'] font-medium text-white bg-[rgb(220,53,69)] px-3 py-1 rounded-full">
                  -{product.discount}%
                </span>
              )}
            </div>

            {/* Título e Rating */}
            <div className="flex flex-col gap-1">
              <h1 className="text-[40px] font-['Cormorant_Garamond'] font-bold text-black leading-[40px]">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex gap-[1px] mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    width="10"
                    height="10"
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

            {/* Preço */}
            <div className="flex flex-col gap-1">
              {product.originalPrice && product.discount ? (
                <div className="flex flex-col gap-1">
                  <span className="text-lg font-['Inter'] text-[rgb(98,86,86)] line-through">
                    R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                  </span>
                  <span className="text-[32px] font-['Inter'] font-medium text-[rgb(220,53,69)] leading-[40px]">
                    R$ {product.price.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              ) : (
                <span className="text-[32px] font-['Inter'] font-medium text-black leading-[40px]">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </span>
              )}
              <span className="text-sm font-['Inter'] text-black">
                Ou R$ {product.installments.amount} em {product.installments.count}X R$ sem juros
              </span>
              <Link href="#" className="text-sm font-['Inter'] text-[rgb(43,88,142)] hover:underline">
                Ver formas de pagamentos
              </Link>
            </div>

            <div className="w-full h-px bg-[rgb(200,190,191)]"></div>

            {/* Seletor de Cores */}
            <div className="flex flex-col gap-2">
              <p className="text-sm font-['Inter'] text-black">
                <span className="font-normal">Cor: </span>
                <span className="font-medium capitalize">{selectedColor}</span>
              </p>
              <div className="flex gap-2 flex-wrap">
                {product.colors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color.value)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor === color.value
                        ? 'border-[rgb(108,25,29)] scale-110'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    style={{
                      backgroundColor: color.hex,
                      boxShadow: color.hex === '#FFFFFF' ? 'inset 0 0 0 1px rgba(0,0,0,0.1)' : 'none'
                    }}
                    title={color.name}
                  />
                ))}
              </div>
              <span className="text-xs font-['Inter'] text-[rgb(98,86,86)]">
                Disponibilidade: <span className="text-[rgb(25,108,43)] font-medium">Em estoque</span>
              </span>
            </div>

            <div className="w-full h-px bg-[rgb(200,190,191)]"></div>

            {/* Seletores */}
            <div className="flex flex-col gap-4">

              {/* Título da seção */}
              <div className="flex flex-col gap-1">
                <p className="text-base font-['Inter'] font-medium">
                  <span className="text-[rgb(98,86,86)]">Tamanho: </span>
                  <span className="text-black">
                    ({selectedHeight || '0,0'}m x {selectedWidth || '0,0'}m)
                  </span>
                </p>
                <Link href="#" className="text-sm font-['Inter'] text-[rgb(43,88,142)] hover:underline">
                  Precisa de ajuda para medir? <span className="underline">Veja nosso guia completo</span>
                </Link>
              </div>

              {/* Dropdown Altura */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-['Inter'] text-black">
                  Selecione a Altura:
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-[rgb(119,105,106)]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="2" x2="12" y2="22"></line>
                      <polyline points="8 6 12 2 16 6"></polyline>
                      <polyline points="16 18 12 22 8 18"></polyline>
                    </svg>
                  </div>
                  <select
                    value={selectedHeight}
                    onChange={(e) => setSelectedHeight(e.target.value)}
                    className="w-full h-[40px] pl-12 pr-10 rounded-lg border border-[rgb(200,190,191)] bg-white text-base font-['Inter'] text-[rgb(119,105,106)] appearance-none"
                  >
                    <option value="">Escolha o tamanho</option>
                    <option value="1.0">1,0m</option>
                    <option value="1.5">1,5m</option>
                    <option value="2.0">2,0m</option>
                    <option value="2.5">2,5m</option>
                    <option value="2.8">2,8m (máx)</option>
                  </select>
                  <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 w-4 h-4 text-[rgb(119,105,106)] pointer-events-none" />
                </div>
              </div>

              {/* Dropdown Largura */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-['Inter'] text-black">
                  Selecione a Largura:
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-[rgb(119,105,106)]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <polyline points="6 8 2 12 6 16"></polyline>
                      <polyline points="18 16 22 12 18 8"></polyline>
                    </svg>
                  </div>
                  <select
                    value={selectedWidth}
                    onChange={(e) => setSelectedWidth(e.target.value)}
                    className="w-full h-[40px] pl-12 pr-10 rounded-lg border border-[rgb(200,190,191)] bg-white text-base font-['Inter'] text-[rgb(119,105,106)] appearance-none"
                  >
                    <option value="">Escolha o tamanho</option>
                    <option value="0.8">0,8m</option>
                    <option value="1.0">1,0m</option>
                    <option value="1.5">1,5m</option>
                    <option value="2.0">2,0m</option>
                    <option value="2.2">2,2m (máx)</option>
                  </select>
                  <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 w-4 h-4 text-[rgb(119,105,106)] pointer-events-none" />
                </div>
              </div>

              {/* Lado da Cordinha */}
              <div className="flex flex-col gap-2">
                <p className="text-base font-['Inter']">
                  <span className="text-[rgb(98,86,86)] font-normal">Lado da cordinha: </span>
                  <span className="text-black font-medium">
                    {selectedSide ? (selectedSide === 'esquerdo' ? 'Esquerdo' : 'Direito') : 'Escolha'}
                  </span>
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedSide('esquerdo')}
                    className={`flex-1 h-[36px] flex items-center justify-center gap-2 rounded-lg border transition-all ${
                      selectedSide === 'esquerdo'
                        ? 'border-[rgb(108,25,29)] bg-[rgb(241,237,237)]'
                        : 'border-[rgb(200,190,191)] bg-white hover:bg-[rgb(241,237,237)]'
                    }`}
                  >
                    {/* Ícone janela com cortina esquerda */}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2"/>
                      <line x1="8" y1="6" x2="8" y2="18"/>
                      <path d="M8 6 L5 8 L5 16 L8 18" fill="currentColor" fillOpacity="0.2"/>
                    </svg>
                    <span className="text-sm font-['Inter'] text-black">Esquerdo</span>
                  </button>

                  <button
                    onClick={() => setSelectedSide('direito')}
                    className={`flex-1 h-[36px] flex items-center justify-center gap-2 rounded-lg border transition-all ${
                      selectedSide === 'direito'
                        ? 'border-[rgb(108,25,29)] bg-[rgb(241,237,237)]'
                        : 'border-[rgb(200,190,191)] bg-white hover:bg-[rgb(241,237,237)]'
                    }`}
                  >
                    <span className="text-sm font-['Inter'] text-black">Direito</span>
                    {/* Ícone janela com cortina direita */}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2"/>
                      <line x1="16" y1="6" x2="16" y2="18"/>
                      <path d="M16 6 L19 8 L19 16 L16 18" fill="currentColor" fillOpacity="0.2"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-[rgb(200,190,191)]"></div>

            {/* Botões de Ação */}
            <div className="flex flex-col gap-2">
              <button className="w-full h-[48px] flex items-center justify-center gap-2 rounded-lg bg-[rgb(66,176,90)] hover:bg-[rgb(58,157,80)] transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
                <span className="text-base font-['Inter'] text-white">Comprar agora</span>
              </button>

              <button className="w-full h-[48px] flex items-center justify-center gap-2 rounded-lg bg-white border border-[rgb(66,176,90)] hover:bg-[rgb(241,237,237)] transition-colors">
                <ShoppingCart className="w-5 h-5 text-[rgb(25,108,43)]" />
                <span className="text-base font-['Inter'] text-[rgb(25,108,43)]">Adicionar ao carrinho</span>
              </button>
            </div>
          </div>
        </div>

        {/* Separador */}
        <div className="w-full h-px bg-[rgb(200,190,191)] my-6"></div>

        {/* Info Blocks */}
        <div className="w-full h-[80px] bg-[rgb(241,237,237)] rounded-xl flex items-center justify-center gap-4 px-4 mb-6">

          {/* Bloco Frete */}
          <div className="flex-1 flex items-center gap-3 px-4">
            <div className="w-8 h-8 rounded-full bg-[rgb(108,25,29)] flex items-center justify-center flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <rect x="1" y="3" width="15" height="13"></rect>
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                <circle cx="18.5" cy="18.5" r="2.5"></circle>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-['Inter'] font-medium text-black">Entrega rápida</span>
              <span className="text-sm font-['Inter'] text-[rgb(98,86,86)]">Passo a passo simples para não errar.</span>
            </div>
          </div>

          <div className="w-px h-[47px] bg-[rgb(200,190,191)]"></div>

          {/* Bloco Devolução */}
          <div className="flex-1 flex items-center gap-3 px-4">
            <div className="w-8 h-8 rounded-full bg-[rgb(108,25,29)] flex items-center justify-center flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <polyline points="1 4 1 10 7 10"></polyline>
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-['Inter'] font-medium text-black">Devolução</span>
              <span className="text-sm font-['Inter'] text-[rgb(98,86,86)]">7 dias para trocar ou devolver.</span>
            </div>
          </div>

          <div className="w-px h-[47px] bg-[rgb(200,190,191)]"></div>

          {/* Bloco Garantia */}
          <div className="flex-1 flex items-center gap-3 px-4">
            <div className="w-8 h-8 rounded-full bg-[rgb(108,25,29)] flex items-center justify-center flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-['Inter'] font-medium text-black">Garantia</span>
              <span className="text-sm font-['Inter'] text-[rgb(98,86,86)]">1 ano de cobertura Rosa Chic.</span>
            </div>
          </div>
        </div>

        {/* Sistema de Tabs */}
        <div className="w-full border border-[rgb(200,190,191)] rounded-2xl overflow-hidden">

          {/* Tab Bar */}
          <div className="flex border-b border-[rgb(200,190,191)]">
            <button
              onClick={() => setActiveTab('descricoes')}
              className={`flex-1 h-[60px] flex items-center justify-center px-4 text-lg font-['Inter'] transition-colors ${
                activeTab === 'descricoes'
                  ? 'text-[rgb(108,25,29)] border-b-2 border-[rgb(108,25,29)]'
                  : 'text-[rgb(180,168,169)] hover:text-[rgb(98,86,86)]'
              }`}
            >
              Descrições
            </button>

            <button
              onClick={() => setActiveTab('caracteristicas')}
              className={`flex-1 h-[60px] flex items-center justify-center px-4 text-lg font-['Inter'] transition-colors ${
                activeTab === 'caracteristicas'
                  ? 'text-[rgb(108,25,29)] border-b-2 border-[rgb(108,25,29)]'
                  : 'text-[rgb(180,168,169)] hover:text-[rgb(98,86,86)]'
              }`}
            >
              Características do produto
            </button>

            <button
              onClick={() => setActiveTab('review')}
              className={`flex-1 h-[60px] flex items-center justify-center px-4 text-lg font-['Inter'] transition-colors ${
                activeTab === 'review'
                  ? 'text-[rgb(108,25,29)] border-b-2 border-[rgb(108,25,29)]'
                  : 'text-[rgb(180,168,169)] hover:text-[rgb(98,86,86)]'
              }`}
            >
              Review
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-4">
            {activeTab === 'descricoes' && (
              <div className="py-8 text-center">
                <p className="text-sm font-['Inter'] text-[rgb(98,86,86)]">
                  Conteúdo de descrições do produto...
                </p>
              </div>
            )}

            {activeTab === 'caracteristicas' && (
              <div className="flex flex-col">
                {product.characteristics.map((char, index) => (
                  <div
                    key={index}
                    className={`flex gap-2 px-4 py-2 ${
                      index % 2 === 0 ? 'bg-[rgb(241,237,237)]' : 'bg-transparent'
                    }`}
                  >
                    <div className="w-[272px] flex-shrink-0">
                      <span className="text-sm font-['Inter'] text-black">{char.label}</span>
                    </div>
                    <div className="flex-1">
                      <span className="text-sm font-['Inter'] text-[rgb(98,86,86)]">{char.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'review' && (
              <div className="flex flex-col gap-6 p-6">

                {/* Header com Resumo e Filtro */}
                <div className="flex justify-between items-start">

                  {/* Resumo de Avaliações - Esquerda */}
                  <div className="flex gap-12">
                    {/* Rating Geral */}
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-[64px] font-['Inter'] font-bold text-black leading-none">
                        {ratingStats.average.toFixed(1)}
                      </span>
                      <span className="text-sm font-['Inter'] text-[rgb(98,86,86)]">de 5</span>

                      {/* Estrelas */}
                      <div className="flex gap-[2px]">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill={star <= Math.round(ratingStats.average) ? "#B87333" : "none"}
                            stroke="#B87333"
                            strokeWidth="1.5"
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                          </svg>
                        ))}
                      </div>

                      <span className="text-sm font-['Inter'] text-[rgb(98,86,86)]">
                        {ratingStats.total} reviews
                      </span>
                    </div>

                    {/* Gráfico de Barras */}
                    <div className="flex flex-col gap-2 min-w-[300px]">
                      {ratingStats.distribution.map((item) => (
                        <div key={item.stars} className="flex items-center gap-3">
                          <span className="text-sm font-['Inter'] text-black w-8">{item.stars}.0</span>

                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[rgb(108,25,29)] rounded-full transition-all"
                              style={{ width: `${item.percentage}%` }}
                            ></div>
                          </div>

                          <span className="text-sm font-['Inter'] text-[rgb(98,86,86)] w-8 text-right">
                            {item.count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Filtro - Direita */}
                  <div className="relative">
                    <select className="px-4 py-2 pr-10 rounded-lg border border-[rgb(200,190,191)] text-sm font-['Inter'] text-black bg-white appearance-none cursor-pointer">
                      <option>Filtrar por</option>
                      <option>Mais recentes</option>
                      <option>Mais antigos</option>
                      <option>Maior avaliação</option>
                      <option>Menor avaliação</option>
                    </select>
                    <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>

                {/* Separador */}
                <div className="w-full h-px bg-[rgb(200,190,191)]"></div>

                {/* Lista de Reviews */}
                <div className="flex flex-col gap-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="flex flex-col gap-3 pb-6 border-b border-[rgb(200,190,191)] last:border-b-0">

                      {/* Header do Review */}
                      <div className="flex items-center gap-3">
                        <span className="text-base font-['Inter'] font-medium text-black">
                          {review.author}
                        </span>
                      </div>

                      {/* Estrelas e Data */}
                      <div className="flex items-center gap-3">
                        <div className="flex gap-[2px]">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill={star <= review.rating ? "#B87333" : "none"}
                              stroke="#B87333"
                              strokeWidth="1.5"
                            >
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm font-['Inter'] text-[rgb(98,86,86)]">
                          {review.date}
                        </span>
                      </div>

                      {/* Comentário */}
                      <p className="text-sm font-['Inter'] text-black leading-relaxed">
                        {review.comment}
                      </p>

                      {/* Galeria de Imagens */}
                      {review.images.length > 0 && (
                        <div className="flex gap-3 mt-2">
                          {review.images.map((image, idx) => (
                            <div
                              key={idx}
                              className="w-[120px] h-[120px] rounded-lg overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                            >
                              <span className="text-xs text-gray-500">Foto {idx + 1}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer - Mesmo da Home */}
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
                  <li><Link href={"/" as any} className="hover:text-white transition-colors">Nossa história</Link></li>
                  <li><Link href={"/" as any} className="hover:text-white transition-colors">Nossa história</Link></li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="font-['Inter'] font-semibold text-lg mb-4">Nossos produtos</h3>
              <ul className="space-y-3 text-sm text-[rgb(241,237,237)]">
                <li><Link href={"/" as any} className="hover:text-white transition-colors">Cortinas</Link></li>
                <li><Link href={"/" as any} className="hover:text-white transition-colors">Rolos</Link></li>
                <li><Link href={"/" as any} className="hover:text-white transition-colors">Trilagem</Link></li>
                <li><Link href={"/" as any} className="hover:text-white transition-colors">Kitbox</Link></li>
                <li><Link href={"/" as any} className="hover:text-white transition-colors">Romana</Link></li>
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
                <Link href={"/" as any} className="hover:text-white transition-colors">Termos e Condições</Link>
                <Link href={"/" as any} className="hover:text-white transition-colors">Política de privacidade</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
