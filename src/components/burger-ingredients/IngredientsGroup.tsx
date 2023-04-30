import {forwardRef, useMemo} from "react";
import {IngredientTypes} from "../../models/Ingredients";
import {getIngredientsSelector} from "../../services/store";
import IngredientCard from "./IngredientCard";
import styles from "./IngredientsGroup.module.css";
import {useSelector} from "react-redux";

interface IIngredientsGroupProps {
    name: string;
    group: IngredientTypes;
}

const IngredientsGroup = forwardRef<HTMLLIElement, IIngredientsGroupProps>((
    {name, group},
    ref
) => {
    const {items} = useSelector(getIngredientsSelector);

    const groupIngredients = useMemo(
        () => items.filter(ingredient => ingredient.type === group),
        [group, items]
    );

    return (
        <li className={styles.group} ref={ref}>
            <h3 className={styles.header}>{name}</h3>
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

export default IngredientsGroup;