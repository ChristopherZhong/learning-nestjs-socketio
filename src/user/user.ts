import { IsBoolean, IsString } from 'class-validator';

export class User {
  @IsString()
  socketID: string;

  @IsString()
  username: string;

  @IsBoolean()
  connected: boolean;

  constructor(socketID: string, username: string, connected = true) {
    this.socketID = socketID;
    this.username = username;
    this.connected = connected;
  }
}
