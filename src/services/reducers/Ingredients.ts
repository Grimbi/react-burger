import {createSlice} from "@reduxjs/toolkit";
import {IIngredient} from "../../models/Ingredients";
import {fetchIngredients} from "../actions/Ingredients";

interface IIngredientsState {
    items: Array<IIngredient>;
    loading: boolean;
    error: string;
}

const initialState: IIngredientsState = {
    items: [],
    loading: false,
    error: "",
};

export default createSlice({
    name: 'ingredients',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchIngredients.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchIngredients.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
                state.error = "";
            })
            .addCase(fetchIngredients.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Unknown error";
            })
    },
});
