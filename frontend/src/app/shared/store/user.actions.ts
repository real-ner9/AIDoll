import { createAction, props } from '@ngrx/store';
import { ComplaintType } from '../models/complaint';

export const blockUser = createAction(
  '[User] Block User',
  props<{ blockedUserId: number }>()
);

export const reportUser = createAction(
  '[User] Report User',
  props<{ reportedUserId: number; reason: ComplaintType }>()
);

export const removeMatch = createAction(
  '[User] Remove Match',
  props<{ removedUserId: number }>()
);

export const blockUserSuccess = createAction(
  '[User] Block User Success',
  props<{ id: number }>()
);

export const blockUserFailure = createAction(
  '[User] Block User Failure',
  props<{ error: any }>()
);

export const reportUserSuccess = createAction(
  '[User] Report User Success',
  props<{ id: number }>()
);

export const reportUserFailure = createAction(
  '[User] Report User Failure',
  props<{ error: any }>()
);

export const removeMatchSuccess = createAction(
  '[User] Remove Match Success',
  props<{ id: number }>()
);

export const removeMatchFailure = createAction(
  '[User] Remove Match Failure',
  props<{ error: any }>()
);
