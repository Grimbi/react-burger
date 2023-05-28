import {FC, useMemo} from "react";
import {Link, useLocation} from "react-router-dom";
import {FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {TOrder} from "../../models/Order";
import {getIngredientsSelector, useAppSelector} from "../../services/store";
import {Price} from "../price/Price";
import {IIngredient} from "../../models/Ingredients";
import {IngredientImage} from "./IngredientImage";
import styles from "./OrderCard.module.css";

export type TOrderCardProps = {
    order: TOrder;
    linkTo: string;
};

export const OrderCard: FC<TOrderCardProps> = ({order, linkTo}) => {
    const location = useLocation();

    const {items} = useAppSelector(getIngredientsSelector);

    const orderIngredients = useMemo(
        () => {
            return order.ingredients
                .map(id => items.find(ingredient => ingredient._id === id))
                .filter(ingredient => !!ingredient) as Array<IIngredient>;
        },
        [order, items]
    );

    const [visibleIngredients, extraIngredients] = useMemo(
        () => [
            orderIngredients.slice(0, 6).reverse(),
            Math.max(0, orderIngredients.length - 6)
        ],
        [orderIngredients]
    );

    const price = useMemo(
        () => orderIngredients.reduce((prev, ingredient) => prev + ingredient.price, 0),
        [orderIngredients]
    );

    return (
        <li className={styles.listItem}>
            <Link
                to={`${linkTo}/${order.number}`}
                state={{background: location}}
                className={styles.card}
            >
                <div className={styles.title}>
                    <p className={styles.number}>#{order.number}</p>
                    <FormattedDate className={styles.date} date={new Date(order.updatedAt)}/>
                </div>
                <p className={styles.name}>{order.name}</p>
                <div className={styles.details}>
                    <div className={styles.ingredients}>
                        {visibleIngredients.map((ingredient, index) => (<IngredientImage
                                key={index}
                                ingredient={ingredient}
                                extraIngredients={index === 0 ? extraIngredients : 0}
                            />
                        ))}
                    </div>
                    <Price value={price.toString()} extraClass={styles.price}/>
                </div>
            </Link>
        </li>
    );
}