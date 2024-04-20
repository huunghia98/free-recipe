'use client';

import { ShuffleIcon } from '@radix-ui/react-icons';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next-nprogress-bar';
import React from 'react';
import { toast } from 'sonner';

import api from '@/lib/api';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Meal, convert } from '@/types/meal';

type Props = {
  className?: string;
};

const Random = (props: Props) => {
  const router = useRouter();
  const { mutateAsync: handleRandom, isPending } = useMutation({
    mutationFn: async () => {
      const meal: Meal = await api({
        url: '/random.php',
        method: 'get',
      }).then((r) => convert(r.data?.meals?.[0]));
      if (meal) {
        router.push(`/meal/${meal.id}`);
        toast(`Found: ${meal.name}`, {
          description: `${meal.name}`,
        });
      }
    },
  });

  return (
    <Button
      variant='ghost'
      className={cn('text-normal font-bold', props.className)}
      onClick={() => handleRandom()}
      disabled={isPending}
    >
      <div className='flex items-center cursor-pointer gap-1'>
        <ShuffleIcon className='w-4 h-4' />
        <span className=''>Random</span>
      </div>
    </Button>
  );
};

export default Random;
