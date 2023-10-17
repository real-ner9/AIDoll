import { Injectable } from '@nestjs/common';
import { ChatActionsService } from '../bot-chat/chat-actions.service';
import { Telegraf } from 'telegraf';
import { UserService } from '../bot-users/user.service';
import * as process from 'process';
import { UserState } from '../bot-users/types/user-state';
import { ProfileMatchActionsService } from '../profile-match/profile-match-actions.service';
import { UserActionsService } from '../bot-users/user-actions.service';

@Injectable()
export class BotService {
  bot: Telegraf;
  constructor(
    private readonly chatActionsService: ChatActionsService,
    private readonly userService: UserService,
    private readonly profileMatchActionsService: ProfileMatchActionsService,
    private readonly userActionsService: UserActionsService,
  ) {
    process.env.TZ = 'Europe/Moscow';
    process.on('unhandledRejection', (reason) => {
      console.error('Unhandled Promise Rejection:', reason);
    });

    process.on('uncaughtException', (error) => {
      console.error('Uncaught Exception:', error);
    });

    this.bot = new Telegraf(process.env.BOT_TOKEN);

    this.bot.use(async (ctx, next) => {
      const userId = ctx.from.id.toString();
      if (userId) {
        // прокидываем userState в контекст, чтобы потом фильтровать где и что вводить пользователь
        try {
          const user = await this.userService.getUserFromCacheOrDB(userId);
          if (user?.isBlocked) {
            await this.userService.unblockUser(userId);
          }
          ctx.state.userState = await this.userService.getUserState(userId);
        } catch (e) {
          console.error('getUserStateFromDB error: ', e.message);
        }
      }
      return next();
    });

    this.chatActionsService.init(this.bot);
    this.profileMatchActionsService.init(this.bot);
    this.userActionsService.init(this.bot);

    this.bot
      .on('message', async (ctx) => {
        switch (ctx.state.userState) {
          case UserState.QUICK_SEARCH:
          case UserState.IN_CHAT:
            await this.chatActionsService.onSendMessage(ctx);
            break;
          case UserState.FILLING_AGE:
          case UserState.FILLING_DESCRIPTION:
          case UserState.FILLING_ROLE:
          case UserState.FILLING_PHOTO:
          case UserState.FILLING_NAME:
            await this.userActionsService.onSendMessage(ctx);
            break;
          default:
            await this.chatActionsService.onSendMessage(ctx);
            console.log('message invalid');
        }
      })
      .catch(async (err, ctx) => {
        await this.handleBotEventError('message error: ', err, ctx);
      });

    this.bot.launch().catch((err) => {
      console.error('launch error: ', err);
    });
  }

  async handleBotEventError(event: string, err: any, ctx) {
    console.error(`${event}: `, err.message);

    if (err.code === 403) {
      // код ошибки для "заблокированного пользователя"
      const userId = ctx?.from?.id.toString();
      if (userId) {
        try {
          // await this.userService.blockUser(userId);
        } catch (err) {
          console.error('chat-actions error: ', err.message);
        }
      }
    }
  }
}
