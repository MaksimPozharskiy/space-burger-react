import { ChangeEvent } from 'react';
import {
  WS_CONNECTION_SUCCESS,
  WS_GET_ORDERS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_SEND_MESSAGE,
  WS_CONNECTION_START,
  WS_CONNECTION_END,
} from '../actions/wsActions';

import {  
  ADD_CONSTRUCTOR_INGREDIENT,
  DELETE_CONSTRUCTOR_INGREDIENT,
  MOVE_CONSTRUCTOR_INGREDIENT,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  RESET_CONSTRUCTOR_INGREDIENT,
} from './burgerActions';

import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  DELETE_ORDER,
  GET_SELECTED_ORDER,
  REMOVE_SELECTED_ORDER,
  REMOVE_ORDER,
  RESET_ORDER,
} from './orderActions';

import {
  GET_SELECTED_INGREDIENT_INFO,
  DELETE_SELECTED_INGREDIENT_INFO,
  SHOW_MODAL,
  HIDE_MODAL,
  SHOW_MODAL_ORDER,
  HIDE_MODAL_ORDER,
  SHOW_ERROR,
  HIDE_ERROR,
  SHOW_MODAL_ERROR,
  HIDE_MODAL_ERROR,
} from '../actions/modalActions';

import {
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILED,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  FORGET_PASSWORD_CODE,
  RESET_USER_PASSWORD,
  LOGOUT_USER_INFO,
  REFRESH_USER_TOKEN,
} from './authActions';

import {
  UPDATE_USER_INFO_REQUEST,
  UPDATE_USER_INFO_SUCCESS,
  UPDATE_USER_INFO_FAILED,
  GET_USER_INFO_FAILED,
  GET_USER_INFO_REQUEST,
  GET_USER_INFO_SUCCESS,
} from './userActions';

export type TDnDIndex = {
  dragIndex: number;
  hoverIndex: number;
};

export type TIngredients = [];

export type TIngredient = {
  calories: number;
  carbohydrates: number;
  count: number;
  fat: number;
  image: string;
  image_large?: string;
  image_mobile?: string;
  name: string;
  proteins: number;
  type: string;
  _id: string;
  price: number;
  index: number;
  bunLock: boolean;
  bunLock_top: boolean;
  bunLock_bottom: boolean;
  ingredientId: string;
};

export type TOrder = {
  createdAt: number;
  ingredients: TIngredients;
  name: string;
  number: number;
  status: string;
  updatedAt: string;
  _id: string;
};

export type TOrders = {
  orders:
    | [
        {
          ingredients: TIngredients;
          _id: string;
          status: string;
          number: number;
          createdAt: string;
        }
      ]
    | [];
};

export type TError = {
  status?: number;
  title?: string;
  statusText?: string;
};

export type TUser = { email: string; name: string; password: string };

export type TInput = {
  placeholder: string;
  type: string;
  isRequired: boolean;
  value: string;
  custom?: boolean;
  handleChange: (evt: ChangeEvent) => void;
};

export type TModalPropsType = {
  type: string;
  isModal: boolean;
  header?: string;
  children?: {};
};

export type WSData = {
  orders: [TOrder];
  success: boolean;
  timestamp: number;
  total: number;
  totalToday: number;
};

export interface IClearClientIngredients {
  readonly type: typeof DELETE_ORDER;
}

export interface IMoveClientIngredient {
  readonly type: typeof MOVE_CONSTRUCTOR_INGREDIENT;
  payload: TDnDIndex;
}

export interface IRemoveClientIngredient {
  readonly type: typeof DELETE_CONSTRUCTOR_INGREDIENT;
  payload: string;
}

export interface IAddClientIngredient {
  readonly type: typeof ADD_CONSTRUCTOR_INGREDIENT;
  payload: TIngredient;
}

export interface IGetUserInfoRequest {
  readonly type: typeof GET_USER_INFO_REQUEST;
}

export interface IGetUserInfo {
  readonly type: typeof GET_USER_INFO_SUCCESS;
  payload: {
    success: boolean;
    user: TUser;
  };
}

export interface IGetUserInfoFailed {
  readonly type: typeof GET_USER_INFO_FAILED;
}

export interface IUpdateUserInfoRequest {
  readonly type: typeof UPDATE_USER_INFO_REQUEST;
}

export interface IUpdateUserInfo {
  readonly type: typeof UPDATE_USER_INFO_SUCCESS;
  payload: {
    success: boolean;
    user: TUser;
  };
}

export interface IUpdateUserInfoFailed {
  readonly type: typeof UPDATE_USER_INFO_FAILED;
}

export interface ILoginUserRequest {
  readonly type: typeof LOGIN_USER_REQUEST;
}

export interface ILoginUser {
  readonly type: typeof LOGIN_USER_SUCCESS;
  payload: {
    success: boolean;
    user: TUser;
    accessToken: string;
    refreshToken: string;
  };
}

export interface ILoginUserFailed {
  readonly type: typeof LOGIN_USER_FAILED;
}

export interface ICreateUserRequest {
  readonly type: typeof CREATE_USER_REQUEST;
}

