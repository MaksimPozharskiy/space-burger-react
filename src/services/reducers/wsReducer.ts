import { WS_CONNECTION_SUCCESS, WS_CONNECTION_ERROR, WS_CONNECTION_CLOSED, WS_GET_ORDERS } from "../actions/wsActions";
import { TinitialStateWS } from "./types";

const initialStateWS: TinitialStateWS = {
  wsConnected: false,
  wsError: false,
  Data: {
    orders: [],
    total: 0,
    totalToday: 0,
  },
};

export const wsReducer = (state = initialStateWS, action): TinitialStateWS => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      };
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
        wsError: true,
      };
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
        wsError: false,
      };
    case WS_GET_ORDERS:
      return {
        ...state,
        Data: action.payload,
      };
    default:
      return state;
  }
};