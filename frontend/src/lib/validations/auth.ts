import { z } from 'zod'

/**
 * Schema para login
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'E-mail é obrigatório')
    .email('E-mail inválido'),

  password: z
    .string()
    .min(1, 'Senha é obrigatória')
    .min(6, 'Senha deve ter no mínimo 6 caracteres'),

  remember: z.boolean().default(false),
})

/**
 * Schema para registro de novo usuário
 */
export const registerSchema = z.object({
  name: z
    .string()
    .min(1, 'Nome é obrigatório')
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),

  email: z
    .string()
    .min(1, 'E-mail é obrigatório')
    .email('E-mail inválido'),

  password: z
    .string()
    .min(6, 'Senha deve ter no mínimo 6 caracteres')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Senha deve conter letras maiúsculas, minúsculas e números'
    ),

  confirmPassword: z
    .string()
    .min(1, 'Confirmação de senha é obrigatória'),

  cpf: z
    .string()
    .min(1, 'CPF é obrigatório')
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido (use XXX.XXX.XXX-XX)'),

  phone: z
    .string()
    .min(1, 'Telefone é obrigatório')
    .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, 'Telefone inválido (use (XX) XXXXX-XXXX)'),

  acceptTerms: z
    .boolean()
    .refine((val) => val === true, {
      message: 'Você deve aceitar os termos de uso',
    }),

  newsletter: z.boolean().default(false),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não conferem',
  path: ['confirmPassword'],
})

/**
 * Schema para recuperação de senha
 */
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'E-mail é obrigatório')
    .email('E-mail inválido'),
})

/**
 * Schema para redefinir senha
 */
export const resetPasswordSchema = z.object({
  token: z
    .string()
    .min(1, 'Token é obrigatório'),

  password: z
    .string()
    .min(6, 'Senha deve ter no mínimo 6 caracteres')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Senha deve conter letras maiúsculas, minúsculas e números'
    ),

  confirmPassword: z
    .string()
    .min(1, 'Confirmação de senha é obrigatória'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não conferem',
  path: ['confirmPassword'],
})

/**
 * Schema para atualização de perfil
 */
export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres')
    .optional(),

  email: z
    .string()
    .email('E-mail inválido')
    .optional(),

  cpf: z
    .string()
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido')
    .optional(),

  phone: z
    .string()
    .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, 'Telefone inválido')
    .optional(),

  birthDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Data inválida')
    .optional(),

  newsletter: z.boolean().optional(),
})

/**
 * Schema para alteração de senha
 */
export const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(1, 'Senha atual é obrigatória'),

  newPassword: z
    .string()
    .min(6, 'Nova senha deve ter no mínimo 6 caracteres')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Senha deve conter letras maiúsculas, minúsculas e números'
    ),

  confirmNewPassword: z
    .string()
    .min(1, 'Confirmação de senha é obrigatória'),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: 'As senhas não conferem',
  path: ['confirmNewPassword'],
}).refine((data) => data.currentPassword !== data.newPassword, {
  message: 'A nova senha deve ser diferente da atual',
  path: ['newPassword'],
})

/**
 * Schema para endereço
 */
export const addressSchema = z.object({
  id: z.string().optional(),

  label: z
    .string()
    .min(1, 'Nome do endereço é obrigatório')
    .max(50, 'Nome deve ter no máximo 50 caracteres'),

  cep: z
    .string()
    .regex(/^\d{5}-\d{3}$/, 'CEP inválido (use XXXXX-XXX)'),

  street: z
    .string()
    .min(1, 'Rua é obrigatória')
    .max(200, 'Rua deve ter no máximo 200 caracteres'),

  number: z
    .string()
    .min(1, 'Número é obrigatório')
    .max(10, 'Número deve ter no máximo 10 caracteres'),

  complement: z
    .string()
    .max(100, 'Complemento deve ter no máximo 100 caracteres')
    .optional(),

  neighborhood: z
    .string()
    .min(1, 'Bairro é obrigatório')
    .max(100, 'Bairro deve ter no máximo 100 caracteres'),

  city: z
    .string()
    .min(1, 'Cidade é obrigatória')
    .max(100, 'Cidade deve ter no máximo 100 caracteres'),

  state: z
    .string()
    .length(2, 'Estado deve ter 2 caracteres (ex: SP)')
    .toUpperCase(),

  isDefault: z.boolean().default(false),
})

/**
 * Schema para validação de CPF
 */
export const cpfSchema = z.string().refine((cpf) => {
  const cleaned = cpf.replace(/\D/g, '')

  if (cleaned.length !== 11) return false

  // Validação do CPF
  if (/^(\d)\1{10}$/.test(cleaned)) return false

  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleaned.charAt(i)) * (10 - i)
  }
  let rev = 11 - (sum % 11)
  if (rev === 10 || rev === 11) rev = 0
  if (rev !== parseInt(cleaned.charAt(9))) return false

  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleaned.charAt(i)) * (11 - i)
  }
  rev = 11 - (sum % 11)
  if (rev === 10 || rev === 11) rev = 0
  if (rev !== parseInt(cleaned.charAt(10))) return false

  return true
}, {
  message: 'CPF inválido',
})

// Tipos TypeScript inferidos dos schemas
export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>
export type Address = z.infer<typeof addressSchema>