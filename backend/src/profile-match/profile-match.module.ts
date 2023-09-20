import { Module } from '@nestjs/common';
import { ProfileMatchActionsService } from './profile-match-actions.service';

@Module({
  providers: [ProfileMatchActionsService],
  exports: [ProfileMatchActionsService],
})
export class ProfileMatchModule {}
