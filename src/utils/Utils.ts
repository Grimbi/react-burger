import {
    API_URL,
    FINISH_PASSWORD_RESET_URL,
    INIT_PASSWORD_RESET_URL,
    LOGOUT_URL,
    TOKEN_URL,
    USER_URL
} from "./Constants";
import {IUser} from "../models/User";
import {IResponse, IResponseWithTokens, IResponseWithUser, saveTokens} from "./ServerApi";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const getErrorDescription = (error: any, defaultMessage?: string): string => {
    return error instanceof Object
        ? error.toString()
        : defaultMessage || "Unknown error";
}

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    rejectValue: string,
}>();

export class HttpError extends Error {
    readonly status: number;

    constructor(status: number, message?: string) {
        super(message);
        this.status = status;
    }
}

export const checkResponse = async <T>(response: Response): Promise<T> => {
    if (response.ok) {
        return response.json();
    }

    return response.json()
        .then((err) => {
            throw new HttpError(response.status, err.message);
        });
}

export const sendRequest = async <T>(url: string, options?: RequestInit): Promise<T> => {
    return fetch(`${API_URL}${url}`, options)
        .then(checkResponse<T>);
};

export const logout = async (): Promise<IResponse> => {
    const token = localStorage.getItem("refreshToken");
    return token
        ? sendRequest<IResponse>(LOGOUT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({token}),
        })
        : Promise.reject(new Error("No refresh token"));
};

export const resetPassword = async (email: string): Promise<IResponse> => {
    const response = await sendRequest<IResponse>(INIT_PASSWORD_RESET_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email}),
    });

    return response.success
        ? Promise.resolve(response)
        : Promise.reject(response.message ? response.message : "Can't reset password");
};

export const finishResetPassword = async (password: string, token: string): Promise<IResponse> => {
    const response = await sendRequest<IResponse>(FINISH_PASSWORD_RESET_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({password, token}),
    });

    return response.success
        ? Promise.resolve(response)
        : Promise.reject("Can't reset password");
};

export const refreshToken = async (): Promise<IResponseWithTokens> => {
    const token = localStorage.getItem("refreshToken");
    return token
        ? sendRequest<IResponseWithTokens>(TOKEN_URL, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({token}),
        })
        : Promise.reject(new Error("No refresh token"));
};

export const fetchWithAuth = async <T>(
    url: string,
    method: string,
    requestData?: object,
    attempts = 0
): Promise<T> => {
    if (attempts >= 2) {
        return Promise.reject(new Error("Can't fetch data"));
    }

    const token = localStorage.getItem("accessToken");
    if (!token) {
        return Promise.reject(new Error("No access token"));
    }

    try {
        return await sendRequest(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
            },
            body: requestData && JSON.stringify(requestData),
        });
    } catch (error) {
        if (error instanceof Error && error.message === "jwt expired") {
            const newTokenData = await refreshToken();
            if (newTokenData.success) {
                saveTokens(newTokenData.accessToken, newTokenData.refreshToken);
                return fetchWithAuth<T>(url, method, requestData, attempts + 1);
            }
            return Promise.reject(error);
        }
        return Promise.reject(error);
    }
};

export const getUserProfile = async (): Promise<IUser> => {
    const response = await fetchWithAuth<IResponseWithUser>(USER_URL, "GET");
    return response.success
        ? Promise.resolve(response.user)
        : Promise.reject("Can't get user profile");
};

export const updateUserProfile = async (profile: IUser): Promise<IUser> => {
    const response = await fetchWithAuth<IResponseWithUser>(USER_URL, "PATCH", profile);
    return response.success
        ? Promise.resolve(response.user)
        : Promise.reject("Can't update user profile");
};
