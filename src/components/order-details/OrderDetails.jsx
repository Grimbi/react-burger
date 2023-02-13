import styles from "./OrderDetails.module.css";
import doneImage from "../../images/done.svg";

function OrderDetails() {
    return (
        <>
            <h2 className={styles.order}>034536</h2>
            <span className={styles.identifier}>идентификатор заказа</span>
            <img src={doneImage} alt="Order accepted"/>
            <span className={styles.explanation}>Ваш заказ начали готовить</span>
            <span className={styles.remark}>Дождитесь готовности на орбитальной станции</span>
        </>
    );
}

export default OrderDetails;
