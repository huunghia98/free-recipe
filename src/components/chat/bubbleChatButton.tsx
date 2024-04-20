'use client';

import { DotIcon, MessageSquareMoreIcon, X } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import { CardsChat } from '@/components/chat/chat';
import { Button } from '@/components/ui/button';

type Props = {};

const BubbleChatButton = (props: Props) => {
  const [neverClick, setNeverClick] = React.useState(true);
  const [showChat, setShowChat] = React.useState(false);
  return (
    <div>
      <Button
        size='icon'
        variant='ghost'
        className='fixed rounded-[50%] right-[20px] bottom-[120px] w-[60px] h-[60px]'
        onClick={() => {
          setNeverClick(false);
          setShowChat(!showChat);
        }}
      >
        <div className='relative'>
          <Image
            src='/images/catering.gif'
            width={60}
            height={60}
            alt='Chat icon'
            className='rounded-[50%] shadow-lg'
          />
          <MessageSquareMoreIcon className='absolute -left-2 top-2 w-8 fill-white' />
          {showChat ? (
            <X className={`absolute text-black -top-2 right-0 w-4 `} />
          ) : (
            <DotIcon
              className={`absolute text-cyan-400 -top-2 right-0 ${
                neverClick ? 'animate-ping' : ''
              }`}
            />
          )}
        </div>
      </Button>
      <CardsChat
        open={showChat}
        className={`${
          showChat ? '' : 'hidden'
        } fixed right-[90px] bottom-[40px] w-[600px] h-[600px] border shadow-lg`}
      />
    </div>
  );
};

export default BubbleChatButton;
