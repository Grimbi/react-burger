import {FC} from "react";
import {TOrdersList} from "../../models/Order";
import {OrderCard} from "./OrderCard";
import styles from "./OrdersList.module.css";

export type TOrdersListProps = {
    ordersList: TOrdersList;
    linkTo: string;
};

export const OrdersList: FC<TOrdersListProps> = ({ordersList, linkTo}) => {
    return (
        <ul className={styles.orders}>
            {ordersList.orders.map(order => (
                <OrderCard key={order._id} order={order} linkTo={linkTo}/>
            ))}
        </ul>
    );
}