import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PocketService } from './pocket.service';
import { JwtAuthGuard } from 'src/middlewares/jwtAuthGuard';
import { CreatePocketDto } from 'src/dto/Pocket/CreatePocket.dto';
import { UpdatePocketDto } from 'src/dto/Pocket/UpdatePocket.dto';

@Controller('pocket')
export class PocketController {
  constructor(private readonly pocketService: PocketService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllPocketItems(@Req() req: any) {
    const userId = req.user;
    if (!userId) {
      throw new Error('User ID is not available in the request.');
    }
    return await this.pocketService.getAllPocketItems(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':userId')
  CreatePocketItem(
    @Param('userId') userId: string,
    @Body() createPocketDto: CreatePocketDto,
  ) {
    return this.pocketService.createPocketItem(userId, createPocketDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':pocketItemId')
  async updatePocketItem(
    @Req() req: any,
    @Param('pocketItemId') pocketItemId: string,
    @Body() updatePocketDto: UpdatePocketDto,
  ) {
    const userId = req.user;
    return await this.pocketService.updatePocketItem(
      userId,
      pocketItemId,
      updatePocketDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':pocketItemId')
  async deletePocketItem(
    @Req() req: any,
    @Param('pocketItemId') pocketItemId: string,
  ) {
    const userId = req.user;
    if (!userId) {
      throw new NotFoundException('User ID is not available in the request.');
    }
    return await this.pocketService.deletePocketItem(userId, pocketItemId);
  }
}
