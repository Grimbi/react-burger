import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {API_URL, ORDER_URL} from "../../utils/Constants";
import {checkResponse} from "../../utils/Utils";

export const makeOrder = createAsyncThunk(
    'order/makeOrder',
    async (ingredients) => {
        const request = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ingredients}),
        };

        return fetch(`${API_URL}${ORDER_URL}`, request)
            .then(checkResponse)
            .then(result => result.success
                ? Promise.resolve(result)
                : Promise.reject("Can't parse ingredients json")
            )
            .catch(error => console.log(error));
    }
);

export const clear = createAction("order/clear");
