npm install @nestjs/websockets @nestjs/platform-socket.io socket.io

```import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { SendMessageDto } from 'src/dto/Message/SendMessage.dto';

@Injectable()
@WebSocketGateway({
  cors: {
    origin: '*', // Allow requests from all origins (adjust for security in production)
  },
})
export class MessagesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private readonly messagesService: MessagesService) {}

  private connectedUsers = new Map<string, Socket>();

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    if (userId) {
      this.connectedUsers.set(userId, client);
      console.log(`User connected: ${userId}`);
    }
  }

  handleDisconnect(client: Socket) {
    const userId = [...this.connectedUsers.entries()]
      .find(([_, socket]) => socket.id === client.id)?.[0];

    if (userId) {
      this.connectedUsers.delete(userId);
      console.log(`User disconnected: ${userId}`);
    }
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(client: Socket, payload: { senderId: string; receiverId: string; message: string }) {
    const { senderId, receiverId, message } = payload;

    // Save the message to the database
    const newMessage = await this.messagesService.sendMessage(senderId, receiverId, { message });

    // Emit the message to the sender and receiver if connected
    const receiverSocket = this.connectedUsers.get(receiverId);
    if (receiverSocket) {
      receiverSocket.emit('newMessage', newMessage);
    }

    client.emit('newMessage', newMessage);

    return newMessage;
  }

  @SubscribeMessage('getAllMessages')
  async handleGetAllMessages(client: Socket, payload: { senderId: string; receiverId: string }) {
    const { senderId, receiverId } = payload;

    const messages = await this.messagesService.getAllMessages(senderId, receiverId);

    client.emit('allMessages', messages);

    return messages;
  }
}
```
