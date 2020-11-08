import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Ingredient } from './../../shared/ingredient.model';
import { ShoppingService } from './../shopping.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) slForm: NgForm;
  private subscription: Subscription;
  private editMode = false;
  private editItemIndex: number;
  private editetItem: Ingredient;

  constructor(private shoppingSrv: ShoppingService){}

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

  onAddItem(form: NgForm): void{
    const vlue = form.value;
    const newIngridient = new Ingredient(vlue.name, vlue.amount);

    this.shoppingSrv.addIngredient(newIngridient);
  }
}
