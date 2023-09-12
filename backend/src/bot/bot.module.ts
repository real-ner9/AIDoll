import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotController } from './bot.controller';
import { BotUsersModule } from '../bot-users/bot-users.module';
import { BotChatModule } from '../bot-chat/bot-chat.module';

@Module({
  providers: [BotService],
  controllers: [BotController],
  imports: [BotUsersModule, BotChatModule],
})
export class BotModule {}
