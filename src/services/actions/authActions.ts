// Auth 

import { authApi } from ".";
import { setCookie } from "../../utils/cookie";
import { Dispatch } from "../store";
import { showError } from "./modalActions";

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
