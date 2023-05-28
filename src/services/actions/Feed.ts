import {ActionCreatorWithPayload, createAction} from "@reduxjs/toolkit";
import {TWSStoreActions} from "../types";
import {TOrdersList} from "../../models/Order";

export const feedWSConnect = createAction<string>("feed/wsConnect");
export const feedWSDisconnect = createAction("feed/wsDisconnect");
export const feedOnWSOpen = createAction("feed/onWSOpen");
export const feedOnWSClose = createAction("feed/onWSClose");
export const feedOnWSError = createAction<string>("feed/onWSError");
export const feedOnWSMessage = createAction<TOrdersList>("feed/onWSMessage");

export const feedWSStoreActions: TWSStoreActions = {
    connect: feedWSConnect,
    disconnect: feedWSDisconnect,
    onOpen: feedOnWSOpen,
    onClose: feedOnWSClose,
    onError: feedOnWSError,
    onMessage: feedOnWSMessage as ActionCreatorWithPayload<object>,
};
