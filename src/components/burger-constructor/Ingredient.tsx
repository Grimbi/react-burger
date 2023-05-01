import {FC, useCallback, useRef} from "react";
import {useDrag} from "react-dnd";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useAppDispatch} from "../../services/store";
import {removeIngredient} from "../../services/actions/Basket";
import {IIngredient} from "../../models/Ingredients";
import styles from "./Ingredient.module.css";

interface IIngredientProps {
    type?: "top" | "bottom";
    id?: string;
    ingredient: IIngredient;
}

export const Ingredient: FC<IIngredientProps> = (
    {type, id, ingredient}
) => {
    const dispatch = useAppDispatch();

    let name = ingredient.name;

    if (type) {
        if (type === "top") {
            name = name + " (верх)";
        } else if (type === "bottom") {
            name = name + " (низ)";
        }
    }

    const handleDelete = useCallback(() => {
        id && dispatch(removeIngredient(id));
    }, [dispatch, id]);

    const ref = useRef<HTMLDivElement>(null);

    const [{isDrag}, dragRef] = useDrag({
        type: "basket-item",
        item: {id, ingredient},
        collect: monitor => ({
            isDrag: monitor.isDragging(),
        })
    });

    if (ingredient.type !== "bun") {
        dragRef(ref);
    }

    return (
        <div className={isDrag ? styles.draggingIngredient : styles.ingredient} ref={ref}>
            {ingredient.type !== "bun" && <DragIcon type="primary"/>}
            <ConstructorElement
                type={type}
                isLocked={ingredient.type === "bun"}
                text={name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                handleClose={handleDelete}
            />
        </div>
    )
}
