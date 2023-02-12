import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import styles from "./AppMain.module.css";

function AppMain(props) {
    const {ingredients, basket} = props;
    return (
        <main className={styles.main}>
            <BurgerIngredients ingredients={ingredients} basket={basket}/>
            <BurgerConstructor ingredients={ingredients} basket={basket}/>
        </main>
    );
}

export default AppMain;
