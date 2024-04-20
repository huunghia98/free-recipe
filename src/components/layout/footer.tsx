import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/button';

import { siteConfig } from '@/constant/config';
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  UtensilsIcon,
  YoutubeIcon,
} from 'lucide-react';

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className='w-full bg-gray-900 text-gray-100 py-12 md:py-16 lg:py-20'>
      <div className='container flex flex-col md:flex-row items-center justify-between gap-8'>
        <div className='flex items-center gap-2'>
          <UtensilsIcon className='h-8 w-8 text-yellow-500' />
          <span className='text-2xl font-bold'>Recipeer Master Chef</span>
        </div>
        <nav className='flex flex-wrap items-center gap-4 md:gap-6'>
          <Link className='text-sm hover:underline' href='/discovery'>
            Recipes
          </Link>
          <Link className='text-sm hover:underline' href='#'>
            About
          </Link>
          <Link className='text-sm hover:underline' href='#'>
            Contact
          </Link>
          <Link className='text-sm hover:underline' href='#'>
            Blog
          </Link>
        </nav>
        <div className='flex items-center gap-4'>
          <Link aria-label='Facebook' href='#'>
            <FacebookIcon className='h-6 w-6 hover:text-blue-500' />
          </Link>
          <Link aria-label='Instagram' href='#'>
            <InstagramIcon className='h-6 w-6 hover:text-pink-500' />
          </Link>
          <Link aria-label='Twitter' href='#'>
            <TwitterIcon className='h-6 w-6 hover:text-blue-400' />
          </Link>
          <Link aria-label='YouTube' href='#'>
            <YoutubeIcon className='h-6 w-6 hover:text-red-500' />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
