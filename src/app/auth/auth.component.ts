import { Observable } from 'rxjs/internal/Observable';
import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthResponce } from './authResult.model';
import { AuthService } from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    public isLogInMode = true;
    public isLoading = false;
    public error: string = null;

    constructor(private authService: AuthService, private router: Router) {}

    onSwitch(): void {
        this.isLogInMode = !this.isLogInMode;
    }

    onSubmit(form: NgForm): void{
        if (!form.valid) {
            return;
        }

        const email = form.value.email;
        const password = form.value.password;

        let suthObs: Observable<AuthResponce>;

        this.isLoading = true;
        if (this.isLogInMode){
            suthObs = this.authService.logIn(email, password);
        } else {
            suthObs = this.authService.signUp(email, password);
        }

        suthObs.subscribe(
            resData => {
                this.isLoading = false;
                this.router.navigate(['/recipes']);
            },
            errorMessage => {
                this.error = errorMessage;
                this.isLoading = false;
            }
        );

        form.reset();
    }
}
