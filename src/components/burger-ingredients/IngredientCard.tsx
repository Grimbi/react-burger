import {FC, useMemo} from "react";
import {Link, useLocation} from "react-router-dom";
import {useDrag} from "react-dnd";
import {Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import {Price} from "../price/Price";
import {getBasketSelector, useAppSelector} from "../../services/store";
import {IIngredient} from "../../models/Ingredients";
import styles from "./IngredientCard.module.css";

interface IIngredientCardProps {
    ingredient: IIngredient;
}

export const IngredientCard: FC<IIngredientCardProps> = ({ingredient}) => {
    const location = useLocation();
    const basket = useAppSelector(getBasketSelector);

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
                <Price value={ingredient.price.toString()} extraClass={styles.price}/>
                <p className={styles.name}>{ingredient.name}</p>
            </Link>
        </li>
    );
}
