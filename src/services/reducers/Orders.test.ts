import ordersSlice, {IOrdersState} from "./Orders";
import {ordersOnWSClose, ordersOnWSError, ordersOnWSMessage, ordersOnWSOpen} from "../actions/orders";
import {EOrderStatus, TOrder} from "../../models/Order";
import {nanoid} from "@reduxjs/toolkit";
import {BUN1, BUN2, INGREDIENT1, INGREDIENT2, INGREDIENT3} from "../../utils/TestIngredients";

const reducer = ordersSlice.reducer;

describe("Orders reducer", () => {
    it("should initialize orders reducer with initial state", () => {
        expect(
            reducer(
                undefined,
                {type: "none"}
            )
        ).toEqual({
            isOpen: false,
            orders: [],
            total: 0,
            totalToday: 0,
            error: null,
        });
    });

    it("should open orders stream", () => {
        openOrdersStream();
    });

    it("should handle errors", () => {
        const errorDescription = "test error";
        expect(
            reducer(
                undefined,
                ordersOnWSError(errorDescription)
            )
        ).toEqual({
            isOpen: false,
            orders: [],
            total: 0,
            totalToday: 0,
            error: errorDescription,
        });
    });

    it("should close orders data stream", () => {
        expect(
            reducer(
                openOrdersStream(),
                ordersOnWSClose()
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
                openOrdersStream(),
                ordersOnWSMessage({
                    orders: [order1, order2],
                    total: 5,
                    totalToday: 2,
                })
            )
        ).toEqual({
            isOpen: true,
            orders: [order2, order1],
            total: 5,
            totalToday: 2,
            error: null,
        });
    });
});

function openOrdersStream(): IOrdersState {
    const state = reducer(
        undefined,
        ordersOnWSOpen()
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