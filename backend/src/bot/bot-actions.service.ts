import { Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { Markup } from 'telegraf';
import { I18nService } from 'nestjs-i18n';
import { MessageService } from './message.service';
import { RoomsService } from './room.service';

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
    this.bot.start(this.onBotStart.bind(this));
    this.bot.command('restart', this.onBotRestart.bind(this));
    this.bot.hears(
      this.i18n.t('events.findPartner', { lang: this.lang }),
      this.onFindPartner.bind(this),
    );
    this.bot.hears(
      this.i18n.t('events.stopSearch', { lang: this.lang }),
      this.onStopSearch.bind(this),
    );
    this.bot.hears(
      this.i18n.t('events.changePartner', { lang: this.lang }),
      this.onChangePartner.bind(this),
    );

    this.bot.hears(
      this.i18n.t('events.endChat', { lang: this.lang }),
      this.onEndChat.bind(this),
    );

    this.bot.on('message', (ctx) => {
      this.messageService.forwardMessage(this.bot, ctx);
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
