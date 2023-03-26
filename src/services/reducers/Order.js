import {createSlice} from "@reduxjs/toolkit";
import {clear, makeOrder} from "../actions/Order";

export default createSlice({
    name: "order",
    initialState: null,
    extraReducers: (builder) => {
        builder
            .addCase(makeOrder.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(clear, (state) => {
                return null;
            })
    },
});
