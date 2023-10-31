import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class InvitationLink {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  userId: string;

  @Column({ type: 'text', nullable: false, unique: true })
  invitedUserId: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'boolean', default: false })
  isProfileCompleted: boolean;

  @Column({ type: 'boolean', default: false })
  isUserBlocked: boolean;

  constructor(userId: string, invitedUserId: string) {
    this.userId = userId;
    this.invitedUserId = invitedUserId;
  }
}
