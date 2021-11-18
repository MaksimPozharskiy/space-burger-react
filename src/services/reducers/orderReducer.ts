import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED, DELETE_ORDER } from "../actions/orderActions";
import { TInitialStateOrder } from "./types";

const initialStateOrder: TInitialStateOrder = {
  order: null,
  orderRequest: false,
  orderFailed: false,
};

export const getOrderReducer = (state = initialStateOrder, action): TInitialStateOrder => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderFailed: false,
        order: action.payload,
        orderRequest: false,
      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        orderFailed: true,
        orderRequest: false,
      };
    }
    case DELETE_ORDER: {
      return {
        ...state,
        orderFailed: false,
        orderRequest: false,
        order: null,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};