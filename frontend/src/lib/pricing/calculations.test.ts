import { describe, it, expect } from 'vitest'
import { calculatePrice, calculateMultiple, validateDimensions, getMaterialFactor } from './calculations'

describe('calculatePrice', () => {
  it('deve calcular preço corretamente conforme exemplo do documento (180x160cm)', () => {
    const result = calculatePrice({
      widthCm: 180,
      heightCm: 160,
      productId: 'test-001',
      pricePerM2: 220,
      kMaterial: 1.0, // Tela solar
      lossFactor: 1.1,
      bando: {
        enabled: true,
        pricePerMeter: 120,
      },
      motor: {
        enabled: false,
        fixedPrice: 0,
      },
      installationPercentage: 8,
      shippingCost: 80,
      discountPercentage: 5,
    })

    // Validações conforme exemplo do documento
    expect(result.areaBruta).toBeCloseTo(2.88, 2)
    expect(result.areaAjustada).toBeCloseTo(3.168, 3)
    expect(result.areaArredondada).toBe(3.2)
    expect(result.areaCobravel).toBe(3.2)

    // Preço base: 3.2 × 220 × 1.0 = 704
    expect(result.precoBase).toBe(704)

    // Bandô: 1.8 × 120 = 216
    expect(result.opcionais.bando).toBe(216)
    expect(result.opcionais.motor).toBe(0)
    expect(result.opcionais.total).toBe(216)

    // Subtotal: 704 + 216 = 920
    expect(result.subtotal).toBe(920)

    // Instalação 8%: 920 × 0.08 = 73.6
    expect(result.instalacao).toBeCloseTo(73.6, 1)

    // Total bruto: 920 + 73.6 + 80 = 1073.6
    expect(result.totalBruto).toBeCloseTo(1073.6, 1)

    // Desconto 5%: 1073.6 × 0.05 = 53.68
    expect(result.desconto).toBeCloseTo(53.68, 2)

    // Total final: 1073.6 - 53.68 = 1019.92
    expect(result.totalFinal).toBeCloseTo(1019.92, 2)
  })

  it('deve aplicar área mínima de 1m² para áreas pequenas', () => {
    const result = calculatePrice({
      widthCm: 50,
      heightCm: 50,
      productId: 'test-002',
      pricePerM2: 220,
      kMaterial: 1.0,
    })

    // Área bruta: 0.5 × 0.5 = 0.25m²
    expect(result.areaBruta).toBe(0.25)

    // Após fator de perda padrão (1.1): 0.275m²
    expect(result.areaAjustada).toBeCloseTo(0.275, 3)

    // Arredondado: 0.3m²
    expect(result.areaArredondada).toBe(0.3)

    // Área mínima aplicada: 1.0m²
    expect(result.areaCobravel).toBe(1.0)

    // Preço base: 1.0 × 220 × 1.0 = 220
    expect(result.precoBase).toBe(220)
  })

  it('deve aplicar k_material corretamente para diferentes materiais', () => {
    const resultBlackout = calculatePrice({
      widthCm: 100,
      heightCm: 100,
      productId: 'test-003',
      pricePerM2: 100,
      kMaterial: 1.225, // Blackout
      lossFactor: 1.0, // Sem fator de perda para simplificar
    })

    // Área: 1m² × 1.0 = 1m²
    expect(resultBlackout.areaCobravel).toBe(1.0)

    // Preço: 1.0 × 100 × 1.225 = 122.5
    expect(resultBlackout.precoBase).toBeCloseTo(122.5, 2)
  })

  it('deve adicionar motor quando habilitado', () => {
    const result = calculatePrice({
      widthCm: 150,
      heightCm: 150,
      productId: 'test-004',
      pricePerM2: 200,
      kMaterial: 1.0,
      motor: {
        enabled: true,
        fixedPrice: 450,
      },
    })

    expect(result.opcionais.motor).toBe(450)
    expect(result.opcionais.total).toBe(450)
  })

  it('deve gerar avisos para áreas grandes', () => {
    const result = calculatePrice({
      widthCm: 300,
      heightCm: 250,
      productId: 'test-005',
      pricePerM2: 200,
      kMaterial: 1.0,
    })

    // Área: 3.0 × 2.5 = 7.5m²
    expect(result.areaBruta).toBe(7.5)

    // Com fator de perda 1.1: 8.25m²
    expect(result.areaAjustada).toBeCloseTo(8.25, 2)

    // Deve ter avisos
    expect(result.avisos.length).toBeGreaterThan(0)
    expect(result.avisos[0]).toContain('Área muito grande')
  })

  it('deve lançar erro para dimensões inválidas', () => {
    // Largura muito grande
    expect(() => {
      calculatePrice({
        widthCm: 400, // Máximo é 300
        heightCm: 160,
        productId: 'test-006',
        pricePerM2: 220,
        kMaterial: 1.0,
      })
    }).toThrow('Largura máxima: 300cm')

    // Altura muito grande
    expect(() => {
      calculatePrice({
        widthCm: 160,
        heightCm: 400, // Máximo é 350
        productId: 'test-007',
        pricePerM2: 220,
        kMaterial: 1.0,
      })
    }).toThrow('Altura máxima: 350cm')

    // Largura muito pequena
    expect(() => {
      calculatePrice({
        widthCm: 20, // Mínimo é 30
        heightCm: 160,
        productId: 'test-008',
        pricePerM2: 220,
        kMaterial: 1.0,
      })
    }).toThrow('Largura mínima: 30cm')
  })

  it('deve respeitar dimensões máximas específicas do produto', () => {
    expect(() => {
      calculatePrice({
        widthCm: 250,
        heightCm: 200,
        productId: 'test-009',
        pricePerM2: 220,
        kMaterial: 1.0,
        maxWidthCm: 200, // Produto tem limite menor
        maxHeightCm: 300,
      })
    }).toThrow('Largura 250cm excede o máximo permitido de 200cm')
  })

  it('deve calcular instalação como percentual corretamente', () => {
    const result10 = calculatePrice({
      widthCm: 100,
      heightCm: 100,
      productId: 'test-010',
      pricePerM2: 100,
      kMaterial: 1.0,
      installationPercentage: 10, // 10%
      lossFactor: 1.0,
    })

    // Subtotal: 100
    expect(result10.subtotal).toBe(100)

    // Instalação 10%: 100 × 0.10 = 10
    expect(result10.instalacao).toBe(10)

    const result12 = calculatePrice({
      widthCm: 100,
      heightCm: 100,
      productId: 'test-011',
      pricePerM2: 100,
      kMaterial: 1.0,
      installationPercentage: 12, // 12%
      lossFactor: 1.0,
    })

    // Instalação 12%: 100 × 0.12 = 12
    expect(result12.instalacao).toBe(12)
  })

  it('deve calcular sem desconto quando não especificado', () => {
    const result = calculatePrice({
      widthCm: 100,
      heightCm: 100,
      productId: 'test-012',
      pricePerM2: 100,
      kMaterial: 1.0,
      lossFactor: 1.0,
      discountPercentage: 0,
    })

    expect(result.desconto).toBe(0)
    expect(result.totalFinal).toBe(result.totalBruto)
  })
})

