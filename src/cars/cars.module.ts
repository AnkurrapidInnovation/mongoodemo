import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CarsService } from './cars.service';

import { ErrorObj } from '../errModel';
import { CarsController } from './cars.controller';
import { Cars, CarsSchema } from './cars.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cars.name, schema: CarsSchema }]),
  ],
  controllers: [CarsController],
  providers: [CarsService, ErrorObj],
})
export class CarsModule {}
