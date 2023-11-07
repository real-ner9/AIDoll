import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { TgUser } from './types/tg-user';
import { ComplaintType } from './schemas/user.complaint.entity';
import { Settings } from './types/settings';
import { UserRole } from './types/user-role';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('authorize')
  async authorize(@Req() req: Request) {
    try {
      const authString = req.headers['authorization'];
      const { id } = this.getUser(authString);
      const user = await this.userService.getUserFromCacheOrDB(id);
      await this.userService.setLastLoginTimestamp(id);

      return user || {};
      // return {};
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('matches')
  async getMatches(@Req() req: Request) {
    try {
      const authString = req.headers['authorization'];
      const { id } = this.getUser(authString);
      return await this.userService.getMatches(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('requests')
  async getRequests(@Req() req: Request) {
    try {
      const authString = req.headers['authorization'];
      const { id } = this.getUser(authString);
      return await this.userService.getRequests(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('feed')
  async getFeed(
    @Req() req: Request,
    @Query('pageSize') pageSize: number = 10,
    @Query('pageNumber') pageNumber: number = 1,
  ) {
    try {
      const authString = req.headers['authorization'];
      const { id } = this.getUser(authString);
      return await this.userService.getFeed(id, pageSize, pageNumber);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('liked-me')
  async getUsersWhoLikedMe(
    @Req() req: Request,
    @Query('pageSize') pageSize: number = 10,
    @Query('pageNumber') pageNumber: number = 1,
  ) {
    try {
      const authString = req.headers['authorization'];
      const { id } = this.getUser(authString);
      return await this.userService.getUsersWhoLikedMe(
        id,
        pageSize,
        pageNumber,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('block')
  async blockUser(
    @Req() req: Request,
    @Body('blockedUserId') blockedUserId: number,
  ) {
    try {
      const authString = req.headers['authorization'];
      const { id } = this.getUser(authString);
      return await this.userService.setBlockByUser(id, blockedUserId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('complain')
  async reportUser(
    @Req() req: Request,
    @Body('reportedUserId') reportedUserId: number,
    @Body('reason') reason: ComplaintType,
  ) {
    try {
      const authString = req.headers['authorization'];
      const { id } = this.getUser(authString);
      return await this.userService.reportUser(id, reportedUserId, reason);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('removeMatch')
  async removeMatch(
    @Req() req: Request,
    @Body('removedUserId') removedUserId: number,
  ) {
    try {
      const authString = req.headers['authorization'];
      const { id } = this.getUser(authString);
      return await this.userService.removeMatch(id, removedUserId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch('settings')
  async updateSettings(@Req() req: Request, @Body() settings: Settings) {
    try {
      const authString = req.headers['authorization'];
      const user = this.getUser(authString);

      // Валидация полей settings
      this.validateSettings(settings);

      const existingUser = await this.userService.getUserFromCacheOrDB(user.id);
      if (existingUser) {
        return await this.userService.updateUser(user.id, settings);
      } else {
        // Поля, которые не могут быть пустыми, должны быть предварительно проверены в методе validateSettings
        return await this.userService.createUser({
          userId: `${user.id}`,
          username: user.username ? `${user.username}` : null,
          ...settings,
        });
      }
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private validateSettings(settings: Settings): void {
    const { name, description, dateOfBirth, role } = settings;

    if (name !== undefined && !name.trim() && name.trim().length >= 30) {
      throw new HttpException(
        'Имя не может быть пустым',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      description !== undefined &&
      !description.trim() &&
      description.trim().length >= 600
    ) {
      throw new HttpException(
        'Описание не может быть пустым',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      dateOfBirth !== undefined &&
      new Date(dateOfBirth).toString() === 'Invalid Date'
    ) {
      throw new HttpException(
        'Некорректная дата рождения',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (role !== undefined && !Object.values(UserRole).includes(role)) {
      throw new HttpException(
        'Некорректная роль пользователя',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  getUser(authString: string): TgUser | null {
    const actualDataString = authString.replace('twa-init-data ', '');
    const data = new URLSearchParams(actualDataString);

    const userData = data.get('user');
    return userData ? JSON.parse(userData) : null;
  }
}
