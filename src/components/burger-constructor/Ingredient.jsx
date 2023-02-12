import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Ingredient.module.css";

function Ingredient({type, ingredient}) {
    let name = ingredient.name;

    if (type) {
        if (type === "top") {
            name = name + " (верх)";
        } else if (type === "bottom") {
            name = name + " (низ)";
        }
    }

    return (
        <div className={styles.ingredient}>
            {ingredient.type !== "bun" && <DragIcon type="primary" />}
            <ConstructorElement
                type={type}
                isLocked={ingredient.type === "bun"}
                text={name}
                price={ingredient.price}
                thumbnail={ingredient.image}
            />
        </div>
    )
}

export default Ingredient;
