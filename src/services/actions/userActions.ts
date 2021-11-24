import { authApi } from ".";
import { Dispatch } from "../store";
import { refreshToken } from "./authActions";

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
