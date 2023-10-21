import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { debounceTime, of } from 'rxjs';

import * as requestActions from './requests.actions';
import { UserService } from '../../../shared/services/user.service';

@Injectable()
export class RequestsEffects {
  loadMatches$ = createEffect(() => this.actions$.pipe(
    ofType(requestActions.loadRequests),
    debounceTime(200),
    mergeMap(() => this.userService.getRequests()
      .pipe(
        map(requests => {
          return requestActions.loadRequestsSuccess({ requests })
        }),
        catchError(error => of(requestActions.loadRequestsFailure({ error })))
      )
    )
  ));

  constructor(
    private actions$: Actions,
    private userService: UserService,
  ) {}
}
