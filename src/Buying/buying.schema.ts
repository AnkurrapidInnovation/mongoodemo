



import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Users } from '../users/users.schema';
import * as mongoose from 'mongoose';
import { Products } from 'src/products/products.schema';


export type BuyingsDocument = Buyings & Document;

@Schema()
export class Buyings {
  

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users' })
  usersId: Users;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'products' })
  productsId: Products;



  @Prop()
  Quantity: Number;

  @Prop()
  Price:Number;

  
}

export const BuyingsSchema = SchemaFactory.createForClass(Buyings);