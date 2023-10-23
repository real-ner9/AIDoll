import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as RequestsSelectors from './requests.selectors';
import * as RequestsActions from './requests.actions';
import { Observable } from 'rxjs';
import { User } from '../../../shared/models/user';

@Injectable({ providedIn: 'root' })
export class RequestsFacade {
  requests$: Observable<User[]> = this.store.select(RequestsSelectors.selectAllRequests);
  loading$: Observable<boolean> = this.store.pipe(select(RequestsSelectors.selectLoading));
  error$: Observable<any> = this.store.pipe(select(RequestsSelectors.selectError));

  loadRequests() {
    this.store.dispatch(RequestsActions.loadRequests());
  }

  constructor(private store: Store) {}

  addRequest(request: User) {
    this.store.dispatch(RequestsActions.addRequest({ request }));
  }

  removeRequest(requestId: number) {
    this.store.dispatch(RequestsActions.cancelRequest({ requestId }));
  }

  approveRequest(requestId: number) {
    this.store.dispatch(RequestsActions.approveRequest({requestId}));
  }

  cancelRequest(requestId: number) {
    this.store.dispatch(RequestsActions.cancelRequest({requestId}));
  }
}
