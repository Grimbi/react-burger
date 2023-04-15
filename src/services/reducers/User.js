import {createSlice} from "@reduxjs/toolkit";
import {clear, setIsAuthChecked, setIsWaitingReset, setUser, userLogin, userRegister} from "../actions/User";

export default createSlice({
    name: "user",
    initialState: {
        user: null,
        isAuthChecked: false,
        isWaitingReset: false,
    },
    extraReducers: (builder) => {
        builder
            .addCase(setUser, (state, action) => {
                state.user = action.payload;
                state.isAuthChecked = true;
            })
            .addCase(userRegister.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthChecked = true;
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthChecked = true;
            })
            .addCase(setIsAuthChecked, (state, action) => {
                state.isAuthChecked = action.payload;
            })
            .addCase(setIsWaitingReset, (state, action) => {
                state.isWaitingReset = action.payload;
            })
            .addCase(clear, (state) => {
                state.user = null;
                state.isWaitingReset = false;
            })
    },
});
