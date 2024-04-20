import * as React from 'react';
import { CheckIcon, PaperPlaneIcon, PlusIcon } from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Circle, Eraser, MessageCircleX } from 'lucide-react';
import { usePersistedState } from '@/hook/usePersistState';
import { useMutation } from '@tanstack/react-query';
import api from '@/lib/api';
import axios from 'axios';
import { toast } from 'sonner';
import Markdown from 'react-markdown';
import Loading from '@/components/util/loading';

export function CardsChat({
  className,
  open,
  setOpen,
}: {
  className?: string;
  open: boolean;
  setOpen: (x: boolean) => void;
}) {
  const [messages, setMessages] = usePersistedState<any[]>(
    [
      {
        role: 'model',
        message: `Hello, I'm Recipeer Master Chef, how can I help you ?`,
      },
    ],
    'chatContent'
  );
  React.useEffect(() => {
    if (open) {
      setTimeout(
        () =>
          document
            .getElementById('chat-bottom')
            ?.scrollIntoView({ behavior: 'smooth' }),
        200
      );
    }
  }, [open]);
  const {
    data: chatData,
    isError,
    isPending,
    mutateAsync,
  } = useMutation({
    mutationKey: ['chat'],
    mutationFn: async (mess: any[]) => {
      return axios({
        url: '/api/chat',
        method: 'POST',
        data: [...mess.slice(1)],
      }).then((r) => r.data);
    },
    onSuccess: (data) => {
      if (data.message === 'Busy') {
        toast.error(
          `Sorry, I'm busy, I'm going to the market to buy food to cook`
        );
      }
    },
    onError: () => {
      toast.error(
        `Sorry, I'm busy, I'm going to the market to buy food to cook`
      );
    },
  });
  const [input, setInput] = React.useState('');
  const inputLength = input.trim().length;

  const clearContext = () => {
    setMessages([
      {
        role: 'agent',
        message: `Hello, I'm Recipeer Master Chef, how can I help you ?`,
      },
    ]);
  };
  const onSubmit = async (mess: any[]) => {
    if (mess.length === 1) {
      toast('I want to know you more, please');
      return;
    }
    const data = await mutateAsync(mess);
    if (data.data) {
      setMessages([...mess, { role: 'model', message: data.data }]);
      setTimeout(
        () =>
          document
            .getElementById('chat-bottom')
            ?.scrollIntoView({ behavior: 'smooth' }),
        1000
      );
    }
  };
  return (
    <>
      <Card className={className}>
        <CardHeader className='flex flex-row items-center w-full justify-between'>
          <div className='flex items-center space-x-4 '>
            <Avatar>
              <AvatarImage
                alt='Image'
                src='/images/chef.svg'
                className='dark:invert'
              />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <div>
              <p className='text-sm font-bold leading-none'>Master Chef</p>
              <p className='text-sm text-muted-foreground'>Cook, cook, cook</p>
            </div>
          </div>
          <div className='flex gap-6'>
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size='icon'
                    variant='outline'
                    className='ml-auto rounded-full'
                    onClick={() => clearContext()}
                  >
                    <Eraser className='h-4 w-4' />
                    <span className='sr-only'>Clear Context</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent sideOffset={10}>Clear Context</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Button
              size='icon'
              variant='outline'
              title='Exit'
              className='ml-auto rounded-full'
              onClick={() => setOpen(false)}
            >
              <MessageCircleX className='h-4 w-4' />
              <span className='sr-only'>Exit</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className='overflow-scroll max-h-[calc(100%-150px)] md:max-h-[450px]'>
          <div className='space-y-4'>
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  'flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm',
                  message.role === 'user'
                    ? 'ml-auto bg-primary text-primary-foreground'
                    : 'bg-muted'
                )}
              >
                <Markdown>{message.message}</Markdown>
              </div>
            ))}
          </div>
          <div id='chat-bottom' className='w-20'>
            <Loading isLoading={isPending} className='mt-8' />
          </div>
        </CardContent>
        <CardFooter className='absolute bottom-0 w-full pb-4 px-2'>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (inputLength === 0) return;
              const mess = [
                ...messages,
                {
                  role: 'user',
                  message: input,
                },
              ];
              setInput('');
              onSubmit(mess);
              setMessages(mess);
            }}
            className='flex w-full items-center space-x-2'
          >
            <Input
              id='message'
              placeholder='Type your message...'
              className='flex-1'
              autoComplete='off'
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <Button type='submit' size='icon' disabled={inputLength === 0}>
              <PaperPlaneIcon className='h-4 w-4' />
              <span className='sr-only'>Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </>
  );
}
