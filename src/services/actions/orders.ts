import {ActionCreatorWithPayload, createAction} from "@reduxjs/toolkit";
import {TOrdersList} from "../../models/Order";
import {TWSStoreActions} from "../types";

export const ordersWSConnect = createAction<string>("orders/wsConnect");
export const ordersWSDisconnect = createAction("orders/wsDisconnect");
export const ordersOnWSOpen = createAction("orders/onWSOpen");
export const ordersOnWSClose = createAction("orders/onWSClose");
export const ordersOnWSError = createAction<string>("orders/onWSError");
export const ordersOnWSMessage = createAction<TOrdersList>("orders/onWSMessage");

export const ordersWSStoreActions: TWSStoreActions = {
    connect: ordersWSConnect,
    disconnect: ordersWSDisconnect,
    onOpen: ordersOnWSOpen,
    onClose: ordersOnWSClose,
    onError: ordersOnWSError,
    onMessage: ordersOnWSMessage as ActionCreatorWithPayload<object>,
};
