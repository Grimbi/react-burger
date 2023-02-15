export function getIngredientCount(basket, ingredient) {
    return basket.filter(item => item.ingredient === ingredient._id).length;
}