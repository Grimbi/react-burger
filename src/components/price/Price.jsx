import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Price.module.css";
import PropTypes from "prop-types";

function Price({value, extraClass}) {
    return (
        <div className={styles.container}>
            <span className={extraClass}>{value}</span>
            <CurrencyIcon type="primary"/>
        </div>
    );
}

Price.propTypes = {
    value: PropTypes.number.isRequired,
    extraClass: PropTypes.string,
};

export default Price;
