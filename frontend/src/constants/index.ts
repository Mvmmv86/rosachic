// ============================================
// INFORMAÇÕES DA EMPRESA
// ============================================
export const COMPANY = {
  name: 'Rosa Chic Persianas',
  legalName: 'Rosa Chic Persianas e Decorações LTDA',
  cnpj: '00.000.000/0001-00',
  email: 'contato@rosachicpersianas.com.br',
  phone: '(11) 98765-4321',
  whatsapp: '11987654321',
  address: {
    street: 'Rua das Flores',
    number: '123',
    neighborhood: 'Jardim Primavera',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01234-567',
    country: 'Brasil'
  },
  businessHours: {
    weekdays: '09:00 - 18:00',
    saturday: '09:00 - 13:00',
    sunday: 'Fechado'
  },
  social: {
    facebook: 'https://facebook.com/rosachicpersianas',
    instagram: 'https://instagram.com/rosachicpersianas',
    youtube: 'https://youtube.com/@rosachicpersianas'
  }
} as const

// ============================================
// CONFIGURAÇÕES DE PREÇOS
// ============================================
export const PRICING = {
  // Taxa de instalação (percentual sobre o valor do produto)
  installationRate: 0.15, // 15%

  // Taxa de urgência (percentual sobre o valor total)
  urgencyRate: 0.25, // 25%

  // Desconto máximo permitido
  maxDiscountPercentage: 0.20, // 20%

  // Valor mínimo do pedido
  minimumOrderValue: 500.00,

  // Frete grátis acima de
  freeShippingThreshold: 3000.00,

  // Taxa de entrega padrão
  standardDeliveryFee: 150.00,

  // Prazo de validade do orçamento (dias)
  quoteValidityDays: 30,

  // Parcelamento
  installments: {
    maxInstallments: 12,
    minInstallmentValue: 100.00,
    interestFreeInstallments: 3
  }
} as const

// ============================================
// LIMITES DE PRODUTOS
// ============================================
export const PRODUCT_LIMITS = {
  blind: {
    minWidth: 300, // mm
    maxWidth: 3000, // mm
    minHeight: 300, // mm
    maxHeight: 3000, // mm
  },
  curtain: {
    minWidth: 500, // mm
    maxWidth: 5000, // mm
    minHeight: 500, // mm
    maxHeight: 3500, // mm
  },
  awning: {
    minWidth: 1000, // mm
    maxWidth: 6000, // mm
    minProjection: 1500, // mm
    maxProjection: 4000, // mm
  }
} as const

// ============================================
// PRAZOS
// ============================================
export const DEADLINES = {
  // Prazo de produção em dias úteis
  production: {
    standard: 15,
    express: 7,
    custom: 25
  },

  // Prazo de entrega em dias úteis após produção
  delivery: {
    capitalSP: 2,
    greaterSP: 3,
    interior: 5,
    otherStates: 10
  },

  // Prazo de instalação após entrega
  installation: {
    standard: 3,
    scheduled: 'A combinar'
  }
} as const

// ============================================
// MENSAGENS DE VALIDAÇÃO
// ============================================
export const VALIDATION_MESSAGES = {
  required: 'Este campo é obrigatório',
  email: 'Digite um e-mail válido',
  phone: 'Digite um telefone válido',
  cpf: 'Digite um CPF válido',
  cnpj: 'Digite um CNPJ válido',
  zipCode: 'Digite um CEP válido',
  minLength: (min: number) => `Mínimo de ${min} caracteres`,
  maxLength: (max: number) => `Máximo de ${max} caracteres`,
  minValue: (min: number) => `Valor mínimo: ${min}`,
  maxValue: (max: number) => `Valor máximo: ${max}`,
  passwordMatch: 'As senhas não coincidem',
  acceptTerms: 'Você deve aceitar os termos de uso'
} as const

// ============================================
// STATUS LABELS
// ============================================
export const STATUS_LABELS = {
  quote: {
    draft: 'Rascunho',
    pending: 'Pendente',
    sent: 'Enviado',
    approved: 'Aprovado',
    rejected: 'Rejeitado',
    expired: 'Expirado'
  },
  order: {
    pending: 'Pendente',
    confirmed: 'Confirmado',
    processing: 'Em processamento',
    production: 'Em produção',
    ready: 'Pronto',
    shipped: 'Enviado',
    delivered: 'Entregue',
    installed: 'Instalado',
    cancelled: 'Cancelado'
  },
  payment: {
    pending: 'Pendente',
    processing: 'Processando',
    approved: 'Aprovado',
    rejected: 'Rejeitado',
    cancelled: 'Cancelado',
    refunded: 'Reembolsado',
    partially_refunded: 'Parcialmente reembolsado'
  }
} as const

// ============================================
// ROTAS DA APLICAÇÃO
// ============================================
export const ROUTES = {
  home: '/',
  products: {
    blinds: '/persianas',
    curtains: '/cortinas',
    awnings: '/toldos'
  },
  company: {
    about: '/sobre',
    showroom: '/showroom',
    portfolio: '/portfolio',
    testimonials: '/depoimentos',
    blog: '/blog'
  },
  support: {
    howToBuy: '/como-comprar',
    measurement: '/medicao',
    installation: '/instalacao',
    warranty: '/garantia',
    faq: '/faq'
  },
  account: {
    login: '/login',
    register: '/cadastro',
    profile: '/minha-conta',
    orders: '/meus-pedidos',
    quotes: '/meus-orcamentos',
    addresses: '/meus-enderecos'
  },
  checkout: {
    cart: '/carrinho',
    quote: '/orcamento',
    payment: '/pagamento',
    confirmation: '/confirmacao'
  },
  legal: {
    privacy: '/privacidade',
    terms: '/termos',
    cookies: '/cookies'
  },
  contact: '/contato'
} as const

// ============================================
// CORES DO TEMA
// ============================================
export const THEME_COLORS = {
  primary: '#1A1A1A', // brand-dark
  secondary: '#F5F5F0', // brand-beige
  accent: '#D4A574', // brand-gold
  background: '#FFFEFE', // brand-cream
  text: '#1A1A1A',
  error: '#DC2626',
  success: '#16A34A',
  warning: '#F59E0B',
  info: '#3B82F6'
} as const

// ============================================
// METADADOS SEO
// ============================================
export const SEO_DEFAULTS = {
  title: 'Rosa Chic Persianas - Elegância e Sofisticação para seus Ambientes',
  titleTemplate: '%s | Rosa Chic Persianas',
  description: 'Persianas, cortinas e toldos de alta qualidade com design exclusivo. Transforme seus ambientes com elegância e sofisticação.',
  keywords: 'persianas, cortinas, toldos, decoração, persiana horizontal, persiana vertical, persiana rolô, cortina blackout, toldo retrátil, são paulo',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    site_name: 'Rosa Chic Persianas',
    image: '/images/og-image.jpg',
    imageWidth: 1200,
    imageHeight: 630
  },
  twitter: {
    cardType: 'summary_large_image',
    handle: '@rosachicpersianas'
  }
} as const

// ============================================
// CONFIGURAÇÕES DE UPLOAD
// ============================================
export const UPLOAD_CONFIG = {
  maxFileSize: 5 * 1024 * 1024, // 5MB
  acceptedImageFormats: ['.jpg', '.jpeg', '.png', '.webp'],
  acceptedDocumentFormats: ['.pdf', '.doc', '.docx'],
  maxPhotosPerEnvironment: 5,
  imageQuality: 0.8
} as const