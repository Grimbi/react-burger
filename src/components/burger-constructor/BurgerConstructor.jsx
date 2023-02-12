import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from "./Ingredient";
import styles from "./BurgerConstructor.module.css";
import Price from "../price/Price";
import {useMemo, useState} from "react";
import OrderDetails from "../order-details/OrderDetails";

function BurgerConstructor({ingredients, basket}) {
    const [showOrder, setShowOrder] = useState(false);

    const handleMakeOrder = useMemo(
        () => () => setShowOrder(true),
        [setShowOrder]
    );

    const handleCloseOrder = useMemo(
        () => () => setShowOrder(false),
        [setShowOrder]
    );

    const buns = basket
        .map(item => ingredients.ingredientsById[item.ingredient])
        .filter(ingredient => ingredient && ingredient.type === "bun");

    const bun = buns.length > 0 && buns[0];

    let total = bun ? bun.price * 2 : 0;

    return (
        <section className={styles.container}>
            {bun && (<Ingredient type="top" ingredient={bun}/>)}
            <ul className={styles.ingredients}>
                {basket.map(item => {
                    const ingredient = ingredients.ingredientsById[item.ingredient];

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
            {showOrder && (<OrderDetails onClose={handleCloseOrder}/>)}
        </section>
    );
}

export default BurgerConstructor;
