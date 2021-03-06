import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Users } from '../users/users.schema';
import * as mongoose from 'mongoose';


export type QualificationsDocument = Qualifications & Document;

@Schema()
export class Qualifications  {
  @Prop()
  HighestDegree: string;

  @Prop()
  Name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users' })
  usersId:Users;

 
}

export const QualificationsSchema = SchemaFactory.createForClass(Qualifications);