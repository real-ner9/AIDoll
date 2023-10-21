import { createReducer, on } from '@ngrx/store';
import * as FeedActions from './feed.actions';
import { User } from '../../../shared/models/user';

export interface State {
  data: User[];
  totalElements: number;
  pageSize: number;
  pageNumber: number;
  error: any;
}

export const initialState: State = {
  data: [],
  totalElements: 0,
  pageSize: 10,
  pageNumber: 1,
  error: null
};

export const feedReducer = createReducer(
  initialState,
  on(FeedActions.loadFeedSuccess, (state, { page }) => ({
    ...state,
    data: state.data.length ? [...state.data, ...page.content] : [...page.content],
    pageNumber: page.number,
    pageSize: page.size
  })),
  on(FeedActions.setPageSize, (state, { pageSize }) => ({ ...state, pageSize })),
  on(FeedActions.setPageNumber, (state, { pageNumber }) => ({ ...state, pageNumber })),
  on(FeedActions.loadFeedFailure, (state, { error }) => ({ ...state, error })),
  on(FeedActions.clearFeed, (state) => ({ ...state, pageSize: 10, pageNumber: 1, data: [], })),
);
