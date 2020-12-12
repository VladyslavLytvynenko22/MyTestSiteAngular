import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs/internal/Subscription';

import { Ingredient } from './../../shared/ingredient.model';

import { ShoppingService } from './../shopping.service';

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
  private editItemIndex: number;
  private editetItem: Ingredient;

  constructor(private shoppingSrv: ShoppingService,
              private store: Store<fromShoppingList.AppState>){}

  ngOnInit(): void {
    this.subscription = this.shoppingSrv.startedEditing
      .subscribe(
        (index: number) => {
          this.editItemIndex = index;
          this.editMode = true;
          this.editetItem = this.shoppingSrv.getIngredient(index);
          this.slForm.setValue({
            name: this.editetItem.name,
            amount: this.editetItem.amount
          });
        }
      );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm): void{
    const vlue = form.value;
    const newIngridient = new Ingredient(vlue.name, vlue.amount);

    if (this.editMode){
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({index: this.editItemIndex, ingredient: newIngridient}));
    }else{
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngridient));
    }

    this.onClear();
  }

  onClear(): void {
    this.editMode = false;
    this.slForm.reset();
  }

  onDelete(): void {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient(this.editItemIndex));
    this.onClear();
  }
}
