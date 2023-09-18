import orderSlice from "./Order";
import {clearOrder, makeOrder} from "../actions/Order";

const reducer = orderSlice.reducer;

describe("Order reducer", () => {
    it("should initialize order reducer with initial state", () => {
        expect(
            reducer(undefined, {type: "none"})
        ).toEqual({
            orderId: null,
        });
    });

    it("should set order id", () => {
        expect(
            reducer(undefined, makeOrder.fulfilled(1345, "", []))
        ).toEqual({
            orderId: 1345,
        });
    });

    it("should clear the order id", () => {
        const state = reducer(undefined, makeOrder.fulfilled(1345, "", []));
        expect(
            reducer(state, clearOrder())
        ).toEqual({
            orderId: null,
        });
    });
});
