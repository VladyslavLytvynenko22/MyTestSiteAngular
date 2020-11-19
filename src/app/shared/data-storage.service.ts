import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
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

    fetchRecipe(): void {
        this.http.get<Recipe[]>('https://mytest1-320c9.firebaseio.com/recipes.json')
        .pipe(
            map(
                recipes => {
                    return recipes.map(recipe => {
                        return {
                            ...recipe,
                             ingredients: recipe.ingredients ? recipe.ingredients : []
                        };
                    });
                }
            )
        )
        .subscribe(
            recipes => {
                this.recipeService.setRecipes(recipes);
            }
        );
    }
}
