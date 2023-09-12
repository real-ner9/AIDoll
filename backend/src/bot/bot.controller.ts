import { Controller, Get } from '@nestjs/common';
import { UserService } from '../bot-users/user.service';

@Controller('bot')
export class BotController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getHello(): Promise<string> {
    try {
      const statistic = `
      Всего пользователей: ${(await this.userService.countUsers()).all}<br>
      Всего пользователей, которые сейчас ищут комнату: ${
        (await this.userService.countUsers()).activeRoom
      }<br>
      Всего пользователей, которые сейчас в чате: ${
        (await this.userService.countUsers()).currentPartner
      }<br>
    `;
      return statistic;
    } catch (e) {
      return 'Что-то пошло не так';
    }
  }
}
