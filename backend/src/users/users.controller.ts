import {
  Controller,
  Get,
  Put,
  Body,
  UseGuards,
  Request,
  Query,
  Param,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { UpdateUserDto } from './dto/update-user.dto'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { Roles } from '../auth/decorators/roles.decorator'
import { RolesGuard } from '../auth/guards/roles.guard'
import { Role } from '@prisma/client'

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // GET /users/me - Perfil do usuário logado
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req: any) {
    return this.usersService.findById(req.user.id)
  }

  // PUT /users/me - Atualizar perfil do usuário logado
  @UseGuards(JwtAuthGuard)
  @Put('me')
  async updateProfile(@Request() req: any, @Body() data: UpdateUserDto) {
    return this.usersService.updateProfile(req.user.id, data)
  }

  // GET /users - Listar todos os usuários (apenas admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  async findAll(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('search') search?: string,
  ) {
    return this.usersService.findAll({
      skip: skip ? parseInt(skip) : undefined,
      take: take ? parseInt(take) : undefined,
      search,
    })
  }

  // GET /users/:id - Detalhes de um usuário (apenas admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findById(id)
  }
}