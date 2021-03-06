import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  Res,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import dbConfig from 'dbconfig';
import { diskStorage } from 'multer';
// import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { fileURLToPath } from 'url';
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
      } else if (!data.quantity) {
        return this.errService.response(true, 'Please enter the quantity.');
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

  // @Post('/upload')
  // @UseInterceptors(
  //   FileInterceptors('image', 20, {
  //     storage: diskStorage({}),
  //     fileFilter: imageFileFilter,
  //   }),
  // )
  // public async uploadFile(@UploadedFile() file: any) {
  //   const response = {
  //     originalname: file.originalname,
  //     filename: file.filename,
  //   };
  //   return response;
  // }

  // @Post()
  // @UseInterceptors(FileInterceptor('image'))
  // uploadFile(@UploadedFiles() file,@Res() res) {
  //   console.log(file);
  //   return res.sendFile()
  // }

  // @Get(':imagepath')
  // setUploadFile(@Param('imagepath') Image,
  // @Res() res){
  //   res.sendFile(image,{root:'uploads'});
  // }

//   @Post('upload')
// @UseInterceptors(FileInterceptor('file'))
// uploadFile(@UploadedFile() file: Express.Multer.File) {
//   console.log(file);
// }

  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('images', 20, {
      storage: diskStorage({ 
        destination: './files',
        filename: (req, file, callback) => {
          const fileNameSplit = file.originalname.split(".");
          const fileExt = fileNameSplit[fileNameSplit.length-1];
          // const name = file.originalname.split('.')[0];
          // const fileExtName = extname(file.originalname);
          // const randomName = Date.now();
          callback(null, `$(Date.now()).${fileExt}`);
        }
      }),
    }))

    async save(@UploadedFiles() images,  @Body()  FileUploadDTO): Promise<any> {
      console.log(images);
      return
    }
      
  
}
