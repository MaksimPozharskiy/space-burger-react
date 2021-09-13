import { mainApiUrl } from '../../utils/constants';

// Ingredients of Burger
export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export function getIngredients() {
  return (dispatch) => {
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

// Constructor of Burger
export const ADD_CONSTRUCTOR_INGREDIENT = "ADD_CONSTRUCTOR_INGREDIENT";
export const DELETE_CONSTRUCTOR_INGREDIENT = "DELETE_CONSTRUCTOR_INGREDIENT";
export const MOVE_CONSTRUCTOR_INGREDIENT = "MOVE_CONSTRUCTOR_INGREDIENT";

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

// Selected ingredients
export const GET_SELECTED_INGREDIENT_INFO = "GET_SELECTED_INGREDIENT_INFO";
export const DELETE_SELECTED_INGREDIENT_INFO = "DELETE_SELECTED_INGREDIENT_INFO";

export function getSelectedIngredient(ingredient) {
  return {
    type: GET_SELECTED_INGREDIENT_INFO,
    payload: ingredient,
  };
}

export function deleteSelectedIngredient() {
  return {
    type: DELETE_SELECTED_INGREDIENT_INFO,
  };
}

// User Order
export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";
export const DELETE_ORDER = "DELETE_ORDER";

export function getOrder(ingredients) {
  return (dispatch) => {
    dispatch({
      type: GET_ORDER_REQUEST,
    });

    fetch(`${mainApiUrl}/orders`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients: ingredients }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(res);
      }
    }).then((res) => {
        dispatch({
          type: GET_ORDER_SUCCESS,
          payload: res,
        });
      })
      .catch((error) => {
        console.log(error);
        // dispatch(showError(error));
        dispatch({
          type: GET_ORDER_FAILED,
        });
      });
  };
}


// Other 
export const SHOW_MODAL = "SHOW_MODAL";
export const HIDE_MODAL = "HIDE_MODAL";
export const SHOW_MODAL_ORDER = "SHOW_MODAL_ORDER";
export const HIDE_MODAL_ORDER = "HIDE_MODAL_ORDER";

export function closeModals() {
  return (dispatch) => {
    // dispatch(hideError());
    dispatch(deleteSelectedIngredient());
    dispatch(closeOrder());
    // dispatch(hideMenu());
    // dispatch(hidePersonalMenu());
  };
}

export function showModal() {
  return {
    type: SHOW_MODAL,
  };
}

export function hideModal() {
  return {
    type: HIDE_MODAL,
  };
}

export function showModalOrder() {
  return {
    type: SHOW_MODAL_ORDER,
  };
}

export function hideModalOrder() {
  return {
    type: HIDE_MODAL_ORDER,
  };
}

export function closeOrder() {
  return {
    type: DELETE_ORDER,
  };
}