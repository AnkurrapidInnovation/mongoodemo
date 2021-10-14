import { Body, Controller, Get, Post } from '@nestjs/common';
import { SportsService } from './sports.service';
import { ErrorObj } from '../errModel';


@Controller('sports')
export class SportsController {
  constructor(private readonly sportsService: SportsService,
    private readonly errService: ErrorObj,
    ) {}

  //   @Post('createUser')
  //   async createUser(@Body() data): Promise<any> {
  //     const create = await this.usersService.createUser(data);
  //   }

  // @Post('createSports')
  // async createSport(
  //   @Body('football') football: string,
  //   @Body('basketball') basketball: string,
  //   @Body('userId')  usersId: string,
  // )
  //  {
  //   const usersId = await this.sportsService.createSport(
  //     football,
  //     basketball,
  //   );
  //   return { id: usersId };
  // }

  @Post('createSports')
  async createNewSport(@Body() data, ): Promise<any> {
    try {
      if (!data.football) {
        return this.errService.response(true, 'Please enter an  football.');
      } else if (!data.usersId) {
        return this.errService.response(true, 'Please enter an userId');
      } else if (!data.basketball) {
        return this.errService.response(true, 'Please enter the basketball.');
      } 
      else {
        await this.sportsService.createSport(data);
        return this.errService.response(false, 'sports created');
      }
      }catch (e) {
        throw new Error(e);
      }
    

  }


 

  @Get('getAllSports')
  async getAllSports() {
  const user = await this.sportsService.allSports();
  return user;
  }
}
