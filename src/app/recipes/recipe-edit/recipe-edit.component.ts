import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { RecipeService } from './../recipe.service';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  private id: number;
  private editMode = false;
  public recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private recipeSrv: RecipeService,
              private router: Router,
              private store: Store<fromApp.AppState>) { }

  get controls(): AbstractControl[] {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params.id;
          this.editMode = params.id != null;
          this.initForm();
        }
    );
  }

  onSubmit(): void {
    if (this.editMode) {
      this.recipeSrv.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeSrv.addRecipe(this.recipeForm.value);
    }

    this.returnBack();
  }

  onAddIngredient(): void {
    (this.recipeForm.get('ingredients') as FormArray)
    .push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  returnBack(): void {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onDeleteIngredient(index: number): void {
    (this.recipeForm.get('ingredients') as FormArray)
    .removeAt(index);
  }

  onDeleteAllIngredients(): void {
    (this.recipeForm.get('ingredients') as FormArray)
    .clear();
  }

  private initForm(): void {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode){
      this.store.select('recipes').pipe(map(recipeState => {
        return recipeState.recipes.find((recipe, index) => this.id === index);
      })).subscribe(recipe => {
        recipeName = recipe.name;
        recipeImagePath = recipe.imagePath;
        recipeDescription = recipe.description;

        if (recipe.ingredients){
          for (const ingredient of recipe.ingredients) {
            recipeIngredients.push(
              new FormGroup({
                name: new FormControl(ingredient.name, Validators.required),
                amount: new FormControl(ingredient.amount, [
                  Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/)
                ])
              })
            );
          }
        }
      });
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients
    });
  }
}
