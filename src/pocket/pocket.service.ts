import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePocketDto } from 'src/dto/Pocket/CreatePocket.dto';
import { UpdatePocketDto } from 'src/dto/Pocket/UpdatePocket.dto';
import { Pocket } from 'src/models/pocket.model';

@Injectable()
export class PocketService {
  constructor(
    @InjectModel(Pocket.name) private readonly pocketModel: Model<Pocket>,
  ) {}

  async getAllPocketItems(userId: string) {
    return await this.pocketModel.find({
      $or: [
        { userId },
        { sharedWith: userId },
      ],
    }).exec();
  }

  async createPocketItem(userId: string, createPocketDto: CreatePocketDto) {
    const { pocket_password, pocket_userName, title, description, images } =
      createPocketDto;

    const newPocketItem = new this.pocketModel({
      userId,
      pocket_password,
      pocket_userName,
      title,
      description,
      images,
      sharedWith: [],
    });

    return await newPocketItem.save();
  }

  async updatePocketItem(
    userId: string,
    pocketItemId: string,
    updatePocketDto: UpdatePocketDto,
  ) {
    const pocketItem = await this.pocketModel.findOne({
      _id: pocketItemId,
      userId,
    });

    if (!pocketItem) {
      throw new NotFoundException('Pocket item not found ');
    }

    Object.assign(pocketItem, updatePocketDto);
    return await pocketItem.save();
  }

  async deletePocketItem(userId: string, pocketItemId: string) {
    const pocketItem = await this.pocketModel.findOne({
      _id: pocketItemId,
      userId,
    });

    if (!pocketItem) {
      throw new NotFoundException(
        'Pocket item not found or you do not have permission to delete it.',
      );
    }

    await this.pocketModel.deleteOne({ _id: pocketItemId, userId });

    return { message: 'Pocket item deleted successfully' };
  }

  async findPocketItemsByTitle(title: string) {
    const items = await this.pocketModel
      .find({ title: { $regex: title, $options: 'i' } })
      .exec();

    if (!items || items.length === 0) {
      throw new NotFoundException(`No items found matching "${title}"`);
    }

    return items;
  }

  async sharePocketItem(senderId: string, receiverId: string, pocketItemId: string) {
    const originalPocket = await this.pocketModel.findOne({
      _id: pocketItemId,
      userId: senderId,
    });

    if (!originalPocket) {
      throw new NotFoundException('Pocket item not found');
    }

    originalPocket.sharedWith = [...(originalPocket.sharedWith || []), receiverId];
    return await originalPocket.save();
  }

  async getSharedPocketItems(userId: string) {
    return await this.pocketModel.find({ sharedWith: userId }).exec();
  }
}
