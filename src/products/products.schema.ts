import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Users } from '../users/users.schema';
import * as mongoose from 'mongoose';


export type ProductsDocument = Products & Document;

@Schema()
export class Products {
  @Prop()
  productName: string;

  @Prop()
  productDescription: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users' })
  usersId: Users;

  @Prop()
  Quantity: Number;

  @Prop()
  Price:Number;

  
}

export const ProductsSchema = SchemaFactory.createForClass(Products);