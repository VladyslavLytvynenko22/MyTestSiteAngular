import { Ingredient } from '../../shared/ingredient.model';

import * as ShoppingListActions from './shopping-list.actions';

const initialState = {
    ingredients: [
        new Ingredient('Tomato', 20),
        new Ingredient('Patties', 3)
    ]
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions):
{ ingredients: (Ingredient | ShoppingListActions.AddIngredient)[] }
{
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            };
        default:
            return state;
    }
}
