import { Get } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type UsersDocument = Users & mongoose.Document;

@Schema()
export class Users {
  @Prop({ trim: true })
  firstName: string;

  @Prop({ trim: true })
  lastName: string;

  
}

export const UsersSchema = SchemaFactory.createForClass(Users);