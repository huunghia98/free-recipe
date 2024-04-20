'use client';

import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import React from 'react';

import { Button } from '@/components/ui/button';

type Props = {};

const ThemeSwitcher = (props: Props) => {
  const { setTheme, theme } = useTheme();
  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };
  return (
    <Button
      variant='ghost'
      className='w-9 px-0'
      onClick={toggleTheme}
      title='Theme'
    >
      <SunIcon className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
      <MoonIcon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
      <span className='sr-only'>Toggle theme</span>
    </Button>
  );
};

export default ThemeSwitcher;
