import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
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
} from "./actions/index";
import { socketMiddleware } from "./socketMiddleware";

const wsUrl = "wss://norma.nomoreparties.space/orders/all";

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

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk, socketFeedOrdersMiddlware)
);

export const store = createStore(rootReducer, enhancer);