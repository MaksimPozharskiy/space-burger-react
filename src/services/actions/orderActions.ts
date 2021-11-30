import { authApi } from ".";
import { Dispatch } from "../store";

export const GET_ORDER_REQUEST: "GET_ORDER_REQUEST" = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS: "GET_ORDER_SUCCESS" = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED: "GET_ORDER_FAILED" = "GET_ORDER_FAILED";
export const DELETE_ORDER: "DELETE_ORDER" = "DELETE_ORDER";
export const REMOVE_ORDER: "REMOVE_ORDER" = "REMOVE_ORDER";
export const GET_SELECTED_ORDER: "GET_SELECTED_ORDER" = "GET_SELECTED_ORDER";
export const REMOVE_SELECTED_ORDER: "REMOVE_SELECTED_ORDER" = "REMOVE_SELECTED_ORDER";
export const RESET_ORDER: "RESET_ORDER" = "RESET_ORDER";

export function getOrder(ingredients) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: GET_ORDER_REQUEST,
    });

    authApi.getOrder(ingredients)
      .then((res) => {
        dispatch({
          type: GET_ORDER_SUCCESS,
          payload: res,
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: GET_ORDER_FAILED,
        });
      });
  };
}

export function hideOrder() {
  return {
    type: REMOVE_ORDER,
  };
}

export function getSelectedOrder(currentOrder) {
  return {
    type: GET_SELECTED_ORDER,
    payload: currentOrder,
  };
}

export function removeSelectedOrder() {
  return {
    type: REMOVE_SELECTED_ORDER,
  };
}

export function resetOrder() {
  return {
    type: RESET_ORDER,
  };
}

