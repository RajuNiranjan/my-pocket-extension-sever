import { Module } from '@nestjs/common';
import { PocketController } from './pocket.controller';
import { PocketService } from './pocket.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Pocket, PocketSchema } from 'src/models/pocket.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pocket.name, schema: PocketSchema }]),
  ],
  controllers: [PocketController],
  providers: [PocketService],
})
export class PocketModule {}
