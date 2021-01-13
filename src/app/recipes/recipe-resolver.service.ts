import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { map, take, switchMap } from 'rxjs/operators';

import { Recipe } from './recipe.model';
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../recipes/store/recipe.actions';

@Injectable({providedIn: 'root'})
export class RecipeResolverService implements Resolve<Recipe[]> {
    constructor(private store: Store<fromApp.AppState>,
                private actions$: Actions) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> {
        return this.store.select('recipes').pipe(
            take(1),
            map(recipesState => {
            return recipesState.recipes;
        }),
        switchMap((recipes: Recipe[]) => {
            if (recipes.length === 0) {
                this.store.dispatch(new RecipesActions.FetchRecipes());
                return this.actions$.pipe(ofType(RecipesActions.SET_RECIPES), take(1));
            }
            else {
                return of(recipes);
            }
        }));
    }
}
