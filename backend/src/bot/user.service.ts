import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './schemas/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomsService } from './room.service';

export type UserFlag = 'all' | 'activeRoom' | 'currentPartner';

@Injectable()
export class UserService {
  // deleteDelay in minutes
  deleteDelay = 30 * 60 * 1000;

  // Initialize user cache
  userCache: Record<string, User> = {};

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly roomService: RoomsService,
  ) {
    setInterval(async () => {
      this.invalidateCache();
      try {
        await this.removePastPartners();
        await this.disconnectIdlePartners();
      } catch (e) {
        console.error(
          'removePastPartners or disconnectIdlePartners error: ',
          e.message,
        );
      }
    }, this.deleteDelay);
  }

  private async removePastPartners(): Promise<void> {
    const now = Date.now();
    const oneDay = this.deleteDelay;

    const allUsers = await this.userRepository.find();

    for (const user of allUsers) {
      if (now - user.lastCleaned >= oneDay) {
        user.pastPartners = [];
        user.lastCleaned = now;
        await this.userRepository.save(user);
      }
    }
  }

  private invalidateCache() {
    // Invalidate cache every deleteDelay
    this.userCache = {};
  }

  private async getUserFromCacheOrDB(userId: string): Promise<User | null> {
    if (this.userCache[userId]) {
      return this.userCache[userId];
    }
    const user = await this.userRepository.findOne({ where: { userId } });
    if (user) {
      this.updateCache(user);
    }
    return user;
  }

  async setActiveRoom(userId: string, roomId: string): Promise<void> {
    let user = await this.getUserFromCacheOrDB(userId);
    if (!user) {
      user = new User(userId);
      user.pastPartners = [];
    }
    user.activeRoom = roomId;
    await this.userRepository.save(user);
    this.userCache[userId] = user; // Update the cache
  }

  async getLastSearchTimestamp(userId: string): Promise<number | null> {
    const user = await this.getUserFromCacheOrDB(userId);
    return user?.lastSearchTimestamp || null;
  }

  async setLastSearchTimestamp(userId: string): Promise<void> {
    const user = await this.getUserFromCacheOrDB(userId);
    if (user) {
      user.lastSearchTimestamp = Date.now();
      await this.userRepository.save(user);
      this.userCache[userId] = user; // Update the cache
    }
  }

  async getLastNotificationTimestamp(userId: string): Promise<number | null> {
    const user = await this.getUserFromCacheOrDB(userId);
    return user?.lastNotificationTimestamp || null;
  }

  async setLastNotificationTimestamp(userId: string): Promise<void> {
    const user = await this.getUserFromCacheOrDB(userId);
    if (user) {
      user.lastNotificationTimestamp = Date.now();
      await this.userRepository.save(user);
      this.userCache[userId] = user; // Update the cache
    }
  }

  async addPastPartner(userId: string, partnerId: string): Promise<void> {
    let user = await this.getUserFromCacheOrDB(userId);
    if (!user) {
      user = new User(userId);
      user.pastPartners = [];
      user.lastCleaned = Date.now();
      user.currentPartner = null;
    }
    if (!user.pastPartners) {
      user.pastPartners = [];
    }
    user.pastPartners.push(partnerId);
    await this.userRepository.save(user);
    this.updateCache(user);
  }

  async setCurrentPartner(userId: string, partnerId: string): Promise<void> {
    let user = await this.getUserFromCacheOrDB(userId);

    if (!user) {
      user = new User(userId);
      user.activeRoom = '';
      user.pastPartners = [];
      user.lastCleaned = Date.now();
      user.currentPartner = null;
    }

    user.currentPartner = partnerId;
    await this.userRepository.save(user);
    this.updateCache(user);
  }

  async setLastMessageTimestamp(userId: string): Promise<void> {
    const user = await this.getUserFromCacheOrDB(userId);

    user.lastMessageTimestamp = Date.now();
    await this.userRepository.save(user);
    this.updateCache(user);
  }

  async getActiveRoom(userId: string): Promise<string> {
    const user = await this.getUserFromCacheOrDB(userId);
    return user?.activeRoom || '';
  }

  async getPastPartners(userId: string): Promise<string[]> {
    const user = await this.getUserFromCacheOrDB(userId);
    return user?.pastPartners || [];
  }

  async getCurrentPartner(userId: string): Promise<string> {
    const user = await this.getUserFromCacheOrDB(userId);
    return user?.currentPartner || null;
  }

  async countUsers(flag: UserFlag): Promise<number> {
    let count = 0;
    const users = await this.userRepository.find();

    for (const user of users) {
      switch (flag) {
        case 'all':
          count++;
          break;
        case 'activeRoom':
          if (user.activeRoom && !user.currentPartner) {
            count++;
          }
          break;
        case 'currentPartner':
          if (user.currentPartner) {
            count++;
          }
          break;
      }
    }

    return count;
  }

  private updateCache(user: User): void {
    this.userCache[user.userId] = user;
  }

  async usersWithoutRoom(userId: string): Promise<string[]> {
    // Получаем всех пользователей из базы данных
    const allUsersFromDb = await this.userRepository.find();

    // Фильтруем пользователей на основе заданных условий
    const availablePartners = allUsersFromDb
      .filter((user) => {
        return (
          user.enableNotification &&
          !user.isBlocked &&
          !user.activeRoom &&
          !user.currentPartner &&
          !(user.pastPartners || []).includes(userId)
        );
      })
      .map((user) => user.userId);

    return availablePartners;
  }

  async blockUser(userId: string) {
    const user = await this.getUserFromCacheOrDB(userId);
    if (user && !user.isBlocked) {
      user.isBlocked = true;
      user.currentPartner = null;
      user.activeRoom = null;
      user.pastPartners = [];
      await this.userRepository.save(user);
    }
  }

  async toggleNotification(userId: string, flag: boolean) {
    const user = await this.getUserFromCacheOrDB(userId);
    if (user && user.enableNotification !== flag) {
      user.enableNotification = flag;
      await this.userRepository.save(user);
    }
  }

  // Данный метод создан для тех случаев,
  // когда пользаки перешли из бота в лс или просто забили и не общаются, но находятся в комнате
  // метод вычисляет таких и удаляет все связи друг с другом
  private async disconnectIdlePartners(): Promise<void> {
    const fifteenMinutesAgo = Date.now() - 15 * 60 * 1000;

    const idleUsers = await this.userRepository
      .createQueryBuilder('user')
      .andWhere('user.activeRoom IS NOT NULL')
      .andWhere('user.currentPartner IS NOT NULL')
      .andWhere(
        'array_length(user.pastPartners, 1) IS NULL OR array_length(user.pastPartners, 1) = 0',
      )
      .andWhere('user.lastMessageTimestamp < :fifteenMinutesAgo', {
        fifteenMinutesAgo,
      })
      .getMany();

    for (const user of idleUsers) {
      user.activeRoom && this.roomService.deactivateRoom(user.activeRoom);
      user.activeRoom = null;
      user.currentPartner = null;
      user.lastMessageTimestamp = null;
      try {
        await this.userRepository.save(user);
        this.updateCache(user);
      } catch (e) {
        console.error('disconnectIdlePartners error:', e.message);
      }
    }
  }
}
