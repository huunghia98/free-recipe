'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Loading from '@/components/util/loading';
import api from '@/lib/api';
import edaApi from '@/lib/edaApi';
import { defaultRecipe } from '@/service/meal';
import { Meal, convert } from '@/types/meal';
import { useQuery } from '@tanstack/react-query';
import {
  Clock1Icon,
  Fish,
  LandPlot,
  ListIcon,
  Salad,
  Skull,
  StarIcon,
  TableIcon,
  Tag,
  Weight,
  Zap,
} from 'lucide-react';
import Image from 'next/image';
import React from 'react';

type Props = {
  params: { id: number };
};

const MealDetail = ({ params: { id } }: Props) => {
  const { data: meal, isLoading } = useQuery<Meal>({
    queryKey: ['meal', id],
    queryFn: async () => {
      return api({
        url: '/lookup.php',
        params: {
          i: id,
        },
        method: 'get',
      }).then((r) => convert(r.data?.meals?.[0]));
    },
  });
  const { data: recipeAda, isLoading: isLoadingRecipeAda } = useQuery<any>({
    queryKey: ['ada', id, meal?.name ?? ''],
    queryFn: async () => {
      if (meal?.name) {
        const d = await getRecipeAda(meal?.name);
        return d;
      }
      return defaultRecipe;
    },
  });
  return (
    <Loading isLoading={isLoading || isLoadingRecipeAda} className='h-screen'>
      <div className='max-w-6xl mx-auto px-4 overflow-x-hidden'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 py-12'>
          <div className='rounded-lg overflow-hidden'>
            <Image
              alt='Recipe Image'
              className='w-full h-full object-cover'
              height={400}
              src={meal?.img ?? ''}
              style={{
                aspectRatio: '600/400',
                objectFit: 'cover',
              }}
              width={600}
            />
          </div>
          <div className='space-y-4'>
            <h1 className='text-3xl font-bold'>{meal?.name}</h1>
            <div className='grid grid-cols-2 gap-4 text-gray-500'>
              {meal?.drink && (
                <>
                  <div className='flex gap-2 items-center text-primary'>
                    <ListIcon className='w-5 h-5' />
                    <strong>Drink</strong>
                  </div>
                  <span>{meal?.drink}</span>
                </>
              )}
              <div className='flex gap-2 items-center text-primary'>
                <LandPlot className='w-5 h-5' />
                <strong>Country/Area</strong>
              </div>
              <span>{meal?.area}</span>
              <div className='flex gap-2 items-center text-primary'>
                <ListIcon className='w-5 h-5' />
                <strong>Category</strong>
              </div>
              <span>{meal?.category}</span>

              {meal?.tags && meal?.tags?.length !== 0 && (
                <>
                  <div className='flex gap-2 items-center text-primary'>
                    <Tag className='w-5 h-5' />
                    <strong>Tags</strong>
                  </div>
                  <div className='flex flex-wrap gap-1 md:gap-2 '>
                    {meal?.tags.map((r) => (
                      <span key={r}>{r}</span>
                    ))}
                  </div>
                </>
              )}
              {recipeAda?.cautions && (
                <>
                  <div className='flex gap-2 items-center text-primary'>
                    <Skull className='w-5 h-5' />
                    <strong>Cautions</strong>
                  </div>
                  <span className='capitalize'>
                    {recipeAda?.cautions?.join(', ')}
                  </span>
                </>
              )}
              {recipeAda?.mealType && (
                <>
                  <div className='flex gap-2 items-center text-primary'>
                    <Fish className='w-5 h-5' />
                    <strong>Meal Types</strong>
                  </div>
                  <span className='capitalize'>
                    {recipeAda?.mealType?.join(', ')}
                  </span>
                </>
              )}
              {recipeAda?.dishType && (
                <>
                  <div className='flex gap-2 items-center text-primary'>
                    <Salad className='w-5 h-5' />
                    <strong>Dish Types</strong>
                  </div>
                  <span className='capitalize'>
                    {recipeAda?.dishType?.join(', ')}
                  </span>
                </>
              )}
            </div>
            <div className='flex items-center gap-4 mt-4 flex-wrap'>
              {!!recipeAda?.totalTime && (
                <div className='flex items-center gap-1'>
                  <Clock1Icon className='w-5 h-5 text-gray-500' />
                  <span className='text-gray-500'>
                    {Math.round(recipeAda?.totalTime)} mins
                  </span>
                </div>
              )}
              {recipeAda?.yield && (
                <div className='flex items-center gap-1'>
                  <TableIcon className='w-5 h-5 text-gray-500' />
                  <span className='text-gray-500'>
                    {Math.round(Number(recipeAda?.yield))} servings
                  </span>
                </div>
              )}
              {recipeAda?.dietLabels?.[0] && (
                <div className='flex items-center gap-1'>
                  <StarIcon className='w-5 h-5 fill-primary' />
                  <span className='text-gray-500'>
                    {recipeAda?.dietLabels?.[0]}
                  </span>
                </div>
              )}
              {!!recipeAda?.calories && (
                <div className='flex items-center gap-1'>
                  <Zap className='w-5 h-5' />
                  <span className='text-gray-500'>
                    {Math.round(recipeAda?.calories)} calories
                  </span>
                </div>
              )}
              {!!recipeAda?.totalWeight && (
                <div className='flex items-center gap-1'>
                  <Weight className='w-5 h-5' />
                  <span className='text-gray-500'>
                    {Math.round(recipeAda?.totalWeight)}g
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div>
          <h2 className='text-2xl font-bold mb-4'>Ingredients</h2>
          <div className='grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-4'>
            {meal?.ingredients?.map((ingre) => (
              <div
                key={ingre.name}
                className='bg-gray-100 dark:bg-gray-800 p-4 rounded-lg'
              >
                <div className='flex gap-2 md:gap-3'>
                  <Image
                    src={`https://www.themealdb.com/images/ingredients/${encodeURIComponent(
                      ingre.name
                    )}.png`}
                    width={64}
                    height={64}
                    className='w-12 sm:w-16'
                    alt={ingre.name}
                  />
                  <div>
                    <h3 className='text-lg font-bold mb-2'>{ingre.name}</h3>
                    <p className='text-gray-500'>{ingre.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {meal?.youtube && (
          <div className='mt-10 flex justify-center'>
            <iframe
              width='560'
              height='315'
              src={meal?.youtube?.replace(
                'youtube.com/watch?v=',
                'youtube.com/embed/'
              )}
              title='YouTube video player'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              allowFullScreen
            ></iframe>
          </div>
        )}

        <div className='mt-10'>
          <h2 className='text-2xl font-bold mb-4'>Instructions</h2>
          <div className='flex flex-col gap-2 sm:gap-6'>
            {meal?.instructions?.map((instruction, idx) => (
              <div key={idx} className='flex flex-grow items-center gap-3'>
                <Button
                  className='text-xl min-w-16 min-h-16 w-16 h-16 rounded-[50%] border text-center align-middle'
                  variant={'outline'}
                >
                  {idx + 1}
                </Button>
                <div>{instruction}</div>
              </div>
            ))}
          </div>
        </div>
        <div className='mt-10 '>
          <h2 className='text-2xl font-bold mb-4'>Nutrition / Daily</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-1'>
            {recipeAda?.digest?.map((digest: any) => (
              <Card key={digest.label} className='w-full h-fit'>
                <CardHeader className='p-4 flex flex-row items-center justify-between'>
                  <CardTitle>{digest.label}</CardTitle>
                  <CompareDigest digest={digest} />
                </CardHeader>
                {digest?.sub && digest?.sub?.length !== 0 && (
                  <CardContent className='p-4'>
                    <div className='grid gap-px border-b border-gray-200 dark:border-gray-800'>
                      {digest?.sub?.map((sub: any) => (
                        <div
                          key={sub.label}
                          className='flex justify-between items-center gap-4 px-4 py-2 text-sm font-medium '
                        >
                          <span>{sub.label}</span>
                          <CompareDigest digest={sub} />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Loading>
  );
};
const CompareDigest = ({ digest }: { digest: any }) => {
  const total = Math.round(digest.total);
  const daily = Math.round(digest.daily);
  return (
    <span>
      <span
        className={`text-sm ${
          total > daily ? 'text-red-700 font-bold' : 'font-normal'
        }`}
      >
        {total}
        {digest.unit}
      </span>
      {daily > 0 && (
        <>
          &nbsp;/&nbsp;
          <span className='text-sm font-normal'>
            {daily}
            {digest.unit}
          </span>
        </>
      )}
    </span>
  );
};

const getRecipeAda = async (name: string) => {
  return edaApi({
    url: '/',
    method: 'get',
    params: {
      q: name,
      type: 'public',
    },
  })
    .then((res) => res.data?.hits?.[0]?.recipe)
    .catch((e) => {
      return defaultRecipe;
    });
};
export default MealDetail;
