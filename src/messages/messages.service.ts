import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SendMessageDto } from 'src/dto/Message/SendMessage.dto';
import { Message } from 'src/models/message.model';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private readonly messageModel: Model<Message>,
  ) {}

  async getAllMessages(senderId: string, receiverId: string) {
    const messages = await this.messageModel.find({
      $or: [
        { receiverId, senderId },
        { receiverId: senderId, senderId: receiverId },
      ],
    });
    return messages;
  }

  async getAllUsers(userId: string) {
    const users = await this.messageModel
      .find({ _id: { $ne: userId } })
      .select('-password');
    return users;
  }

  async sendMessage(
    senderId: string,
    receiverId: string,
    sendMessageDto: SendMessageDto,
  ) {
    const { message } = sendMessageDto;
    const newMessage = await this.messageModel.create({
      senderId,
      receiverId,
      message,
    });

    await newMessage.save();

    return newMessage;
  }
}
