import { Ingredient } from '../../shared/ingredient.model';

import * as ShoppingListActions from './shopping-list.actions';

const initialState = {
    ingredients: [
        new Ingredient('Tomato', 20),
        new Ingredient('Patties', 3)
    ]
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.AddIngredient):
{ ingredients: (Ingredient | ShoppingListActions.AddIngredient)[] }
{
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
    }
}
