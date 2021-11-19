import { compose, createStore, applyMiddleware } from "redux";
import thunk, { ThunkAction } from "redux-thunk";
import rootReducer from "./reducers";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_ORDERS,
  WS_SEND_MESSAGE,
  WS_SEND_PONG,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_END,
} from "./actions/wsActions";

import { socketMiddleware } from "./socketMiddleware";
import { TApplicationActions } from "./actions/types";

export const wsUrl = "wss://norma.nomoreparties.space/orders/all";

export const wsActions = {
  wsStart: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  wsClose: WS_CONNECTION_END,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onGetOrders: WS_GET_ORDERS,
  wsPingPong: WS_SEND_PONG,
};

const socketFeedOrdersMiddlware = socketMiddleware(wsUrl, wsActions);

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk, socketFeedOrdersMiddlware)
);

export const store = createStore(rootReducer, enhancer);
export type RootState = ReturnType<typeof rootReducer>
// export type AppDispatch = typeof store.dispatch;
export type Dispatch = <TReturnType = void>(action: AppActions | AppThunk) => TReturnType;
export type AppActions = TApplicationActions;
export type AppThunk<ReturnType = void> =
  ThunkAction<ReturnType, RootState, unknown, AppActions>;