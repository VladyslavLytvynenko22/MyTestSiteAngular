import * as RecipesActions from './recipe.actions';
import { Recipe } from '../recipe.model';

export interface State {
    recipes: Recipe[];
}

const initialState: State = {
    recipes: []
};

export function recipeReducer(state = initialState, action: RecipesActions.RecipesActions): any {
    switch (action.type) {
        case RecipesActions.SET_RECIPES:
            return {
                ...state,
                recipes: [...action.payload]
            };
        case RecipesActions.ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes , action.payload]
            };
        case RecipesActions.UPDATE_RECIPE:
            const updatedRecipe: Recipe = {
                ...state.recipes[action.payload.index],
                ...action.payload.newRecipe};
            const updatedRecipes: Recipe[] = [...state.recipes];
            updatedRecipes[action.payload.index] = updatedRecipe;

            return {
                ...state,
                recipes: updatedRecipes
            };
        case RecipesActions.DELETE_RECIPE:
            return {
                ...state,
                recipes: state.recipes.filter((recipe, index) => index !== action.payload)
            };
        default:
            return state;
    }
}
