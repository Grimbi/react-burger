import {FC, useEffect, useMemo, useState} from "react";
import {useParams} from "react-router-dom";
import {FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {TOrder} from "../../models/Order";
import {getOrder} from "../../utils/ServerApi";
import {logErrorDescription, translateOrderStatus} from "../../utils/Utils";
import {Price} from "../price/Price";
import {IIngredient} from "../../models/Ingredients";
import {getIngredientsSelector, useAppSelector} from "../../services/store";
import styles from "./OrderInfo.module.css";

export type TOrderInfoProps = {
    modal: boolean;
};

type TOrderInfoParams = {
    id: string;
};

type TGroupedIngredient = {
    ingredient: IIngredient;
    count: number;
};

export const OrderInfo: FC<TOrderInfoProps> = ({modal}) => {
    const {id} = useParams<TOrderInfoParams>();
    const [order, setOrder] = useState<TOrder>();
    const {items} = useAppSelector(getIngredientsSelector);

    useEffect(
        () => {
            if (id) {
                getOrder(id)
                    .then(orders => {
                        const order = orders.find(order => order.number === Number.parseInt(id));
                        if (order) {
                            setOrder(order);
                        } else {
                            console.log("No order in response from server");
                        }
                    })
                    .catch(error => logErrorDescription(error))
            } else {
                console.log("No order number to show details");
            }
        },
        [id]
    )

    const orderIngredients = useMemo(
        () => {
            if (!order) {
                return null;
            }

            const groupedIngredients = new Array<TGroupedIngredient>();

            order.ingredients.forEach(id => {
                const groupedIngredientIndex = groupedIngredients.findIndex(groupedIngredient => groupedIngredient.ingredient._id === id);
                if (groupedIngredientIndex < 0) {
                    const ingredient = items.find(ingredient => ingredient._id === id);
                    if (ingredient) {
                        groupedIngredients.push({ingredient, count: 1});
                    } else {
                        console.log(`Can't find ingredient with id ${id}`);
                    }
                } else {
                    groupedIngredients[groupedIngredientIndex].count++;
                }
            });

            return groupedIngredients;
        },
        [order, items]
    );


    const price = useMemo(
        () => orderIngredients?.reduce((prev, item) => prev + item.ingredient.price * item.count, 0),
        [orderIngredients]
    );

    if (items.length === 0 || !order || !price) {
        return null;
    }

    return (
        <>
            <h2 className={modal ? styles.modalHeader : styles.header}>{`#${id}`}</h2>
            <div className={styles.info}>
                <h3 className={styles.name}>{order.name}</h3>
                <span className={styles.status}>{translateOrderStatus(order.status)}</span>
            </div>
            <div className={styles.details}>
                <h4 className={styles.structure}>Состав:</h4>
                <div className={styles.ingredients}>
                    {orderIngredients?.map((ingredient, index) => (
                        <Card key={index} groupedIngredient={ingredient}/>
                    ))}
                </div>
                <div className={styles.summary}>
                    <FormattedDate className={styles.date} date={new Date(order.updatedAt)}/>
                    <Price value={price.toString()} extraClass={styles.price}/>
                </div>
            </div>
        </>
    );
}

type TCardProps = {
    groupedIngredient: TGroupedIngredient;
};

const Card: FC<TCardProps> = ({groupedIngredient}) => {
    const {ingredient} = groupedIngredient;
    return (
        <div className={styles.card}>
            <img className={styles.image} src={ingredient.image} alt={ingredient.name}/>
            <p className={styles.ingredientName}>{ingredient.name}</p>
            <Price value={`${groupedIngredient.count} x ${ingredient.price}`} extraClass={styles.ingredientPrice}/>
        </div>
    );
}