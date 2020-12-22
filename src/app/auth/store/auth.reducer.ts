import * as AuthActions from './auth.actions';
import { User } from './../user.model';

export interface State {
    user: User;
    authError: string;
    loading: boolean;
}

const initialState: State = {
    user: null,
    authError: null,
    loading: false
};

export function authReducer(state = initialState,
                            action: AuthActions.AuthActions): any {
    switch (action.type) {
        case AuthActions.AUTHENTICATE_SUCCESS:
            const user = action.payload;
            return {
                ...state,
                authError: null,
                user,
                loading: false
            };
        case AuthActions.LOGOUT:
            return {
                ...state,
                user: null
            };
        case AuthActions.LOGIN_START:
        case AuthActions.SIGNUP_START:
            return {
                ...state,
                authError: null,
                loading: true
            };
        case AuthActions.AUTHENTICATE_FAIL:
            return {
                ...state,
                user: null,
                authError: action.payload,
                loading: false
            };
        case AuthActions.CLEAR_ERROR:
            return {
                ...state,
                authError: null
            };
        default:
            return state;
    }
}
