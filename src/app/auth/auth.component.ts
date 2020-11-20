import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    public isLogIn = true;

    onSwitch(): void {
        this.isLogIn = !this.isLogIn;
    }

    onSubmit(form: NgForm): void{
        console.log(form);
    }
}
