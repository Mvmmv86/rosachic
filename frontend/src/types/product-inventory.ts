// Gestão de estoque
export interface ProductInventory {
  productId: string
  variantId?: string
  currentStock: number
  reservedStock: number // Reservado em carrinho/pedidos
  availableStock: number // currentStock - reservedStock
  incomingStock: number // Em produção/chegando
  incomingDate?: Date
  lowStockThreshold: number
  outOfStockThreshold: number
  restockAlert: boolean
  lastRestockDate?: Date
  averageDailySales?: number
  daysUntilOutOfStock?: number
}

// Movimentações de estoque
export interface StockMovement {
  id: string
  productId: string
  variantId?: string
  type: 'entrada' | 'saida' | 'ajuste' | 'reserva' | 'cancelamento'
  quantity: number
  reason: string
  reference?: string // Número do pedido, NF, etc
  previousStock: number
  newStock: number
  createdBy: string
  createdAt: Date
  notes?: string
}

// Fornecedores
export interface ProductSupplier {
  id: string
  productId: string
  supplierId: string
  supplierName: string
  supplierCode: string // Código no fornecedor
  cost: number
  leadTime: number // Dias para entrega
  minOrderQuantity: number
  isDefault: boolean
  lastPurchaseDate?: Date
  lastPurchasePrice?: number
}

// Tabela de preços por quantidade/região
export interface PriceTable {
  id: string
  productId: string
  name: string
  type: 'quantidade' | 'regiao' | 'cliente_tipo'
  rules: PriceRule[]
  validFrom: Date
  validUntil?: Date
  isActive: boolean
}

export interface PriceRule {
  id: string
  condition: {
    minQuantity?: number
    maxQuantity?: number
    region?: string[]
    customerType?: string[]
  }
  adjustment: {
    type: 'percentual' | 'fixo'
    value: number
  }
  priority: number
}

// Disponibilidade regional
export interface RegionalAvailability {
  productId: string
  regions: {
    id: string
    name: string
    available: boolean
    deliveryTime: number // dias
    shippingCost?: number
    restrictions?: string[]
  }[]
}

// Kits e combos
export interface ProductKit {
  id: string
  name: string
  description: string
  items: {
    productId: string
    quantity: number
    isOptional: boolean
    discount?: number // Desconto no item do kit
  }[]
  kitPrice: number
  savingAmount: number // Economia total
  savingPercentage: number
  isActive: boolean
}

// Localizações de estoque
export interface StockLocation {
  id: string
  name: string // Ex: "Depósito Principal", "Loja Centro"
  type: 'deposito' | 'loja' | 'centro_distribuicao'
  address: {
    street: string
    number: string
    complement?: string
    neighborhood: string
    city: string
    state: string
    zipCode: string
  }
  isActive: boolean
  isDefault: boolean
}

// Estoque por localização
export interface StockByLocation {
  productId: string
  variantId?: string
  locationId: string
  locationName: string
  quantity: number
  reserved: number
  available: number
  lastUpdate: Date
}

// Ordem de compra
export interface PurchaseOrder {
  id: string
  orderNumber: string
  supplierId: string
  supplierName: string
  status: 'rascunho' | 'enviado' | 'confirmado' | 'em_transito' | 'recebido' | 'cancelado'
  items: {
    productId: string
    variantId?: string
    quantity: number
    unitCost: number
    totalCost: number
  }[]
  subtotal: number
  shipping: number
  taxes: number
  total: number
  expectedDate: Date
  receivedDate?: Date
  notes?: string
  createdAt: Date
  createdBy: string
}

// Alertas de estoque
export interface StockAlert {
  id: string
  type: 'low_stock' | 'out_of_stock' | 'overstock' | 'expiring'
  productId: string
  variantId?: string
  productName: string
  currentStock: number
  threshold: number
  message: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  createdAt: Date
  acknowledged: boolean
  acknowledgedBy?: string
  acknowledgedAt?: Date
}

// Previsão de demanda
export interface DemandForecast {
  productId: string
  variantId?: string
  period: 'daily' | 'weekly' | 'monthly'
  date: Date
  predictedDemand: number
  confidence: number // 0-1
  factors: {
    seasonality?: number
    trend?: number
    events?: string[]
  }
  recommendedStock: number
}

// Relatório de inventário
export interface InventoryReport {
  generatedAt: Date
  period: {
    start: Date
    end: Date
  }
  summary: {
    totalProducts: number
    totalValue: number
    lowStockItems: number
    outOfStockItems: number
    overstockItems: number
  }
  topMovers: {
    productId: string
    productName: string
    quantity: number
    revenue: number
  }[]
  slowMovers: {
    productId: string
    productName: string
    quantity: number
    daysSinceLastSale: number
  }[]
  stockAlerts: StockAlert[]
}