import {FC} from "react";
import {IIngredient} from "../../models/Ingredients";
import styles from "./IngredientImage.module.css";

export type IngredientImageProps = {
    ingredient: IIngredient;
    extraIngredients: number;
};

export const IngredientImage: FC<IngredientImageProps> = ({ingredient, extraIngredients}) => {
    return (
        <div className={styles.container}>
            <img className={styles.ingredient} src={ingredient.image} alt={ingredient.name}/>
            {extraIngredients > 0 && (<p className={styles.extra}>{`+${extraIngredients}`}</p>)}
        </div>
    );
}