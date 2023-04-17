import {forwardRef, useMemo} from "react";
import {useSelector} from "react-redux";
import IngredientCard from "./IngredientCard";
import {INGREDIENT_TYPES_RU} from "../../utils/Constants";
import {INGREDIENT_TYPE_PROP_TYPE} from "../../utils/AppPropTypes";
import {selectors} from "../../services/store";
import styles from "./IngredientsGroup.module.css";

const IngredientsGroup = forwardRef(({group}, ref) => {
    const {items} = useSelector(selectors.getIngredients);

    const groupIngredients = useMemo(
        () => items.filter(ingredient => ingredient.type === group),
        [group, items]
    );

    return (
        <li className={styles.group} ref={ref}>
            <h3 className={styles.header}>{INGREDIENT_TYPES_RU[group]}</h3>
            {groupIngredients.length > 0 && (
                <ul className={styles.ingredients}>
                    {groupIngredients.map(ingredient =>
                        <IngredientCard key={ingredient._id} ingredient={ingredient}/>
                    )}
                </ul>
            )}
        </li>
    );
});

IngredientsGroup.propTypes = {
    group: INGREDIENT_TYPE_PROP_TYPE.isRequired,
};

export default IngredientsGroup;
