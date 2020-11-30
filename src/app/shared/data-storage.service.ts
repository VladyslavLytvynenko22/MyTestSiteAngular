import { AuthService } from './../auth/auth.service';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { RecipeService } from './../recipes/recipe.service';
import { Recipe } from './../recipes/recipe.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ingredient } from './ingredient.model';

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {}

    storeRecipe(): void {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://mytest1-320c9.firebaseio.com/recipes.json', recipes)
        .subscribe(
            response => {
                console.log(response);
            }
        );
    }

    fetchRecipe(): Observable<{ ingredients: Ingredient[]; name: string; description: string; imagePath: string; }[]> {
        return this.http.get<Recipe[]>('https://mytest1-320c9.firebaseio.com/recipes.json')
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
            ),
            tap(
                recipes => {
                    this.recipeService.setRecipes(recipes);
                }
            )
        );
    }
}
