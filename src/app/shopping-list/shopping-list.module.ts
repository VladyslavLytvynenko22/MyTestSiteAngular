import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {StoreModule} from '@ngrx/store';

import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { SharedModule } from './../shared/shared.module';
import * as fromShoppingList from './store/shopping-list.reducer';

@NgModule({
    declarations: [
        ShoppingEditComponent,
        ShoppingListComponent,
    ],
    imports: [
        FormsModule,
        ShoppingListRoutingModule,
        StoreModule.forFeature('shoppingList', fromShoppingList.shoppingListReducer),
        SharedModule
    ]
})
export class ShoppingListModule {}
