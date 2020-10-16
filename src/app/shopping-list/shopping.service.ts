import { EventEmitter } from '@angular/core';
import { Ingredient } from './../shared/ingredient.model';

export class ShoppingService{
    private ingredients: Ingredient[] = [
        new Ingredient('Tomato', 20),
        new Ingredient('Patties', 3)
    ];

    public shoppingListChanged = new EventEmitter();

    constructor(){}

    addIngredient(newIngredient: Ingredient): void{
        this.ingredients.push(newIngredient);
        this.shoppingListChanged.emit();
    }

    getIngredients(): Ingredient[]{
        return this.ingredients.slice();
    }
}
