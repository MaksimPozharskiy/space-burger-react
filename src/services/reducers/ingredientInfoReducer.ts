import { GET_SELECTED_INGREDIENT_INFO, DELETE_SELECTED_INGREDIENT_INFO } from "../actions/modalActions";
import { TInitialStateIngredient } from "./types";

const initialStateIngredient: TInitialStateIngredient = {
  currentIngredient: null,
};

export const getIngredientInfoReducer = (state = initialStateIngredient, action): TInitialStateIngredient => {
  switch (action.type) {
    case GET_SELECTED_INGREDIENT_INFO: {
      return {
        ...state,
        currentIngredient: action.payload,
      };
    }
    case DELETE_SELECTED_INGREDIENT_INFO: {
      return {
        ...state,
        currentIngredient: null,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};