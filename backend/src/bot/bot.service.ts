import { Injectable } from '@nestjs/common';
import { BotActionsService } from '../bot-chat/bot-actions.service';

@Injectable()
export class BotService {
  constructor(private readonly botActionsService: BotActionsService) {
    this.botActionsService.init();
  }
}
