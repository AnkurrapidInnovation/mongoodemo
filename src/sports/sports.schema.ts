import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Users } from '../users/users.schema';
import * as mongoose from 'mongoose';


export type SportsDocument = Sports & Document;

@Schema()
export class Sports  {
  @Prop()
  football: string;

  @Prop()
  basketball: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users' })
  usersId:Users;

 
}

export const SportsSchema = SchemaFactory.createForClass(Sports);