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
import { TypedAction } from '@ngrx/store/src/models';

@Injectable({providedIn: 'root'})
export class RecipeResolverService implements Resolve<Recipe[] |
    ({ recipes: Recipe[]; } &
    TypedAction<'[Recipe] Set Recipes'>)> {

    constructor(private store: Store<fromApp.AppState>,
                private actions$: Actions) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[] | ({
        recipes: Recipe[];
    } & TypedAction<'[Recipe] Set Recipes'>)> {
        return this.store.select('recipes').pipe(
            take(1),
            map(recipesState => {
            return recipesState.recipes;
        }),
        switchMap((recipes: Recipe[]) => {
            if (recipes.length === 0) {
                this.store.dispatch(RecipesActions.fetchRecipes());
                return this.actions$.pipe(ofType(RecipesActions.setRecipes), take(1));
            }
            else {
                return of(recipes);
            }
        }));
    }
}
