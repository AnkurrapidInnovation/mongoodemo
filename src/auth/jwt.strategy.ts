import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import 'dotenv/config';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService, private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // ignoreExpiration: false,
      secretOrKey: process.env.secretKey
    });
  }

  async validate(payload: any) {
    return { userId: payload.userId, username: payload.username };
    // let token = ExtractJwt.fromHeader("authorization");
    // let tokenScope = await this.authService.checkValidToken(token);
    // if(tokenScope){
    //   return { userId: payload.userId, username: payload.username };
    // }else{
    //   return new Error("Invalid Token");
    // }
  }
}
