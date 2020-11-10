import { EventEmitter, Inject, Injectable } from '@angular/core';

import { ShoppingService } from './../shopping-list/shopping.service';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
    public recipeChanged = new Subject();

    private recipes: Recipe[] = [
        new Recipe('Hamburger',
        'is a sandwich consisting of one or more cooked patties of ground meat, usually beef, placed inside a sliced bread roll or bun',
        './assets/images/B.png',
        [
            new Ingredient('Patties', 1),
            new Ingredient('Bun', 2),
            new Ingredient('Tomato', 1)
        ]),
        new Recipe('French fries',
        'are batonnet or allumette-cut deep-fried potatoes',
        './assets/images/F.png',
        [
            new Ingredient('Potatoes', 2),
            new Ingredient('Ketchup', 1)
        ])
    ];

    constructor(private shoppingSrv: ShoppingService){}

    getRecipes(): Recipe[]{
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]): void{
        this.shoppingSrv.addIngredients(ingredients);
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
}
