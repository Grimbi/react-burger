import {useRef, useState} from "react";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {IngredientTypes} from "../../models/Ingredients";
import IngredientsGroup from "./IngredientsGroup";
import styles from "./BurgerIngredients.module.css";

function BurgerIngredients() {
    const [current, setCurrent] = useState(IngredientTypes.bun);

    const bunGroupRef = useRef<HTMLLIElement>(null);
    const sauceGroupRef = useRef<HTMLLIElement>(null);
    const mainGroupRef = useRef<HTMLLIElement>(null);

    const groupsRef = useRef<HTMLUListElement>(null);

    const changeTab = (tab: string) => {
        switch (tab) {
            case "bun":
                setCurrent(IngredientTypes.bun);
                bunGroupRef.current?.scrollIntoView();
                break;
            case "sauce":
                setCurrent(IngredientTypes.sauce);
                sauceGroupRef.current?.scrollIntoView();
                break;
            case "main":
                setCurrent(IngredientTypes.main);
                mainGroupRef.current?.scrollIntoView();
                break;
        }
    };

    const onScroll = () => {
        if (groupsRef.current && bunGroupRef.current && sauceGroupRef.current && mainGroupRef.current) {
            const containerTop = groupsRef.current.getBoundingClientRect().top;
            const bunOffset = Math.abs(bunGroupRef.current.getBoundingClientRect().top - containerTop);
            const sauceOffset = Math.abs(sauceGroupRef.current.getBoundingClientRect().top - containerTop);
            const mainOffset = Math.abs(mainGroupRef.current.getBoundingClientRect().top - containerTop);

            let closestTab = IngredientTypes.bun;
            let closestOffset = bunOffset;

            if (sauceOffset < closestOffset) {
                closestTab = IngredientTypes.sauce;
                closestOffset = sauceOffset;
            }

            if (mainOffset < closestOffset) {
                closestTab = IngredientTypes.main;
            }

            if (current !== closestTab) {
                setCurrent(closestTab);
            }
        }
    };

    return (
        <section className={styles.container}>
            <h2 className={styles.header}>Соберите бургер</h2>
            <nav className={styles.tabs}>
                <Tab value="bun" active={current === "bun"} onClick={changeTab}>Булки</Tab>
                <Tab value="sauce" active={current === "sauce"} onClick={changeTab}>Соусы</Tab>
                <Tab value="main" active={current === "main"} onClick={changeTab}>Начинки</Tab>
            </nav>
            <ul className={styles.group} ref={groupsRef} onScroll={onScroll}>
                <IngredientsGroup key="bun" name="Булки" group={IngredientTypes.bun} ref={bunGroupRef}/>
                <IngredientsGroup key="sauce" name="Соусы" group={IngredientTypes.sauce} ref={sauceGroupRef}/>
                <IngredientsGroup key="main" name="Начинки" group={IngredientTypes.main} ref={mainGroupRef}/>
            </ul>
        </section>
    );
}

export default BurgerIngredients;
