'use client';

import { ComboboxSelect } from '@/components/searchRecipe/comboBox';
import { cacheCategory, cacheIngredients } from '@/service/meal';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

type Props = {
  setVal: (s: string) => void;
  value: string;
};

const SearchCategoryInput = (props: Props) => {
  const { data } = useQuery({
    queryKey: ['cate'],
    queryFn: async () => {
      return cacheCategory();
    },
  });
  return (
    <ComboboxSelect
      input={
        data?.map((a) => ({
          value: a.strCategory,
          label: a.strCategory,
        })) ?? []
      }
      setVal={props.setVal}
      value={props.value}
    />
  );
};

export default SearchCategoryInput;
