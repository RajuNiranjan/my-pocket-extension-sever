import { Module } from '@nestjs/common';
import { MsgController } from './msg.controller';
import { MsgService } from './msg.service';
import { JwtStrategy } from 'src/utils/jwtStrategy';
import { MongooseModule } from '@nestjs/mongoose';
import { Msg, MsgSchema } from 'src/models/msg.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Msg.name, schema: MsgSchema }]),
    AuthModule,
  ],
  controllers: [MsgController],
  providers: [MsgService, JwtStrategy],
})
export class MsgModule {}
