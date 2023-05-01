import {createAction} from "@reduxjs/toolkit";
import {createAppAsyncThunk, getErrorDescription} from "../../utils/Utils";
import {IUser, IUserWithPassword} from "../../models/User";
import {IResponseWithTokens, LOGIN_URL, post, REGISTER_URL, saveTokens} from "../../utils/ServerApi";

export const userRegister = createAppAsyncThunk<IUser, IUserWithPassword>(
    'user/register',
    async (user, thunkApi) => {
        try {
            const response = await post<IResponseWithTokens>(REGISTER_URL, user);
            saveTokens(response.accessToken, response.refreshToken);
            return response.user;
        } catch (error) {
            return thunkApi.rejectWithValue(
                getErrorDescription(error, "Не получилось зарегистрировать пользователя")
            );
        }
    }
);

interface ILogin {
    email: string;
    password: string;
}

export const userLogin = createAppAsyncThunk<IUser, ILogin>(
    'user/login',
    async (user, thunkApi) => {
        try {
            const response = await post<IResponseWithTokens>(LOGIN_URL, user);
            saveTokens(response.accessToken, response.refreshToken);
            return response.user;
        } catch (error) {
            return thunkApi.rejectWithValue(
                getErrorDescription(error, "Не получилось авторизовать пользователя")
            );
        }
    }
);

export const setUser = createAction<IUser>("user/setUser");
export const setIsAuthChecked = createAction<boolean>("user/setIsAuthChecked");
export const setIsWaitingReset = createAction<boolean>("user/setWaitingReset");
export const clear = createAction("user/clear");
