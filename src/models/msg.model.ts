import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Msg extends Document {
  @Prop({ required: true, ref: 'User', type: mongoose.Schema.Types.ObjectId })
  senderId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, ref: 'User', type: mongoose.Schema.Types.ObjectId })
  receiverId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  message: string;
}

export const MsgSchema = SchemaFactory.createForClass(Msg);
