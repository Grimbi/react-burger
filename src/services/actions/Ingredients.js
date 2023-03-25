import {createAsyncThunk} from "@reduxjs/toolkit";
import {INGREDIENTS_URL} from "../../utils/Constants";

export const fetchIngredients = createAsyncThunk(
    'users/fetchIngredients',
    async () => {
        return fetch(INGREDIENTS_URL)
            .then(response => response.ok
                ? response.json()
                : Promise.reject(`Ошибка: ${response.status}, ${response.statusText}`)
            )
            .then(result => result.success
                ? Promise.resolve(result.data)
                : Promise.reject("Can't parse ingredients json")
            )
            .catch(error => console.log(error));
    }
);
