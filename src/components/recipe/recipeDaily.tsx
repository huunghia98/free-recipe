import CardIngredient from '@/components/recipe/cardIngredient';
import { Button } from '@/components/ui/button';
import api from '@/lib/api';
import { getPopularIngredients, getRandomMeals } from '@/service/meal';
import { Meal, convert } from '@/types/meal';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {};

const RecipeDaily = async (props: Props) => {
  const daily = await getRandomMeals();
  const ingre = await getPopularIngredients();

  return (
    <section className='py-12 bg-gray-100 dark:bg-secondary'>
      <div className='container mx-auto px-6'>
        <h2 className='text-2xl font-bold mb-6'>Recipe of the Day</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {daily.slice(2, 8)?.map((meal) => (
            <div
              key={meal?.id}
              className='rounded-lg overflow-hidden shadow-lg'
            >
              <Link href={`/meal/${meal.id}`}>
                <Image
                  alt='Recipe Image'
                  className='w-full h-64 object-cover'
                  height={400}
                  src={meal?.img}
                  style={{
                    aspectRatio: '600/400',
                    objectFit: 'cover',
                  }}
                  width={600}
                />
              </Link>

              <div className='p-6'>
                <h3 className='text-xl font-bold mb-2'>{meal?.name}</h3>
                <p className='text-gray-600 mb-4 dark:invert'>
                  {meal?.instructionRaw?.substring(0, 60) + '...'}
                </p>
                <Button variant={'destructive'}>
                  <Link href={`/meal/${meal.id}`}>View Recipe</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='container mx-auto px-6 mt-10'>
        <h2 className='text-2xl font-bold mb-6'>Popular Ingredients</h2>
        <div className='grid grid-cols-4 gap-2'>
          {ingre?.map((ig: any) => (
            <CardIngredient key={ig?.idIngredient} {...ig} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecipeDaily;
