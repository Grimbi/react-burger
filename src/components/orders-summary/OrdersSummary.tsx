import {FC, useMemo} from "react";
import {TOrdersList} from "../../models/Order";
import styles from "./OrdersSummary.module.css";
import {OrderNumbers} from "./OrderNumbers";

export type TOrdersSummaryProps = {
    ordersList: TOrdersList;
};

export const OrdersSummary: FC<TOrdersSummaryProps> = ({ordersList}) => {
    const doneOrders = useMemo(
        () => ordersList.orders
            .filter(order => order.status === "done")
            .slice(0, 20),
        [ordersList]
    );

    const pendingOrders = useMemo(
        () => ordersList.orders
            .filter(order => order.status === "pending")
            .slice(0, 20),
        [ordersList]
    );

    return (
        <section className={styles.summary}>
            <div className={styles.board}>
                <OrderNumbers title={"Готовы:"} orders={doneOrders} extraStyle={styles.done}/>
                <OrderNumbers title={"В работе:"} orders={pendingOrders} extraStyle={styles.pending}/>
            </div>
            <h2 className={styles.completed}>Выполнено за все время:</h2>
            <p className={styles.total}>{ordersList.total}</p>
            <h2 className={styles.completed}>Выполнено за сегодня:</h2>
            <p className={styles.total}>{ordersList.totalToday}</p>
        </section>
    );
}