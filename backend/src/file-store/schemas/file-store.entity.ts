import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AttachmentStatus } from '../types/attachment-status';

@Entity()
export class FileStore {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 500 })
  userId: string; // ID пользователя, который загрузил файл

  @Column({ type: 'varchar', length: 500 })
  fileHash: string; // Хеш файла для идентификации

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date; // Дата и время загрузки файла

  @Column({ type: 'varchar', length: '255', default: AttachmentStatus.INITIAL })
  status: AttachmentStatus; // Статус файла

  constructor(userId: string, fileHash: string, status: AttachmentStatus) {
    this.userId = userId;
    this.fileHash = fileHash;
    this.status = status || AttachmentStatus.INITIAL;
  }
}
