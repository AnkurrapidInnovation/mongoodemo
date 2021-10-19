import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {UsersController} from './users.controller';
import { UsersService } from './users.service';
import {Users , UsersSchema } from './users.schema';
import { PassportModule } from '@nestjs/passport';
import { TokenLogs, TokenLogsSchema } from '../auth/access-token.schema';
import { AuthService } from '../auth/auth.service';
import { JwtStrategy } from '../auth/jwt.strategy';
import { LocalStrategy } from '../auth/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ErrorObj } from '../errModel';


@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.secretKey
      // signOptions : { expiresIn : '24h' }
    }),
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
    MongooseModule.forFeature([{ name: TokenLogs.name, schema: TokenLogsSchema }]),

  ],
  controllers: [UsersController],
  providers: [UsersService, ErrorObj, AuthService, LocalStrategy, JwtStrategy],
  exports: [UsersService]

})
export class UsersModule {}
