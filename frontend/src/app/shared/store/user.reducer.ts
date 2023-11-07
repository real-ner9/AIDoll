import { User } from '../models/user';
import { createReducer, on } from '@ngrx/store';
import { setUserInfo, updateUserSettingsFailure, updateUserSettingsSuccess } from './user.actions';

export interface UserState {
  user: User | null;
  loading: boolean;
  error: any;
}

export const initialUserState: UserState = {
  user: null,
  loading: false,
  error: null
};

export const userReducer = createReducer(
  initialUserState,
  on(setUserInfo, (state, { user }) => ({
    ...state,
    user,
  })),

  on(updateUserSettingsSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    error: null,
    user: { ...user },
  })),

  on(updateUserSettingsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
