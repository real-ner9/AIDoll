import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as MatchesSelectors from './matches.selectors';
import * as MatchesActions from './matches.actions';
import { Observable } from 'rxjs';
import { User } from '../../../shared/models/user';

@Injectable({ providedIn: 'root' })
export class MatchesFacade {
  matches$: Observable<User[]> = this.store.select(MatchesSelectors.selectAllMatches);
  loading$: Observable<boolean> = this.store.pipe(select(MatchesSelectors.selectLoading));
  error$: Observable<any> = this.store.pipe(select(MatchesSelectors.selectError));

  loadMatches() {
    this.store.dispatch(MatchesActions.loadMatches());
  }

  constructor(private store: Store) {}

  addMatch(match: User) {
    this.store.dispatch(MatchesActions.addMatch({ match }));
  }

  removeMatch(matchId: number) {
    this.store.dispatch(MatchesActions.removeMatch({ matchId }));
  }
}
