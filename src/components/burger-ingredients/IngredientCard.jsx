import {useMemo} from "react";
import {Link, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {useDrag} from "react-dnd";
import {Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import Price from "../price/Price";
import {INGREDIENT_PROP_TYPE} from "../../utils/AppPropTypes";
import {selectors} from "../../services/store";
import styles from "./IngredientCard.module.css";

function IngredientCard({ingredient}) {
    const location = useLocation();
    const basket = useSelector(selectors.getBasket);

    const [{isDrag}, dragRef] = useDrag({
        type: ingredient.type,
        item: ingredient,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    const count = useMemo(
        () => {
            return basket.bun && basket.bun._id === ingredient._id
                ? 1
                : basket.ingredients
                    .filter(item => item.ingredient._id === ingredient._id)
                    .length;
        },
        [basket, ingredient]
    );

    return (
        <li className={styles.listItem} ref={dragRef}>
            <Link
                to={`/ingredients/${ingredient._id}`}
                state={{ background: location }}
                className={isDrag ? styles.draggableCard : styles.card}
            >
                <img className={styles.image} src={ingredient.image} alt={ingredient.name}/>
                {count !== 0 && <Counter count={count} size="default" extraClass={styles.counter}/>}
                <Price value={ingredient.price} extraClass={styles.price}/>
                <p className={styles.name}>{ingredient.name}</p>
            </Link>
        </li>
    );
}

IngredientCard.propTypes = {
    ingredient: INGREDIENT_PROP_TYPE.isRequired,
};

export default IngredientCard;
