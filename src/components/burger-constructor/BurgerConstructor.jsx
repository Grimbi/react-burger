import {useCallback, useMemo, useRef} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useDrop} from "react-dnd";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from "./Ingredient";
import Price from "../price/Price";
import OrderDetails from "../order-details/OrderDetails";
import Modal from "../modal/Modal";
import {clear, makeOrder} from "../../services/actions/Order";
import {INGREDIENT_TYPES} from "../../utils/Constants";
import {addIngredient, shiftIngredient} from "../../services/actions/Basket";
import styles from "./BurgerConstructor.module.css";

const DRAGGABLE_INGREDIENT_TYPES = [...INGREDIENT_TYPES, "basket-item"];

function BurgerConstructor() {
    const navigate = useNavigate();

    const user = useSelector(store => store.user.user);
    const basket = useSelector(store => store.basket);
    const order = useSelector(store => store.order);

    const dispatch = useDispatch();

    const handleMakeOrder = useCallback(
        () => {
            if (user) {
                const ingredients = [
                    basket.bun._id,
                    ...basket.ingredients.map(item => item.ingredient._id),
                    basket.bun._id,
                ];

                dispatch(makeOrder(ingredients));
            } else {
                navigate("/login");
            }
        },
        [user, basket, dispatch, navigate]
    );

    const handleCloseOrder = useCallback(
        () => dispatch(clear()),
        [dispatch]
    );

    const total = useMemo(
        () => {
            let total = basket.bun ? basket.bun.price * 2 : 0;
            total += basket.ingredients.reduce((prev, item) => prev + item.ingredient.price, 0);
            return total;
        },
        [basket]
    );

    const ingredientsRef = useRef();

    const [, dropTarget] = useDrop({
        accept: DRAGGABLE_INGREDIENT_TYPES,
        drop(item, monitor) {
            if (monitor.getItemType() === "basket-item") {
                const sign = Math.sign(monitor.getDifferenceFromInitialOffset().y);
                if (sign !== 0) {
                    let shift = 0;
                    const fromY = monitor.getInitialSourceClientOffset().y * sign;
                    const toY = monitor.getSourceClientOffset().y * sign;

                    for (const element of ingredientsRef.current.children) {
                        const y = element.getBoundingClientRect().y * sign;
                        if (y > fromY && y < toY) {
                            shift += sign;
                        }
                    }

                    if (shift !== 0) {
                        dispatch(shiftIngredient({shift, item}));
                    }
                }
            } else {
                dispatch(addIngredient(item));
            }
        }
    });

    return (
        <section className={styles.container} ref={dropTarget}>
            {basket.bun && (<Ingredient type="top" ingredient={basket.bun}/>)}
            <ul className={styles.ingredients} ref={ingredientsRef}>
                {basket.ingredients.map(item => (
                    <Ingredient key={item.id} id={item.id} ingredient={item.ingredient}/>
                ))}
            </ul>
            {basket.bun && (<Ingredient type="bottom" ingredient={basket.bun}/>)}
            <div className={styles.order}>
                <Price value={total} extraClass={styles.total}/>
                <Button
                    htmlType="button"
                    type="primary"
                    size="large"
                    extraClass={styles.submit}
                    onClick={handleMakeOrder}
                    disabled={!basket.bun || basket.ingredients.length === 0}
                >
                    Оформить заказ
                </Button>
            </div>
            {order && (
                <Modal onClose={handleCloseOrder}>
                    <OrderDetails/>
                </Modal>
            )}
        </section>
    );
}

export default BurgerConstructor;
