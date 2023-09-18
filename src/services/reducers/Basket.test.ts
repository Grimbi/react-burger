import basketSlice, {IBasketState} from "./Basket";
import {addIngredient, clearBasket, removeIngredient, shiftIngredient} from "../actions/Basket";
import {makeNewBasketItem} from "../../models/Basket";
import {BUN1, BUN2, INGREDIENT1, INGREDIENT2, INGREDIENT3} from "../../utils/TestIngredients";

const reducer = basketSlice.reducer;

describe("Basket reducer", () => {
    it("should initialize basket reducer with initial state", () => {
        expect(
            reducer(
                undefined,
                {type: "none"}
            )
        ).toEqual({
            bun: undefined,
            ingredients: [],
        });
    });

    it("should add a bun to the basket", () => {
        expect(
            reducer(
                undefined,
                addIngredient(makeNewBasketItem(BUN1))
            )
        ).toEqual({
            bun: BUN1,
            ingredients: [],
        });
    });

    it("should add a new bun to the basket", () => {
        const initialState: IBasketState = {
            bun: BUN1,
            ingredients: [],
        };

        expect(
            reducer(
                initialState,
                addIngredient(makeNewBasketItem(BUN2))
            )
        ).toEqual({
            bun: BUN2,
            ingredients: [],
        });
    });

    it("should add an ingredient to the basket", () => {
        const basketItem = makeNewBasketItem(INGREDIENT1);

        expect(
            reducer(
                undefined,
                addIngredient(basketItem)
            )
        ).toEqual({
            bun: undefined,
            ingredients: [basketItem],
        });
    });

    it("should add two ingredients to the basket", () => {
        const basketItem1 = makeNewBasketItem(INGREDIENT1);

        const state = reducer(undefined, addIngredient(basketItem1));
        expect(state).toEqual({
            bun: undefined,
            ingredients: [basketItem1],
        });

        const basketItem2 = makeNewBasketItem(INGREDIENT2);

        expect(reducer(state, addIngredient(basketItem2))).toEqual({
            bun: undefined,
            ingredients: [basketItem1, basketItem2],
        });
    });

    it("should add two identical ingredients to the basket", () => {
        const basketItem1 = makeNewBasketItem(INGREDIENT1);
        const basketItem2 = makeNewBasketItem(INGREDIENT1);

        const state = reducer(undefined, addIngredient(basketItem1));

        expect(
            reducer(
                state,
                addIngredient(basketItem2)
            )
        ).toEqual({
            bun: undefined,
            ingredients: [basketItem1, basketItem2],
        });
    });

    it("should remove the ingredient from the basket", () => {
        const basketItem1 = makeNewBasketItem(INGREDIENT1);
        const basketItem2 = makeNewBasketItem(INGREDIENT1);

        const state: IBasketState = {
            bun: BUN1,
            ingredients: [basketItem1, basketItem2],
        };

        expect(
            reducer(
                state,
                removeIngredient(basketItem1.id)
            )
        ).toEqual({
            bun: BUN1,
            ingredients: [basketItem2],
        });
    });

    it("should do not remove the bun from the basket", () => {
        const basketItem1 = makeNewBasketItem(INGREDIENT1);
        const basketItem2 = makeNewBasketItem(INGREDIENT1);

        const state: IBasketState = {
            bun: BUN1,
            ingredients: [basketItem1, basketItem2],
        };

        expect(
            reducer(
                state,
                removeIngredient(basketItem1.id)
            )
        ).toEqual({
            bun: BUN1,
            ingredients: [basketItem2],
        });
    });

    it("should shift the ingredient up", () => {
        const basketItem1 = makeNewBasketItem(INGREDIENT1);
        const basketItem2 = makeNewBasketItem(INGREDIENT2);
        const basketItem3 = makeNewBasketItem(INGREDIENT3);

        const state: IBasketState = {
            bun: BUN1,
            ingredients: [basketItem1, basketItem2, basketItem3],
        };

        expect(
            reducer(
                state,
                shiftIngredient({
                    shift: -2,
                    item: basketItem3,
                })
            )
        ).toEqual({
            bun: BUN1,
            ingredients: [basketItem3, basketItem1, basketItem2],
        });
    });

    it("should shift the ingredient down", () => {
        const basketItem1 = makeNewBasketItem(INGREDIENT1);
        const basketItem2 = makeNewBasketItem(INGREDIENT2);
        const basketItem3 = makeNewBasketItem(INGREDIENT3);

        const state: IBasketState = {
            bun: BUN1,
            ingredients: [basketItem1, basketItem2, basketItem3],
        };

        expect(
            reducer(
                state,
                shiftIngredient({
                    shift: 2,
                    item: basketItem1,
                })
            )
        ).toEqual({
            bun: BUN1,
            ingredients: [basketItem2, basketItem3, basketItem1],
        });
    });

    it("should clear the basket", () => {
        const initialState: IBasketState = {
            bun: BUN1,
            ingredients: [makeNewBasketItem(INGREDIENT1)],
        };

        expect(
            reducer(
                initialState,
                clearBasket()
            )
        ).toEqual({
            bun: undefined,
            ingredients: [],
        });
    });
});
