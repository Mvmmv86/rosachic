import { Address } from './cart'

// Tipos de usuário
export enum UserRole {
  CUSTOMER = 'customer',
  ADMIN = 'admin',
  SALES = 'sales',
  INSTALLER = 'installer',
  SUPPORT = 'support'
}

// Status do usuário
export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  BLOCKED = 'blocked',
  PENDING = 'pending'
}

// Interface para usuário
export interface User {
  id: string
  email: string
  name: string
  phone?: string
  document?: string // CPF ou CNPJ
  role: UserRole
  status: UserStatus
  avatar?: string
  addresses?: Address[]
  defaultAddress?: Address
  createdAt: Date
  updatedAt: Date
  lastLogin?: Date
  emailVerified?: boolean
  phoneVerified?: boolean
}

// Interface para sessão de autenticação
export interface AuthSession {
  user: User
  token: string
  refreshToken?: string
  expiresAt: Date
}

// Interface para registro
export interface RegisterFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
  phone?: string
  document?: string
  acceptTerms: boolean
  acceptMarketing?: boolean
}

// Interface para login
export interface LoginFormData {
  email: string
  password: string
  rememberMe?: boolean
}

// Interface para recuperação de senha
export interface ResetPasswordFormData {
  email: string
}

// Interface para nova senha
export interface NewPasswordFormData {
  token: string
  password: string
  confirmPassword: string
}

// Interface para formulário de contato
export interface ContactFormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
  preferredContact?: 'email' | 'phone' | 'whatsapp'
  bestTimeToContact?: string
}

// Interface para solicitação de orçamento
export interface QuoteRequestFormData {
  // Dados do cliente
  customerName: string
  customerEmail: string
  customerPhone: string
  customerDocument?: string

  // Dados do produto
  productCategory: 'blind' | 'curtain' | 'awning'
  productType?: string

  // Medidas
  environments: EnvironmentMeasurement[]

  // Preferências
  preferredMaterial?: string
  preferredColor?: string
  controlType?: 'manual' | 'motorized' | 'smart'

  // Endereço de instalação
  installationAddress?: Address

  // Observações
  notes?: string

  // Agendamento
  preferredVisitDate?: Date
  urgency?: 'low' | 'normal' | 'high'
}

// Interface para medidas do ambiente
export interface EnvironmentMeasurement {
  name: string // Ex: "Sala", "Quarto 1"
  width: number
  height: number
  quantity: number
  notes?: string
  photos?: string[] // URLs das fotos
}

// Interface para agendamento de visita técnica
export interface TechnicalVisitFormData {
  customerName: string
  customerEmail: string
  customerPhone: string
  address: Address
  preferredDates: Date[] // até 3 datas de preferência
  preferredPeriod: 'morning' | 'afternoon' | 'evening'
  products: Array<'blind' | 'curtain' | 'awning'>
  numberOfEnvironments: number
  notes?: string
}

// Interface para avaliação/feedback
export interface FeedbackFormData {
  orderId?: string
  rating: 1 | 2 | 3 | 4 | 5
  productQuality?: 1 | 2 | 3 | 4 | 5
  installationQuality?: 1 | 2 | 3 | 4 | 5
  customerService?: 1 | 2 | 3 | 4 | 5
  deliveryTime?: 1 | 2 | 3 | 4 | 5
  comment?: string
  wouldRecommend?: boolean
  photos?: string[]
}

// Interface para newsletter
export interface NewsletterFormData {
  email: string
  name?: string
  interests?: Array<'blinds' | 'curtains' | 'awnings' | 'promotions' | 'tips'>
}