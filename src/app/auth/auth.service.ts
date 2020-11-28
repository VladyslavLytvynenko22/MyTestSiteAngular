import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, tap } from 'rxjs/operators';

import { AuthResponce } from './authResult.model';
import { User } from './user.model';

@Injectable({providedIn: 'root'})
export class AuthService {
    user = new Subject<User>();

    constructor(private http: HttpClient){}

    signUp(email: string, password: string): Observable<AuthResponce>{
        return this.http.post<AuthResponce>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDpTki8u4d9fMCOJHzJMvxS9arDeWMCZlM',
            {
                email: email,
                password: password,
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
        this.user.next(user);
    }

    logIn(email: string, password: string): Observable<AuthResponce> {
        return this.http.post<AuthResponce>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDpTki8u4d9fMCOJHzJMvxS9arDeWMCZlM',
            {
                email: email,
                password: password,
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
