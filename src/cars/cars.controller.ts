import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { ErrorObj } from '../errModel';
import { CarsService } from './cars.service';


@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService,
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

  @Post('createCars')
  async createNewSport(@Body() data, ): Promise<any> {
    try {
      if (!data.name) {
        return this.errService.response(true, 'Please enter a car name.');
      } else if (!data.price) {
        return this.errService.response(true, 'Please enter a car price ');
      } else if (!data.piece) {
        return this.errService.response(true, 'Please enter a car piece');
      } 
      else {
        await this.carsService.createSport(data);
        return this.errService.response(false, 'cars created');
      }
      }catch (e) {
        throw new Error(e);
      }
    

  }



  // @Get('all')
  // async allSports(@Request() req): Promise<any> {
  //   try {
  //     const sports = await this.sportsService.getAllSports(req.user);

      
  //     return this.errService.response(false, ports);
  //     // }else{
  //     //     return this.errService.response(true, "No Artists available.");
  //     // }
  //   } catch (e) {
  //     throw new Error(e);
  //   }
  // }

  @Get('all')
  async getAllSports(): Promise<any> {
    try {
      const allCars = await this.carsService.viewAllSports();
      if (allCars ) {
        return this.errService.response(false, allCars);
      } else {
        return this.errService.response(true, 'No Cars Available');
      }
    } catch (e) {
      throw new Error(e);
    }
  }
 

  // @Get('getAllSports')
  // async getAllSports() {
  // const user = await this.sportsService.allSports();
  // return user;
  // }
}
