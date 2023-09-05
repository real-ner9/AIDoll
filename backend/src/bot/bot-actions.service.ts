import { Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { Markup } from 'telegraf';
import { I18nService } from 'nestjs-i18n';
import { MessageService } from './message.service';
import { RoomsService } from './room.service';
import { UserService } from './user.service';

async function safeExecute(fn: Function, ctx, ...args: any[]) {
  try {
    await fn(ctx, ...args);
  } catch (error) {
    console.error('An error:', error);
    ctx
      .reply(
        `Кажется, что-то пошло не так...\nПо вопросам работы сервиса пиши в чат @govirtchat`,
        this.getFindPartnerKeyboard(),
      )
      .catch((err) => console.log(err));
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
    private readonly userService: UserService,
  ) {}

  init(): void {
    this.bot = new Telegraf(process.env.BOT_TOKEN);

    this.bot.catch((err) => {
      console.error('bot error: ', err);
    });

    this.bot
      .start(async (ctx) => {
        try {
          await safeExecute(this.onBotStart.bind(this), ctx);
        } catch (e) {
          console.error(e);
        }
      })
      .catch((err) => {
        console.error('bot error: ', err);
      });
    this.bot
      .hears('/restart', async (ctx) => {
        try {
          await safeExecute(this.onBotRestart.bind(this), ctx);
        } catch (e) {
          console.error(e);
        }
      })
      .catch((err) => {
        console.error('bot error: ', err);
      });
    this.bot
      .hears('/find', async (ctx) => {
        try {
          await safeExecute(this.onFindPartner.bind(this), ctx);
        } catch (e) {
          console.error(e);
        }
      })
      .catch((err) => {
        console.error('bot error: ', err);
      });
    this.bot
      .hears('/stop', async (ctx) => {
        try {
          await safeExecute(this.onStopSearch.bind(this), ctx);
        } catch (e) {
          console.error(e);
        }
      })
      .catch((err) => {
        console.error('bot error: ', err);
      });
    this.bot
      .hears('/change', async (ctx) => {
        try {
          await safeExecute(this.onChangePartner.bind(this), ctx);
        } catch (e) {
          console.error(e);
        }
      })
      .catch((err) => {
        console.error('bot error: ', err);
      });
    this.bot
      .hears('/end', async (ctx) => {
        try {
          await safeExecute(this.onEndChat.bind(this), ctx);
        } catch (e) {
          console.error(e);
        }
      })
      .catch((err) => {
        console.error('bot error: ', err);
      });
    this.bot
      .on('message', async (ctx) => {
        try {
          await this.messageService.forwardMessage(this.bot, ctx);
        } catch (error) {
          console.error('An error occurred while forwarding a message:', error);
          ctx
            .reply(
              `Кажется, что-то пошло не так...\nПо вопросам работы сервиса пишите в чат @govirtchat`,
              this.getFindPartnerKeyboard(),
            )
            .catch((err) => console.log(err));
          return;
        }
      })
      .catch((err) => {
        console.error('bot error: ', err);
      });

    this.bot
      .action('find_partner', async (ctx) => {
        try {
          await safeExecute(this.onFindPartner.bind(this), ctx);
        } catch (e) {
          console.error(e);
        }
      })
      .catch((err) => {
        console.error('bot error: ', err);
      });
    this.bot
      .action('stop_search', async (ctx) => {
        try {
          await safeExecute(this.onStopSearch.bind(this), ctx);
        } catch (e) {
          console.error(e);
        }
      })
      .catch((err) => {
        console.error('bot error: ', err);
      });
    this.bot
      .action('change_partner', async (ctx) => {
        try {
          await safeExecute(this.onChangePartner.bind(this), ctx);
        } catch (e) {
          console.error(e);
        }
      })
      .catch((err) => {
        console.error('bot error: ', err);
      });
    this.bot
      .action('end_chat', async (ctx) => {
        try {
          await safeExecute(this.onEndChat.bind(this), ctx);
        } catch (e) {
          console.error(e);
        }
      })
      .catch((err) => {
        console.error('bot error: ', err);
      });

    this.bot.launch().catch((err) => {
      console.error('bot error: ', err);
    });
  }

  async onBotStart(ctx): Promise<void> {
    await this.onEndChat(ctx, false);
    ctx
      .reply(
        this.i18n.t('events.welcome', { lang: this.lang }),
        this.getFindPartnerKeyboard(),
      )
      .catch((err) => console.log(err));
  }

  async onBotRestart(ctx): Promise<void> {
    await this.onEndChat(ctx, false);
    ctx
      .reply(
        this.i18n.t('events.botRestarted', { lang: this.lang }),
        this.getFindPartnerKeyboard(),
      )
      .catch((err) => console.log(err));
  }

  async onFindPartner(ctx): Promise<void> {
    await this.onEndChat(ctx, false);
    await ctx
      .reply(
        this.i18n.t('events.searchPartner', { lang: this.lang }),
        this.getStopSearchKeyboard(),
      )
      .catch((err) => console.log(err));
    await this.findPartner(ctx);
  }

  async onStopSearch(ctx): Promise<void> {
    await this.onEndChat(ctx, false);
    ctx
      .reply(
        this.i18n.t('events.stopPartnerSearch', { lang: this.lang }),
        this.getFindPartnerKeyboard(),
      )
      .catch((err) => console.log(err));
    await this.stopSearch(ctx);
  }

  getFindPartnerKeyboard(): any {
    return Markup.inlineKeyboard([
      Markup.button.callback(
        this.i18n.t('events.findPartner', { lang: this.lang }),
        'find_partner',
      ),
    ]);
  }

  getStopSearchKeyboard(): any {
    return Markup.inlineKeyboard([
      Markup.button.callback(
        this.i18n.t('events.stopSearch', { lang: this.lang }),
        'stop_search',
      ),
    ]);
  }

  async findPartner(ctx): Promise<void> {
    const userId = ctx.from.id.toString();
    let room = this.roomsService.findSingleUserRoom(
      userId,
      this.userService.getPastPartners(userId),
    );

    if (room) {
      room = this.roomsService.addUserToRoom(userId, room);
      this.userService.setActiveRoom(userId, room.id);

      // Клавиатура с двумя кнопками
      const partnerChatKeyboard = Markup.inlineKeyboard([
        Markup.button.callback(
          this.i18n.t('events.changePartner', { lang: this.lang }),
          'change_partner',
        ),
        Markup.button.callback(
          this.i18n.t('events.endChat', { lang: this.lang }),
          'end_chat',
        ),
      ]);

      ctx
        .reply(
          this.i18n.t('events.connectedWithPartner', { lang: this.lang }),
          partnerChatKeyboard,
        )
        .catch((err) => console.log(err));

      const partnerId = room.users.find((u) => u !== userId);
      this.userService.setActiveRoom(partnerId, room.id);
      this.userService.setCurrentPartner(userId, partnerId);
      this.userService.setCurrentPartner(partnerId, userId);

      this.bot.telegram
        .sendMessage(
          partnerId,
          this.i18n.t('events.connectedWithPartner', { lang: this.lang }),
          partnerChatKeyboard,
        )
        .then()
        .catch((error) => {
          console.error('An error:', error);
          ctx
            .reply(
              `Кажется, что-то пошло не так...\nПо вопросам работы сервиса пиши в чат @govirtchat`,
              this.getFindPartnerKeyboard(),
            )
            .catch((err) => console.log(err));
        });
    } else {
      room = this.roomsService.createRoom(userId);
      this.userService.setActiveRoom(userId, room.id);
      this.notificationOtherUsers(userId);
    }
  }

  async onEndChat(ctx, showKeyboard = true): Promise<void> {
    const userId = ctx.from.id.toString();
    const room = this.roomsService.findRoomByUserId(userId);

    if (room && room.active) {
      const partnerId = room.users.find((u) => u !== userId);
      if (partnerId) {
        this.userService.setCurrentPartner(partnerId, null);
        this.userService.addPastPartner(userId, partnerId);
        this.userService.addPastPartner(partnerId, userId);
        this.userService.setActiveRoom(partnerId, null);
        this.roomsService.deactivateRoom(room);
        this.bot.telegram
          .sendMessage(
            partnerId,
            this.i18n.t('events.chatEnded', { lang: this.lang }),
            this.getFindPartnerKeyboard(),
          )
          .then()
          .catch((error) => {
            console.error('An error:', error);
            ctx.reply(
              `Кажется, что-то пошло не так...\nПо вопросам работы сервиса пиши в чат @govirtchat`,
              this.getFindPartnerKeyboard(),
            );
          });
      }
    }

    this.userService.setCurrentPartner(userId, null);
    this.userService.setActiveRoom(userId, null);
    if (showKeyboard) {
      ctx
        .reply(
          this.i18n.t('events.chatEnded', { lang: this.lang }),
          this.getFindPartnerKeyboard(),
        )
        .catch((err) => console.log(err));
    }
  }

  async stopSearch(ctx): Promise<void> {
    const userId = ctx.from.id.toString();
    const room = this.roomsService.findRoomByUserId(userId);

    room && this.roomsService.deactivateRoom(room);
  }

  async onChangePartner(ctx): Promise<void> {
    await this.onEndChat(ctx, false);
    await this.onFindPartner(ctx);
  }

  async notificationOtherUsers(userId: string) {
    // Защита от флуда
    const TEN_MINUTES = 10 * 60 * 1000; // 10 минут в миллисекундах
    const lastSearchTimestamp = this.userService.getLastSearchTimestamp(userId);
    const timeSinceLastSearch = Date.now() - lastSearchTimestamp;
    if (lastSearchTimestamp && timeSinceLastSearch <= TEN_MINUTES) {
      return;
    }

    this.userService.setLastSearchTimestamp(userId);
    // Получаем всех пользователей, которые не в комнате и не в чате
    const usersWithoutRoom = Object.keys(this.userService.users).filter(
      (partnerId) =>
        !this.userService.getActiveRoom(partnerId) &&
        !this.userService.getCurrentPartner(partnerId) &&
        // Добавляем проверку, что userId не в pastPartners
        !this.userService.getPastPartners(partnerId).includes(userId),
    );

    const THIRTY_MINUTES = 30 * 60 * 1000; // 30 минут в миллисекундах
    usersWithoutRoom.forEach((userId) => {
      const lastNotificationTimestamp =
        this.userService.getLastNotificationTimestamp(userId);
      const timeSinceLastNotification = Date.now() - lastNotificationTimestamp;
      if (
        lastNotificationTimestamp &&
        timeSinceLastNotification <= THIRTY_MINUTES
      ) {
        return;
      }

      this.userService.setLastNotificationTimestamp(userId);

      this.bot.telegram
        .sendMessage(
          userId,
          'Кто-то начал поиск. Начинай скорее поиск, чтобы присоединиться! 👇',
          this.getFindPartnerKeyboard(),
        )
        .catch((error) => {
          console.error('Failed to send message:', error);
        });
    });
  }
}
