import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../services/user.service';
import * as userActions from './user.actions';
import { of, switchMap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class UserEffects {

  blockUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.blockUser),
      switchMap(action => this.userService.blockUser(action.blockedUserId).pipe(
        map(response => userActions.blockUserSuccess({ id: response.id })),
        catchError(error => of(userActions.blockUserFailure({ error })))
      ))
    )
  );

  reportUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.reportUser),
      switchMap(action => this.userService.reportUser(action.reportedUserId, action.reason).pipe(
        map(response => userActions.reportUserSuccess({ id: response.id })),
        catchError(error => of(userActions.reportUserFailure({ error })))
      ))
    )
  );

  removeMatch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.removeMatch),
      switchMap(action => this.userService.removeMatch(action.removedUserId).pipe(
        map(response => userActions.removeMatchSuccess({ id: response.id })),
        catchError(error => of(userActions.removeMatchFailure({ error })))
      ))
    )
  );

  updateUserSettings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.updateUserSettings),
      switchMap(action =>
        this.userService.updateSettings(action.settings).pipe(
          map(user => userActions.updateUserSettingsSuccess({ user })),
          catchError(error => of(userActions.updateUserSettingsFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) { }
}
