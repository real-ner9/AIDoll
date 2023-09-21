import { Module } from '@nestjs/common';
import { ProfileMatchActionsService } from './profile-match-actions.service';
import { BotUsersModule } from '../bot-users/bot-users.module';

@Module({
  providers: [ProfileMatchActionsService],
  exports: [ProfileMatchActionsService],
  imports: [BotUsersModule],
})
export class ProfileMatchModule {}
