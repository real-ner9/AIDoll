import { UserRole } from './user-role';
import { ComplaintType } from './complaint';

export interface User {
  activeRoom?: string;
  id: number;
  currentPartner?: string;
  lastCleaned?: number;
  lastSearchTimestage?: number;
  lastNotificationTimestage?: number;
  isBlocage?: boolean;
  enableNotificatage?: boolean;
  lastMessageTimestage?: number;
  age?: number;
  description?: string;
  photoUrl?: string;
  role?: UserRole;
  isVisibleToOthers?: boolean;
  name?: string;
  username?: string;
  showUsername?: boolean;
  online?: boolean;
  blockedUntil?: Date | string;
  blockReason?: ComplaintType;
}
