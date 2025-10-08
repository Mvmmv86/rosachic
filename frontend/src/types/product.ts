export type Luminosidade = 'Translúcida' | 'Blackout'
export type Material = 'Tecido' | 'PVC' | 'Madeira' | 'Bambu'
export type Ambiente = 'Quarto' | 'Sala' | 'Escritório' | 'Cozinha' | 'Banheiro'

export interface Product {
  id: string
  codigo: string
  modelo: string
  luminosidade: Luminosidade
  material: Material
  valorM2: number
  larguraMaxCm: number
  alturaMaxCm: number
  restricoes: {
    areaMinM2: number
    ambiente: Ambiente[]
  }
  imagens: string[]
  descricao: string
  estoque: number
  ativo: boolean
  createdAt: string
  updatedAt: string
}

export interface ProductFilter {
  luminosidade?: Luminosidade[]
  material?: Material[]
  ambiente?: Ambiente
  precoMin?: number
  precoMax?: number
  search?: string
}

export interface ProductListResponse {
  products: Product[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// Tipos para opcionais de produtos
export interface ProductOptional {
  id: string
  name: string
  type: 'fixed' | 'per_meter' | 'per_m2'
  value: number
  quantity?: number
}

// Tipos para configuração de produto
export interface ProductConfig {
  opcionais: {
    bandao: {
      disponivel: boolean
      valorPorMetro: number
    }
    motor: {
      disponivel: boolean
      valorFixo: number
    }
  }
}

// Tipos para busca e ordenação
export interface ProductSearchParams {
  search?: string
  luminosidade?: Luminosidade[]
  material?: Material[]
  ambiente?: Ambiente
  precoMin?: number
  precoMax?: number
  sortBy?: 'nome' | 'preco' | 'data'
  sortOrder?: 'asc' | 'desc'
  page?: number
  pageSize?: number
}

// Tipos para favoritos
export interface Favorite {
  id: string
  userId: string
  productId: string
  createdAt: string
  product: Product
}

// Tipos para comparação de produtos
export interface ProductComparison {
  products: Product[]
  maxProducts: number
}