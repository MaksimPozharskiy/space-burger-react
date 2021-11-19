import { TIngredients, TIngredient, TGetOrderSuccess, TError, TUser, TOrder } from "../actions/types";

export type TInitialStateIngredients = {
  ingredients: TIngredients;
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  isLoading: boolean;
};

export type TInitialStateConstructor = {
  constructorIngredients: any;
  isBuns: TIngredient | null;
};

export type TInitialStateIngredient = {
  currentIngredient: TIngredient | null;
};

export type TInitialStateOrder = {
  order: TGetOrderSuccess | null;
  orderRequest: boolean;
  orderFailed: boolean;
};

export type TInitialStateModal = {
  isModalOpened: boolean;
  isModalOpenedOrder: boolean;
  isModalOpenedError: boolean;
};

export type TInitialStateError = {
  error: TError;
};

export type TInitialUserInfo = {
  user: TUser;
  success: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  message: string | null;
  userRequest: boolean;
  userRequestFail: boolean;
};

export type TinitialStateWS = {
  wsConnected: boolean;
  wsError: boolean;
  data: {
    data: {
      orders: [TOrder] | [];
      total: number;
      totalToday: number;
    };
  }
};