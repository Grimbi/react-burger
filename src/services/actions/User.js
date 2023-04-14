import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {login, register} from "../../utils/Utils";

export const userRegister = createAsyncThunk(
    'user/register',
    async (userData) => register(userData)
        .catch(error => console.log(error))
);

export const userLogin = createAsyncThunk(
    'user/login',
    async ({email, password}) => login(email, password)
        .catch(error => console.log(error))
);

export const setUser = createAction(
    "user/setUser",
    (user) => {
        return {payload: user};
    }
);

export const setIsAuthChecked = createAction(
    "user/setIsAuthChecked",
    (checked) => {
        return {payload: checked};
    }
);

export const clear = createAction("user/clear");
