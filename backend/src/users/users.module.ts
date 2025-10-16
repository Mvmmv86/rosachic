import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { SavedCardController } from './saved-card.controller';
import { SavedCardService } from './saved-card.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController, AddressController, SavedCardController],
  providers: [UsersService, AddressService, SavedCardService],
  exports: [UsersService, AddressService, SavedCardService],
})
export class UsersModule {}
