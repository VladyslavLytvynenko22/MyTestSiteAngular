import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from './../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private recipeSrv: RecipeService,
              private route: ActivatedRoute,
              private router: Router){}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params.id;
        this.recipe = this.recipeSrv.getRecipeById(this.id);
      }
    );
  }

  addToShoppingList(): void{
    this.recipeSrv.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe(): void{
    this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteRecipe(): void {
    this.recipeSrv.deleteRecipe(this.id);
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
