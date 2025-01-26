import { IsMongoId, IsNotEmpty, IsString, isString } from 'class-validator';

export class SendMsgDto {
  @IsNotEmpty()
  @IsMongoId()
  senderId: string;

  @IsNotEmpty()
  @IsMongoId()
  receiverId: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}
