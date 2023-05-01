import {createSlice} from "@reduxjs/toolkit";
import {clearOrder, makeOrder} from "../actions/Order";

interface IOrderState {
    orderId: number | null;
}

const initialState: IOrderState = {
    orderId: null,
};

export default createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(makeOrder.fulfilled, (state, action) => {
                state.orderId = action.payload;
            })
            .addCase(clearOrder, (state) => {
                state.orderId = null;
            })
    },
});
