import { Module } from '@nestjs/common';
import { RoomsService } from './room.service';
import { MessageService } from './message.service';
import { BotUsersModule } from '../bot-users/bot-users.module';
import { BotActionsService } from './bot-actions.service';

@Module({
  providers: [RoomsService, MessageService, BotActionsService],
  // Возможно, потребуется импортировать UserModule, если сервисы комнат чата взаимодействуют с UserService
  imports: [BotUsersModule],
  exports: [RoomsService, BotActionsService],
})
export class BotChatModule {}
