import {nanoid} from "@reduxjs/toolkit";
import feedSlice, {IFeedState} from "./Feed";
import {feedOnWSClose, feedOnWSError, feedOnWSMessage, feedOnWSOpen} from "../actions/Feed";
import {EOrderStatus, TOrder} from "../../models/Order";
import {BUN1, BUN2, INGREDIENT1, INGREDIENT2, INGREDIENT3} from "../../utils/TestIngredients";

const reducer = feedSlice.reducer;

describe("Feed reducer", () => {
    it("should initialize feed reducer with initial state", () => {
        expect(
            reducer(
                undefined,
                {type: "idle"}
            )
        ).toEqual({
            isOpen: false,
            orders: [],
            total: 0,
            totalToday: 0,
            error: null,
        });
    });

    it("should open feed data stream", () => {
        openFeedStream();
    });

    it("should handle errors", () => {
        const errorDescription = "test error";
        expect(
            reducer(
                undefined,
                feedOnWSError(errorDescription)
            )
        ).toEqual({
            isOpen: false,
            orders: [],
            total: 0,
            totalToday: 0,
            error: errorDescription,
        });
    });

    it("should close feed data stream", () => {
        expect(
            reducer(
                openFeedStream(),
                feedOnWSClose()
            )
        ).toEqual({
            isOpen: false,
            orders: [],
            total: 0,
            totalToday: 0,
            error: null,
        });
    });

    it("should handle messages", () => {
        const order1: TOrder = {
            _id: nanoid(),
            name: "Test order 1",
            ingredients: [BUN1._id, INGREDIENT1._id, INGREDIENT2._id],
            status: EOrderStatus.Created,
            number: 1234,
            createdAt: "1",
            updatedAt: "2",
        };

        const order2: TOrder = {
            _id: nanoid(),
            name: "Test order 2",
            ingredients: [BUN2._id, INGREDIENT2._id, INGREDIENT3._id],
            status: EOrderStatus.Pending,
            number: 1240,
            createdAt: "2",
            updatedAt: "1",
        };

        expect(
            reducer(
                openFeedStream(),
                feedOnWSMessage({
                    orders: [order1, order2],
                    total: 5,
                    totalToday: 2,
                })
            )
        ).toEqual({
            isOpen: true,
            orders: [order1, order2],
            total: 5,
            totalToday: 2,
            error: null,
        });
    });
});

function openFeedStream(): IFeedState {
    const state = reducer(
        undefined,
        feedOnWSOpen()
    );

    expect(
        state
    ).toEqual({
        isOpen: true,
        orders: [],
        total: 0,
        totalToday: 0,
        error: null,
    });

    return state;
}