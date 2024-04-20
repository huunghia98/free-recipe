import { EnvelopeOpenIcon } from '@radix-ui/react-icons';
import React from 'react';

import { cn } from '@/lib/utils';

type Props = {
  visible: boolean;
  className?: string;
};

const Empty = ({ visible, className }: Props) => {
  if (!visible) return <></>;
  return (
    <div
      className={cn(
        `flex justify-center items-center flex-grow gap-2 w-full text-gray-500 dark:text-white`,
        className
      )}
    >
      <EnvelopeOpenIcon className='h-6 w-6' /> <strong>Empty Data</strong>
    </div>
  );
};

export default Empty;
