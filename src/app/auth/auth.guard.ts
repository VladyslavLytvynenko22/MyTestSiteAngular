import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';

import { Observable } from 'rxjs/internal/Observable';
import { map, take } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(private store: Store<fromApp.AppState>,
                private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        router: RouterStateSnapshot
    ):
        | boolean
        | UrlTree
        | Promise<boolean | UrlTree>
        | Observable<boolean | UrlTree> {
        return this.store.select('auth').pipe(
            take(1),
            map(authState => {
                if (authState?.user){
                    return true;
                }

                return this.router.createUrlTree(['/auth']);
            }
        ));
    }
}
