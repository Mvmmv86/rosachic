import { api } from './api'

export interface Product {
  id: string
  codigo: string
  modelo: string
  descricao: string
  material: string
  luminosidade: string
  valorM2: number
  estoque: number
  ativo: boolean
  imagens: string[]
  larguraMaxCm: number
  alturaMaxCm: number
  areaMinM2: number
  ambientes: string[]
  createdAt: string
  updatedAt: string
}

export interface ProductsResponse {
  data: Product[]
  total: number
  skip: number
  take: number
}

export interface ProductFilters {
  skip?: number
  take?: number
  material?: string
  luminosidade?: string
  search?: string
}

/**
 * Busca todos os produtos com filtros opcionais
 */
export async function getProducts(filters?: ProductFilters): Promise<ProductsResponse> {
  const params = new URLSearchParams()

  if (filters?.skip) params.append('skip', filters.skip.toString())
  if (filters?.take) params.append('take', filters.take.toString())
  if (filters?.material) params.append('material', filters.material)
  if (filters?.luminosidade) params.append('luminosidade', filters.luminosidade)
  if (filters?.search) params.append('search', filters.search)

  const { data } = await api.get<ProductsResponse>(`/products?${params.toString()}`)
  return data
}

/**
 * Busca um produto específico por ID
 */
export async function getProductById(id: string): Promise<Product> {
  const { data } = await api.get<Product>(`/products/${id}`)
  return data
}

/**
 * Busca apenas produtos ativos (para o site cliente)
 */
export async function getActiveProducts(filters?: Omit<ProductFilters, 'ativo'>): Promise<ProductsResponse> {
  const params = new URLSearchParams()

  if (filters?.skip) params.append('skip', filters.skip.toString())
  if (filters?.take) params.append('take', filters.take.toString())
  if (filters?.material) params.append('material', filters.material)
  if (filters?.luminosidade) params.append('luminosidade', filters.luminosidade)
  if (filters?.search) params.append('search', filters.search)

  const { data } = await api.get<ProductsResponse>(`/products?${params.toString()}`)

  // Filtrar apenas produtos ativos no cliente
  return {
    ...data,
    data: data.data.filter(p => p.ativo),
    total: data.data.filter(p => p.ativo).length
  }
}

/**
 * Calcula o preço de uma persiana com base em largura e altura
 */
export function calculatePrice(product: Product, larguraCm: number, alturaCm: number): number {
  const areaM2 = (larguraCm * alturaCm) / 10000 // converter cm² para m²
  const areaFinal = Math.max(areaM2, product.areaMinM2) // usar área mínima se necessário
  return areaFinal * product.valorM2
}

/**
 * Valida se as dimensões estão dentro dos limites do produto
 */
export function validateDimensions(product: Product, larguraCm: number, alturaCm: number): {
  valid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (larguraCm > product.larguraMaxCm) {
    errors.push(`Largura máxima permitida: ${product.larguraMaxCm}cm`)
  }

  if (alturaCm > product.alturaMaxCm) {
    errors.push(`Altura máxima permitida: ${product.alturaMaxCm}cm`)
  }

  const areaM2 = (larguraCm * alturaCm) / 10000

  if (areaM2 < product.areaMinM2) {
    errors.push(`Área mínima: ${product.areaMinM2}m²`)
  }

  return {
    valid: errors.length === 0,
    errors
  }
}

/**
 * Formata o preço em Real brasileiro
 */
export function formatPrice(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

/**
 * Retorna a URL completa da imagem
 */
export function getImageUrl(filename: string): string {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
  return `${apiUrl}/uploads/${filename}`
}
