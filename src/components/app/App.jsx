import {useEffect, useState} from 'react';
import AppHeader from "../app-header/AppHeader";
import AppMain from "../main/AppMain";
import {INGREDIENTS_URL} from "../../utils/Constants";
import {INITIAL_BASKET} from "../../utils/Data";
import styles from './App.module.css';

function App() {
    const [ingredients, setIngredients] = useState({
        ingredients: [],
        ingredientsById: {},
    });

    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    const [basket, setBasket] = useState(INITIAL_BASKET);

    useEffect(() => {
        setIsLoading(true);

        fetch(INGREDIENTS_URL)
            .then(result => result.json())
            .then(result => {
                if (result.success) {
                    const ingredients = {};
                    result.data.forEach(ingredient => {
                        ingredients[ingredient._id] = ingredient;
                    });

                    setIngredients({
                        ingredients: result.data,
                        ingredientsById: ingredients,
                    });
                } else {
                    console.log("Can't load ingredients");
                }
            })
            .catch(error => console.log(error))
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <div className={styles.app}>
            <AppHeader/>
            <AppMain ingredients={ingredients} basket={basket}/>
        </div>
    );
}

export default App;
