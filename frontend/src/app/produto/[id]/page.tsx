'use client'

import Link from 'next/link'
import { Search, ShoppingCart, User, ChevronRight, ChevronLeft } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { getProductById, calculatePrice, formatPrice, getImageUrl, validateDimensions, type Product } from '@/lib/products'

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [activeTab, setActiveTab] = useState<'descricoes' | 'caracteristicas'>('caracteristicas')
  const [selectedHeightCm, setSelectedHeightCm] = useState<number>(0)
  const [selectedWidthCm, setSelectedWidthCm] = useState<number>(0)
  const [validationErrors, setValidationErrors] = useState<string[]>([])

  useEffect(() => {
    fetchProduct()
  }, [productId])

  const fetchProduct = async () => {
    try {
      setLoading(true)
      const data = await getProductById(productId)
      setProduct(data)
    } catch (error) {
      console.error('Erro ao buscar produto:', error)
      alert('Produto não encontrado')
    } finally {
      setLoading(false)
    }
  }

  const handleDimensionChange = (larguraCm: number, alturaCm: number) => {
    setSelectedWidthCm(larguraCm)
    setSelectedHeightCm(alturaCm)

    if (product && larguraCm > 0 && alturaCm > 0) {
      const validation = validateDimensions(product, larguraCm, alturaCm)
      setValidationErrors(validation.errors)
    } else {
      setValidationErrors([])
    }
  }

  const calculatedPrice = product && selectedWidthCm > 0 && selectedHeightCm > 0
    ? calculatePrice(product, selectedWidthCm, selectedHeightCm)
    : 0

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500 text-lg">Carregando produto...</div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500 text-lg">Produto não encontrado</div>
      </div>
    )
  }

  const visibleThumbnails = product.imagens.slice(0, 6)
  const remainingImages = product.imagens.length > 6 ? product.imagens.length - 6 : 0
  const hasImage = product.imagens && product.imagens.length > 0

  return (
    <div className="min-h-screen bg-white">
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
            <Link href="/produtos" className="text-[rgb(108,25,29)] hover:underline">{product.material}</Link>
            <ChevronRight className="w-4 h-4 text-[rgb(221,213,214)]" />
            <Link href="/produtos" className="text-[rgb(108,25,29)] hover:underline">Persianas</Link>
            <ChevronRight className="w-4 h-4 text-[rgb(221,213,214)]" />
            <span className="text-[rgb(108,25,29)]">{product.modelo}</span>
          </div>
        </div>

        {/* Seção de Detalhes do Produto */}
        <div className="flex gap-6 mb-6">

          {/* Galeria de Imagens - Coluna Esquerda */}
          <div className="flex gap-2">

            {/* Thumbnails Verticais */}
            <div className="flex flex-col gap-2">
              {hasImage && visibleThumbnails.map((imagem, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-[116px] h-[116px] rounded-xl overflow-hidden transition-all ${
                    selectedImage === index
                      ? 'ring-2 ring-[rgb(108,25,29)] opacity-100'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={getImageUrl(imagem)}
                    alt={`${product.modelo} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
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
              {hasImage ? (
                <img
                  src={getImageUrl(product.imagens[selectedImage])}
                  alt={product.modelo}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="bg-gradient-to-br from-gray-200 to-gray-400 w-full h-full flex items-center justify-center text-gray-500">
                  Sem imagem
                </div>
              )}
            </div>
          </div>

          {/* Informações do Produto - Coluna Direita */}
          <div className="w-[392px] flex flex-col gap-4">

            {/* Badges */}
            <div className="flex gap-2 flex-wrap">
              <span className="text-sm font-['Inter'] text-white bg-[rgb(108,25,29)] px-3 py-1 rounded-full">
                {product.material}
              </span>
              <span className="text-sm font-['Inter'] text-white bg-gray-600 px-3 py-1 rounded-full">
                {product.luminosidade}
              </span>
            </div>

            {/* Título */}
            <div className="flex flex-col gap-1">
              <h1 className="text-[40px] font-['Cormorant_Garamond'] font-bold text-black leading-[40px]">
                {product.modelo}
              </h1>
              <p className="text-sm font-['Inter'] text-gray-600 mt-2">
                Código: {product.codigo}
              </p>
            </div>

            {/* Preço */}
            <div className="flex flex-col gap-1">
              <span className="text-[32px] font-['Inter'] font-medium text-black leading-[40px]">
                {formatPrice(product.valorM2)}/m²
              </span>
              {calculatedPrice > 0 && validationErrors.length === 0 && (
                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                  <p className="text-sm font-['Inter'] text-gray-700">
                    Preço total para suas medidas:
                  </p>
                  <p className="text-2xl font-['Inter'] font-bold text-green-700">
                    {formatPrice(calculatedPrice)}
                  </p>
                </div>
              )}
            </div>

            <div className="w-full h-px bg-[rgb(200,190,191)]"></div>

            {/* Seletores de Dimensões */}
            <div className="flex flex-col gap-4">

              <div className="flex flex-col gap-1">
                <p className="text-base font-['Inter'] font-medium">
                  <span className="text-[rgb(98,86,86)]">Tamanho: </span>
                  <span className="text-black">
                    ({(selectedWidthCm / 100).toFixed(2)}m x {(selectedHeightCm / 100).toFixed(2)}m)
                  </span>
                </p>
                <Link href="#" className="text-sm font-['Inter'] text-[rgb(43,88,142)] hover:underline">
                  Precisa de ajuda para medir? <span className="underline">Veja nosso guia completo</span>
                </Link>
              </div>

              {/* Dropdown Largura */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-['Inter'] text-black">
                  Selecione a Largura (máx: {product.larguraMaxCm}cm):
                </label>
                <input
                  type="number"
                  min="0"
                  max={product.larguraMaxCm}
                  value={selectedWidthCm || ''}
                  onChange={(e) => handleDimensionChange(parseFloat(e.target.value) || 0, selectedHeightCm)}
                  className="w-full h-[40px] px-4 rounded-lg border border-[rgb(200,190,191)] bg-white text-base font-['Inter'] text-black"
                  placeholder="Largura em cm"
                />
              </div>

              {/* Dropdown Altura */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-['Inter'] text-black">
                  Selecione a Altura (máx: {product.alturaMaxCm}cm):
                </label>
                <input
                  type="number"
                  min="0"
                  max={product.alturaMaxCm}
                  value={selectedHeightCm || ''}
                  onChange={(e) => handleDimensionChange(selectedWidthCm, parseFloat(e.target.value) || 0)}
                  className="w-full h-[40px] px-4 rounded-lg border border-[rgb(200,190,191)] bg-white text-base font-['Inter'] text-black"
                  placeholder="Altura em cm"
                />
              </div>

              {/* Erros de validação */}
              {validationErrors.length > 0 && (
                <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                  <ul className="text-sm text-red-700 space-y-1">
                    {validationErrors.map((error, idx) => (
                      <li key={idx}>• {error}</li>
                    ))}
                  </ul>
                </div>
              )}

              <p className="text-xs text-gray-600">
                Área mínima: {product.areaMinM2}m²
              </p>
            </div>

            <div className="w-full h-px bg-[rgb(200,190,191)]"></div>

            {/* Estoque */}
            <p className="text-sm font-['Inter']">
              Estoque: <span className={`font-medium ${product.estoque > 5 ? 'text-green-600' : 'text-red-600'}`}>
                {product.estoque} unidades
              </span>
            </p>

            {/* Ambientes */}
            {product.ambientes.length > 0 && (
              <div>
                <p className="text-sm font-['Inter'] font-medium text-gray-700 mb-2">
                  Ambientes recomendados:
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.ambientes.map((amb) => (
                    <span key={amb} className="px-3 py-1 bg-[rgb(241,237,237)] text-sm font-['Inter'] text-black rounded-full">
                      {amb}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="w-full h-px bg-[rgb(200,190,191)]"></div>

            {/* Botões de Ação */}
            <div className="flex flex-col gap-2">
              <button
                disabled={validationErrors.length > 0 || !selectedWidthCm || !selectedHeightCm}
                className="w-full h-[48px] flex items-center justify-center gap-2 rounded-lg bg-[rgb(66,176,90)] hover:bg-[rgb(58,157,80)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
                <span className="text-base font-['Inter'] text-white">Comprar agora</span>
              </button>

              <button
                disabled={validationErrors.length > 0 || !selectedWidthCm || !selectedHeightCm}
                className="w-full h-[48px] flex items-center justify-center gap-2 rounded-lg bg-white border border-[rgb(66,176,90)] hover:bg-[rgb(241,237,237)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="w-5 h-5 text-[rgb(25,108,43)]" />
                <span className="text-base font-['Inter'] text-[rgb(25,108,43)]">Adicionar ao carrinho</span>
              </button>
            </div>
          </div>
        </div>

        {/* Separador */}
        <div className="w-full h-px bg-[rgb(200,190,191)] my-6"></div>

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
              Descrição
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
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'descricoes' && (
              <div className="py-4">
                <p className="text-base font-['Inter'] text-gray-700 leading-relaxed">
                  {product.descricao}
                </p>
              </div>
            )}

            {activeTab === 'caracteristicas' && (
              <div className="flex flex-col">
                <div className="flex gap-2 px-4 py-2 bg-[rgb(241,237,237)]">
                  <div className="w-[272px] flex-shrink-0">
                    <span className="text-sm font-['Inter'] text-black font-medium">Material</span>
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-['Inter'] text-[rgb(98,86,86)]">{product.material}</span>
                  </div>
                </div>

                <div className="flex gap-2 px-4 py-2">
                  <div className="w-[272px] flex-shrink-0">
                    <span className="text-sm font-['Inter'] text-black font-medium">Luminosidade</span>
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-['Inter'] text-[rgb(98,86,86)]">{product.luminosidade}</span>
                  </div>
                </div>

                <div className="flex gap-2 px-4 py-2 bg-[rgb(241,237,237)]">
                  <div className="w-[272px] flex-shrink-0">
                    <span className="text-sm font-['Inter'] text-black font-medium">Largura Máxima</span>
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-['Inter'] text-[rgb(98,86,86)]">{product.larguraMaxCm}cm</span>
                  </div>
                </div>

                <div className="flex gap-2 px-4 py-2">
                  <div className="w-[272px] flex-shrink-0">
                    <span className="text-sm font-['Inter'] text-black font-medium">Altura Máxima</span>
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-['Inter'] text-[rgb(98,86,86)]">{product.alturaMaxCm}cm</span>
                  </div>
                </div>

                <div className="flex gap-2 px-4 py-2 bg-[rgb(241,237,237)]">
                  <div className="w-[272px] flex-shrink-0">
                    <span className="text-sm font-['Inter'] text-black font-medium">Área Mínima</span>
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-['Inter'] text-[rgb(98,86,86)]">{product.areaMinM2}m²</span>
                  </div>
                </div>

                <div className="flex gap-2 px-4 py-2">
                  <div className="w-[272px] flex-shrink-0">
                    <span className="text-sm font-['Inter'] text-black font-medium">Valor por m²</span>
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-['Inter'] text-[rgb(98,86,86)]">{formatPrice(product.valorM2)}</span>
                  </div>
                </div>

                <div className="flex gap-2 px-4 py-2 bg-[rgb(241,237,237)]">
                  <div className="w-[272px] flex-shrink-0">
                    <span className="text-sm font-['Inter'] text-black font-medium">Ambientes Recomendados</span>
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-['Inter'] text-[rgb(98,86,86)]">{product.ambientes.join(', ')}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer - Simplificado */}
      <footer className="bg-[rgb(108,25,29)] text-white mt-20">
        <div className="w-full max-w-[1224px] mx-auto px-6 py-8">
          <div className="text-center">
            <p className="text-sm text-[rgb(241,237,237)] font-['Inter']">
              © 2025 By Rosa Chic, All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
