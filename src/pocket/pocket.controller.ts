import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { PocketService } from './pocket.service';
import { JwtAuthGuard } from 'src/middlewares/jwtAuthGuard';

@Controller('pocket')
export class PocketController {
  constructor(private readonly pocketService: PocketService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  GetAllPocketItems(@Req() req: any) {
    return this.pocketService.getAllPocketItems(req.user);
  }
}
