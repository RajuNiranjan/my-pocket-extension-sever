import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SendMessageDto } from 'src/dto/Message/SendMessage.dto';
import { User } from 'src/models/auth.model';
import { Msg } from 'src/models/msg.model';

@Injectable()
export class MsgService {
  constructor(
    @InjectModel(Msg.name) private readonly msgModel: Model<Msg>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async sendMessage(
    senderId: string,
    receiverId: string,
    sendMsgDto: SendMessageDto,
  ) {
    const newMsg = new this.msgModel({
      senderId,
      receiverId,
      sendMsgDto,
    });

    await newMsg.save();
  }

  async getAllUsers(currentUserId: string) {
    return this.userModel
      .find({ _id: { $ne: currentUserId } })
      .select('-password');
  }
}
