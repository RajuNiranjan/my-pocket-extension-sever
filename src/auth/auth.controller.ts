import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from 'src/dtos/SignUp.dto';
import { LogInDto } from 'src/dtos/LogIn.dto';

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
}
