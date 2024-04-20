'use client';
import React, { useEffect } from 'react';

import { Input } from '@/components/ui/input';
import { MicroscopeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchInput from '@/components/searchRecipe/searchInput';
import { Meal, convert } from '@/types/meal';
import api from '@/lib/api';
import CardMeal from '@/components/recipe/cardMeal';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { cacheIngredients } from '@/service/meal';
import SearchCategoryInput from '@/components/searchRecipe/searchCategoryInput';
import Empty from '@/components/util/empty';
import SearchIngredientInput from '@/components/searchRecipe/searchIngredientInput';
import Loading from '@/components/util/loading';

type Props = {};

type Filter = {
  q: string | null;
  category: string | null;
  ingredient: string | null;
};
const Search = (props: Props) => {
  const useParams = useSearchParams();
  const router = useRouter();

  const [filter, setFilter] = React.useState<Filter>({
    q: useParams.get('q'),
    category: useParams.get('category'),
    ingredient: useParams.get('ingredient'),
  });

  useEffect(() => {
    setFilter({
      q: useParams.get('q'),
      category: useParams.get('category'),
      ingredient: useParams.get('ingredient'),
    });
  }, [useParams]);

  const updateFilter = (f: { [k in string]: any }) => {
    const searchParams = new URLSearchParams();
    Object.entries(f).forEach(([k, v]) => {
      if (v !== null) {
        searchParams.set(k, v);
      }
    });
    router.replace(`/search?${searchParams.toString()}`);
  };

  const { data, isLoading } = useQuery<Meal[]>({
    queryKey: ['searchMeal', filter],
    queryFn: async () => {
      let meals: Meal[] = [];
      if (filter.q) {
        meals = await api({
          url: '/search.php',
          method: 'get',
          params: {
            s: filter.q,
          },
        }).then((r) => r.data?.meals?.map((obj: any) => convert(obj)));
      } else if (filter.ingredient) {
        meals = await api({
          url: '/filter.php',
          method: 'get',
          params: {
            i: filter.ingredient,
          },
        }).then((r) => {
          return r.data?.meals?.map((obj: any) => convert(obj));
        });
      } else if (filter.category) {
        meals = await api({
          url: '/filter.php',
          method: 'get',
          params: {
            c: filter.category,
          },
        }).then((r) => r.data?.meals?.map((obj: any) => convert(obj)));
      }

      return meals;
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
      {filter.q && (
        <div className='flex justify-center mb-6'>
          <SearchInput
            initVal={filter.q}
            submitVal={(val) => updateFilter({ ...filter, q: val })}
          />
        </div>
      )}
      <hr className='h-1 bg-muted-foreground my-5' />
      <Loading isLoading={isLoading} className='h-[300px]'>
        <section className='my-5'>
          <h2 className='text-2xl font-semibold mb-6 text-center'>
            {filter.q && `Search Result: ${filter.q}`}
            {filter.ingredient && (
              <div className='flex items-center justify-center gap-2'>
                <span>Ingredient: </span>
                <SearchIngredientInput
                  setVal={(s) => updateFilter({ ...filter, ingredient: s })}
                  value={filter.ingredient}
                />
              </div>
            )}
            {filter.category && (
              <div className='flex items-center justify-center gap-2'>
                <span>Category: </span>
                <SearchCategoryInput
                  setVal={(s) => updateFilter({ ...filter, category: s })}
                  value={filter.category}
                />
              </div>
            )}
          </h2>
          <div className='grid grid-cols-4 gap-2'>
            {data?.map((meal) => (
              <CardMeal meal={meal} key={meal.id} />
            ))}
          </div>
          <Empty
            visible={(!isLoading && !data) || data?.length === 0}
            className='h-[200px]'
          />
        </section>
      </Loading>
    </div>
  );
};

export default Search;
