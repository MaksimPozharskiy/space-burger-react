import { Dispatch } from "../store";
import { DELETE_ORDER } from "./orderActions";

// Selected ingredients
export const GET_SELECTED_INGREDIENT_INFO: "GET_SELECTED_INGREDIENT_INFO" = "GET_SELECTED_INGREDIENT_INFO";
export const DELETE_SELECTED_INGREDIENT_INFO: "DELETE_SELECTED_INGREDIENT_INFO" = "DELETE_SELECTED_INGREDIENT_INFO";

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

// Other 
export const SHOW_MODAL: "SHOW_MODAL" = "SHOW_MODAL";
export const HIDE_MODAL: "HIDE_MODAL" = "HIDE_MODAL";
export const SHOW_MODAL_ORDER: "SHOW_MODAL_ORDER" = "SHOW_MODAL_ORDER";
export const HIDE_MODAL_ORDER: "HIDE_MODAL_ORDER" = "HIDE_MODAL_ORDER";

export function closeModals() {
  return (dispatch: Dispatch) => {
    dispatch(deleteSelectedIngredient());
    dispatch(closeOrder());
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

// Errors 
export const SHOW_ERROR: "SHOW_ERROR" = "SHOW_ERROR";
export const HIDE_ERROR: "HIDE_ERROR" = "HIDE_ERROR";
export const SHOW_MODAL_ERROR: "SHOW_MODAL_ERROR" = "SHOW_MODAL_ERROR";
export const HIDE_MODAL_ERROR: "HIDE_MODAL_ERROR" = "HIDE_MODAL_ERROR";

export function showError(error) {
  return {
    type: SHOW_ERROR,
    payload: error,
  };
}

export function hideError() {
  return {
    type: HIDE_ERROR,
  };
}

export function showModalError() {
  return {
    type: SHOW_MODAL_ERROR,
  };
}

export function hideModalError() {
  return {
    type: HIDE_MODAL_ERROR,
  };
}
