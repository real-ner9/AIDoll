import { Module } from '@nestjs/common';
import { FileStoreService } from './file-store.service';

@Module({
  providers: [FileStoreService],
  exports: [FileStoreService],
})
export class FileStoreModule {}
