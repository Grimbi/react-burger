import {useCallback, useRef} from "react";
import {useDispatch} from "react-redux";
import {useDrag} from "react-dnd";
import PropTypes from "prop-types";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {INGREDIENT_PROP_TYPE} from "../../utils/AppPropTypes";
import {removeIngredient} from "../../services/actions/Basket";
import styles from "./Ingredient.module.css";

function Ingredient({type, id, ingredient}) {
    const dispatch = useDispatch();

    let name = ingredient.name;

    if (type) {
        if (type === "top") {
            name = name + " (верх)";
        } else if (type === "bottom") {
            name = name + " (низ)";
        }
    }

    const handleDelete = useCallback(() => {
        dispatch(removeIngredient(id));
    }, [dispatch, id]);

    const ref = useRef();

    const [{isDrag}, dragRef] = useDrag({
        type: "basket-item",
        item: { id, ingredient },
        collect: monitor => ({
            isDrag: monitor.isDragging(),
        })
    });

    if (ingredient.type !== "bun") {
        dragRef(ref);
    }

    return (
        <div className={isDrag ? styles.draggingIngredient : styles.ingredient} ref={ref}>
            {ingredient.type !== "bun" && <DragIcon type="primary" />}
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

Ingredient.propTypes = {
    type: PropTypes.oneOf(["top", "bottom"]),
    id: PropTypes.number,
    ingredient: INGREDIENT_PROP_TYPE.isRequired,
};

export default Ingredient;
