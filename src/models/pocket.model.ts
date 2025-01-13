import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Pocket {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' })
  userId: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop()
  pocket_userName?: string;

  @Prop()
  pocket_password?: string;

  @Prop({ type: [String], default: [] })
  images?: string[];
}

export const PocketSchema = SchemaFactory.createForClass(Pocket);
