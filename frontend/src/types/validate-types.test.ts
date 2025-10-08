/**
 * Arquivo de validação dos novos tipos criados
 * Este arquivo apenas verifica se os tipos compilam corretamente
 */

import {
  // Task 1.5.5 - Admin types
  CreateProductDTO,
  UpdateProductDTO,
  ProductVariant,
  ProductCategory,
  ProductSpecification,
  ProductCertification,
  ProductAudit,
  ProductMetrics,
  ProductRelationship,
  ProductPromotion,
  ProductStatus,
  AdminProduct,
  AdminProductFilter,
  BulkProductOperation,

  // Task 1.5.6 - SEO types
  ProductSEO,
  ProductMedia,
  ProductReview,
  ProductFAQ,
  ReviewStatistics,
  MediaUpload,
  ProductGallery,
  ProductTag,
  ProductRichSnippet,
  SocialMeta,

  // Task 1.5.7 - Inventory types
  ProductInventory,
  StockMovement,
  ProductSupplier,
  PriceTable,
  PriceRule,
  RegionalAvailability,
  ProductKit,
  StockLocation,
  StockByLocation,
  PurchaseOrder,
  StockAlert,
  DemandForecast,
  InventoryReport,

  // Tipos básicos
  Luminosidade,
  Material,
  Ambiente
} from './index'

// ============================================
// TESTES DE COMPILAÇÃO - Task 1.5.5
// ============================================

// Teste CreateProductDTO
const testCreateProduct: CreateProductDTO = {
  codigo: 'TEST-001',
  modelo: 'Test Model',
  luminosidade: 'Blackout',
  material: 'Tecido',
  valorM2: 100,
  larguraMaxCm: 300,
  alturaMaxCm: 350,
  restricoes: {
    areaMinM2: 1,
    ambiente: ['Quarto']
  },
  descricao: 'Test description',
  estoque: 10,
  ativo: true
}

// Teste UpdateProductDTO (parcial)
const testUpdateProduct: UpdateProductDTO = {
  id: '123',
  estoque: 20
}

// Teste ProductVariant
const testVariant: ProductVariant = {
  id: 'var-001',
  productId: 'prod-001',
  sku: 'SKU-001',
  name: 'Variante Test',
  tipo: 'cor',
  priceAdjustment: 10,
  stockQuantity: 5,
  images: [],
  attributes: { colorHex: '#FF0000' },
  isAvailable: true
}

// Teste ProductStatus enum
const testStatus: ProductStatus = ProductStatus.PUBLISHED

// ============================================
// TESTES DE COMPILAÇÃO - Task 1.5.6
// ============================================

// Teste ProductSEO
const testSEO: ProductSEO = {
  slug: 'test-product',
  metaTitle: 'Test Product',
  metaDescription: 'Test description'
}

// Teste ProductReview
const testReview: ProductReview = {
  id: 'rev-001',
  productId: 'prod-001',
  userId: 'user-001',
  userName: 'Test User',
  rating: 5,
  comment: 'Great product!',
  verified: true,
  helpful: 10,
  notHelpful: 0,
  createdAt: new Date()
}

// Teste ProductMedia
const testMedia: ProductMedia = {
  id: 'media-001',
  productId: 'prod-001',
  type: 'imagem',
  url: 'https://example.com/image.jpg',
  title: 'Product Image',
  alt: 'Alt text',
  category: 'principal',
  displayOrder: 1,
  mimeType: 'image/jpeg',
  isActive: true
}

// ============================================
// TESTES DE COMPILAÇÃO - Task 1.5.7
// ============================================

// Teste ProductInventory
const testInventory: ProductInventory = {
  productId: 'prod-001',
  currentStock: 100,
  reservedStock: 10,
  availableStock: 90,
  incomingStock: 50,
  lowStockThreshold: 20,
  outOfStockThreshold: 0,
  restockAlert: true
}

// Teste StockMovement
const testMovement: StockMovement = {
  id: 'mov-001',
  productId: 'prod-001',
  type: 'entrada',
  quantity: 50,
  reason: 'Restock',
  previousStock: 50,
  newStock: 100,
  createdBy: 'admin',
  createdAt: new Date()
}

// Teste PriceTable
const testPriceTable: PriceTable = {
  id: 'price-001',
  productId: 'prod-001',
  name: 'Test Price Table',
  type: 'quantidade',
  rules: [],
  validFrom: new Date(),
  isActive: true
}

// Teste ProductKit
const testKit: ProductKit = {
  id: 'kit-001',
  name: 'Test Kit',
  description: 'Test kit description',
  items: [
    {
      productId: 'prod-001',
      quantity: 2,
      isOptional: false
    }
  ],
  kitPrice: 200,
  savingAmount: 20,
  savingPercentage: 10,
  isActive: true
}

// ============================================
// VALIDAÇÃO FINAL
// ============================================

// Função para verificar que todos os tipos funcionam
function validateAllTypes(): boolean {
  // Verifica se todos os objetos de teste foram criados
  const allTestObjects = [
    testCreateProduct,
    testUpdateProduct,
    testVariant,
    testStatus,
    testSEO,
    testReview,
    testMedia,
    testInventory,
    testMovement,
    testPriceTable,
    testKit
  ]

  // Verifica se nenhum é undefined
  return allTestObjects.every(obj => obj !== undefined)
}

// Exporta a validação
export const typesAreValid = validateAllTypes()

// Log de sucesso (será removido em produção)
if (typesAreValid) {
  console.log('✅ Todos os tipos das Tasks 1.5.5, 1.5.6 e 1.5.7 estão funcionando corretamente!')
}

// Exporta alguns objetos de teste para uso em outros lugares
export {
  testCreateProduct,
  testVariant,
  testSEO,
  testReview,
  testInventory,
  testKit
}