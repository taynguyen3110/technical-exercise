export interface FruitItem {
  name: string;
  id: number;
  family: string;
  order: string;
  genus: string;
  nutritions: {
    calories: number;
    fat: number;
    sugar: number;
    carbohydrates: number;
    protein: number;
  };
  selected?: boolean;
}

export interface LocalFruitItem {
  name: string;
  id: number;
  calories: number;
  fat: number;
  carbohydrates: number;
  protein: number;
}
