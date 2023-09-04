import { Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { Markup } from 'telegraf';
import { I18nService } from 'nestjs-i18n';
import { MessageService } from './message.service';
import { RoomsService } from './room.service';

async function safeExecute(fn: Function, ctx, ...args: any[]) {
  try {
    await fn(ctx, ...args);
  } catch (error) {
    console.error('An error occurred:', error);
    ctx.reply('An error occurred, please try again.');
  }
}

@Injectable()
export class BotActionsService {
  lang = 'ru';
  bot: Telegraf;

  constructor(
    private readonly i18n: I18nService,
    private readonly messageService: MessageService,
    private readonly roomsService: RoomsService,
  ) {}

  init(): void {
    this.bot = new Telegraf(process.env.BOT_TOKEN);

    this.bot.start((ctx) => safeExecute(this.onBotStart.bind(this), ctx));
    this.bot.command('restart', (ctx) =>
      safeExecute(this.onBotRestart.bind(this), ctx),
    );
    this.bot.hears(
      this.i18n.t('events.findPartner', { lang: this.lang }),
      (ctx) => safeExecute(this.onFindPartner.bind(this), ctx),
    );
    this.bot.hears(
      this.i18n.t('events.stopSearch', { lang: this.lang }),
      (ctx) => safeExecute(this.onStopSearch.bind(this), ctx),
    );
    this.bot.hears(
      this.i18n.t('events.changePartner', { lang: this.lang }),
      (ctx) => safeExecute(this.onChangePartner.bind(this), ctx),
    );
    this.bot.hears(this.i18n.t('events.endChat', { lang: this.lang }), (ctx) =>
      safeExecute(this.onEndChat.bind(this), ctx),
    );
    this.bot.on('message', (ctx) => {
      try {
        this.messageService.forwardMessage(this.bot, ctx);
      } catch (error) {
        console.error('An error occurred while forwarding a message:', error);
        ctx.reply('An error occurred, please try again.');
      }
    });
    this.bot.launch();
  }

  async onBotStart(ctx): Promise<void> {
    ctx.reply(
      this.i18n.t('events.welcome', { lang: this.lang }),
      this.getFindPartnerKeyboard(),
    );
  }

  async onBotRestart(ctx): Promise<void> {
    ctx.reply(
      this.i18n.t('events.botRestarted', { lang: this.lang }),
      this.getFindPartnerKeyboard(),
    );
  }

  async onFindPartner(ctx): Promise<void> {
    await ctx.reply(
      this.i18n.t('events.searchPartner', { lang: this.lang }),
      this.getStopSearchKeyboard(),
    );
    await this.findPartner(ctx);
  }

  async onStopSearch(ctx): Promise<void> {
    ctx.reply(
      this.i18n.t('events.stopPartnerSearch', { lang: this.lang }),
      this.getFindPartnerKeyboard(),
    );
    await this.stopSearch(ctx);
  }

  getFindPartnerKeyboard(): any {
    return Markup.keyboard([
      [this.i18n.t('events.findPartner', { lang: this.lang })],
    ]).resize();
  }

  getStopSearchKeyboard(): any {
    return Markup.keyboard([
      [this.i18n.t('events.stopSearch', { lang: this.lang })],
    ]).resize();
  }

  async findPartner(ctx): Promise<void> {
    const userId = ctx.from.id.toString();
    let room = this.roomsService.findSingleUserRoom(userId);

    if (room) {
      room = this.roomsService.addUserToRoom(userId, room);

      // Клавиатура с двумя кнопками
      const partnerChatKeyboard = Markup.keyboard([
        [this.i18n.t('events.changePartner', { lang: this.lang })],
        [this.i18n.t('events.endChat', { lang: this.lang })],
      ]).resize();

      ctx.reply(
        this.i18n.t('events.connectedWithPartner', { lang: this.lang }),
        partnerChatKeyboard,
      );

      const partnerId = room.users.find((u) => u !== userId);
      this.bot.telegram.sendMessage(
        partnerId,
        this.i18n.t('events.connectedWithPartner', { lang: this.lang }),
        partnerChatKeyboard,
      );
    } else {
      room = this.roomsService.createRoom(userId);
    }
  }

  async onEndChat(ctx): Promise<void> {
    const userId = ctx.from.id.toString();
    const room = this.roomsService.findRoomByUserId(userId);

    if (room && room.active) {
      const partnerId = room.users.find((u) => u !== userId);
      this.roomsService.deactivateRoom(room);
      ctx.reply(
        this.i18n.t('events.chatEnded', { lang: this.lang }),
        this.getFindPartnerKeyboard(),
      );
      this.bot.telegram.sendMessage(
        partnerId,
        this.i18n.t('events.chatEnded', { lang: this.lang }),
        this.getFindPartnerKeyboard(),
      );
    }
  }

  async stopSearch(ctx): Promise<void> {
    const userId = ctx.from.id.toString();
    const room = this.roomsService.findRoomByUserId(userId);

    room && this.roomsService.deactivateRoom(room);
  }

  async onChangePartner(ctx): Promise<void> {
    await this.onEndChat(ctx);
    await this.onFindPartner(ctx);
  }
}
