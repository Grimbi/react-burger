import {createAction} from "@reduxjs/toolkit";
import {createAppAsyncThunk, getErrorDescription} from "../../utils/Utils";
import {IResponse, ORDER_URL, post} from "../../utils/ServerApi";

interface IOrder {
    number: number;
}

interface IMakeOrderResponse extends IResponse {
    name: string;
    order: IOrder;
}

export const makeOrder = createAppAsyncThunk<number, Array<string>>(
    'order/makeOrder',
    async (ingredients, thunkApi) => {
        try {
            const response = await post<IMakeOrderResponse>(ORDER_URL, {ingredients});
            return response.order.number;
        } catch (error) {
            return thunkApi.rejectWithValue(
                getErrorDescription(error, "Не получилось загрузить список ингредиентов")
            );
        }
    }
);

export const clear = createAction("order/clear");
