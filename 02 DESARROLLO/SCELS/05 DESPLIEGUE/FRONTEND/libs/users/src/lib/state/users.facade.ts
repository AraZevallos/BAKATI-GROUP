import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as UsersActions from './users.actions';
import * as UsersSelectors from './users.selectors';

@Injectable()
export class UsersFacade {

  currentUser$ = this.store.pipe(select(UsersSelectors.getUser));
  isAuthenticate$ = this.store.pipe(select(UsersSelectors.getUserIsAuth));

  constructor(private readonly store: Store) {}

  buildUserSession() {
    this.store.dispatch(UsersActions.buildUserSession());
  }
}
