/**
 * Formata valor em moeda brasileira (R$)
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

/**
 * Formata valor em moeda sem símbolo
 */
export function formatCurrencyNoSymbol(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

/**
 * Formata CPF (XXX.XXX.XXX-XX)
 */
export function formatCPF(cpf: string): string {
  const cleaned = cpf.replace(/\D/g, '')
  if (cleaned.length !== 11) return cpf

  return cleaned.replace(
    /(\d{3})(\d{3})(\d{3})(\d{2})/,
    '$1.$2.$3-$4'
  )
}

/**
 * Formata CNPJ (XX.XXX.XXX/XXXX-XX)
 */
export function formatCNPJ(cnpj: string): string {
  const cleaned = cnpj.replace(/\D/g, '')
  if (cleaned.length !== 14) return cnpj

  return cleaned.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
    '$1.$2.$3/$4-$5'
  )
}

/**
 * Formata telefone (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
 */
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')

  if (cleaned.length === 11) {
    return cleaned.replace(
      /(\d{2})(\d{5})(\d{4})/,
      '($1) $2-$3'
    )
  }

  if (cleaned.length === 10) {
    return cleaned.replace(
      /(\d{2})(\d{4})(\d{4})/,
      '($1) $2-$3'
    )
  }

  return phone
}

/**
 * Formata CEP (XXXXX-XXX)
 */
export function formatCEP(cep: string): string {
  const cleaned = cep.replace(/\D/g, '')
  if (cleaned.length !== 8) return cep

  return cleaned.replace(
    /(\d{5})(\d{3})/,
    '$1-$2'
  )
}

/**
 * Formata dimensões (ex: 180x120cm)
 */
export function formatDimensions(widthCm: number, heightCm: number): string {
  return `${widthCm}x${heightCm}cm`
}

/**
 * Formata área em m² (ex: 2.16 m²)
 */
export function formatArea(areaM2: number): string {
  const formatted = areaM2.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  return `${formatted} m²`
}

/**
 * Formata peso (ex: 1,5 kg)
 */
export function formatWeight(weightKg: number): string {
  const formatted = weightKg.toLocaleString('pt-BR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  })
  return `${formatted} kg`
}

/**
 * Formata percentual (ex: 10%)
 */
export function formatPercent(value: number, decimals: number = 0): string {
  return `${value.toFixed(decimals)}%`
}

/**
 * Formata data para o padrão brasileiro (DD/MM/AAAA)
 */
export function formatDateBR(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('pt-BR').format(d)
}

/**
 * Formata data e hora para o padrão brasileiro
 */
export function formatDateTimeBR(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(d)
}

/**
 * Formata número com separadores de milhares
 */
export function formatNumber(value: number, decimals: number = 0): string {
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

/**
 * Formata tempo de produção (ex: "7 a 10 dias úteis")
 */
export function formatProductionTime(minDays: number, maxDays: number): string {
  if (minDays === maxDays) {
    return `${minDays} dias úteis`
  }
  return `${minDays} a ${maxDays} dias úteis`
}

/**
 * Formata status do pedido
 */
export function formatOrderStatus(status: string): string {
  const statusMap: Record<string, string> = {
    pending: 'Aguardando pagamento',
    paid: 'Pago',
    production: 'Em produção',
    ready: 'Pronto para envio',
    shipped: 'Enviado',
    delivered: 'Entregue',
    cancelled: 'Cancelado',
  }

  return statusMap[status] || status
}

/**
 * Formata SKU (ex: PER-BLK-001)
 */
export function formatSKU(codigo: string): string {
  return codigo.toUpperCase().replace(/[^A-Z0-9]/g, '-')
}

/**
 * Remove formatação (deixa apenas números)
 */
export function unformat(value: string): string {
  return value.replace(/\D/g, '')
}

/**
 * Valida se o valor é um número válido
 */
export function isValidNumber(value: string): boolean {
  const cleaned = value.replace(',', '.')
  return !isNaN(parseFloat(cleaned))
}

/**
 * Converte string para número (aceita vírgula como decimal)
 */
export function parseNumber(value: string): number {
  const cleaned = value.replace(',', '.')
  return parseFloat(cleaned)
}