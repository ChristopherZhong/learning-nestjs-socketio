import { UsePipes, ValidationPipe } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatMessage } from './chat-message';
import { User } from '../user/user';
import { PrivateMessage } from './private-message';
import { EmitEvents, ListenEvents, ServerSideEvents } from './events';

type ChatServer = Server<ListenEvents, EmitEvents, ServerSideEvents>;
type ChatSocket = Socket<ListenEvents, EmitEvents, ServerSideEvents>;

@WebSocketGateway()
@UsePipes(ValidationPipe)
export class ChatGateway implements OnGatewayInit<ChatServer> {
  @WebSocketServer()
  server!: ChatServer;

  afterInit(server: ChatServer) {
    function onConnect(socket: ChatSocket) {
      const user = new User(socket.id, socket.handshake.auth.username);
      console.log('user connected:', user);
      socket.broadcast.emit('user connected', user);

      function onDisconnect(reason: string) {
        console.log('user disconnected:', user, reason);
        user.connected = false;
        socket.broadcast.emit('user disconnected', user);
      }
      socket.on('disconnect', onDisconnect);

      function getUsers() {
        const users = [];
        for (const [
          id,
          {
            handshake: {
              auth: { username },
            },
          },
        ] of server.of('/').sockets) {
          users.push(new User(id, username));
        }
        return users;
      }
      socket.emit('users', getUsers());
    }
    server.on('connection', onConnect);
  }

  @SubscribeMessage('chat message')
  handleChatMessage(
    @MessageBody() message: ChatMessage,
    @ConnectedSocket() socket: ChatSocket,
  ) {
    console.log('message:', message);
    const includeSelf = false;
    if (includeSelf) {
      this.server.emit('chat message', message);
    } else {
      socket.broadcast.emit('chat message', message);
    }
    return { status: 'chat message received', message: message };
  }

  @SubscribeMessage('private message')
  handlePrivateMessage(
    @MessageBody() message: PrivateMessage,
    @ConnectedSocket() socket: ChatSocket,
  ) {
    console.log('private message', message);
    socket.to(message.to.socketID).emit('private message', message);
    return { status: 'private message received', message: message };
  }
}
