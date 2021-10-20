import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ErrorObj } from '../errModel';
import { BuyingController } from './buying.controller';
import { BuyingSchema } from './buying.schema';
import { BuyingsService } from './buying.service';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Buyings.name, schema:BuyingSchema },
    ]),
  ],
  controllers: [BuyingController],
  providers: [BuyingsService, ErrorObj],
})
export class BuyingsModule {}