export enum IngredientTypes {
    bun = "bun",
    sauce = "sauce",
    main = "main",
}

export interface IIngredient {
    _id: string;
    type: IngredientTypes;
    name: string,
    image: string,
    image_large: string,
    price: number,
    calories: number,
    proteins: number,
    fat: number,
    carbohydrates: number,
}
