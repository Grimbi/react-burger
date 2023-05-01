import {configureStore} from "@reduxjs/toolkit";
import ingredientsSlice from "./reducers/Ingredients";
import basketSlice from "./reducers/Basket";
import orderSlice from "./reducers/Order";
import userSlice from "./reducers/User";
import {useDispatch} from "react-redux";

const rootReducer = {
    ingredients: ingredientsSlice.reducer,
    basket: basketSlice.reducer,
    order: orderSlice.reducer,
    user: userSlice.reducer,
};

export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export const getIngredientsSelector = (state: RootState) => state.ingredients;
export const getBasketSelector = (state: RootState) => state.basket;
export const getUserSelector = (state: RootState) => state.user;
export const getOrderSelector = (state: RootState) => state.order;
