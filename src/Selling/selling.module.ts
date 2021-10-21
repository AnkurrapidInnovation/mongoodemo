import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ErrorObj } from '../errModel';
import { SellingController } from './selling.controller';
import { Sellings, SellingsSchema } from './selling.schema';
import { SellingsService } from './selling.service';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Sellings.name, schema:SellingsSchema },
    ]),
  ],
  controllers: [SellingController],
  providers: [SellingsService, ErrorObj],
})
export class BuyingsModule {}