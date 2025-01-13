import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Message {
  @Prop({ required: true, ref: 'User' })
  senderId: string;

  @Prop({ required: true, ref: 'User' })
  receiverId: string;

  @Prop({ required: true })
  message: string;
}
