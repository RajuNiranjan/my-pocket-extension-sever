import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from 'src/dtos/SignUp.dto';
import { LogInDto } from 'src/dtos/LogIn.dto';
import { JwtAuthGuard } from 'src/lib/JwtAuthGuard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  SignUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signup(signUpDto);
  }

  @Post('/login')
  Login(@Body() logInDto: LogInDto): Promise<{ token: string }> {
    return this.authService.login(logInDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async Me(@Req() req: any) {
    return this.authService.me(req.user);
  }
}
