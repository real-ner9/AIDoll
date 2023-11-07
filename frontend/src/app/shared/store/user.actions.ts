import { createAction, props } from '@ngrx/store';
import { ComplaintType } from '../models/complaint';
import { User } from '../models/user';
import { Settings } from '../models/settings';

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

export const setUserInfo = createAction(
  '[User] Set User Info',
  props<{user: User}>(),
)

// Actions for updating user settings
export const updateUserSettings = createAction(
  '[User] Update User Settings',
  props<{ settings: Settings }>()
);

export const updateUserSettingsSuccess = createAction(
  '[User] Update User Settings Success',
  props<{ user: User }>()
);

export const updateUserSettingsFailure = createAction(
  '[User] Update User Settings Failure',
  props<{ error: any }>()
);
