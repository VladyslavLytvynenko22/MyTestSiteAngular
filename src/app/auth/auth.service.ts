import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, tap } from 'rxjs/operators';

import { AuthResponce } from './authResult.model';
import { User } from './user.model';

import { environment } from 'src/environments/environment';

import * as fromApp from '../store/app.reducer';

import * as AuthActions from './store/auth.actions';

@Injectable({providedIn: 'root'})
export class AuthService {
    private tokenExpirationTimer: any;

    constructor(private http: HttpClient,
                private router: Router,
                private store: Store<fromApp.AppState>){}

    signUp(email: string, password: string): Observable<AuthResponce>{
        return this.http.post<AuthResponce>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
            {
                email,
                password,
                returnSecureToken: true
            }
        ).pipe(
            catchError(
                this.handleError
            ),
            tap(resData => {
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
            })
        );
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number): void {
        const expitationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expitationDate);
        this.store.dispatch(new AuthActions.Login(user));
        this.autoLogOut(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    logIn(email: string, password: string): Observable<AuthResponce> {
        return this.http.post<AuthResponce>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
            {
                email,
                password,
                returnSecureToken: true
            }
        ).pipe(
            catchError(
                this.handleError
            ),
            tap(resData => {
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
            })
        );
    }

    autoLogIn(): void {
        const userData = JSON.parse(localStorage.getItem('userData'));

        if (userData){
            const user = Object.setPrototypeOf(userData, User.prototype);

            if (user && user.token){
                this.store.dispatch(new AuthActions.Login(user));
                this.autoLogOut(user.expirationDuration);
            }
        }
    }

    logOut(): void {
        this.store.dispatch(new AuthActions.Logout());
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }

        this.tokenExpirationTimer = null;
    }

    autoLogOut(expirationDuration: number): void {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logOut();
        }, expirationDuration);
    }

    private handleError(errorRes: HttpErrorResponse): Observable<never> {
        let errorMessage = 'An unknown error occured!';

        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
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

        return throwError(errorMessage);
    }
}
