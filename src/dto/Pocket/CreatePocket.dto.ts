import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  ArrayUnique,
} from 'class-validator';

export class CreatePocketDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsArray()
  @ArrayUnique()
  @IsOptional()
  images?: string[];
}
