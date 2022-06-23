import { Type } from 'class-transformer';
import { IsObject, IsString, ValidateNested } from 'class-validator';
import { User } from '../user/user';

export class ChatMessage {
  @IsObject()
  @ValidateNested()
  @Type(() => User)
  sender!: User;

  @IsString()
  text!: string;
}
