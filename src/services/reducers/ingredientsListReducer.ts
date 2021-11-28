import { GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED } from "../actions/burgerActions";
import { TInitialStateIngredients } from "./types";

export const initialStateIngredients: TInitialStateIngredients = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  isLoading: false,
};

export const getIngredientsListReducer = (state = initialStateIngredients, action): TInitialStateIngredients => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsFailed: false,
        ingredients: action.payload,
        ingredientsRequest: false,
        isLoading: true,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsFailed: true,
        ingredientsRequest: false,
        isLoading: false,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};