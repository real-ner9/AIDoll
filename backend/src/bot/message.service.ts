import { Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { RoomsService } from './room.service';

@Injectable()
export class MessageService {
  private MESSAGE_TYPES = {
    text: 'sendMessage',
    sticker: 'sendSticker',
    photo: 'sendPhoto',
    document: 'sendDocument',
    voice: 'sendVoice',
    video: 'sendVideo',
    video_note: 'sendVideoNote',
  };

  constructor(private readonly roomsService: RoomsService) {}

  async forwardMessage(bot: Telegraf, ctx): Promise<void> {
    const userId = ctx.from.id.toString();
    const room = this.roomsService.findRoomByUserId(userId);

    if (room && room.active) {
      const partnerId = room.users.find((u) => u !== userId);
      if (partnerId) {
        const messageType = Object.keys(this.MESSAGE_TYPES).find(
          (type) => ctx.message[type],
        );
        if (messageType) {
          const method = this.MESSAGE_TYPES[messageType];
          let content = ctx.message[messageType];
          if (messageType === 'photo' && Array.isArray(content)) {
            content = content[0];
          }

          bot.telegram[method](partnerId, content.file_id || content);
        }
      }
    }
  }
}
