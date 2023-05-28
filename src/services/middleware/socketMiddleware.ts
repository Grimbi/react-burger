import {Middleware, MiddlewareAPI} from "redux";
import {AppDispatch, RootState} from "../store";
import {TWSStoreActions} from "../types";

export const socketMiddleware = (wsStoreActions: TWSStoreActions): Middleware => {
    return (store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;
        let isConnected = false;
        let url = "";
        let reconnectTimeout: NodeJS.Timeout | null = null;

        const closeSocket = () => {
            if (socket) {
                socket.close();
                socket = null;
            }

            if (reconnectTimeout) {
                clearTimeout(reconnectTimeout);
                reconnectTimeout = null;
            }
        };

        return next => (action) => {
            const { dispatch} = store;

            if (wsStoreActions.connect.match(action)) {
                if (socket) {
                    closeSocket();
                }

                url = action.payload;
                socket = new WebSocket(url);
                isConnected = true;

                socket.onopen = event => dispatch(wsStoreActions.onOpen());
                socket.onerror = event => dispatch(wsStoreActions.onError("WebSocket has been closed"));
                socket.onmessage = event => dispatch(wsStoreActions.onMessage(JSON.parse(event.data)));

                socket.onclose = event => {
                    if (event.code !== 1000) {
                        dispatch(wsStoreActions.onError(event.code.toString()));
                    }

                    socket = null;
                    dispatch(wsStoreActions.onClose());

                    if (isConnected) {
                        reconnectTimeout = setTimeout(() => dispatch(wsStoreActions.connect(url)), 3000);
                    }
                };
            }

            if (socket) {
                if (wsStoreActions.sendMessage?.match(action)) {
                    socket.send(JSON.stringify(action.payload));
                } else if (wsStoreActions.disconnect.match(action)) {
                    closeSocket();
                    isConnected = false;
                    dispatch(wsStoreActions.onClose());
                }
            }

            next(action);
        };
    };
};