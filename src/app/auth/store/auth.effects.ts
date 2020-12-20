import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';
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
                    return of(new AuthActions.Login(user));
                }),
                catchError(error => {
                    return of();
                })
            );
        })
    );

    constructor(private actions$: Actions, private http: HttpClient) {}
}
