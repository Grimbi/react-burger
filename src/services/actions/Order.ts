import {createAction} from "@reduxjs/toolkit";
import {createAppAsyncThunk, getErrorDescription} from "../../utils/Utils";
import {addOrder} from "../../utils/ServerApi";

export const makeOrder = createAppAsyncThunk<number, Array<string>>(
    'order/makeOrder',
    async (ingredients, thunkApi) => {
        try {
            return await addOrder(ingredients);
        } catch (error) {
            return thunkApi.rejectWithValue(
                getErrorDescription(error, "Не получилось создать заказ")
            );
        }
    }
);

export const clearOrder = createAction("order/clear");
