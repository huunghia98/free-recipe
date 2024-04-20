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
    <div className='z-50'>
      <Button
        size='icon'
        variant='ghost'
        className='fixed rounded-[50%] right-[30px] bottom-[90px] w-[60px] h-[60px] border'
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
          <MessageSquareMoreIcon className='absolute -left-2 top-2 w-8 fill-secondary' />
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
        setOpen={setShowChat}
        className={`${
          showChat ? '' : 'hidden'
        } z-50 fixed right-0 bottom-0 md:right-[90px] md:bottom-[40px] w-screen h-screen md:w-[600px] md:h-[600px] max-w-screen max-h-screen border shadow-lg`}
      />
    </div>
  );
};

export default BubbleChatButton;
