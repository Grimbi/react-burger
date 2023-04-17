import {configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import ingredientsSlice from "./reducers/Ingredients";
import basketSlice from "./reducers/Basket";
import orderSlice from "./reducers/Order";
import userSlice from "./reducers/User";

const rootReducer = {
    ingredients: ingredientsSlice.reducer,
    basket: basketSlice.reducer,
    order: orderSlice.reducer,
    user: userSlice.reducer,
};

export const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk],
    devTools: process.env.NODE_ENV !== 'production',
});

export const selectors = {
    getUser: (store) => store.user,
    getBasket: store => store.basket,
    getIngredients: store => store.ingredients,
    getOrder: store => store.order,
};