import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class UserSchema {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  userName: string;

  @Prop({ required: true })
  password: string;
}

export const UserModel = SchemaFactory.createForClass(UserSchema);
