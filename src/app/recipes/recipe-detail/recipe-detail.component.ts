import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';

import { Recipe } from './../recipe.model';
import { RecipeService } from '../recipe.service';
import * as fromApp from '../../store/app.reducer';

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
              private router: Router,
              private store: Store<fromApp.AppState>){}

  ngOnInit(): void {
    this.route.params.pipe(
      map(params => +params.id ),
      switchMap(id => {
        this.id = id;
        return this.store.select('recipes');
      }),
      map(recipesState => {
        return recipesState.recipes.find((recipe, index) => index === this.id );
      })
    ).subscribe(recipe => {
      this.recipe = recipe;
    });
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
