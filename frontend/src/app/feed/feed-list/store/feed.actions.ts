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
