import React, { createContext, ReactNode, useEffect } from 'react';
import { useScrollDirection } from 'react-use-scroll-direction';

type ContextState = {
  children?: React.JSX.Element;
  showScrollTop: boolean;
};

const contextDefaultValues: ContextState = {
  showScrollTop: false,
};

export const ScrollTopContext =
  createContext<ContextState>(contextDefaultValues);

const ScrollTopProvider = ({ children }: { children: ReactNode }) => {
  const [showScrollTop, setShowScrollTop] = React.useState<boolean>(false);
  const { isScrollingUp, isScrollingDown } = useScrollDirection();
  useEffect(() => {
    if (isScrollingUp) {
      setShowScrollTop(true);
    }
    if (isScrollingDown) {
      setShowScrollTop(false);
    }
  }, [isScrollingDown, isScrollingUp]);

  return (
    <ScrollTopContext.Provider value={{ showScrollTop: showScrollTop }}>
      {children}
    </ScrollTopContext.Provider>
  );
};

export default ScrollTopProvider;
