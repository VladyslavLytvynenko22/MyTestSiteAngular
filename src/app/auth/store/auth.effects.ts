import { HttpClient } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { AuthResponce } from '../authResult.model';
import * as AuthActions from './auth.actions';

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
            ).pipe(catchError(error => {
                of();
            }), map(resData => {
                of();
            }));
        })
    );

    constructor(private actions$: Actions, private http: HttpClient) {}
}
