import {
  CheckIcon,
  ListBulletIcon,
  LockOpen2Icon,
  UpdateIcon,
} from '@radix-ui/react-icons';
import Link from 'next/link';

import api from '@/lib/api';

import { Button } from '@/components/ui/button';

import { SproutIcon } from 'lucide-react';
import RecipeDaily from '@/components/recipe/recipeDaily';
import { getRandomMeals } from '@/service/meal';
import Image from 'next/image';

export const revalidate = 60;

export default async function Home() {
  return (
    <main className='flex-1'>
      <section className='relative w-full h-[500px] bg-cover bg-center shadow-sm bg-gray-200/60'>
        <Image
          src={'/images/ldp-2.jpg'}
          alt={''}
          fill
          sizes='100vw'
          objectFit='cover'
          className='z-[-10]'
        />
        <div className='w-full h-full z-20 inset-0 flex items-center justify-center shadow-sm '>
          <div className='text-center text-primary space-y-4 z-1000'>
            <h1 className='text-6xl font-bold gradient-text'>
              Welcome to Recipeer
            </h1>
            <p className='text-lg font-semibold gradient-sub-text'>
              Discover Delicious Recipes. Explore a world of culinary
              inspiration
            </p>
            <Button variant={'destructive'}>
              <Link href='/discovery'>View Recipes</Link>
            </Button>
          </div>
        </div>
      </section>
      <RecipeDaily />
    </main>
  );
}
