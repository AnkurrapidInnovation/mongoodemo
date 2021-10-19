import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import  * as mongoose from 'mongoose';

export type TokenLogsDocument = TokenLogs & mongoose.Document;

@Schema()
export class TokenLogs {
  @Prop()
  userId: mongoose.Schema.Types.ObjectId;

  @Prop()
  accessToken: string;

  @Prop({ default: true })
  valid: boolean;

  @Prop({ type: Date, default: Date.now() })
  createdAt: Date;
}

export const TokenLogsSchema = SchemaFactory.createForClass(TokenLogs);
