import Modal from "../modal/Modal";
import styles from "./IngredientDetails.module.css";

function IngredientDetails({ingredient, onClose}) {
    return (
        <Modal onClose={onClose}>
            <h2 className={styles.header}>Детали ингредиента</h2>
            <img className={styles.image} src={ingredient.image_large} alt={ingredient.name}/>
            <h3 className={styles.name}>{ingredient.name}</h3>
            <div className={styles.nutrients}>
                <Nutrient header="Калории,ккал" value={ingredient.calories}/>
                <Nutrient header="Белки, г" value={ingredient.proteins}/>
                <Nutrient header="Жиры, г" value={ingredient.fat}/>
                <Nutrient header="Углеводы, г" value={ingredient.carbohydrates}/>
            </div>
        </Modal>
    );
}

function Nutrient({header, value}) {
    return (
        <div className={styles.nutrient}>
            <span>{header}</span>
            <span>{value}</span>
        </div>
    );
}

export default IngredientDetails;
