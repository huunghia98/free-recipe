import api from '@/lib/api';
import { getRandomItem, getRandomItems, memoize } from '@/lib/helper';
import { Meal, convert } from '@/types/meal';

export const getDiscoveryData = async () => {
  const dash = await Promise.all([
    getLatestMeals(),
    getRandomMeals(),
    getPopularIngredients(),
    getPopularCategory(),
  ]);
  return {
    latestMeals: dash[0],
    randomMeals: dash[1],
    popularIngredients: dash[2],
    popularCategories: dash[3],
    ingredients: await cacheIngredients(),
  };
};

export const getLatestMeals = memoize(async () => {
  const meals: Meal[] = await api({
    url: '/search.php',
    method: 'get',
    params: {
      s: '',
    },
  }).then((r) => r.data?.meals?.map((obj: any) => convert(obj)));
  return getRandomItems(meals, 8);
}, 300000);

export const getRandomMeals = memoize(async () => {
  const meals: Meal[] = await api({
    url: '/search.php',
    method: 'get',
    params: {
      s: '',
    },
  }).then((r) => r.data?.meals?.map((obj: any) => convert(obj)));
  return getRandomItems(meals, 8);
}, 300000);

export const getPopularIngredients = memoize(async () => {
  return getRandomItems(await cacheIngredients(), 4);
}, 300000);

export const getPopularCategory = memoize(async () => {
  return getRandomItems(await cacheCategory(), 4);
}, 300000);

export const cacheIngredients = memoize(async () => {
  const ingre: any[] = await api({
    url: '/list.php',
    method: 'get',
    params: {
      i: 'list',
    },
  }).then((r) => r.data?.meals);
  return ingre;
});

export const cacheCategory = memoize(async () => {
  const cat: any[] = await api({
    url: '/list.php',
    method: 'get',
    params: {
      c: 'list',
    },
  }).then((r) => r.data?.meals);
  return cat;
});

