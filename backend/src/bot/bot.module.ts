import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { RoomsService } from './room.service';
import { BotActionsService } from './bot-actions.service';
import { MessageService } from './message.service';

@Module({
  providers: [BotService, RoomsService, BotActionsService, MessageService],
})
export class BotModule {}
