import { Get } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type UsersDocument = Users & Document;

@Schema()
export class Users {
  @Prop({ trim: true })
  firstName: string;

  @Prop({ trim: true })
  lastName: string;

  @Prop({ enum: [1, 2, 3], default: 1 }) //1-super admin, 2- sub admin, 3-Users(Bidders)
  userRole: number;

  @Prop({ trim: true })
  userName: string;

  @Prop({ trim: true })
  email: string;

  @Prop({ default: false })
  emailVerified: boolean;

  @Prop()
  emailVerifiedOn: Date;

  @Prop()
  password: string;

  // cars
  // sports
  // qualification


  
}

export const UsersSchema = SchemaFactory.createForClass(Users);