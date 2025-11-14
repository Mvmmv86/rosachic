import { api } from './api'

export interface ProductCharacteristic {
  id: string
  name: string
  value: string
  order: number
}

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
  isLancamento: boolean
  isMaisVendido: boolean
  imagens: string[]
  larguraMaxCm: number
  alturaMaxCm: number
  areaMinM2: number
  ambientes: string[]
  characteristics?: ProductCharacteristic[]
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
 * Nota: Não valida área mínima aqui - permitimos dimensões menores que 1,2m²,
 * mas o sistema cobrará sempre a área mínima de 1,2m² no cálculo.
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

  // Removida validação de área mínima - permitir dimensões menores
  // O cálculo sempre cobrará 1,2m² como mínimo

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
  // Se o filename já é uma URL completa (do Supabase), retornar direto
  if (filename.startsWith('http://') || filename.startsWith('https://')) {
    return filename
  }

  // Se for URL do Supabase Storage (após implementação)
  if (filename.includes('supabase.co/storage')) {
    return filename
  }

  // Fallback: tentar buscar do backend Railway
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ||
                 (typeof window !== 'undefined' && window.location.hostname.includes('railway.app')
                   ? 'https://rosachic-production.up.railway.app'
                   : 'http://localhost:3001')
  return `${apiUrl}/uploads/${filename}`
}

/**
 * Busca produtos marcados como lançamento
 */
export async function getLancamentos(): Promise<Product[]> {
  const { data } = await api.get<Product[]>('/products/lancamentos')
  return data
}

/**
 * Busca produtos marcados como mais vendidos
 */
export async function getMaisVendidos(): Promise<Product[]> {
  const { data } = await api.get<Product[]>('/products/mais-vendidos')
  return data
}
