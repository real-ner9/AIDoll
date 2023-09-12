import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './schemas/user.entity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UserService,
    {
      provide: 'USER_REPOSITORY',
      useValue: User,
    },
  ],
  exports: [UserService],
})
export class BotUsersModule {}
