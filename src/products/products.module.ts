import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Products, ProductsSchema } from './products.schema';
import { ErrorObj } from '../errModel';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Products.name, schema: ProductsSchema },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ErrorObj],
})
export class ProductsModule {}
