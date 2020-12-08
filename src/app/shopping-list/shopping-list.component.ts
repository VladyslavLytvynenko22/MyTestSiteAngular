import { Observable } from 'rxjs/internal/Observable';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs/internal/Subscription';

import { ShoppingService } from './shopping.service';
import { LoggingService } from '../logging.service';

import { Ingredient } from './../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  private subscription: Subscription;

  constructor(private shoppingSrv: ShoppingService,
              private loggingService: LoggingService,
              private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>
  ) {}

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
    this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit');
  }

  onEditItem(index: number): void {
    this.shoppingSrv.startedEditing.next(index);
  }
}
