import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import 'dotenv/config';
import { ErrorObj } from '../errModel';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenLogs, TokenLogsSchema } from './access-token.schema';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.secretKey,
      signOptions: { expiresIn: '24h' }
    }),
    MongooseModule.forFeature([{ name: TokenLogs.name, schema: TokenLogsSchema }])
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, ErrorObj],
  exports: [AuthService]
})
export class AuthModule {}