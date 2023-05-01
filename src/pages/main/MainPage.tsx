import {FC} from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {BurgerIngredients} from "../../components/burger-ingredients/BurgerIngredients";
import {BurgerConstructor} from "../../components/burger-constructor/BurgerConstructor";
import styles from "./MainPage.module.css";

export const MainPage: FC = () => {
    return (
        <>
            <main className={styles.main}>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients/>
                    <BurgerConstructor/>
                </DndProvider>
            </main>
        </>
    );
}
