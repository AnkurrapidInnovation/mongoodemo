import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
// import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
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
  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
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

  // uploading a file
  // processing it S3/ aZURE
  // UPLOADING TO SERVER

  @Post('/upload')
  @UseInterceptors(
    FileInterceptors('image', 20, {
      storage: diskStorage({}),
      fileFilter: imageFileFilter,
    }),
  )
  public async uploadFile(@UploadedFile() file: any) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return response;
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  uploadFile(@UploadedFiles() file,@Res() res) {
    console.log(file);
    return res.sendFile()
  }

  @Get(':imagepath')
  setUploadFile(@Param('imagepath') Image,
  @Res() res){
    res.sendFile(image,{root:'uploads'});
  }
  
}
