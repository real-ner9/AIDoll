// chat-request.entity.ts
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class ChatRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.sentRequests)
  @JoinColumn({ name: 'sender_id', referencedColumnName: 'userId' })
  sender: User;

  @ManyToOne(() => User, (user) => user.receivedRequests)
  @JoinColumn({ name: 'receiver_id', referencedColumnName: 'userId' })
  receiver: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  requestedAt: Date;

  constructor(sender: User, receiver: User) {
    this.sender = sender;
    this.receiver = receiver;
  }
}
