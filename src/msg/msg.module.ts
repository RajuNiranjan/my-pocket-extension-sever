import { Module } from '@nestjs/common';
import { MsgController } from './msg.controller';
import { MsgService } from './msg.service';
import { JwtStrategy } from 'src/utils/jwtStrategy';

@Module({
  imports: [],
  controllers: [MsgController],
  providers: [MsgService, JwtStrategy],
})
export class MsgModule {}
