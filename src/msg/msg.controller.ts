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
  GetAllUsers(@Req() req:any) {
    return this.msgService.getAllUsers(req.user);
  }
}
