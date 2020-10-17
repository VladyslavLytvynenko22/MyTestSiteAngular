import { Component } from '@angular/core';

import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent {
  public selectedRecipe: Recipe;

  constructor(private recipeSrv: RecipeService){
    this.recipeSrv.recipeSelected.subscribe(
      (resipeItm: Recipe) => {
        this.selectedRecipe = resipeItm;
      }
    );
  }
}
