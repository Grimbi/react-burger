import {IIngredient} from "./Ingredients";
import {nanoid} from "@reduxjs/toolkit";

export type TBasketItemId = string;

export interface IBasketItem {
    id: TBasketItemId;
    ingredient: IIngredient;
}

export const makeNewBasketItem = (ingredient: IIngredient): IBasketItem => {
    return {
        id: nanoid(),
        ingredient,
    };
}
