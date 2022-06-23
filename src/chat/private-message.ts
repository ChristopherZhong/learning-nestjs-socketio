import { Type } from 'class-transformer';
import { IsObject, IsString, ValidateNested } from 'class-validator';
import { User } from '../user/user';

export class PrivateMessage {
  @IsObject()
  @ValidateNested()
  @Type(() => User)
  from!: User;

  @IsObject()
  @ValidateNested()
  @Type(() => User)
  to!: User;

  @IsString()
  text!: string;
}
