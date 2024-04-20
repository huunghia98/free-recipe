'use client';

import { ComboboxSelect } from '@/components/searchRecipe/comboBox';
import { cacheIngredients } from '@/service/meal';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

type Props = {
  setVal: (s: string) => void;
  value: string;
};

const SearchIngredientInput = (props: Props) => {
  const { data } = useQuery({
    queryKey: ['ingreCache'],
    queryFn: async () => {
      return cacheIngredients();
    },
  });
  return (
    <ComboboxSelect
      input={
        data?.map((a) => ({
          value: a.strIngredient,
          label: a.strIngredient,
        })) ?? []
      }
      setVal={props.setVal}
      value={props.value}
    />
  );
};

export default SearchIngredientInput;
