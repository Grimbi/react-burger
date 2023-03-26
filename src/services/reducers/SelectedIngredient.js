import {createSlice} from "@reduxjs/toolkit";
import {clear, setIngredient} from "../actions/SelectedIngredient";

export default createSlice({
    name: 'selectedIngredient',
    initialState: null,
    extraReducers: (builder) => {
        builder
            .addCase(setIngredient, (state, action) => {
                return action.payload;
            })
            .addCase(clear, (state) => {
                return null;
            })
    },
});
