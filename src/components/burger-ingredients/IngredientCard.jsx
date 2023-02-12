import styles from "./IngredientCard.module.css";
import {Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import Price from "../price/Price";
import {useMemo, useState} from "react";
import IngredientDetails from "../ingredient-details/IngredientDetails";

function IngredientCard({ingredient, count}) {
    const [showDetails, setShowDetails] = useState(false);

    const handleCardClick = useMemo(
        () => () => setShowDetails(true),
    [setShowDetails]
    );

    const handleDetailsClose = useMemo(
        () => () => setShowDetails(false),
        [setShowDetails]
    );

    return (
        <>
            <li className={styles.card} onClick={handleCardClick}>
                <img className={styles.image} src={ingredient.image} alt={ingredient.name}/>
                {count !== 0 && <Counter count={count} size="default" extraClass={styles.counter} />}
                <Price value={ingredient.price} extraClass={styles.price}/>
                <p className={styles.name}>{ingredient.name}</p>
            </li>
            {showDetails && (<IngredientDetails ingredient={ingredient} onClose={handleDetailsClose}/>)}
        </>
    );
}

export default IngredientCard;