export interface ICreateUser {
  readonly type: typeof CREATE_USER_SUCCESS;
  payload: {
    success: boolean;
    user: TUser;
    accessToken: string;
    refreshToken: string;
  };
}

export interface ICreateUserFailed {
  readonly type: typeof CREATE_USER_FAILED;
}

export interface IGetCodeUserPassword {
  readonly type: typeof FORGET_PASSWORD_CODE;
  payload: { success: boolean; message: string };
}

export interface IResetUserPassword {
  readonly type: typeof RESET_USER_PASSWORD;
  payload: { success: boolean; message: string };
}

export interface ILogout {
  readonly type: typeof LOGOUT_USER_INFO;
  payload: { success: boolean; message: string };
}

export interface IRefreshToken {
  readonly type: typeof REFRESH_USER_TOKEN;
  payload: {
    success: boolean;
    user: TUser;
    accessToken: string;
    refreshToken: string;
  };
}

export interface IPutIngredientsListRequest {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IPutIngredientsList {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  payload: TIngredients;
}

export interface IPutIngredientsListFailed {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}


export interface IResetConstructorIngredient {
  readonly type: typeof RESET_CONSTRUCTOR_INGREDIENT;
}

export interface IHideError {
  readonly type: typeof HIDE_ERROR;
}

export interface IShowError {
  readonly type: typeof SHOW_ERROR;
  payload: TError;
}

export interface IHideModalError {
  readonly type: typeof HIDE_MODAL_ERROR;
}

export interface IShowModalError {
  readonly type: typeof SHOW_MODAL_ERROR;
}

export interface IShowMenu {
  readonly type: typeof SHOW_MODAL;
}

export interface IHideMenu {
  readonly type: typeof HIDE_MODAL;
}
export interface IShowPersonalMenu {
  readonly type: typeof SHOW_MODAL_ORDER;
}
export interface IHidePersonalMenu {
  readonly type: typeof HIDE_MODAL_ORDER;
}

export interface IGetSelectedIngredient {
  readonly type: typeof GET_SELECTED_INGREDIENT_INFO;
  payload: TIngredient;
}

export interface IRemoveSelectedIngredient {
  readonly type: typeof DELETE_SELECTED_INGREDIENT_INFO;
}

export interface IGetOrderRequest {
  readonly type: typeof GET_ORDER_REQUEST;
}
export type TGetOrderSuccess = {
  name: string;
  order: TOrder;
  success: string;
};

export interface IGetOrder {
  readonly type: typeof GET_ORDER_SUCCESS;
  payload: TGetOrderSuccess;
}
export interface IGetOrderFailed {
  readonly type: typeof GET_ORDER_FAILED;
}

export interface IHideOrder {
  readonly type: typeof REMOVE_ORDER;
}

export interface IGetSelectedOrder {
  readonly type: typeof GET_SELECTED_ORDER;
  payload: TOrder;
}

export interface IRemoveSelectedOrder {
  readonly type: typeof REMOVE_SELECTED_ORDER;
}

export interface IResetOrder {
  readonly type: typeof RESET_ORDER;
}

export interface IWsConnectionStart{
  readonly type: typeof WS_CONNECTION_START;
  payload: string;
}

export interface IWsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}
export interface IWsGetOrders {
  readonly type: typeof WS_GET_ORDERS;
  payload: WSData;
}
export interface IWsSendMessage {
  readonly type: typeof WS_SEND_MESSAGE;
  payload: string;
}
export interface IWsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
}
export interface IWsConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWsConnectionEnd {
  readonly type: typeof WS_CONNECTION_END;
}

export type TApplicationActions =
  | IClearClientIngredients
  | IMoveClientIngredient
  | IRemoveClientIngredient
  | IAddClientIngredient
  | IHideError
  | IShowError
  | IShowMenu
  | IHideMenu
  | IShowPersonalMenu
  | IHidePersonalMenu
  | IGetSelectedIngredient
  | IRemoveSelectedIngredient
  | IHideOrder
  | IGetSelectedOrder
  | IRemoveSelectedOrder
  | IWsConnectionSuccess
  | IWsGetOrders
  | IWsSendMessage
  | IWsConnectionError
  | IWsConnectionClosed
  | IWsConnectionEnd
  | IGetOrder
  | IGetUserInfo
  | IWsConnectionStart
  | IUpdateUserInfo
  | ILoginUser
  | ICreateUser
  | IResetUserPassword
  | IGetCodeUserPassword
  | IRefreshToken
  | ILogout
  | IPutIngredientsList
  | IPutIngredientsListRequest
  | IPutIngredientsListFailed
  | IGetUserInfoRequest
  | IGetUserInfoFailed
  | IUpdateUserInfoRequest
  | IUpdateUserInfoFailed
  | IGetOrderFailed
  | IGetOrderRequest
  | ICreateUserRequest
  | ICreateUserFailed
  | ILoginUserRequest
  | ILoginUserFailed
  | IHideModalError
  | IResetConstructorIngredient
  | IShowModalError;