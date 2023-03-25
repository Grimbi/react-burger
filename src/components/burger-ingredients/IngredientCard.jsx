import {useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useDrag} from "react-dnd";
import {Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import Price from "../price/Price";
import IngredientDetails from "../ingredient-details/IngredientDetails";
import Modal from "../modal/Modal";
import {INGREDIENT_PROP_TYPE} from "../../utils/AppPropTypes";
import {clear, setIngredient} from "../../services/actions/SelectedIngredient";
import styles from "./IngredientCard.module.css";

function IngredientCard({ingredient}) {
    const dispatch = useDispatch();

    const basket = useSelector(store => store.basket);
    const selectedIngredient = useSelector(store => store.selectedIngredient);

    const handleCardClick = () => dispatch(setIngredient(ingredient));
    const handleDetailsClose = () => dispatch(clear());

    const [{isDrag}, dragRef] = useDrag({
        type: ingredient.type,
        item: ingredient,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    const count = useMemo(
        () => {
            return basket.ingredients
                .filter(item => item.ingredient._id === ingredient._id)
                .length;
        },
        [basket, ingredient]
    );

    return (
        <>
            <li className={isDrag ? styles.draggableCard : styles.card} onClick={handleCardClick} ref={dragRef}>
                <img className={styles.image} src={ingredient.image} alt={ingredient.name}/>
                {count !== 0 && <Counter count={count} size="default" extraClass={styles.counter}/>}
                <Price value={ingredient.price} extraClass={styles.price}/>
                <p className={styles.name}>{ingredient.name}</p>
            </li>
            {selectedIngredient && (
                <Modal onClose={handleDetailsClose}>
                    <IngredientDetails/>
                </Modal>
            )}
        </>
    );
}

IngredientCard.propTypes = {
    ingredient: INGREDIENT_PROP_TYPE.isRequired,
};

export default IngredientCard;
