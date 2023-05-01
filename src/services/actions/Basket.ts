import {createAction} from "@reduxjs/toolkit";
import {IBasketItem, TBasketItemId} from "../../models/Basket";

export const addIngredient = createAction<IBasketItem>("basket/addIngredient");
export const removeIngredient = createAction<TBasketItemId>("basket/removeIngredient");

export type TShiftIngredientPayload = {
    shift: number;
    item: IBasketItem;
};

export const shiftIngredient = createAction<TShiftIngredientPayload>("basket/shiftIngredient");
