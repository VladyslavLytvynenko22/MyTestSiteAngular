import { Component, Input } from '@angular/core';

import { Recipe } from './../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {
  @Input() recipe: Recipe;

  constructor(private recipeSrv: RecipeService){}

  addToShoppingList(): void{
    this.recipeSrv.addIngredientsToShoppingList(this.recipe.ingredient);
  }
}
