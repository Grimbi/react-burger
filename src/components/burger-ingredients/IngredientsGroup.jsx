import {forwardRef} from "react";
import IngredientCard from "./IngredientCard";
import {getIngredientCount} from "../../utils/Utils";
import {INGREDIENT_TYPES_RU} from "../../utils/Constants";
import {BASKET_PROP_TYPE, INGREDIENT_TYPE_PROP_TYPE, INGREDIENTS_PROP_TYPE} from "../../utils/AppPropTypes";
import styles from "./IngredientsGroup.module.css";

const IngredientsGroup = forwardRef(({group, ingredients, basket}, ref) => {
    return (
        <li className={styles.group} ref={ref}>
            <h3 className={styles.header}>{INGREDIENT_TYPES_RU[group]}</h3>
            <ul className={styles.ingredients}>
                {ingredients && ingredients.map(ingredient =>
                    <IngredientCard
                        key={ingredient._id}
                        ingredient={ingredient}
                        count={getIngredientCount(basket, ingredient)}
                    />
                )}
            </ul>
        </li>
    );
});

IngredientsGroup.propTypes = {
    group: INGREDIENT_TYPE_PROP_TYPE.isRequired,
    ingredients: INGREDIENTS_PROP_TYPE.isRequired,
    basket: BASKET_PROP_TYPE.isRequired,
};

export default IngredientsGroup;
