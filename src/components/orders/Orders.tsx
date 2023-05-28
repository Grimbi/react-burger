import {FC, useEffect} from "react";
import styles from "./Orders.module.css";
import {OrdersList} from "../orders-list/OrdersList";
import {getOrdersSelector, useAppDispatch, useAppSelector} from "../../services/store";
import {ordersWSConnect, ordersWSDisconnect} from "../../services/actions/orders";

export const Orders: FC = () => {
    const dispatch = useAppDispatch();
    const orders = useAppSelector(getOrdersSelector);

    const accessToken = localStorage.getItem("accessToken")?.replace("Bearer ", "");
    const token = accessToken ? `?token=${accessToken}` : "";

    useEffect(() => {
        dispatch(ordersWSConnect(`wss://norma.nomoreparties.space/orders${token}`));
        return () => {
            dispatch(ordersWSDisconnect());
        }
    }, [dispatch, token]);

    return (
        <div className={styles.page}>
            <OrdersList ordersList={orders} linkTo={"/profile/orders"}/>
        </div>
    );
}
