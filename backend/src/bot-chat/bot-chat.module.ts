import { Module } from '@nestjs/common';
import { RoomsService } from './room.service';
import { MessageService } from './message.service';
import { BotUsersModule } from '../bot-users/bot-users.module';
import { ChatActionsService } from './chat-actions.service';

@Module({
  providers: [RoomsService, MessageService, ChatActionsService],
  // Возможно, потребуется импортировать UserModule, если сервисы комнат чата взаимодействуют с UserService
  imports: [BotUsersModule],
  exports: [RoomsService, ChatActionsService],
})
export class BotChatModule {}
