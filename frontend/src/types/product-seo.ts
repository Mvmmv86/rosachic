// SEO e Meta tags
export interface ProductSEO {
  metaTitle?: string
  metaDescription?: string
  metaKeywords?: string[]
  slug: string
  canonicalUrl?: string
  ogImage?: string
  ogTitle?: string
  ogDescription?: string
  structuredData?: Record<string, any>
}

// Mídia e galeria
export interface ProductMedia {
  id: string
  productId: string
  type: 'imagem' | 'video' | '360' | 'pdf'
  url: string
  thumbnail?: string
  title: string
  alt: string
  description?: string
  category: 'principal' | 'galeria' | 'ambiente' | 'detalhe' | 'textura' | 'manual'
  displayOrder: number
  size?: number // em bytes
  dimensions?: {
    width: number
    height: number
  }
  mimeType: string
  isActive: boolean
}

// Avaliações e reviews
export interface ProductReview {
  id: string
  productId: string
  userId: string
  userName: string
  rating: 1 | 2 | 3 | 4 | 5
  title?: string
  comment: string
  pros?: string[]
  cons?: string[]
  verified: boolean // Compra verificada
  helpful: number // Votos úteis
  notHelpful: number
  images?: string[]
  createdAt: Date
  response?: {
    message: string
    respondedBy: string
    respondedAt: Date
  }
}

// FAQ do produto
export interface ProductFAQ {
  id: string
  productId: string
  question: string
  answer: string
  displayOrder: number
  helpful: number
  notHelpful: number
  createdAt: Date
  answeredBy?: string
}

// Estatísticas de reviews
export interface ReviewStatistics {
  productId: string
  averageRating: number
  totalReviews: number
  verifiedReviews: number
  distribution: {
    5: number
    4: number
    3: number
    2: number
    1: number
  }
  commonPros: string[]
  commonCons: string[]
}

// Upload de mídia
export interface MediaUpload {
  file: File
  type: ProductMedia['type']
  category: ProductMedia['category']
  title?: string
  alt?: string
  description?: string
}

// Galeria completa
export interface ProductGallery {
  productId: string
  mainImage: ProductMedia
  thumbnails: ProductMedia[]
  ambientImages: ProductMedia[]
  detailImages: ProductMedia[]
  textureImages: ProductMedia[]
  videos?: ProductMedia[]
  view360?: ProductMedia[]
  manuals?: ProductMedia[]
}

// Tags para busca
export interface ProductTag {
  id: string
  productId: string
  tag: string
  category: 'style' | 'feature' | 'material' | 'color' | 'room'
  weight: number // Relevância 0-1
}

// Rich snippets para Google
export interface ProductRichSnippet {
  '@context': 'https://schema.org/'
  '@type': 'Product'
  name: string
  image: string[]
  description: string
  sku: string
  mpn?: string // Manufacturer Part Number
  brand: {
    '@type': 'Brand'
    name: string
  }
  review?: {
    '@type': 'Review'
    reviewRating: {
      '@type': 'Rating'
      ratingValue: string
      bestRating: string
    }
    author: {
      '@type': 'Person'
      name: string
    }
  }
  aggregateRating?: {
    '@type': 'AggregateRating'
    ratingValue: string
    reviewCount: string
  }
  offers: {
    '@type': 'Offer'
    url: string
    priceCurrency: 'BRL'
    price: string
    priceValidUntil?: string
    itemCondition: 'https://schema.org/NewCondition'
    availability: 'https://schema.org/InStock' | 'https://schema.org/OutOfStock' | 'https://schema.org/PreOrder'
    seller: {
      '@type': 'Organization'
      name: string
    }
  }
}

// Meta dados para social sharing
export interface SocialMeta {
  // Open Graph (Facebook)
  ogType: 'product'
  ogTitle: string
  ogDescription: string
  ogImage: string
  ogImageWidth?: number
  ogImageHeight?: number
  ogUrl: string
  ogSiteName: string
  ogLocale: string

  // Twitter Card
  twitterCard: 'summary' | 'summary_large_image' | 'product'
  twitterSite?: string
  twitterCreator?: string
  twitterTitle: string
  twitterDescription: string
  twitterImage: string
  twitterImageAlt?: string

  // Pinterest
  pinterestDescription?: string
  pinterestMedia?: string
}