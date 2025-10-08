import { Luminosidade, Material, Ambiente } from './product'
import { ProductSEO } from './product-seo'

// DTOs para criação e edição
export interface CreateProductDTO {
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
  descricao: string
  estoque: number
  ativo?: boolean
  imagens?: string[]
  seo?: ProductSEO
}

export interface UpdateProductDTO extends Partial<CreateProductDTO> {
  id: string
}

// Variações de produtos
export interface ProductVariant {
  id: string
  productId: string
  sku: string
  name: string // Ex: "Rosa Claro", "Textura Lisa"
  tipo: 'cor' | 'textura' | 'acabamento'
  priceAdjustment: number // Ajuste de preço em %
  stockQuantity: number
  images: string[]
  attributes: {
    colorHex?: string
    texture?: string
    finish?: string
  }
  isAvailable: boolean
}

// Categorias detalhadas
export interface ProductCategory {
  id: string
  name: string
  slug: string
  parentId?: string // Para subcategorias
  description: string
  image?: string
  displayOrder: number
  isActive: boolean
  children?: ProductCategory[]
}

// Especificações técnicas
export interface ProductSpecification {
  id: string
  productId: string
  grupo: 'tecnico' | 'material' | 'dimensional' | 'manutencao'
  especificacoes: {
    nome: string
    valor: string | number
    unidade?: string
  }[]
}

// Certificações
export interface ProductCertification {
  id: string
  nome: string // Ex: "Anti-chamas", "Anti-fungo"
  descricao: string
  orgaoEmissor: string
  validade?: Date
  certificado?: string // URL do PDF
}

// Auditoria e histórico
export interface ProductAudit {
  id: string
  productId: string
  userId: string
  userName: string
  action: 'create' | 'update' | 'delete' | 'archive'
  changes: {
    field: string
    oldValue: any
    newValue: any
  }[]
  timestamp: Date
  ip?: string
}

// Métricas de produto
export interface ProductMetrics {
  productId: string
  views: number
  uniqueViews: number
  addedToCart: number
  purchased: number
  conversionRate: number
  averageRating: number
  totalReviews: number
  lastViewDate?: Date
  lastPurchaseDate?: Date
}

// Relacionamentos
export interface ProductRelationship {
  id: string
  productId: string
  relatedProductId: string
  type: 'complementar' | 'similar' | 'upgrade' | 'kit'
  displayOrder: number
}

// Promoções
export interface ProductPromotion {
  id: string
  productId: string
  name: string
  type: 'desconto_percentual' | 'desconto_fixo' | 'leve_x_pague_y'
  value: number
  startDate: Date
  endDate: Date
  conditions?: {
    minQuantity?: number
    maxQuantity?: number
    customerGroups?: string[]
  }
  isActive: boolean
}

// Status de produto para workflow
export enum ProductStatus {
  DRAFT = 'draft',
  PENDING_REVIEW = 'pending_review',
  APPROVED = 'approved',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
  OUT_OF_STOCK = 'out_of_stock'
}

// Produto completo para admin
export interface AdminProduct {
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
  status: ProductStatus
  createdAt: Date
  updatedAt: Date
  createdBy?: string
  updatedBy?: string

  // Relacionamentos
  category?: ProductCategory
  variants?: ProductVariant[]
  specifications?: ProductSpecification[]
  certifications?: ProductCertification[]
  relatedProducts?: ProductRelationship[]
  promotions?: ProductPromotion[]
  metrics?: ProductMetrics
  seo?: ProductSEO
}

// Filtros avançados para admin
export interface AdminProductFilter {
  status?: ProductStatus[]
  categories?: string[]
  hasVariants?: boolean
  hasPromotion?: boolean
  stockStatus?: 'in_stock' | 'low_stock' | 'out_of_stock'
  priceRange?: {
    min: number
    max: number
  }
  createdDateRange?: {
    start: Date
    end: Date
  }
  updatedDateRange?: {
    start: Date
    end: Date
  }
}

// Bulk operations
export interface BulkProductOperation {
  productIds: string[]
  operation: 'activate' | 'deactivate' | 'archive' | 'delete' | 'update_price' | 'update_stock'
  data?: any
}