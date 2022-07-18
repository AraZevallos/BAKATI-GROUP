import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersPartialState, USERS_FEATURE_KEY, UsersState } from './users.reducer';

// Lookup the 'Users' feature state managed by NgRx
export const getUsersState = createFeatureSelector<UsersState>(USERS_FEATURE_KEY);

export const getUser = createSelector(getUsersState, (state)=>state.user);

export const getUserIsAuth = createSelector(getUsersState, (state)=>state.isAuthenticated);
