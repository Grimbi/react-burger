import {createAsyncThunk} from "@reduxjs/toolkit";
import {API_URL, INGREDIENTS_URL} from "../../utils/Constants";
import {checkResponse} from "../../utils/Utils";

export const fetchIngredients = createAsyncThunk(
    'users/fetchIngredients',
    async () => {
        return fetch(`${API_URL}${INGREDIENTS_URL}`)
            .then(checkResponse)
            .then(result => result.success
                ? Promise.resolve(result.data)
                : Promise.reject("Can't parse ingredients json")
            )
            .catch(error => console.log(error));
    }
);
