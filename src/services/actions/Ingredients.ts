import {IIngredient} from "../../models/Ingredients";
import {get, INGREDIENTS_URL, IResponse} from "../../utils/ServerApi";
import {createAppAsyncThunk, getErrorDescription} from "../../utils/Utils";

interface IIngredientsResponse extends IResponse {
    data: Array<IIngredient>;
}

export const fetchIngredients = createAppAsyncThunk<Array<IIngredient>>(
    'users/fetchIngredients',
    async (_, thunkApi) => {
        try {
            const response = await get<IIngredientsResponse>(INGREDIENTS_URL);
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(
                getErrorDescription(error, "Не получилось загрузить список ингредиентов")
            );
        }
    }
);
