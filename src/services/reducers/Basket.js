import {createSlice} from "@reduxjs/toolkit";
import {addIngredient, removeIngredient, shiftIngredient} from "../actions/Basket";

export default createSlice({
    name: 'basket',
    initialState: {
        bun: null,
        ingredients: [],
        nextKey: 1,
    },
    extraReducers: (builder) => {
        builder
            .addCase(addIngredient, (state, action) => {
                const ingredient = action.payload;
                if (ingredient.type === "bun") {
                    state.bun = ingredient;
                    state.ingredients = [
                        { id: state.nextKey + 1, ingredient },
                        ...state.ingredients.filter(item => item.ingredient.type !== "bun"),
                        { id: state.nextKey + 2, ingredient },
                    ];
                    state.nextKey += 2;
                } else if (state.bun) {
                    state.ingredients.splice(
                        state.ingredients.length - 1,
                        0,
                        { id: state.nextKey + 1, ingredient }
                    );
                    state.nextKey++;
                } else {
                    state.ingredients.push({ id: state.nextKey + 1, ingredient });
                    state.nextKey++;
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
