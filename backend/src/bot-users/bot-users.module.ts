import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './schemas/user.entity';
import { UserService } from './user.service';
import { UserActionsService } from './user-actions.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UserService,
    {
      provide: 'USER_REPOSITORY',
      useValue: User,
    },
    UserActionsService,
  ],
  exports: [UserService, UserActionsService],
})
export class BotUsersModule {}
