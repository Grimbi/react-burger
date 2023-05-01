import {IIngredient} from "../../models/Ingredients";
import {createAppAsyncThunk, getErrorDescription} from "../../utils/Utils";
import {loadIngredients} from "../../utils/ServerApi";

export const fetchIngredients = createAppAsyncThunk<Array<IIngredient>>(
    'users/fetchIngredients',
    async (_, thunkApi) => {
        try {
            return await loadIngredients();
        } catch (error) {
            return thunkApi.rejectWithValue(
                getErrorDescription(error, "Не получилось загрузить список ингредиентов")
            );
        }
    }
);
