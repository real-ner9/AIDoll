import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  activeRoom: string;

  @Column('text', { array: true, nullable: true })
  pastPartners: string[];

  @Column({ type: 'text', nullable: true })
  currentPartner: string;

  @Column({ type: 'bigint', nullable: true })
  lastCleaned: number;

  @Column({ type: 'bigint', nullable: true })
  lastSearchTimestamp: number;

  @Column({ type: 'bigint', nullable: true })
  lastNotificationTimestamp: number;

  @Column({ type: 'text', nullable: false, unique: true })
  userId: string;

  @Column({ default: false })
  isBlocked: boolean;

  @Column({ default: true })
  enableNotification: boolean;

  @Column({ type: 'bigint', nullable: true })
  lastMessageTimestamp: number;

  @Column('text', { array: true, nullable: true })
  likes: string[];

  @Column('text', { array: true, nullable: true })
  dislikes: string[];

  constructor(userId: string) {
    this.userId = userId;
    this.isBlocked = false;
    this.enableNotification = true;
    this.activeRoom = '';
    this.pastPartners = [];
    this.currentPartner = null;
    this.lastCleaned = Date.now();
    this.lastSearchTimestamp = null;
    this.lastNotificationTimestamp = null;
    this.lastMessageTimestamp = null;
    this.likes = [];
    this.dislikes = [];
  }
}
