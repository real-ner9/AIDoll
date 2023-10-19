import { createAction, props } from '@ngrx/store';
import { User } from '../../../shared/models/user';
import { Page } from '../../../shared/models/page';

export const loadMatches = createAction('[Matches] Load Matches');
export const loadMatchesSuccess = createAction('[Matches] Load Matches Success', props<{ matches: Page<User> }>());
export const loadMatchesFailure = createAction('[Matches] Load Matches Failure', props<{ error: any }>());

export const addMatch = createAction('[Matches] Add Match', props<{ match: User }>());
export const matchToRequest = createAction('[Matches] Match To Request', props<{ matchId: number }>());
export const removeMatch = createAction('[Matches] Remove Match', props<{ matchId: number }>());

