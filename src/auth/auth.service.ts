import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import  * as bcrypt from 'bcrypt';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TokenLogs, TokenLogsDocument } from './access-token.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectModel(TokenLogs.name)
    private readonly tokenLogsModel: Model<TokenLogsDocument>,
  ) {}

    async validateUser(username: string, password: string): Promise<any> {
      try {
      console.log(password)
        const user = await this.usersService.findByUserName(username);
        console.log(username)
        console.log(user+"username")

        if (user && (await bcrypt.compare(password, user.password))) {
          delete user.password;
          return user;

        }
        return null;
      } catch (e) {
        throw new Error(e);
      }
    }

  async login(user: any): Promise<any> {
    try {
      const userDetail = await this.usersService.findById(user.id);
      if (userDetail.userRole == 3) {
        return { error: true, resObj: 'Invalid Credentials' };
      } else {
        const payload = { username: user.userName, userId: user.id };
        const newUserDetail = JSON.parse(JSON.stringify(userDetail));
        const obj = {
          ...newUserDetail,
          access_token: this.jwtService.sign(payload),
        };
        await this.tokenLogsModel.create({
          userId: user.id,
          accessToken: obj.access_token,
        });
        delete obj.password;
        return { error: false, resObj: obj };
      }
    } catch (e) {
      throw new Error(e);
    }
  }

   async changePassword(userId: ObjectId, oldPassword: string, newPassword: string) {
      try {
        const user = await this.usersService.findById(userId);
        if (await bcrypt.compare(oldPassword, user.password)) {
          await this.usersService.changePassword(userId, newPassword);
          return true;
         } 
         else {
          return false;
         }
       } catch (e) {
         throw new Error(e);
       }
     }

    async checkValidToken(accessToken): Promise<any> {
      const tokenDetail = await this.tokenLogsModel.findOne({ accessToken: accessToken }, { valid: 1 });

      return tokenDetail.valid;
    }

  async logOut(obj): Promise<any> {
    const lastToken = await this.tokenLogsModel
      .findOne({ userId: obj.user.userId, valid: true })
      .sort({ $natural: -1 });
    await this.tokenLogsModel.updateOne(
      { _id: lastToken._id },
      { valid: false },
    );
    return true;
  }

    async getTokenForMailVerification(user: any) {
      try {
        const payload = { username: user.userName, userId: user.id };
        const obj = {
          userName: user.userName,
          access_token: this.jwtService.sign(payload)
        };
        await this.tokenLogsModel.create({
          userId: user.id,
          accessToken: obj.access_token
        });
        return obj.access_token;
      } catch (e) {
        throw new Error(e);
      }
    }

  async getTokenForLimitedTime(user: any, validity: string) {
    try {
      const payload = { username: user.userName, userId: user.id };
      const obj = {
        userName: user.userName,
        access_token: this.jwtService.sign(payload, {
          expiresIn: `${validity}`,
        }),
      };
      await this.tokenLogsModel.create({
        userId: user.id,
        accessToken: obj.access_token,
      });
      return obj.access_token;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getTokenDetail(accessToken): Promise<any> {
    const tokenDetail = await this.tokenLogsModel.findOne(
      { accessToken: accessToken },
      { valid: 1, userId: 1 },
    );
    return tokenDetail;
  }

  async updateTokenInvalid(accessToken): Promise<any> {
    await this.tokenLogsModel.updateOne(
      { accessToken: accessToken },
      { valid: false },
    );
    return true;
  }

  async userLogin(user: any) {
    try {
      const userDetail = await this.usersService.findById(user.id);
      if (userDetail.userRole != 3) {
        return { error: true, resObj: 'Invalid Credentials' };
      } else if (!userDetail.emailVerified) {
        return {
          error: true,
          resObj: 'Please verify your email first to login',
        };
      } else {
        const payload = { username: user.userName, userId: user.id };
        const newUserDetail = JSON.parse(JSON.stringify(userDetail));
        const validity = `24h`;
        const obj = {
          ...newUserDetail,
          access_token: this.jwtService.sign(payload, {
            expiresIn: `${validity}`,
          }),
        };
        await this.tokenLogsModel.create({
          userId: user.id,
          accessToken: obj.access_token,
        });
        delete obj.password;
        return { error: false, resObj: obj };
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  async updateAllUserTokensAsInvalid(userId): Promise<any> {
    await this.tokenLogsModel.updateMany({ userId: userId }, { valid: false });
     return true;
  }
 }


// import {Injectable} from '@nestjs/common';
// import { UsersService } from 'src/users/users.service';

// @Injectable()
// export class AuthService {
//   constructor(private usersService:UsersService) {}

//   async validateUser(username:string,password:string):Promise<any> {
//     const user = await this.usersService.findOne(username);
//     if(user&& user.password === password) {
//       const {password , username, ...rest}=user;
//       return rest;
//     }
//     return null;

    
//   }
//}