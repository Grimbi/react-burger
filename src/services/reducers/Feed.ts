import {createSlice} from "@reduxjs/toolkit";
import {feedOnWSClose, feedOnWSError, feedOnWSMessage, feedOnWSOpen} from "../actions/Feed";
import {TOrder} from "../../models/Order";

interface IFeedState {
    isOpen: boolean;
    orders: Array<TOrder>;
    total: number;
    totalToday: number;
    error: string | null;
}

const initialState: IFeedState = {
    isOpen: false,
    orders: [],
    total: 0,
    totalToday: 0,
    error: null,
};

export default createSlice({
    name: 'feed',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(feedOnWSOpen, (state) => {
                state.isOpen = true;
                state.error = null;
            })
            .addCase(feedOnWSError, (state, action) => {
                state.error = action.payload;
            })
            .addCase(feedOnWSClose, (state) => {
                state.isOpen = false;
                state.error = null;
            })
            .addCase(feedOnWSMessage, (state, action) => {
                state.orders = action.payload.orders.filter(
                    order => order._id?.length > 0
                        && order.number > 0
                        && order.name?.length > 0
                        && order.ingredients?.length > 0
                        && order.updatedAt?.length > 0
                );
                state.total = action.payload.total;
                state.totalToday = action.payload.totalToday;
            })
        ;
    },
});
