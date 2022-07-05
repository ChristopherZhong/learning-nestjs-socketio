import { Type } from 'class-transformer';
import { IsObject, ValidateNested } from 'class-validator';
import { User } from '../user/user';
import { ChatMessage } from './chat-message';

export class PrivateMessage extends ChatMessage {
  @IsObject()
  @ValidateNested()
  @Type(() => User)
  to!: User;
}
