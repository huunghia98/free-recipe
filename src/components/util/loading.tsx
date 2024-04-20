import { LightningBoltIcon } from '@radix-ui/react-icons';
import React from 'react';

import { cn } from '@/lib/utils';
import { Shell } from 'lucide-react';

type Props = {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  mode?: 'spin' | 'bounce';
  children?: React.ReactNode;
};

const SIZE: Record<string, string> = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
};
const Loading = ({
  className,
  size = 'md',
  isLoading = true,
  mode = 'spin',
  children,
}: Props): JSX.Element => {
  if (!isLoading) {
    return <>{children}</>;
  }
  return (
    <div
      className={cn(
        'w-full h-full flex items-center justify-center ',
        className
      )}
    >
      <Shell
        className={`${
          mode === 'spin' ? 'animate-spin' : 'animate-bounce'
        } delay-300 ${SIZE[size] ?? size}`}
      />
    </div>
  );
};

export default Loading;
