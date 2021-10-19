import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { ErrorObj } from '../errModel';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
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

  @Post('createProduct')
  async createNewProduct(@Body() data): Promise<any> {
    try {
      if (!data.productName) {
        return this.errService.response(true, 'Please enter an  productName.');
      } else if (!data.productDescription) {
        return this.errService.response(
          true,
          'Please enter an productdescripton',
        );
      } else if (!data.NumberofSell) {
        return this.errService.response(true, 'Please enter the numberofsell.');
      } else {
        await this.productsService.createProduct(data);
        return this.errService.response(false, 'products created');
      }
    } catch (e) {
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
  async getAllProducts(): Promise<any> {
    try {
      const allProducts = await this.productsService.viewAllProducts();
      if (allProducts) {
        return this.errService.response(false, allProducts);
      } else {
        return this.errService.response(true, 'No products available');
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
