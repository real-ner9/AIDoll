import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserLiked {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userLikes)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'userId' })
  user: User;

  @Column({ type: 'text' })
  likedByUserId: string;

  constructor(user: User, likedByUserId: string) {
    this.user = user;
    this.likedByUserId = likedByUserId;
  }
}
