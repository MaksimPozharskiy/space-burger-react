import { getCookie } from "../utils/helpers";

export const socketMiddleware = (wsUrl, wsActions) => {
  return (store) => {
    let socket;

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
        socket = undefined;
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