import {createSlice} from "@reduxjs/toolkit";
import {fetchIngredients} from "../actions/Ingredients";

export default createSlice({
    name: 'ingredients',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchIngredients.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchIngredients.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchIngredients.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
    },
});
