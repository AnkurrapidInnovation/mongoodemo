import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  //   @Post('createUser')
  //   async createUser(@Body() data): Promise<any> {
  //     const create = await this.usersService.createUser(data);
  //   }

  @Post('createUser')
  async createUser(
    @Body('firstName') userfirstName: string,
    @Body('lastName') userlastName: string,
  ) {
    const generatedId = await this.usersService.createUser(
      userfirstName,
      userlastName,
    );
    return { id: generatedId };
  }

  @Get('getAllUsers')
  async getAllUsers() {
  const user = await this.usersService.allUsers();
  return user;
  }
}
