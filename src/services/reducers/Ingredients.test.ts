import ingredientsSlice from "./Ingredients";
import {fetchIngredients} from "../actions/Ingredients";
import {INGREDIENT1, INGREDIENT2, INGREDIENT3} from "../../utils/TestIngredients";

const reducer = ingredientsSlice.reducer;

describe("Ingredients reducer", () => {
    it("should initialize ingredients reducer with initial state", () => {
        expect(
            reducer(
                undefined,
                {type: "none"}
            )
        ).toEqual({
            items: [],
            loading: false,
            error: "",
        });
    });

    it("should set the loading state", () => {
        expect(
            reducer(
                undefined,
                fetchIngredients.pending,
            )
        ).toEqual({
            items: [],
            loading: true,
            error: "",
        });
    });

    it("should set the list of ingredients", () => {
        expect(
            reducer(
                undefined,
                fetchIngredients.fulfilled([INGREDIENT1, INGREDIENT2, INGREDIENT3], "", undefined),
            )
        ).toEqual({
            items: [INGREDIENT1, INGREDIENT2, INGREDIENT3],
            loading: false,
            error: "",
        });
    });

    it("should set the error", () => {
        expect(
            reducer(
                undefined,
                fetchIngredients.rejected,
            )
        ).toEqual({
            items: [],
            loading: false,
            error: "Unknown error",
        });
    });
});
