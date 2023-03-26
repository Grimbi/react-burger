import {useSelector} from "react-redux";
import styles from "./OrderDetails.module.css";
import doneImage from "../../images/done.svg";

function OrderDetails() {
    const order = useSelector(store => store.order);

    return (
        <>
            <h2 className={styles.order}>{order.order.number}</h2>
            <span className={styles.identifier}>идентификатор заказа</span>
            <img src={doneImage} alt="Order accepted"/>
            <span className={styles.explanation}>Ваш заказ начали готовить</span>
            <span className={styles.remark}>Дождитесь готовности на орбитальной станции</span>
        </>
    );
}

export default OrderDetails;
