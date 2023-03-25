import {createSlice} from "@reduxjs/toolkit";
import {clear, setOrder} from "../actions/Order";

export default createSlice({
    name: "order",
    initialState: null,
    extraReducers: (builder) => {
        builder
            .addCase(setOrder, (state, action) => {
                return action.payload;
            })
            .addCase(clear, (state) => {
                return null;
            })
    },
});
