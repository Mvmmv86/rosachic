import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '../prisma/prisma.service'
import { EmailService } from '../email/email.service'
import * as bcrypt from 'bcrypt'

const SALT_ROUNDS = 12

interface TokenPayload {
  sub: string
  email: string
  role: string
}

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  async register(data: {
    email: string
    password: string
    name: string
    phone?: string
    cpf?: string
  }) {
    // Validar se email já existe
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    })

    if (existingUser) {
      throw new UnauthorizedException('E-mail já cadastrado')
    }

    // Hash da senha
    const passwordHash = await bcrypt.hash(data.password, SALT_ROUNDS)

    // Criar usuário
    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        passwordHash,
        name: data.name,
        phone: data.phone,
        cpf: data.cpf,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    })

    // Gerar token
    const token = await this.generateToken({
      sub: user.id,
      email: user.email,
      role: user.role,
    })

    // 📧 Enviar e-mail de boas-vindas
    try {
      await this.emailService.sendWelcome(user)
    } catch (error) {
      // Log do erro mas não quebrar o fluxo
      console.error('❌ Erro ao enviar e-mail de boas-vindas:', error.message)
    }

    return { user, token }
  }

  async login(email: string, password: string) {
    // Buscar usuário
    const user = await this.prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas')
    }

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash)

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas')
    }

    // Gerar token
    const token = await this.generateToken({
      sub: user.id,
      email: user.email,
      role: user.role,
    })

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token,
    }
  }

  private async generateToken(payload: TokenPayload): Promise<string> {
    return this.jwtService.sign(payload)
  }

  async validateUser(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    })
  }

  // Solicitar reset de senha
  async forgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      // Por segurança, não revelar se o email existe ou não
      return { message: 'Se o e-mail existir, você receberá instruções de recuperação.' }
    }

    // Gerar token de reset (válido por 1 hora)
    const resetToken = this.jwtService.sign(
      { sub: user.id, type: 'password-reset' },
      { expiresIn: '1h' }
    )

    // 📧 Enviar e-mail de reset
    try {
      await this.emailService.sendPasswordReset(user, resetToken)
    } catch (error) {
      console.error('❌ Erro ao enviar e-mail de reset:', error.message)
    }

    return { message: 'Se o e-mail existir, você receberá instruções de recuperação.' }
  }

  // Resetar senha com token
  async resetPassword(token: string, newPassword: string) {
    try {
      // Validar token
      const payload = this.jwtService.verify(token)

      if (payload.type !== 'password-reset') {
        throw new UnauthorizedException('Token inválido')
      }

      // Buscar usuário
      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      })

      if (!user) {
        throw new UnauthorizedException('Usuário não encontrado')
      }

      // Hash da nova senha
      const passwordHash = await bcrypt.hash(newPassword, SALT_ROUNDS)

      // Atualizar senha
      await this.prisma.user.update({
        where: { id: user.id },
        data: { passwordHash },
      })

      // 📧 Enviar e-mail de confirmação
      try {
        await this.emailService.sendPasswordChanged(user)
      } catch (error) {
        console.error('❌ Erro ao enviar e-mail de confirmação:', error.message)
      }

      return { message: 'Senha alterada com sucesso' }
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token expirado. Solicite um novo link de recuperação.')
      }
      throw new UnauthorizedException('Token inválido ou expirado')
    }
  }

  // Trocar senha (usuário logado)
  async changePassword(userId: string, oldPassword: string, newPassword: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado')
    }

    // Verificar senha antiga
    const isPasswordValid = await bcrypt.compare(oldPassword, user.passwordHash)

    if (!isPasswordValid) {
      throw new UnauthorizedException('Senha atual incorreta')
    }

    // Hash da nova senha
    const passwordHash = await bcrypt.hash(newPassword, SALT_ROUNDS)

    // Atualizar senha
    await this.prisma.user.update({
      where: { id: userId },
      data: { passwordHash },
    })

    // 📧 Enviar e-mail de confirmação
    try {
      await this.emailService.sendPasswordChanged(user)
    } catch (error) {
      console.error('❌ Erro ao enviar e-mail de confirmação:', error.message)
    }

    return { message: 'Senha alterada com sucesso' }
  }
}