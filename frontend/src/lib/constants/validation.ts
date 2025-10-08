export const VALIDATION_MESSAGES = {
  REQUIRED: 'Campo obrigatório',
  INVALID_EMAIL: 'E-mail inválido',
  INVALID_CPF: 'CPF inválido',
  INVALID_PHONE: 'Telefone inválido',
  INVALID_CEP: 'CEP inválido',
  PASSWORD_MIN_LENGTH: 'Senha deve ter no mínimo 8 caracteres',
  WIDTH_OUT_OF_RANGE: 'Largura deve estar entre 1cm e 300cm',
  HEIGHT_OUT_OF_RANGE: 'Altura deve estar entre 1cm e 350cm',
  DIMENSION_TOO_LARGE: 'Dimensão excede o máximo permitido. Considere dividir em 2 módulos.',
} as const

export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  CPF: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
  PHONE: /^\(\d{2}\) \d{4,5}-\d{4}$/,
  CEP: /^\d{5}-\d{3}$/,
} as const