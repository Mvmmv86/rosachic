/**
 * Validação de CEP para Curitiba
 * CEPs de Curitiba começam com 80000-000 até 82999-999
 */

export interface CepValidationResult {
  isValid: boolean
  isCuritiba: boolean
  message: string
}

/**
 * Valida se o CEP está no formato correto
 */
export function isValidCepFormat(cep: string): boolean {
  // Remove caracteres não numéricos
  const cleanCep = cep.replace(/\D/g, '')

  // CEP deve ter exatamente 8 dígitos
  return cleanCep.length === 8
}

/**
 * Verifica se o CEP é de Curitiba
 * CEPs de Curitiba: 80000-000 a 82999-999
 */
export function isCuritibaCep(cep: string): boolean {
  const cleanCep = cep.replace(/\D/g, '')

  if (!isValidCepFormat(cleanCep)) {
    return false
  }

  const cepNumber = parseInt(cleanCep, 10)

  // Curitiba: 80000000 a 82999999
  return cepNumber >= 80000000 && cepNumber <= 82999999
}

/**
 * Valida se a instalação está disponível para o CEP
 */
export function validateInstallationAvailability(cep: string | null): CepValidationResult {
  // Se não tem CEP cadastrado
  if (!cep || cep.trim() === '') {
    return {
      isValid: false,
      isCuritiba: false,
      message: 'Por favor, cadastre seu endereço na área "Minha Conta" para habilitar a opção de instalação.'
    }
  }

  // Se o CEP não está no formato correto
  if (!isValidCepFormat(cep)) {
    return {
      isValid: false,
      isCuritiba: false,
      message: 'CEP inválido. Por favor, atualize seu endereço.'
    }
  }

  // Se o CEP é de Curitiba
  if (isCuritibaCep(cep)) {
    return {
      isValid: true,
      isCuritiba: true,
      message: 'Instalação disponível para sua região! 🎉'
    }
  }

  // Se o CEP não é de Curitiba
  return {
    isValid: false,
    isCuritiba: false,
    message: 'Instalação disponível apenas para Curitiba e região metropolitana. Seu CEP está fora da área de cobertura.'
  }
}

/**
 * Formata o CEP no padrão XXXXX-XXX
 */
export function formatCep(cep: string): string {
  const cleanCep = cep.replace(/\D/g, '')

  if (cleanCep.length !== 8) {
    return cep
  }

  return `${cleanCep.slice(0, 5)}-${cleanCep.slice(5)}`
}