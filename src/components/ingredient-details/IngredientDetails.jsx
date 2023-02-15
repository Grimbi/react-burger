import PropTypes from "prop-types";
import {INGREDIENT_PROP_TYPE} from "../../utils/AppPropTypes";
import styles from "./IngredientDetails.module.css";

function IngredientDetails({ingredient}) {
    return (
        <>
            <h2 className={styles.header}>Детали ингредиента</h2>
            <img className={styles.image} src={ingredient.image_large} alt={ingredient.name}/>
            <h3 className={styles.name}>{ingredient.name}</h3>
            <div className={styles.nutrients}>
                <Nutrient header="Калории,ккал" value={ingredient.calories}/>
                <Nutrient header="Белки, г" value={ingredient.proteins}/>
                <Nutrient header="Жиры, г" value={ingredient.fat}/>
                <Nutrient header="Углеводы, г" value={ingredient.carbohydrates}/>
            </div>
        </>
    );
}

IngredientDetails.propTypes = {
    ingredient: INGREDIENT_PROP_TYPE.isRequired,
};

function Nutrient({header, value}) {
    return (
        <div className={styles.nutrient}>
            <span>{header}</span>
            <span>{value}</span>
        </div>
    );
}

Nutrient.propTypes = {
    header: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
};

export default IngredientDetails;
