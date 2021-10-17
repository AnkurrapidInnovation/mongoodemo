import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Sports, SportsSchema } from './sports.schema';
import { SportsController } from './sports.controller';
import { SportsService } from './sports.service';
import { ErrorObj } from '../errModel';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Sports.name, schema: SportsSchema }]),
  ],
  controllers: [SportsController],
  providers: [SportsService, ErrorObj],
})
export class SportsModule {}
