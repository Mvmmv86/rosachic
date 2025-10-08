/**
 * Arredonda valor para cima com N casas decimais
 */
export function roundUp(value: number, decimals: number = 1): number {
  const factor = Math.pow(10, decimals)
  return Math.ceil(value * factor) / factor
}

/**
 * Arredonda valor para baixo com N casas decimais
 */
export function roundDown(value: number, decimals: number = 1): number {
  const factor = Math.pow(10, decimals)
  return Math.floor(value * factor) / factor
}

/**
 * Arredonda valor para o mais próximo com N casas decimais
 */
export function round(value: number, decimals: number = 1): number {
  const factor = Math.pow(10, decimals)
  return Math.round(value * factor) / factor
}

/**
 * Calcula área em m² a partir de cm
 */
export function calculateAreaM2(widthCm: number, heightCm: number): number {
  return (widthCm / 100) * (heightCm / 100)
}

/**
 * Converte cm para metros
 */
export function cmToMeters(cm: number): number {
  return cm / 100
}

/**
 * Converte metros para cm
 */
export function metersToCm(meters: number): number {
  return meters * 100
}

/**
 * Calcula percentual
 */
export function calculatePercentage(value: number, percentage: number): number {
  return value * (percentage / 100)
}

/**
 * Calcula percentual de diferença entre dois valores
 */
export function percentageDifference(value1: number, value2: number): number {
  if (value1 === 0) return 0
  return ((value2 - value1) / value1) * 100
}

/**
 * Clamp - limita valor entre mínimo e máximo
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

/**
 * Verifica se valor está entre mínimo e máximo (inclusivo)
 */
export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max
}

/**
 * Calcula média de array de números
 */
export function average(values: number[]): number {
  if (values.length === 0) return 0
  return values.reduce((sum, val) => sum + val, 0) / values.length
}

/**
 * Calcula soma de array de números
 */
export function sum(values: number[]): number {
  return values.reduce((sum, val) => sum + val, 0)
}

/**
 * Encontra valor mínimo em array
 */
export function min(values: number[]): number {
  if (values.length === 0) return 0
  return Math.min(...values)
}

/**
 * Encontra valor máximo em array
 */
export function max(values: number[]): number {
  if (values.length === 0) return 0
  return Math.max(...values)
}

/**
 * Calcula área com fator de perda aplicado
 */
export function calculateAreaWithLoss(
  widthCm: number,
  heightCm: number,
  lossFactor: number
): number {
  const areaBruta = calculateAreaM2(widthCm, heightCm)
  return areaBruta * lossFactor
}

/**
 * Aplica área mínima cobrável
 */
export function applyMinimumChargeableArea(area: number, minimum: number): number {
  return Math.max(area, minimum)
}

/**
 * Calcula desconto em valor
 */
export function calculateDiscountValue(
  value: number,
  discountPercentage: number
): number {
  return value * (discountPercentage / 100)
}

/**
 * Calcula valor final com desconto
 */
export function applyDiscount(value: number, discountPercentage: number): number {
  return value - calculateDiscountValue(value, discountPercentage)
}

/**
 * Calcula valor com acréscimo percentual
 */
export function applyMarkup(value: number, markupPercentage: number): number {
  return value * (1 + markupPercentage / 100)
}

/**
 * Formata número com precisão específica
 */
export function toPrecision(value: number, precision: number): number {
  return parseFloat(value.toPrecision(precision))
}

/**
 * Gera número aleatório entre min e max
 */
export function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

/**
 * Gera número inteiro aleatório entre min e max
 */
export function randomIntBetween(min: number, max: number): number {
  return Math.floor(randomBetween(min, max + 1))
}

/**
 * Verifica se número é inteiro
 */
export function isInteger(value: number): boolean {
  return Number.isInteger(value)
}

/**
 * Verifica se número é positivo
 */
export function isPositive(value: number): boolean {
  return value > 0
}

/**
 * Verifica se número é negativo
 */
export function isNegative(value: number): boolean {
  return value < 0
}

/**
 * Converte graus para radianos
 */
export function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180)
}

/**
 * Converte radianos para graus
 */
export function radiansToDegrees(radians: number): number {
  return radians * (180 / Math.PI)
}