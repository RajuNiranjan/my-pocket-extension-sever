import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pocket } from 'src/models/pocket.model';

@Injectable()
export class PocketService {
  constructor(
    @InjectModel(Pocket.name) private readonly pocketModel: Model<Pocket>,
  ) {}

  async getAllPocketItems(userId: string) {
    const pocketItems = await this.pocketModel.find({ userId });
    return pocketItems;
  }
}
