import { Module } from '@nestjs/common';
import { FileStoreService } from './file-store.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileStore } from './schemas/file-store.entity';
import { FileStoreController } from './file-store.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FileStore])],
  providers: [
    FileStoreService,
    {
      provide: 'FILE_STORE_REPOSITORY',
      useValue: FileStore,
    },
  ],
  exports: [FileStoreService],
  controllers: [FileStoreController],
})
export class FileStoreModule {}
