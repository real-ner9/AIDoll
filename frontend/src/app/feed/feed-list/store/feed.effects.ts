import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { debounceTime, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as FeedActions from './feed.actions';
import { UserService } from '../../../shared/services/user.service';

@Injectable()
export class FeedEffects {

  loadFeed$ = createEffect(() => this.actions$.pipe(
    ofType(FeedActions.loadFeed),
    debounceTime(200),
    mergeMap(action => this.userService.getFeed({
      pageSize: action.pageSize,
      pageNumber: action.pageNumber,
    })
      .pipe(
        map(page => FeedActions.loadFeedSuccess({ page })),
        catchError(error => of(FeedActions.loadFeedFailure({ error })))
      ))
  ));

  constructor(
    private actions$: Actions,
    private userService: UserService,
  ) {}
}
