import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {UsersController} from './users.controller';
import { UsersService } from './users.service';


@Module({
  imports: [
    
    MongooseModule.forFeature([{ name: Users, schema: UsersSchema }]),
  ],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}
