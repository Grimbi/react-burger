import {FC} from "react";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Price.module.css";

interface IPriceProps {
    value: number;
    extraClass: string;
}

export const Price: FC<IPriceProps> = ({value, extraClass}) => {
    return (
        <div className={styles.container}>
            <span className={extraClass}>{value}</span>
            <CurrencyIcon type="primary"/>
        </div>
    );
}
