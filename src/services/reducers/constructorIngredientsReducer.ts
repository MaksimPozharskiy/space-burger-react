import { ADD_CONSTRUCTOR_INGREDIENT, DELETE_CONSTRUCTOR_INGREDIENT, MOVE_CONSTRUCTOR_INGREDIENT } from "../actions/burgerActions";
import { TInitialStateConstructor } from "./types";
import { v4 as uuidv4 } from 'uuid';

export const initialStateConstructor: TInitialStateConstructor = {
  constructorIngredients: [],
  isBuns: null,
};

export const getConstructorIngredientsReducer = (state = initialStateConstructor, action): TInitialStateConstructor => {
  switch (action.type) {
    case ADD_CONSTRUCTOR_INGREDIENT: {
      if (action.payload.type === "bun") {
        return {
          ...state,
          isBuns: action.payload,
        };
      }
      return {
        ...state,
        constructorIngredients: [
          ...state.constructorIngredients,
          { ...action.payload, ingredientId: uuidv4() },
        ],
      };
    }
    case DELETE_CONSTRUCTOR_INGREDIENT: {
      return {
        ...state,
        constructorIngredients: [
          ...state.constructorIngredients.filter(
            (item: any) => item.ingredientId !== action.payload
          ),
        ],
      };
    }
    case MOVE_CONSTRUCTOR_INGREDIENT: {
      const { dragIndex, hoverIndex } = action.payload;
      const ingredients = [...state.constructorIngredients];
      ingredients.splice(dragIndex, 0, ingredients.splice(hoverIndex, 1)[0]);
      return {
        ...state,
        constructorIngredients: ingredients,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};