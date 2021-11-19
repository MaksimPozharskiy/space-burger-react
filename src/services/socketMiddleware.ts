import { Middleware } from "redux";
import { getCookie } from "../utils/helpers";
import { RootState } from "./store";

export type WsActions = {
  wsStart: 'WS_CONNECTION_START',
  wsSendMessage: 'WS_SEND_MESSAGE',
  onOpen: 'WS_CONNECTION_SUCCESS',
  wsClose: 'WS_CONNECTION_END',
  onClose: 'WS_CONNECTION_CLOSED',
  onError: 'WS_CONNECTION_ERROR',
  onGetOrders: 'WS_GET_ORDERS',
  wsPingPong: 'WS_SEND_PONG',
};

export const socketMiddleware = (wsUrl: string, wsActions: WsActions): Middleware<{}, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null;
    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const {
        wsStart,
        wsSendMessage,
        onOpen,
        onClose,
        onError,
        onGetOrders,
        wsClose,
        wsPingPong,
      } = wsActions;

      if (type === wsStart) {
        socket = new WebSocket(action.payload);

        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parseData = JSON.parse(data);
          dispatch({
            type: onGetOrders,
            payload: {
              data: parseData,
              timestamp: new Date().getTime() / 100,
            },
          });
        };

        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };
      }
      if (wsClose && type === wsClose && socket) {
        socket.close();
        socket = null;
      }

      if (wsSendMessage && type === wsSendMessage && socket) {
        const message = {
          ...payload,
          token: getCookie("accessToken"),
        };
        socket.send(JSON.stringify(message));
      }

      if (wsPingPong && type === wsPingPong && socket) {
        socket.send("pong");
      }

      next(action);
    };
  };
};