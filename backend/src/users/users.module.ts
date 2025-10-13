import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController, AddressController],
  providers: [UsersService, AddressService],
  exports: [UsersService, AddressService],
})
export class UsersModule {}
