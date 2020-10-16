import { Recipe } from './recipe.model';
import { Component } from '@angular/core';
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
      resipeItm => this.selectedRecipe = resipeItm
    );
  }
}
