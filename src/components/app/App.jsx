import {useEffect, useState} from 'react';
import AppHeader from "../app-header/AppHeader";
import AppMain from "../main/AppMain";
import {INGREDIENTS_URL} from "../../utils/Constants";
import {INITIAL_BASKET} from "../../utils/Data";
import styles from './App.module.css';

function App() {
    const [ingredients, setIngredients] = useState([]);
    const [ingredientsById, setIngredientsById] = useState({});

    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    const [basket, setBasket] = useState(INITIAL_BASKET);

    useEffect(() => {
        setIsLoading(true);

        fetch(INGREDIENTS_URL)
            .then(response => response.ok
                ? response.json()
                : Promise.reject(`Ошибка: ${response.status}, ${response.statusText}`)
            )
            .then(result => {
                if (result.success) {
                    const ingredients = {};
                    result.data.forEach(ingredient => {
                        ingredients[ingredient._id] = ingredient;
                    });

                    setIngredients(result.data);
                    setIngredientsById(ingredients);
                } else {
                    return Promise.reject("Can't load ingredients");
                }
            })
            .catch(error => console.log(error))
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <div className={styles.app}>
            <AppHeader/>
            <AppMain ingredients={ingredients} ingredientsById={ingredientsById} basket={basket}/>
        </div>
    );
}

export default App;
