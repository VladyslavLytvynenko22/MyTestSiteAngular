import { EventEmitter, Inject, Injectable } from '@angular/core';

import { ShoppingService } from './../shopping-list/shopping.service';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {

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
}
