import {FC} from "react";
import {TOrder} from "../../models/Order";
import styles from "./OrderNumber.module.css";

export type TOrderNumbersProps = {
    title: string;
    orders: Array<TOrder>;
    extraStyle: string;
};

export const OrderNumbers: FC<TOrderNumbersProps> = ({title, orders, extraStyle}) => {
    return (
        <div>
            <h2 className={styles.title}>{title}</h2>
            <ul className={styles.container}>
                {orders.length > 0 && orders.map(order => (
                    <li key={order._id} className={`${styles.item} ${extraStyle}`}>{order.number}</li>
                ))}
            </ul>
        </div>
    );
}