describe('calculateMultiple', () => {
  it('deve calcular múltiplas persianas corretamente', () => {
    const items = [
      {
        widthCm: 100,
        heightCm: 100,
        productId: 'test-013',
        pricePerM2: 100,
        kMaterial: 1.0,
        lossFactor: 1.0,
        discountPercentage: 10,
      },
      {
        widthCm: 150,
        heightCm: 150,
        productId: 'test-014',
        pricePerM2: 150,
        kMaterial: 1.0,
        lossFactor: 1.0,
        discountPercentage: 10,
      },
    ]

    const result = calculateMultiple(items)

    expect(result.items).toHaveLength(2)

    // Primeiro item: 1m² × 100 = 100
    expect(result.items[0].precoBase).toBe(100)

    // Segundo item: 2.25m² arredondado para 2.3m² × 150 = 345
    expect(result.items[1].areaCobravel).toBe(2.3)
    expect(result.items[1].precoBase).toBe(345)

    // Totais
    expect(result.totalGeral).toBeGreaterThan(0)
    expect(result.totalComDesconto).toBeLessThan(result.totalGeral)
    expect(result.economiaTotal).toBeGreaterThan(0)
  })
})

describe('validateDimensions', () => {
  it('deve validar dimensões válidas', () => {
    const result = validateDimensions(150, 200)
    expect(result.valid).toBe(true)
    expect(result.errors).toHaveLength(0)
  })

  it('deve detectar largura muito pequena', () => {
    const result = validateDimensions(20, 200)
    expect(result.valid).toBe(false)
    expect(result.errors).toContain('Largura mínima: 30cm')
  })

  it('deve detectar altura muito grande', () => {
    const result = validateDimensions(150, 400)
    expect(result.valid).toBe(false)
    expect(result.errors).toContain('Altura máxima: 350cm')
  })

  it('deve detectar área muito grande', () => {
    const result = validateDimensions(300, 360) // 10.8m² > 10.5m²
    expect(result.valid).toBe(false)
    expect(result.errors).toContain('Área máxima: 10.5m²')
  })

  it('deve respeitar limites customizados', () => {
    const result = validateDimensions(250, 200, 200, 300)
    expect(result.valid).toBe(false)
    expect(result.errors).toContain('Largura máxima: 200cm')
  })
})

describe('getMaterialFactor', () => {
  it('deve retornar fatores corretos para cada material', () => {
    expect(getMaterialFactor('tela_solar')).toBe(1.00)
    expect(getMaterialFactor('blackout_tecido')).toBe(1.225)
    expect(getMaterialFactor('linho_sarja')).toBe(1.175)
    expect(getMaterialFactor('madeira_bambu')).toBe(1.60)
    expect(getMaterialFactor('pvc')).toBe(1.075)
  })

  it('deve retornar 1.0 para material desconhecido', () => {
    expect(getMaterialFactor('material_inexistente' as any)).toBe(1.0)
  })
})