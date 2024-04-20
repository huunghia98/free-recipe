'use client';

import CardCategory from '@/components/recipe/cardCategory';
import CardIngredient from '@/components/recipe/cardIngredient';
import CardMeal from '@/components/recipe/cardMeal';
import SearchInput from '@/components/searchRecipe/searchInput';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Loading from '@/components/util/loading';
import { getDiscoveryData } from '@/service/meal';
import { useQueries, useQuery } from '@tanstack/react-query';
import { MicroscopeIcon, Search } from 'lucide-react';
import React from 'react';

type Props = {};

const Discovery = (props: Props) => {
  const { data: discovery, isLoading } = useQuery({
    queryKey: ['latestMeal'],
    queryFn: async () => {
      return getDiscoveryData();
    },
  });
  return (
    <div className='max-w-7xl mx-auto p-6'>
      <h1 className='text-3xl font-bold text-center py-4'>
        Today what will you eat?
      </h1>
      <p className='text-center mb-4'>
        Discover endless culinary possibilities with our innovative recipe
        search feature, where a world of flavors awaits at your fingertips.
      </p>
      <div className='flex justify-center mb-6'>
        <SearchInput />
      </div>
      <Loading isLoading={isLoading}>
        <div className='flex justify-between items-center mb-2'>
          <Badge variant='secondary'>🍽 Total Meals: 303</Badge>
          <Badge variant='secondary'>
            🧂 Total Ingredients: {discovery?.ingredients?.length}
          </Badge>
          <Badge variant='secondary'>🖼 Images: 303</Badge>
        </div>
        <hr className='h-1 bg-muted-foreground my-5' />
        <section className='my-5'>
          <h2 className='text-2xl font-semibold mb-6 text-center'>
            Latest Meals
          </h2>
          <div className='grid grid-cols-4 gap-2'>
            {discovery?.latestMeals?.map((meal) => (
              <CardMeal meal={meal} key={meal.id} />
            ))}
          </div>
        </section>

        <hr className='h-1 bg-muted-foreground my-5' />
        <section className='my-5'>
          <h2 className='text-2xl font-semibold mb-6 text-center'>
            Popular Ingredients
          </h2>
          <div className='grid grid-cols-4 gap-2'>
            {discovery?.popularIngredients?.map((ig: any) => (
              <CardIngredient key={ig?.idIngredient} {...ig} />
            ))}
          </div>
        </section>

        <hr className='h-1 bg-muted-foreground my-5' />
        <section className='my-5'>
          <h2 className='text-2xl font-semibold mb-6 text-center'>
            Popular Categories
          </h2>
          <div className='grid grid-cols-4 gap-2'>
            {discovery?.popularCategories?.map((ig: any) => (
              <CardCategory key={ig?.strCategory} {...ig} />
            ))}
          </div>
        </section>
        <hr className='h-1 bg-muted-foreground my-5' />
        <section className='my-5'>
          <h2 className='text-2xl font-semibold mb-6 text-center'>
            Random Meals
          </h2>
          <div className='grid grid-cols-4 gap-2'>
            {discovery?.randomMeals?.map((meal) => (
              <CardMeal meal={meal} key={meal.id} />
            ))}
          </div>
        </section>
      </Loading>
    </div>
  );
};

export default Discovery;
