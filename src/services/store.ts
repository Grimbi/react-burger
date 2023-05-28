import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {socketMiddleware} from "./middleware/socketMiddleware";
import ingredientsSlice from "./reducers/Ingredients";
import basketSlice from "./reducers/Basket";
import orderSlice from "./reducers/Order";
import userSlice from "./reducers/User";
import feedSlice from "./reducers/Feed";
import ordersSlice from "./reducers/Orders";
import {feedWSStoreActions} from "./actions/Feed";
import {ordersWSStoreActions} from "./actions/orders";

const rootReducer = combineReducers({
    ingredients: ingredientsSlice.reducer,
    basket: basketSlice.reducer,
    order: orderSlice.reducer,
    user: userSlice.reducer,
    feed: feedSlice.reducer,
    orders: ordersSlice.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware()
        .concat(
            socketMiddleware(feedWSStoreActions),
            socketMiddleware(ordersWSStoreActions),
        ),
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const getIngredientsSelector = (state: RootState) => state.ingredients;
export const getBasketSelector = (state: RootState) => state.basket;
export const getUserSelector = (state: RootState) => state.user;
export const getOrderSelector = (state: RootState) => state.order;
export const getFeedSelector = (state: RootState) => state.feed;
export const getOrdersSelector = (state: RootState) => state.orders;
