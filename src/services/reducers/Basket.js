import {createSlice} from "@reduxjs/toolkit";
import {addIngredient, removeIngredient, shiftIngredient} from "../actions/Basket";

export default createSlice({
    name: 'basket',
    initialState: {
        bun: null,
        ingredients: [],
    },
    extraReducers: (builder) => {
        builder
            .addCase(addIngredient, (state, action) => {
                const item = action.payload;
                if (item.ingredient.type === "bun") {
                    state.bun = item.ingredient;
                } else {
                    state.ingredients.push(item);
                }
            })
            .addCase(removeIngredient, (state, action) => {
                const id = action.payload;
                state.ingredients = state.ingredients.filter(item => item.id !== id);
            })
            .addCase(shiftIngredient, (state, action) => {
                const { shift, item } = action.payload;
                const index = state.ingredients.findIndex(basketItem => basketItem.id === item.id);
                if (index >= 0) {
                    state.ingredients.splice(index, 1);
                    state.ingredients.splice(index + shift, 0, item);
                }
            });
    },
});
