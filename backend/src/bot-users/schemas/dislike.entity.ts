import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Dislike {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.dislikes)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'userId' })
  user: User;

  @Column({ type: 'text' })
  dislikedUserId: string;

  constructor(user: User, dislikedUserId: string) {
    this.user = user;
    this.dislikedUserId = dislikedUserId;
  }
}
