import axios, {Method} from "axios";
import {IUser} from "../models/User";

export const REGISTER_URL = "auth/register";
export const LOGIN_URL = "auth/login";
export const INGREDIENTS_URL = "ingredients";
export const ORDER_URL = "orders";

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

export function saveTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
}

export class ApiError extends Error {
    readonly status?: number;

    constructor(status: number, message?: string) {
        super(message);
        this.status = status;
    }

    toString(): string {
        return this.status === 0
            ? this.message || "Unknown error"
            : `${this.status}: ${this.message}`;
    }
}

const request = async <T extends IResponse>(method: Method, url: string, data?: any): Promise<T> => {
    try {
        let axiosResponse = null;
        switch (method) {
            case "get":
            case "GET":
                axiosResponse = await axiosInstance.get<T>(url);
                break;
            case "post":
            case "POST":
                axiosResponse = await axiosInstance.post<T>(url, data);
                break;
            default:
                return Promise.reject(new ApiError(0, `Unexpected method type ${method}`));
        }

        const response = axiosResponse.data;
        return response.success
            ? response
            : Promise.reject(new ApiError(0, response.message));
    } catch (error) {
        console.log(error);

        if (axios.isAxiosError(error)) {
            return error.response
                ? Promise.reject(new ApiError(error.response.status, error.message))
                : Promise.reject(new ApiError(0, error.message));
        }

        const message = error instanceof Error ? error.message : "Unknown error";
        return Promise.reject(new ApiError(0, message));
    }
}

export const get = async <T extends IResponse>(url: string): Promise<T> => {
    return request<T>("GET", url);
}

export const post = async <T extends IResponse>(url: string, data?: any): Promise<T> => {
    return request<T>("POST", url, data);
}

const axiosInstance = axios.create({
    baseURL: "https://norma.nomoreparties.space/api",
    timeout: 5000,
    timeoutErrorMessage: "Request timeout",
    responseType: "json",
});
