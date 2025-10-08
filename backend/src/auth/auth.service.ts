import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '../prisma/prisma.service'
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
}