import {useCallback, useState} from "react";
import PropTypes from "prop-types";
import {Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import Price from "../price/Price";
import IngredientDetails from "../ingredient-details/IngredientDetails";
import Modal from "../modal/Modal";
import {INGREDIENT_PROP_TYPE} from "../../utils/AppPropTypes";
import styles from "./IngredientCard.module.css";

function IngredientCard({ingredient, count}) {
    const [showDetails, setShowDetails] = useState(false);

    const handleCardClick = useCallback(
        () => setShowDetails(true),
    [setShowDetails]
    );

    const handleDetailsClose = useCallback(
        () => setShowDetails(false),
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
            {showDetails && (
                <Modal onClose={handleDetailsClose}>
                    <IngredientDetails ingredient={ingredient}/>
                </Modal>
            )}
        </>
    );
}

IngredientCard.propTypes = {
    ingredient: INGREDIENT_PROP_TYPE.isRequired,
    count: PropTypes.number.isRequired,
};

export default IngredientCard;
