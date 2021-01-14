import { Action, createReducer, on } from '@ngrx/store';

import { User } from '../user.model';
import * as AuthActions from './auth.actions';


export interface State {
  user: User;
  redirect: boolean;
  authError: string;
  loading: boolean;
}


const initialState: State = {
  user: null,
  redirect: true,
  authError: null,
  loading: false
};


const authReducerPrivate = createReducer(

  initialState,

  on(
    AuthActions.loginStart,
    AuthActions.signupStart,
    (state) => ({
      ...state,
      authError: null,
      loading: true
    })
  ),

  on(
    AuthActions.authenticateSuccess,
    (state, action) => ({
      ...state,
      authError: null,
      loading: false,
      user: action.user
    })
  ),

  on(
    AuthActions.authenticateFail,
    (state, action) => ({
      ...state,
      user: null,
      authError: action.errorMessage,
      loading: false
    })
  ),

  on(
    AuthActions.logout,
    (state) => ({
      ...state,
      user: null
    })
  ),

  on(
    AuthActions.clearError,
    (state) => ({
      ...state,
      authError: null
    })
  ),

);


export function authReducer(state: State, action: Action): {
    user: User;
    redirect: boolean;
    authError: string;
    loading: boolean;
} {
  return authReducerPrivate(state, action);
}
