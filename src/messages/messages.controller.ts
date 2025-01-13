import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { JwtAuthGuard } from 'src/middlewares/jwtAuthGuard';
import { SendMessageDto } from 'src/dto/Message/SendMessage.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messageService: MessagesService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':receiverId')
  GetAllMessages(@Req() req: any, @Param('receiverId') receiverId: string) {
    return this.messageService.getAllMessages(req.user, receiverId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  GetAllUsers(@Req() req: any) {
    return this.messageService.getAllUsers(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':receiverId')
  SendMessage(
    @Req() req: any,
    @Param('receiverId') receiverId: string,
    @Body() sendMessageDto: SendMessageDto,
  ) {
    return this.messageService.sendMessage(
      req.user,
      receiverId,
      sendMessageDto,
    );
  }
}
