import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';
import { AuthResponce } from './authResult.model';

@Injectable({providedIn: 'root'})
export class AuthService {

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
            )
        );
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
            )
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
