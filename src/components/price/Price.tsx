import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Price.module.css";

interface IPriceProps {
    value: number;
    extraClass: string;
}

function Price({value, extraClass}: IPriceProps) {
    return (
        <div className={styles.container}>
            <span className={extraClass}>{value}</span>
            <CurrencyIcon type="primary"/>
        </div>
    );
}

export default Price;
