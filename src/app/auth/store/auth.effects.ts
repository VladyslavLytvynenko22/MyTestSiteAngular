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

@Injectable()
export class AuthEffects {
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
                    const expitationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
                    const user = new User(resData.email, resData.localId, resData.idToken, expitationDate);
                    return new AuthActions.Login(user);
                }),
                catchError(errorRes => {
                    let errorMessage = 'An unknown error occured!';

                    if (!errorRes.error || !errorRes.error.error) {
                        return of( new AuthActions.LoginFail(errorMessage));
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
                    return of(new AuthActions.LoginFail(errorMessage));
                })
            );
        })
    );

    @Effect({dispatch: false})
    authSuccess = this.actions$.pipe(ofType(AuthActions.LOGIN), tap(() => {
        this.router.navigate(['/']);
    }));

    constructor(private actions$: Actions,
                private http: HttpClient,
                private router: Router) {}
}
