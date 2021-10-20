import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { ErrorObj } from '../errModel';
import { SellingService } from './selling.service';


@Controller('selling')
export class BuyingController {
  constructor(private readonly sellingsService:SellingService,
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

  @Post('createSelling')
  async createNewSellings(@Body() data, ): Promise<any> {
    try {
      if (!data.TotalPrice) {
        return this.errService.response(true, 'Please enter an totalprice.');
    //   } else if (!data.Name) {
    //     return this.errService.response(true, 'Please enter an name');
    //   } 
      else {
        await this.sellingsService.createBuyings(data);
        return this.errService.response(false, 'sellings created');
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
  async getAllSellings(): Promise<any> {
    try {
      const allQualifications = await this.sellingsService.viewAllSellings();
      if (allSellings ) {
        return this.errService.response(false, allQualifications);
      } else {
        return this.errService.response(true, 'No qualifications available');
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
