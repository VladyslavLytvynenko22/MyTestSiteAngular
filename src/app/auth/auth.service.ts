import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { User } from './user.model';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Injectable({providedIn: 'root'})
export class AuthService {
    private tokenExpirationTimer: any;

    constructor(private router: Router,
                private store: Store<fromApp.AppState>) {}

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number): void {
        const expitationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expitationDate);
        this.store.dispatch(new AuthActions.AuthenticateSuccess(user));
        this.autoLogOut(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    autoLogIn(): void {
        const userData = JSON.parse(localStorage.getItem('userData'));

        if (userData){
            const user = Object.setPrototypeOf(userData, User.prototype);

            if (user && user.token){
                this.store.dispatch(new AuthActions.AuthenticateSuccess(user));
                this.autoLogOut(user.expirationDuration);
            }
        }
    }

    logOut(): void {
        this.store.dispatch(new AuthActions.Logout());
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
}
