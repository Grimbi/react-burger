import {useRef, useState} from "react";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {INGREDIENT_TYPES} from "../../utils/Constants";
import IngredientsGroup from "./IngredientsGroup";
import styles from "./BurgerIngredients.module.css";
import {BASKET_PROP_TYPE, INGREDIENTS_PROP_TYPE} from "../../utils/AppPropTypes";
import PropTypes from "prop-types";

function BurgerIngredients({ingredients, basket}) {
    const [current, setCurrent] = useState("bun");

    const groupRefs = {
        "bun": useRef(),
        "sauce": useRef(),
        "main": useRef(),
    };

    const changeTab = (tab) => {
        setCurrent(tab);
        groupRefs[tab]?.current?.scrollIntoView();
    };

    return (
        <section className={styles.container}>
            <h2 className={styles.header}>Соберите бургер</h2>
            <nav className={styles.tabs}>
                <Tab value="bun" active={current === "bun"} onClick={changeTab}>Булки</Tab>
                <Tab value="sauce" active={current === "sauce"} onClick={changeTab}>Соусы</Tab>
                <Tab value="main" active={current === "main"} onClick={changeTab}>Начинки</Tab>
            </nav>
            <ul className={styles.group}>
                {
                    INGREDIENT_TYPES.map(type => {
                        const typedIngredients = ingredients.filter(ingredient => ingredient.type === type);
                        return typedIngredients.length > 0 && (
                            <IngredientsGroup
                                key={type}
                                group={type}
                                ingredients={typedIngredients}
                                basket={basket}
                                ref={groupRefs[type]}
                            />
                        );
                    })
                }
            </ul>
        </section>
    );
}

BurgerIngredients.propTypes = {
    ingredients: INGREDIENTS_PROP_TYPE.isRequired,
    basket: BASKET_PROP_TYPE.isRequired,
};

export default BurgerIngredients;
