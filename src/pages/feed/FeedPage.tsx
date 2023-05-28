import {FC, useEffect} from "react";
import {getFeedSelector, useAppDispatch, useAppSelector} from "../../services/store";
import {feedWSConnect, feedWSDisconnect} from "../../services/actions/Feed";
import {OrdersList} from "../../components/orders-list/OrdersList";
import {OrdersSummary} from "../../components/orders-summary/OrdersSummary";
import styles from "./FeedPage.module.css";

export const FeedPage: FC = () => {
    const dispatch = useAppDispatch();

    const orders = useAppSelector(getFeedSelector);

    useEffect(() => {
        dispatch(feedWSConnect("wss://norma.nomoreparties.space/orders/all"));
        return () => {
            dispatch(feedWSDisconnect());
        }
    }, [dispatch]);

    return (
        <section className={styles.page}>
            <h1 className={styles.title}>Лента заказов</h1>
            <div className={styles.body}>
                <OrdersList ordersList={orders} linkTo={"/feed"}/>
                <OrdersSummary ordersList={orders}/>
            </div>
        </section>
    );
}
