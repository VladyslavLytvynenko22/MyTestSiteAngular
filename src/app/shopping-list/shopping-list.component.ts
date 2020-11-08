import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { ShoppingService } from './shopping.service';
import { Ingredient } from './../shared/ingredient.model';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy{
  ingredients: Ingredient[];
  private subscription: Subscription;

  constructor(private shoppingSrv: ShoppingService){
    this.subscription = this.shoppingSrv.shoppingListChanged.subscribe(
      () => {
        this.ingredients = this.shoppingSrv.getIngredients();
      }
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingSrv.getIngredients();
  }

  onEditItem(index: number): void {
    this.shoppingSrv.startedEditing.next(index);
  }
}
