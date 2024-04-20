'use client';

import { useRouter } from 'next-nprogress-bar';
import Image from 'next/image';
import React from 'react';
const CardIngredient = (props: any) => {
  const navigate = useRouter();

  return (
    <div
      className='w-full flex flex-col cursor-pointer hover:scale-105 transform transition duration-300 cursor-pointer'
      onClick={() => {
        navigate.push(
          `/search?ingredient=${encodeURIComponent(props?.strIngredient)}`
        );
      }}
    >
      <Image
        alt={props?.strIngredient}
        className='w-full h-auto'
        height='180'
        src={`https://www.themealdb.com/images/ingredients/${encodeURIComponent(
          props?.strIngredient
        )}.png`}
        style={{
          aspectRatio: '260/180',
          objectFit: 'cover',
        }}
        width='260'
      />
      <div className='w-full text-center p-3 hover:underline underline-offset-2'>
        {props?.strIngredient}
      </div>
    </div>
  );
};

export default CardIngredient;
