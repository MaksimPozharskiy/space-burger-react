
import { mainApiUrl } from "../../utils/constants";
import { Dispatch } from "../store";

// Ingredients of Burger
export const GET_INGREDIENTS_REQUEST: "GET_INGREDIENTS_REQUEST" = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS" = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED" = "GET_INGREDIENTS_FAILED";
export const RESET_CONSTRUCTOR_INGREDIENT: "RESET_CONSTRUCTOR_INGREDIENT" = "RESET_CONSTRUCTOR_INGREDIENT";

export function getIngredients() {
  return (dispatch: Dispatch) => {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    fetch(`${mainApiUrl}/ingredients`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(res);
        }
      })
      .then((res) => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
        // dispatch(showError(error));
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        });
      });
  };
}

export function resetConstructorIngredient() {
  return {
    type: RESET_CONSTRUCTOR_INGREDIENT,
  };
}

// Constructor of Burger
export const ADD_CONSTRUCTOR_INGREDIENT: "ADD_CONSTRUCTOR_INGREDIENT" = "ADD_CONSTRUCTOR_INGREDIENT";
export const DELETE_CONSTRUCTOR_INGREDIENT: "DELETE_CONSTRUCTOR_INGREDIENT" = "DELETE_CONSTRUCTOR_INGREDIENT";
export const MOVE_CONSTRUCTOR_INGREDIENT: "MOVE_CONSTRUCTOR_INGREDIENT" = "MOVE_CONSTRUCTOR_INGREDIENT";

export function addConstructorIngredient(ingredient) {
  return {
    type: ADD_CONSTRUCTOR_INGREDIENT,
    payload: ingredient,
  };
}

export function deleteConstructorIngredient(ingredientId) {
  return {
    type: DELETE_CONSTRUCTOR_INGREDIENT,
    payload: ingredientId,
  };
}

export function moveConstructorIngredient({ dragIndex, hoverIndex }) {
  return {
    type: MOVE_CONSTRUCTOR_INGREDIENT,
    payload: { dragIndex, hoverIndex },
  };
}

