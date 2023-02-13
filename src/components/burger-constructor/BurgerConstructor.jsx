import PropTypes from "prop-types";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from "./Ingredient";
import Price from "../price/Price";
import {useCallback, useState} from "react";
import OrderDetails from "../order-details/OrderDetails";
import Modal from "../modal/Modal";
import {BASKET_PROP_TYPE} from "../../utils/AppPropTypes";
import styles from "./BurgerConstructor.module.css";

function BurgerConstructor({ingredientsById, basket}) {
    const [showOrder, setShowOrder] = useState(false);

    const handleMakeOrder = useCallback(
        () => setShowOrder(true),
        [setShowOrder]
    );

    const handleCloseOrder = useCallback(
        () => setShowOrder(false),
        [setShowOrder]
    );

    const buns = basket
        .map(item => ingredientsById[item.ingredient])
        .filter(ingredient => ingredient && ingredient.type === "bun");

    const bun = buns.length > 0 && buns[0];

    let total = bun ? bun.price * 2 : 0;

    return (
        <section className={styles.container}>
            {bun && (<Ingredient type="top" ingredient={bun}/>)}
            <ul className={styles.ingredients}>
                {basket.map(item => {
                    const ingredient = ingredientsById[item.ingredient];

                    if (ingredient && ingredient.type !== "bun") {
                        total += ingredient.price;
                        return (<Ingredient key={item.id} ingredient={ingredient}/>);
                    }

                    return null;
                })}
            </ul>
            {bun && (<Ingredient type="bottom" ingredient={bun}/>)}
            <div className={styles.order}>
                <Price value={total} extraClass={styles.total}/>
                <Button
                    htmlType="button"
                    type="primary"
                    size="large"
                    extraClass={styles.submit}
                    onClick={handleMakeOrder}
                >
                    Оформить заказ
                </Button>
            </div>
            {showOrder && (
                <Modal onClose={handleCloseOrder}>
                    <OrderDetails/>
                </Modal>
            )}
        </section>
    );
}

BurgerConstructor.propTypes = {
    ingredientsById: PropTypes.object.isRequired,
    basket: BASKET_PROP_TYPE.isRequired,
};

export default BurgerConstructor;
