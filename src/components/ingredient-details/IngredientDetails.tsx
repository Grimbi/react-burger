import {FC} from "react";
import {useParams} from "react-router-dom";
import {getIngredientsSelector, useAppSelector} from "../../services/store";
import styles from "./IngredientDetails.module.css";

interface IIngredientDetailsProps {
    modal?: boolean;
}

type TIngredientDetailsParams = {
    id: string;
}

export const IngredientDetails: FC<IIngredientDetailsProps> = ({modal = false}) => {
    const {id} = useParams<TIngredientDetailsParams>();

    const {items} = useAppSelector(getIngredientsSelector);
    const ingredient = items.find(item => id && item._id === id);

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

interface INutrientProps {
    header: string;
    value: number;
}

const Nutrient: FC<INutrientProps> = ({header, value}) => {
    return (
        <div className={styles.nutrient}>
            <span>{header}</span>
            <span>{value}</span>
        </div>
    );
}
