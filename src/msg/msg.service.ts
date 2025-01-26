import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SendMsgDto } from 'src/dto/Msg/Msg.dto';

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
    sendMsgDto: SendMsgDto,
  ) {
    const { message } = sendMsgDto;

    if (!message) {
      throw new BadRequestException('message should not be empty');
    }

    const newMsg = new this.msgModel({
      senderId,
      receiverId,
      message,
    });

    await newMsg.save();
  }

  async getAllUsers(currentUserId: string) {
    return this.userModel
      .find({ _id: { $ne: currentUserId } })
      .select('-password');
  }

  async getConversationMsgs(senderId: string, receiverId: string) {
    return this.msgModel.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    });
  }
}
