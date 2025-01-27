import { IsMongoId, IsNotEmpty, IsString, isString } from 'class-validator';

export class SendMsgDto {
  @IsNotEmpty()
  @IsString()
  message: string;
}
