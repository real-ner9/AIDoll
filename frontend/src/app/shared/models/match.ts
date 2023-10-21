import { User } from './user';

export interface Match extends User {
  /**
   * Признак того, позвал ли этого пользователя
   */
  chatRequested: boolean;
}
