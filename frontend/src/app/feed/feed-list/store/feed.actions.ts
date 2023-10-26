import { createAction, props } from '@ngrx/store';
import { User } from '../../../shared/models/user';
import { Page } from '../../../shared/models/page';

export const loadFeed = createAction(
  '[Feed] Load Feed',
  props<{ pageNumber: number, pageSize: number }>()
);

export const loadFeedSuccess = createAction(
  '[Feed] Load Feed Success',
  props<{ page: Page<User> }>()
);

export const loadFeedFailure = createAction(
  '[Feed] Load Feed Failure',
  props<{ error: any }>()
);

export const setPageSize = createAction(
  '[Feed] Set Page Size',
  props<{ pageSize: number }>()
);

export const setPageNumber = createAction(
  '[Feed] Set Page Number',
  props<{ pageNumber: number }>()
);

export const clearFeed = createAction(
  '[Feed] Clear Feed',
);

export const like = createAction(
  '[Feed] Like',
  props<{userId: number}>(),
);

export const dislike = createAction(
  '[Feed] Dislike',
  props<{userId: number}>(),
);

export const likeSuccess = createAction(
  '[Feed] Like Success',
);

export const likeFailure = createAction(
  '[Feed] Like Failure',
  props<{ error: any }>()
);

export const dislikeSuccess = createAction(
  '[Feed] Dislike Success',
);

export const dislikeFailure = createAction(
  '[Feed] Dislike Failure',
  props<{ error: any }>()
);
