import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { PocketModule } from './pocket/pocket.module';
import { MsgModule } from './msg/msg.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(process.env.DB_URI),
    AuthModule,
    PocketModule,
    MsgModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
