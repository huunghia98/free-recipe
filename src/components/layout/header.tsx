import { SproutIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import ThemeSwitcher from '@/components/layout/themeSwitcher';
import { Button } from '@/components/ui/button';
import Random from '@/components/layout/random';
import Image from 'next/image';
import ChefIcon from '~/images/chef.svg';

type Props = {};

const Header = async (props: Props) => {
  return (
    <header className='z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm'>
      <div className='container flex justify-between h-12 w-full px-2 max-w-screen-2xl'>
        <div className='flex items-center flex-1'>
          <Link className='flex items-center gap-2 font-bold text-2xl' href='/'>
            {/* <SproutIcon className='h-8 w-8' /> */}
            <ChefIcon className='w-[40px] h-[40px] dark:invert' />
            <span>Recipeer</span>
          </Link>
        </div>

        <div className='flex items-center justify-between space-x-1 md:space-x-2 md:justify-end'>
          {/* <div className='flex items-center gap-4'>
            <Button variant={'default'}>
              <Link href='#'>Sign In</Link>
            </Button>
            <Button variant={'secondary'}>
              <Link href='#'>Sign Up</Link>
            </Button>
          </div> */}
          <Random />
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;
