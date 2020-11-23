import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
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
        );
    }
}
