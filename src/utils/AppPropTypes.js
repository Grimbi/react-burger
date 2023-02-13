import PropTypes from "prop-types";
import {INGREDIENT_TYPES} from "./Constants";

export const INGREDIENT_TYPE_PROP_TYPE = PropTypes.oneOf(INGREDIENT_TYPES);

export const INGREDIENT_PROP_TYPE = PropTypes.shape({
    type: INGREDIENT_TYPE_PROP_TYPE.isRequired,
    image: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
});

export const INGREDIENTS_PROP_TYPE = PropTypes.arrayOf(INGREDIENT_PROP_TYPE);

export const BASKET_ITEM_PROP_TYPE = PropTypes.shape({
    id: PropTypes.number.isRequired,
    ingredient: PropTypes.string.isRequired,
});

export const BASKET_PROP_TYPE = PropTypes.arrayOf(BASKET_ITEM_PROP_TYPE);

export const CHILDREN_PROP_TYPE = PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
]);
