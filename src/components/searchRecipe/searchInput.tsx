'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MicroscopeIcon, Search } from 'lucide-react';
import { useRouter } from 'next-nprogress-bar';
import React from 'react';

type Props = {
  initVal?: string;
  submitVal?: (val: string) => void;
};

const SearchInput = (props: Props) => {
  const navigate = useRouter();
  const [input, setInput] = React.useState<string>(props.initVal ?? '');
  const submit = () => {
    if (!input || input.trim() === '') return;
    if (props.submitVal) {
      props.submitVal?.(input);
    } else {
      navigate.push(`/search?q=${encodeURI(input)}`);
    }
  };
  return (
    <div className='relative'>
      <Input
        className='pl-10 pr-10'
        placeholder='Search for a Meal...'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === 'Enter' || e.keyCode === 13) {
            submit();
          }
        }}
      />
      <MicroscopeIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4' />
      <Button
        className='absolute right-0 top-0'
        size={'icon'}
        onClick={(e) => {
          submit();
        }}
      >
        <Search />
      </Button>
    </div>
  );
};

export default SearchInput;
