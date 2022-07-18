import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as UsersActions from './users.actions';
import { UsersEntity } from './users.models';
import { User } from '../models/user';

export const USERS_FEATURE_KEY = 'users';

export interface UsersState {
  user: User, 
  isAuthenticated: boolean;
}


export interface UsersPartialState {
  readonly [USERS_FEATURE_KEY]: UsersState;
}

export const initialUsersState : UsersState ={
  user: null,
  isAuthenticated: false
}

const usersReducer = createReducer(
  initialUsersState,
  on(UsersActions.buildUserSession, (state)=>({...state})),
  on(UsersActions.buildUserSessionSuccess, (state,action)=>({...state, user: action.user, isAuthenticated: true})),
  on(UsersActions.buildUserSessionFailed, (state,action)=>({...state, user: null, isAuthenticated: false}))
  )



export function reducer(state: UsersState | undefined, action: Action) {
  return usersReducer(state, action);
}
