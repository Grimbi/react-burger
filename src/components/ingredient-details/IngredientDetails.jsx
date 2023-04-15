import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./IngredientDetails.module.css";
import {selectors} from "../../services/store";

function IngredientDetails({modal = false}) {
    const {id} = useParams();

    const {items} = useSelector(selectors.getIngredients);
    const ingredient = items.find(item => item._id === id);

    if (!ingredient) {
        return (<></>);
    }

    return (
        <>
            <h2 className={modal ? styles.modalHeader : styles.header}>Детали ингредиента</h2>
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
    modal: PropTypes.bool,
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
