import {createAsyncThunk} from "@reduxjs/toolkit";

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
