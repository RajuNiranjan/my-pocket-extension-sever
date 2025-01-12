import { Module } from '@nestjs/common';
import { PocketController } from './pocket.controller';
import { PocketService } from './pocket.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Pocket, PocketSchema } from 'src/models/pocket.model';
import { JwtStrategy } from 'src/utils/jwtStrategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pocket.name, schema: PocketSchema }]),
  ],
  controllers: [PocketController],
  providers: [PocketService, JwtStrategy],
})
export class PocketModule {}
