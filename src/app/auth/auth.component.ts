import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';


import { PlaceholderDirective } from './../shared/placeholder/placeholder.directive';
import { AlertComponent } from './../shared/alert/alert.component';
import * as fromApp from './../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy {
    public isLogInMode = true;
    public isLoading = false;
    public error: string = null;
    @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;

    private closeAlert: Subscription;
    private storeSub: Subscription;

    constructor(private componentFactoryResolver: ComponentFactoryResolver,
                private store: Store<fromApp.AppState>) {}

    ngOnInit(): void {
        this.storeSub = this.store.select('auth').subscribe(authState => {
            this.isLoading = authState.loading;
            this.error = authState.authError;

            if (this.error) {
                this.showAlertMessage(this.error);
            }
        });
    }

    ngOnDestroy(): void {
        this.closeAlert?.unsubscribe();
        this.storeSub?.unsubscribe();
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

        this.isLoading = true;
        if (this.isLogInMode){
            this.store.dispatch(new AuthActions.LoginStart({ email, password }));
        } else {
            this.store.dispatch(new AuthActions.SignupStart({ email, password }));
        }

        form.reset();
    }

    onHandleException(): void{
        this.store.dispatch(new AuthActions.ClearError());
    }

    showAlertMessage(message: string): void{
        const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();

        const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

        componentRef.instance.message = message;
        this.closeAlert = componentRef.instance.closeAlert.subscribe(() => {
            this.closeAlert.unsubscribe();
            hostViewContainerRef.clear();
        });
    }
}
