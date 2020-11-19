import { RecipeService } from './../recipes/recipe.service';
import { Recipe } from './../recipes/recipe.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService) {}

    storeRecipe(): void {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://mytest1-320c9.firebaseio.com/recipes.json', recipes)
        .subscribe(
            response => {
                console.log(response);
            }
        );
    }
}
