'use client';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import React, { useContext } from 'react';
import ScrollToTop from 'react-scroll-to-top';

import { buttonVariants } from '@/components/ui/button';

import { ScrollTopContext } from '@/context/ScrollTopProvider';

type Props = {
  top?: number;
};

const ScrollTop = ({ top = 300 }: Props) => {
  const { showScrollTop } = useContext(ScrollTopContext);

  return (
    <ScrollToTop
      smooth
      top={top}
      component={<ArrowUpIcon className='h-4 w-4 dark:invert ' />}
      className={`${buttonVariants({
        variant: 'outline',
        size: 'icon',
      })} dark:invert opacity-90  ${showScrollTop ? 'flex' : 'hidden'} md:flex`}
    />
  );
};

export default ScrollTop;
