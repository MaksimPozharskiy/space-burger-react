import { mainApiUrl } from '../../utils/constants';
import AuthApi from '../../utils/AuthApi';
import { setCookie } from '../../utils/cookie';
import { Dispatch } from '../store';
export const authApi = new AuthApi(mainApiUrl);

// Ingredients of Burger
export const GET_INGREDIENTS_REQUEST: "GET_INGREDIENTS_REQUEST" = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS" = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED" = "GET_INGREDIENTS_FAILED";

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

// User Order
export const GET_ORDER_REQUEST: "GET_ORDER_REQUEST" = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS: "GET_ORDER_SUCCESS" = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED: "GET_ORDER_FAILED" = "GET_ORDER_FAILED";
export const DELETE_ORDER: "DELETE_ORDER" = "DELETE_ORDER";
export const REMOVE_ORDER: "REMOVE_ORDER" = "REMOVE_ORDER";
export const GET_SELECTED_ORDER: "GET_SELECTED_ORDER" = "GET_SELECTED_ORDER";
export const REMOVE_SELECTED_ORDER: "REMOVE_SELECTED_ORDER" = "REMOVE_SELECTED_ORDER";

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

// Auth 

// Register
export const CREATE_USER_REQUEST: "CREATE_USER_REQUEST" = "CREATE_USER_REQUEST";
export const CREATE_USER_SUCCESS: "CREATE_USER_SUCCESS" = "CREATE_USER_SUCCESS";
export const CREATE_USER_FAILED: "CREATE_USER_FAILED" = "CREATE_USER_FAILED";

export function createUser({ email, password, name }) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: CREATE_USER_REQUEST,
    });
    authApi
      .registerUser(email, password, name)
      .then((res) => {
        if (res.accessToken && res.refreshToken) {
          setCookie("token", res.accessToken.split("Bearer ")[1]);
          localStorage.setItem("refreshToken", res.refreshToken);
          localStorage.setItem("userName", res.user.name);
        }
        dispatch({
          type: CREATE_USER_SUCCESS,
          payload: res,
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(showError(error));
        dispatch({
          type: CREATE_USER_FAILED,
        });
      });
  };
}

// Login
export const LOGIN_USER_REQUEST: "LOGIN_USER_REQUEST" = "LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS: "LOGIN_USER_SUCCESS" = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILED: "LOGIN_USER_FAILED" = "LOGIN_USER_FAILED";

export function loginUser({ email, password }) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: LOGIN_USER_REQUEST,
    });
    authApi
      .loginUser(email, password)
      .then((res) => {
        if (res.accessToken && res.refreshToken) {
          setCookie("token", res.accessToken.split("Bearer ")[1]);
          localStorage.setItem("refreshToken", res.refreshToken);
          localStorage.setItem("userName", res.user.name);
        }
        dispatch({
          type: LOGIN_USER_SUCCESS,
          payload: res,
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(showError(error));
        dispatch({
          type: LOGIN_USER_FAILED,
        });
      });
  };
}

// Forget/Reset Pass
export const FORGET_PASSWORD_CODE: "FORGET_PASSWORD_CODE" = "FORGET_PASSWORD_CODE";
export const RESET_USER_PASSWORD: "RESET_USER_PASSWORD" = "RESET_USER_PASSWORD";

