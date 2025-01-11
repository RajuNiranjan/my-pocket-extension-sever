import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'must be a valid email' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,15}$/, {
    message:
      'Password must be 6-15 characters long, contain at least one uppercase letter, one number, and one special character.',
  })
  password: string;

  @IsString()
  @IsOptional()
  profilePic: string;
}
