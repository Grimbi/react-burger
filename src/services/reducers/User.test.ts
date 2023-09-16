import userSlice, {IUserState} from "./User";
import {IUser, IUserWithPassword} from "../../models/User";
import {clear, setIsAuthChecked, setIsWaitingReset, setUser, userLogin, userRegister} from "../actions/User";

const reducer = userSlice.reducer;

const testUser: IUser = {
    name: "TestName",
    email: "foo@mail.ru",
};

const testUserWithPassword: IUserWithPassword = {
    name: "TestName",
    email: "foo@mail.ru",
    password: "12345",
};

describe("User reducer", () => {
    it("should initialize user reducer with initial state", () => {
        expect(
            reducer(undefined, {type: "none"})
        ).toEqual({
            user: null,
            isAuthChecked: false,
            isWaitingReset: false,
        });
    });

    it("should set user", () => {
        expect(
            reducer(undefined, setUser(testUser))
        ).toEqual({
            user: testUser,
            isAuthChecked: true,
            isWaitingReset: false,
        });
    });

    it("should register new user", () => {
        expect(
            reducer(undefined, userRegister.fulfilled(testUser, '', testUserWithPassword, undefined))
        ).toEqual({
            user: testUser,
            isAuthChecked: true,
            isWaitingReset: false,
        });
    });

    it("should login user", () => {
        expect(
            reducer(undefined, userLogin.fulfilled(testUser, '', testUserWithPassword, undefined))
        ).toEqual({
            user: testUser,
            isAuthChecked: true,
            isWaitingReset: false,
        });
    });

    it("should set auth checked flag", () => {
        const state: IUserState = {
            user: testUser,
            isAuthChecked: false,
            isWaitingReset: false,
        };

        expect(
            reducer(state, setIsAuthChecked(true))
        ).toEqual({
            user: testUser,
            isAuthChecked: true,
            isWaitingReset: false,
        });
    });

    it("should set IsWaitingReset flag", () => {
        const state: IUserState = {
            user: testUser,
            isAuthChecked: true,
            isWaitingReset: false,
        };

        expect(
            reducer(state, setIsWaitingReset(true))
        ).toEqual({
            user: testUser,
            isAuthChecked: true,
            isWaitingReset: true,
        });
    });

    it("should set IsWaitingReset flag", () => {
        const state: IUserState = {
            user: testUser,
            isAuthChecked: true,
            isWaitingReset: false,
        };

        expect(
            reducer(state, clear)
        ).toEqual({
            user: null,
            isAuthChecked: true,
            isWaitingReset: false,
        });
    });
});