export const defaultRecipe = {
  uri: 'http://www.edamam.com/ontologies/edamam.owl#recipe_b00761b14032334b50f92c4d6230e684',
  label: 'Pad See Ew',
  image:
    'https://edamam-product-images.s3.amazonaws.com/web-img/944/944ebc0f356232a832c79098daf373fc.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQDQVUXY%2BH65OH8cXTtd3Da3CVmfLda5n1O%2FYbhwVIoB3QIhAPQeqQbYvCQtH0V86RNBttNdEYNA3ybn4OvYzGGnkLS4KrgFCBAQABoMMTg3MDE3MTUwOTg2IgxQIAo4hmmvgoB81lUqlQULMx893uZvrq15OaoVCHUsIG5GXyA2X9h15NnHdX5mBd%2Fo64b7d5zAI4yuFYUHaiDEiW6I%2F7HqKJ7PtBsJU5FyuvofCd21MPniE8ZkmdlcrPOnUDRMu10fOBX7owYy3R92LvQmTuwMLpz3Q3527mawjmvagcOWiLlSmSMrOqDSXb2PokiemOzJKBVC6hkP%2FnEloSCRxQqn2ZFq%2BJwRMpsdwjXOlWB9qRErwqh6%2F6Xu8gIc%2B0JJqejoIGMwvmRQSlWPCde15OZj6XetP2Zp%2Fud9xwl0mC94lPFYCuNeOXnQdCynwHtkeQur5AI4nq7imS1oQhQGQOl81hJcknbCPnRp2knw0moKnwiG%2B6az9VSo7hEBhZGfKd0SDXQHQ%2F%2FCMjI%2FsoC6bnUcf4ahFSfdp%2FoF9j2ucCvrbEdy1sfsNirAW%2BpVetQA9G%2BkE0DCfgnGPts7lmDjBvj0%2BMz7qdpBtbgrz9IfR1rXL98AjrDJ%2BKT92m%2Bx6HfzXEFAMJmV3Kz%2BP%2F7AyyludPlDzHSl48GGFJJzP1XblAbZapYgWSw3O%2BvyAAy%2BLbGM1HphtT5CdQCrBRUw%2Bz35FESFly9lpGgd764EZZHFZXhoLa97WO1qezWVS3Mt%2FNbHk87eMOtoKSM27K51CJVqvlD%2BDYyNAvLdHxzDN3lhMg1kIrN2zEf0ctifwjfkfNnYGbVfkKxhxiRQ4J26PcdFKUncI5l9EBNFJ8GuKDRbJI3wGrFPQu7iIAY6aZYsmdv%2FJwpqb5WLnpzYkmHTaeR9Jij32qVi7aGTVTAf4LkR30HAdWRodedog6qpBntjJdedcum9%2FnN6pUsF%2FaPGuRxQj8GYSuilNwzP0nPHlzl1Sq8lR5M3wzHB%2FZc2HlBp7nA5MPeviLEGOrABzf8PzWPdtUhSakCYNobfXXcQOMGuUA%2FZXDLcEPNA3j1iahkpu4C9AXQm9mIfz98xhJc67T69t6jEREqlIUS0V4ULcv4gM92ISg9xGLMXZBvivp6m7%2FhZXRcZ%2BroWh%2BWvp49YZM03EFkrYfNHubFCel3jalAcoXvqsdc8a3WiRcUo88RVP7pXMvH3YlAWIOSqJBvEYdUNWvTtmi%2BGtVhRYPJIAyew8o878R8%2FkS3Ao7U%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240419T081200Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFASN5BCVY%2F20240419%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=ae162e648d27a2b30edeb0ce40993cc017c211fa9c8af1e407b2302a8beec7b6',
  images: {
    THUMBNAIL: {
      url: 'https://edamam-product-images.s3.amazonaws.com/web-img/944/944ebc0f356232a832c79098daf373fc-s.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQDQVUXY%2BH65OH8cXTtd3Da3CVmfLda5n1O%2FYbhwVIoB3QIhAPQeqQbYvCQtH0V86RNBttNdEYNA3ybn4OvYzGGnkLS4KrgFCBAQABoMMTg3MDE3MTUwOTg2IgxQIAo4hmmvgoB81lUqlQULMx893uZvrq15OaoVCHUsIG5GXyA2X9h15NnHdX5mBd%2Fo64b7d5zAI4yuFYUHaiDEiW6I%2F7HqKJ7PtBsJU5FyuvofCd21MPniE8ZkmdlcrPOnUDRMu10fOBX7owYy3R92LvQmTuwMLpz3Q3527mawjmvagcOWiLlSmSMrOqDSXb2PokiemOzJKBVC6hkP%2FnEloSCRxQqn2ZFq%2BJwRMpsdwjXOlWB9qRErwqh6%2F6Xu8gIc%2B0JJqejoIGMwvmRQSlWPCde15OZj6XetP2Zp%2Fud9xwl0mC94lPFYCuNeOXnQdCynwHtkeQur5AI4nq7imS1oQhQGQOl81hJcknbCPnRp2knw0moKnwiG%2B6az9VSo7hEBhZGfKd0SDXQHQ%2F%2FCMjI%2FsoC6bnUcf4ahFSfdp%2FoF9j2ucCvrbEdy1sfsNirAW%2BpVetQA9G%2BkE0DCfgnGPts7lmDjBvj0%2BMz7qdpBtbgrz9IfR1rXL98AjrDJ%2BKT92m%2Bx6HfzXEFAMJmV3Kz%2BP%2F7AyyludPlDzHSl48GGFJJzP1XblAbZapYgWSw3O%2BvyAAy%2BLbGM1HphtT5CdQCrBRUw%2Bz35FESFly9lpGgd764EZZHFZXhoLa97WO1qezWVS3Mt%2FNbHk87eMOtoKSM27K51CJVqvlD%2BDYyNAvLdHxzDN3lhMg1kIrN2zEf0ctifwjfkfNnYGbVfkKxhxiRQ4J26PcdFKUncI5l9EBNFJ8GuKDRbJI3wGrFPQu7iIAY6aZYsmdv%2FJwpqb5WLnpzYkmHTaeR9Jij32qVi7aGTVTAf4LkR30HAdWRodedog6qpBntjJdedcum9%2FnN6pUsF%2FaPGuRxQj8GYSuilNwzP0nPHlzl1Sq8lR5M3wzHB%2FZc2HlBp7nA5MPeviLEGOrABzf8PzWPdtUhSakCYNobfXXcQOMGuUA%2FZXDLcEPNA3j1iahkpu4C9AXQm9mIfz98xhJc67T69t6jEREqlIUS0V4ULcv4gM92ISg9xGLMXZBvivp6m7%2FhZXRcZ%2BroWh%2BWvp49YZM03EFkrYfNHubFCel3jalAcoXvqsdc8a3WiRcUo88RVP7pXMvH3YlAWIOSqJBvEYdUNWvTtmi%2BGtVhRYPJIAyew8o878R8%2FkS3Ao7U%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240419T081200Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFASN5BCVY%2F20240419%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=0bee3599f8608fae1d343a3bcaecb203460a92056e4c04c159f70be9e59af0c5',
      width: 100,
      height: 100,
    },
    SMALL: {
      url: 'https://edamam-product-images.s3.amazonaws.com/web-img/944/944ebc0f356232a832c79098daf373fc-m.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQDQVUXY%2BH65OH8cXTtd3Da3CVmfLda5n1O%2FYbhwVIoB3QIhAPQeqQbYvCQtH0V86RNBttNdEYNA3ybn4OvYzGGnkLS4KrgFCBAQABoMMTg3MDE3MTUwOTg2IgxQIAo4hmmvgoB81lUqlQULMx893uZvrq15OaoVCHUsIG5GXyA2X9h15NnHdX5mBd%2Fo64b7d5zAI4yuFYUHaiDEiW6I%2F7HqKJ7PtBsJU5FyuvofCd21MPniE8ZkmdlcrPOnUDRMu10fOBX7owYy3R92LvQmTuwMLpz3Q3527mawjmvagcOWiLlSmSMrOqDSXb2PokiemOzJKBVC6hkP%2FnEloSCRxQqn2ZFq%2BJwRMpsdwjXOlWB9qRErwqh6%2F6Xu8gIc%2B0JJqejoIGMwvmRQSlWPCde15OZj6XetP2Zp%2Fud9xwl0mC94lPFYCuNeOXnQdCynwHtkeQur5AI4nq7imS1oQhQGQOl81hJcknbCPnRp2knw0moKnwiG%2B6az9VSo7hEBhZGfKd0SDXQHQ%2F%2FCMjI%2FsoC6bnUcf4ahFSfdp%2FoF9j2ucCvrbEdy1sfsNirAW%2BpVetQA9G%2BkE0DCfgnGPts7lmDjBvj0%2BMz7qdpBtbgrz9IfR1rXL98AjrDJ%2BKT92m%2Bx6HfzXEFAMJmV3Kz%2BP%2F7AyyludPlDzHSl48GGFJJzP1XblAbZapYgWSw3O%2BvyAAy%2BLbGM1HphtT5CdQCrBRUw%2Bz35FESFly9lpGgd764EZZHFZXhoLa97WO1qezWVS3Mt%2FNbHk87eMOtoKSM27K51CJVqvlD%2BDYyNAvLdHxzDN3lhMg1kIrN2zEf0ctifwjfkfNnYGbVfkKxhxiRQ4J26PcdFKUncI5l9EBNFJ8GuKDRbJI3wGrFPQu7iIAY6aZYsmdv%2FJwpqb5WLnpzYkmHTaeR9Jij32qVi7aGTVTAf4LkR30HAdWRodedog6qpBntjJdedcum9%2FnN6pUsF%2FaPGuRxQj8GYSuilNwzP0nPHlzl1Sq8lR5M3wzHB%2FZc2HlBp7nA5MPeviLEGOrABzf8PzWPdtUhSakCYNobfXXcQOMGuUA%2FZXDLcEPNA3j1iahkpu4C9AXQm9mIfz98xhJc67T69t6jEREqlIUS0V4ULcv4gM92ISg9xGLMXZBvivp6m7%2FhZXRcZ%2BroWh%2BWvp49YZM03EFkrYfNHubFCel3jalAcoXvqsdc8a3WiRcUo88RVP7pXMvH3YlAWIOSqJBvEYdUNWvTtmi%2BGtVhRYPJIAyew8o878R8%2FkS3Ao7U%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240419T081200Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFASN5BCVY%2F20240419%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=b47f1b646b25ca117b16818584f740a7127dbaf29b92c79a0fb058d10d00efaa',
      width: 200,
      height: 200,
    },
    REGULAR: {
      url: 'https://edamam-product-images.s3.amazonaws.com/web-img/944/944ebc0f356232a832c79098daf373fc.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQDQVUXY%2BH65OH8cXTtd3Da3CVmfLda5n1O%2FYbhwVIoB3QIhAPQeqQbYvCQtH0V86RNBttNdEYNA3ybn4OvYzGGnkLS4KrgFCBAQABoMMTg3MDE3MTUwOTg2IgxQIAo4hmmvgoB81lUqlQULMx893uZvrq15OaoVCHUsIG5GXyA2X9h15NnHdX5mBd%2Fo64b7d5zAI4yuFYUHaiDEiW6I%2F7HqKJ7PtBsJU5FyuvofCd21MPniE8ZkmdlcrPOnUDRMu10fOBX7owYy3R92LvQmTuwMLpz3Q3527mawjmvagcOWiLlSmSMrOqDSXb2PokiemOzJKBVC6hkP%2FnEloSCRxQqn2ZFq%2BJwRMpsdwjXOlWB9qRErwqh6%2F6Xu8gIc%2B0JJqejoIGMwvmRQSlWPCde15OZj6XetP2Zp%2Fud9xwl0mC94lPFYCuNeOXnQdCynwHtkeQur5AI4nq7imS1oQhQGQOl81hJcknbCPnRp2knw0moKnwiG%2B6az9VSo7hEBhZGfKd0SDXQHQ%2F%2FCMjI%2FsoC6bnUcf4ahFSfdp%2FoF9j2ucCvrbEdy1sfsNirAW%2BpVetQA9G%2BkE0DCfgnGPts7lmDjBvj0%2BMz7qdpBtbgrz9IfR1rXL98AjrDJ%2BKT92m%2Bx6HfzXEFAMJmV3Kz%2BP%2F7AyyludPlDzHSl48GGFJJzP1XblAbZapYgWSw3O%2BvyAAy%2BLbGM1HphtT5CdQCrBRUw%2Bz35FESFly9lpGgd764EZZHFZXhoLa97WO1qezWVS3Mt%2FNbHk87eMOtoKSM27K51CJVqvlD%2BDYyNAvLdHxzDN3lhMg1kIrN2zEf0ctifwjfkfNnYGbVfkKxhxiRQ4J26PcdFKUncI5l9EBNFJ8GuKDRbJI3wGrFPQu7iIAY6aZYsmdv%2FJwpqb5WLnpzYkmHTaeR9Jij32qVi7aGTVTAf4LkR30HAdWRodedog6qpBntjJdedcum9%2FnN6pUsF%2FaPGuRxQj8GYSuilNwzP0nPHlzl1Sq8lR5M3wzHB%2FZc2HlBp7nA5MPeviLEGOrABzf8PzWPdtUhSakCYNobfXXcQOMGuUA%2FZXDLcEPNA3j1iahkpu4C9AXQm9mIfz98xhJc67T69t6jEREqlIUS0V4ULcv4gM92ISg9xGLMXZBvivp6m7%2FhZXRcZ%2BroWh%2BWvp49YZM03EFkrYfNHubFCel3jalAcoXvqsdc8a3WiRcUo88RVP7pXMvH3YlAWIOSqJBvEYdUNWvTtmi%2BGtVhRYPJIAyew8o878R8%2FkS3Ao7U%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240419T081200Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFASN5BCVY%2F20240419%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=ae162e648d27a2b30edeb0ce40993cc017c211fa9c8af1e407b2302a8beec7b6',
      width: 300,
      height: 300,
    },
    LARGE: {
      url: 'https://edamam-product-images.s3.amazonaws.com/web-img/944/944ebc0f356232a832c79098daf373fc-l.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQDQVUXY%2BH65OH8cXTtd3Da3CVmfLda5n1O%2FYbhwVIoB3QIhAPQeqQbYvCQtH0V86RNBttNdEYNA3ybn4OvYzGGnkLS4KrgFCBAQABoMMTg3MDE3MTUwOTg2IgxQIAo4hmmvgoB81lUqlQULMx893uZvrq15OaoVCHUsIG5GXyA2X9h15NnHdX5mBd%2Fo64b7d5zAI4yuFYUHaiDEiW6I%2F7HqKJ7PtBsJU5FyuvofCd21MPniE8ZkmdlcrPOnUDRMu10fOBX7owYy3R92LvQmTuwMLpz3Q3527mawjmvagcOWiLlSmSMrOqDSXb2PokiemOzJKBVC6hkP%2FnEloSCRxQqn2ZFq%2BJwRMpsdwjXOlWB9qRErwqh6%2F6Xu8gIc%2B0JJqejoIGMwvmRQSlWPCde15OZj6XetP2Zp%2Fud9xwl0mC94lPFYCuNeOXnQdCynwHtkeQur5AI4nq7imS1oQhQGQOl81hJcknbCPnRp2knw0moKnwiG%2B6az9VSo7hEBhZGfKd0SDXQHQ%2F%2FCMjI%2FsoC6bnUcf4ahFSfdp%2FoF9j2ucCvrbEdy1sfsNirAW%2BpVetQA9G%2BkE0DCfgnGPts7lmDjBvj0%2BMz7qdpBtbgrz9IfR1rXL98AjrDJ%2BKT92m%2Bx6HfzXEFAMJmV3Kz%2BP%2F7AyyludPlDzHSl48GGFJJzP1XblAbZapYgWSw3O%2BvyAAy%2BLbGM1HphtT5CdQCrBRUw%2Bz35FESFly9lpGgd764EZZHFZXhoLa97WO1qezWVS3Mt%2FNbHk87eMOtoKSM27K51CJVqvlD%2BDYyNAvLdHxzDN3lhMg1kIrN2zEf0ctifwjfkfNnYGbVfkKxhxiRQ4J26PcdFKUncI5l9EBNFJ8GuKDRbJI3wGrFPQu7iIAY6aZYsmdv%2FJwpqb5WLnpzYkmHTaeR9Jij32qVi7aGTVTAf4LkR30HAdWRodedog6qpBntjJdedcum9%2FnN6pUsF%2FaPGuRxQj8GYSuilNwzP0nPHlzl1Sq8lR5M3wzHB%2FZc2HlBp7nA5MPeviLEGOrABzf8PzWPdtUhSakCYNobfXXcQOMGuUA%2FZXDLcEPNA3j1iahkpu4C9AXQm9mIfz98xhJc67T69t6jEREqlIUS0V4ULcv4gM92ISg9xGLMXZBvivp6m7%2FhZXRcZ%2BroWh%2BWvp49YZM03EFkrYfNHubFCel3jalAcoXvqsdc8a3WiRcUo88RVP7pXMvH3YlAWIOSqJBvEYdUNWvTtmi%2BGtVhRYPJIAyew8o878R8%2FkS3Ao7U%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240419T081200Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFASN5BCVY%2F20240419%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=b6ae44e3aa93c0343afedc451e5ab5abdd682ce0b861246f1a510631079cb1b4',
      width: 600,
      height: 600,
    },
  },
  source: 'littlechefblog.com',
  url: 'http://littlechefblog.com/pad-see-ew/',
  shareAs:
    'http://www.edamam.com/recipe/pad-see-ew-b00761b14032334b50f92c4d6230e684/pad+see+ew',
  yield: 2.0,
  dietLabels: ['Balanced'],
  healthLabels: [
    'Dairy-Free',
    'Peanut-Free',
    'Tree-Nut-Free',
    'Pork-Free',
    'Red-Meat-Free',
    'Celery-Free',
    'Mustard-Free',
    'Sesame-Free',
    'Lupine-Free',
    'Alcohol-Free',
  ],
  cautions: ['Shellfish', 'Sulfites', 'FODMAP'],
  ingredientLines: [
    '2 tablespoons light soy sauce',
    '1 tablespoon fish sauce',
    '1 tablespoon oyster sauce',
    '1 tablespoon sugar',
    'For the Pad See Ew:',
    '8 ounces fresh flat rice noodles',
    '2 tablespoons olive oil',
    '2 cloves garlic, minced',
    '4 ounces boneless, skinless chicken thighs, cut into bite sized pieces',
    '6 ounces bok choy, chopped',
    '2 eggs, beaten',
  ],
  ingredients: [
    {
      text: '2 tablespoons light soy sauce',
      quantity: 2.0,
      measure: 'tablespoon',
      food: 'light soy sauce',
      weight: 28.4,
      foodCategory: 'plant-based protein',
      foodId: 'food_af8xwhdbq4vg0tbqfqjysafu339b',
      image:
        'https://www.edamam.com/food-img/4bc/4bccc4c294a8dddb62020c62935e6fd8.jpg',
    },
    {
      text: '1 tablespoon fish sauce',
      quantity: 1.0,
      measure: 'tablespoon',
      food: 'fish sauce',
      weight: 18.0,
      foodCategory: 'canned soup',
      foodId: 'food_ahlu6u3ab8bu1wap7cbqua3s1quk',
      image:
        'https://www.edamam.com/food-img/7b5/7b58b769d8bf7b79acf12a76b79ea9bc.jpg',
    },
    {
      text: '1 tablespoon oyster sauce',
      quantity: 1.0,
      measure: 'tablespoon',
      food: 'oyster sauce',
      weight: 18.0,
      foodCategory: 'canned soup',
      foodId: 'food_bm6al56a28x19ubll7fe8btl8wq0',
      image:
        'https://www.edamam.com/food-img/6ba/6ba8c5a1ea18756f59d2c0d5980fde38.jpg',
    },
    {
      text: '1 tablespoon sugar',
      quantity: 1.0,
      measure: 'tablespoon',
      food: 'sugar',
      weight: 12.4999999997887,
      foodCategory: 'sugars',
      foodId: 'food_axi2ijobrk819yb0adceobnhm1c2',
      image:
        'https://www.edamam.com/food-img/ecb/ecb3f5aaed96d0188c21b8369be07765.jpg',
    },
    {
      text: '8 ounces fresh flat rice noodles',
      quantity: 8.0,
      measure: 'ounce',
      food: 'rice noodles',
      weight: 226.796185,
      foodCategory: 'grains',
      foodId: 'food_bkwbi4gbu7k75ha7ad8eralgwvlk',
      image:
        'https://www.edamam.com/food-img/a83/a831dd1f26c9e2d0bf9e01bf7d5c0f0e.jpg',
    },
    {
      text: '2 tablespoons olive oil',
      quantity: 2.0,
      measure: 'tablespoon',
      food: 'olive oil',
      weight: 27.0,
      foodCategory: 'Oils',
      foodId: 'food_b1d1icuad3iktrbqby0hiagafaz7',
      image:
        'https://www.edamam.com/food-img/4d6/4d651eaa8a353647746290c7a9b29d84.jpg',
    },
    {
      text: '2 cloves garlic, minced',
      quantity: 2.0,
      measure: 'clove',
      food: 'garlic',
      weight: 6.0,
      foodCategory: 'vegetables',
      foodId: 'food_avtcmx6bgjv1jvay6s6stan8dnyp',
      image:
        'https://www.edamam.com/food-img/6ee/6ee142951f48aaf94f4312409f8d133d.jpg',
    },
    {
      text: '4 ounces boneless, skinless chicken thighs, cut into bite sized pieces',
      quantity: 4.0,
      measure: 'ounce',
      food: 'skinless chicken thighs',
      weight: 113.3980925,
      foodCategory: 'Poultry',
      foodId: 'food_aop3mn0aizq8j5a5tyyxxafsdigk',
      image:
        'https://www.edamam.com/food-img/7f6/7f63ca77277a0b949d43f7b661ef87e7.jpg',
    },
    {
      text: '6 ounces bok choy, chopped',
      quantity: 6.0,
      measure: 'ounce',
      food: 'bok choy',
      weight: 170.09713875,
      foodCategory: 'vegetables',
      foodId: 'food_bq7w3usaxapk30b8utp6lasy79lv',
      image:
        'https://www.edamam.com/food-img/c76/c7698a4dc6baecd186476820b6b91cdc.jpg',
    },
    {
      text: '2 eggs, beaten',
      quantity: 2.0,
      measure: '<unit>',
      food: 'eggs',
      weight: 86.0,
      foodCategory: 'Eggs',
      foodId: 'food_bhpradua77pk16aipcvzeayg732r',
      image:
        'https://www.edamam.com/food-img/a7e/a7ec7c337cb47c6550b3b118e357f077.jpg',
    },
  ],
  calories: 1440.6083475241826,
  totalCO2Emissions: 2948.682998686524,
  co2EmissionsClass: 'F',
  totalWeight: 706.1914162497887,
  totalTime: 0.0,
  cuisineType: ['south east asian'],
  mealType: ['lunch/dinner'],
  dishType: ['starter'],
  totalNutrients: {
    ENERC_KCAL: {
      label: 'Energy',
      quantity: 1440.6083475241826,
      unit: 'kcal',
    },
    FAT: {
      label: 'Fat',
      quantity: 41.6228543245,
      unit: 'g',
    },
    FASAT: {
      label: 'Saturated',
      quantity: 8.1088789502125,
      unit: 'g',
    },
    FATRN: {
      label: 'Trans',
      quantity: 0.0553596185,
      unit: 'g',
    },
    FAMS: {
      label: 'Monounsaturated',
      quantity: 25.020675053162503,
      unit: 'g',
    },
    FAPU: {
      label: 'Polyunsaturated',
      quantity: 6.072758286900001,
      unit: 'g',
    },
    CHOCDF: {
      label: 'Carbs',
      quantity: 206.69463795141374,
      unit: 'g',
    },
    'CHOCDF.net': {
      label: 'Carbohydrates (net)',
      quantity: 200.64593332641374,
      unit: 'g',
    },
    FIBTG: {
      label: 'Fiber',
      quantity: 6.048704625000001,
      unit: 'g',
    },
    SUGAR: {
      label: 'Sugars',
      quantity: 16.320925078164127,
      unit: 'g',
    },
    'SUGAR.added': {
      label: 'Sugars, added',
      quantity: 12.474999999789123,
      unit: 'g',
    },
    PROCNT: {
      label: 'Protein',
      quantity: 52.816562895000004,
      unit: 'g',
    },
    CHOLE: {
      label: 'Cholesterol',
      quantity: 426.51420695,
      unit: 'mg',
    },
    NA: {
      label: 'Sodium',
      quantity: 3586.410987062497,
      unit: 'mg',
    },
    CA: {
      label: 'Calcium',
      quantity: 261.17097661249795,
      unit: 'mg',
    },
    MG: {
      label: 'Magnesium',
      quantity: 139.04573151249997,
      unit: 'mg',
    },
    K: {
      label: 'Potassium',
      quantity: 1052.0814295749958,
      unit: 'mg',
    },
    FE: {
      label: 'Iron',
      quantity: 5.354048974374895,
      unit: 'mg',
    },
    ZN: {
      label: 'Zinc',
      quantity: 5.318015049624979,
      unit: 'mg',
    },
    P: {
      label: 'Phosphorus',
      quantity: 837.9368044125,
      unit: 'mg',
    },
    VITA_RAE: {
      label: 'Vitamin A',
      quantity: 173.473408675,
      unit: 'µg',
    },
    VITC: {
      label: 'Vitamin C',
      quantity: 47.9062274625,
      unit: 'mg',
    },
    THIA: {
      label: 'Thiamin (B1)',
      quantity: 0.29985599425,
      unit: 'mg',
    },
    RIBF: {
      label: 'Riboflavin (B2)',
      quantity: 0.8485991821249599,
      unit: 'mg',
    },
    NIA: {
      label: 'Niacin (B3)',
      quantity: 8.59720206685,
      unit: 'mg',
    },
    VITB6A: {
      label: 'Vitamin B6',
      quantity: 1.2802701868250002,
      unit: 'mg',
    },
    FOLDFE: {
      label: 'Folate equivalent (total)',
      quantity: 210.69254886250002,
      unit: 'µg',
    },
    FOLFD: {
      label: 'Folate (food)',
      quantity: 210.69254886250002,
      unit: 'µg',
    },
    FOLAC: {
      label: 'Folic acid',
      quantity: 0.0,
      unit: 'µg',
    },
    VITB12: {
      label: 'Vitamin B12',
      quantity: 1.61732836425,
      unit: 'µg',
    },
    VITD: {
      label: 'Vitamin D',
      quantity: 1.72,
      unit: 'µg',
    },
    TOCPHA: {
      label: 'Vitamin E',
      quantity: 5.5699489364999994,
      unit: 'mg',
    },
    VITK1: {
      label: 'Vitamin K',
      quantity: 92.87421720625,
      unit: 'µg',
    },
    WATER: {
      label: 'Water',
      quantity: 391.54669147999994,
      unit: 'g',
    },
  },
  totalDaily: {
    ENERC_KCAL: {
      label: 'Energy',
      quantity: 72.03041737620913,
      unit: '%',
    },
    FAT: {
      label: 'Fat',
      quantity: 64.03516049923076,
      unit: '%',
    },
    FASAT: {
      label: 'Saturated',
      quantity: 40.5443947510625,
      unit: '%',
    },
    CHOCDF: {
      label: 'Carbs',
      quantity: 68.89821265047125,
      unit: '%',
    },
    FIBTG: {
      label: 'Fiber',
      quantity: 24.194818500000007,
      unit: '%',
    },
    PROCNT: {
      label: 'Protein',
      quantity: 105.63312579000001,
      unit: '%',
    },
    CHOLE: {
      label: 'Cholesterol',
      quantity: 142.17140231666667,
      unit: '%',
    },
    NA: {
      label: 'Sodium',
      quantity: 149.43379112760405,
      unit: '%',
    },
    CA: {
      label: 'Calcium',
      quantity: 26.117097661249794,
      unit: '%',
    },
    MG: {
      label: 'Magnesium',
      quantity: 33.10612655059523,
      unit: '%',
    },
    K: {
      label: 'Potassium',
      quantity: 22.384711267553104,
      unit: '%',
    },
    FE: {
      label: 'Iron',
      quantity: 29.74471652430497,
      unit: '%',
    },
    ZN: {
      label: 'Zinc',
      quantity: 48.34559136022708,
      unit: '%',
    },
    P: {
      label: 'Phosphorus',
      quantity: 119.7052577732143,
      unit: '%',
    },
    VITA_RAE: {
      label: 'Vitamin A',
      quantity: 19.27482318611111,
      unit: '%',
    },
    VITC: {
      label: 'Vitamin C',
      quantity: 53.229141625000004,
      unit: '%',
    },
    THIA: {
      label: 'Thiamin (B1)',
      quantity: 24.98799952083333,
      unit: '%',
    },
    RIBF: {
      label: 'Riboflavin (B2)',
      quantity: 65.27686016345845,
      unit: '%',
    },
    NIA: {
      label: 'Niacin (B3)',
      quantity: 53.7325129178125,
      unit: '%',
    },
    VITB6A: {
      label: 'Vitamin B6',
      quantity: 98.48232206346155,
      unit: '%',
    },
    FOLDFE: {
      label: 'Folate equivalent (total)',
      quantity: 52.673137215625005,
      unit: '%',
    },
    VITB12: {
      label: 'Vitamin B12',
      quantity: 67.38868184375,
      unit: '%',
    },
    VITD: {
      label: 'Vitamin D',
      quantity: 11.466666666666667,
      unit: '%',
    },
    TOCPHA: {
      label: 'Vitamin E',
      quantity: 37.13299291,
      unit: '%',
    },
    VITK1: {
      label: 'Vitamin K',
      quantity: 77.39518100520833,
      unit: '%',
    },
  },
  digest: [
    {
      label: 'Fat',
      tag: 'FAT',
      schemaOrgTag: 'fatContent',
      total: 41.6228543245,
      hasRDI: true,
      daily: 64.03516049923076,
      unit: 'g',
      sub: [
        {
          label: 'Saturated',
          tag: 'FASAT',
          schemaOrgTag: 'saturatedFatContent',
          total: 8.1088789502125,
          hasRDI: true,
          daily: 40.5443947510625,
          unit: 'g',
        },
        {
          label: 'Trans',
          tag: 'FATRN',
          schemaOrgTag: 'transFatContent',
          total: 0.0553596185,
          hasRDI: false,
          daily: 0.0,
          unit: 'g',
        },
        {
          label: 'Monounsaturated',
          tag: 'FAMS',
          schemaOrgTag: null,
          total: 25.020675053162503,
          hasRDI: false,
          daily: 0.0,
          unit: 'g',
        },
        {
          label: 'Polyunsaturated',
          tag: 'FAPU',
          schemaOrgTag: null,
          total: 6.072758286900001,
          hasRDI: false,
          daily: 0.0,
          unit: 'g',
        },
      ],
    },
    {
      label: 'Carbs',
      tag: 'CHOCDF',
      schemaOrgTag: 'carbohydrateContent',
      total: 206.69463795141374,
      hasRDI: true,
      daily: 68.89821265047125,
      unit: 'g',
      sub: [
        {
          label: 'Carbs (net)',
          tag: 'CHOCDF.net',
          schemaOrgTag: null,
          total: 200.64593332641374,
          hasRDI: false,
          daily: 0.0,
          unit: 'g',
        },
        {
          label: 'Fiber',
          tag: 'FIBTG',
          schemaOrgTag: 'fiberContent',
          total: 6.048704625000001,
          hasRDI: true,
          daily: 24.194818500000007,
          unit: 'g',
        },
        {
          label: 'Sugars',
          tag: 'SUGAR',
          schemaOrgTag: 'sugarContent',
          total: 16.320925078164127,
          hasRDI: false,
          daily: 0.0,
          unit: 'g',
        },
        {
          label: 'Sugars, added',
          tag: 'SUGAR.added',
          schemaOrgTag: null,
          total: 12.474999999789123,
          hasRDI: false,
          daily: 0.0,
          unit: 'g',
        },
      ],
    },
    {
      label: 'Protein',
      tag: 'PROCNT',
      schemaOrgTag: 'proteinContent',
      total: 52.816562895000004,
      hasRDI: true,
      daily: 105.63312579000001,
      unit: 'g',
    },
    {
      label: 'Cholesterol',
      tag: 'CHOLE',
      schemaOrgTag: 'cholesterolContent',
      total: 426.51420695,
      hasRDI: true,
      daily: 142.17140231666667,
      unit: 'mg',
    },
    {
      label: 'Sodium',
      tag: 'NA',
      schemaOrgTag: 'sodiumContent',
      total: 3586.410987062497,
      hasRDI: true,
      daily: 149.43379112760405,
      unit: 'mg',
    },
    {
      label: 'Calcium',
      tag: 'CA',
      schemaOrgTag: null,
      total: 261.17097661249795,
      hasRDI: true,
      daily: 26.117097661249794,
      unit: 'mg',
    },
    {
      label: 'Magnesium',
      tag: 'MG',
      schemaOrgTag: null,
      total: 139.04573151249997,
      hasRDI: true,
      daily: 33.10612655059523,
      unit: 'mg',
    },
    {
      label: 'Potassium',
      tag: 'K',
      schemaOrgTag: null,
      total: 1052.0814295749958,
      hasRDI: true,
      daily: 22.384711267553104,
      unit: 'mg',
    },
    {
      label: 'Iron',
      tag: 'FE',
      schemaOrgTag: null,
      total: 5.354048974374895,
      hasRDI: true,
      daily: 29.74471652430497,
      unit: 'mg',
    },
    {
      label: 'Zinc',
      tag: 'ZN',
      schemaOrgTag: null,
      total: 5.318015049624979,
      hasRDI: true,
      daily: 48.34559136022708,
      unit: 'mg',
    },
    {
      label: 'Phosphorus',
      tag: 'P',
      schemaOrgTag: null,
      total: 837.9368044125,
      hasRDI: true,
      daily: 119.7052577732143,
      unit: 'mg',
    },
    {
      label: 'Vitamin A',
      tag: 'VITA_RAE',
      schemaOrgTag: null,
      total: 173.473408675,
      hasRDI: true,
      daily: 19.27482318611111,
      unit: 'µg',
    },
    {
      label: 'Vitamin C',
      tag: 'VITC',
      schemaOrgTag: null,
      total: 47.9062274625,
      hasRDI: true,
      daily: 53.229141625000004,
      unit: 'mg',
    },
    {
      label: 'Thiamin (B1)',
      tag: 'THIA',
      schemaOrgTag: null,
      total: 0.29985599425,
      hasRDI: true,
      daily: 24.98799952083333,
      unit: 'mg',
    },
    {
      label: 'Riboflavin (B2)',
      tag: 'RIBF',
      schemaOrgTag: null,
      total: 0.8485991821249599,
      hasRDI: true,
      daily: 65.27686016345845,
      unit: 'mg',
    },
    {
      label: 'Niacin (B3)',
      tag: 'NIA',
      schemaOrgTag: null,
      total: 8.59720206685,
      hasRDI: true,
      daily: 53.7325129178125,
      unit: 'mg',
    },
    {
      label: 'Vitamin B6',
      tag: 'VITB6A',
      schemaOrgTag: null,
      total: 1.2802701868250002,
      hasRDI: true,
      daily: 98.48232206346155,
      unit: 'mg',
    },
    {
      label: 'Folate equivalent (total)',
      tag: 'FOLDFE',
      schemaOrgTag: null,
      total: 210.69254886250002,
      hasRDI: true,
      daily: 52.673137215625005,
      unit: 'µg',
    },
    {
      label: 'Folate (food)',
      tag: 'FOLFD',
      schemaOrgTag: null,
      total: 210.69254886250002,
      hasRDI: false,
      daily: 0.0,
      unit: 'µg',
    },
    {
      label: 'Folic acid',
      tag: 'FOLAC',
      schemaOrgTag: null,
      total: 0.0,
      hasRDI: false,
      daily: 0.0,
      unit: 'µg',
    },
    {
      label: 'Vitamin B12',
      tag: 'VITB12',
      schemaOrgTag: null,
      total: 1.61732836425,
      hasRDI: true,
      daily: 67.38868184375,
      unit: 'µg',
    },
    {
      label: 'Vitamin D',
      tag: 'VITD',
      schemaOrgTag: null,
      total: 1.72,
      hasRDI: true,
      daily: 11.466666666666667,
      unit: 'µg',
    },
    {
      label: 'Vitamin E',
      tag: 'TOCPHA',
      schemaOrgTag: null,
      total: 5.5699489364999994,
      hasRDI: true,
      daily: 37.13299291,
      unit: 'mg',
    },
    {
      label: 'Vitamin K',
      tag: 'VITK1',
      schemaOrgTag: null,
      total: 92.87421720625,
      hasRDI: true,
      daily: 77.39518100520833,
      unit: 'µg',
    },
    {
      label: 'Sugar alcohols',
      tag: 'Sugar.alcohol',
      schemaOrgTag: null,
      total: 0.0,
      hasRDI: false,
      daily: 0.0,
      unit: 'g',
    },
    {
      label: 'Water',
      tag: 'WATER',
      schemaOrgTag: null,
      total: 391.54669147999994,
      hasRDI: false,
      daily: 0.0,
      unit: 'g',
    },
  ],
};
