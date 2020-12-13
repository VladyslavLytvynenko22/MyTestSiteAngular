import * as AuthActions from './auth.actions';

import { User } from './../user.model';

export interface State {
    user: User;
}

const initialState: State = {
    user: null
};

export function authReducer(state = initialState,
                            action: AuthActions.AuthActions): any {
    switch (action.type) {
        case AuthActions.LOGIN:
            const user = action.payload;
            return {
                ...state,
                user
            };
        case AuthActions.LOGOUT:
            return {
                ...state,
                user: null
            };
        default:
            return state;
    }
}
