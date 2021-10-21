import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ErrorObj } from '../errModel';
import { BuyingController } from './buying.controller';
import { BuyingsService } from './buying.service';
import { Buyings, BuyingsSchema } from './buying.schema';



@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Buyings.name, schema:BuyingsSchema },
    ]),
  ],
  controllers: [BuyingController],
  providers: [BuyingsService, ErrorObj],
})
export class BuyingsModule {}