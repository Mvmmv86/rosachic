// Enums para categorias e tipos de produtos
export enum ProductCategory {
  BLIND = 'blind',
  CURTAIN = 'curtain',
  AWNING = 'awning'
}

export enum BlindType {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
  ROLL = 'roll',
  ROMAN = 'roman',
  PLEATED = 'pleated',
  CELLULAR = 'cellular'
}

export enum CurtainType {
  SHEER = 'sheer',
  BLACKOUT = 'blackout',
  DOUBLE = 'double',
  WAVE = 'wave',
  PANEL = 'panel'
}

export enum AwningType {
  RETRACTABLE = 'retractable',
  FIXED = 'fixed',
  VERTICAL = 'vertical',
  PERGOLA = 'pergola'
}

export enum MaterialType {
  ALUMINUM = 'aluminum',
  WOOD = 'wood',
  PVC = 'pvc',
  FABRIC = 'fabric',
  POLYESTER = 'polyester',
  BAMBOO = 'bamboo'
}

export enum ControlType {
  MANUAL = 'manual',
  MOTORIZED = 'motorized',
  SMART = 'smart'
}

// Interface base para todos os produtos
export interface BaseProduct {
  id: string
  name: string
  description: string
  category: ProductCategory
  images: string[]
  featured: boolean
  active: boolean
  createdAt: Date
  updatedAt: Date
}

// Interface para dimensões
export interface Dimensions {
  width: number // em mm
  height: number // em mm
  depth?: number // em mm (para alguns produtos)
}

// Interface para opções de customização
export interface CustomizationOptions {
  colors: Color[]
  materials: Material[]
  controls: ControlType[]
  maxWidth: number // em mm
  maxHeight: number // em mm
  minWidth: number // em mm
  minHeight: number // em mm
}

// Interface para cor
export interface Color {
  id: string
  name: string
  hex: string
  image?: string
  surcharge?: number // sobretaxa em percentual
}

// Interface para material
export interface Material {
  id: string
  name: string
  type: MaterialType
  description: string
  image?: string
  surcharge?: number // sobretaxa em percentual
  properties?: {
    lightFiltering?: number // 0-100%
    thermalInsulation?: boolean
    waterResistant?: boolean
    fireRetardant?: boolean
    uvProtection?: boolean
    washable?: boolean
  }
}

// Interface específica para Persianas
export interface Blind extends BaseProduct {
  category: ProductCategory.BLIND
  type: BlindType
  slat?: {
    width: 16 | 25 | 50 // largura da lâmina em mm
    material: MaterialType
  }
  customization: CustomizationOptions
  basePrice: number // preço por m²
}

// Interface específica para Cortinas
export interface Curtain extends BaseProduct {
  category: ProductCategory.CURTAIN
  type: CurtainType
  fabric: {
    composition: string
    weight: number // g/m²
    transparency: 'sheer' | 'light-filtering' | 'room-darkening' | 'blackout'
  }
  customization: CustomizationOptions
  basePrice: number // preço por m²
  includesRail: boolean
  includesInstallation: boolean
}

// Interface específica para Toldos
export interface Awning extends BaseProduct {
  category: ProductCategory.AWNING
  type: AwningType
  structure: {
    material: MaterialType
    color: string
    windResistance: number // classe de resistência ao vento
  }
  fabric: {
    material: string
    weight: number // g/m²
    waterproof: boolean
    uvProtection: number // fator de proteção UV
  }
  customization: CustomizationOptions
  basePrice: number // preço por m²
  projection?: number // projeção em mm (para retráteis)
}

// Union type para qualquer produto
export type Product = Blind | Curtain | Awning

// Interface para item de produto no carrinho/orçamento
export interface ProductItem {
  product: Product
  dimensions: Dimensions
  color: Color
  material: Material
  control: ControlType
  quantity: number
  customNotes?: string
  price: number // preço calculado
  installationIncluded: boolean
}