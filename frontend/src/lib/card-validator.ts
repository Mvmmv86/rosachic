/**
 * Validação de Cartão de Crédito
 * Inclui: Algoritmo de Luhn, detecção de bandeira, validação de CVV e data
 */

// Tipos de bandeiras suportadas
export type CardBrand = 'visa' | 'mastercard' | 'amex' | 'elo' | 'hipercard' | 'diners' | 'discover' | 'unknown'

export interface CardValidation {
  isValid: boolean
  brand: CardBrand
  errors: string[]
}

/**
 * Algoritmo de Luhn para validar número do cartão
 */
export function validateCardNumber(cardNumber: string): boolean {
  // Remove espaços e caracteres não numéricos
  const cleaned = cardNumber.replace(/\D/g, '')

  if (cleaned.length < 13 || cleaned.length > 19) {
    return false
  }

  let sum = 0
  let isEven = false

  // Processa da direita para esquerda
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i])

    if (isEven) {
      digit *= 2
      if (digit > 9) {
        digit -= 9
      }
    }

    sum += digit
    isEven = !isEven
  }

  return sum % 10 === 0
}

/**
 * Detecta a bandeira do cartão baseado no número
 */
export function detectCardBrand(cardNumber: string): CardBrand {
  const cleaned = cardNumber.replace(/\D/g, '')

  // Padrões de cada bandeira (regex)
  const patterns = {
    visa: /^4/,
    mastercard: /^(5[1-5]|2[2-7])/,
    amex: /^3[47]/,
    elo: /^((((636368)|(438935)|(504175)|(451416)|(636297))\d{0,10})|((5067)|(4576)|(4011))\d{0,12})$/,
    hipercard: /^(606282|3841)/,
    diners: /^3(?:0[0-5]|[68])/,
    discover: /^6(?:011|5)/,
  }

  for (const [brand, pattern] of Object.entries(patterns)) {
    if (pattern.test(cleaned)) {
      return brand as CardBrand
    }
  }

  return 'unknown'
}

/**
 * Valida CVV baseado na bandeira
 */
export function validateCVV(cvv: string, brand: CardBrand): boolean {
  const cleaned = cvv.replace(/\D/g, '')

  // Amex usa 4 dígitos, outros usam 3
  if (brand === 'amex') {
    return cleaned.length === 4
  }

  return cleaned.length === 3
}

/**
 * Valida data de validade (MM/YY ou MM/YYYY)
 */
export function validateExpiryDate(expiry: string): boolean {
  const cleaned = expiry.replace(/\D/g, '')

  if (cleaned.length !== 4 && cleaned.length !== 6) {
    return false
  }

  const month = parseInt(cleaned.substring(0, 2))
  let year = parseInt(cleaned.substring(2))

  // Validar mês
  if (month < 1 || month > 12) {
    return false
  }

  // Converter ano de 2 dígitos para 4 dígitos
  if (cleaned.length === 4) {
    year += 2000
  }

  // Verificar se não está expirado
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() + 1

  if (year < currentYear) {
    return false
  }

  if (year === currentYear && month < currentMonth) {
    return false
  }

  return true
}

/**
 * Validação completa do cartão
 */
export function validateCard(cardNumber: string, cvv: string, expiry: string, holderName: string): CardValidation {
  const errors: string[] = []
  const brand = detectCardBrand(cardNumber)

  // Validar número
  if (!validateCardNumber(cardNumber)) {
    errors.push('Número do cartão inválido')
  }

  // Validar CVV
  if (!validateCVV(cvv, brand)) {
    errors.push(brand === 'amex' ? 'CVV deve ter 4 dígitos' : 'CVV deve ter 3 dígitos')
  }

  // Validar data de validade
  if (!validateExpiryDate(expiry)) {
    errors.push('Data de validade inválida ou cartão expirado')
  }

  // Validar nome do titular
  if (!holderName || holderName.trim().length < 3) {
    errors.push('Nome do titular inválido')
  }

  return {
    isValid: errors.length === 0,
    brand,
    errors,
  }
}

/**
 * Formata número do cartão com espaços
 * Ex: 1234567890123456 → 1234 5678 9012 3456
 */
export function formatCardNumber(cardNumber: string): string {
  const cleaned = cardNumber.replace(/\D/g, '')
  const brand = detectCardBrand(cleaned)

  // Amex usa formato 4-6-5
  if (brand === 'amex') {
    return cleaned
      .substring(0, 15)
      .replace(/(\d{4})(\d{6})(\d{5})/, '$1 $2 $3')
      .trim()
  }

  // Outros cartões usam formato 4-4-4-4
  return cleaned
    .substring(0, 16)
    .replace(/(\d{4})/g, '$1 ')
    .trim()
}

/**
 * Formata data de validade
 * Ex: 1225 → 12/25
 */
export function formatExpiryDate(expiry: string): string {
  const cleaned = expiry.replace(/\D/g, '')

  if (cleaned.length >= 2) {
    return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4)
  }

  return cleaned
}

/**
 * Formata CVV (apenas números)
 */
export function formatCVV(cvv: string, brand: CardBrand): string {
  const cleaned = cvv.replace(/\D/g, '')
  const maxLength = brand === 'amex' ? 4 : 3

  return cleaned.substring(0, maxLength)
}

/**
 * Retorna o nome da bandeira para exibição
 */
export function getBrandName(brand: CardBrand): string {
  const names: Record<CardBrand, string> = {
    visa: 'Visa',
    mastercard: 'Mastercard',
    amex: 'American Express',
    elo: 'Elo',
    hipercard: 'Hipercard',
    diners: 'Diners Club',
    discover: 'Discover',
    unknown: 'Desconhecida',
  }

  return names[brand]
}

/**
 * Retorna a cor da bandeira (para UI)
 */
export function getBrandColor(brand: CardBrand): string {
  const colors: Record<CardBrand, string> = {
    visa: '#1A1F71',
    mastercard: '#EB001B',
    amex: '#006FCF',
    elo: '#FFCB05',
    hipercard: '#D8232A',
    diners: '#0079BE',
    discover: '#FF6000',
    unknown: '#6B7280',
  }

  return colors[brand]
}
