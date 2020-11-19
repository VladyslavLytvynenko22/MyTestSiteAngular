import { RecipeService } from './recipe.service';
import { DataStorageService } from './../shared/data-storage.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({providedIn: 'root'})
export class RecipeResolverService implements Resolve<Recipe[]> {
    constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{
        ingredients: Ingredient[]; name: string; description: string; imagePath: string; }[]> | Recipe[] {
        const recipes = this.recipeService.getRecipes();

        if (recipes.length === 0){
            return this.dataStorageService.fetchRecipe();
        }
        else{
            return recipes;
        }
    }
}
