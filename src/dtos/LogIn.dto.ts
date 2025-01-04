import { IsNotEmpty } from 'class-validator';

export class LogInDto {
  @IsNotEmpty()
  emailOrUserName: string;

  @IsNotEmpty()
  password: string;
}
