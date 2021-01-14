import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import * as RecipesActions from './recipe.actions';
import * as fromApp from '../../store/app.reducer';
import { Recipe } from './../recipe.model';
@Injectable()
export class RecipeEffects {
    @Effect()
    fetchRecipes = this.actions$.pipe(
        ofType(RecipesActions.FETCH_RECIPES),
        switchMap(() => this.http.get<Recipe[]>('https://mytest1-320c9.firebaseio.com/recipes.json')),
        map(recipes => {
            return recipes.map(recipe => {
                return {
                    ...recipe,
                    ingredients: recipe.ingredients ? recipe.ingredients : []
                };
            });
        }),
        map(recipes => new RecipesActions.SetRecipes(recipes)));

    @Effect({dispatch: false})
    storeRecipes = this.actions$.pipe(
        ofType(RecipesActions.STORE_RECIPES),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([actionData, recipesState]) => this.http.put('https://mytest1-320c9.firebaseio.com/recipes.json', recipesState.recipes))
    );

    constructor(private actions$: Actions,
                private http: HttpClient,
                private store: Store<fromApp.AppState>) {}
}
