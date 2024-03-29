import {FC} from "react";
import {getOrderSelector, useAppSelector} from "../../services/store";
import styles from "./OrderDetails.module.css";
import doneImage from "../../images/done.svg";

export const OrderDetails: FC = () => {
    const order = useAppSelector(getOrderSelector);
    return (
        <>
            <h2 className={styles.order}>{order.orderId}</h2>
            <span className={styles.identifier}>идентификатор заказа</span>
            <img src={doneImage} alt="Order accepted"/>
            <span className={styles.explanation}>Ваш заказ начали готовить</span>
            <span className={styles.remark}>Дождитесь готовности на орбитальной станции</span>
        </>
    );
}
