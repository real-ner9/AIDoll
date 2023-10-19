import { createReducer, on } from '@ngrx/store';
import {
  loadMatches,
  loadMatchesSuccess,
  loadMatchesFailure,
  addMatch,
  removeMatch
} from './matches.actions';
import { User } from '../../../shared/models/user';

export interface MatchesState {
  matches: User[];
  loading: boolean;
  error: any;
}

export const initialMatchesState: MatchesState = {
  matches: [],
  loading: false,
  error: null
};

export const matchesReducer = createReducer(
  initialMatchesState,
  on(loadMatches, state => ({ ...state, loading: true })),
  on(loadMatchesSuccess, (state, { matches }) => ({ ...state, matches: [...matches.content], loading: false })),
  on(loadMatchesFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(addMatch, (state, { match }) => ({ ...state, matches: [...state.matches, match] })),
  on(removeMatch, (state, { matchId }) => ({
    ...state,
    matches: state.matches.filter(match => match.id !== matchId)
  }))
);
