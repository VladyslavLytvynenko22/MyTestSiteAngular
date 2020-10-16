import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

import { Recipe } from './recipe.model';

export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

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

    getRecipes(): Recipe[]{
        return this.recipes.slice();
    }
}
