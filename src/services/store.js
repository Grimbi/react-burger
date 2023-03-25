import {configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import ingredientsSlice from "./reducers/Ingredients";
import basketSlice from "./reducers/Basket";
import selectedIngredientSlice from "./reducers/SelectedIngredient";
import orderSlice from "./reducers/Order";

const rootReducer = {
    ingredients: ingredientsSlice.reducer,
    basket: basketSlice.reducer,
    selectedIngredient: selectedIngredientSlice.reducer,
    order: orderSlice.reducer,
};

export const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk],
    devTools: process.env.NODE_ENV !== 'production',
});
