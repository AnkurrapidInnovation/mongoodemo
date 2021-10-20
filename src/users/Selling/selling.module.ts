import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ErrorObj } from '../errModel';


import { SellingSchema } from './selling.schema';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SellingSchema.name, schema:SellingSchema },
    ]),
  ],
  controllers: [SellingsController],
  providers: [SellingService, ErrorObj],
})
export class BuyingsModule {}