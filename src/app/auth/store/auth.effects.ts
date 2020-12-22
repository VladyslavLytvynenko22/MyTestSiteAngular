import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { AuthResponce } from '../authResult.model';
import { User } from '../user.model';
import * as AuthActions from './auth.actions';

const handleAuthentication = (expiresIn: number,
                              email: string,
                              userId: string,
                              token: string) => {
    const expitationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expitationDate);
    return new AuthActions.AuthenticateSuccess(user);
};

const handleError = (errorRes: any) => {
    let errorMessage = 'An unknown error occured!';

    if (!errorRes.error || !errorRes.error.error) {
        return of( new AuthActions.AuthenticateFail(errorMessage));
    }

    switch (errorRes.error.error.message){
        case 'EMAIL_EXISTS':
            errorMessage = 'This email exists already.';
            break;
        case 'EMAIL_NOT_FOUND':
            errorMessage = 'This email does not exists.';
            break;
        case 'INVALID_PASSWORD':
            errorMessage = 'This password is not correct.';
    }
    return of(new AuthActions.AuthenticateFail(errorMessage));
};

@Injectable()
export class AuthEffects {
    @Effect()
    authSignup = this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((signupAction: AuthActions.SignupStart) => {
            return this.http.post<AuthResponce>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
                {
                    email: signupAction.payload.email,
                    password: signupAction.payload.password,
                    returnSecureToken: true
                }
            ).pipe(
                map(resData => {
                    return handleAuthentication(+resData.expiresIn,
                                        resData.email,
                                        resData.localId,
                                        resData.idToken);
                }),
                catchError(errorRes => {
                    return handleError(errorRes);
                })
            );
        })
    );

    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
            return this.http.post<AuthResponce>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
                {
                    email: authData.payload.email,
                    password: authData.payload.password,
                    returnSecureToken: true
                }
            ).pipe(
                map(resData => {
                    return handleAuthentication(+resData.expiresIn,
                                        resData.email,
                                        resData.localId,
                                        resData.idToken);
                }),
                catchError(errorRes => {
                    return handleError(errorRes);
                })
            );
        })
    );

    @Effect({dispatch: false})
    authRedirect = this.actions$.pipe(
        ofType(AuthActions.AUTHENTICATE_SUCCESS, AuthActions.LOGOUT),
        tap(() => {
            this.router.navigate(['/']);
    }));

    constructor(private actions$: Actions,
                private http: HttpClient,
                private router: Router) {}
}
