import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MatchesState } from './matches.reducer';

export const selectMatchesState = createFeatureSelector<MatchesState>('matches');

export const selectAllMatches = createSelector(
  selectMatchesState,
  (state: MatchesState) => state.matches
);

export const selectLoading = createSelector(
  selectMatchesState,
  (state: MatchesState) => state.loading
);

export const selectError = createSelector(
  selectMatchesState,
  (state: MatchesState) => state.error
);
