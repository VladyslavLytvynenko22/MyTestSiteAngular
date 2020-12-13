import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/internal/Subscription';

import { Recipe } from '../recipe.model';

import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy{
  public recipeList: Recipe[];
  private subscription: Subscription;

  constructor(private resipeSrv: RecipeService,
              private router: Router,
              private route: ActivatedRoute){}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.resipeSrv.recipeChanged.subscribe(() => {
      this.recipeList = this.resipeSrv.getRecipes();
    });

    this.recipeList = this.resipeSrv.getRecipes();
  }

  onNewRecipe(): void {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
