import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';

import * as RecipesActions from './recipe.actions';
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

    constructor(private actions$: Actions,
                private http: HttpClient) {}
}
