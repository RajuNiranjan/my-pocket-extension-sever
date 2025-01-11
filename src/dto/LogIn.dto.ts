import { IsNotEmpty, IsString } from 'class-validator';

export class LogInDto {
  @IsNotEmpty()
  @IsString()
  userNameOrEmail: string;

  @IsString()
  password: string;
}
