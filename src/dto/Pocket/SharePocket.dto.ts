import { IsNotEmpty, IsString } from "class-validator";

export class SharePocketDto {
  @IsString()
  @IsNotEmpty()
  receiverId: string;

  @IsString()
  @IsNotEmpty()
  pocketItemId: string;
}
