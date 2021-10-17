import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Users } from 'src/users/users.schema';
import * as mongoose from 'mongoose';


export type CarsDocument = Cars & Document;

@Schema()
export class Cars {
  @Prop()
  name: string;

  @Prop()
  price: Number;

  @Prop()
  piece:number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users' })
  usersId:Users;


}

export const CarsSchema = SchemaFactory.createForClass(Cars);