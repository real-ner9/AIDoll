import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class RoomsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  users: { [key: string]: string } = {};

  handleConnection(socket: Socket) {
    // TODO разобраться с типом на строчке ниже
    const userId = socket.handshake.query.userId as string;
    this.users[socket.id] = userId;
  }

  handleDisconnect(socket: Socket) {
    delete this.users[socket.id];
  }

  getOtherUserIdInRoom(
    roomNumber: string,
    currentUserId: string,
  ): string | undefined {
    const userIdsInRoom = Object.values(this.users).filter(
      (userId) => userId !== currentUserId,
    );
    return userIdsInRoom[0]; // Возвращает первого другого пользователя в комнате
  }

  getSocketIdByUserId(userId: string): string | undefined {
    return Object.entries(this.users).find(([, id]) => id === userId)?.[0];
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
    const { roomNumber, userId } = data;

    const currentUsersInRoom = Object.values(this.users).filter(
      (id) => id !== userId,
    );
    if (currentUsersInRoom.length >= 2) {
      this.server.to(userId).emit('roomIsFool', { userId });
      return;
    }

    // Оповещаем другого пользователя о присоединении
    const otherUserId = this.getOtherUserIdInRoom(roomNumber, userId);
    const otherSocketId = this.getSocketIdByUserId(otherUserId);
    if (otherSocketId) {
      this.server.to(otherSocketId).emit('userJoined', { userId });
    }

    // Присоединяем сокет к комнате
    socket.join(roomNumber);
  }

  // @SubscribeMessage('message')
  // handleMessage(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
  //   // Обработка и отправка сообщения
  // }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
    const userId = this.users[socket.id];
    if (userId) {
      // Отправить уведомление о выходе из комнаты другому пользователю
      delete this.users[socket.id];
    }
  }
}
