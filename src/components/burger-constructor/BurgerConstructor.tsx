import {useCallback, useMemo, useRef} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {useDrop} from "react-dnd";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from "./Ingredient";
import Price from "../price/Price";
import OrderDetails from "../order-details/OrderDetails";
import Modal from "../modal/Modal";
import {clear, makeOrder} from "../../services/actions/Order";
import {getBasketSelector, getOrderSelector, getUserSelector, useAppDispatch} from "../../services/store";
import {IIngredient} from "../../models/Ingredients";
import {IBasketItem, makeNewBasketItem} from "../../models/Basket";
import {addIngredient, shiftIngredient} from "../../services/actions/Basket";
import styles from "./BurgerConstructor.module.css";

const DRAGGABLE_INGREDIENT_TYPES = ["bun", "sauce", "main", "basket-item"];

function isIngredient(obj: any): obj is IIngredient {
    return obj._id !== undefined;
}

function isBasketItem(obj: any): obj is IBasketItem {
    return obj.id !== undefined;
}

function BurgerConstructor() {
    const navigate = useNavigate();

    const {user} = useSelector(getUserSelector);
    const basket = useSelector(getBasketSelector);
    const {orderId} = useSelector(getOrderSelector);

    const dispatch = useAppDispatch();

    const handleMakeOrder = useCallback(
        () => {
            if (user) {
                if (basket.bun) {
                    dispatch(makeOrder([
                        basket.bun._id,
                        ...basket.ingredients.map(item => item.ingredient._id),
                        basket.bun._id,
                    ]));
                } else {
                    console.log("Не выбрали булку");
                }
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

    const ingredientsRef = useRef<HTMLUListElement>(null);

    const [, dropTarget] = useDrop<IIngredient | IBasketItem>({
        accept: DRAGGABLE_INGREDIENT_TYPES,
        drop(item, monitor) {
            if (monitor.getItemType() === "basket-item" && isBasketItem(item)) {
                const differenceFromInitialOffset = monitor.getDifferenceFromInitialOffset();
                const initialSourceClientOffset = monitor.getInitialSourceClientOffset();
                const sourceClientOffset = monitor.getSourceClientOffset();

                if (ingredientsRef.current && differenceFromInitialOffset && initialSourceClientOffset && sourceClientOffset) {
                    const sign = Math.sign(differenceFromInitialOffset.y);
                    if (sign !== 0) {
                        let shift = 0;
                        const fromY = initialSourceClientOffset.y * sign;
                        const toY = sourceClientOffset.y * sign;

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
                }
            } else if (isIngredient(item)) {
                dispatch(addIngredient(makeNewBasketItem(item)));
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
            {orderId && (
                <Modal onClose={handleCloseOrder}>
                    <OrderDetails/>
                </Modal>
            )}
        </section>
    );
}

export default BurgerConstructor;
