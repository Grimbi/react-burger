import {createAction} from "@reduxjs/toolkit";

export const addIngredient = createAction("basket/addIngredient");
export const removeIngredient = createAction("basket/removeIngredient");
export const shiftIngredient = createAction("basket/shiftIngredient");
