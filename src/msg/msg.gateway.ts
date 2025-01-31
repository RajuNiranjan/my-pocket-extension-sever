// import {
//   MessageBody,
//   OnGatewayConnection,
//   OnGatewayDisconnect,
//   SubscribeMessage,
//   WebSocketGateway,
//   WebSocketServer,
// } from '@nestjs/websockets';
// import { Server, Socket } from 'socket.io';
// import { MsgService } from './msg.service';

// @WebSocketGateway()
// export class MsgGateWay implements OnGatewayConnection, OnGatewayDisconnect {
//   @WebSocketServer()
//   server: Server;

//   private clients: Map<string, string> = new Map();

//   constructor(private readonly msgService: MsgService) {}

//   async handleConnect(client: Socket) {
//     console.log(`new user connected ${client.id}`);

//     const userId = client.handshake.query.userId as string;

//     if (!userId) {
//       console.log(`Disconneting client ${client.id} due to missing userId`);
//       client.disconnect();
//       return;
//     }

//     this.clients.set(client.id, userId);

//     console.log(`User ${userId} connected with socket ${client.id}`);
//   }

//   async handleDisconnect(client: Socket) {
//     const userId = this.clients.get(client.id);

//     console.log(`Client disconnected: ${client.id}, User: ${userId}`);

//     this.clients.delete(client.id);
//   }

//   @SubscribeMessage('sendMessage')
//   async hanldeSentMsg(
//     @MessageBody()
//     data: {
//       senderId: string;
//       receiverId: string;
//       message: string;
//     },
//   ) {
//     const { message, receiverId, senderId } = data;

//     if (!senderId || !receiverId || !message) {
//       return { status: 'error', message: 'Invalid message data' };
//     }

//     const saveMessage = await this.msgService.sendMessage(
//       senderId,
//       receiverId,
//       { message },
//     );

//     const receiverSocket = Array.from(this.clients.entries()).find(
//       ([, userId]) => userId === receiverId,
//     );

//     if (receiverSocket) {
//       this.server.to(receiverSocket[0]).emit('newMessage', saveMessage);
//     }

//     this.server.to(receiverSocket?.[0] || '').emit('messageSent', saveMessage);

//     return { status: 'success', message: 'message sent', data: saveMessage };
//   }
// }

import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MsgService } from './msg.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class MsgGateWay implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private clients: Map<string, string> = new Map();

  constructor(private readonly msgService: MsgService) {}

  async handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);

    const userId = client.handshake.query.userId as string;

    if (!userId) {
      console.log(`Disconnecting client ${client.id} due to missing userId`);
      client.disconnect();
      return;
    }

    this.clients.set(client.id, userId);
    console.log(`User ${userId} connected with socket ${client.id}`);
  }

  async handleDisconnect(client: Socket) {
    const userId = this.clients.get(client.id);
    console.log(`Client disconnected: ${client.id}, User: ${userId}`);
    this.clients.delete(client.id);
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @MessageBody()
    data: {
      senderId: string;
      receiverId: string;
      message: string;
    },
  ) {
    const { senderId, receiverId, message } = data;

    if (!senderId || !receiverId || !message) {
      return { status: 'error', message: 'Invalid message data' };
    }

    try {
      // Save message to database
      const savedMessage = await this.msgService.sendMessage(
        senderId,
        receiverId,
        { message },
      );

      // Find receiver's socket
      const receiverSocketId = Array.from(this.clients.entries()).find(
        ([, userId]) => userId === receiverId,
      )?.[0];

      // Emit to receiver if online
      if (receiverSocketId) {
        this.server.to(receiverSocketId).emit('newMessage', savedMessage);
      }

      // Find sender's socket
      const senderSocketId = Array.from(this.clients.entries()).find(
        ([, userId]) => userId === senderId,
      )?.[0];

      // Emit to sender
      if (senderSocketId) {
        this.server.to(senderSocketId).emit('newMessage', savedMessage);
      }

      return { status: 'success', message: 'Message sent', data: savedMessage };
    } catch (error) {
      console.error('Error handling message:', error);
      return { status: 'error', message: 'Failed to send message' };
    }
  }

  @SubscribeMessage('getMessages')
  async handleGetMessages(
    @MessageBody() data: { senderId: string; receiverId: string },
  ) {
    const { senderId, receiverId } = data;
    const messages = await this.msgService.getConversationMsgs(
      senderId,
      receiverId,
    );
    return { status: 'success', data: messages };
  }
}
