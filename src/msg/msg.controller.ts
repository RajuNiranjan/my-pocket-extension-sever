import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { MsgService } from './msg.service';
import { SendMsgDto } from 'src/dto/Msg/Msg.dto';
import { JwtAuthGuard } from 'src/middlewares/jwtAuthGuard';

@Controller('msg')
export class MsgController {
  constructor(private readonly msgService: MsgService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':receiverId')
  SendMessage(
    @Req() req: any,
    @Param('receiverId') receiverId: string,
    @Body() sendMsgDto: SendMsgDto,
  ) {
    return this.msgService.sendMessage(req.user, receiverId, sendMsgDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('users')
  GetAllUsers(@Req() req: any) {
    return this.msgService.getAllUsers(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':receiverId')
  GetConversationMsgs(
    @Req() req: any,
    @Param('receiverId') receiverId: string,
  ) {
    return this.msgService.getConversationMsgs(req.user, receiverId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('unread/count')
  async getUnreadMessageCount(@Req() req: any) {
    return this.msgService.getUnreadMessageCount(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('mark-read/:senderId')
  async markMessagesAsRead(
    @Req() req: any,
    @Param('senderId') senderId: string,
  ) {
    return this.msgService.markMessagesAsRead(req.user, senderId);
  }
}
