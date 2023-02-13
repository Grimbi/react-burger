import PropTypes from "prop-types";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import styles from "./AppMain.module.css";
import {BASKET_PROP_TYPE, INGREDIENTS_PROP_TYPE} from "../../utils/AppPropTypes";

function AppMain({ingredients, ingredientsById, basket}) {
    return (
        <main className={styles.main}>
            <BurgerIngredients ingredients={ingredients} basket={basket}/>
            <BurgerConstructor ingredientsById={ingredientsById} basket={basket}/>
        </main>
    );
}

AppMain.propTypes = {
    ingredients: INGREDIENTS_PROP_TYPE.isRequired,
    ingredientsById: PropTypes.object.isRequired,
    basket: BASKET_PROP_TYPE.isRequired,
};

export default AppMain;
