import axios, {Method} from "axios";
import {ILoginData, IUser, IUserWithPassword} from "../models/User";
import {IIngredient} from "../models/Ingredients";

const REGISTER_URL = "auth/register";
const LOGIN_URL = "auth/login";
const LOGOUT_URL = "auth/logout";
const TOKEN_URL = "auth/token";
const USER_URL = "auth/user";
const INGREDIENTS_URL = "ingredients";
const ORDER_URL = "orders";
const INIT_PASSWORD_RESET_URL = "password-reset";
const FINISH_PASSWORD_RESET_URL = "password-reset/reset";

export interface IResponse {
    success: boolean;
    message?: string;
}

export interface IResponseWithUser extends IResponse {
    user: IUser;
}

export interface IResponseWithTokens extends IResponseWithUser {
    accessToken: string;
    refreshToken: string;
}

export class ApiError extends Error {
    toString(): string {
        return this.message || "Unknown error";
    }
}

const request = async <T extends IResponse>(method: Method, url: string, data?: any): Promise<T> => {
    try {
        const axiosResponse = await axiosInstance.request<T>({method, url, data});
        const response = axiosResponse.data;
        return response.success
            ? response
            : Promise.reject(new ApiError(response.message));
    } catch (error) {
        console.log(error);
        const message = error instanceof Error ? error.message : "Unknown error";
        return Promise.reject(new ApiError(message));
    }
}

function saveTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
}

export const get = async <T extends IResponse>(url: string): Promise<T> => {
    return request<T>("GET", url);
}

export const post = async <T extends IResponse>(url: string, data?: any): Promise<T> => {
    return request<T>("POST", url, data);
}

export const register = async (user: IUserWithPassword): Promise<IUser> => {
    const response = await post<IResponseWithTokens>(REGISTER_URL, user);
    saveTokens(response.accessToken, response.refreshToken);
    return response.user;
}

export const login = async (user: ILoginData): Promise<IUser> => {
    const response = await post<IResponseWithTokens>(LOGIN_URL, user);
    saveTokens(response.accessToken, response.refreshToken);
    return response.user;
}

export const logout = async (): Promise<IResponse> => {
    const token = localStorage.getItem("refreshToken");
    return token
        ? post<IResponse>(LOGOUT_URL, {token})
            .then(response => {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                return response;
            })
        : Promise.reject(new ApiError("No refresh token"));
};

export const resetPassword = async (email: string): Promise<IResponse> => {
    const response = await post<IResponse>(INIT_PASSWORD_RESET_URL, {email});
    return response.success
        ? Promise.resolve(response)
        : Promise.reject(response.message || "Can't reset password");
};

export const finishResetPassword = async (password: string, token: string): Promise<IResponse> => {
    const response = await post<IResponse>(FINISH_PASSWORD_RESET_URL, {password, token});
    return response.success
        ? Promise.resolve(response)
        : Promise.reject(response.message || "Can't reset password");
};

const refreshToken = async (): Promise<IResponseWithTokens> => {
    const token = localStorage.getItem("refreshToken");
    return token
        ? post<IResponseWithTokens>(TOKEN_URL, {token})
        : Promise.reject(new ApiError("There is no refresh token"));
};

export const requestWithAuth = async <T extends IResponse>(
    method: Method,
    url: string,
    requestData?: object,
    attempts = 0
): Promise<T> => {
    if (attempts >= 2) {
        return Promise.reject(new ApiError("Can't fetch data"));
    }

    try {
        return await request<T>(method, url, requestData);
    } catch (error) {
        if (error instanceof ApiError && error.message === "jwt expired") {
            const newTokenData = await refreshToken();
            if (newTokenData.success) {
                saveTokens(newTokenData.accessToken, newTokenData.refreshToken);
                return requestWithAuth<T>(method, url, requestData, attempts + 1);
            }
        }
        return Promise.reject(error);
    }
};

interface IIngredientsResponse extends IResponse {
    data: Array<IIngredient>;
}

export const loadIngredients = async (): Promise<Array<IIngredient>> => {
    const response = await get<IIngredientsResponse>(INGREDIENTS_URL);
    return response.data;
}

export const getUserProfile = async (): Promise<IUser> => {
    const response = await requestWithAuth<IResponseWithUser>("GET", USER_URL);
    return response.success
        ? Promise.resolve(response.user)
        : Promise.reject(new ApiError(response.message));
};

export const updateUserProfile = async (profile: IUser): Promise<IUser> => {
    const response = await requestWithAuth<IResponseWithUser>("PATCH", USER_URL, profile);
    return response.success
        ? Promise.resolve(response.user)
        : Promise.reject(new ApiError(response.message));
};

interface IOrder {
    number: number;
}

interface IMakeOrderResponse extends IResponse {
    name: string;
    order: IOrder;
}

export const addOrder = async (ingredients: Array<string>): Promise<number> => {
    const response = await requestWithAuth<IMakeOrderResponse>("POST", ORDER_URL, {ingredients});
    return response.success
        ? Promise.resolve(response.order.number)
        : Promise.reject(new ApiError(response.message));
}

const axiosInstance = axios.create({
    baseURL: "https://norma.nomoreparties.space/api",
    timeout: 5000,
    timeoutErrorMessage: "Request timeout",
    responseType: "json",
});

axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem("accessToken");
    if (token && config.url !== "orders") {
        config.headers.Authorization = token;
    }
    return config;
});
