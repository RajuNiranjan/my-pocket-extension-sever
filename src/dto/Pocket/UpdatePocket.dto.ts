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
  content?: string;

  @IsArray()
  @ArrayUnique()
  @IsOptional()
  images?: string[];
}
