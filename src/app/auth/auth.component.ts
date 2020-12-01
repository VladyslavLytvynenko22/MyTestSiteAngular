import { PlaceholderDirective } from './../shared/placeholder/placeholder.directive';
import { AlertComponent } from './../shared/alert/alert.component';
import { Observable } from 'rxjs/internal/Observable';
import { NgForm } from '@angular/forms';
import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AuthResponce } from './authResult.model';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {
    public isLogInMode = true;
    public isLoading = false;
    public error: string = null;
    @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;

    private closeAlert: Subscription;

    constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) {}

    ngOnDestroy(): void {
        if (this.closeAlert){
            this.closeAlert.unsubscribe();
        }
    }

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
                this.showAlertMessage(errorMessage);
                this.isLoading = false;
            }
        );

        form.reset();
    }

    onHandleException(): void{
        this.error = null;
    }

    showAlertMessage(message: string): void{
        const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();

        const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

        componentRef.instance.message = message;
        this.closeAlert = componentRef.instance.close.subscribe(() => {
            this.closeAlert.unsubscribe();
            hostViewContainerRef.clear();
        });
    }
}
