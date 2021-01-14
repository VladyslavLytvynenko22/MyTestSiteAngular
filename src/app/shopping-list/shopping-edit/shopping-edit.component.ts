import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/internal/Subscription';

import { Ingredient } from './../../shared/ingredient.model';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) slForm: NgForm;
  private subscription: Subscription;
  private editedItem: Ingredient;
  public editMode = false;

  constructor(private store: Store<fromApp.AppState>){}

  ngOnInit(): void {
    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      const index = stateData.editIndex;
      if (index > -1) {
        this.editMode = true;
        this.editedItem = stateData.ingredients[index];
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
    this.store.dispatch(ShoppingListActions.stopEdit());
  }

  onSubmit(form: NgForm): void{
    const vlue = form.value;
    const newIngridient = new Ingredient(vlue.name, vlue.amount);

    if (this.editMode) {
      this.store.dispatch(ShoppingListActions.updateIngredient({ingredient: newIngridient}));
    } else {
      this.store.dispatch(ShoppingListActions.addIngredient({ingredient: newIngridient}));
    }

    this.onClear();
  }

  onClear(): void {
    this.editMode = false;
    this.slForm.reset();
    this.store.dispatch(ShoppingListActions.stopEdit());
  }

  onDelete(): void {
    this.store.dispatch(ShoppingListActions.deleteIngredient());
    this.onClear();
  }
}
