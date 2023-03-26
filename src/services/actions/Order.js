import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {ORDER_URL} from "../../utils/Constants";

export const makeOrder = createAsyncThunk(
    'order/makeOrder',
    async (ingredients) => {
        const request = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ingredients}),
        };

        return fetch(ORDER_URL, request)
            .then(response => response.ok
                ? response.json()
                : Promise.reject(`Ошибка: ${response.status}, ${response.statusText}`)
            )
            .then(result => {
                    return result.success
                        ? Promise.resolve(result)
                        : Promise.reject("Can't parse ingredients json")
                }
            )
            .catch(error => console.log(error));
    }
);

export const clear = createAction("order/clear");
