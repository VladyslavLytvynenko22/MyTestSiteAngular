import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/internal/Subscription';

import { ShoppingService } from './shopping.service';
import { LoggingService } from '../logging.service';

import { Ingredient } from './../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy{
  ingredients: Ingredient[];
  private subscription: Subscription;

  constructor(private shoppingSrv: ShoppingService, private loggingService: LoggingService) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingSrv.getIngredients();
    this.subscription = this.shoppingSrv.shoppingListChanged.subscribe(
      () => {
        this.ingredients = this.shoppingSrv.getIngredients();
      }
    );
    this.loggingService.prontLog('Hello from ShoppingListComponent ngOnInit');
  }

  onEditItem(index: number): void {
    this.shoppingSrv.startedEditing.next(index);
  }
}
