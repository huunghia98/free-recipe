import { memoize } from '@/lib/helper';

export type Ingredient = { name: string; value: string; img: string };
export type Meal = {
  id: number;
  name: string;
  instructions: string[];
  instructionRaw: string;
  drink?: string;
  area?: string;
  category: string;
  tags: string[];
  youtube: string;
  ingredients: Ingredient[];
  img: string;
  source: string;
};

export const convert = (obj: any) => {
  const ingredients: Ingredient[] = [];
  for (let index = 1; index <= 20; index++) {
    const el = obj['strIngredient' + index];
    if (!el || el === '') {
      break;
    }
    ingredients.push({
      name: obj['strIngredient' + index],
      value: obj['strMeasure' + index],
      img: `www.themealdb.com/images/ingredients/${encodeURIComponent(
        obj['strIngredient' + index]
      )}.png`,
    });
  }
  const instructions = obj.strInstructions
    ?.split('\r\n')
    .filter((r: string) => r.trim() !== '' && !/^STEP [0-9]*$/.test(r.trim()));
  return {
    id: obj.idMeal,
    name: obj.strMeal,
    instructions: instructions,
    instructionRaw: obj.strInstructions,
    category: obj.strCategory,
    drink: obj.strDrinkAlternate,
    area: obj.strArea,
    tags: obj.strTags?.split(',') ?? [],
    youtube: obj.strYoutube,
    ingredients: ingredients,
    img: obj.strMealThumb,
    source: obj.strSource,
  } as Meal;
};

const allCountry = memoize(async () => {
  return await fetch('https://flagcdn.com/en/codes.json').then((r) => r.json());
}, 60 * 1000 * 5);

const getCountryCode = async (name: string) => {
  // const country: any = await allCountry();
  // Object.entries(country).filter([k, v] => v === name)
};
