import {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {INGREDIENT_TYPES} from "../../utils/Constants";
import IngredientsGroup from "./IngredientsGroup";
import {fetchIngredients} from "../../services/actions/Ingredients";
import styles from "./BurgerIngredients.module.css";

function BurgerIngredients() {
    const [current, setCurrent] = useState("bun");

    const dispatch = useDispatch();

    useEffect(
        () => {
            dispatch(fetchIngredients());
        },
        [dispatch]
    );

    const groupRefs = {
        bun: useRef(),
        sauce: useRef(),
        main: useRef(),
    };

    const groupsRef = useRef();

    const changeTab = (tab) => {
        setCurrent(tab);
        groupRefs[tab]?.current?.scrollIntoView();
    };

    const onScroll = () => {
        const containerRect = groupsRef.current?.getBoundingClientRect();
        if (containerRect) {
            let closestTab;
            let closestOffset = Number.MAX_SAFE_INTEGER;

            for (const key in groupRefs) {
                const rect = groupRefs[key]?.current?.getBoundingClientRect();
                if (rect) {
                    const offset = Math.abs(rect.top - containerRect.top);
                    if (offset < closestOffset) {
                        closestTab = key;
                        closestOffset = offset;
                    }
                }
            }

            if (closestTab && current !== closestTab) {
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
                {
                    INGREDIENT_TYPES.map(type => (
                        <IngredientsGroup key={type} group={type} ref={groupRefs[type]}/>
                    ))
                }
            </ul>
        </section>
    );
}

export default BurgerIngredients;
