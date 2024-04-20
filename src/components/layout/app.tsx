'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import React, { Suspense } from 'react';

import { Toaster } from '@/components/ui/sonner';

import ScrollTopProvider from '@/context/ScrollTopProvider';
import { AppProgressBar } from 'next-nprogress-bar';

type Props = {
  children: React.ReactNode;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
      // staleTime: 0,
    },
    mutations: {},
  },
});

const App = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ScrollTopProvider>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          // disableTransitionOnChange
          enableColorScheme={false}
        >
          {children}
          <Suspense>
            <AppProgressBar
              height='4px'
              color='#EAB308'
              options={{ showSpinner: false }}
              shallowRouting
            />
          </Suspense>
          <Toaster duration={3000} />
        </ThemeProvider>
      </ScrollTopProvider>
    </QueryClientProvider>
  );
};

export default App;
