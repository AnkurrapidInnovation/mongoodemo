import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ErrorObj } from '../errModel';
import { Qualifications, QualificationsSchema } from './qualification.schema';
import { QualificationsController } from './qualifications.controller';
import { QualificationsService } from './qualification.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Qualifications.name, schema: QualificationsSchema },
    ]),
  ],
  controllers: [QualificationsController],
  providers: [QualificationsService, ErrorObj],
})
export class QualificationsModule {}
