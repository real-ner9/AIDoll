import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as matchesActions from './matches.actions';
import { UserService } from '../../../shared/services/user.service';

@Injectable()
export class MatchesEffects {
  loadMatches$ = createEffect(() => this.actions$.pipe(
    ofType(matchesActions.loadMatches),
    mergeMap(() => this.userService.getMatches()
      .pipe(
        map(matches => {
          return matchesActions.loadMatchesSuccess({ matches })
        }),
        catchError(error => of(matchesActions.loadMatchesFailure({ error })))
      )
    )
  ));

  constructor(
    private actions$: Actions,
    private userService: UserService,
  ) {}
}
