import { EventEmitter, Inject, Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { Subject } from 'rxjs/internal/Subject';

import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';

import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';

@Injectable()
export class RecipeService {
    public recipeChanged = new Subject();

    private recipes: Recipe[];

    constructor(private store: Store<fromShoppingList.AppState>){}

    setRecipes(recipes: Recipe[]): void {
        this.recipes = recipes;
        this.recipeChanged.next();
    }

    getRecipes(): Recipe[]{
        return this.recipes?.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]): void{
        this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
    }

    getRecipeById(id: number): Recipe{
        return this.recipes.slice()[id];
    }

    addRecipe(recipe: Recipe): void {
        this.recipes.push(recipe);
        this.recipeChanged.next();
    }

    updateRecipe(index: number, newRecipe: Recipe): void {
        this.recipes[index] = newRecipe;
        this.recipeChanged.next();
    }

    deleteRecipe(index: number): void {
        this.recipes.splice(index, 1);
        this.recipeChanged.next();
    }
}
