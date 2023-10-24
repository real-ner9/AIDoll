import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { debounceTime, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as FeedActions from './feed.actions';
import { UserService } from '../../../shared/services/user.service';
import { SocketService } from '../../../shared/services/user-socket.service';
import { dislikeSuccess } from './feed.actions';

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

  like$ = createEffect(() => this.actions$.pipe(
    ofType(FeedActions.like),
    mergeMap(action =>
      this.socketService.sendLike(action.userId).pipe(
        map(() => FeedActions.likeSuccess()),
        catchError(error => of(FeedActions.likeFailure({ error })))
      )
    )
  ));

  dislike$ = createEffect(() => this.actions$.pipe(
    ofType(FeedActions.dislike),
    mergeMap(action =>
      this.socketService.sendDislike(action.userId).pipe(
        map(() => FeedActions.dislikeSuccess()),
        catchError(error => of(FeedActions.dislikeFailure({ error })))
      )
    )
  ));

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private socketService: SocketService,
  ) {}
}