export function forgetUserPassword(email) {
  return (dispatch: Dispatch) => {
    authApi
      .forgetPassword(email)
      .then((res) => {
        dispatch({
          type: FORGET_PASSWORD_CODE,
          payload: res,
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(showError(error));
      });
  };
}

export function resetUserPassword(password, code) {
  return (dispatch: Dispatch) => {
    authApi
      .resetPassword(password, code)
      .then((res) => {
        dispatch({
          type: RESET_USER_PASSWORD,
          payload: res,
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(showError(error));
      });
  };
}

// Logout
export const LOGOUT_USER_INFO: "LOGOUT_USER_INFO" = "LOGOUT_USER_INFO";

export function logout(refreshToken) {
  return (dispatch: Dispatch) => {
    authApi
      .logout(refreshToken)
      .then((res) => {
        dispatch({
          type: LOGOUT_USER_INFO,
          payload: res,
        });
        setCookie("token", '');
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userName");
      })
      .catch((error) => {
        console.log(error);
        dispatch(showError(error));
      });
  };
}


// Refresh user TOKEN
export const REFRESH_USER_TOKEN: "REFRESH_USER_TOKEN" = "REFRESH_USER_TOKEN";

export function refreshToken(afterRefresh) {
  return (dispatch: Dispatch) => {
    authApi
      .refreshToken(localStorage.getItem("refreshToken"))
      .then((res) => {
        if (res.accessToken && res.refreshToken) {
          setCookie("token", res.accessToken.split("Bearer ")[1]);
          localStorage.setItem("refreshToken", res.refreshToken);
        }
        dispatch({
          type: REFRESH_USER_TOKEN,
          payload: res,
        });
        if (afterRefresh) dispatch(afterRefresh);
      })
      .catch((error) => {
        console.log(error);
        dispatch(showError(error));
      });
  };
}

// Get info User
export const GET_USER_INFO_REQUEST: "GET_USER_INFO_REQUEST" = "GET_USER_INFO_REQUEST";
export const GET_USER_INFO_SUCCESS: "GET_USER_INFO" = "GET_USER_INFO";
export const GET_USER_INFO_FAILED: "GET_USER_INFO_FAILED" = "GET_USER_INFO_FAILED";

export function getUserInfo() {
  return (dispatch: Dispatch) => {
    dispatch({
      type: GET_USER_INFO_REQUEST,
    });
    authApi
      .getUserInfo()
      .then((res) => {
        if (!res.success) {
          throw res;
        }
        dispatch({
          type: GET_USER_INFO_SUCCESS,
          payload: res,
        });
      })
      .catch((error) => {
        if (error.status === 403) {
          dispatch(refreshToken(getUserInfo()));
          console.log(error);
        }
        if (error.message === "jwt expired" || error.message === "jwt malformed") {
          dispatch(refreshToken(getUserInfo()));
          console.log(error);
        }
        dispatch({
          type: GET_USER_INFO_FAILED,
        });
      });
  };
}

// Udate info User
export const UPDATE_USER_INFO_REQUEST: "UPDATE_USER_INFO_REQUEST" = "UPDATE_USER_INFO_REQUEST";
export const UPDATE_USER_INFO_SUCCESS: "UPDATE_USER_INFO_SUCCESS" = "UPDATE_USER_INFO_SUCCESS";
export const UPDATE_USER_INFO_FAILED: "UPDATE_USER_INFO_FAILED" = "UPDATE_USER_INFO_FAILED";

export function updateUserInfo(name, email, password) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: UPDATE_USER_INFO_REQUEST,
    });
    authApi
      .updateUserInfo(name, email, password)
      .then((res) => {
        if (!res.success) {
          throw res;
        }
        dispatch({
          type: UPDATE_USER_INFO_SUCCESS,
          payload: res,
        });
        localStorage.setItem("userName", res.user.name);
      })
      .catch((error) => {
        if (error.status === 403) {
          dispatch(refreshToken(getUserInfo()));
          console.log(error);
        }
        if (error.message === "jwt expired") {
          dispatch(refreshToken(updateUserInfo(name, email, password)));
          console.log(error);
          dispatch({
            type: UPDATE_USER_INFO_FAILED,
          });
        }
      });
  };
}

// WebSockets
export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_GET_ORDERS: 'WS_GET_ORDERS' = 'WS_GET_ORDERS';
export const WS_SEND_MESSAGE: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';
export const WS_SEND_PONG: 'WS_SEND_PONG' = 'WS_SEND_PONG';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_CONNECTION_END: 'WS_CONNECTION_END' = 'WS_CONNECTION_END';

export function wsConnectionSuccess() {
  return {
    type: WS_CONNECTION_SUCCESS,
  };
}

export function wsGetOrders(orders) {
  return {
    type: WS_GET_ORDERS,
    payload: orders,
  };
}

export const wsSendMessage = (message) => {
  return {
    type: WS_SEND_MESSAGE,
    payload: message,
  };
};

export const wsConnectionError = () => {
  return {
    type: WS_CONNECTION_ERROR,
  };
};

export const wsConnectionClosed = () => {
  return {
    type: WS_CONNECTION_CLOSED,
  };
};