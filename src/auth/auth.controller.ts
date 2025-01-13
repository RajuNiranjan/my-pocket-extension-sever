import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from 'src/dto/Auth/SignUp.dto';
import { LogInDto } from 'src/dto/Auth/LogIn.dto';
import { JwtAuthGuard } from 'src/middlewares/jwtAuthGuard';
import { UpdateProfileDto } from 'src/dto/Auth/UpdateProfile.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  SignUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signup(signUpDto);
  }

  @Post('/login')
  LogIn(@Body() logInDto: LogInDto): Promise<{ token: string }> {
    return this.authService.login(logInDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  Me(@Req() req: any) {
    return this.authService.me(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/update')
  UpdateProfile(@Req() req: any, @Body() updateProfileDto: UpdateProfileDto) {
    return this.authService.updateProfile(req.user, updateProfileDto);
  }
}
