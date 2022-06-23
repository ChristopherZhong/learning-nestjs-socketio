import { ChatMessage } from './chat-message';
import { User } from '../user/user';
import { PrivateMessage } from './private-message';

export type ListenEvents = Record<string, never>;

export interface EmitEvents {
  'chat message': (message: ChatMessage) => void;
  'private message': (message: PrivateMessage) => void;
  'user connected': (user: User) => void;
  'user disconnected': (user: User) => void;
  users: (users: User[]) => void;
}

export type ServerSideEvents = Record<string, never>;
