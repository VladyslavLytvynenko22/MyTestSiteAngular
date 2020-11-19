import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';


import { Ingredient } from './../shared/ingredient.model';

export class ShoppingService{
    private ingredients: Ingredient[] = [
        new Ingredient('Tomato', 20),
        new Ingredient('Patties', 3)
    ];

    public shoppingListChanged = new Subject();
    public startedEditing = new Subject<number>();

    constructor(){}

    addIngredient(newIngredient: Ingredient): void{
        this.ingredients.push(newIngredient);
        this.shoppingListChanged.next();
    }

    addIngredients(newIngredients: Ingredient[]): void{
        this.ingredients.push(...newIngredients);
        this.shoppingListChanged.next();
    }

    getIngredients(): Ingredient[]{
        return this.ingredients.slice();
    }

    getIngredient(index: number): Ingredient {
        return this.ingredients[index];
    }

    updateIngredient(index: number, newIngredient: Ingredient): void {
        this.ingredients[index] = newIngredient;
        this.shoppingListChanged.next();
    }

    deleteIngredient(index: number): void {
        this.ingredients.splice(index, 1);
        this.shoppingListChanged.next();
    }
}