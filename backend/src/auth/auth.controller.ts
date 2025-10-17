import { Controller, Post, Body, UseGuards, Get, Request } from '@nestjs/common'
import { AuthService } from './auth.service'
import { JwtAuthGuard } from './guards/jwt-auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(
    @Body()
    data: {
      email: string
      password: string
      name: string
      phone?: string
      cpf?: string
    },
  ) {
    return this.authService.register(data)
  }

  @Post('login')
  async login(
    @Body() data: { email: string; password: string },
  ) {
    return this.authService.login(data.email, data.password)
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Request() req: any) {
    return req.user
  }

  @Post('forgot-password')
  async forgotPassword(@Body() data: { email: string }) {
    return this.authService.forgotPassword(data.email)
  }

  @Post('reset-password')
  async resetPassword(
    @Body() data: { token: string; newPassword: string },
  ) {
    return this.authService.resetPassword(data.token, data.newPassword)
  }

  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  async changePassword(
    @Request() req: any,
    @Body() data: { oldPassword: string; newPassword: string },
  ) {
    return this.authService.changePassword(
      req.user.id,
      data.oldPassword,
      data.newPassword,
    )
  }
}
