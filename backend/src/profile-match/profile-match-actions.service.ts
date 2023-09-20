import { Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';

async function safeExecute(fn: Function, ctx, ...args: any[]) {
  try {
    await fn(ctx, ...args);
  } catch (error) {
    console.error('profile-actions SafeExecute error:', error.message);

    // ctx
    //   .reply(
    //     `Кажется, что-то пошло не так...\nПо вопросам работы сервиса пиши в чат @govirtchat`,
    //     this.getFindPartnerKeyboard(),
    //   )
    //   .catch((err) =>
    //     console.error('profile-actions sageExecute error: ', err),
    //   );
  }
}

@Injectable()
export class ProfileMatchActionsService {
  bot: Telegraf;
  init(bot: Telegraf) {
    this.bot = bot;
  }
}
