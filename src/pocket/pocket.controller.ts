import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PocketService } from './pocket.service';
import { JwtAuthGuard } from 'src/middlewares/jwtAuthGuard';
import { CreatePocketDto } from 'src/dto/Pocket/CreatePocket.dto';
import { UpdatePocketDto } from 'src/dto/Pocket/UpdatePocket.dto';
import { SharePocketDto } from 'src/dto/Pocket/SharePocket.dto';

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
  @Put(':pocketItemId')
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


  @UseGuards(JwtAuthGuard)
  @Get('search')
  async searchPocketItems(@Query('title') title: string) {
    if (!title) {
      throw new BadRequestException('Search title is required');
    }

    return await this.pocketService.findPocketItemsByTitle(title);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':receiverId/share/:pocketItemId')
  async sharePocketItem(
    @Req() req: any,
    @Param('receiverId') receiverId: string,
    @Param('pocketItemId') pocketItemId: string,
  ) {
  return this.pocketService.sharePocketItem(req.user, receiverId, pocketItemId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('shared')
  async getSharedPocketItems(@Req() req: any) {
    return this.pocketService.getSharedPocketItems(req.user);
  }
}
