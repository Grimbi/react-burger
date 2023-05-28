import {createAsyncThunk} from "@reduxjs/toolkit";
import {EOrderStatus} from "../models/Order";

export const getErrorDescription = (error: any, defaultMessage: string = "Unknown error"): string => {
    return error instanceof Object
        ? error.toString()
        : defaultMessage;
}

export const logErrorDescription = (error: any, defaultMessage: string = "Unknown error") => {
    console.log(getErrorDescription(error, defaultMessage));
}

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    rejectValue: string,
}>();

export const translateOrderStatus = (status: EOrderStatus): string => {
    switch (status) {
        case EOrderStatus.Created:
            return "Создан";
        case EOrderStatus.Pending:
            return "Готовится";
        case EOrderStatus.Done:
            return "Выполнен";
    }
}
