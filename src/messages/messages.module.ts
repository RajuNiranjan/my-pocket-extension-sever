import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { JwtStrategy } from 'src/utils/jwtStrategy';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from 'src/models/message.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
  controllers: [MessagesController],
  providers: [MessagesService, JwtStrategy],
})
export class MessagesModule {}
