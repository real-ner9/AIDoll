import { UserRole } from './user-role';

export interface Settings {
  name?: string;
  description?: string;
  photoUrl?: string | null;
  role?: UserRole;
  showUsername?: boolean;
  isVisibleToOthers?: boolean;
  dateOfBirth?: Date | string;
}
