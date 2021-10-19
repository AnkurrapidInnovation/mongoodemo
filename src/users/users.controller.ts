import { Body, Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { UsersService } from './users.service';
import { ErrorObj } from '../errModel';
import bcrypt from 'bcrypt';
import { UsersDto } from './dto/users.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';



@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
    private readonly errService: ErrorObj,
    private readonly authService: AuthService,) {}

  //   @Post('createUser')
  //   async createUser(@Body() data): Promise<any> {
  //     const create = await this.usersService.createUser(data);
  //   }

  // @Post('createUser')
  // async createUser(
  //   @Body('firstName') userfirstName: string,
  //   @Body('lastName') userlastName: string,
  // )
  //  {
  //   const generatedId = await this.usersService.createUser(
  //     userfirstName,
  //     userlastName,
  //   );
  //   return { id: generatedId };
  // }

 //User Signup for userPanel
  @Post('createUser')
  async createNewUser(@Body() data): Promise<any> {
    try {
      const userName = await this.usersService.UserByUserName(data.userName);
      if (userName) {
        return this.errService.response(true, 'Username already has taken');
      }
      // const userEmail = await this.usersService.findUserByEmail(data.email);
      // if (userEmail) {
      //   return this.errService.response(true, 'Email already is in use');
      // } 
      else {
        // data.password = await bcrypt.hash(data.password, 10);
        data['userRole'] = 3;
        data['createdAt'] = new Date();
        const create = await this.usersService.createNewUser(data);
        return this.errService.response(false, create);
      }
    } catch (e) {
      throw new Error(e);
    }
  }
 

 

  @Get('getAllUsers')
  async getAllUsers() {
  const user = await this.usersService.allUsers();
  return user;
  }

  // @UseGuards(LocalAuthGuard)
  @Post('login')
  async userLogin(@Req() req): Promise<any> {
    try {
      const user = await this.authService.userLogin(req.user);
      return this.errService.response(user.error, user.resObj);
    } catch (e) {
      throw new Error(e);
    }
  }
  // @UseGuards(LocalAuthGuard)
  // @Post('login')
  // async login(@Request() req): Promise<any> {
  //   try {
  //     let response = await this.authService.login(req.user);
  //     return this.errService.response(response.error, response.resObj);
  //   } catch (e) {
  //     return this.errService.response(true, 'Error while login please try again ..!');
  //   }
  // }

  // @UseGuards(LocalAuthGuard)
  // @Post('login')
  // login(@Request() req) : any {
  //   return req.user;
  // }

  // @UseGuards(LocalAuthGuard)
  // @Post('login')
  // async userLogin(@Req() req): Promise<any> {
  //   try {
  //     const user = await this.authService.userLogin(req.user);
  //     return this.errService.response(user.error, user.resObj);
  //   } catch (e) {
  //     throw new Error(e);
  //   }
  // }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async logout(@Request() req): Promise<any> {
    try {
      let data = await this.authService.logOut(req);
      return this.errService.response(false, 'Successfully logged out.');
    } catch (e) {
      return this.errService.response(true, 'Error while loging out.');
    }
  }

  @Post('verifyEmailAddress')
  async verifyUserEmailAdd(@Body() data): Promise<any> {
    try {
      if (!data.userId) {
        return this.errService.response(true, 'Please provide the user Id');
      } else {
        const obj = { emailVerified: true };
        // await this.usersService.updateUserProfile(data.userId, obj);
        return this.errService.response(false, 'Email has been changed successfully.');
      }
    } catch (e) {
      throw new Error(e);
    }
  }

 
}
