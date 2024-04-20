import { useRouter } from 'next-nprogress-bar';
import Image from 'next/image';
import React from 'react';
const CardCategory = (props: any) => {
  const navigate = useRouter();
  return (
    <div
      className='w-full flex flex-col cursor-pointer hover:scale-105 transform transition duration-300'
      onClick={() => {
        navigate.push(
          `/search?category=${encodeURIComponent(props?.strCategory)}`
        );
      }}
    >
      <Image
        alt={props?.strCategory}
        className='w-full h-auto'
        height='180'
        src={`https://www.themealdb.com/images/category/${encodeURIComponent(
          props?.strCategory
        )}.png`}
        style={{
          aspectRatio: '260/180',
          objectFit: 'cover',
        }}
        width='260'
      />
      <div className='w-full text-center p-3 hover:underline underline-offset-2'>
        {props?.strCategory}
      </div>
    </div>
  );
};

export default CardCategory;
