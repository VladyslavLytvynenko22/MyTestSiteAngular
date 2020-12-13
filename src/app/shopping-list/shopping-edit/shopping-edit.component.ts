import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs/internal/Subscription';

import { Ingredient } from './../../shared/ingredient.model';

import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) slForm: NgForm;
  private subscription: Subscription;
  public editMode = false;
  private editedItem: Ingredient;

  constructor(private store: Store<fromShoppingList.AppState>){}

  ngOnInit(): void {
    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      if (stateData.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editedItem = stateData.editedIngredient;
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      } else {
        this.editMode = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onSubmit(form: NgForm): void{
    const vlue = form.value;
    const newIngridient = new Ingredient(vlue.name, vlue.amount);

    if (this.editMode){
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(newIngridient));
    }else{
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngridient));
    }

    this.onClear();
  }

  onClear(): void {
    this.editMode = false;
    this.slForm.reset();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onDelete(): void {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }
}
