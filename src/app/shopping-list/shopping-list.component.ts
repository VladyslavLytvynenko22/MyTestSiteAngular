import { ShoppingService } from './shopping.service';
import { Ingredient } from './../shared/ingredient.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: [ShoppingService]
})
export class ShoppingListComponent implements OnInit{
  ingredients: Ingredient[];

  constructor(private shoppingSrv: ShoppingService){
    this.shoppingSrv.shoppingListChanged.subscribe(
      () => {
        this.ingredients = this.shoppingSrv.getIngredients();
      }
    );
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingSrv.getIngredients();
  }
}
