'use client';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Meal } from '@/types/meal';
import { useRouter } from 'next-nprogress-bar';
import Image from 'next/image';
import React from 'react';

type Props = {
  meal: Meal;
};

const CardMeal = ({ meal }: Props) => {
  const navigate = useRouter();
  return (
    <Card
      className='w-full cursor-pointer hover:scale-105 transform transition duration-300'
      onClick={() => {
        navigate.push(`/meal/${meal.id}`);
      }}
    >
      <Image
        alt={meal.name}
        className='w-full h-auto'
        height='180'
        src={meal.img}
        style={{
          aspectRatio: '260/180',
          objectFit: 'cover',
        }}
        width='260'
      />
      <CardHeader className='p-3 hover:underline underline-offset-2'>
        <CardTitle className='text-center'>{meal.name}</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default CardMeal;
