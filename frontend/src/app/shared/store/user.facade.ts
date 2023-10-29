import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as userActions from './user.actions';
import { ComplaintType } from '../models/complaint';  // Adjust the path accordingly

@Injectable({
  providedIn: 'root'
})
export class UserFacade {

  constructor(private store: Store) {}

  blockUser(id: number) {
    this.store.dispatch(userActions.blockUser({ blockedUserId: id }));
  }

  reportUser(id: number, reason: ComplaintType) {
    this.store.dispatch(userActions.reportUser({ reportedUserId: id, reason: reason }));
  }

  removeMatch(id: number) {
    this.store.dispatch(userActions.removeMatch({ removedUserId: id }));
  }
}
