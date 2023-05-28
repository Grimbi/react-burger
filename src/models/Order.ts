export enum EOrderStatus {
    Created = "created",
    Pending = "pending",
    Done = "done",
}

export type TOrder = {
    _id: string;
    name: string;
    ingredients: Array<string>;
    status: EOrderStatus;
    number: number;
    createdAt: string;
    updatedAt: string;
}

export type TOrdersList = {
    orders: Array<TOrder>;
    total: number;
    totalToday: number;
}
