import {createAction, nanoid} from "@reduxjs/toolkit";

export const addIngredient = createAction(
    "basket/addIngredient",
    (ingredient) => {
        return {
            payload: {id: nanoid(), ingredient}
        }
    }
);

export const removeIngredient = createAction("basket/removeIngredient");
export const shiftIngredient = createAction("basket/shiftIngredient");
