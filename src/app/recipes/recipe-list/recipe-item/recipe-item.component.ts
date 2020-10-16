import { Recipe } from './../../recipe.model';
import { Component, Input } from '@angular/core';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
  @Input() recipe: Recipe;

  constructor(private recipeSrv: RecipeService){

  }

  onSelected(): void{
    this.recipeSrv.recipeSelected.emit(this.recipe);
  }
}
