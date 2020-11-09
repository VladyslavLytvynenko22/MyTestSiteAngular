import { Ingredient } from './../../shared/ingredient.model';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';

import { RecipeService } from './../recipe.service';

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
              private recipeSrv: RecipeService) { }

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

  private initForm(): void {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode){
      const recipe = this.recipeSrv.getRecipeById(this.id);

      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      if (recipe.ingredients){
        for (const ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name),
              amount: new FormControl(ingredient.amount)
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName),
      imageUrl: new FormControl(recipeImagePath),
      description: new FormControl(recipeDescription),
      ingredients: recipeIngredients
    });
  }

  onSubmit(): void {
    console.log(this.recipeForm);
  }

  get controls(): AbstractControl[] { // a getter!
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  onAddIngredient(): void {
    (this.recipeForm.get('ingredients') as FormArray)
    .push(
      new FormGroup({
        name: new FormControl(),
        amount: new FormControl()
      })
    );
  }
}
