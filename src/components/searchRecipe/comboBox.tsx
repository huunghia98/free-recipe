'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

type Props = {
  input: { value: string; label: string }[];
  value: string;
  setVal: (x: string) => void;
};

export function ComboboxSelect(props: Props) {
  const [open, setOpen] = React.useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[200px] justify-between'
        >
          {props.value
            ? props.input.find(
                (val) => val.value.toLowerCase() === props.value.toLowerCase()
              )?.label
            : 'Select Value...'}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandInput placeholder='Search item...' />
          <CommandEmpty>No item found.</CommandEmpty>
          <CommandGroup>
            {props.input.map((val) => (
              <CommandItem
                key={val.value}
                value={val.value}
                onSelect={(currentValue) => {
                  setOpen(false);
                  props.setVal(currentValue);
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    props.value === val.value ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {val.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
