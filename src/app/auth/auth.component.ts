import { AuthService } from './auth.service';
import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    public isLogInMode = true;

    constructor(private authService: AuthService) {}

    onSwitch(): void {
        this.isLogInMode = !this.isLogInMode;
    }

    onSubmit(form: NgForm): void{
        if (!form.valid) {
            return;
        }

        const email = form.value.email;
        const password = form.value.password;

        if (this.isLogInMode){
            // ...
        } else {
            this.authService.signUp(email, password)
            .subscribe(
                resData => {
                    console.log(resData);
                },
                error => {
                    console.log(error);
                }
            );
        }

        form.reset();
    }
}
