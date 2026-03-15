import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { BotModule } from './bot/bot.module';
import { ConfigModule } from '@nestjs/config';
import { HeaderResolver, I18nModule } from 'nestjs-i18n';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BotUsersModule } from './bot-users/bot-users.module';
import { BotChatModule } from './bot-chat/bot-chat.module';
import { ProfileMatchModule } from './profile-match/profile-match.module';
import * as process from 'process';
import { AuthMiddleware } from './auth.middleware';
import { FileStoreModule } from './file-store/file-store.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 60,
    }]),
    ConfigModule.forRoot({
      envFilePath: ['.env.desk', '.env.local', '.env'],
      isGlobal: true,
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [new HeaderResolver(['x-custom-lang'])], // здесь мы указываем резолвер
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: false,
      migrationsRun: true,
      migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      logging: false,
    }),
    // MongooseModule.forRoot(
    //   'mongodb+srv://Cluster84278:WlhFQmdzQ2do@cluster84278.zywqkmq.mongodb.net/?appName=mongosh+1.10.5',
    // ),
    // RoomsModule
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../', 'file-store'),
      serveRoot: '/rooms/file-store/',
    }),
    BotModule,
    BotUsersModule,
    BotChatModule,
    ProfileMatchModule,
    FileStoreModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude('file-store/image/(.*)')
      .forRoutes('*');
  }
}
