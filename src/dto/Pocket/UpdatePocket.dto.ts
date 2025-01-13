import { IsString, IsOptional, IsArray, ArrayUnique } from 'class-validator';

export class UpdatePocketDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  pocket_userName?: string;

  @IsString()
  @IsOptional()
  pocket_password?: string;

  @IsArray()
  @ArrayUnique()
  @IsOptional()
  images?: string[];
}
